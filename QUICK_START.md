# Quick Start Guide - HTTP Methods & Status Codes Testing

## What Was Created

You now have 3 comprehensive test suites for testing all HTTP methods and status codes:

### 1. **http-methods-test.js** ✅
Complete coverage of all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) with status code validation.

**Run it:**
```bash
/opt/homebrew/bin/k6 run scripts/http-methods-test.js
```

### 2. **status-codes-advanced.js** ✅
Advanced testing with helper functions covering all HTTP status codes (2xx, 3xx, 4xx, 5xx).

**Run it:**
```bash
/opt/homebrew/bin/k6 run scripts/status-codes-advanced.js
```

### 3. **load-test.js** (Original)
Basic load testing example.

---

## HTTP Methods Covered

| Method | Status Codes Tested | Use Cases |
|--------|-------------------|-----------|
| **GET** | 200, 301, 400, 401, 403, 404, 429, 500, 502, 503 | Retrieve data |
| **POST** | 201, 200, 400, 401, 403, 409, 422, 500 | Create data |
| **PUT** | 200, 204, 400, 401, 403, 404, 409, 500 | Replace data |
| **PATCH** | 200, 204, 400, 401, 403, 404, 500 | Update data |
| **DELETE** | 200, 204, 400, 401, 403, 404, 500 | Remove data |
| **HEAD** | 200, 404 | Get headers only |
| **OPTIONS** | 200 | Get allowed methods |

---

## Status Codes Tested

### 2xx Success
✅ 200 OK, 201 Created, 202 Accepted, 204 No Content, 206 Partial Content

### 3xx Redirects  
↪️ 300 Multiple Choices, 301 Moved Permanently, 302 Found, 303 See Other, 304 Not Modified, 307 Temporary Redirect, 308 Permanent Redirect

### 4xx Client Errors
❌ 400 Bad Request, 401 Unauthorized, 402 Payment Required, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 406 Not Acceptable, 408 Timeout, 409 Conflict, 410 Gone, 411 Length Required, 412 Precondition Failed, 413 Payload Too Large, 414 URI Too Long, 415 Unsupported Media Type, 416 Range Not Satisfiable, 417 Expectation Failed, 418 I'm a teapot, 422 Unprocessable Entity, 429 Too Many Requests

### 5xx Server Errors
💥 500 Internal Server Error, 501 Not Implemented, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout, 505 HTTP Version Not Supported, 506 Variant Also Negotiates, 507 Insufficient Storage, 508 Loop Detected, 510 Not Extended, 511 Network Authentication Required

---

## Key Features

✨ **Comprehensive Testing**
- All HTTP methods
- All common status codes
- Request/response validation
- Header validation
- Error handling

🚀 **Performance Monitoring**
- Response time thresholds
- Request duration tracking
- Failure rate monitoring

📊 **Flexible Configuration**
- Adjustable virtual users (VUs)
- Configurable iterations
- Custom thresholds
- Various output formats

---

## Usage Examples

### Run HTTP Methods Tests
```bash
/opt/homebrew/bin/k6 run scripts/http-methods-test.js
```

### Run with More Virtual Users
```bash
/opt/homebrew/bin/k6 run scripts/http-methods-test.js --vus 10 --duration 30s
```

### Run with Multiple Iterations
```bash
/opt/homebrew/bin/k6 run scripts/http-methods-test.js --iterations 50
```

### Run Advanced Status Codes Tests
```bash
/opt/homebrew/bin/k6 run scripts/status-codes-advanced.js
```

### Run with Verbose Output
```bash
/opt/homebrew/bin/k6 run scripts/status-codes-advanced.js -v
```

### Export Results as JSON
```bash
/opt/homebrew/bin/k6 run scripts/http-methods-test.js --out json=results.json
```

---

## Test Payloads

### POST/PUT Payload Example
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### PATCH Payload Example
```json
{
  "name": "Updated Name"
}
```

---

## Validation Checks

Each test validates:
- ✅ Correct HTTP status code
- ✅ Response time < 500ms
- ✅ JSON response parsing
- ✅ Response headers
- ✅ Error handling

---

## Test Environment

- **Base URL**: https://httpbin.org (mock HTTP service)
- **Framework**: k6
- **k6 Location**: /opt/homebrew/bin/k6

---

## Custom Testing

To test your own API:

1. Open `scripts/http-methods-test.js` or `scripts/status-codes-advanced.js`
2. Replace `https://httpbin.org` with your API URL
3. Adjust payloads for your endpoints
4. Run the tests

Example:
```javascript
const BASE_URL = 'https://your-api.com/api/v1';
```

---

## Common Commands Reference

```bash
# Run test once
/opt/homebrew/bin/k6 run scripts/http-methods-test.js

# Run with 5 virtual users for 30 seconds
/opt/homebrew/bin/k6 run scripts/http-methods-test.js --vus 5 --duration 30s

# Run 100 iterations
/opt/homebrew/bin/k6 run scripts/http-methods-test.js --iterations 100

# Run with verbose logging
/opt/homebrew/bin/k6 run scripts/http-methods-test.js -v

# Export to JSON
/opt/homebrew/bin/k6 run scripts/http-methods-test.js --out json=results.json

# Run specific test
/opt/homebrew/bin/k6 run scripts/status-codes-advanced.js
```

---

## Next Steps

1. ✅ Test the provided test files
2. 📝 Review TEST_CASES.md for detailed documentation
3. 🔧 Customize payloads for your API
4. 🚀 Scale up with more VUs as needed
5. 📊 Export and analyze results

---

## Troubleshooting

**Issue**: Tests failing with connection error
- Check internet connection
- Verify httpbin.org is accessible

**Issue**: Too many failed requests
- This is expected for error status code tests
- Reduce --vus if getting rate limited
- Add delays between requests with `sleep()`

**Issue**: Timeout errors
- Increase duration with --duration parameter
- Reduce number of VUs
- Check network connectivity

---

## Additional Resources

- [k6 Documentation](https://k6.io/docs/)
- [HTTP Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [httpbin.org API](https://httpbin.org/)

---

Enjoy testing! 🎉
