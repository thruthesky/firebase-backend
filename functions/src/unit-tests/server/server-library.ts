
import { Library as _ } from './../../modules/library/library';
const apiUrl = "https://us-central1-thruthesky-firebase-backend.cloudfunctions.net/api";


import * as request from 'request';
import * as rpn from 'request-promise-native';

export async function route(obj, debug = false) {
    const data: request.UrlOptions = <request.UrlOptions>{};
    data['method'] = 'POST';
    data['url'] = apiUrl;
    data['json'] = true;
    data['body'] = obj;

    
    if (debug) {
        console.log("Debug Url: " + apiUrl + '?' + _.httpBuildQuery(obj));
    }

    const re = await rpn(data).catch(e => e);

    return re;
}



