import React ,{useRef,useState} from 'react'
import {AddTag} from './AddTag'
import {MarkAsPin} from './MarkAsPin'
import {ColorPtale} from './ColorPtale'
import {LabelsList} from './LabelsList'
export const AddNotes = () => {
    const textArea = useRef(null);
    const [formObj,setFormObj] = useState({'title':'','note':'','pin':false,'color':'#ffffff','labels':['java','coffe']});
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
        if(formObj.title && formObj.note)
            console.log(formObj)
    }
    return (
        <form className="dis-flx dir-col from-cont pos-rel" style={{background:formObj.color}} >
            <MarkAsPin setFormObj={setFormObj} isPinned={formObj['pin']}  />
            <input type="text" key='title' className="inp-Title" name='title' placeholder="Title" value={formObj['title']} onChange={handleTitle} />
            <textarea type="text" key='Notes' name='Notes' placeholder="Take a note" ref={textArea} value={formObj['note']} onChange={handleNoteChange} />
            <LabelsList list={formObj['labels']} setFormObj={setFormObj} />
            <AddTag setFormObj={setFormObj} handleFormSubmit={handleFormSubmit} />
            <ColorPtale setFormObj={setFormObj} />
        </form>
    )
}

