import React from 'react'
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import { Routes } from './routes'
import CodeEditor from '../code_editor/code_editor'
import UserDetails from '../Main_components/UserDetails'
import Room from '../Main_components/room_peer_client'
import MainRoom from '../Main_components/live_app'
import UserDet2 from '../user_credentials/user_cred'
export default ()=>{
    return(
    <Router>
        <Switch>
            <Route exact path={Routes.editor_page} component={CodeEditor} />
            <Route exact path={Routes.home_page} component={UserDetails} />
            <Route exact path={Routes.room} component={MainRoom}/>
        </Switch>
    </Router>
    )
}
