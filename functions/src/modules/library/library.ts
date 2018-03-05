import * as _ from 'lodash';

export class Library {


    /**
     * Returns http query string.
     * @param params Object to build as http query string
     * @return
     *      - http query string
     *      - Or null if the input is emtpy or not object.
     */
    httpBuildQuery(params) : string | null {

        if ( _.isEmpty( params ) ) return null; //
        
        const keys = Object.keys(params);
        if ( keys.length === 0 ) return null; //

        const esc = encodeURIComponent;
        const query = keys
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        return query;
    }

    /**
     * Returns n'th portion of the input `str` after spliting by the `separator`
     * 
     * @param str string to get a portion from.
     * @param separator to split the string. Default is a Blank.
     * @param n n'th portion to get. Index begins with 0. Default is 0.
     * @return
     *      - a portion of the input string.
     *      - or null
     *          - if the input `str` is empty.
     *          - if the input `str` is not a string.
     *          - if the n'th portion does not exists.
     *          - if the value of the portion is empty
     *          - if separator is not a string and empty.
     * 
     * @code
     *      return this.library.segment( this.param('route'), '.', 0 );
     * 
     */
    segment( str:string, separator:string = ' ', n:number = 0 ): string {
        if ( typeof str !== 'string' ) return null;
        if ( typeof separator !== 'string' || ! separator ) return null;
        if ( str ) {
            const re = str.split( separator );
            if ( re[n] !== void 0 && re[n] ) return re[n];
        }
        return null;
    }

}