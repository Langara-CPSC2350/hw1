 /**
  * Using es6 template strings for data.
  *
  */

export default class  {
  /**
   * @param tableElm This will display the CSV data on the table.
   */
  constructor(tableElm) {
    this.table = tableElm;
  }

  /**
   * Clears previous data (In case user uploads a new file right after), and imports the new
   * data.
   *
   * @param data 2D Array of data.
   * @param headerC Headers Column.
   */


  updateList(data, headerC){
    let common = ["Representatives"];


    this.removeList();
    this.createHead(headerC, common);
    this.importData(data);

  }

  /**
   * This method clears all data and header.
   */
  removeList() {
    this.table.innerHTML = "";
  }

  /**
   * Sets the table headers
   * @param headerC
   * @param common Array of Strings for the Divide, Floor and Remain.
   */

  createHead(headerC, common){
    this.table.insertAdjacentHTML("afterbegin", `
        <thead>
            ${ headerC.map(text => `<th>${text}</th>`).join("") }
            ${common.map(cmnText => `<th>${cmnText}</th>`).join("") }
        </thead>
    `);
  }

  /**
   * Imports the data into the table body by using a 2D array of type string and calculates the number of representatives
   * per state.
   * @param data
   */

  importData(data){
    const tableRow = [];
    //Input Hamilton's Apportionment Algorithm here:
    data.sort();
    for (let row of data) {
      tableRow.push(`
            <tr>
                ${row.map(text => `<td> ${text} </td>`).join("")}

            </tr>
               `);
    }
    this.table.insertAdjacentHTML("beforeend", `
        <tbody>
            ${ tableRow.join("") }
        </tbody>
      `);
    // console.log(parseInt(data[0][1]) + parseInt(data[1][1]));
  }
}
