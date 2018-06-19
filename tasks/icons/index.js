const gulp = require('gulp');

const cheerio = require('gulp-cheerio');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');

module.exports = (config) => {
	const { src, dest, filename } = config;

	const svgoSettings = {
		plugins: [
			{ cleanupAttrs: true },
			{ removeViewbox: false },
			{ removeRasterImages: true },
			{ removeDoctype: true },
			{ removeComments: true },
			{
				cleanupNumericValues: {
					floatPrecision: 2,
				},
			},
		],
	};

	const icons = () => gulp
		.src(src)
		.pipe(rename({ prefix: 'icon-' }))
		.pipe(imagemin([
			imagemin.svgo(svgoSettings),
		]))
		.pipe(svgstore({
			inlineSvg: true,
			fileName: filename,
		}))
		.pipe(cheerio({
			run: ($) => {
				$('svg').attr('style', 'display:none');
			},
			parserOptions: {
				xmlMode: true,
			},
		}))
		.pipe(gulp.dest(dest));

	return icons;
};
