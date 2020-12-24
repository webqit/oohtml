
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
		'html-modules': './src/html-modules/browser-entry.js',
		'html-imports': './src/html-imports/browser-entry.js',
		'state': './src/state/browser-entry.js',
		'scoped-scripts': './src/scoped-scripts/browser-entry.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
};
