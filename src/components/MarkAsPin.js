import React from 'react'
import pinIcon from '../assets/pin.svg'
import fillpin from '../assets/fill_pin.svg'
export const MarkAsPin = ({setFormObj,isPinned}) => {
    const handlepin = () =>{
        setFormObj((prev) =>{ 
            return {...prev, 'pin':!isPinned }
        });
    }
    return (
        <div className='pin-cont pos-abs exp-btn' onClick={handlepin}>
            <img src={ !isPinned ? pinIcon :fillpin } alt='pin-icon'/> 
        </div>
    )
}