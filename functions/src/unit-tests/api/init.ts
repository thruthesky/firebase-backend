/**
 * admin.initializeApp() 을 두번 호출하면 에러가 발생한다.
 * 그리고 Unit Test 를 위해서 app name 을 지정하는 것이 잘 안된다.
 * 그래서 아래와 같이 이미 만들어진 app 이 있으면 admin.initializeApp() 을 다시 호출하지 않고
 *  기존의 것을 리턴하도록 했다.
 */
import * as admin from 'firebase-admin';
import { serviceAccount } from './../../settings/serviceAccountKey';
import { Base} from './../../modules/core/base';


export function init(): any {
    try {
        if (admin.app()) return admin.app();
    }
    catch (e) {
        admin.initializeApp({ // Enable on development.
            credential: admin.credential.cert(<any>serviceAccount),
            databaseURL: "https://pwa-cms.firebaseio.com"
        });
        return admin;
    }
}

if ( Base.admin === null ) Base.admin = init();


import { Router } from './../../modules/router/router';
export async function route(data) {
    return await (new Router(data)).run();
}


/**
 * Returns admin email.
 */
export async function adminEmail() {
    await (new Base).loadSystemSettings();
    return (new Base).getAdminEmail();
}


