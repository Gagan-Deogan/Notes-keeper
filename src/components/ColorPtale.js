import React from 'react'

export const ColorPtale = ({setFormObj}) => {
    const colorList = ['linear-gradient(#F9EFAF, #F7E98D)','linear-gradient(#d6f9af, #8df78d)','linear-gradient(#aff9e9, #8df7d7)','linear-gradient(#f9afaf, #f7ab8d)','#ffffff']
    const handleColorChange = (val)=>{
        setFormObj((prev)=>{
            return {...prev , 'color': val}
        })
    }
    return (
        <div className='dis-flx palette-cont pos-abs jst-spa-bet' >
            {colorList.map((val,ind) => (
                <div className='circle cursor' style={{background:val}} onClick={()=>handleColorChange(val)} key={ind} > </div>
            ))}
        </div>
    )
}
