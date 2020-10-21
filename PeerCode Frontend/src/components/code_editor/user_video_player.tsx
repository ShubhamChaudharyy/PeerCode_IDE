import React , {useState,useEffect} from 'react'
export default (requestedMedia:any)=>{
    const [mediaStream,setMediaStream]=useState<any>(null)
    useEffect(()=>{
        const enableStream=async()=>{
        try {
            const stream = 
                await navigator
                .mediaDevices
                .getUserMedia()
                setMediaStream(requestedMedia)
        }
        catch(err){

        }
        }
        if(!mediaStream)
            enableStream()
        else{
        return 
            const cleanup=()=>{
            mediaStream
            .getTracks()
            .forEach((track:any)=>{
                track.stop();
            })   
        }}
    },[mediaStream,setMediaStream])
    return mediaStream
}