import React ,{useRef,useState,useEffect} from 'react'
import {AddTag} from './AddTag'
import {MarkAsPin} from './MarkAsPin'
import {ColorPtale} from './ColorPtale'
import {LabelsList} from './LabelsList'
export const AddNotes = ({setCardDetails,data}) => {
    const textArea = useRef(null);
    const [formObj,setFormObj] = useState( ()=> data || {'title':'','note':'','pin':false,'color':'#ffffff','labels':[],id:''});

    const increaseTextarea = () =>{
        textArea.current.style.height = '40px'
        textArea.current.style.height = textArea.current.scrollHeight+'px'
    }

    const handleTitle = (e)=>{
        setFormObj((prev) =>( {...prev, 'title' : e.target.value }) )
    }

    const handleNoteChange = (e)=>{
        increaseTextarea();
        setFormObj((prev) =>( {...prev, 'note' : e.target.value }) )
    }

    const handleFormSubmit = ()=>{
        if(formObj.title && formObj.note){
            console.log(formObj)
            const newObj = {...formObj , id:new Date()}
            setCardDetails((prev)=>{ 
                const next = [...prev, newObj] ;   
                window.localStorage.setItem('notes',JSON.stringify(next))
                return next;
            })
        }
    }
    const autoSave = () =>{
        if(data){
            setCardDetails( (prev) => {
                const next = prev.map((note)=>{
                    return data.id === note.id ? formObj : note;
                })
                window.localStorage.setItem('notes',JSON.stringify(next))
                return next;
            })
        }
    }
    useEffect(autoSave, [formObj,data,setCardDetails]);

    return (
        <form className="dis-flx dir-col from-cont pos-rel" style={data ? {background:formObj.color,margin:'0px 16px 16px 0px'} : {background:formObj.color}} >
            <MarkAsPin setFormObj={setFormObj} isPinned={formObj['pin']}  />
            <input type="text" key='title' name='title' placeholder="Title" value={formObj['title']} onChange={handleTitle} />
            <textarea type="text" key='Notes' name='Notes' placeholder="Take a note" ref={textArea} value={formObj['note']} onChange={handleNoteChange} />
            <LabelsList list={formObj['labels']} setFormObj={setFormObj} />
            <AddTag setFormObj={setFormObj} handleFormSubmit = {!!!data && handleFormSubmit }  />
            <ColorPtale setFormObj={setFormObj} />
        </form>
    )
}

