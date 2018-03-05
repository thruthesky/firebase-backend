/// Firebase Admin SDK 를 통한 사용자 관리 테스트코드.
/// 보다 정확한 명칭은 `Admin Auth API` 이다. 참고: 공식문서: https://firebase.google.com/docs/auth/admin/
/// 사용자 관리를 할 수 있으며 특히, Authentication Tokens 를 관리 할 수 있다.

/// 1. 사용자 관리. 프로젝트 웹 콘솔은 제한적인데, 관리자 화면을 따로 만들 수 있다. UID 지정, 이메일/비밀번호/전화번호 변경, 전체 회원 정보 다운로드 등을 할 수 있다.
/// 2. 직접 DB 에 접근 할 수 있으므로 회원 가입/로그인/수정 등의 기능을 직접 만들 수 있다.
/// 3. Identity Verification. 클라이언트에서 로그인한 사용자가 올바른지 사용자 인증을 한다.


/// 먼저 초기화를 한다.
import * as admin from 'firebase-admin';
import { serviceAccount } from './../../../settings/serviceAccountKey';
admin.initializeApp({ // Enable on development.
  credential: admin.credential.cert(<any>serviceAccount),
  databaseURL: "https://pwa-cms.firebaseio.com"
});

/** UID 를 지정해서 사용자 생성하기. 이것은 프로젝트 웹 콘솔에서 할 수 없는 것이다. */
admin.auth().createUser({
  uid: "some-uid",
  email: "user@example.com",
  phoneNumber: "+11234567890"
})
.then(function(userRecord) {
  // See the UserRecord reference doc for the contents of userRecord.
  console.log("Successfully created new user:", userRecord.uid);
})
.catch(function(error) {
  console.log("Error creating new user:", error);
});
