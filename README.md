# Gents Agency Gulp Registry

[![dependencies Status](https://david-dm.org/gentsagency/gulp-registry/status.svg)](https://david-dm.org/gentsagency/gulp-registry)

This task registry provides a modern front-end workflow with modern tools and standards in mind. It's meant to be consumed by Gulp 4.

## Installation

Install the registry through NPM:

```sh
npm i --save-dev gulp@^4.0.0 @gentsagency/gulp-registry
```

Create a `gulpfile.js` and point it to the registry.

```js
const gulp = require('gulp');
const config = require('./gulp/config');
const Registry = require('@gentsagency/gulp-registry');

const tasks = new Registry(config);

gulp.registry(tasks);
```

## Configuration

Find an example configuration file below

```js
const buildPath = './public/assets';
const sourcePath = './gulp/assets';

module.exports = {
  css: {
    src: `${sourcePath}/css/*.css`,
    dest: `${buildPath}/css`,
    watch: [
      `${sourcePath}/css/**/*.css`,
      `${sourcePath}/css/*.css`,
    ],
  },
  favicons: {
    src: {
      png: `${sourcePath}/favicons/favicon.png`,
      svg: `${sourcePath}/favicons/favicon.svg`,
    },
    dest: `${buildPath}/favicons`,
  },
  icons: {
    src: `${sourcePath}/icons/*.svg`,
    dest: `${buildPath}/icons`,
    filename: 'icons.svg',
  },
  images: {
    src: `${sourcePath}/images/**`,
    dest: `${buildPath}/images`,
  },
  js: {
    src: `${sourcePath}/js/*.js`,
    dest: `${buildPath}/js`,
    watch: [
      `${sourcePath}/js/**/*.js`,
      `${sourcePath}/js/*.js`,
    ],
  },
};
```

## Usage

`$ gulp` runs a one-time build.

`$ gulp watch` starts the watcher.

Some tasks aren't added to the `default` task and have to be run explicitely.  
You can do so by running `gulp ${taskname}`, for example: `$ gulp favicons`.

## Default tasks

Some tasks are registered by default:

 - [CSS](tasks/css/README.md)
 - [Favicons](tasks/favicons/README.md)
 - [Icons](tasks/icons/README.md)
 - [Images](tasks/images/README.md)
 - [JavaScript](tasks/javascript/README.md)

## Extending the registry

Adding a custom task is straight-forward:

```js
tasks.set('my-task', myTask());
```

You can pass two options:

```js
tasks.set('my-task', myTask(), { default: true, watch: 'glob' })
```

- `default` (default: true) - if the task should run when `gulp` or `gulp default` is run
- `watch` (mixed: string or array of strings) - glob (or array of globs) to watch for changes when `gulp watch` is run

## Troubleshooting

### The favicons task doesn't work

Make sure you have graphicsmagick or imagemagick installed.

```sh
brew install graphicsmagick
```

### Upgrading to Gulp 4 broke things for me!

Re-install Gulp globally, your older projects should still work (using the Gulp 3 version installed in the projects `/node_modules`)

```sh
npm rm -g gulp
rm /usr/local/share/man/man1/gulp.1
npm i -g gulp-cli
```
