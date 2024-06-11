import React, { useState } from 'react';
import Notes from './components/Notes';
import { determineNotesPosition } from './utils/helperFunctions';

type NotesObj = {
  id: string,
  text: string,
  position: {
      x: number,
      y: number
  }
}

function App() {
  const savedNotes: Array<NotesObj> = JSON.parse(localStorage.getItem("notes") || JSON.stringify("")) || []
  const [input, setInput] = useState("")
  const [notes, setNotes] = useState(savedNotes)
  return (
    <div className="App">
      <input value={input} onChange={(e) => {setInput(e.target.value)}}/> 
      <button onClick={() => {
        setNotes([...notes, {id: crypto.randomUUID(), text: input, position: determineNotesPosition()}])
        setInput("")
      }}>Add</button>
      <Notes notes={notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;
