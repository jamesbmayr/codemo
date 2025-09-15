/*** globals ***/
	/* triggers */
		var TRIGGERS = {
			resize: "resize",
			submit: "submit",
			change: "change",
			keydown: "keydown"
		}

	/* constants */
		var CONSTANTS = {
			cameraMove: 10,
			circle: Math.PI * 2,
			templateSize: 10,
			roomTemplates: [
				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,1,1,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,0,1,1,0,1,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,1,0,1,1,0,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,0,1,1,0,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[0,0,1,0,1,1,0,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,0,1,1,0,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[0,0,0,0,1,1,0,0,0,0]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,1,1,1,1,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,1,1,1,0,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,0,1,1,1,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,1,1,1,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,1,1,1,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,0,1,0,0,1,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,0,1,1,0,0]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,1,0,0,1,1,0,1]	,
					[1,0,0,1,0,0,1,0,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,1,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,1,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,1,1,0,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,0,1,1,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,1,0,1,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,1,0,1,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,1,0,1,1,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,1,1,0,1,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,0,1,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,1,0,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,1,0,1,1,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,1,1,0,1,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,1,1,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,1,1,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,0,1,1,1,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[0,0,1,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,1,0,0]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,1,1,1,0,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,1,1,1,1,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,1,1,1,1,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,1,1,1,1,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,1,1,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,1,1,1,1,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],


				[	[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,0,0,0,0,0,0,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	],

				[	[1,1,0,0,0,0,0,0,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,0,0,0,0,0,0,1,1]	],

				[	[1,1,1,0,0,0,0,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,0,0,0,0,1,1,1]	],

				[	[1,1,1,1,0,0,1,1,1,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[0,0,1,0,0,0,0,1,0,0]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,1,0,0,0,0,1,0,1]	,
					[1,0,0,0,0,0,0,0,0,1]	,
					[1,1,1,1,0,0,1,1,1,1]	],
			]
		}

	/* elements */
		var ELEMENTS = {
			body: document.body,
			canvas: document.querySelector("#map"),
			context: document.querySelector("#map").getContext("2d"),
			download: {
				form: document.querySelector("#download-form"),
				canvas: document.querySelector("#download-map"),
				context: document.querySelector("#download-map").getContext("2d"),
			},
			settings: {
				element: document.querySelector("#settings"),
				open: document.querySelector("#settings-open-form"),
				close: document.querySelector("#settings-close-form"),
				form: document.querySelector("#settings-generate-form"),
				background: document.querySelector("#settings-background"),
				cellsize: document.querySelector("#settings-cellsize"),
				rooms: {
					x: document.querySelector("#settings-rooms-x"),
					y: document.querySelector("#settings-rooms-y"),
				},
				exterior: {
					color: document.querySelector("#settings-exterior-color"),
					size: document.querySelector("#settings-exterior-size"),
					roundness: document.querySelector("#settings-exterior-roundness"),
					count: document.querySelector("#settings-exterior-count"),
				},
				wall1: {
					color: document.querySelector("#settings-wall1-color"),
					roundness: document.querySelector("#settings-wall1-roundness"),
					size: document.querySelector("#settings-wall1-size"),
				},
				wall2: {
					color: document.querySelector("#settings-wall2-color"),
					roundness: document.querySelector("#settings-wall2-roundness"),
					size: document.querySelector("#settings-wall2-size"),
					count: document.querySelector("#settings-wall2-count"),
				},
				wall3: {
					color: document.querySelector("#settings-wall3-color"),
					roundness: document.querySelector("#settings-wall3-roundness"),
					size: document.querySelector("#settings-wall3-size"),
					count: document.querySelector("#settings-wall3-count"),
				},
				item1: {
					color: document.querySelector("#settings-item1-color"),
					roundness: document.querySelector("#settings-item1-roundness"),
					size: document.querySelector("#settings-item1-size"),
					count: document.querySelector("#settings-item1-count"),
				},
				item2: {
					color: document.querySelector("#settings-item2-color"),
					roundness: document.querySelector("#settings-item2-roundness"),
					size: document.querySelector("#settings-item2-size"),
					count: document.querySelector("#settings-item2-count"),
				},
				item3: {
					color: document.querySelector("#settings-item3-color"),
					roundness: document.querySelector("#settings-item3-roundness"),
					size: document.querySelector("#settings-item3-size"),
					count: document.querySelector("#settings-item3-count"),
				}
			}
		}

	/* map */
		var MAP = {
			grid: null,
			options: null,
			camera: {
				x: 0,
				y: 0
			}
		}

