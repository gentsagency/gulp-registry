const gulp = require('gulp');

const betterRollup = require('gulp-better-rollup');
const buffer = require('vinyl-buffer');
const commonjs = require('rollup-plugin-commonjs');
const minify = require('rollup-plugin-babel-minify');
const rename = require('gulp-rename');
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
const sourcemaps = require('gulp-sourcemaps');

module.exports = (config) => {
	const { src, dest } = config;

	const es6 = () => gulp.src(src)
		.pipe(betterRollup({
			rollup,
			plugins: [
				resolve({ browser: true }),
				commonjs({ sourceMap: false }),
				minify({ comments: false, sourceMap: true }),
			],
		},
		{
			format: 'es',
			sourcemap: false,
		}))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(rename({ suffix: '.es6' }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest));

	return es6;
};
