const gulp = require('gulp');

const filter = require('gulp-filter');
const gm = require('gulp-gm');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

module.exports = (config) => {
	const { src, dest } = config;

	const images = () => gulp
		.src(src, { since: images.lastRun })
		.pipe(imagemin())
		.pipe(gulp.dest(dest));

	if (Array.isArray(config.generateSizes) && config.generateSizes.length > 0) {
		const allowedGlobs = ['**/*.jpg', '**/*.jpeg', '**/*.png'];

		const resizers = config.generateSizes.map((size) => () => gulp
			.src(src, { since: images.lastRun })
			.pipe(filter(allowedGlobs))
			.pipe(gm((image) => image.resize(size)))
			.pipe(imagemin())
			.pipe(rename({ suffix: `-${size}` }))
			.pipe(gulp.dest(dest)));

		return gulp.parallel(images, ...resizers);
	}

	return images;
};
