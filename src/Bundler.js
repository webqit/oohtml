
/**
 * @imports
 */
import _each from '@web-native-js/commons/obj/each.js';
import _isObject from '@web-native-js/commons/js/isObject.js';
import _isFunction from '@web-native-js/commons/js/isFunction.js';
import * as fs from 'fs';
import * as path from 'path';

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
	 * @param string		nsAttrName
	 * @param function		nsCallback
	 *
	 * @return void
	 */
	constructor(baseDir, nsAttrName = 'c-namespace', nsCallback = null) {
		if (!baseDir.endsWith('/')) {
			baseDir += '/';
		}
		this.baseDir = baseDir;
		this.nsAttrName = nsAttrName;
		this.bundle = [];
		const walk = dir => {
			fs.readdirSync(dir).forEach(f => {
				let resource = path.join(dir, f);
				if (fs.statSync(resource).isDirectory()) {
					walk(resource);
				} else {
					var ext = path.extname(resource) || '';
					var fnameNoExt = resource
						.substr(0, resource.length - ext.length)
						.substr(this.baseDir.length);
					if (nsCallback) {
						var ns = nsCallback(resource, fnameNoExt, ext);
					} else {
						var ns = (ext ? ext.replace('.', '') + '/' : '') + fnameNoExt.replace(/\\/g, '/');
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
		var nsAttrName = this.nsAttrName + '="' + ns + '"';
		if (ext in Bundler.mime) {
			this.bundle.push({
				ns:ns,
				html:(baseDir, assetsDir) => {
					if (fs.statSync(file).size < Bundler.maxDataURLsize) {
						var url = 'data:' + Bundler.mime[ext] + ';base64,' + fs.readFileSync(file).toString('base64');
					} else {
						var relFilename = path.join(assetsDir, path.relative(this.baseDir, file));
						var absFilename = path.join(baseDir, relFilename);
						fs.mkdirSync(path.dirname(absFilename), {recursive:true});
						fs.copyFileSync(file, absFilename);
						var url = relFilename.replace(/\\/g, '/');
					}
					return "\r\n\t<img " + nsAttrName + " src=\"" + url + "\" />\r\n";
				},
			});
		} else {
			var contents = fs.readFileSync(file).toString();
			if (contents.trim().startsWith('<') && !contents.trim().startsWith('<?xml')) {
				// Add a namespace attribute on the first available
				// space on the start tag
				var namespacedContent = contents.replace(/<([a-z\-]+)/, '<$1 ' + nsAttrName);
				this.bundle.push({
					ns:ns,
					html:namespacedContent,
				});
			}
		}
	}
		
	/**
	 * Stringifies the bundle
	 * and optionally saves it to a path.
	 *
	 * @param string			filename
	 * @param string|function	assetResolver
	 *
	 * @return string
	 */
	output(filename = null, assetsDir = 'assets') {
		var dirname;
		if (filename) {
			filename = !path.isAbsolute(filename) 
				? path.resolve(this.baseDir, filename) 
				: filename;
			dirname = path.dirname(filename);
		}
		var bundleStr = this.bundle
			.map(b => {
				var html = _isFunction(b.html) ? b.html(dirname, assetsDir) : b.html;
				var ws = (html.match(/^[\s]+/) || [''])[0].replace(new RegExp("\r\n\r\n", 'g'), "\r\n");
				return "\r\n" + ws + "<!-- NAMESPACE: " + b.ns + " -->" + ws + html.trim();
			}).join("\r\n\r\n");
		if (filename) {
			fs.mkdirSync(dirname, {recursive:true});
			fs.writeFileSync(filename, bundleStr);
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
	 *
	 * @return string|object
	 */
	static bundle(from, to = null) {
		if (_isObject(from)) {
			var bundles = {};
			_each(from, (name, basePath) => {
				var saveName = to ? to.replace(/\[name\]/g, name) : '';
				bundles[name] = (new Bundler(basePath)).output(saveName);
			});
			return bundles;
		}
		return (new Bundler(from)).output(to);
	}
}

/**
 * @var float
 */
Bundler.maxDataURLsize = 0;

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