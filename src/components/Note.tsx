import React from 'react'

interface NoteType {
    content : string,
    initialPosition: {
        x: number,
        y: number
    }
}

function Note({content, initialPosition, ...props} : NoteType) {
  return (
    <div 
        style={{
            position: "absolute",
            left: initialPosition.x,
            top: initialPosition.y,
            padding: 30,
            border: "1px solid #000",
            cursor: "move",
            userSelect: "none",
            backgroundColor: "lightyellow"
        }}
        {...props}> 📌 {content}</div>
  )
}

export default Note