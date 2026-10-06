# FirstLoadTest

A load testing project using k6 for performance testing.

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed
- Node.js (optional, for running scripts)

## Quick Start

### 1. Install k6

**macOS:**
```bash
brew install k6
```

**Linux:**
```bash
sudo apt-get install k6
```

**Windows:**
```bash
choco install k6
```

Or [download from k6.io](https://k6.io/docs/getting-started/installation/)

### 2. Run Load Test

Basic test with default settings (10 virtual users, 30 seconds):
```bash
k6 run scripts/load-test.js
```

Or use npm scripts:
```bash
npm run test              # Default test
npm run test:staging      # 10 VUs for 30 seconds
npm run test:production   # 50 VUs for 60 seconds
```

## Project Structure

```
FirstLoadTest/
├── scripts/
│   └── load-test.js      # Main k6 load test script
├── package.json
└── README.md
```

## Configuration

Edit `scripts/load-test.js` to:
- Change the target URL (replace `https://httpbin.org/get`)
- Modify VUs (virtual users) and duration
- Add more test scenarios and checks

## Common k6 Commands

```bash
# Run with custom VUs and duration
k6 run scripts/load-test.js --vus 20 --duration 1m

# Run with specified stages
k6 run scripts/load-test.js --stage 1m:10 --stage 2m:20 --stage 1m:0

# Output results to JSON
k6 run scripts/load-test.js --out json=results.json

# Run with cloud output
k6 run scripts/load-test.js --out cloud
```

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 Examples](https://k6.io/docs/examples/)
- [HTTP Performance Testing Best Practices](https://k6.io/docs/test-types/load-testing/)

## License

MIT
