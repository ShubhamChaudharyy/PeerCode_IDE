import app from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import firebase from 'firebase'

var firebaseConfig = {
    YOUR FIREBASE CONFIG OBJECT
};
class Firebase{
    reDB: app.database.Database;
    reSR: app.storage.Storage;
    constructor(){
        if (!firebase.apps.length) {
        app.initializeApp(firebaseConfig)
        }
        this.reDB=app.database();
        this.reSR=app.storage();
    }
    add_user = (id:any) =>
    this.reDB.ref(`live_users/${id}`)
    
    push_update = (id:any) =>
    this.reDB.ref(`live_users/${id}/`)
    
    getcode = (id:any) =>
    this.reDB.ref(`live_users/${id}`)
}
export default Firebase;
