import React, { useState } from 'react';
import Notes from './components/Notes';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "first statement",
      position: {
        x: 0,
        y: 0
    }
    },
    {
      id: 2,
      text: "second statement",
      position: {
        x: 0,
        y: 0
    }
    }
  ])
  return (
    <div className="App">
      <Notes notes={notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;
