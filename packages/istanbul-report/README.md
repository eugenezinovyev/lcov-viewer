![build](https://github.com/eugenezinovyev/lcov-viewer/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/lcov-viewer/badge.svg?targetFile=packages%2Fistanbul-report%2Fpackage.json)](https://snyk.io/test/github/eugenezinovyev/lcov-viewer?targetFile=packages%2Fistanbul-report%2Fpackage.json)
[![npm version](https://badge.fury.io/js/@lcov-viewer%2Fistanbul-report.svg)](https://www.npmjs.com/package/@lcov-viewer/istanbul-report)

# LCOV viewer Istanbul report

Istanbul grouped HTML report. Generates code coverage report grouped by directory.

## Installation and Usage

Install development dependency using NPM
```
npm install -D @lcov-viewer/istanbul-report
```
OR using YARN
```
yarn add -D @lcov-viewer/istanbul-report
```

Include reporter in Jest config
```js
module.exports = {
    // ...
    coverageReporters: [
        '@lcov-viewer/istanbul-report'
    ],
    // ...
};
```

or specify as [nyc](https://github.com/istanbuljs/nyc) reporter
```
nyc --reporter=@lcov-viewer/istanbul-report npm run test
nyc --reporter=@lcov-viewer/istanbul-report yarn test
```

## Demo
![report](https://user-images.githubusercontent.com/1678896/139162954-4e062a3a-9776-4b15-9700-2a63dbdd58c3.gif)
