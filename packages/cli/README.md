![build](https://github.com/eugenezinovyev/lcov-viewer/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/lcov-viewer/badge.svg?targetFile=packages%2Fcli%2Fpackage.json)](https://snyk.io/test/github/eugenezinovyev/lcov-viewer?targetFile=packages%2Fcli%2Fpackage.json)
[![npm version](https://badge.fury.io/js/@lcov-viewer%2Fcli.svg)](https://www.npmjs.com/package/@lcov-viewer/cli)

# LCOV viewer CLI

CLI to convert coverage to grouped HTML report. Generates code coverage report grouped by directory.

## Installation

```
npm install -g @lcov-viewer/cli
yarn global add @lcov-viewer/cli
```

## Usage
```
lcov-viewer lcov -o ./report-output-directory ./lcov.info
```

# Other packages
An Istanbul report package: [@lcov-viewer/istanbul-report](https://www.npmjs.com/package/@lcov-viewer/istanbul-report)


## Demo
![report](https://user-images.githubusercontent.com/1678896/160290486-4474bd0a-c3e5-4e0e-90dc-6ac72a1e76f7.gif)
