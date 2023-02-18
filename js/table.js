/**
 * Using es6 template strings for data.
 *
 */
let userChoice;
let totalStates = 0;
function pick(choice) {
	userChoice = choice;
}

let button1 = document.getElementById("hamilton");

button1.addEventListener("click", evt =>{
	pick(1);
})

let button2 = document.getElementById("huntington");

button2.addEventListener("click", evt =>{
	pick(0);
})
export default class {
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


	updateList(data, headerC) {
		let common = ['Representatives'];
		this.removeList();
		this.createHead(headerC, common);
		this.importData(data);
	}

	/**
	 * This method clears all data and header.
	 */
	removeList() {
		this.table.innerHTML = '';
	}

	/**
	 * Sets the table headers
	 * @param headerC
	 * @param common Array of Strings for the Divide, Floor and Remain.
	 */

	createHead(headerC, common) {
		this.table.insertAdjacentHTML(
			'afterbegin',
			`
        <thead>
            ${headerC.map((text) => `<th>${text}</th>`).join('')}
            ${common.map((cmnText) => `<th>${cmnText}</th>`).join('')}
        </thead>
    `
		);
	}

	/**
	 * Imports the data into the table body by using a 2D array of type string and calculates the number of representatives
	 * per state.
	 * @param data
	 */

	importData(data) {
		let numOfRep = document.getElementById("numOfRep").value;
		let numOfRepVal = parseInt(numOfRep);
		for (let i = 0; i < data.length; i++) {
			totalStates++;
		}
		/**
		 * Purpose: If else statement holds the two algorithms necessary to calculate the representatives for each state
		 * if user does not input enough representatives (total states is larger than rep count) then the program will not work
		 */
		if (numOfRepVal < totalStates) {
			alert("error: Not enough representatives, please try again");
		} else {
			const tableRow = [];
			if (userChoice === 0) {
				//this means that they are going with huntington algorithm
					let count = 0; //this allows us to check how many states have already been given a representatives before giving out the remainders
					let priorityArray = []; //create to store each priority value of each state
					for (let i = 0; i < data.length; i++) {
						data[i].push(1);
						priorityArray.push(data[i][1] / Math.sqrt((data[i][2] * (data[i][2] + 1)))); //this code is the formula given to us
						count++;
					}
					for (let i = 0; i < (numOfRep - count); i++) {
						let maxIndex = 0;
						let max = 0;
						for (let j = 0; j < priorityArray.length; j++) {
							if (max < priorityArray[j]) {
								maxIndex = j;
								max = priorityArray[j];
							}
						}
						data[maxIndex][2]++ //adds one representative to the state
						priorityArray = [];
						for (let i = 0; i < data.length; i++) {
							priorityArray.push(data[i][1] / Math.sqrt((data[i][2] * (data[i][2] + 1)))); //this is the formula code
						}
					}
			} else {
				// this means they are going with Hamiliton algorithm
				let totalPop = 0;
				for (let i = 0; i < data.length; i++) {
					totalPop += parseInt(data[i][1]);
				}

				let avgPopPerRep = totalPop / numOfRepVal;

				for (let j = 0; j < data.length; j++) {
					let totalNumOfRep = data[j][1] / avgPopPerRep;
					data[j].push(Math.floor(totalNumOfRep)); //push total into data array
				}

				let finalNum = 0;
				for (let i = 0; i < data.length; i++) {
					finalNum += data[i][2];
				}

				let remainderArray = []; //this stores the remainder of each state population

				for (let x = 1; x < data.length; x++) {
					remainderArray.push(data[x][1] % avgPopPerRep);
				}

				let missingReps = numOfRepVal - finalNum; //the remaining reps that need to be added to states
				let max = 0;
				let maxIndex = 0;
				for (let y = 0; y < missingReps; y++) {
					for (let e = 1; e < data.length; e++) {
						if (remainderArray[e] > max) {
							maxIndex = e;
							max = remainderArray[e];
						}
					}
					data[maxIndex][2]++; //adds one representative to the state
				}
			}
			data.sort();
			for (let row of data) {
				tableRow.push(`
            <tr>
                ${row.map((text) => `<td> ${text} </td>`).join('')}

            </tr>
               `);
			}
			this.table.insertAdjacentHTML(
				'beforeend',
				`
        <tbody>
            ${tableRow.join('')}
        </tbody>
      `
			);

			// Define the content of the CSV file as a string
			let csvContent = 'data:text/csv;charset=utf-8,';

			// Loop through each row of data
			data.forEach(function (rowArray) {
				// Join the elements of the row array into a string
				let data = rowArray.join(',');
				// Add the row string to the overall CSV content
				csvContent += data + '\r\n';
			});

			// Encode the CSV content as a URI
			let encodedUri = encodeURI(csvContent);
			// Open the encoded URI in a new window
			window.open(encodedUri);
		}
	}
}
