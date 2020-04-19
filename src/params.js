
/**
 * -----------------
 * Static parameters
 * used across CHTML
 * -----------------
 */
export default {
	env: '',
	context:{},
	attrMap: {
		hint: 'data-tree',
		namespace: 'data-namespace',
		superrole: 'data-role',
		subrole: 'data-role',
		bundle: 'chtml-bundle',
		nocompose: ['nocompose', 'shadow',],
	},
	tagMap: {
		jsen: 'script[type="text/scoped-js"]',
		bundle: 'template[is="chtml-bundle"]',
		import: 'chtml-import',
	},
	treeProperty:'tree',
	bindingProperty:'binding',
	keyValAttributes:[],
	listAttributes:[],
	remodelCallback:null,
	recomposeCallback:null,
	hideDataBlockScript:true,
};