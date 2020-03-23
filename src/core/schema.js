
/**
 * @imports
 */
import _isObject from '@web-native-js/commons/js/isObject.js';
import _pushUnique from '@web-native-js/commons/arr/pushUnique.js';
import _intersect from '@web-native-js/commons/arr/intersect.js';

/**
 * ---------------------------
 * The HTML Context Model Schema.
 * @see https://html.spec.whatwg.org/multipage
 * ---------------------------
 */				

/**
 * @object
 */
const Schema = {
	
	/**
	 * @object
	 */
	std: {
		/**
		 * @uncategorized
		 */
		html: {
			type: ['#sectioning-root'],
			model: ['head', 'body'],
			singleton: true,
		},
		caption: {
			model: ['#flow', '!table'],
			singleton: true,
		},
		col: {
			model: ['#nothing'],
		},
		colgroup: {
			model: [{'colgroup[span]': ['#nothing']}, {':not(colgroup[span])': ['col', 'template']}],
			singleton: true,
		},
		dd: {
			model: ['#flow'],
			implicitRole: 'definition',
		},
		dt: {
			model: ['#flow', '!#heading', '!#sectioning', '!header', '!footer'],
			implicitRole: 'term',
		},
		figcaption: {
			model: ['#flow'],
			singleton: true,
		},
		head: {
			model: ['#metadata'],
			singleton: true,
		},
		legend: {
			model: ['#phrasing'],
			singleton: true,
		},
		li: {
			model: ['#flow'],
			implicitRole: 'listitem',
		},
		optgroup: {
			model: ['option', '#script-supporting'],
			implicitRole: 'group',
		},
		option: {
			model: [{'option[label][value]': ['#nothing']}, {'option[label]:not(option[value])': ['#text']}, {':not(option[label])': ['#text']}],
		},
		param: {
			model: ['#nothing'],
		},
		rp: {
			model: ['#text'],
		},
		rt: {
			model: ['#phrasing'],
		},
		source: {
			model: ['#nothing'],
		},
		summary: {
			/*complicated*/
			model: ['#phrasing', '#heading'],
			singleton: true,
		},
		track: {
			model: ['#nothing'],
		},
		tbody: {
			model: ['#script-supporting', 'tr'],
		},
		td: {
			model: ['#flow', '!#heading', '!#sectioning', '!header', '!footer'],
		},
		tfoot: {
			model: ['tr', '#script-supporting'],
			singleton: true,
		},
		thead: {
			model: ['tr', '#script-supporting'],
			singleton: true,
		},
		tr: {
			model: ['#script-supporting', 'td', 'th'],
		},
		/**
		 * @categorized
		 */
		a: {
			type: ['#flow', '#phrasing', {'a[href]': ['#interactive', '#palpable']}], 
			model: ['#transparent', '!#interactive', '!a'],
		},
		abbr: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing',],
		},
		address: {
			type: ['#flow', '#palpable'], 
			model: ['#flow', '!#heading', '!#sectioning', '!header', '!footer', '!address',],
		},
		// If a child of <map>
		area: {
			type: ['#flow', '#phrasing'], 
			model: ['#nothing'],
		},
		article: {
			type: ['#flow', '#palpable', '#sectioning-content'], 
			model: ['#flow'],
			implicitRole: 'article',
			acceptableRoles: ['application', 'article', 'document', 'main',],
		},
		aside: {
			type: ['#flow', '#palpable', '#sectioning-content'], 
			model: ['#flow'],
			implicitRole: 'complementary',
			acceptableRoles: ['complementary', 'note', 'search',],
		},
		audio: {
			type: ['#embedded', '#flow', '#phrasing', {'audio[controls]': ['#interactive', '#palpable']}], 
			model: ['#transparent', '!#media', 'track', {':not(audio[src])': ['source']}],
		},
		b: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		base: {
			type: ['#metadata'],
			model: ['#nothing'],
			singleton: true,
		},
		bdi: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		bdo: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		blockquote: {
			type: ['#flow', '#palpable', '#sectioning-root'],
			model: ['#flow'],
		},
		body: {
			type: ['#sectioning-root'], 
			model: ['#flow', '@banner', '@contentinfo', '@complementary', '@main'],
			singleton: true,
		},
		br: {
			type: ['#flow', '#phrasing'], 
			model: ['#nothing'],
		},
		button: {
			type: ['#flow', '#interactive', '#palpable', '#phrasing'], 
			model: ['#phrasing', '!#interactive'],
		},
		canvas: {
			type: ['#embedded', '#flow', '#palpable', '#phrasing'], 
			model: ['#transparent', '!#interactive', 'a', 'img[usemap]', 'button', 'input[type="button"]', 'input[type="radio"]', 'input[type="checkbox"]', 'select[multiple]', 'select[size>=1]', /*has tabindex but not #interactive*/'[tabindex]!#interactive'],
		},
		cite: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		code: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		data: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		datalist: {
			type: ['#flow', '#phrasing'],
			model: ['#phrasing', '#script-supporting', 'option'],
		},
		del: {
			type: ['#flow', '#phrasing'],
			model: ['#transparent'],
		},
		details: {
			type: ['#flow', '#interactive', '#palpable', '#sectioning-root'],
			model: ['#flow', 'summary'],
		},
		dfn: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing', '!dfn'],
			implicitRole: 'term',
		},
		dialog: {
			type: ['#flow', '#sectioning-root'],
			model: ['#flow'],
			implicitRole: 'dialog',
		},
		div: {
			type: ['#flow', '#palpable'],
			/*complicated*/
			model: [{'dl > div': ['dt', 'dd']}, {':not(dl > div)': ['#flow']}],
		},
		dl: {
			/*complicated*/
			type: ['#flow', /*{:contains(> * name-value group): ['#palpable']}*/],
			/*complicated*/
			model: ['#script-supporting', 'dl', 'dt', 'div'],
		},
		em: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		embed: {
			type: ['#embedded', '#flow', '#phrasing', '#interactive', '#palpable'], 
			model: ['#nothing'],
		},
		fieldset: {
			type: ['#flow', '#sectioning-root', '#palpable'],
			model: ['legend', '#flow'],
		},
		figure: {
			type: ['#flow', '#sectioning-root', '#palpable'],
			model: ['#flow', 'figcaption'],
			implicitRole: 'figure',
		},
		footer: {
			type: ['#flow', '#palpable'],
			model: ['#flow', '!header', '!footer'],
			acceptableRoles: ['contentinfo',],
			singleton: true,
		},
		form: {
			type: ['#flow', '#palpable'],
			model: ['#flow', '!form'],
		},
		h1: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h2: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h3: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h4: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h5: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		h6: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['#phrasing'],
			implicitRole: 'heading',
		},
		header: {
			type: ['#flow', '#palpable'],
			model: ['#flow', '!header', '!footer'],
			acceptableRoles: ['banner',],
			singleton: true,
		},
		hgroup: {
			type: ['#flow', '#heading', '#palpable'],
			model: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '#script-supporting'],
		},
		hr: {
			type: ['#flow'],
			model: ['#nothing'],
			implicitRole: 'separator',
		},
		i: {
			type: ['#flow', '#palpable', '#phrasing'],
			model: ['#phrasing'],
		},
		iframe: {
			type: ['#embedded', '#flow', '#phrasing', '#interactive', '#palpable'], 
			model: ['#nothing'],
		},
		img: {
			type: ['#embedded', '#flow', '#phrasing', {'img[usemap]': ['#interactive', '#palpable']}], 
			model: ['#nothing'],
		},
		input: {
			type: ['#flow', '#phrasing', {'input:not([type!="hidden"])': ['#interactive', '#palpable']}], 
			model: ['#nothing'],
		},
		ins: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#transparent'],
		},
		kbd: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		label: {
			type: ['#flow', '#phrasing', '#interactive', '#palpable'], 
			model: ['#phrasing', '!label'],
		},
		link: {
			type: ['#metadata', {'body link': ['#flow', '#phrasing']}], 
			model: ['#nothing'],
		},
		main: {
			type: ['#flow', '#palpable'], 
			model: ['#flow'],
			implicitRole: 'main',
			singleton: true,
		},
		map: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#transparent'],
		},
		mark: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#transparent'],
		},
		math: {
			type: ['#embedded', '#flow', '#phrasing', '#palpable'], 
			/*complicated*/
			model: [],
		},
		menu: {
			type: ['#flow', {':contains(> li)': ['#palpable']}], 
			model: ['#script-supporting', 'li'],
			implicitRole: 'list',
		},
		meta: {
			type: ['#metadata', {'meta[itemprop]': ['#flow', '#phrasing']}], 
			model: ['#nothing'],
			names: ['application-name', 'author', 'description', 'generator', 'keywords', 'referrer', 'theme-color'],
		},
		meter: {
			type: ['#flow', '#labelable', '#phrasing', '#palpable'], 
			model: ['#phrasing', '!meter'],
		},
		nav: {
			type: ['#flow', '#sectioning-content', '#palpable'], 
			model: ['#flow'],
			implicitRole: 'navigation',
			acceptableRoles: ['navigation',],
		},
		noscript: {
			type: ['#metadata', '#flow', '#phrasing'], 
			model: [{'head link': ['style', 'meta', 'link']}, {':not(head link)': ['#transparent', '!noscript']}],
		},
		object: {
			type: ['#embedded', '#flow', '#phrasing', {'object[usemap]': ['#interactive', '#palpable']}], 
			model: ['#transparent', 'param'],
		},
		ol: {
			type: ['#flow', {':contains(> li)': ['#palpable']}], 
			model: ['#script-supporting', 'li'],
			implicitRole: 'list',
		},
		output: {
			type: ['#flow', '#labelable', '#phrasing', '#palpable'], 
			model: ['#phrasing', '!meter'],
		},
		p: {
			type: ['#flow', '#palpable'], 
			model: ['#phrasing'],
		},
		picture: {
			type: ['#embedded', '#flow', '#phrasing'], 
			model: ['source', 'img', '#acript-supporting'],
		},
		pre: {
			type: ['#flow', '#palpable'], 
			model: ['#phrasing'],
		},
		progress: {
			type: ['#flow', '#labelable', '#phrasing', '#palpable'], 
			model: ['#phrasing', '!progress'],
		},
		q: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		ruby: {
			type: ['#flow', '#phrasing', '#palpable'],
			/*complicated*/ 
			model: ['rp', 'rt'],
		},
		s: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		samp: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		script: {
			type: ['#flow', '#metadata', '#phrasing', '#acript-supporting'], 
			model: [{'script[src]': []}],
		},
		section: {
			type: ['#flow', '#sectioning-content', '#palpable'], 
			model: ['#flow'],
			implicitRole: 'region',
			acceptableRoles: ['alert', 'alertdialog', 'application', 'contentinfo', 'dialog', 'document', 'log', 'main', 'marquee', 'region', 'search', 'status',],
		},
		select: {
			type: ['#flow', '#interactive', '#labelable', '#phrasing', '#palpable'], 
			model: ['option', 'optgroup', '#acript-supporting'],
		},
		slot: {
			type: ['#flow', '#phrasing'], 
			model: ['#transparent'],
		},
		small: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		span: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		strong: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		style: {
			type: ['#metadata'],
			model: ['#text'],
		},
		sub: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		sup: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		svg: {
			type: ['#embedded', '#flow', '#phrasing', '#palpable'], 
			/*complicated*/
			model: [],
		},
		table: {
			type: ['#flow', '#palpable'], 
			model: ['caption', 'colgroup', 'thead', 'tbody', 'tr', 'tfoot', '#script-supporting'],
		},
		td: {
			type: ['#sectioning-root'], 
			model: ['#flow'],
		},
		template: {
			type: ['#metadata', '#flow', '#phrasing', '#script-supporting'], 
			model: ['#nothing'],
		},
		textarea: {
			type: ['#flow', '#interactive', '#labelable', '#phrasing', '#palpable'], 
			model: ['#text'],
		},
		time: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: [{'time[datetime]': ['#phrasing']}, {':not(time[datetime])': ['#text']}],
		},
		title: {
			type: ['#metadata'],
			model: ['#text'],
			singleton: true,
		},
		u: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		ul: {
			type: ['#flow', {':contains(> li)': ['#palpable']}], 
			model: ['#script-supporting', 'li'],
			implicitRole: 'list',
		},
		var: {
			type: ['#flow', '#phrasing', '#palpable'], 
			model: ['#phrasing'],
		},
		video: {
			type: ['#embedded', '#flow', '#phrasing', {'video[controls]': ['#interactive', '#palpable']}], 
			model: ['#transparent', '!#media', 'track', {':not(video[src])': ['source']}],
		},
		wbr: {
			type: ['#flow', '#phrasing'], 
			model: ['#nothing'],
		},
	},
	
	/**
	 * @object
	 */
	aria: {
		banner: {
			type: ['@banner'], 
			singleton: true,
		},
		contentinfo: {
			type: ['@contentinfo'], 
			singleton: true,
		},
		complementary: {
			type: ['@complementary'], 
			singleton: true,
		},
		navigation: {
			type: ['@navigation'], 
			singleton: true,
		},
		list: {
			type: ['@list'], 
		},
		listitem: {
			type: ['@listitem'], 
		},
	},
	
	/**
	 * Returns the semantic content model for the given element.
	 *
	 * @param HTMLElement				el
	 *
	 * @return array
	 */
	getContentModelFor(el) {
		var elTagName = el.nodeName.toLowerCase();
		return Schema.std[elTagName] ? Schema.expandRules(el, Schema.std[elTagName].model || []) : [];
	},
	
	/**
	 * Returns the semantic categories for the given element.
	 *
	 * @param HTMLElement				el
	 * @param bool						roleInclusive
	 *
	 * @return array
	 */
	getCategoriesFor(el, roleInclusive = true) {
		var elTagName = el.nodeName.toLowerCase();
		var elSchema = Schema.std[elTagName] || Schema.aria[elTagName] || {};
		var currentElCategories = [];
		if (roleInclusive && !el.nodeName.startsWith('#') 
		&& (el.hasAttribute('role') || elSchema.implicitRole)) {
			// Current el's impliable/acceptable roles
			// (These take precedence over native semantics)
			if (el.hasAttribute('role')) {
				var definedRoles = el.getAttribute('role').split(' ');
				el.getAttribute('role').split(' ').forEach(role => {
					if (elSchema && elSchema.acceptableRoles && !elSchema.acceptableRoles.includes(role)) {
						return;
					}
					role = role.trim();
					currentElCategories.push('@' + role);
					if (Schema.aria[role] && Schema.aria[role].type) {
						currentElCategories = currentElCategories.concat(Schema.expandRules(el, Schema.aria[role].type || []));
					}
				});
			} else if (elSchema.implicitRole) {
				_pushUnique(currentElCategories, '@' + elSchema.implicitRole, elTagName);
			}
		} else {
			// Current node's categories/tagname
			var currentElCategories = _pushUnique(Schema.expandRules(el, elSchema.type || []), elTagName);
		}
		return currentElCategories;
	},

	/**
	 * Validates that the given node belongs in the context's content model
	 * going by the semantics
	 *
	 * @param HTMLElement				context
	 * @param HTMLElement				node
	 *
	 * @return bool
	 */
	assertNodeBelongsInContentModel(context, node) {
		var contextModel = context instanceof HTMLElement 
			? Schema.getContentModelFor(context)
			: context;
		var nodeCategories = node instanceof HTMLElement 
			? Schema.getCategoriesFor(node)
			: node;
		if (_intersect(contextModel, ['#nothing', '#text']).length) {
			return false;
		}
		var valid;
		// So current content model has to list either this node's categories,
		// tagname, or impliable/acceptable roles
		contextModel.forEach(allowedNode => {
			if (allowedNode.startsWith('!')) {
				var disallowedNode = allowedNode.substr(1);
				if (nodeCategories.includes(disallowedNode)) {
					valid = false;
				}
			} else if (valid !== false) {
				if (nodeCategories.includes(allowedNode)) {
					valid = true;
				}
			}
		});
		return valid && true;
	},

	/**
	 * Validates that the given node is associated to the context directly
	 * going by the semantics
	 *
	 * @param HTMLElement				scope
	 * @param HTMLElement				node
	 * @param object					nodeSchema
	 *
	 * @return bool
	 */
	assertNodeBelongsInScopeAs(scope, node, nodeSchema = null) {
		var contextCategories = Schema.getCategoriesFor(scope);
		var closest, current = node, nodeModel;
		while (!closest && (current = current.parentNode)) {
			if (_intersect(contextCategories, Schema.getCategoriesFor(current)).length
				&& Schema.assertNodeBelongsInContentModel(current, nodeSchema ? (nodeSchema.type || node) : node)
			) {
				closest = current;
			}
		}
		return closest === scope;
	},
	
	/**
	 * Flattens the schema rules for the given element.
	 *
	 * @param HTMLElement				el
	 * @param array						rules
	 *
	 * @return array
	 */
	expandRules(el, rules) {
		var rles = rules.reduce((categories, rule) => {
			if (_isObject(rule)) {
				if (el.matches(Object.keys(rule)[0])) {
					categories = categories.concat(Object.values(rule)[0]);
				}
			} else {
				categories.push(rule);
			}
			return categories;
		}, []);
		if (rles.includes('#sectioning-root')) {
			rles.push('#sectioning-content');
		}
		return rles;
	},
};

/**
 * @exports
 */
export default Schema;
