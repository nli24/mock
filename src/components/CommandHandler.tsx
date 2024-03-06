/**
 * This class contains the various REPL functions and the logic for those functions. It then returns a 2DArray containing
 * the resulting output. 
 * The mocked data is also imported in this class, then passed to the various functions that need to access data. 
 */

import { drinksCSV, fruitCSV, noHeaderCSV } from "../mockedJson";


const mockedData = new Map<string, Array<Array<string>>>();
mockedData.set("fruitCSV", fruitCSV);
mockedData.set("drinksCSV", drinksCSV);
mockedData.set("noHeaderCSV", noHeaderCSV);

let globalData: string[][] = [];// variable to represent data 
let loaded: Boolean = false;// variable to represent load status

/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 * 
 * The arguments passed in the input should *NOT* contain the command-name prefix. 
 * They will contain arguments needed for searching, if anything at all. 
 */

export interface REPLFunction {
  (args: Array<string>): string[][];
}

/**
 * A function that handles the mode command 
 * @param commandArray the array of command arguments to be passed in
 * @returns string output that represents the mode has been switched. 
 */
export const modeFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  return [["Mode Switched!"]];
};

/**
 * A function that handles the load_csv command
 * @param commandArray array of strings that holds the filepath
 * @returns 2dArray of string output representing load success or failure 
 */
export const loadFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  let data = mockedData.get(commandArray[0]);
  if (data != undefined) {
    globalData = data;
    loaded = true;
    return [["Success!"]];
  } else {
    loaded = false;
    return [["File Not Found!"]];
  }
};

/**
 * Function that handles the view command. 
 * @param commandArray Array of strings containing arguments to be passed in. 
 * @returns the data if successful, a 2darray containging failure response if failed. 
 */
export const viewFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  if (loaded) {
    return globalData;
  } else {
    return [["Failure: View Without Load"]];
  }
};


/**
 * Function that handles the search command. 
 * @param commandArray Array of strings with search arguments like column/index, search value, headers. 
 * @returns 2dArray containing row response if success or a failure message if failed. 
 */
export const searchFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  let headers = commandArray[2];
  let value = commandArray[1];
  const results: string[][] = [];
  let headerIndex = 0;

  if (loaded) {
    if (commandArray.length === 3) {//checking correct argument length
      if (isNaN(parseInt(commandArray[0]))) { //column Name
        for (let i = 0; i < globalData[i].length; i++) {
          if (globalData[0][i] === commandArray[0]) {
            headerIndex = i;
          }
        }
      } else {
        headerIndex = parseInt(commandArray[0]);//column index
      }
      if (headers === "Y") {//if yes headers
        for (let i = 1; i < globalData.length; i++) {
          if (globalData[i][headerIndex] === value) {
            results.push(globalData[0]);
            results.push(globalData[i]);
          }
        }
      }
      if (headers === "N") {//if no headers
        for (let i = 0; i < globalData.length; i++) {
          if (globalData[i][parseInt(commandArray[0])] === value) {
            results.push(globalData[i]);
          }
        }
      }
      if (results.length === 0) {
        return [["No results found!"]]
      }
      return results;
    } else {
      return [["Failure: Incorrect Number of Arguments"]];
    }
  } else {
    return [["Failure: Search Without Load"]];
  }
};
