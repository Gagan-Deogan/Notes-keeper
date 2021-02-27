import React,{useRef,useState} from 'react'
import addtag from '../assets/add_tag.svg'
import send from '../assets/send.svg'
export const AddTag = ({setFormObj,handleFormSubmit})=> {
    const menu = useRef(null);
    const [labelList,setLabelList] = useState(['javascript','react'])
    const handleExpand = () =>{
        menu.current.style.display = 'block'
    }
    const handleDispand = () =>{
        menu.current.style.display = 'none';
    }
    const handleRemoval = (ind) =>{
        setLabelList((prev)=>prev.filter( (val,i)=> i !== ind ? true : false ) )
    }
    const handleSubmit = (e) =>{
        if(e.key === 'Enter'){
            const input = e.target.value;
            e.target.value = '';
            setLabelList((prev)=> [ ...prev, input])
        }
    }
    const addToCard = (e,val) =>{
        if(e.target.id !=='close'){
            console.log(val);
            setFormObj((prev)=>{
                const nextLabels = [...prev['labels'],val]
                return {...prev,'labels':nextLabels}
            })
        }
    }
    return (
        <div className ='dis-flx pos-rel' >
            <img src={addtag} className='cursor' alt="add-label" onMouseOver={handleExpand}/>
            <img src={send} className="mrg-l-8 cursor" onClick={handleFormSubmit} alt="send"/>
            <ul className="menu-list pos-abs" ref={menu} onMouseLeave={handleDispand} >
                <li className='dis-flx jst-spa-bet'>
                    <input type="text" placeholder='Add Label' className="add-lab" onKeyDown={handleSubmit}/>
                </li>
                {labelList && labelList.map((val,ind) => (
                    <li className='dis-flx jst-spa-bet' key={ind} onClick={(e)=>addToCard(e,val)}>
                        <p>{val}</p>
                        <p onClick={()=>handleRemoval(ind)} id='close'>x</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
