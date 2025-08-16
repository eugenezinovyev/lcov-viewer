![build](https://github.com/eugenezinovyev/lcov-viewer/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/lcov-viewer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/eugenezinovyev/lcov-viewer?targetFile=package.json)

# LCOV viewer

Live: **[lcov-viewer.netlify.app](https://lcov-viewer.netlify.app/)**

LCOV code coverage report viewer. Parses lcov report files and generates HTML report grouped by directory.

This repository provides two packages:

| Package                                                                                                                                   | Description                                                                        |
|-------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [![npm version](https://badge.fury.io/js/@lcov-viewer%2Fistanbul-report.svg)](https://www.npmjs.com/package/@lcov-viewer/istanbul-report) | Istanbul grouped HTML report. Generates code coverage report grouped by directory. |
| [![npm version](https://badge.fury.io/js/@lcov-viewer%2Fcli.svg)](https://www.npmjs.com/package/@lcov-viewer/cli)                         | CLI to convert coverage in LCOV format to a grouped HTML report.                   |

## Istanbul Report

Istanbul reporter for Jest and nyc. Generates code coverage report grouped by directory.

Documentation: [/packages/istanbul-report](/packages/istanbul-report)

```shell
yarn add -D @lcov-viewer/istanbul-report
npm install -D @lcov-viewer/istanbul-report
```

## CLI

CLI to convert coverage in LCOV format to a grouped HTML report.

Documentation: [/packages/cli](/packages/cli)

```shell
yarn global add @lcov-viewer/cli
npm install -g @lcov-viewer/cli
```

-- OR locally in your project --

```shell
yarn add -D @lcov-viewer/cli
npm install -D @lcov-viewer/cli
```

## Local Development Setup

This repository uses Yarn workspaces. Please use Yarn as a package manager.

```shell
git clone https://github.com/eugenezinovyev/lcov-viewer.git
cd lcov-viewer
yarn
yarn start
```

Then open http://localhost:8080/ in your browser and drop `lcov.info` file into the dropzone.

![viewer](https://user-images.githubusercontent.com/1678896/139163904-5f845791-2af5-4cdd-b044-98406b2963b7.gif)
