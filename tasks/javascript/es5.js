const gulp = require('gulp');

const babelify = require('babelify');
const babelPresetEnv = require('@babel/preset-env');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const tap = require('gulp-tap');

module.exports = (config) => {
	const { src, dest } = config;

	const es5 = () => {
		const babelSettings = {
			presets: [babelPresetEnv],
		};

		return gulp.src(src, { read: false })
			.pipe(tap((file) => {
				// eslint-disable-next-line
				file.contents = browserify(file.path, { debug: true })
					.transform(babelify, babelSettings)
					.bundle();
			}))
			.pipe(gulp.dest(dest))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(rename({ suffix: '.min' }))
			.pipe(gulp.dest(config.dest));
	};

	return es5;
};
