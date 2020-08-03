
/**
 * @imports
 */
import Fs from 'fs';
import Path from 'path';
import _each from '@web-native-js/commons/obj/each.js';
import _isObject from '@web-native-js/commons/js/isObject.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import _beforeLast from '@web-native-js/commons/str/beforeLast.js';
import _afterLast from '@web-native-js/commons/str/afterLast.js';

/**
 * ---------------------------
 * The Bundler class
 * ---------------------------
 */
const Bundler = class {
		
	/**
	 * Mounts a Bundler instance over a directory
	 * and runs the bundling process.
	 *
	 * @param string		baseDir
	 * @param object		params
	 *
	 * @return void
	 */
	constructor(baseDir, params = {}) {
		if (!baseDir.endsWith('/')) {
			baseDir += '/';
		}
		this.baseDir = baseDir;
		this.params = params;
		this.params.exportIdAttribute = this.params.exportIdAttribute || 'namespace';
		this.params.assetsPublicBase = this.params.assetsPublicBase || '/';
		this.bundle = [];
		const walk = dir => {
			Fs.readdirSync(dir).forEach(f => {
				let resource = Path.join(dir, f);
				if (Fs.statSync(resource).isDirectory()) {
					walk(resource);
				} else {
					var ext = Path.extname(resource) || '';
					var fnameNoExt = resource
						.substr(0, resource.length - ext.length)
						.substr(this.baseDir.length);
					var ns, _ns;
					var _ext = ext ? ext.replace('.', '') + '/' : '', _fnameNoExt = fnameNoExt.replace(/\\/g, '/');
					if (this.params.namespaceScheme === 2) {
						var _fnameNoExtSplit = _fnameNoExt.split('/');
						_fnameNoExtSplit.unshift(_fnameNoExtSplit.pop());
						_ns = _ext + _fnameNoExtSplit.join('/');
					} else {
						_ns = _ext + _fnameNoExt;
					}
					if (!this.params.namespaceCallback || !(ns = this.params.namespaceCallback(_ns, resource, fnameNoExt, ext))) {
						ns = _ns;
					}
					if (ns) {
						this.load(resource, ns, ext);
					}
				}
			});
		};
		walk(this.baseDir);
	}
		
	/**
	 * Loads a file and appends it
	 * to the bundle on the specified namespace.
	 *
	 * @param string		file
	 * @param string		ns
	 * @param string		ext
	 *
	 * @return string
	 */
	load(file, ns, ext) {
		var nsAttrName = this.params.exportIdAttribute + '="' + ns + '"';
		if (ext in Bundler.mime) {
			this.bundle.push({
				ns: ns,
				html: (baseDir, assetsDir) => {
					if (Fs.statSync(file).size < this.params.maxDataURLsize) {
						var url = 'data:' + Bundler.mime[ext] + ';base64,' + Fs.readFileSync(file).toString('base64');
					} else {
						var relFilename = Path.join(assetsDir, Path.relative(this.baseDir, file));
						var absFilename = Path.join(baseDir, relFilename);
						Fs.mkdirSync(Path.dirname(absFilename), {recursive:true});
						Fs.copyFileSync(file, absFilename);
						var url = this.params.assetsPublicBase + relFilename.replace(/\\/g, '/');
					}
					return "\r\n\t<img " + nsAttrName + " src=\"" + url + "\" />\r\n";
				},
			});
		} else {
			var contents = Fs.readFileSync(file).toString();
			var contentsTrimmed = contents.trim();
			if (contentsTrimmed.startsWith('<') && !contentsTrimmed.startsWith('<!') && !contentsTrimmed.startsWith('<?xml')) {
				// Add a namespace attribute on the first available
				// space on the start tag
				var namespacedContent = contents.replace(/<([a-z\-]+)/, '<$1 ' + nsAttrName);
				this.bundle.push({
					ns: ns,
					html: namespacedContent,
				});
			}
		}
	}
		
	/**
	 * Stringifies the bundle
	 * and optionally saves it to a Path.
	 *
	 * @param string			filename
	 * @param string|function	assetResolver
	 *
	 * @return string
	 */
	output(filename = null, assetsDir = 'assets') {
		var dirname;
		if (filename) {
			filename = !Path.isAbsolute(filename) 
				? Path.resolve(this.baseDir, filename) 
				: filename;
			dirname = Path.dirname(filename);
		}
		var bundleStr = this.bundle.map(b => {
				var html = _isFunction(b.html) ? b.html(dirname, assetsDir) : b.html;
				var ws = (html.match(/^[\s]+/) || [''])[0].replace(new RegExp("\r\n\r\n", 'g'), "\r\n");
				return "\r\n" + ws + "<!-- NAMESPACE: " + b.ns + " -->" + ws + html.trim();
			}).join("\r\n\r\n");
		if (filename) {
			Fs.mkdirSync(dirname, {recursive:true});
			Fs.writeFileSync(filename, bundleStr);
		}
		return bundleStr;
	}
		
	/**
	 * Stringifies the bundle.
	 *
	 * @return string
	 */
	toString() {
		return this.output();
	}
	
		
	/**
	 * Bundles and saves (multiple).
	 *
	 * @param string|object	from
	 * @param string		to
	 * @param object		params
	 *
	 * @return string|object
	 */
	static bundle(from, to = null, params = {}) {
		if (_isObject(from)) {
			var bundles = {};
			_each(from, (name, basePath) => {
				var saveName = to ? to.replace(/\[name\]/g, name) : '';
				bundles[name] = (new Bundler(basePath, params)).output(saveName);
			});
			return bundles;
		}
		return (new Bundler(from, params)).output(to);
	}
}

/**
 * @var object
 */
Bundler.mime = {
	'.ico': 'image/x-icon',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.svg': 'image/svg+xml',
};

/**
 * @export
 */
export default Bundler;