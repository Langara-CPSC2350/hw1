/**
 * Using Papa Parse Library inorder to parse .CSV file
 */

import table from "./table.js";

let tableCSV = document.querySelector("#csvFile");
let csvInput = document.querySelector("#csvInput");
let Table = new table(tableCSV);

/**
 * Event Listener that updates the file each time user inputs a different file.
 */

csvInput.addEventListener("change", update => {
  Papa.parse(csvInput.files[0], {
    skipEmptyLines: true,
    complete: results => {
      //Using .slice(1) since the first line of CSV file is the header
      Table.updateList(results.data.slice(1), results.data[0]);
    }
  });
});
