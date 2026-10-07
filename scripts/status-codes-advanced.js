import http from 'k6/http';
import { check, group, fail } from 'k6';

const BASE_URL = 'https://httpbin.org';

export const options = {
  vus: 1,
  iterations: 1,
};

// Helper function to test status code
function testStatusCode(method, endpoint, expectedStatus, payload = null, headers = {}) {
  let res;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  switch (method.toUpperCase()) {
    case 'GET':
      res = http.get(`${BASE_URL}${endpoint}`);
      break;
    case 'POST':
      res = http.post(`${BASE_URL}${endpoint}`, payload, { headers: defaultHeaders });
      break;
    case 'PUT':
      res = http.put(`${BASE_URL}${endpoint}`, payload, { headers: defaultHeaders });
      break;
    case 'PATCH':
      res = http.patch(`${BASE_URL}${endpoint}`, payload, { headers: defaultHeaders });
      break;
    case 'DELETE':
      res = http.del(`${BASE_URL}${endpoint}`, payload, { headers: defaultHeaders });
      break;
    case 'HEAD':
      res = http.head(`${BASE_URL}${endpoint}`);
      break;
    default:
      fail(`Unknown HTTP method: ${method}`);
  }

  return res;
}

export default function () {
  // 2xx Success Status Codes
  group('2xx Success Status Codes', () => {
    const successCodes = [
      { code: 200, description: 'OK' },
      { code: 201, description: 'Created' },
      { code: 202, description: 'Accepted' },
      { code: 204, description: 'No Content' },
      { code: 206, description: 'Partial Content' },
    ];

    successCodes.forEach(({ code, description }) => {
      let res = http.get(`${BASE_URL}/status/${code}`);
      check(res, {
        [`${code} ${description} - status is ${code}`]: (r) => r.status === code,
        [`${code} ${description} - response received`]: (r) => r !== null,
      });
    });
  });

  // 3xx Redirection Status Codes
  group('3xx Redirection Status Codes', () => {
    const redirectCodes = [
      { code: 300, description: 'Multiple Choices', noRedirect: true },
      { code: 301, description: 'Moved Permanently', noRedirect: true },
      { code: 302, description: 'Found', noRedirect: true },
      { code: 303, description: 'See Other', noRedirect: true },
      { code: 304, description: 'Not Modified', noRedirect: true },
      { code: 307, description: 'Temporary Redirect', noRedirect: true },
      { code: 308, description: 'Permanent Redirect', noRedirect: true },
    ];

    redirectCodes.forEach(({ code, description, noRedirect }) => {
      let res = http.get(`${BASE_URL}/status/${code}`, { redirects: noRedirect ? 0 : 5 });
      check(res, {
        [`${code} ${description} - response received`]: (r) => r !== null,
      });
    });
  });

  // 4xx Client Error Status Codes
  group('4xx Client Error Status Codes', () => {
    const clientErrors = [
      { code: 400, description: 'Bad Request' },
      { code: 401, description: 'Unauthorized' },
      { code: 402, description: 'Payment Required' },
      { code: 403, description: 'Forbidden' },
      { code: 404, description: 'Not Found' },
      { code: 405, description: 'Method Not Allowed' },
      { code: 406, description: 'Not Acceptable' },
      { code: 408, description: 'Request Timeout' },
      { code: 409, description: 'Conflict' },
      { code: 410, description: 'Gone' },
      { code: 411, description: 'Length Required' },
      { code: 412, description: 'Precondition Failed' },
      { code: 413, description: 'Payload Too Large' },
      { code: 414, description: 'URI Too Long' },
      { code: 415, description: 'Unsupported Media Type' },
      { code: 416, description: 'Range Not Satisfiable' },
      { code: 417, description: 'Expectation Failed' },
      { code: 418, description: "I'm a teapot" },
      { code: 422, description: 'Unprocessable Entity' },
      { code: 429, description: 'Too Many Requests' },
    ];

    clientErrors.forEach(({ code, description }) => {
      let res = http.get(`${BASE_URL}/status/${code}`);
      check(res, {
        [`${code} ${description} - status is ${code}`]: (r) => r.status === code,
        [`${code} ${description} - status >= 400`]: (r) => r.status >= 400,
        [`${code} ${description} - status < 500`]: (r) => r.status < 500,
      });
    });
  });

  // 5xx Server Error Status Codes
  group('5xx Server Error Status Codes', () => {
    const serverErrors = [
      { code: 500, description: 'Internal Server Error' },
      { code: 501, description: 'Not Implemented' },
      { code: 502, description: 'Bad Gateway' },
      { code: 503, description: 'Service Unavailable' },
      { code: 504, description: 'Gateway Timeout' },
      { code: 505, description: 'HTTP Version Not Supported' },
      { code: 506, description: 'Variant Also Negotiates' },
      { code: 507, description: 'Insufficient Storage' },
      { code: 508, description: 'Loop Detected' },
      { code: 510, description: 'Not Extended' },
      { code: 511, description: 'Network Authentication Required' },
    ];

    serverErrors.forEach(({ code, description }) => {
      let res = http.get(`${BASE_URL}/status/${code}`);
      check(res, {
        [`${code} ${description} - status is ${code}`]: (r) => r.status === code,
        [`${code} ${description} - status >= 500`]: (r) => r.status >= 500,
      });
    });
  });

  // HTTP Methods with Different Status Codes
  group('HTTP Methods Combinations', () => {
    const payload = JSON.stringify({ test: 'data' });
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    const statusCodes = [200, 201, 204, 400, 401, 404, 500];

    methods.forEach((method) => {
      statusCodes.forEach((status) => {
        let res = testStatusCode(method, `/status/${status}`, status, payload);
        check(res, {
          [`${method} /status/${status} - received`]: (r) => r !== null,
        });
      });
    });
  });

  // Request/Response Validation Tests
  group('Request/Response Validation', () => {
    // POST with response body validation
    const payload = JSON.stringify({
      username: 'testuser',
      email: 'test@example.com',
      role: 'admin',
    });

    let res = http.post(`${BASE_URL}/post`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'POST response - status 200': (r) => r.status === 200,
      'POST response - has json': (r) => r.json() !== null,
      'POST response - echo data': (r) => r.json('json.username') === 'testuser',
      'POST response - content-type': (r) => r.headers['Content-Type'].includes('application/json'),
    });

    // PUT with validation
    res = http.put(`${BASE_URL}/put`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'PUT response - status 200': (r) => r.status === 200,
      'PUT response - has json': (r) => r.json() !== null,
    });

    // DELETE response validation
    res = http.del(`${BASE_URL}/delete`);
    check(res, {
      'DELETE response - status 200': (r) => r.status === 200,
    });
  });

  // Response Time Validation by Status Code
  group('Response Time by Status', () => {
    const statusCodes = [200, 201, 204, 400, 401, 404, 500, 503];

    statusCodes.forEach((status) => {
      let res = http.get(`${BASE_URL}/status/${status}`);
      check(res, {
        [`Status ${status} - response time < 1s`]: (r) => r.timings.duration < 1000,
      });
    });
  });

  // Header Validation Tests
  group('Header Validation Tests', () => {
    // Test with custom headers
    let res = http.get(`${BASE_URL}/get`, {
      headers: {
        'X-Custom-Header': 'test-value',
        'User-Agent': 'k6-test/1.0',
      },
    });

    check(res, {
      'Custom headers - status 200': (r) => r.status === 200,
      'Custom headers - has content-type': (r) => r.headers['Content-Type'] !== undefined,
    });

    // Test response headers presence
    res = http.post(`${BASE_URL}/post`, '{}', {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'Response headers - has server header': (r) => r.headers['Server'] !== undefined,
      'Response headers - has date header': (r) => r.headers['Date'] !== undefined,
    });
  });

  // Error Handling Tests
  group('Error Handling', () => {
    // Test 404 with proper error handling
    let res = http.get(`${BASE_URL}/status/404`);
    if (res.status === 404) {
      console.log('✓ 404 error handled correctly');
    } else {
      fail('404 error not received');
    }

    // Test 500 with proper error handling
    res = http.get(`${BASE_URL}/status/500`);
    if (res.status === 500) {
      console.log('✓ 500 error handled correctly');
    } else {
      fail('500 error not received');
    }

    // Test connection-like errors
    res = http.get(`${BASE_URL}/delay/2`);
    check(res, {
      'Delay endpoint - status 200': (r) => r.status === 200,
    });
  });
}
