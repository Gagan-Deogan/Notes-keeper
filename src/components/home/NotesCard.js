import React from 'react'
import {MarkAsPin} from '../Form/MarkAsPin'
export const NotesCard = ({note}) => {
    return (
        <div className='from-cont mrg-t-16 pos-rel' >
            <MarkAsPin isPinned={note['pin']} />
            <h4 className='title'>{note['title']}</h4>
            <p>{note['note']}</p>
        </div>
    )
}

export default NotesCard
