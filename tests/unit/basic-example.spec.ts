/*
  Demo: test ordinary Java/TypeScript
*/

import { expect, test } from "vitest";
import * as main from "../../src/main";
import {convertArraytoTable} from "../../src/components/REPLInput"

test("is 1 + 1 = 2?", () => {
  expect(1 + 1).toBe(2);
});

test("main.zero() should return 0", () => {
  expect(main.zero()).toBe(0);
});

test("convertArrayToTable produces correct table, brief mode", () => {
  const data = [
  ["Name", "ID", "Calories"],
  ["Apple", "1", "95"],
  ["Banana", "2", "105"],
  ["Peach", "3", "50"],
];
  const commandName = "view";
  const mode = false;
  const result = convertArraytoTable(data,commandName,mode);
  // const expectedResult = (
  //   <div>
  //     <p>Command: TestCommand</p>
  //     <table>
  //       <caption> Output: </caption>
  //       <tbody>
  //         <tr key="row_0">
  //           <td key="cell_0_0">A</td>
  //           <td key="cell_0_1">B</td>
  //         </tr>
  //         <tr key="row_1">
  //           <td key="cell_1_0">C</td>
  //           <td key="cell_1_1">D</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // );
  // expect(result).toEqual(expectedResult);
});

// For more information on how to make unit tests, visit:
// https://jestjs.io/docs/using-matchers
