import React from 'react'

export const LabelsList = ({list,setFormObj})=>{
    const handleLabelRemove = (val)=>{
        setFormObj((prev)=>{
            const filterList = prev['labels'].filter((lab)=> val!== lab )
            return { ...prev, 'labels':[...filterList]}
        })
    }
    return (
        <div className='dis-flx mrg-b-8'>
            {list.map((val,ind)=>(
                <div className='label-cont dis-flx' key={ind} >
                    <p>{val}</p>
                    <p className='mrg-l-8 cursor' onClick={()=>handleLabelRemove(val)}>x</p>
                </div>
            ))}
        </div>
    )
}

export default LabelsList
