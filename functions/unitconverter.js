/*** globals ***/
	/* prefix library */
		var PREFIX_LIBRARY = {
			atto: 	{
				multiplier: 1 / 1000 / 1000 / 1000 / 1000 / 1000 / 1000,
				symbol: "a"
			},
			femto: 	{
				multiplier: 1 / 1000 / 1000 / 1000 / 1000 / 1000,
				symbol: "f"
			},
			pico: 	{
				multiplier: 1 / 1000 / 1000 / 1000 / 1000,
				symbol: "p"
			},
			nano: 	{
				multiplier: 1 / 1000 / 1000 / 1000,
				symbol: "n"
			},
			micro: 	{
				multiplier: 1 / 1000 / 1000,
				symbol: "μ"
			},
			milli: 	{
				multiplier: 1 / 1000,
				symbol: "m"
			},
			centi: 	{
				multiplier: 1 / 100,
				symbol: "c"
			},
			deci: 	{
				multiplier: 1 / 10,
				symbol: "d"
			},
			_: 		{
				multiplier: 1
			},
			deca: 	{
				multiplier: 1 * 10,
				symbol: "da"
			},
			hecto: 	{
				multiplier: 1 * 100,
				symbol: "h"
			},
			kilo: 	{
				multiplier: 1 * 1000,
				symbol: "k"
			},
			mega: 	{
				multiplier: 1 * 1000 * 1000,
				symbol: "M"
			},
			giga: 	{
				multiplier: 1 * 1000 * 1000 * 1000,
				symbol: "G"
			},
			tera: 	{
				multiplier: 1 * 1000 * 1000 * 1000 * 1000,
				symbol: "T"
			},
			peta: 	{
				multiplier: 1 * 1000 * 1000 * 1000 * 1000 * 1000,
				symbol: "P"
			},
			exa: 	{
				multiplier: 1 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
				symbol: "E"
			}
		}

	/* units library */
		var UNITS_LIBRARY = {
			"distance": {
				Metric: {
					_unit: {
						name: "meter",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 100 / 2.54 / 12 }
					},
					"meter": {
						plural: "meters",
						symbol: "m",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"angstrom": {
						plural: "angstroms",
						symbol: "Å",
						toUnit: function(input) { return input / 10000000000 },
						fromUnit: function(input) { return input * 10000000000 }
					},
					"nautical mile": {
						plural: "nautical miles",
						symbol: "nmi",
						toUnit: function(input) { return input * 1852 },
						fromUnit: function(input) { return input / 1852 }
					},
					"astronomical unit": {
						plural: "astronomical units",
						symbol: "au",
						toUnit: function(input) { return input * 149597870700 },
						fromUnit: function(input) { return input / 149597870700 }
					},
					"parsec": {
						plural: "parsecs",
						symbol: "pc",
						toUnit: function(input) { return input * 149597870700 * (648000 / Math.PI) },
						fromUnit: function(input) { return input / 149597870700 / (648000 / Math.PI) }
					},
					"lightyear": {
						plural: "lightyears",
						symbol: "ly",
						toUnit: function(input) { return input * 9460730777119564 },
						fromUnit: function(input) { return input / 9460730777119564 }
					}
				},
				Other: {
					_unit: {
						name: "foot",
						toMetric: function(input) { return input * 12 * 2.54 / 100 }
					},
					"inch": {
						plural: "inches",
						symbol: "in",
						toUnit: function(input) { return input / 12 },
						fromUnit: function(input) { return input * 12 }
					},
					"foot": {
						plural: "feet",
						symbol: "ft",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"yard": {
						plural: "yards",
						symbol: "yd",
						toUnit: function(input) { return input * 3 },
						fromUnit: function(input) { return input / 3 }
					},
					"mile": {
						plural: "miles",
						symbol: "mi",
						toUnit: function(input) { return input * 5280 },
						fromUnit: function(input) { return input / 5280 }
					},
					"marathon": {
						plural: "marathons",
						toUnit: function(input) { return input * 5280 * 26.2188 },
						fromUnit: function(input) { return input / 26.2188 / 5280 }
					},
				}
			},
			"area": {
				Metric: {
					_unit: {
						name: "square meter",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 100 * 100 / 2.54 / 2.54 / 12 / 12 }
					},
					"square meter": {
						plural: "square meters",
						symbol: "m^2",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"hectare": {
						plural: "hectares",
						symbol: "ha",
						toUnit: function(input) { return input * 100 * 100 },
						fromUnit: function (input) { return input / 100 / 100 }
					}
				},
				Other: {
					_unit: {
						name: "square foot",
						toMetric: function(input) { return input * 12 * 12 * 2.54 * 2.54 / 100 / 100 }
					},
					"square inch": {
						plural: "square inches",
						symbol: "in^2",
						toUnit: function(input) { return input / 12 / 12 },
						fromUnit: function(input) { return input * 12 * 12 }
					},
					"square foot": {
						plural: "square feet",
						symbol: "ft^2",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"square yard": {
						plural: "square yards",
						symbol: "yd^2",
						toUnit: function(input) { return input * 3 * 3 },
						fromUnit: function(input) { return input / 3 / 3 }
					},
					"square mile": {
						plural: "square miles",
						symbol: "mi^2",
						toUnit: function(input) { return input * 5280 * 5280 },
						fromUnit: function(input) { return input / 5280 / 5280 }
					},
					"acre": {
						plural: "acres",
						symbol: "ac",
						toUnit: function(input) { return input / 640 * 5280 * 5280 },
						fromUnit: function(input) { return input * 640 / 5280 / 5280 }
					}
				}
			},
			"volume": {
				Metric: {
					_unit: {
						name: "liter",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 1000 / 2.54 / 2.54 / 2.54 / 231 }
					},
					"liter": {
						plural: "liters",
						symbol: "l",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"cubic meter": {
						plural: "cubic meters",
						symbol: "m^3",
						toUnit: function(input) { return input * 1000 },
						fromUnit: function (input) { return input / 1000 }
					},
					"cubic centimeter": {
						plural: "cubic centimeters",
						symbol: "cm^3",
						toUnit: function(input) { return input / 1000 },
						fromUnit: function (input) { return input * 1000 }
					}
				},
				Other: {
					_unit: {
						name: "gallon",
						toMetric: function(input) { return input * 231 * 2.54 * 2.54 * 2.54 / 1000 }
					},
					"teaspoon": {
						plural: "teaspoons",
						symbol: "tsp",
						toUnit: function(input) { return input / 3 / 2 / 8 / 2 / 2 / 4 },
						fromUnit: function(input) { return input * 4 * 2 * 2 * 8 * 2 * 3 }
					},
					"tablespoon": {
						plural: "tablespoons",
						symbol: "Tbsp",
						toUnit: function(input) { return input / 2 / 8 / 2 / 2 / 4 },
						fromUnit: function(input) { return input * 4 * 2 * 2 * 8 * 2 }
					},
					"fluid ounce": {
						plural: "fluid ounces",
						symbol: "fl oz",
						toUnit: function(input) { return input / 8 / 2 / 2 / 4 },
						fromUnit: function(input) { return input * 4 * 2 * 2 * 8 }
					},
					"cup": {
						plural: "cups",
						symbol: "cup",
						toUnit: function(input) { return input / 2 / 2 / 4 },
						fromUnit: function(input) { return input * 4 * 2 * 2 }
					},
					"pint": {
						plural: "pints",
						symbol: "pt",
						toUnit: function(input) { return input / 2 / 4 },
						fromUnit: function(input) { return input * 4 * 2 }
					},
					"quart": {
						plural: "quarts",
						symbol: "qt",
						toUnit: function(input) { return input / 4 },
						fromUnit: function(input) { return input * 4 }
					},
					"gallon": {
						plural: "gallons",
						symbol: "gal",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"peck": {
						plural: "pecks",
						toUnit: function(input) { return input * 2 },
						fromUnit: function(input) { return input / 2 }
					},
					"bushel": {
						plural: "bushels",
						toUnit: function(input) { return input * 2 * 4 },
						fromUnit: function(input) { return input / 4 / 2 }
					},
					"cubic inch": {
						plural: "cubic inches",
						symbol: "in^3",
						toUnit: function(input) { return input / 231 },
						fromUnit: function(input) { return input * 231 }
					},
					"cubic foot": {
						plural: "cubic feet",
						symbol: "ft^3",
						toUnit: function(input) { return input * 12 * 12 * 12 / 231 },
						fromUnit: function(input) { return input * 231 / 12 / 12 / 12 }
					},
				}
			},
			"angles": {
				Metric: {
					_unit: {
						name: "radian",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 180 / Math.PI }
					},
					"radian": {
						plural: "radians",
						symbol: "rad",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				},
				Other: {
					_unit: {
						name: "degree",
						toMetric: function(input) { return input * Math.PI / 180 }
					},
					"arc second": {
						plural: "arc seconds",
						symbol: '"',
						toUnit: function(input) { return input / 60 / 60 },
						fromUnit: function(input) { return input * 60 * 60 }
					},
					"arc minute": {
						plural: "arc minutes",
						symbol: "'",
						toUnit: function(input) { return input / 60 },
						fromUnit: function(input) { return input * 60 }
					},
					"degree": {
						plural: "degrees",
						symbol: "°",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"gradian": {
						plural: "gradians",
						symbol: "gon",
						toUnit: function(input) { return input * 100 / 90 },
						fromUnit: function(input) { return input / 90 * 100 }
					},
					"circle": {
						plural: "circles",
						symbol: "",
						toUnit: function(input) { return input * 360 },
						fromUnit: function(input) { return input / 360 }
					},
				}
			},
			"time": {
				Metric: {
					_unit: {
						name: "second",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input / 60 / 60 / 24 }
					},
					"second": {
						plural: "seconds",
						symbol: "s",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				},
				Other: {
					_unit: {
						name: "day",
						toMetric: function(input) { return input * 24 * 60 * 60 }
					},
					"minute": {
						plural: "minutes",
						symbol: "min",
						toUnit: function(input) { return input / 60 / 24 },
						fromUnit: function(input) { return input * 24 * 60 }
					},
					"hour": {
						plural: "hours",
						symbol: "h",
						toUnit: function(input) { return input / 24 },
						fromUnit: function(input) { return input * 24 }
					},
					"day": {
						plural: "days",
						symbol: "d",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"week": {
						plural: "weeks",
						toUnit: function(input) { return input * 7 },
						fromUnit: function(input) { return input / 7 }
					},
					"fortnight": {
						plural: "fortnights",
						toUnit: function(input) { return input * 7 * 2 },
						fromUnit: function(input) { return input / 7 / 2 }
					},
					"lunar month": {
						plural: "lunar months",
						toUnit: function(input) { return input * 29.5306 },
						fromUnit: function(input) { return input / 29.5306 }
					},
					"month": {
						plural: "months",
						toUnit: function(input) { return input * 30.436875 },
						fromUnit: function(input) { return input / 30.436875 }
					},
					"year": {
						plural: "years",
						symbol: "a",
						toUnit: function(input) { return input * 365.2425 },
						fromUnit: function(input) { return input / 365.2425 }
					},
					"decade": {
						plural: "decades",
						toUnit: function(input) { return input * 365.2425 * 10 },
						fromUnit: function(input) { return input / 10 / 365.2425 }
					},
					"century": {
						plural: "centuries",
						toUnit: function(input) { return input * 365.2425 * 100 },
						fromUnit: function(input) { return input / 100 / 365.2425 }
					},
					"millenium": {
						plural: "millenia",
						toUnit: function(input) { return input * 365.2425 * 1000 },
						fromUnit: function(input) { return input / 1000 / 365.2425 }
					}
				}
			},
			"frequency": {
				Metric: {
					_unit: {
						name: "hertz",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 60 }
					},
					"hertz": {
						plural: "hertz",
						symbol: "Hz",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				},
				Other: {
					_unit: {
						name: "beat per minute",
						toMetric: function(input) { return input / 60 }
					},
					"beat per minute": {
						plural: "beats per minute",
						symbol: "bpm",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				}
			},
			"speed": {
				Metric: {
					_unit: {
						name: "meter per second",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 100 / 2.54 / 12 }
					},
					"meter per second": {
						plural: "meters per second",
						symbol: "m/s",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"kilometer per hour": {
						plural: "kilometers per hour",
						symbol: "km/h",
						toUnit: function(input) { return input * 1000 / 60 / 60 },
						fromUnit: function(input) { return input * 60 * 60 / 1000 }
					},
					"knot": {
						plural: "knots",
						symbol: "kn",
						toUnit: function(input) { return input * 1852 / 60 / 60 },
						fromUnit: function(input) { return input * 60 * 60 / 1852 }
					},
					"mach": {
						plural: "mach",
						symbol: "M",
						toUnit: function(input) { return input * 323 },
						fromUnit: function(input) { return input / 323 }
					},
					"light speed": {
						plural: "light speed",
						symbol: "C",
						toUnit: function(input) { return input * 299792458 },
						fromUnit: function(input) { return input / 299792458 },
					},
					"warp": {
						plural: "warp factors",
						toUnit: function(input) { return Math.pow(input, 10 / 3) * 299792458 },
						fromUnit: function(input) { return Math.pow(input, 10 / 3) / 299792458 }
					}
				},
				Other: {
					_unit: {
						name: "foot per second",
						toMetric: function(input) { return input * 12 * 2.54 / 100 }
					},
					"foot per second": {
						plural: "feet per second",
						symbol: "ft/s",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"mile per hour": {
						plural: "miles per hour",
						symbol: "mph",
						toUnit: function(input) { return input * 5280 / 60 / 60 },
						fromUnit: function(input) { return input * 60 * 60 / 5280 }
					}
				}
			},
			"mass": {
				Metric: {
					_unit: {
						name: "gram",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input / 453.59237 }
					},
					"gram": {
						plural: "grams",
						symbol: "g",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"dalton": {
						plural: "daltons",
						symbol: "Da",
						toUnit: function(input) { return input * 1.66053906660 * Math.pow(10, -24) },
						fromUnit: function(input) { return input / 1.66053906660 * Math.pow(10, 24) }
					}
				},
				Other: {
					_unit: {
						name: "pound",
						toMetric: function(input) { return input * 453.59237 }
					},
					"ounce": {
						plural: "ounces",
						symbol: "oz",
						toUnit: function(input) { return input / 16 },
						fromUnit: function(input) { return input * 16 }
					},
					"pound": {
						plural: "pounds",
						symbol: "lb",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"ton": {
						plural: "tons",
						toUnit: function(input) { return input * 2000 },
						fromUnit: function(input) { return input / 2000 }
					}
				}
			},
			"force / weight": {
				Metric: {
					_unit: {
						name: "newton",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 1000 / 9.8066500286389 / 453.59237 }
					},
					"newton": {
						plural: "newtons",
						symbol: "N",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"dyne": {
						plural: "dynes",
						symbol: "dyn",
						toUnit: function(input) { return input / 100000 },
						fromUnit: function(input) { return input * 100000 }
					},
					"gram on earth": {
						plural: "grams on earth",
						toUnit: function(input) { return input * 9.8066500286389 / 1000 },
						fromUnit: function(input) { return input * 1000 / 9.8066500286389 }
					}
				},
				Other: {
					_unit: {
						name: "pound of force",
						toMetric: function(input) { return input * 453.59237 * 9.8066500286389 / 1000 }
					},
					"pound of force": {
						plural: "pounds of force",
						symbol: "lbf",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"poundal": {
						plural: "poundal",
						symbol: "pdl",
						toUnit: function(input) { return input / 32.17405 },
						fromUnit: function(input) { return input * 32.17405 }
					}
				}
			},
			"pressure": {
				Metric: {
					_unit: {
						name: "pascal",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input / 101325 }
					},
					"pascal": {
						plural: "pascals",
						symbol: "Pa",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input },
					},
					"bar": {
						plural: "bar",
						symbol: "bar",
						toUnit: function(input) { return input * 100000 },
						fromUnit: function(input) { return input / 100000 },
					},
					"meter of mercury": {
						plural: "meters of mercury",
						symbol: "mHg",
						toUnit: function(input) { return input * 1000 * 133.322387415 },
						fromUnit: function(input) { return input / 133.322387415 / 1000 }
					}
				},
				Other: {
					_unit: {
						name: "atmosphere",
						toMetric: function(input) { return input * 101325 }
					},
					"atmosphere": {
						plural: "atmospheres",
						symbol: "atm",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"torr": {
						plural: "torr",
						symbol: "Torr",
						toUnit: function(input) { return input / 760 },
						fromUnit: function(input) { return input * 760 }
					},
					"inch of mercury": {
						plural: "inches of mercury",
						symbol: "inHg",
						toUnit: function(input) { return input * (2.54 * 10 / 1000) * (1000 * 133.322387415) / 101325 },
						fromUnit: function(input) { return input * 101325 / (1000 * 133.322387415) / (2.54 * 10 / 1000) }
					},
					"pound per square inch": {
						plural: "pounds per square inch",
						symbol: "psi",
						toUnit: function(input) { return input * (453.59237 * 9.8066500286389 / 1000) / (2.54 / 100) / (2.54 / 100) / 101325 },
						fromUnit: function(input) { return input * 101325 * (2.54 / 100) * (2.54 / 100) / (453.59237 * 9.8066500286389 / 1000) }
					}
				}
			},
			"information": {
				Metric: {
					_unit: {
						name: "byte",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 8 }
					},
					"byte": {
						plural: "bytes",
						symbol: "B",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				},
				Other: {
					_unit: {
						name: "bit",
						toMetric: function(input) { return input / 8 }
					},
					"bit": {
						plural: "bits",
						symbol: "b",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"nibble": {
						plural: "nibbles",
						toUnit: function(input) { return input * 4 },
						fromUnit: function(input) { return input / 4 }
					},
					"kibibyte": {
						plural: "kibibytes",
						symbol: "KiB",
						toUnit: function(input) { return input * 8 * 1024 },
						fromUnit: function(input) { return input / 1024 / 8 }
					},
					"mebibyte": {
						plural: "mebibytes",
						symbol: "MiB",
						toUnit: function(input) { return input * 8 * 1024 * 1024 },
						fromUnit: function(input) { return input / 1024 / 1024 / 8 }
					},
					"gibibyte": {
						plural: "gibibytes",
						symbol: "GiB",
						toUnit: function(input) { return input * 8 * 1024 * 1024 * 1024 },
						fromUnit: function(input) { return input / 1024 / 1024 / 1024 / 8 }
					},
					"tebibyte": {
						plural: "tebibytes",
						symbol: "TiB",
						toUnit: function(input) { return input * 8 * 1024 * 1024 * 1024 * 1024 },
						fromUnit: function(input) { return input / 1024 / 1024 / 1024 / 1024 / 8 }
					},
					"pebibyte": {
						plural: "pebibytes",
						symbol: "PiB",
						toUnit: function(input) { return input * 8 * 1024 * 1024 * 1024 * 1024 * 1024 },
						fromUnit: function(input) { return input / 1024 / 1024 / 1024 / 1024 / 1024 / 8 }
					},
				}
			},
			"data transfer": {
				Metric: {
					_unit: {
						name: "bit per second",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
					},
					"bits per second": {
						plural: "bits per second",
						symbol: "bps",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				}
			},
			"energy": {
				Metric: {
					_unit: {
						name: "joule",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * (100 / 2.54 / 12) * (1000 / 9.8066500286389 / 453.59237) }
					},
					"joule": {
						plural: "joules",
						symbol: "J",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"electronvolt": {
						plural: "electronvolts",
						symbol: "eV",
						toUnit: function(input) { return input * 1.602176634 * Math.pow(10, -19) },
						fromUnit: function(input) { return input * Math.pow(10,19) / 1.602176634 }
					},
					"erg": {
						plural: "ergs",
						toUnit: function(input) { return input / 10000000 },
						fromUnit: function(input) { return input * 10000000 },
					},
					"gram calorie": {
						plural: "gram calories",
						symbol: "cal",
						toUnit: function(input) { return input * 4.184 },
						fromUnit: function(input) { return input / 4.184 }
					},
					"calorie": {
						plural: "calories",
						symbol: "Cal",
						toUnit: function(input) { return input * 4184 },
						fromUnit: function(input) { return input / 4184 }
					},
					"watt hour": {
						plural: "watt hours",
						symbol: "W h",
						toUnit: function(input) { return input * 3600 },
						fromUnit: function(input) { return input / 3600 }
					},
					"ton of TNT": {
						plural: "tons of TNT",
						toUnit: function(input) { return input * 4.184 * 1000 * 1000 * 1000 },
						fromUnit: function(input) { return input / 1000 / 1000 / 1000 / 4.184 }
					}
				},
				Other: {
					_unit: {
						name: "foot pound",
						toMetric: function(input) { return input / (100 / 2.54 / 12) / (1000 / 9.8066500286389 / 453.59237) }
					},
					"foot pound": {
						plural: "foot pounds",
						symbol: "ft lbf",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"british thermal unit": {
						plural: "british thermal units",
						symbol: "Btu",
						toUnit: function(input) { return input * (5 / 9) * 453.59237 * 4.184 * (100 / 2.54 / 12) * (1000 / 9.8066500286389 / 453.59237) },
						fromUnit: function(input) { return input * (9 / 5) / 453.59237 / 4.184 * (12 * 2.54 / 100) * (453.59237 * 9.8066500286389 / 1000) }
					},
					"therm": {
						plural: "therms",
						symbol: "thm",
						toUnit: function(input) { return input * (5 / 9) * 453.59237 * 4.184 * (100 / 2.54 / 12) * (1000 / 9.8066500286389 / 453.59237) * 100000 },
						fromUnit: function(input) { return input / 100000 * (9 / 5) / 453.59237 / 4.184 * (12 * 2.54 / 100) * (453.59237 * 9.8066500286389 / 1000) }
					}
				}
			},
			"power": {
				Metric: {
					_unit: {
						name: "watt",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * 60 / (12 * 2.54 / 100) / (453.59237 * 9.8066500286389 / 1000) / 33000 }
					},
					"watt": {
						plural: "watts",
						symbol: "W",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
				},
				Other: {
					_unit: {
						name: "horsepower",
						toMetric: function(input) { return input / 60 * (12 * 2.54 / 100) * (453.59237 * 9.8066500286389 / 1000) * 33000 }
					},
					"horsepower": {
						plural: "horsepower",
						symbol: "hp",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				}
			},
			"temperature": {
				Metric: {
					_unit: {
						name: "kelvin",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return ((input - 273.15) * 9 / 5) + 32 }
					},
					"kelvin": {
						plural: "kelvins",
						symbol: "K",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"degree celsius": {
						plural: "degrees celsius",
						symbol: "°C",
						toUnit: function(input) { return input + 273.15 },
						fromUnit: function(input) { return input - 273.15 }
					}
				},
				Other: {
					_unit: {
						name: "degree farenheit",
						toMetric: function(input) { return ((input - 32) * 5 / 9) + 273.15 }
					},
					"degree farenheit": {
						plural: "degrees farenheit",
						symbol: "°F",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				}
			},
			"fuel economy": {
				Metric: {
					_unit: {
						name: "kilometer per liter",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input * (1000 * 100 / 2.54 / 12 / 5280) * (1 / 1000 * 2.54 * 2.54 * 2.54 * 231) }
					},
					"kilometer per liter": {
						plural: "kilometers per liter",
						symbol: "km/l",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					}
				},
				Other: {
					_unit: {
						name: "mile per gallon",
						toMetric: function(input) { return input * (5280 * 12 * 2.54 / 100 / 1000) * (1 / 231 / 2.54 / 2.54 / 2.54 * 1000) }
					},
					"mile per gallon": {
						plural: "miles per gallon",
						symbol: "mpg",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
				}
			},
			"US currency": {
				Other: {
					_unit: {
						name: "dollar"
					},
					"penny": {
						plural: "pennies",
						symbol: "¢",
						toUnit: function(input) { return input / 100 },
						fromUnit: function(input) { return input * 100 }
					},
					"nickel": {
						plural: "nickels",
						toUnit: function(input) { return input / 20 },
						fromUnit: function(input) { return input * 20 }
					},
					"dime": {
						plural: "dimes",
						toUnit: function(input) { return input / 10 },
						fromUnit: function(input) { return input * 10 }
					},
					"quarter": {
						plural: "quarters",
						toUnit: function(input) { return input / 4 },
						fromUnit: function(input) { return input * 4 }
					},
					"half dollar": {
						plural: "half dollars",
						toUnit: function(input) { return input / 2 },
						fromUnit: function(input) { return input * 2 }
					},
					"dollar": {
						plural: "dollars",
						symbol: "$",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"2 dollar bill": {
						plural: "2 dollar bills",
						toUnit: function(input) { return input * 2 },
						fromUnit: function(input) { return input / 2 }
					},
					"5 dollar bill": {
						plural: "5 dollar bills",
						toUnit: function(input) { return input * 5 },
						fromUnit: function(input) { return input / 5 }
					},
					"10 dollar bill": {
						plural: "10 dollar bills",
						toUnit: function(input) { return input * 10 },
						fromUnit: function(input) { return input / 10 }
					},
					"20 dollar bill": {
						plural: "20 dollar bills",
						toUnit: function(input) { return input * 20 },
						fromUnit: function(input) { return input / 20 }
					},
					"50 dollar bill": {
						plural: "50 dollar bills",
						toUnit: function(input) { return input * 50 },
						fromUnit: function(input) { return input / 50 }
					},
					"100 dollar bill": {
						plural: "100 dollar bills",
						toUnit: function(input) { return input * 100 },
						fromUnit: function(input) { return input / 100 }
					},
				}
			},
			"British currency": {
				Metric: {
					_unit: {
						name: "pound",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input / 5 }
					},
					"farthing": {
						plural: "farthing",
						toUnit: function(input) { return input / 4 / 12 / 20 },
						fromUnit: function(input) { return input * 20 * 12 * 4 }
					},
					"half penny": {
						plural: "half pence",
						toUnit: function(input) { return input / 2 / 12 / 20 },
						fromUnit: function(input) { return input * 20 * 12 * 2 }
					},
					"pence": {
						plural: "pence",
						toUnit: function(input) { return input / 12 / 20 },
						fromUnit: function(input) { return input * 20 * 12 }
					},
					"threepence": {
						plural: "threepence",
						toUnit: function(input) { return input * 3 / 12 / 20 },
						fromUnit: function(input) { return input * 20 * 12 / 3 }
					},
					"sixpence": {
						plural: "sixpence",
						toUnit: function(input) { return input * 6 / 12 / 20 },
						fromUnit: function(input) { return input * 20 * 12 / 6 }
					},
					"shilling": {
						plural: "shillings",
						toUnit: function(input) { return input / 20 },
						fromUnit: function(input) { return input * 20 }
					},
					"florin": {
						plural: "florins",
						toUnit: function(input) { return input / 20 * 2 },
						fromUnit: function(input) { return input / 2 * 20 }
					},
					"half crown": {
						plural: "half crowns",
						toUnit: function(input) { return input / 2 / 4 },
						fromUnit: function(input) { return input * 4 * 2 }
					},
					"crown": {
						plural: "crowns",
						toUnit: function(input) { return input / 4 },
						fromUnit: function(input) { return input * 4 }
					},
					"pound": {
						plural: "pounds",
						symbol: "£",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
				},
				Other: {
					_unit: {
						name: "galleon",
						toMetric: function(input) { return input * 5 }
					},
					"Knut": {
						plural: "Knuts",
						toUnit: function(input) { return input / 17 / 29 },
						fromUnit: function(input) { return input * 29 * 17 }
					},
					"Sickle": {
						plural: "Sickles",
						toUnit: function(input) { return input / 17 },
						fromUnit: function(input) { return input * 17 }
					},
					"Galleon": {
						plural: "Galleons",
						symbol: "ʛ",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
				}
			},
			"paper": {
				Metric: {
					_unit: {
						name: "sheet",
						fromUnit: function(input, prefix) { return input / PREFIX_LIBRARY[prefix].multiplier },
						toUnit: function(input, prefix) { return input * PREFIX_LIBRARY[prefix].multiplier },
						toOther: function(input) { return input / 24 }
					},
					"sheet": {
						plural: "sheets",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"quire": {
						plural: "quires",
						toUnit: function(input) { return input * 25 },
						fromUnit: function(input) { return input / 25 }
					},
					"ream": {
						plural: "reams",
						toUnit: function(input) { return input * 20 * 25 },
						fromUnit: function(input) { return input / 25 / 20 }
					},
					"bundle": {
						plural: "bundles",
						toUnit: function(input) { return input * 2 * 20 * 25 },
						fromUnit: function(input) { return input / 25 / 20 / 2 }
					},
					"bale": {
						plural: "bales",
						toUnit: function(input) { return input * 5 * 2 * 20 * 25 },
						fromUnit: function(input) { return input / 25 / 20 / 2 / 5 }
					}
				},
				Other: {
					_unit: {
						name: "short quire",
						toMetric(input) { return input * 24 }
					},
					"short quire": {
						plural: "short quires",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"short ream": {
						plural: "short reams",
						toUnit: function(input) { return input * 20 },
						fromUnit: function(input) { return input / 20 }
					},
					"short bundle": {
						plural: "short bundles",
						toUnit: function(input) { return input * 2 * 20 },
						fromUnit: function(input) { return input / 20 / 2 }
					},
					"short bale": {
						plural: "short bales",
						toUnit: function(input) { return input * 5 * 2 * 20 },
						fromUnit: function(input) { return input / 20 / 2 / 5 }
					},
					"printer's ream": {
						plural: "printer's reams",
						toUnit: function(input) { return input * 21.5 },
						fromUnit: function(input) { return input / 21.5 }
					},
					"printer's bundle": {
						plural: "printer's bundles",
						toUnit: function(input) { return input * 2 * 21.5 },
						fromUnit: function(input) { return input / 21.5 / 2 }
					},
					"printer's bale": {
						plural: "printer's bales",
						toUnit: function(input) { return input * 5 * 2 * 21.5 },
						fromUnit: function(input) { return input / 21.5 / 2 / 5 }
					}
				}
			},
			"quantity": {
				Other: {
					_unit: {
						name: "unit"
					},
					"unit": {
						plural: "units",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"pair": {
						plural: "pairs",
						toUnit: function(input) { return input * 2 },
						fromUnit: function(input) { return input / 2 }
					},
					"half dozen": {
						plural: "half dozens",
						toUnit: function(input) { return input * 6 },
						fromUnit: function(input) { return input / 6 }
					},
					"dozen": {
						plural: "dozens",
						toUnit: function(input) { return input * 12 },
						fromUnit: function(input) { return input / 12 }
					},
					"baker's dozen": {
						plural: "baker's dozens",
						toUnit: function(input) { return input * 13 },
						fromUnit: function(input) { return input / 13 }
					},
					"score": {
						plural: "scores",
						toUnit: function(input) { return input * 20 },
						fromUnit: function(input) { return input / 20 }
					},
					"small gross": {
						plural: "small gross",
						toUnit: function(input) { return input * 12 * 10 },
						fromUnit: function(input) { return input / 12 / 10 }
					},
					"gross": {
						plural: "gross",
						toUnit: function(input) { return input * 12 * 12 },
						fromUnit: function(input) { return input / 12 / 12 }
					},
					"great gross": {
						plural: "great gross",
						toUnit: function(input) { return input * 12 * 12 * 12 },
						fromUnit: function(input) { return input / 12 / 12 / 12 }
					},
					"mole": {
						plural: "moles",
						toUnit: function(input) { return input * 6.02214076 * Math.pow(10, 23) },
						fromUnit: function(input) { return input / (6.02214076 * Math.pow(10, 23)) }
					}
				}
			},
			"people": {
				Other: {
					_unit: {
						name: "person"
					},
					"person": {
						plural: "people",
						toUnit: function(input) { return input },
						fromUnit: function(input) { return input }
					},
					"duet": {
						plural: "duets",
						toUnit: function(input) { return input * 2 },
						fromUnit: function(input) { return input / 2 }
					},
					"jazz trio": {
						plural: "jazz trios",
						toUnit: function(input) { return input * 3 },
						fromUnit: function(input) { return input / 3 }
					},
					"string quartet": {
						plural: "string quartets",
						toUnit: function(input) { return input * 4 },
						fromUnit: function(input) { return input / 4 }
					},
					"basketball team": {
						plural: "basketball teams",
						toUnit: function(input) { return input * 5 },
						fromUnit: function(input) { return input / 5 }
					},
					"hockey team": {
						plural: "hockey teams",
						toUnit: function(input) { return input * 6 },
						fromUnit: function(input) { return input / 6 }
					},
					"baseball team": {
						plural: "baseball teams",
						toUnit: function(input) { return input * 9 },
						fromUnit: function(input) { return input / 9 }
					},
					"football team": {
						plural: "football teams",
						toUnit: function(input) { return input * 11 },
						fromUnit: function(input) { return input / 11 }
					},
					"jury": {
						plural: "juries",
						toUnit: function(input) { return input * 11 },
						fromUnit: function(input) { return input / 11 }
					},
					"US senate": {
						plural: "US senates",
						toUnit: function(input) { return input * 100 },
						fromUnit: function(input) { return input / 100 }
					},
					"Dunbar's number": {
						plural: "Dunbar's numbers",
						toUnit: function(input) { return input * 150 },
						fromUnit: function(input) { return input / 150 }
					},
					"Roman senate": {
						plural: "Roman senates",
						toUnit: function(input) { return input * 300 },
						fromUnit: function(input) { return input / 300 }
					}
				}
			}
		}

	/* symbol library */
		var SYMBOL_LIBRARY = {}
		initializeSymbols()
		function initializeSymbols() {
			for (var category in UNITS_LIBRARY) {
				for (var system in UNITS_LIBRARY[category]) {
					for (var unit in UNITS_LIBRARY[category][system]) {
						if (unit == "_unit") {}
						else if (UNITS_LIBRARY[category][system][unit].symbol && system == "Metric") {
							for (var prefix in PREFIX_LIBRARY) {
								if (prefix !== "_") {
									SYMBOL_LIBRARY[PREFIX_LIBRARY[prefix].symbol + UNITS_LIBRARY[category][system][unit].symbol] = (prefix + unit)
								}
							}
						}
						else if (UNITS_LIBRARY[category][system][unit].symbol) {
							SYMBOL_LIBRARY[UNITS_LIBRARY[category][system][unit].symbol] = unit
						}
					}
				}
			}
		}

/*** get inputs ***/	
	/* getParameters */
		function getParameters(query) {
			try {
				// validate
					if (typeof query.quantity == "undefined" || !query.from || !query.to) {
						var errorMessage = []
						if (typeof query.quantity == "undefined") {
							errorMessage.push("number 'quantity'")
						}
						if (!query.from) {
							errorMessage.push("string 'from'")
						}
						if (!query.to) {
							errorMessage.push("string 'to'")
						}
						return {success: false, message: "missing parameters: " + errorMessage.join(", ")}
					}

				// get values
					var quantity = Number(query.quantity)
					var givenFrom = query.from.replace(/%20/gi," ")
					var givenTo = query.to.replace(/%20/gi," ")

				// clean up values
					var fromUnit = getUnitAndPrefix(givenFrom)
					var temp = getUnitCategories(fromUnit.unit.replace(/%20/gi," "))
						fromUnit.category = temp.category
						fromUnit.system = temp.system
						fromUnit.unit = temp.unit
					
					var toUnit = getUnitAndPrefix(givenTo)
					var temp = getUnitCategories(toUnit.unit.replace(/%20/gi," "))
						toUnit.category = temp.category
						toUnit.system = temp.system
						toUnit.unit = temp.unit

				// output values
					return {
						success: true,
						quantity: quantity,
						from: fromUnit,
						to: toUnit
					}
			}
			catch (error) {
				console.log(error)
				
				return {
					success: false,
					message: "unknown error in cloud functions for baseconverter; expecting string parameter 'numberString', number parameters 'oldBase', 'newBase'"
				}
			}
		}

	/* getUnitAndPrefix */
		function getUnitAndPrefix(givenUnit) {
			try {
				// try from symbol first
					if (SYMBOL_LIBRARY[givenUnit]) {
						return getUnitAndPrefix(SYMBOL_LIBRARY[givenUnit])
					}

				// loop through prefixes to strip them
					for (var prefix in PREFIX_LIBRARY) {
						if (givenUnit.toLowerCase().indexOf(prefix) == 0) {
							return {
								prefix: prefix,
								unit: givenUnit.substr(prefix.length, givenUnit.length - prefix.length)
							}
						}
					}
				
				// otherwise, assume no prefix
					return {
						prefix: "_",
						unit: givenUnit
					}
			}
			catch (error) {
				console.log(error)
				return {
					prefix: "_",
					unit: givenUnit
				}
			}
		}

	/* getUnitCategories */
		function getUnitCategories(givenUnit) {
			try {
				for (var category in UNITS_LIBRARY) {
					for (var system in UNITS_LIBRARY[category]) {
						for (var unit in UNITS_LIBRARY[category][system]) {
							if (unit == "_unit") {}
							else if (givenUnit.toLowerCase() == unit.toLowerCase()) {
								return {
									category: category,
									system: system,
									unit: unit
								}
							}
							else if (UNITS_LIBRARY[category][system][unit].plural && givenUnit.toLowerCase() == UNITS_LIBRARY[category][system][unit].plural.toLowerCase()) {
								return {
									category: category,
									system: system,
									unit: unit
								}
							}
							else if (UNITS_LIBRARY[category][system][unit].symbol && givenUnit == UNITS_LIBRARY[category][system][unit].symbol) {
								return {
									category: category,
									system: system,
									unit: unit
								}
							}
						}
					}
				}
				
				return {
					category: "quantity",
					system: "Other",
					unit: "unit"
				}
			}
			catch (error) {
				console.log(error)
				return {
					category: "quantity",
					system: "Other",
					unit: "unit"
				}
			}
		}

/*** calculation ***/
	/* convertQuantity */
		exports.convertQuantity = convertQuantity
		function convertQuantity(query) {
			try {
				// get parameters
					var parameters = getParameters(query)
					if (!parameters.success) {
						return JSON.stringify(parameters)
					}
					var quantity = parameters.quantity

				// missing fields
					if (!parameters.from.unit || !parameters.from.system || !parameters.from.category) {
						return JSON.stringify({success: false, message: "invalid from unit"})
					}
					else if (!parameters.to.unit || !parameters.to.system || !parameters.to.category) {
						return JSON.stringify({success: false, message: "invalid to unit"})
					}
					else if (parameters.from.category !== parameters.to.category) {
						return JSON.stringify({success: false, message: "from unit and to unit are different categories"})
					}
					else if (quantity === undefined) {
						return JSON.stringify({success: false, message: "invalid quantity"})
					}

				// calculate
					else {
						// remove prefixes
							if (parameters.from.system == "Metric") {
								quantity = UNITS_LIBRARY[parameters.from.category].Metric._unit.toUnit(quantity, parameters.from.prefix)
							}

						// convert to base
							quantity = UNITS_LIBRARY[parameters.from.category][parameters.from.system][parameters.from.unit].toUnit(quantity)
						
						// convert across systems
							if (parameters.from.system == "Metric" && parameters.to.system !== "Metric") {
								quantity = UNITS_LIBRARY[parameters.from.category][parameters.from.system]._unit["to" + parameters.to.system](quantity)
							}
							else if (parameters.from.system !== "Metric" && parameters.to.system == "Metric") {
								quantity = UNITS_LIBRARY[parameters.from.category][parameters.from.system]._unit["toMetric"](quantity)
							}

						// convert from base
							quantity = UNITS_LIBRARY[parameters.to.category][parameters.to.system][parameters.to.unit].fromUnit(quantity)

						// add prefixes
							if (parameters.to.system == "Metric") {
								quantity = UNITS_LIBRARY[parameters.to.category].Metric._unit.fromUnit(quantity, parameters.to.prefix)
							}

						// output
							if (quantity === undefined || quantity === null || isNaN(quantity)) {
								return JSON.stringify({success: false, message: "output quantity is not a number"})
							} 
							else {
								delete parameters.success
								return JSON.stringify({
									success: true,
									parameters: parameters,
									output: Number(quantity),
									message: Number(quantity).toLocaleString("fullwide", {useGrouping: true, maximumSignificantDigits: 21})
								})
							}
					}
			}
			catch (error) {
				console.log(error)
				return JSON.stringify({sucess: false, message: "unknown error in unitconverter"})
			}
		}
