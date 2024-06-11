import React, { forwardRef, Ref } from 'react'

interface NoteType {
    content : string,
    initialPosition: {
        x: number,
        y: number
    },
    onMouseDown: any
}

const Note = forwardRef(({content, initialPosition, ...props} : NoteType, ref:any) => {
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
        ref={ref}
        {...props}> 📌 {content}</div>
  )
})

export default Note