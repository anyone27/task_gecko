// simple application configuration
let config = { width: 1920, height: 1080 };

let app;

// wait for DOM before creating application
window.addEventListener('load', function () {
	//Create a Pixi Application
	app = new PIXI.Application(config);

	//Add the canvas that Pixi automatically created for you to the HTML document
	document.body.appendChild(app.view);

	// app.loader
	// 	.add('spineCharacter', '../assets/symbols/symbol_00.json')
	// 	.load(function (loader, resources) {
	// 		var animation = new PIXI.spine.Spine(resources.spineCharacter.spineData);

	// 		// add the animation to the scene and render...
	// 		app.stage.addChild(animation);

	// 		// run
	// 		var animation = new PIXI.spine.Spine(spineBoyData);
	// 		if (animation.state.hasAnimation('run')) {
	// 			// run forever, little boy!
	// 			animation.state.setAnimation(0, 'run', true);
	// 			// dont run too fast
	// 			animation.state.timeScale = 0.1;
	// 		}

	// 		app.start();
	// 	});

	const symbol1 = PIXI.Sprite.from('../assets/symbols/symbol_00.png');
	const symbol2 = PIXI.Sprite.from('../assets/symbols/symbol_01.png');
	const symbol3 = PIXI.Sprite.from('../assets/symbols/symbol_02.png');
	const symbol4 = PIXI.Sprite.from('../assets/symbols/symbol_03.png');
	const symbol5 = PIXI.Sprite.from('../assets/symbols/symbol_04.png');

	// center the sprite's anchor point
	symbol1.anchor.set(0.5);
	symbol2.anchor.set(0.5);
	symbol3.anchor.set(0.5);
	symbol4.anchor.set(0.5);
	symbol5.anchor.set(0.5);

	symbol1.scale.set(0.2);
	symbol2.scale.set(0.2);
	symbol3.scale.set(0.2);
	symbol4.scale.set(0.2);
	symbol5.scale.set(0.2);

	// move the sprite to the center of the screen
	symbol1.x = app.screen.width / 1.2;
	symbol1.y = app.screen.height / 1.8;

	symbol2.x = app.screen.width / 2;
	symbol2.y = app.screen.height / 1.8;

	symbol3.x = app.screen.width / 7;
	symbol3.y = app.screen.height / 1.8;

	symbol4.x = app.screen.width / 4;
	symbol4.y = app.screen.height / 3;

	symbol5.x = app.screen.width / 1.5;
	symbol5.y = app.screen.height / 3;

	app.stage.addChild(symbol1);
	app.stage.addChild(symbol2);
	app.stage.addChild(symbol3);
	app.stage.addChild(symbol4);
	app.stage.addChild(symbol5);

	app.ticker.add(() => {
		// just for fun, let's rotate mr rabbit a little
		// bunny.rotation += 0.1;
	});
	// new PIXI.spine.Spine();
});
