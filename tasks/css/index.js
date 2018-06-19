const gulp = require('gulp');

const postcss = require('gulp-postcss');
const cleancss = require('gulp-clean-css');
const postcssPresetEnv = require('postcss-preset-env');
const inlineImports = require('postcss-import');
const nested = require('postcss-nested');
const rename = require('gulp-rename');

module.exports = (config) => {
	const { src, dest } = config;

	const processors = [
		inlineImports({ path: src }),
		nested(),
		postcssPresetEnv({
			stage: 1,
			autoprefixer: {
				grid: true,
				supports: false,
			},
		}),
	];

	const css = () => gulp
		.src(src)
		.pipe(postcss(processors))
		.pipe(gulp.dest(dest))
		.pipe(cleancss({ level: 2 }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dest));

	return css;
};
