import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import * as Component from '@material-ui/core'
const useStyles=makeStyles({
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
const classes=useStyles()
export default()=>{
    return(
        <Component.Button className={`${classes.themed_button} font`} type='submit' >
        CREATE
        </Component.Button>
    )
}