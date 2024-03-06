import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import React from "react";

/* 
* Function that handles the REPL graphical interface in general, including constants for setting the mode 
* and history, then passing that to REPLHistory and REPLInput. 
* @returns the REPLHistory and REPLInput objects that have been both graphically placed. 
*/

export default function REPL() {

  /**
   * Constant to represent the history of all commands+outputs, which are contained in a JSX Element.
   */
  const [history, setHistory] = useState<JSX.Element[]>([]);

  /**
   * Constant that represents and sets the mode to false. 
   */
  const [mode, setMode] = useState<boolean>(false);


  return (
    <div className="repl">
      <REPLHistory history={history}/>
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} mode={mode} setMode={setMode}/>  
    </div>
  );
}
