const gulp = require('gulp');

const postcss = require('gulp-postcss');
const cleancss = require('gulp-clean-css');
const postcssPresetEnv = require('postcss-preset-env');
const inlineImports = require('postcss-import');
const nested = require('postcss-nested');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

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
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(cleancss({ level: 2 }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dest));

	return css;
};
