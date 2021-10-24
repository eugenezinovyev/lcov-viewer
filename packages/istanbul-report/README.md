# LCOV viewer Istanbul report

Generates coverage report 

## Install

Install development dependency using NPM
```
npm install -D @lcov-viewer/istanbul-report
```
OR using YARN
```
yarn add -D @lcov-viewer/istanbul-report
```
Update your Jest config
```js
module.exports = {
    // ...
    coverageReporters: [
        '@lcov-viewer/istanbul-report'
    ],
    // ...
};
```

## Demo
![image](https://user-images.githubusercontent.com/1678896/138568915-ed3d5afb-c1a8-4a9a-a986-2d23a0ae447f.png)