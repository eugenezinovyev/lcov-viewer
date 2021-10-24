![build](https://github.com/eugenezinovyev/lcov-viewer/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/lcov-viewer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/eugenezinovyev/lcov-viewer?targetFile=package.json)

# LCOV viewer

Parses LCOV file and generates coverage tree view.

## Installation

This repository uses Yarn workspaces. Please use Yarn to 

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
Please see docs [here](/packages/istanbul-report).

## Example

Open LCOV viewer in your browser and drop `lcov.info` file into the dropzone.

![image](https://user-images.githubusercontent.com/1678896/138569019-dba539b2-bc32-4bc0-8573-051e2fef64f4.png)
![image](https://user-images.githubusercontent.com/1678896/138568915-ed3d5afb-c1a8-4a9a-a986-2d23a0ae447f.png)
