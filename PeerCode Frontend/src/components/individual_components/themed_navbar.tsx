import React from 'react'
import { AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {GitHub} from '@material-ui/icons'
import './util.css'
const useStyles=makeStyles({
    parent:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        color:'white',
    },
    navbar:{
        backgroundColor:'transparent',
        border:'0px',
        zIndex:9999999
    },
    nav_links:{
        padding:'8px',
        cursor:'pointer',
    }
})
export default () => {
    const classes=useStyles()
    return(
        <AppBar  className={`${classes.navbar} navbar`}>
        <div className={classes.parent}>
        <span className={`${classes.nav_links} nav_items` }>
        <GitHub className='gitto'/> Fork On Github</span>
        <span className={`${classes.nav_links} nav_items` }>About Developer</span>
        </div>
        </AppBar>
    )
}