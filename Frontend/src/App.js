import React, { useState } from "react";
import InputForm from "./components/InputForm";
import { title } from "./styles/styles"; // Import the styles

function App() {
  const [titleToDisplay, setTitleToDisplay] = useState('URL Shortening Service')
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={title}>{titleToDisplay}</h1>
        <InputForm setTitleToDisplay={setTitleToDisplay}/>
      </header>
    </div>
  );
}

export default App;
