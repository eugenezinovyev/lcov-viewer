# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
* Better branding for the Lcov Viewer application
* Dependabot configuration
* Syncpack for better dependency management
* Added CHANGELOG.md

### Changed
* Updated dependencies with security fixes
* "noopener noreferrer" for footer links
* Moved Github Actions from 14.x, 16.x, 17.x to 16.x, 18.x, 20.x
* Updated legacy Github Actions to new versions
* Updated the root README.md with package descriptions and local development instructions
* Replaced react-prism with a custom TokenStream component for better control
* Explicitly switched Prism to manual mode

### Removed
* Removed react-prism dependency

## [1.3.0] - 2022-07-03
### Added
* Collapse/expand all buttons

### Changed
* Updated dependencies
* Replaced favicons and favicons-webpack-plugin packages with static icons for faster build
* Moved Github Actions from 12.x, 14.x, 16.x to 14.x, 16.x, 17.x

## [1.2.1] - 2022-03-28
### Added
* First release od the CLI package

### Fixed
* Fixed issue with tree nodes being collapsed when parent node has path partially matching the collapsing node path

## [1.2.0] - 2022-03-28
### Added
* Netlify redirect
* CLI package

### Changed
* Updated dependencies
* Changed lerna configuration to use unified versioning

## [1.1.0] - 2021-10-28
### Added
* Github Actions
* Badges in README.md
* Report details page with source code and coverage
* First deployable version of Lcov Viewer application and Netlify deploy

### Changed
* Replaced react-router with preact-router for Lcov Viewer application
* Updated Istanbul report to support nyc

## [1.0.1] - 2021-10-24
### Changed
* Moved license-webpack-plugin and terser-webpack-plugin to devDependencies

## [1.0.0] - 2021-10-24
### Added
* Initial implementation of the tree view
* Lcov Viewer application
* Istanbul coverage report
* Initialize monorepo

[//]: # (Reference links)

[Unreleased]: https://github.com/eugenezinovyev/lcov-viewer/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/eugenezinovyev/lcov-viewer/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/eugenezinovyev/lcov-viewer/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/eugenezinovyev/lcov-viewer/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/eugenezinovyev/lcov-viewer/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/eugenezinovyev/lcov-viewer/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/eugenezinovyev/lcov-viewer/releases/tag/v1.0.0
