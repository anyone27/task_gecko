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

// simple application configuration
let config = { width: 1920, height: 1080 };

let app;

// wait for DOM before creating application
window.addEventListener('load', function () {
	//Create a Pixi Application
	app = new PIXI.Application(config);

	//Add the canvas that Pixi automatically created for you to the HTML document
	document.body.appendChild(app.view);

	// create an array to store the multiple assets
	let sprites = [];

	// set directory of assets telling PIXI where to look
	app.loader.baseUrl = '../assets/symbols';

	// import the assets using the PIXI loader, iterate through to create texture, add positioning, scale. Do not insert asset until the spin is complete.
	app.loader
		.add('0', 'symbol_00.png')
		.add('1', 'symbol_01.png')
		.add('2', 'symbol_02.png')
		.add('3', 'symbol_03.png')
		.add('4', 'symbol_04.png')
		.add('5', 'symbol_05.png')
		.load((loader, resources) => {})
		.use((resource, next) => {
			// iterate through results of spin to verify if asset appears, if so display the asset
			sprites[resource.name] = new PIXI.Sprite(resource.texture);
			sprites[resource.name].y = config.height / 2;
			sprites[resource.name].x = config.width / 2;
			sprites[resource.name].scale.set(0.2);
			sprites[resource.name].anchor.set(0.5);
			next();
		});

	// set balance
	let balance = 100;

	// set initial stake
	let stake = 5;

	// Create button element
	let button = document.createElement('button');
	button.innerHTML = 'Spin!';

	// Create the balance display element with a template literal to display current balance
	let displayBalance = document.createElement('div');
	displayBalance.innerHTML = `Your balance is currently ${balance}`;

	// Create the stake display element with a template literal to display current stake
	let displayStake = document.createElement('div');
	displayStake.innerHTML = `Your stake is currently ${stake}`;

	// Create an input used to update the user stake, this only accepts numbers and has a minimum stake of 1
	let changeStake = document.createElement('input');
	changeStake.setAttribute('type', 'number');
	changeStake.setAttribute('placeholder', 'enter your stake');
	changeStake.setAttribute('min', 1);

	// logic for Spin once button is clicked
	button.onclick = function () {
		// on click, disable both the button and change stake input
		button.disabled = true;
		changeStake.disabled = true;

		// if any assets are already loaded, remove these from the stage
		app.stage.removeChildren();

		// check that player has enough balance to play
		if (balance > 0) {
			// generate random whole number within range of responses and find corresponding win amount
			let result =
				data[Math.floor(Math.random() * data.length)].response.results;
			let win = result.win;

			// deduct the stake from the balance
			balance = balance - stake;

			// check if player wins or loses
			if (win > 0) {
				// if player won, add win amount to balance
				balance = balance + win + stake;

				// find the winning symbols from the results data
				let animations = result.symbolIDs;

				let symbol = null;
				let symbolCount = 0;

				// for each of the symbols in the results, count the item
				// The idea here being that if a user gets 3 in a row, that should be the winning item. I couldn't quite see the pattern of the wins in the data so didn't follow through with this line of thinking. On occasion, 2 items in a row was counted as a win or two sets of 2 items.
				animations.forEach((item) => {
					if (symbol === null) symbol = item;
					if (symbol === item) {
						symbolCount++;
					}
				});

				let xpos = 400;

				// add the winning symbol to the stage. This should be multiple copies of the same sprite, however I am currently only able to render 1 of each asset.
				for (let i = 0; i < symbolCount; i++) {
					app.stage.addChild(sprites[symbol]);
					sprites[symbol].x = xpos;
					xpos += 100;

					// add simple animation to the asset, I couldn't get PIXI to accept the JSON/Atlas file types in order to implement the "win" animation.
					app.ticker.add(() => {
						sprites[symbol].rotation += 0.1;
					});
				}

				// alert the player to the win and the win amount
				alert(`You have won ${win}`);
			} else {
				// if player lost, tell them losing amount
				alert(`You have lost ${stake}`);
			}

			// if player still has positive balance then update this figure and enable the spin button and stakes input
			if (balance > 0) {
				displayBalance.innerHTML = `Your balance is currently ${balance}`;
				button.disabled = false;
				changeStake.disabled = false;

				// if player balance is 0 or below, set balance to 0 to avoid negative balance and alert user that they have run out of money
			} else {
				displayBalance.innerHTML = `Your balance is currently 0`;
				alert('you have run out of money');
			}

			// this is a catch all if the player balance was for some reason 0 or below in the first instance
		} else {
			alert('you have run out of money');
		}
	};

	// When the stake is changed it updates the value of the displayStake element
	changeStake.onchange = function () {
		stake = changeStake.value;
		displayStake.innerHTML = `Your stake is currently ${stake}`;
	};

	// Create a container element for the user info including buttons and text elements.
	let userInfo = document.createElement('div');
	document.body.append(userInfo);
	userInfo.className = 'userInfo';

	// insert all elements into the DOM
	userInfo.appendChild(button);
	userInfo.appendChild(displayBalance);
	userInfo.appendChild(displayStake);
	userInfo.appendChild(changeStake);
});