/*** interaction ***/
	/* resizeScreen */
		resizeScreen()
		window.addEventListener(TRIGGERS.resize, resizeScreen)
		function resizeScreen(event) {
			try {
				// get size
					var height = window.innerHeight
					var width  = window.innerWidth

				// update canvas
					ELEMENTS.canvas.height = height
					ELEMENTS.canvas.width = width

				// redraw
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context, MAP)
			} catch (error) {console.log(error)}
		}

	/* openSettings */
		ELEMENTS.settings.open.addEventListener(TRIGGERS.submit, openSettings)
		function openSettings(event) {
			try {
				// already open?
					if (!ELEMENTS.settings.element.getAttribute("invisible")) {
						ELEMENTS.settings.element.setAttribute("invisible", true)
						return
					}

				// unhide settings
					ELEMENTS.settings.element.removeAttribute("invisible")
			} catch (error) {console.log(error)}
		}

	/* closeSettings */
		ELEMENTS.settings.close.addEventListener(TRIGGERS.submit, closeSettings)
		function closeSettings(event) {
			try {
				// hide settings
					ELEMENTS.settings.element.setAttribute("invisible", true)
			} catch (error) {console.log(error)}
		}

	/* submitSettings */
		ELEMENTS.settings.form.addEventListener(TRIGGERS.submit, submitSettings)
		function submitSettings(event) {
			try {
				// close
					closeSettings()

				// clear map
					MAP = {
						grid: null,
						options: null,
						camera: {
							x: 0,
							y: 0
						}
					}
					resizeScreen()

				// get values
					MAP.options = {
						background: ELEMENTS.settings.background.value || "transparent",
						cellsize: Number(ELEMENTS.settings.cellsize.value) || 1,
						rooms: {
							x: Number(ELEMENTS.settings.rooms.x.value) || 1,
							y: Number(ELEMENTS.settings.rooms.y.value) || 1,
						},
						exterior: {
							color: ELEMENTS.settings.exterior.color.value || "transparent",
							size: Number(ELEMENTS.settings.exterior.size.value) || 0,
							roundness: Number(ELEMENTS.settings.exterior.roundness.value) || 0,
							count: Number(ELEMENTS.settings.exterior.count.value) || 0,
						},
						wall1: {
							color: ELEMENTS.settings.wall1.color.value || "transparent",
							roundness: Number(ELEMENTS.settings.wall1.roundness.value) || 0,
							size: Number(ELEMENTS.settings.wall1.size.value) || 0,
						},
						wall2: {
							color: ELEMENTS.settings.wall2.color.value || "transparent",
							roundness: Number(ELEMENTS.settings.wall2.roundness.value) || 0,
							size: Number(ELEMENTS.settings.wall2.size.value) || 0,
							count: Number(ELEMENTS.settings.wall2.count.value) || 0,
						},
						wall3: {
							color: ELEMENTS.settings.wall3.color.value || "transparent",
							roundness: Number(ELEMENTS.settings.wall3.roundness.value) || 0,
							size: Number(ELEMENTS.settings.wall3.size.value) || 0,
							count: Number(ELEMENTS.settings.wall3.count.value) || 0,
						},
						item1: {
							color: ELEMENTS.settings.item1.color.value || "transparent",
							roundness: Number(ELEMENTS.settings.item1.roundness.value) || 0,
							size: Number(ELEMENTS.settings.item1.size.value) || 0,
							count: Number(ELEMENTS.settings.item1.count.value) || 0,
						},
						item2: {
							color: ELEMENTS.settings.item2.color.value || "transparent",
							roundness: Number(ELEMENTS.settings.item2.roundness.value) || 0,
							size: Number(ELEMENTS.settings.item2.size.value) || 0,
							count: Number(ELEMENTS.settings.item2.count.value) || 0,
						},
						item3: {
							color: ELEMENTS.settings.item3.color.value || "transparent",
							roundness: Number(ELEMENTS.settings.item3.roundness.value) || 0,
							size: Number(ELEMENTS.settings.item3.size.value) || 0,
							count: Number(ELEMENTS.settings.item3.count.value) || 0,
						}
					}

				// generate map
					MAP.grid = generateMap(MAP.options)

				// update visible map
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context, MAP)

				// update invisible map
					ELEMENTS.download.canvas.width = MAP.options.cellsize * (MAP.options.exterior.count * 2 + MAP.options.rooms.x * CONSTANTS.templateSize)
					ELEMENTS.download.canvas.height = MAP.options.cellsize * (MAP.options.exterior.count * 2 + MAP.options.rooms.y * CONSTANTS.templateSize)
					drawCanvas(ELEMENTS.download.canvas, ELEMENTS.download.context, MAP)
			} catch (error) {console.log(error)}
		}

	/* moveCamera */
		window.addEventListener(TRIGGERS.keydown, moveCamera)
		function moveCamera(event) {
			try {
				// settings?
					if (!ELEMENTS.settings.element.getAttribute("invisible")) {
						return
					}

				// arrow keys
					if (event.key == "ArrowUp") {
						MAP.camera.y -= CONSTANTS.cameraMove
					}
					else if (event.key == "ArrowRight") {
						MAP.camera.x -= CONSTANTS.cameraMove
					}
					else if (event.key == "ArrowDown") {
						MAP.camera.y += CONSTANTS.cameraMove
					}
					else if (event.key == "ArrowLeft") {
						MAP.camera.x += CONSTANTS.cameraMove
					}
					else {
						return
					}

				// redraw
					drawCanvas(ELEMENTS.canvas, ELEMENTS.context, MAP)
			} catch (error) {console.log(error)}
		}

	/* downloadImage */
		ELEMENTS.download.form.addEventListener(TRIGGERS.submit, downloadImage)
		function downloadImage(event) {
			try {
				// package up
					var exportLink = document.createElement("a")
						exportLink.id = "export-link"
						exportLink.setAttribute("href", ELEMENTS.download.canvas.toDataURL("image/png"))
						exportLink.setAttribute("download", "arenaMapper_" + (new Date().getTime()) + ".png")
						exportLink.addEventListener("click", function(event) {
							var exportLink = event.target
							ELEMENTS.body.removeChild(exportLink)
						})
			
				// click
					ELEMENTS.body.appendChild(exportLink)
					exportLink.click()
			} catch (error) {console.log(error)}
		}

