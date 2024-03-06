import React from 'react';
import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * Interface for props that the controlled input needs to know about. 
 */
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }
  
/**
 * Function that sets up the input box, where the user will input the comand. 
 * @param ControlledInputProps parameters that contain the value, and the label to reference the user input box.
 * @returns the input, properly formatted within JSX.
 */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }