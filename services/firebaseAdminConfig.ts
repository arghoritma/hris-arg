import admin from "firebase-admin";
import serviceAccount from "../key/serviceAccountKey.json"; //root-projects/key/serviceAccountKey.json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const AdminAuth = admin.auth();

export { AdminAuth };