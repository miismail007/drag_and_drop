import React, { createRef, useEffect, useRef } from 'react'
import { determineNotesPosition } from '../utils/helperFunctions'
import Note from './Note'

type NotesObj = {
    id: string,
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
        const savedNotes: Array<NotesObj> = JSON.parse(localStorage.getItem("notes") || JSON.stringify("")) || []
        // const savedNotes: Array<NotesObj> = []
        const updatedNotes = notes.map((note) => {
            const savedNote = savedNotes.find((n) => n.id == note.id)
            if(savedNote){
                return {...note, position: savedNote.position}
            }else{
                const position = determineNotesPosition()
                return {...note, position}
            }
        })
        setNotes(updatedNotes)
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
    },[notes.length])

    const notesRef: any = useRef([])

    const handleDragStart = (note: NotesObj, e: MouseEvent) => {
        const { id } = note
        const noteRef = notesRef.current[id].current
        const rect = noteRef.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top
        const startPos = note;
    
        const handleMouseMove = (e: MouseEvent) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            noteRef.style.left = `${newX}px`
            noteRef.style.top = `${newY}px`
        }
        const handleMouseUp = (e: MouseEvent) => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)

            const finalRect = noteRef.getBoundingClientRect()
            const newPosition = {x: finalRect.left, y: finalRect.top}

            if(false){// check for overlap

            }else{
                updateNewPosition(id, newPosition)
            }
            


        }

        const updateNewPosition = (id: string, newPosition: {x: number, y: number}) => {
            const updatedNotes = notes.map((note: NotesObj) => {
                return note.id === id ? {...note, position: newPosition} : note
            })
            setNotes(updatedNotes)
            localStorage.setItem("notes", JSON.stringify(updatedNotes))
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    
    return (
        <div>
            {notes.map((note) => 
                <Note 
                    key={note.id} 
                    initialPosition = {note.position} 
                    content={note.text}
                    ref = {notesRef.current[note.id] ? notesRef.current[note.id] : (notesRef.current[note.id] = createRef())}
                    onMouseDown = {(e: MouseEvent) => handleDragStart(note, e)}
                />)}
        </div>
    )
}

export default Notes
