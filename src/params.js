
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
		hint: 'c-hint',
		namespace: 'c-namespace',
		superrole: 'c-role',
		subrole: 'c-role',
		nocompose: ['nocompose', 'shadow',],
		bundle: 'c-bundle',
	},
	tagMap: {
		jsen: 'script[type="text/jsen"]',
		bundle: 'template[is="c-bundle"]',
		import: 'c-import',
	},
	treeProperty:'tree',
	modelProperty:'model',
	keyValAttributes:[],
	listAttributes:[],
	remodelCallback:null,
	recomposeCallback:null,
	hideDataBlockScript:true,
};