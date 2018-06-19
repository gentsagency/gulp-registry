const gulp = require('gulp');

const gm = require('gulp-gm');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

const sizes = {
	'apple-touch-icon-120x120': 120,
	'apple-touch-icon-152x152': 152,
	'apple-touch-icon-167x167': 167,
	'apple-touch-icon-180x180': 180,
	'favicon-16x16': {
		width: 16,
		transparent: true,
	},
	'favicon-32x32': {
		width: 32,
		transparent: true,
	},
	'favicon-48x48': {
		width: 48,
		transparent: true,
	},
	'favicon-96x96': 96,
	'favicon-192x192': 192,
	'favicon-150x150': 150,
	'favicon-512x512': 512,
	'msapplication-square310x310logo': 310,
	'msapplication-TileImage': 150,
	'msapplication-square150x150logo': 150,
	'msapplication-square70x70logo': 70,
	'msapplication-wide310x150logo': {
		width: 310,
		height: 150,
	},
};

module.exports = (config) => {
	const {
		src: { png, svg },
		dest,
		backgroundColor = '#ffffff',
		padding = 0.825,
	} = config;

	const html = [];

	const resizers = Object.entries(sizes).map(([filename, options]) => {
		const settings = {
			width: 512,
			height: 512,
			transparent: false,
		};

		if (typeof options === 'number') {
			Object.assign(settings, {
				width: options,
				height: options,
			});
		} else {
			const { width, height, transparent } = options;

			Object.assign(settings, {
				width,
				height: height || width,
				transparent: !!transparent,
			});
		}

		// Output HTML
		const rel = (() => {
			if (filename.startsWith('apple-touch-icon')) {
				return 'apple-touch-icon-precomposed';
			}

			if (filename.startsWith('msapplication')) {
				return filename;
			}

			return 'icon';
		})();

		const href = `${dest}/${filename}.png`;

		if (filename.startsWith('msapplication')) {
			// eslint-disable-next-line
			html.push(`<meta name="${rel}" content="${href}" />`);
		} else {
			const { width, height } = settings;

			// eslint-disable-next-line
			html.push(`<link rel="${rel}" sizes="${width}x${height}" href="${href}" />`);
		}

		const task = () => gulp
			.src(png, { allowEmpty: true })
			.pipe(gm((favicon) => {
				const { width, height, transparent } = settings;
				const shortest = width <= height ? width : height;

				if (transparent) {
					return favicon.resize(width, height);
				}

				return favicon
					.resize(shortest * padding, shortest * padding)
					.gravity('Center')
					.extent(width, height)
					.background(backgroundColor);
			}))
			.pipe(imagemin())
			.pipe(rename(`${filename}.png`))
			.pipe(gulp.dest(dest));

		const name = `favicon:${filename}`;

		gulp.task(name, task);

		return name;
	});

	const generateFavicons = gulp.parallel(...resizers);

	const outputHTML = (done) => {
		/* eslint-disable no-console */
		console.log(html.join('\r\n'));
		console.log(`<meta name="msapplication-TileColor" content="${backgroundColor}" />`);
		console.log('<meta name="application-name" content="" />');
		/* eslint-enable no-console */
		done();
	};

	if (svg) {
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

		const copyPinnedTab = () => gulp
			.src(svg, { allowEmpty: true })
			.pipe(imagemin([
				imagemin.svgo(svgoSettings),
			]))
			.pipe(gulp.dest(dest));

		return gulp.series(gulp.parallel(generateFavicons, copyPinnedTab), outputHTML);
	}

	return gulp.series(gulp.generateFavicons, outputHTML);
};