/*** assetManager ***/
	/* storeAsset */
		window.ASSETS_J.storeAsset = async function(type) {
			try {
				// png
					return {
						name: "arenaMapper_" + (new Date().getTime()) + ".png",
						type: "png",
						data: ELEMENTS.download.canvas.toDataURL("image/png")
					}
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* chooseRandom */
		function chooseRandom(array) {
			try {
				// not an array
					if (!Array.isArray(array)) {
						return array
					}

				// random element from array
					return array[Math.floor(Math.random() * array.length)]
			} catch (error) {console.log(error)}
		}

/*** map ***/
	/* generateMap */
		function generateMap(options) {
			try {
				// computed size
					var mapX = options.rooms.x * CONSTANTS.templateSize + options.exterior.count * 2 // 2 --> outer edges
					var mapY = options.rooms.y * CONSTANTS.templateSize + options.exterior.count * 2 // 2 --> outer edges

				// empty map
					var grid = []
					var spaceCells = []
					var wallCells = []

				// loop through to create empty grid
					for (var x = 0; x < mapX; x++) {
						grid[x] = []

						for (var y = 0; y < mapY; y++) {
							grid[x][y] = {x: x, y: y, type: "space"}
						}
					}

				// exterior
					if (options.exterior.count) {
						for (var x = 0; x < mapX; x++) {
							for (var y = 0; y < options.exterior.count; y++) {
								grid[x][y].type        = "exterior"
								grid[x][mapY - 1 - y].type = "exterior"
							}
						}
						for (var y = 0; y < mapY; y++) {
							for (var x = 0; x < options.exterior.count; x++) {
								grid[x][y].type        = "exterior"
								grid[mapX - 1 - x][y].type = "exterior"
							}
						}
					}

				// create walls
					for (var roomX = 0; roomX < options.rooms.x; roomX++) {
						for (var roomY = 0; roomY < options.rooms.y; roomY++) {
							var template = chooseRandom(CONSTANTS.roomTemplates)

							for (var x = 0; x < CONSTANTS.templateSize; x++) {
								for (var y = 0; y < CONSTANTS.templateSize; y++) {
									var computedX = options.exterior.count + roomX * CONSTANTS.templateSize + x
									var computedY = options.exterior.count + roomY * CONSTANTS.templateSize + y
									grid[computedX][computedY].type = template[x][y] ? "wall1" : "space"
									
									if (template[x][y] == 0) {
										spaceCells.push(computedX + "," + computedY)
									}
									else if (template[x][y] == 1) {
										wallCells.push(computedX + "," + computedY)
									}
								}
							}
						}
					}

				// create wall2
					for (var wall2Count = 0; wall2Count < options.wall2.count; wall2Count++) {
						var cell = chooseRandom(wallCells)
						if (!cell) {
							break
						}

						var cellX = Number(cell.split(",")[0])
						var cellY = Number(cell.split(",")[1])
						grid[cellX][cellY].type = "wall2"
						wallCells = wallCells.filter(function(c) {
							return c !== cell
						}) || []
					}

				// create wall3
					for (var wall3Count = 0; wall3Count < options.wall3.count; wall3Count++) {
						var cell = chooseRandom(wallCells)
						if (!cell) {
							break
						}

						var cellX = Number(cell.split(",")[0])
						var cellY = Number(cell.split(",")[1])
						grid[cellX][cellY].type = "wall3"
						wallCells = wallCells.filter(function(c) {
							return c !== cell
						}) || []
					}

				// create item1
					for (var item1Count = 0; item1Count < options.item1.count; item1Count++) {
						var cell = chooseRandom(spaceCells)
						if (!cell) {
							break
						}

						var cellX = Number(cell.split(",")[0])
						var cellY = Number(cell.split(",")[1])
						grid[cellX][cellY].type = "item1"
						spaceCells = spaceCells.filter(function(c) {
							return c !== cell
						}) || []
					}
				
				// create item2
					for (var item2Count = 0; item2Count < options.item2.count; item2Count++) {
						var cell = chooseRandom(spaceCells)
						if (!cell) {
							break
						}

						var cellX = Number(cell.split(",")[0])
						var cellY = Number(cell.split(",")[1])
						grid[cellX][cellY].type = "item2"
						spaceCells = spaceCells.filter(function(c) {
							return c !== cell
						}) || []
					}

				// create item3
					for (var item3Count = 0; item3Count < options.item3.count; item3Count++) {
						var cell = chooseRandom(spaceCells)
						if (!cell) {
							break
						}

						var cellX = Number(cell.split(",")[0])
						var cellY = Number(cell.split(",")[1])
						grid[cellX][cellY].type = "item3"
						spaceCells = spaceCells.filter(function(c) {
							return c !== cell
						}) || []
					}

				// return grid
					return grid
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* drawCanvas */
		function drawCanvas(canvas, context, map) {
			try {
				// map?
					if (!map || !map.grid || !map.grid.length) {
						return
					}

				// clear canvas
					clearCanvas(canvas, context)

				// draw background
					drawRectangle(canvas, context, {
						x: canvas.width / 2,
						y: canvas.height / 2,
						width: canvas.width,
						height: canvas.height,
						color: map.options ? map.options.background : "transparent"
					})

				// image dimensions
					var mapWidth  = (map.grid.length    * map.options.cellsize)
					var mapHeight = (map.grid[0].length * map.options.cellsize)

				// adjust center to camera
					translateCanvas(canvas, context, {
						x: (Math.round(canvas.width / 2)  - (mapWidth  / 2) + (map.options.cellsize / 2) + map.camera.x),
						y: (Math.round(canvas.height / 2) - (mapHeight / 2) + (map.options.cellsize / 2) + map.camera.y)
					})

				// draw cells
					for (var x = 0; x < map.grid.length; x++) {
						for (var y = 0; y < map.grid[x].length; y++) {
							drawCell(canvas, context, map.grid[x][y], map.options)
						}
					}

				// move back for next time
					translateCanvas(canvas, context, {
						x: (Math.round(canvas.width / 2)  - (mapWidth  / 2) + (map.options.cellsize / 2) + map.camera.x) * -1,
						y: (Math.round(canvas.height / 2) - (mapHeight / 2) + (map.options.cellsize / 2) + map.camera.y) * -1
					})
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas(canvas, context) {
			try {
				// clear
					context.clearRect(0, 0, canvas.width, canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(canvas, context, options) {
			try {
				// offset
					var offsetX = (options ? options.x : 0) || 0
					var offsetY = (options ? options.y : 0) || 0

				// center canvas
					context.translate(offsetX, -1 * offsetY)
			} catch (error) {console.log(error)}
		}

	/* drawCell */
		function drawCell(canvas, context, cell, options) {
			try {
				// get options
					var typeOptions = options[cell.type]

				// no options
					if (!typeOptions) {
						return
					}

				// computed
					var size = typeOptions.size ? (typeOptions.size * options.cellsize / 100) : options.cellsize

				// circle
					if (typeOptions.roundness == 50) {
						drawCircle(canvas, context, {
							x: cell.x * options.cellsize,
							y: cell.y * options.cellsize,
							radius: size / 2,
							color: typeOptions.color
						})
					}

				// rectangle
					else {
						var roundness = (typeOptions.roundness || 0) * size / 100

						drawRectangle(canvas, context, {
							x: cell.x * options.cellsize,
							y: cell.y * options.cellsize,
							width: size,
							height: size,
							color: typeOptions.color,
							radii: roundness ? {
								topLeft: roundness,
								topRight: roundness,
								bottomLeft: roundness,
								bottomRight: roundness
							} : null
						})
					}
			} catch (error) {console.log(error)}
		}

	/* drawRectangle */
		function drawRectangle(canvas, context, options) {
			try {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.color || "transparent"
					context.lineWidth   = options.border || 1
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity !== undefined ? options.opacity : 1

				// geometry
					var x = options.x - (options.width / 2)
					var y = options.y - (options.height / 2)

				// draw
					if (options.radii) {
						context.moveTo(x + options.radii.topLeft, canvas.height - y - options.height)
						context.lineTo(x + options.width - options.radii.topRight, canvas.height - y - options.height)
						context.quadraticCurveTo(x + options.width, canvas.height - y - options.height, x + options.width, canvas.height - y - options.height + options.radii.topRight)
						context.lineTo(x + options.width, canvas.height - y - options.radii.bottomRight)
						context.quadraticCurveTo(x + options.width, canvas.height - y, x + options.width - options.radii.bottomRight, canvas.height - y)
						context.lineTo(x + options.radii.bottomLeft, canvas.height - y)
						context.quadraticCurveTo(x, canvas.height - y, x, canvas.height - y - options.radii.bottomLeft)
						context.lineTo(x, canvas.height - y - options.height + options.radii.topLeft)
						context.quadraticCurveTo(x, canvas.height - y - options.height, x + options.radii.topLeft, canvas.height - y - options.height)
						context.closePath()
						context.fill()
					}
					else {
						context.fillRect(x, canvas.height - y, options.width, -1 * options.height)
					}
			} catch (error) {console.log(error)}
		}

	/* drawCircle */
		function drawCircle(canvas, context, options) {
			try {
				// parameters
					options = options || {}
					context.beginPath()
					context.fillStyle   = options.color || "transparent"
					context.strokeStyle = options.color || "transparent"
					context.lineWidth   = options.border || 0
					context.shadowBlur  = options.blur ? options.blur : 0
					context.shadowColor = options.shadow ? options.shadow : "transparent"
					context.globalAlpha = options.opacity !== undefined ? options.opacity : 1

				// draw
					if (options.border) {
						context.arc(options.x, canvas.height - options.y, options.radius, (options.start || 0), (options.end || CONSTANTS.circle))
						context.stroke()
					}
					else {
						context.moveTo(options.x, canvas.height - options.y)
						context.arc(options.x, canvas.height - options.y, options.radius, (options.start || 0), (options.end || CONSTANTS.circle), true)
						context.closePath()
						context.fill()
					}
			} catch (error) {console.log(error)}
		}
