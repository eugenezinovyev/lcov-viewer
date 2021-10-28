![build](https://github.com/eugenezinovyev/lcov-viewer/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/lcov-viewer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/eugenezinovyev/lcov-viewer?targetFile=package.json)

# LCOV viewer

LCOV code coverage report viewer. Parses lcov report files and generates HTML report grouped by directory.

## Installation

This repository uses Yarn workspaces. Please use Yarn as a package manager.

```
> git clone https://github.com/eugenezinovyev/lcov-viewer.git
> cd lcov-viewer
> yarn
> cd packages/app
> yarn start
```

## Istanbul report

The repository provides Istanbul report generator.
```
yarn add -D @lcov-viewer/istanbul-report
```
Check documentation [here](/packages/istanbul-report).

## Live Demo

Check live demo [here](https://lcov-viewer.netlify.app/).

## Demo

Open LCOV viewer in your browser and drop `lcov.info` file into the dropzone.

![viewer](https://user-images.githubusercontent.com/1678896/139163904-5f845791-2af5-4cdd-b044-98406b2963b7.gif)
