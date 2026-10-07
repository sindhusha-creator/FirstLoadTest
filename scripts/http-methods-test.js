import http from 'k6/http';
import { check, group } from 'k6';

const BASE_URL = 'https://httpbin.org';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  // GET Methods Tests
  group('GET Methods', () => {
    // 200 OK
    let res = http.get(`${BASE_URL}/status/200`);
    check(res, {
      'GET /status/200 - status is 200': (r) => r.status === 200,
      'GET response time < 500ms': (r) => r.timings.duration < 500,
    });

    // 301 Moved Permanently
    res = http.get(`${BASE_URL}/status/301`, { redirects: 0 });
    check(res, {
      'GET /status/301 - status is 301': (r) => r.status === 301,
    });

    // 400 Bad Request
    res = http.get(`${BASE_URL}/status/400`);
    check(res, {
      'GET /status/400 - status is 400': (r) => r.status === 400,
    });

    // 401 Unauthorized
    res = http.get(`${BASE_URL}/status/401`);
    check(res, {
      'GET /status/401 - status is 401': (r) => r.status === 401,
    });

    // 403 Forbidden
    res = http.get(`${BASE_URL}/status/403`);
    check(res, {
      'GET /status/403 - status is 403': (r) => r.status === 403,
    });

    // 404 Not Found
    res = http.get(`${BASE_URL}/status/404`);
    check(res, {
      'GET /status/404 - status is 404': (r) => r.status === 404,
    });

    // 429 Too Many Requests
    res = http.get(`${BASE_URL}/status/429`);
    check(res, {
      'GET /status/429 - status is 429': (r) => r.status === 429,
    });

    // 500 Internal Server Error
    res = http.get(`${BASE_URL}/status/500`);
    check(res, {
      'GET /status/500 - status is 500': (r) => r.status === 500,
    });

    // 502 Bad Gateway
    res = http.get(`${BASE_URL}/status/502`);
    check(res, {
      'GET /status/502 - status is 502': (r) => r.status === 502,
    });

    // 503 Service Unavailable
    res = http.get(`${BASE_URL}/status/503`);
    check(res, {
      'GET /status/503 - status is 503': (r) => r.status === 503,
    });
  });

  // POST Methods Tests
  group('POST Methods', () => {
    const payload = JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 201 Created
    let res = http.post(`${BASE_URL}/status/201`, payload, params);
    check(res, {
      'POST /status/201 - status is 201': (r) => r.status === 201,
    });

    // 200 OK with response
    res = http.post(`${BASE_URL}/post`, payload, params);
    check(res, {
      'POST /post - status is 200': (r) => r.status === 200,
      'POST /post - has json body': (r) => r.json('json') !== null,
    });

    // 400 Bad Request
    res = http.post(`${BASE_URL}/status/400`, payload, params);
    check(res, {
      'POST /status/400 - status is 400': (r) => r.status === 400,
    });

    // 401 Unauthorized
    res = http.post(`${BASE_URL}/status/401`, payload, params);
    check(res, {
      'POST /status/401 - status is 401': (r) => r.status === 401,
    });

    // 403 Forbidden
    res = http.post(`${BASE_URL}/status/403`, payload, params);
    check(res, {
      'POST /status/403 - status is 403': (r) => r.status === 403,
    });

    // 409 Conflict
    res = http.post(`${BASE_URL}/status/409`, payload, params);
    check(res, {
      'POST /status/409 - status is 409': (r) => r.status === 409,
    });

    // 422 Unprocessable Entity
    res = http.post(`${BASE_URL}/status/422`, payload, params);
    check(res, {
      'POST /status/422 - status is 422': (r) => r.status === 422,
    });

    // 500 Internal Server Error
    res = http.post(`${BASE_URL}/status/500`, payload, params);
    check(res, {
      'POST /status/500 - status is 500': (r) => r.status === 500,
    });
  });

  // PUT Methods Tests
  group('PUT Methods', () => {
    const payload = JSON.stringify({
      id: 1,
      name: 'Updated Name',
      email: 'updated@example.com',
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 200 OK
    let res = http.put(`${BASE_URL}/put`, payload, params);
    check(res, {
      'PUT /put - status is 200': (r) => r.status === 200,
      'PUT /put - has json body': (r) => r.json('json') !== null,
    });

    // 204 No Content
    res = http.put(`${BASE_URL}/status/204`, payload, params);
    check(res, {
      'PUT /status/204 - status is 204': (r) => r.status === 204,
    });

    // 400 Bad Request
    res = http.put(`${BASE_URL}/status/400`, payload, params);
    check(res, {
      'PUT /status/400 - status is 400': (r) => r.status === 400,
    });

    // 401 Unauthorized
    res = http.put(`${BASE_URL}/status/401`, payload, params);
    check(res, {
      'PUT /status/401 - status is 401': (r) => r.status === 401,
    });

    // 403 Forbidden
    res = http.put(`${BASE_URL}/status/403`, payload, params);
    check(res, {
      'PUT /status/403 - status is 403': (r) => r.status === 403,
    });

    // 404 Not Found
    res = http.put(`${BASE_URL}/status/404`, payload, params);
    check(res, {
      'PUT /status/404 - status is 404': (r) => r.status === 404,
    });

    // 409 Conflict
    res = http.put(`${BASE_URL}/status/409`, payload, params);
    check(res, {
      'PUT /status/409 - status is 409': (r) => r.status === 409,
    });

    // 500 Internal Server Error
    res = http.put(`${BASE_URL}/status/500`, payload, params);
    check(res, {
      'PUT /status/500 - status is 500': (r) => r.status === 500,
    });
  });

  // PATCH Methods Tests
  group('PATCH Methods', () => {
    const payload = JSON.stringify({
      name: 'Patched Name',
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 200 OK
    let res = http.patch(`${BASE_URL}/patch`, payload, params);
    check(res, {
      'PATCH /patch - status is 200': (r) => r.status === 200,
      'PATCH /patch - has json body': (r) => r.json('json') !== null,
    });

    // 204 No Content
    res = http.patch(`${BASE_URL}/status/204`, payload, params);
    check(res, {
      'PATCH /status/204 - status is 204': (r) => r.status === 204,
    });

    // 400 Bad Request
    res = http.patch(`${BASE_URL}/status/400`, payload, params);
    check(res, {
      'PATCH /status/400 - status is 400': (r) => r.status === 400,
    });

    // 401 Unauthorized
    res = http.patch(`${BASE_URL}/status/401`, payload, params);
    check(res, {
      'PATCH /status/401 - status is 401': (r) => r.status === 401,
    });

    // 403 Forbidden
    res = http.patch(`${BASE_URL}/status/403`, payload, params);
    check(res, {
      'PATCH /status/403 - status is 403': (r) => r.status === 403,
    });

    // 404 Not Found
    res = http.patch(`${BASE_URL}/status/404`, payload, params);
    check(res, {
      'PATCH /status/404 - status is 404': (r) => r.status === 404,
    });

    // 500 Internal Server Error
    res = http.patch(`${BASE_URL}/status/500`, payload, params);
    check(res, {
      'PATCH /status/500 - status is 500': (r) => r.status === 500,
    });
  });

  // DELETE Methods Tests
  group('DELETE Methods', () => {
    // 200 OK
    let res = http.del(`${BASE_URL}/delete`);
    check(res, {
      'DELETE /delete - status is 200': (r) => r.status === 200,
    });

    // 204 No Content
    res = http.del(`${BASE_URL}/status/204`);
    check(res, {
      'DELETE /status/204 - status is 204': (r) => r.status === 204,
    });

    // 400 Bad Request
    res = http.del(`${BASE_URL}/status/400`);
    check(res, {
      'DELETE /status/400 - status is 400': (r) => r.status === 400,
    });

    // 401 Unauthorized
    res = http.del(`${BASE_URL}/status/401`);
    check(res, {
      'DELETE /status/401 - status is 401': (r) => r.status === 401,
    });

    // 403 Forbidden
    res = http.del(`${BASE_URL}/status/403`);
    check(res, {
      'DELETE /status/403 - status is 403': (r) => r.status === 403,
    });

    // 404 Not Found
    res = http.del(`${BASE_URL}/status/404`);
    check(res, {
      'DELETE /status/404 - status is 404': (r) => r.status === 404,
    });

    // 500 Internal Server Error
    res = http.del(`${BASE_URL}/status/500`);
    check(res, {
      'DELETE /status/500 - status is 500': (r) => r.status === 500,
    });
  });

  // HEAD Methods Tests
  group('HEAD Methods', () => {
    // 200 OK
    let res = http.head(`${BASE_URL}/get`);
    check(res, {
      'HEAD /get - status is 200': (r) => r.status === 200,
    });

    // 404 Not Found
    res = http.head(`${BASE_URL}/status/404`);
    check(res, {
      'HEAD /status/404 - status is 404': (r) => r.status === 404,
    });
  });

  // OPTIONS Methods Tests
  group('OPTIONS Methods', () => {
    // 200 OK with headers
    let res = http.request('OPTIONS', `${BASE_URL}/get`);
    check(res, {
      'OPTIONS /get - status is 200': (r) => r.status === 200,
      'OPTIONS /get - has allow header': (r) => r.headers['Allow'] !== undefined || r.headers['allow'] !== undefined,
    });
  });

  // Redirection Tests
  group('Redirection Tests', () => {
    // 301 Moved Permanently with redirect
    let res = http.get(`${BASE_URL}/status/301`);
    check(res, {
      'GET redirect 301 - status is 200 (followed)': (r) => r.status === 200,
    });

    // 302 Found (temporary redirect)
    res = http.get(`${BASE_URL}/status/302`);
    check(res, {
      'GET redirect 302 - status is 200 (followed)': (r) => r.status === 200,
    });

    // 307 Temporary Redirect
    res = http.get(`${BASE_URL}/status/307`);
    check(res, {
      'GET redirect 307 - status is 200 (followed)': (r) => r.status === 200,
    });

    // 308 Permanent Redirect
    res = http.get(`${BASE_URL}/status/308`);
    check(res, {
      'GET redirect 308 - status is 200 (followed)': (r) => r.status === 200,
    });
  });

  // Advanced Response Validation Tests
  group('Response Validation Tests', () => {
    // Test JSON response parsing
    let res = http.post(`${BASE_URL}/post`, JSON.stringify({ test: 'data' }), {
      headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
      'JSON response - can parse json': (r) => r.json() !== null,
      'JSON response - status 200': (r) => r.status === 200,
    });

    // Test response headers
    res = http.get(`${BASE_URL}/response-headers`, {
      headers: {
        'X-Custom-Header': 'test-value',
      },
    });
    check(res, {
      'Response headers - status is 200': (r) => r.status === 200,
    });

    // Test response time
    res = http.get(`${BASE_URL}/delay/1`);
    check(res, {
      'Delay response - status 200': (r) => r.status === 200,
      'Delay response - took ~1s': (r) => r.timings.duration >= 1000,
    });
  });
}
