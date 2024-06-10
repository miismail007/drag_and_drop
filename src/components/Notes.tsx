import React, { useEffect } from 'react'
import Note from './Note'

type NotesObj = {
    id: number,
    text: string,
    position: {
        x: number,
        y: number
    }
}

interface NotesType {
    notes: Array<NotesObj>,
    setNotes: any
}


function Notes({notes, setNotes} : NotesType) {
    useEffect(() => {
        
        
        const savedNotes = []

        const updatedNotes = notes.map((note) => {
            if(savedNotes.length !== 0){
                return {}
            }else{
                const position = determineNotesPosition()
                return {...note, position}
            }
        })

        setNotes(updatedNotes)
    },[notes.length])
    const determineNotesPosition = () => {
        const maxX = window.innerWidth - 250
        const maxY = window.innerHeight - 250
        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        }
    }
    return (
        <div>
            {notes.map((note) => <Note key={note.id} initialPosition = {note.position} content={note.text}/>)}
        </div>
    )
}

export default Notes
