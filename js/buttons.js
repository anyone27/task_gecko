//Dummy JSON responses
let data = [
	{
		response: {
			results: {
				win: 0,
				symbolIDs: [2, 5, 2, 1],
			},
		},
	},

	{
		response: {
			results: {
				win: 8,
				symbolIDs: [5, 5, 5, 1],
			},
		},
	},

	{
		response: {
			results: {
				win: 0,
				symbolIDs: [0, 3, 1, 4],
			},
		},
	},

	{
		response: {
			results: {
				win: 0,
				symbolIDs: [5, 4, 1, 1],
			},
		},
	},

	{
		response: {
			results: {
				win: 2,
				symbolIDs: [1, 1, 5, 3],
			},
		},
	},

	{
		response: {
			results: {
				win: 4,
				symbolIDs: [2, 2, 2, 3],
			},
		},
	},

	{
		response: {
			results: {
				win: 4,
				symbolIDs: [5, 5, 2, 2],
			},
		},
	},

	{
		response: {
			results: {
				win: 3,
				symbolIDs: [2, 2, 3, 5],
			},
		},
	},

	{
		response: {
			results: {
				win: 0,
				symbolIDs: [4, 5, 3, 5],
			},
		},
	},

	{
		response: {
			results: {
				win: 8,
				symbolIDs: [5, 5, 5, 3],
			},
		},
	},

	{
		response: {
			results: {
				win: 9,
				symbolIDs: [3, 3, 3, 3],
			},
		},
	},

	{
		response: {
			results: {
				win: 6,
				symbolIDs: [4, 4, 4, 5],
			},
		},
	},

	{
		response: {
			results: {
				win: 1,
				symbolIDs: [0, 0, 3, 5],
			},
		},
	},

	{
		response: {
			results: {
				win: 5,
				symbolIDs: [1, 1, 1, 2],
			},
		},
	},

	{
		response: {
			results: {
				win: 0,
				symbolIDs: [2, 5, 2, 2],
			},
		},
	},

	{
		response: {
			results: {
				win: 5,
				symbolIDs: [2, 2, 2, 5],
			},
		},
	},

	{
		response: {
			results: {
				win: 0,
				symbolIDs: [4, 3, 0, 5],
			},
		},
	},

	{
		response: {
			results: {
				win: 6,
				symbolIDs: [3, 3, 3, 0],
			},
		},
	},

	{
		response: {
			results: {
				win: 8,
				symbolIDs: [2, 2, 2, 2],
			},
		},
	},

	{
		response: {
			results: {
				win: 0,
				symbolIDs: [0, 1, 5, 4],
			},
		},
	},
];

let balance = 100;
let stake = 20;

let button = document.createElement('button');
button.innerHTML = 'Spin!';
button.id = 'buttonClick';

button.onclick = function () {
	button.disabled = true;
	if (balance > 0) {
		let result =
			data[Math.floor(Math.random() * data.length)].response.results.win;
		console.log(result);
		if (result > 0) {
			balance = balance + result;
		} else {
			balance = balance - stake;
		}
		if (balance > 0) {
			displayBalance.innerHTML = `Your balance is currently ${balance}`;
			alert(`You have won ${result}`);
			button.disabled = false;
		} else {
			displayBalance.innerHTML = `Your balance is currently 0`;
			alert('you have run out of money');
		}
	} else {
		alert('you have run out of money');
	}
};

let displayBalance = document.createElement('div');
displayBalance.innerHTML = `Your balance is currently ${balance}`;

let displayStake = document.createElement('div');
displayStake.innerHTML = `Your stake is currently ${stake}`;

document.body.append(button);
this.document.body.append(displayBalance);
this.document.body.append(displayStake);
