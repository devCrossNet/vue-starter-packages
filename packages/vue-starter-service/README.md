# `vue-starter-service`

> This service includes tasks and tools that are used by the [vue-starter project](https://github.com/devCrossNet/vue-starter)

# Installation

```
npm i -D --save-exact vue-starter-service
```

# Usage

Please make sure to have the contents from **[this .vue-starter folder](https://github.com/devCrossNet/vue-starter/tree/master/.vue-starter)** in the root directory of your project.

```
Usage: vue-starter-service [options] [command]

vue-starter service for development tasks

Options:
  -v, --version             output the version number
  -h, --help                output usage information

Commands:
  generate|g                generate components, connected components or modules
  extract-i18n-messages|em  extract i18n messages
  test|t [options]          run unit-tests
  lint|l                    lint project files
  e2e                       run e2e tests
  clean|c                   clean up project
  storybook|sb [options]    run Storybook
  update|u                  update your local copy of the vue-starter
  prettier|p [options]      format project
  release|r [options]       generate changelog, release new npm version add new git tag
  build|b [options]         build project for production
  dev|d [options]           serve application for development
```
