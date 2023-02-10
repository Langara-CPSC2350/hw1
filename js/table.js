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
    let totalPop = 0;
    for(let i = 0; i < data.length; i++) {
      totalPop += parseInt(data[i][1]);
    }

    let numOfRep = document.getElementById("numOfRep").value;
    let numOfRepVal = parseInt(numOfRep);

    let avgPopPerRep = totalPop/numOfRepVal;

    for(let j = 0; j < data.length; j++) {
      let totalNumOfRep = data[j][1]/avgPopPerRep;
      data[j].push(Math.floor(totalNumOfRep));
    }
    
    let finalNum = 0;
    for(let i = 0; i < data.length; i++) {
      finalNum += data[i][2];
    }

    let remainderArray = [];

    for(let x = 1; x < data.length; x++) {
      remainderArray.push(data[x][1]%avgPopPerRep);
    }

    let missingReps = numOfRepVal - finalNum;
    let max = 0;
    let maxIndex = 0;
    for(let y = 0; y < missingReps; y++) {
      for(let e = 1; e < data.length; e++) {
        if(remainderArray[e] > max) {
          maxIndex = e;
          max = remainderArray[e];
        }
      }
      data[maxIndex][2]++;
    }
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
