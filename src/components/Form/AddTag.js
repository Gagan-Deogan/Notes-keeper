import React,{useRef,useState} from 'react'
import addtag from '../../assets/add_tag.svg'
import send from '../../assets/send.svg'
import deleteIcon from '../../assets/delete.svg'
export const AddTag = ({setFormObj,handleFormSubmit,id,handleRemNote})=> {
    const menu = useRef(null);

    const [labelList,setLabelList] = useState(()=>{
        let loaclListOfLabels = localStorage.getItem('labelList')
        if(!!!loaclListOfLabels){
            window.localStorage.setItem('labelList',JSON.stringify(['javascript']))
            return [];
        }else{
            return JSON.parse(loaclListOfLabels);
        }
    })
    
    const handleExpand = () =>{
        menu.current.style.display = 'block'
    }
    
    const handleDispand = () =>{
        menu.current.style.display = 'none';
    }
    
    const handleRemoval = (ind) =>{
        setLabelList((prev)=>{
            const next = prev.filter( (val,i)=> i !== ind ? true : false );
            window.localStorage.setItem('labelList',JSON.stringify(next))
            return next;
        })
    }
    
    const handleSubmit = (e) =>{
        if(e.key === 'Enter'){
            const input = e.target.value;
            e.target.value = '';
            setLabelList((prev)=>{ 
                const next = [ ...prev, input];
                window.localStorage.setItem('labelList',JSON.stringify(next))
                console.log(next);
                return next;
            })
        }
    }
    
    const addToCard = (e,val) =>{
        if(e.target.id !=='close'){
            console.log(val);
            setFormObj((prev)=>{
                const nextLabels = prev['labels'].includes(val) ? [...prev['labels']] : [...prev['labels'],val];
                return {...prev,'labels':nextLabels}
            })
        }
    }
    
    

    return (
        <div className ='dis-flx pos-rel' >
            <img src={addtag} className='cursor' alt="add-label" onMouseOver={handleExpand}/>
            {handleFormSubmit ? <img src={send} className="mrg-l-8 cursor" onClick={handleFormSubmit} alt="send"/> : <img src={deleteIcon} className="mrg-l-8 cursor" onClick={()=>handleRemNote(id)} alt="send"/>  }
            <ul className="menu-list pos-abs" ref={menu} onMouseLeave={handleDispand} >
                <li className='dis-flx jst-spa-bet'>
                    <input type="text" placeholder='Add Label' className="add-lab" onKeyDown={handleSubmit}/>
                </li>
                {labelList && labelList.map((val,ind) => (
                    <li className='dis-flx jst-spa-bet cursor' key={ind} onClick={(e)=>addToCard(e,val)}>
                        <p>{val}</p>
                        <p onClick={()=>handleRemoval(ind)} id='close'>x</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
