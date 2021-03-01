import React from 'react';

export const SearchBar = ({serachBy,setSearchBy,onlyPin,setOnlyPin}) =>{
    const handleSearch =(e)=>{
        setSearchBy(e.target.value);
    }
    const handlePinChange = (e)=>{
        setOnlyPin(e.target.checked);
    }
    return(
        <div className='dis-flx pos-rel search-cont jst-spa-btw'>
            <input type='text' onChange={handleSearch} className='search-bar' placeholder='Enter the Label' />
            <label htmlFor="pin" className='pin-lab'>Pin</label>
            <div className="button r" id="button-2" >
                <input type="checkbox" checked={onlyPin} className="checkbox" name="pin" onChange={handlePinChange}/>
                <div className="knobs"></div>
                <div className="layer"></div>
            </div>
        </div>
    )
}