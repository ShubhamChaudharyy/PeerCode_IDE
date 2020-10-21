import app from 'firebase/app'

export interface FirebaseClass{
    reDB:app.database.Database;
    reSR:app.storage.Storage;
    users:(filename?:any)=>app.database.Reference;
}