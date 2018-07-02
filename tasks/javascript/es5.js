const gulp = require('gulp');

const babelify = require('babelify');
const babelPresetEnv = require('@babel/preset-env');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const tap = require('gulp-tap');
const sourcemaps = require('gulp-sourcemaps');

module.exports = (config) => {
	const { src, dest } = config;

	const es5 = () => {
		const babelSettings = {
			presets: [babelPresetEnv],
			sourceMaps: true,
		};

		return gulp.src(src, { read: false })
			.pipe(tap((file) => {
				// eslint-disable-next-line
				file.contents = browserify(file.path, { debug: true })
					.transform(babelify, babelSettings)
					.bundle();
			}))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(dest));
	};

	return es5;
};
