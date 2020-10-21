import React , {Fragment,useState,useEffect} from 'react'
import ClientUI from '../user_credentials/user_cred'
import * as Component from '@material-ui/core'
import {Accordion,AccordionSummary,AccordionDetails,Typography} from '@material-ui/core'
import {ExpandMore,InfoOutlined}from '@material-ui/icons';
import Navbar from '../individual_components/themed_navbar'
import {makeStyles} from '@material-ui/core/styles'
import Rainbow from '../individual_components/themed_rainbow'
//@ts-ignore
import style from '../constants'
import './css/user_details.css'
const useStyles = makeStyles({
    bottom_left:{
        width:'25vw',
        height:'100vh',
        borderTopRightRadius:'6vh'  
    },
    parent:{
        position:'absolute',
        top:'10vh',
        left:'0vh',
        transition:'0.1s ease',
        zIndex:99999
    },
    accordion_row:{
    },
    expand_icon:{
        color:"white"
    },
    info_icon:{
        position:'relative',
        color:'white',
        fontSize:'30px',
    },
    parent_show:{
        position:'absolute',
        top:'10vh',
        left:'5vh',
    },
    accordion_grid:{
        position:'absolute',
        top:'15vh'
    }
})
const InstructionBox=(props:any)=>{
    const classes=useStyles()
    let Instruction:any[]=[]
    Instruction=[
        'Enter Details like Your name and Room ID'+
        'you would like to make.These will be the'+ 
        'Credentials through which your code will'+ 
        'be saved in Firebase Realtime DB.',
        'Then You will see Code Editor and there is Seperate Canvas Board where you can write your logic or Thoughts',
        'Then Just Share Your Code Link to your Peer and when Peer Opens the Code Link then You will be able to see your peer and can communicate by WebCam',
        'All the manipulation on Code Editor will be seen in RealTime to Both The users.',
    ]
    return(
    <Component.Grid xs className={classes.parent} style={{...style,opacity:props.show}}>
        <Component.Paper className={classes.bottom_left}>
        <div className={classes.accordion_grid}>
        {
        Instruction.map((value,index)=>{
                return(
                <Accordion className={classes.accordion_row}>
                <AccordionSummary
                expandIcon={<ExpandMore className={classes.expand_icon}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                > 
                <Typography className={`accordion`} >STEP {index+1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography className={`accordion-extended`}>
                    {value}
                </Typography>
                </AccordionDetails>
                </Accordion>
                )
            })
        }
        </div>
        </Component.Paper>
    </Component.Grid>
    )
}
export default (props:any)=>{
    const [opacity,setOpacity]=useState<any>(0)
    const classes=useStyles()
    const [box,showBox]=useState<any>(0)
    const handleBox=()=>{
        if(box==1)
        showBox(0)
        else
        showBox(1)
    }
    const handleFadeIn=()=>{
        setTimeout(()=>{
            setTimeout(()=>{
                setOpacity(1)
            },1000)
        },1000)
    }
    useEffect(()=>{
        handleFadeIn()
    })
    return (
        <Fragment>
        <Navbar/>
        <Rainbow/>
        <div>
            <ClientUI show={opacity}/>
            <InstructionBox show={box}/>
            <InfoOutlined className="info_icon" 
            style={{...style,opacity:opacity}}
            onClick={handleBox}
            />
        </div>
        </Fragment>
    )
}
