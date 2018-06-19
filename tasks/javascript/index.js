const es6 = require('./es6');
const es5 = require('./es5');

module.exports = (config) => ({
	es6: es6(config),
	es5: es5(config),
});
