const gulp = require('gulp');

const babili = require('gulp-babel-minify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup-stream');
const tap = require('gulp-tap');
const sourcemaps = require('gulp-sourcemaps');

module.exports = (config) => {
	const { src, dest } = config;

	const es6 = () => gulp.src(src)
		.pipe(tap((file) => {
			// eslint-disable-next-line
			file.contents = rollup({
				input: file.path,
				format: 'es',
				plugins: [
					resolve({ browser: true }),
					commonjs({ sourceMap: false }),
				],
				sourcemap: true,
			});
		}))
		// .pipe(gulp.dest(dest))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(babili())
		.pipe(rename({ suffix: '.es6.min' }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest));

	return es6;
};
