import React, { useEffect , useState , useRef, Fragment } from 'react'
import AceEditor from 'react-ace' 
import * as Component from '@material-ui/core'
import queryString from 'querystring'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-noconflict/theme-xcode'
import './code_editor.css'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreativeComponent from '../individual_components/themed_creative_bar'
import Sketch from 'react-p5'
import p5Types from 'p5'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import userMedia  from './user_video_player'
import Firebase from '../../contexts/Firebase/Firebase'
import { AddIcCall } from '@material-ui/icons';
var backendUrl:any
(process.env.NODE_ENV==='development') ? backendUrl='http://localhost:5000' : backendUrl='https://peercoding.herokuapp.com'
var drawing_points:any[]=[];
var current_path:any[]=[];
var current_peer_points:any[]=[]
var temp_array:any[]=[]
const useStyles=makeStyles({
    parent:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
    }
})
const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
  }),
);
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const CAPTURE_OPTIONS ={
    audio:false,
    video:{ facingMode : 'environment' }
}

export default()=>{
    const videoRef=useRef();
    const mediaStream = userMedia(CAPTURE_OPTIONS)
    const [eraser,setEraser]=useState<any>(true)
    const [outputObj,setOutputObj]=useState<any>({
        stdout:'',
        time:'',
        memory:'',
        stderr:'',
        compile_output:'',
        message:null,
        status:{
            id:'',description:''
        }
    })
    const [input,setInput]=useState<any>('')
    const [ideLanguage,SetIdeLanguage]=useState<any>('c_cpp')
    const [theme,setTheme]=useState<any>('dracula')
    const [strokeWeight,setStrokeWeight]=useState<any>(2)
    const [checked,setChecked]=useState<any>(false)
    const [color,setColor]=useState<any>('black')
    const [name,setName]=useState<any>('')
    const [darkMode,setDarkMode]=useState<any>('white')
    const [room,setRoom]=useState<any>('')
    const [fillCode,setFillCode]=useState<any>('')
    const [sender,setSender]=useState<any>(true)
    const [output,setOutput]=useState<any>(false)
    const [outputVal,setOval]=useState<any>('')
    const [loading,setLoading]=useState<any>(false)
    const [languageIdArray,setIDArray]=useState<any[]>([])
    const [open, setOpen] = React.useState(false);
    const [errorMsg,setError]=useState<any>('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const firebase = new Firebase()
    const setup = (p5 : p5Types , canvasRef : Element ) =>{
        p5.createCanvas(1000,1000).parent(canvasRef)
    }
    const drawPoints = (p5:p5Types) => {
        if(current_peer_points.length!=0){
        p5.background(darkMode);
        p5.stroke('black');
        p5.strokeWeight(strokeWeight)
        p5.noFill();
        current_peer_points.forEach((point:any)=>{
            p5.beginShape();
            if(point!=undefined){
                point.forEach((element:any) => {
                p5.vertex(element.x,element.y)    
                })
            }
            p5.endShape()
        })
        }
    }
    const draw = ( p5 : p5Types ) => {
        p5.background(darkMode);
        p5.stroke('black');
        p5.strokeWeight(strokeWeight)
        if(sender){
        drawPoints(p5);
        }
        drawing_points.forEach(Rowpoints=>{
            p5.beginShape();
            for(var i=0;i<Rowpoints.length;i++){
            p5.vertex(Rowpoints[i].x,Rowpoints[i].y)
            }
            p5.endShape()
        })
    }
    const handleEraser=()=>{
        drawing_points=[]
        current_peer_points=[]
    }
    const handleCheck=()=>{
        if(checked)
        setChecked(false)
        else
        setChecked(true)
        if(theme=='dracula')
        setTheme('xcode')
        else
        setTheme('dracula')
    }
    const handleOutput=()=>{
        window.scrollTo(0,document.body.scrollHeight)
        const data={
            code:fillCode,
            languageId:languageIdArray[ideLanguage],
            input
        }
        setLoading(true)
        axios.post(`${backendUrl}/request_output`,data)
        .then(res=>{
            if(res){
            if(res.data.error!=null)
            {setOpen(true);}
                setOutputObj({
                ...res.data
                })
            setLoading(false)
            }
        })
    }
    const beginShape=(p5:p5Types)=>{
        firebase.push_update(room).update({
            points:temp_array
        })
        current_path=[]
        setSender(true)
    }
    const MousePressed=(e:any)=>{
        const mouse_cords={x:e.mouseX,y:e.mouseY}
        drawing_points.push(current_path)
        setSender(false)
    }
    const MouseDragged = (e:any) => {
        const mouse_cords={x:e.mouseX,y:e.mouseY}
        current_path.push(mouse_cords)
        temp_array=current_path
    }  
    const handleSave=(value:any)=>{
        firebase.push_update(room).set({
        code:value,
        id:room,
        })
    }
    const handleInput=(value:any)=>{
        setInput(value)
    }
    const handleIdeLang=(e:any)=>{
        SetIdeLanguage(e.target.value)
    } 
    useEffect(()=>{
    //@ts-ignore
    const Array=[]; Array['c_cpp']=54; Array['python']=71; Array['java']=62; Array['javascript']=63;
    //@ts-ignore
    setIDArray(Array)
    //@ts-ignore
    const parsed=queryString.parse(window.location.pathname.split('/')[2])
    //@ts-ignore
    const secrets=JSON.parse(window.sessionStorage.getItem('secrets'))
    //@ts-ignore
    setRoom(window.location.pathname.split('/')[2]) 
    },[backendUrl,name,room])
    useEffect(()=>{
        firebase.getcode(room).on('value',(snapshot)=>{
        if(snapshot.val())
        setFillCode(snapshot.val().code)
        })
        if(sender){
        firebase.getcode(room).on('value',(snapshot)=>{
        if(snapshot.val().points)
            current_peer_points.push(snapshot.val().points);
        })
        }
        window.onbeforeunload=(ev:any)=>{
            axios.get('/closedWindow')
        }
    })
    const classes=useStyles()
    const classes2=useStyles2()
    return(
        <div className="  ">
            <Component.AppBar className="navbar_editor">
            <Component.Container>
                <div className={` adjust_top`}>
                <Component.FormControl >
                <Component.InputLabel id="languages" className="label-up">Languages</Component.InputLabel>
                <Component.Select
                labelId="demo-simple-select-label"
                id="demo-mutiple-name-label select-input"
                value={ideLanguage}
                onChange={handleIdeLang}
                className="dropdown"
                >
                <Component.MenuItem value='c_cpp'>C</Component.MenuItem>
                <Component.MenuItem value='c_cpp' >C++</Component.MenuItem>
                <Component.MenuItem value='python'>Python</Component.MenuItem>
                <Component.MenuItem value='java' >Java</Component.MenuItem>
                <Component.MenuItem value="javascript"  >Javascript</Component.MenuItem>
                </Component.Select>
                </Component.FormControl>
                <span className="D-Mode">
                    <Component.Switch 
                    checked={checked} 
                    className="switch" 
                    onChange={handleCheck} 
                    name="checkedB" />
                    Dark Mode Disable
                </span>
                <span className="Run-Mode" onClick={handleOutput}>Run Program</span>
                <span className="Eraser" onClick={handleEraser}>Fasten App</span>
                </div>  
            </Component.Container>
            </Component.AppBar>
            <div className={classes.parent}>
                <AceEditor
                mode={ideLanguage}
                theme={theme}
                name="hey_boi"
                onChange={handleSave}
                value={fillCode}
                className='ace_editor'
                editorProps={{$blockScrolling:true}}
                />
                <Sketch
                setup={setup}
                draw={draw}
                className="our_lovely_canvas"
                mouseDragged={MouseDragged}
                mousePressed={MousePressed}
                mouseReleased={beginShape}
                />
            </div>
            <CreativeComponent/>
            <div className="row">
                <AceEditor
                mode='java'
                theme="xcode"
                name="hey_boi"
                className='ace_input'
                onChange={handleInput}
                editorProps={{$blockScrolling:true}}
                />
                <div
                className='ace_output'
                >
                <Component.TextField
                id="standard-textarea"
                disabled
                placeholder="OUTPUT CONSOLE"
                multiline
                value={outputObj.output}
                />
                <div>
                    {
                    (loading)?(    
                    <Fragment>
                    <CircularProgress className="circular_loading"/>
                    <div className="compiling">COMPILING....</div>
                    </Fragment>
                    ):
                    (<div></div>)
                    }
                </div>
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {outputObj.error_subject}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {outputObj.error}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Lets Give It Another Try
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}