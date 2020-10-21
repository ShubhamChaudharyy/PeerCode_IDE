var firebase=require('../Firebase_Helper/Firebase')

const users=[]

const addUser=(chunk)=>{
    chunk.username=chunk.username.trim().toLowerCase();
    chunk.room_id=chunk.room_id.trim().toLowerCase();
    const response={user:null,error:null}
    const existingUser = users.find(
        (user) => user.room_id===chunk.room_id
        && user.username===chunk.username )
    if(existingUser){
        response.error=
        "Cannot Provide You a Room with these Credentials." 
        +"Try Other Credentials"
        return response
    }   
    response.user = {...chunk} 
    users.push(response.user)
    console.log('users array',users)
    return response;
}
const removeUser=(chunk)=>{
    const index=users.findIndex(user=>user.id===id);
    if(index!==-1){
    return users.splice(index,1)[0]
    }
}

const getUser = (id) => users.find(user=>user.id===id)

const getUsersInRoom = (room) => {
    users.filter((user)=>user.room===room)
}

module.exports={ addUser , getUser , getUsersInRoom , removeUser }