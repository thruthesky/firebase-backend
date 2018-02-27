
import { Library as lib } from './../../modules/library/library';
const apiUrl = "https://us-central1-thruthesky-firebase-backend.cloudfunctions.net/api";


import * as request from 'request';
export function req(obj, debug = false) {
    const data: request.UrlOptions = <request.UrlOptions>{};
    data['method'] = 'POST';
    data['url'] = apiUrl;
    data['json'] = true;
    data['body'] = obj;

    if (debug) {
        console.log("Debug Url: " + apiUrl + '?' + lib.httpBuildQuery(obj));
    }
    return data;
}
