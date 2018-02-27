/**
 * admin.initializeApp() 을 두번 호출하면 에러가 발생한다.
 * 그리고 Unit Test 를 위해서 app name 을 지정하는 것이 잘 안된다.
 * 그래서 아래와 같이 이미 만들어진 app 이 있으면 admin.initializeApp() 을 다시 호출하지 않고
 *  기존의 것을 리턴하도록 했다.
 */
import * as admin from 'firebase-admin';
import { serviceAccount } from './../../settings/serviceAccountKey';

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


export const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0M2ZiNzk1OWZmOTM5MDNiZDg3ZDA5ZjU0MmNiODQ1Y2Y0YTdkMzYifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGhydXRoZXNreS1maXJlYmFzZS1iYWNrZW5kIiwiYXVkIjoidGhydXRoZXNreS1maXJlYmFzZS1iYWNrZW5kIiwiYXV0aF90aW1lIjoxNTE5NjYyOTQ4LCJ1c2VyX2lkIjoiZFV1TUVVdDNqVmJLQVM3VzlWYUFsSVNYOW96MSIsInN1YiI6ImRVdU1FVXQzalZiS0FTN1c5VmFBbElTWDlvejEiLCJpYXQiOjE1MTk3MjY1NTEsImV4cCI6MTUxOTczMDE1MSwiZW1haWwiOiJ1c2VyLWJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVzZXItYkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.iRdWE0kYHSkR3BykGbYcnBmYy84rKTu5GxDtCbK6BI6DAzKBceZhzzH7TbsV3igcR3zcIR0QgPWvzDe0cv1xAAEWLn5S_WZyZx3QmUiF7qzG5Xmm8arLc1o2oCombCggEgBAaYH_3nF7SFa-GrH1jKyMSatURxa1AnSiPbHZ40gDLVGxLCU6tHPdJZoW9u2s5f-18Js701fMAOrTfsfbrJijnCfrLnDBp9XbsktZYOrW_jV6Ddic9qrHiDwEaRkbZ_oU2SZlXCz1LbVtuhoXVgxZAF3EHqqW2TJVNcMbFFnl8Do4iJq00RqfB7eIvTc0_-XWraCmCFedPufR86yN9g';


import { Router } from './../../modules/router/router';
export async function route(data) {
    return await (new Router(data)).run()
}


