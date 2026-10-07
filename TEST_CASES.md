# HTTP Methods and Status Codes Test Cases

This document describes all the test cases available in this k6 load testing project.

## Overview

The project includes three main test suites:

1. **load-test.js** - Basic load testing example
2. **http-methods-test.js** - Comprehensive HTTP methods and status codes testing
3. **status-codes-advanced.js** - Advanced status code testing with helper functions

---

## 1. Basic Load Test (`load-test.js`)

### Purpose
Simple baseline load test for getting started with k6.

### Configuration
- **Virtual Users (VUs)**: 10
- **Duration**: 30 seconds

### Test Cases
- GET request to `/get` endpoint
- Status code validation (200 OK)
- Response time threshold (< 500ms)

### Run Command
```bash
npm run test
npm run test:staging
npm run test:production
```

---

## 2. HTTP Methods Test (`http-methods-test.js`)

### Purpose
Comprehensive testing of all HTTP methods with various status codes.

### Configuration
- **Virtual Users (VUs)**: 1
- **Iterations**: 1
- **Thresholds**:
  - HTTP request duration: p(95) < 500ms
  - HTTP request failure rate: < 10%

### HTTP Methods Covered

#### GET Requests
Tests the following status codes:
- `200` - OK (Success)
- `301` - Moved Permanently (Redirect)
- `400` - Bad Request (Client Error)
- `401` - Unauthorized (Client Error)
- `403` - Forbidden (Client Error)
- `404` - Not Found (Client Error)
- `429` - Too Many Requests (Client Error)
- `500` - Internal Server Error (Server Error)
- `502` - Bad Gateway (Server Error)
- `503` - Service Unavailable (Server Error)

#### POST Requests
Tests with JSON payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

Status codes tested:
- `201` - Created
- `200` - OK (with response echo)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `409` - Conflict
- `422` - Unprocessable Entity
- `500` - Internal Server Error

#### PUT Requests
Tests with update payload:
```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

Status codes tested:
- `200` - OK
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

#### PATCH Requests
Tests with partial update payload:
```json
{
  "name": "Patched Name"
}
```

Status codes tested:
- `200` - OK
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

#### DELETE Requests
Status codes tested:
- `200` - OK
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

#### HEAD Requests
Status codes tested:
- `200` - OK
- `404` - Not Found

#### OPTIONS Requests
Status codes tested:
- `200` - OK (with Allow header validation)

### Redirection Tests
- `301` - Moved Permanently (with follow)
- `302` - Found (temporary redirect with follow)
- `307` - Temporary Redirect (with follow)
- `308` - Permanent Redirect (with follow)

### Response Validation Tests
- JSON response parsing
- Response header validation
- Response time measurement (delay endpoint)

### Run Commands
```bash
# Run with default settings
npm run test:http-methods

# Run with multiple VUs and iterations
npm run test:http-methods:vus
```

---

## 3. Advanced Status Codes Test (`status-codes-advanced.js`)

### Purpose
Comprehensive testing of all HTTP status codes grouped by category.

### Configuration
- **Virtual Users (VUs)**: 1
- **Iterations**: 1

### Test Groups

#### 2xx Success Status Codes
Tests all success responses:
- `200` - OK
- `201` - Created
- `202` - Accepted
- `204` - No Content
- `206` - Partial Content

#### 3xx Redirection Status Codes
Tests all redirect responses:
- `300` - Multiple Choices
- `301` - Moved Permanently
- `302` - Found
- `303` - See Other
- `304` - Not Modified
- `307` - Temporary Redirect
- `308` - Permanent Redirect

#### 4xx Client Error Status Codes
Tests all client errors:
- `400` - Bad Request
- `401` - Unauthorized
- `402` - Payment Required
- `403` - Forbidden
- `404` - Not Found
- `405` - Method Not Allowed
- `406` - Not Acceptable
- `408` - Request Timeout
- `409` - Conflict
- `410` - Gone
- `411` - Length Required
- `412` - Precondition Failed
- `413` - Payload Too Large
- `414` - URI Too Long
- `415` - Unsupported Media Type
- `416` - Range Not Satisfiable
- `417` - Expectation Failed
- `418` - I'm a teapot
- `422` - Unprocessable Entity
- `429` - Too Many Requests

#### 5xx Server Error Status Codes
Tests all server errors:
- `500` - Internal Server Error
- `501` - Not Implemented
- `502` - Bad Gateway
- `503` - Service Unavailable
- `504` - Gateway Timeout
- `505` - HTTP Version Not Supported
- `506` - Variant Also Negotiates
- `507` - Insufficient Storage
- `508` - Loop Detected
- `510` - Not Extended
- `511` - Network Authentication Required

#### HTTP Methods Combinations
Tests all HTTP methods (GET, POST, PUT, PATCH, DELETE) against multiple status codes.

#### Request/Response Validation
- JSON payload echo validation
- Response body parsing
- Content-Type header validation

#### Response Time by Status
Validates that all status codes respond within 1 second.

#### Header Validation
- Custom header handling
- Response header presence (Server, Date)

#### Error Handling
Proper handling of error status codes (404, 500) and delay endpoints.

### Run Commands
```bash
# Run with default settings
npm run test:status-codes

