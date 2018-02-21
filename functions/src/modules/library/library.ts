export class Library {


    /**
     * Returns http query string.
     * @param params Object to build as http query string
     * @return string or null
     */
    static httpBuildQuery(params) : string | null {
        if ( ! params ) return null;
        const keys = Object.keys(params);
        if ( keys.length === 0 ) return null;
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        return query;
    }

}