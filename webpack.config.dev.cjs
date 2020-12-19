
/**
 * @imports
 */
const path = require('path');

/**
 * @exports
 */
module.exports = {
	mode: 'development',
	entry: {
		main: './src/browser-entry.js',
		'namespaced-html': './src/namespaced-html/browser-entry.js',
		'named-templates': './src/named-templates/browser-entry.js',
		'state': './src/state/browser-entry.js',
		'scoped-scripts': './src/scoped-scripts/browser-entry.js',
		'html-partials': './src/html-partials/browser-entry.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
};
