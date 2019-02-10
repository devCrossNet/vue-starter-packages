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
  -v, --version              output the version number
  -s, --silent               silence output.
  -h, --help                 output usage information

Commands:
  add|a                      Add a vue-starter package to your project.
  build|b [options]          Build project for production.
  clean|c                    Clean up the project directory.
  create|c [options] [name]  Create a new vue-starter project.
  dev|d [options]            Serve application for development.
  e2e                        Run e2e tests with cypress.io.
  extract-i18n-messages|em   Extract i18n default messages from .vue files.
  generate|g                 Generate Components, Connected Components or Modules.
  lint|l                     Lint project files.
  parallel|p [commands...]   Run commands in parallel.
  prettier|p [options]       Format project files.
  release|r [options]        Generate changelog, release new npm version add new git tag.
  statistics|s               Generates a report for certain project management KPIs.
  storybook [options]        Run Storybook.
  test|t [options]           Run unit-tests with jest. All jest CLI options are supported.
  update|u                   Update your local copy of the vue-starter.

```
