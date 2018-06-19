const gulp = require('gulp');

const imagemin = require('gulp-imagemin');

module.exports = (config) => {
	const { src, dest } = config;

	const images = () => gulp
		.src(src, { since: gulp.lastRun(images) })
		.pipe(imagemin())
		.pipe(gulp.dest(dest));

	return images;
};