# Run with verbose output
npm run test:status-codes:verbose
```

---

## Status Code Reference

### 2xx Success Codes
| Code | Name | Use Case |
|------|------|----------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 202 | Accepted | Request accepted for processing |
| 204 | No Content | Request succeeded, no content returned |
| 206 | Partial Content | Partial resource returned |

### 3xx Redirect Codes
| Code | Name | Use Case |
|------|------|----------|
| 301 | Moved Permanently | Resource moved permanently |
| 302 | Found | Temporary redirect |
| 303 | See Other | See another resource |
| 304 | Not Modified | Resource not modified since last request |
| 307 | Temporary Redirect | Temporary redirect (preserve method) |
| 308 | Permanent Redirect | Permanent redirect (preserve method) |

### 4xx Client Error Codes
| Code | Name | Use Case |
|------|------|----------|
| 400 | Bad Request | Invalid request syntax |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource not found |
| 405 | Method Not Allowed | HTTP method not allowed |
| 409 | Conflict | Request conflicts with current state |
| 422 | Unprocessable Entity | Request well-formed but invalid |
| 429 | Too Many Requests | Rate limit exceeded |

### 5xx Server Error Codes
| Code | Name | Use Case |
|------|------|----------|
| 500 | Internal Server Error | Server error |
| 502 | Bad Gateway | Invalid response from upstream |
| 503 | Service Unavailable | Server temporarily unavailable |
| 504 | Gateway Timeout | Upstream server timeout |

---

## Running Tests

### Quick Start
```bash
# Install k6 (if not already installed)
# macOS: brew install k6
# Linux: sudo apt-get install k6
# Windows: choco install k6

# Run all tests
npm run test
npm run test:http-methods
npm run test:status-codes
```

### Advanced Options

#### Run with custom VUs and duration
```bash
k6 run scripts/http-methods-test.js --vus 10 --duration 30s
```

#### Run with specific iterations
```bash
k6 run scripts/http-methods-test.js --vus 5 --iterations 20
```

#### Run with verbose output
```bash
k6 run scripts/status-codes-advanced.js -v
```

#### Run with JSON output
```bash
k6 run scripts/http-methods-test.js --out json=results.json
```

#### Generate HTML report
```bash
# Using k6 cloud (requires account)
k6 run scripts/http-methods-test.js --cloud
```

---

## Response Validation

All test suites include:

1. **Status Code Validation**: Verify the HTTP status code matches expectations
2. **Response Time Validation**: Ensure response times meet thresholds
3. **JSON Parsing**: Validate JSON responses can be parsed
4. **Header Validation**: Check for expected headers in responses
5. **Error Handling**: Properly handle error status codes

---

## Key Assertions

### Common Checks
```javascript
// Status code validation
check(res, {
  'status is 200': (r) => r.status === 200,
});

// Response time validation
check(res, {
  'response time < 500ms': (r) => r.timings.duration < 500,
});

// JSON response validation
check(res, {
  'has json body': (r) => r.json('json') !== null,
});

// Header validation
check(res, {
  'has content-type': (r) => r.headers['Content-Type'] !== undefined,
});
```

---

## Test Data

### Payload Examples

**POST/PUT Request**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**PATCH Request**
```json
{
  "name": "Updated Name"
}
```

---

## Thresholds

### Default Thresholds
- HTTP request duration (95th percentile): < 500ms
- HTTP request failure rate: < 10%

These can be customized in the `options` object of each test file.

---

## Test Environment

- **Base URL**: https://httpbin.org (mock HTTP service)
- **Framework**: k6
- **Language**: JavaScript
- **Node.js**: Not required (k6 runs standalone)

---

## Troubleshooting

### Issue: "connection refused"
- Ensure you have internet connectivity
- Verify httpbin.org is accessible

### Issue: "too many requests"
- Reduce the number of VUs
- Reduce the duration
- Add delays between requests

### Issue: "timeout"
- Increase the timeout value
- Reduce the load
- Check your network connection

---

## Next Steps

1. Modify the base URL to test your own APIs
2. Add custom validation logic
3. Integrate with CI/CD pipeline
4. Set up alerts for threshold violations
5. Generate performance reports

---

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 API Reference](https://k6.io/docs/javascript-api/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [httpbin.org](https://httpbin.org/)
