
export default class Hash {

    // Unique ID generator
    static hashTable = new Map;
    static uniqId = () => (0|Math.random()*9e6).toString(36);

    // Hash of anything generator
    static toHash( val ) {
        let hash;
        if ( !( hash = this.hashTable.get( val ) ) ) {
            hash = this.uniqId();
            this.hashTable.set( val, hash );
        }
        return hash;
    }

    // Value of any hash
    static fromHash( hash ) {
        let val;
        this.hashTable.forEach( ( _hash, _val ) => {
            if ( _hash === hash ) val = _val;
        } );
        return val;
    }
}