var firebase=require('firebase')
var app=require('firebase/app')
var firebaseConfig = {
    <YOUR ACCOUNT CONFIG OBJECT>
};
class FirebaseClass{
    constructor(){
        if (!firebase.apps.length) {
        app.initializeApp(firebaseConfig)
        }
        this.reDB=app.database();
        this.reSR=app.storage();
    }
    get_users = () =>
    this.reDB.ref(`live_users/`)
    getcode = (id) =>
    this.reDB.ref(`live_users/${id}`)
}
module.exports.FirebaseClass
