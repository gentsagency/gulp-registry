const css = require('./tasks/css');
const favicons = require('./tasks/favicons');
const icons = require('./tasks/icons');
const images = require('./tasks/images');
const javascript = require('./tasks/javascript');

const TASKS = Symbol('TASKS');
const WATCH_TASKS = Symbol('WATCH_TASKS');
const DEFAULT_TASKS = Symbol('DEFAULT_TASKS');

class Registry {
	constructor(config = {}) {
		Object.defineProperties(this, {
			[TASKS]: { value: {} },
			[WATCH_TASKS]: { value: {} },
			[DEFAULT_TASKS]: { value: [] },
		});

		this.config = config;
	}

	init(taker) {
		const {
			css: cssConfig,
			favicons: faviconsConfig,
			icons: iconsConfig,
			images: imagesConfig,
			js: jsConfig,
		} = this.config;

		if (cssConfig) {
			this.set('css', css(cssConfig), { watch: cssConfig.watch || cssConfig.src });
		}

		if (faviconsConfig) {
			const taskOptions = { default: false, watch: false };

			const {
				generateFavicons,
				copyPinnedTab,
				outputHTML,
			} = favicons(faviconsConfig);

			const subtasks = generateFavicons.map(({ filename, task }) => {
				const name = `favicons:${filename}`;
				Object.defineProperty(task, 'name', { value: name });
				this.set(name, task, taskOptions);
				return name;
			});

			Object.defineProperty(copyPinnedTab, 'name', { value: 'favicons:pinned-tab' });
			this.set('favicons:pinned-tab', copyPinnedTab, taskOptions);
			subtasks.push('favicons:pinned-tab');

			this.set('favicons:generate', taker.parallel(...subtasks), taskOptions);

			Object.defineProperty(outputHTML, 'name', { value: 'favicons:html' });
			this.set('favicons:html', outputHTML, taskOptions);

			this.set('favicons', taker.series('favicons:generate'), taskOptions);
		}

		if (iconsConfig) {
			this.set('icons', icons(iconsConfig), { watch: iconsConfig.watch || iconsConfig.src });
		}

		if (imagesConfig) {
			this.set('images', images(imagesConfig), { watch: imagesConfig.watch || imagesConfig.src });
		}

		if (jsConfig) {
			const { es6, es5 } = javascript(jsConfig);
			/* eslint-disable no-script-url */
			this.set('javascript:es6', es6, { default: false });
			this.set('javascript:es5', es5, { default: false });
			this.set('javascript', taker.parallel('javascript:es6', 'javascript:es5'), { watch: jsConfig.watch || jsConfig.src });
			/* eslint-disable no-script-url */
		}

		this.set('default', taker.parallel(...this[DEFAULT_TASKS]));

		if (typeof taker.watch === 'function') {
			// The registry is consumed by a tool that supports watching
			// (probably Gulp)
			const watch = () => {
				Object.entries(this[WATCH_TASKS]).forEach(([task, files]) => {
					taker.watch(files, this.get(task));
				});
			};

			this.set('watch', taker.series('default', watch));
		}

		return this;
	}

	get(task) {
		return this[TASKS][task];
	}

	set(task, fn, options = {}) {
		const defaults = { watch: false, default: true };
		const settings = Object.assign({}, defaults, options);

		if (settings.watch) {
			const files = settings.watch;
			this[WATCH_TASKS][task] = files;
		}

		if (settings.default) {
			this[DEFAULT_TASKS].push(task);
		}

		this[TASKS][task] = fn;

		return this[TASKS][task];
	}

	tasks() {
		return Object.keys(this[TASKS]).reduce((tasks, name) => {
			Object.assign(tasks, { [name]: this.get(name) });
			return tasks;
		}, {});
	}
}

module.exports = Registry;
