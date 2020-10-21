import React, { Fragment , useState  } from 'react'
import * as Component from '@material-ui/core'
import axios from 'axios'
import Firebase from '../../contexts/Firebase/Firebase'
import {Routes} from  '../routes/routes'
import {makeStyles} from '@material-ui/core/styles'
import './css/AuthModal.css' 
//@ts-ignore
import { v1 as uuid} from 'uuid'
var backendUrl:any
(process.env.NODE_ENV==='development') ? backendUrl='http://localhost:5000' : backendUrl='https://peercoding.herokuapp.com'
const styles={
    transition:'all 1s ease-in'
}
const CenterClass=makeStyles({
    root:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height:'40vh',
    },
    root_child:{
        display:'flex',
        flexDirection:'column',
        padding:'30px',
        paddingTop:'50px'
    },
    parent:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100vh',
        position:'relative',
        zIndex:9999
    },
    themed_button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
})
export default(props:any)=>{
    var firebase=new Firebase()
    const [details,SetDetails]=useState<any>({
        username:'',
        room_id:''
    })
    const handleChange=(e : any)=>{
        e.persist();
        SetDetails((prevState:any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        axios.get(`${backendUrl}/room_creation/${details.username}/${details.room_id}`)
        .then(res=>{
            if(res.data==='exist')
            return alert('this room exist dude')
            window.sessionStorage.setItem(`secrets`, JSON.stringify(details));
            const id=uuid()
            window.location.href=`/rooms/${id}`
            const user={id,code:' ',points:['']}
            firebase.add_user(id).set({
                ...user
            })
        })
    }
    const classes=CenterClass();    
    return(
    <div className={`${classes.parent} clip-background`} style={{...styles,opacity:props.show}}>
    <Component.Container maxWidth='sm'>   
    <Component.Grid item xs>    
    <div className="banner">PeerCode IDE</div> 
    <Component.Paper className={classes.root} elevation={3}>   
    <form className={`${classes.root_child}`} onSubmit={handleSubmit}>    
        <Component.Grid item xs>
        <Component.TextField
        label="Enter Username"
        name="username"
        className="indivs"
        onChange={handleChange}
        />
        </Component.Grid>
        <Component.Grid item xs>
        <Component.TextField
        id="filled-basic" 
        label="Enter Room ID"
        name="room_id"
        className="indivs"
        onChange={handleChange}
        />
        </Component.Grid>
        <Component.Button className={`${classes.themed_button} font`} type='submit' >
        CREATE
        </Component.Button>
    </form>
    </Component.Paper>
    </Component.Grid>
    </Component.Container>
    </div>
    )
}