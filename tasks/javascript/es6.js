const gulp = require('gulp');

const betterRollup = require('gulp-better-rollup');
const commonjs = require('rollup-plugin-commonjs');
const minify = require('rollup-plugin-babel-minify');
const rename = require('gulp-rename');
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
const sourcemaps = require('gulp-sourcemaps');

module.exports = (config) => {
	const { src, dest } = config;

	const es6 = () => gulp.src(src)
		.pipe(sourcemaps.init())
		.pipe(betterRollup({
			rollup,
			plugins: [
				resolve({ browser: true }),
				commonjs(),
				minify({ comments: false }),
			],
		},
		{
			format: 'es',
		}))
		.pipe(rename({ suffix: '.es6' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dest));

	return es6;
};
