import React,{useEffect} from 'react'
import Firebase from '../../contexts/Firebase/Firebase'
import AuthModal from './user_credentials'
import Particles from 'react-particles-js'
export default(props:any)=>{
    const firebase = new Firebase()
    return(
        <div>
        <Particles 
        className="particles"
        height="100vh"
        width="100vw"
        params={{ 
          particles: { 
            number: { 
              value: 200, 
              density: { 
                enable: true, 
                value_area: 1500, 
              }, 
            },
            lineLinked:{
              enable:false
            },
            color:{
              value:'#ffffff',
            },
            size:{
              value:3
            },
          }, 
          interactivity:{
            detectsOn:"window"
          }
        }} 
        /> 
        <AuthModal show={props.show}/>  
        </div>
    )
}