const app = require('express')()
const server = require('http').Server(app);
const { v4: uuidv4 }=require(`uuid`)
const fetch =require('node-fetch')
var cors=require('cors')
var bodyParser=require('body-parser')
const rapidApiKey='cb738d6855mshecf0cc663fb65cep1a51b4jsncd2716553eff'
const axios = require('axios')
const url=require('./constants')
var socket=require('socket.io')
const requestRoute=require('./Routes/requestRoute')
const helper=require('./Routes/addUsers');
const { response } = require('express');
var io=socket(server)
var socket_id;
const port= process.env.PORT|| 5000
const video_rooms={}
const rooms=[]
// create application/json parser
var jsonParser = bodyParser.json()
app.use(cors())
var session_destroy=(chunk)=>{
    console.log(`Room has been disconnected`)
}
var headers={
    "x-rapidapi-host": "judge0.p.rapidapi.com",
    "x-rapidapi-key":"9b887ae8c0msh31aec4c2e9f7a89p1eb9e2jsn848555a89752",
	"content-type": "application/json",
	"accept": "application/json",
	"useQueryString": true
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/working',(req,res,next)=>{
    res.send('workingggg')
})
app.post('/outputDone',(req,res,next)=>{
    console.log('doneeee')
})
app.get('/closedWindow',(req,res,next)=>{
    console.log('window closed')
})
app.get('/room_creation/:room/:name',(req,res,next)=>{
    console.log('reached route')
    if(rooms[req.params.room]){
     res.send('exist')
    }    
    rooms[req.params.room]=req.params.name
    console.log(rooms)
    res.send('into route')
})

app.post(`/request_output`,(req,res,next)=>{
    // const code=req.body.code;
    console.log(req.body)
    const data={
        "language_id": req.body.languageId,
        "source_code": `${req.body.code}`,
        "stdin": `${req.body.input}`
    }
    fetch('https://judge0.p.rapidapi.com/submissions',
    {
        method:'POST',
        body:JSON.stringify(data),
        headers:headers
    })
    .then(res=>res.json())
    .then(response=>{
        console.log(response.token)
        setTimeout(()=>{
            fetch('https://judge0.p.rapidapi.com/submissions/'+response.token+'?base64_encoded=true',
            {
                method:'GET',
                headers:{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"judge0.p.rapidapi.com",
                "x-rapidapi-key":"9b887ae8c0msh31aec4c2e9f7a89p1eb9e2jsn848555a89752",
                "useQueryString":true
                }
            }
            ) 
            .then((res)=>{
            return res.json()
            })
            .then((response)=>{
                const compiler_response={error:null,output:'',error_subject:''}
                console.log(response)
                if(response.status.id==6){
                    compiler_response.error_subject=response.status.description
                    compiler_response.error=Buffer.from(response.compile_output,'base64').toString()
                    console.log(compiler_response)
                    res.send(compiler_response)
                }
                else if(response.status.id<6){
                compiler_response.output=Buffer.from(response.stdout,'base64').toString()
                compiler_response.error_subject=response.status.description
                res.send(compiler_response)
                }
                else if(response.status.id>=7){
                    compiler_response.output=response.stdout
                    compiler_response.error_subject=response.status.description
                    compiler_response.error=Buffer.from(response.stderr,'base64').toString()
                    res.send(compiler_response)
                    console.log(compiler_response)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },7000)
    }).catch(err=>{
        console.log(err)
    })
})

var newConnection=(socket)=>{
    console.log(socket.id)
    socket.on('join',(data,callback)=>{
        console.log(`${data} created`)
        socket.join(data)
        callback()
    })
    socket.on('disconnect',session_destroy)
    socket.on('code_request',(data,callback)=>{
        socket.to(data.room).broadcast.emit('receive',data.value)
    })
    socket.on('draw_peer',(data)=>{
        socket.to(data.room).broadcast.emit('draw_peer_catch',data)
    })    
    socket.on("join room", roomID => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
}

io.sockets.on('connection',newConnection)

server.listen(port,()=>{
    console.log('connection estabilished')
    console.log(process.env.NODE_ENV)
})

