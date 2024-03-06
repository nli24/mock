import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import {
  REPLFunction,
  viewFunction,
  loadFunction,
  modeFunction,
  searchFunction,
} from "./CommandHandler";

import React from "react";

/**
 * Interface that represents all the props for the REPLInput class, which include the history array and mode boolean
 * along with their setters.
 */
interface REPLInputProps {
  history: JSX.Element[];
  setHistory: Dispatch<SetStateAction<JSX.Element[]>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}

/**
 * Function that handles the logic for when the submit button is clicked, which includes calling the right function
 * and setting the correct graphical input, depending on the mode as well.
 * @param props the history array of JSX elements and the mode boolean, along with their setters.
 * @returns the graphical interface of the user input.
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  /**
   * Constant to represent the map of strings to the correct function, and sets up the map.
   */
  const functionMap = new Map<String, REPLFunction>();
  functionMap.set("mode", modeFunction);
  functionMap.set("load_csv", loadFunction);
  functionMap.set("view", viewFunction);
  functionMap.set("search", searchFunction);

  /**
   * The helper function to handle the logic for submit. This increments the count, and sets the output within
   * the history array. 
   * @param commandString the string containing all the user input in the form of commands. 
   * @return returns the submit button and command interface graphically placed. 
   */
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    let commandArray = commandString.split("+");
    let command = commandArray[0];
    const commandFunction = functionMap.get(command);
    if (commandFunction != undefined) {//if command exists
      commandArray.shift();
      const result = commandFunction(commandArray);
      if (result[0][0] === "Mode Switched!") {
        props.setMode(!props.mode);
      }
      const element = convertArraytoTable(result, command, props.mode);
      props.setHistory([...props.history, element]);
    } else {
      const element = convertArraytoTable(
        [["Command Not Found"]],
        command,
        props.mode
      );
      props.setHistory([...props.history, element]);
    }
    setCommandString("");
  }
 
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}

/**
 * Helper function that converts a 2DArray to a table, along with the command name. 
 * @param data: the 2D Array with the rows/output
 * @param commandName: string representing the command Name
 * @param mode: boolean representing the current mode 
 * @returns an HTML table containing the output and command, if verbose mode. 
 */
export function convertArraytoTable(
  data: Array<Array<string>>,
  commandName: string,
  mode: boolean
) {
  if (mode) {//true = verbose
    return (
      <div>
        <p>Command: {commandName} </p>
        <table>
          <caption> Output: </caption>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={`row_${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`cell_${rowIndex}_${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row_${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell_${rowIndex}_${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
