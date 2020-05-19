
/**
 * @imports
 */
import _merge from '@web-native-js/commons/obj/merge';
import JSEN, {Block} from '@web-native-js/jsen';

/**
 * ---------------------------
 * The ScopedJS class
 * ---------------------------
 */				

export default class {
    static parse(script, params = {}) {
        var AST;
        if (!(AST = JSEN.parse(script, [Block], _merge({assert:false}, params)))) {
            AST = new Block([JSEN.parse(script, null, params)]);
        }
        return AST;
    }
};
