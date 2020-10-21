import React from 'react'
export default()=>{
    const colors=['red','orange','yellow','green','blue','indigo','violet']
    return(
        <div className="mid_creation">
        {
            colors.map((value,index)=>{
                return(
                    <div style={{backgroundColor:value,height:'3vh',width:'110vw',marginLeft:'-2vh'}}>
                    </div>
                )
            })
        }
        </div>
    )
}