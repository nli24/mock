import React from "react";
import "../styles/main.css";

/**
 * Interface that represents the props needed for REPLHistory, which is just for the history array of JSX Elements. 
 */
interface REPLHistoryProps {
  history: JSX.Element[];
}

/**
 * Function that handles the REPLHistory element and graphically places them in the interface. 
 * @param props the history array to be displayed. 
 * @returns a graphical display of each item in the history array. 
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((command) => (
        command
      ))}
    </div>
  );
}
