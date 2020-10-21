import React,{useState,useEffect} from 'react'
const styles={
    transition: 'all 2s ease-out',
};
export default(props:any)=>{
    const colors=['red','orange','yellow','green','blue','indigo','violet']
    let limit=0;
    const [width,setWidth]=useState<any>('3vw')
    const [height,setHeight]=useState<any>('0vh')
    const [opacity,setOpacity]=useState<any>(1)
    const handleRecur=()=>{
        if(limit>7)
        return
        setTimeout(()=>{
            limit++;
            setTimeout(()=>{
                setWidth('3vw')
                setHeight('200vh')
                setOpacity(1)
                limit++;
                handleRecur();
            },2000)
        },2000)
    }
    useEffect(()=>{
        handleRecur()
    })
    return(
        <div className="hello_echo">
        {
            colors.map((value,index)=>{
                return(
                <div className={`${value}`} 
                style={{...styles,
                backgroundColor:`${value}`,
                opacity:opacity,
                height:height,
                width:width,
                zIndex:-999999,
                transform:`rotate(0deg)`  
                }}
                >
                </div>
                )
            })
        }
        </div>
    )
}