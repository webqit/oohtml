
/**
 * @imports
 */
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	plugins: [ new CompressionPlugin() ],
	mode: process.argv.includes('--dev') ? 'development' : 'production',
	entry: {
		main: './src/browser-entry.js',
		'html-modules': './src/html-modules/browser-entry.js',
		'html-imports': './src/html-imports/browser-entry.js',
		'state-api': './src/state-api/browser-entry.js',
		'namespaced-html': './src/namespaced-html/browser-entry.js',
		'subscript': './src/subscript/browser-entry.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'source-map',
};
