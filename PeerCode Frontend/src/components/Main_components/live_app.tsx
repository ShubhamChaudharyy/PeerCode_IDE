import React from 'react'
import Room from './room_peer_client'
import {Grid} from '@material-ui/core'
import IDEStuff from '../code_editor/code_editor'
import './css/live_app.css'
export default(props:any)=>{
    return(
        <div>
        <Grid item xs>
        <Room roomID={props.match.params.roomID}/>
        </Grid>
        <Grid>
        <IDEStuff/>
        </Grid>
        </div>
    )
}