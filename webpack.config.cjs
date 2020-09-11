
/**
 * @imports
 */
const path = require('path');

/**
 * @exports
 */
module.exports = {
	mode: 'production',
	entry: {
		main: './src/browser-entry.js',
		'scoped-html': './src/scoped-html/browser-entry.js',
		'scoped-js': './src/scoped-js/browser-entry.js',
		'html-partials': './src/html-partials/browser-entry.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'source-map',
};
