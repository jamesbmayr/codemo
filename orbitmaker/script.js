/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			resize: "resize",
			mousedown: "mousedown",
			mouseup: "mouseup",
			mousemove: "mousemove",
			scroll: "wheel",
			keydown: "keydown"
		}

		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.click = "touchstart"
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
		}

	/* constants */
		const CONSTANTS = {
			ignoreKeys: ["id", "elements", "computed", "position", "children"],
			rounding: 1000000,
			"4π^2": 4 * Math.PI ** 2, // radians --> for calculating orbits
			G: 6.67 * (10 ** -11), // N * m^2 / kg^2
			convert: {
				circle_to_radian: 2 * Math.PI, // radians
				quarterCircle_to_radian: Math.PI / 2, // radians
				circle_to_degree: 360, // degrees
				AU_to_meter: 1.496 * (10 ** 11), // meters
				year_to_day: 365, // days
				day_to_hour: 24, // hours
				hour_to_second: 3600, // seconds
				second_to_ms: 1000, // ms
				second_to_loop: 25, // loops
				solarMass_to_kg: 1.989 * (10 ** 30), // kg
			},
			limit: {
				minimumAngle: 0.0001 / 360 * (2 * Math.PI), // radians --> for calculateEccentricAnomaly
				minimumEccentricity: 0, // circle
				maximumEccentricity: 1, // parabola / hyperbola
				minimumDistanceForSelection: 10, // pixels
				minimumZoomPower: 0, // 10^x
				stepZoomPower: 0.1, // 10^x
				maximumZoomPower: 5, // 10^x
				minimumRatePower: 0, // 10^x
				stepRatePower: 0.1, // 10^x
				maximumRatePower: 5, // 10^x
				stepOffset: 0.1, // AU
				initialBarycenterPeriod: 100, // days
			},
			canvas: {
				barycenter_log_kg_to_pixel: 0.1, // pixels
				planet_log_kg_to_pixel: 0.05, // pixels
				moon_log_kg_to_pixel: 0.05, // pixels
				scroll_to_zoom: 0.05, // 10^x
				orbitThickness: 2, // pixels
				orbitAboveOpacity: 0.75, // ratio
				orbitBelowOpacity: 0.25, // ratio
				celestialBodyOpacity: 1, // ratio
				barycenterColor: "#777777", // #hex
				barycenterOpacity: 0.5, // ratio
				glowThickness: 10, // pixels
				spaceColor: "#111111", // #hex
				uninhabitableZoneColor: "#c63a3a", // #hex
				habitableZoneColor: "#2cdd6a", // #hex
				habitableZoneOpacity: 0.05, // ratio
				habitableZoneThickness: 0.8, // ratio
				habitableZoneShadowBlur: 0.5, // ratio
				starFontSize: 16, // pixels
				planetFontSize: 12, // pixels
				moonFontSize: 8, // pixels
				fontFamily: "monospace"
			},
			field: {
				starCount: 1000, // count
				starRadius: 1, // px
				starOpacity: 0.1, // ratio
				starColors: ["#7ffeff", "#ffffff", "#ffffff", "#fdff99", "#fdff99", "#f9ef22", "#f9ef22", "#f9ef22", "#ed991c", "#ed991c", "#ed991c", "#be102e", "#be102e", "#be102e", "#be102e"], // #hex
			},
			star: {
				type: "star",
				name: null,
				description: null,
				color: null, // #hex
				massFactor: 0, // kg
				massPower: 0, // 10^x
				radius: 0, // AU
				habitableZone: 0, // AU
				day: 0, // d
				period: 0, // d
				semiMajorAxis: 0, // AU
				retrograde: false,
				inclination: 0, // radians
				longitudeOfAscendingNode: 0, // radians
				eccentricity: 0, // ratio
				apoapsis: 0, // AU
				periapsis: 0, // AU
				argumentOfPeriapsis: 0, // radians
				computed: {
					semiMinorAxis: 0, // AU
					focalDistance: 0, // AU
					longitudeOfPeriapsis: 0, // radians
					ascendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					},
					descendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					}
				},
				position: {
					x: 0, // AU
					y: 0, // AU
					invariableX: 0, // px
					invariableY: 0, // px
					tracking: false,
					visible: true
				},
				elements: {},
				children: {}
			},
			planet: {
				type: "planet",
				name: null,
				description: null,
				color: null, // #hex
				massFactor: 0, // kg
				massPower: 0, // 10^x
				day: 0, // d
				period: 0, // d
				semiMajorAxis: 0, // AU
				retrograde: false,
				inclination: 0, // radians
				longitudeOfAscendingNode: 0, // radians
				eccentricity: 0, // ratio
				apoapsis: 0, // AU
				periapsis: 0, // AU
				argumentOfPeriapsis: 0, // radians
				computed: {
					semiMinorAxis: 0, // AU
					focalDistance: 0, // AU
					longitudeOfPeriapsis: 0, // radians
					ascendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					},
					descendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					}
				},
				position: {
					x: 0, // AU
					y: 0, // AU
					invariableX: 0, // px
					invariableY: 0, // px
					trueAnomaly: 0, // radians
					tracking: false,
					visible: true
				},
				elements: {},
				children: {}
			},
			moon: {
				type: "moon",
				name: null,
				description: null,
				color: null, // #hex
				massFactor: 0, // kg
				massPower: 0, // 10^x
				day: 0, // d
				period: 0, // d
				semiMajorAxis: 0, // AU
				retrograde: false,
				inclination: 0, // radians
				longitudeOfAscendingNode: 0, // radians
				eccentricity: 0, // ratio
				apoapsis: 0, // AU
				periapsis: 0, // AU
				argumentOfPeriapsis: 0, // radians
				computed: {
					semiMinorAxis: 0, // AU
					focalDistance: 0, // AU
					longitudeOfPeriapsis: 0, // radians
					ascendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					},
					descendingNode: {
						x: 0, // AU
						y: 0, // AU
						a: 0 // radians
					}
				},
				position: {
					x: 0, // AU
					y: 0, // AU
					invariableX: 0, // px
					invariableY: 0, // px
					trueAnomaly: 0, // radians
					tracking: false,
					visible: true
				},
				elements: {},
				children: {}
			},
			classes: {
				stars: {
					"black-hole": {
						name: "black hole",
						color: "#000000", // #hex
						massFactor: 4.21668, // kg
						massPower: 31, //10^x
						radius: 0.098590, // AU
						habitableZone: 441.816477, // AU
					},
					"blue-supergiant": {
						name: "blue supergiant (Rigel)",
						color: "#b7bfe5", // #hex
						massFactor: 4.176900, // kg
						massPower: 31, // 10^x
						radius: 0.366922, // AU
						habitableZone: 437.987065, // AU
					},
					"red-supergiant": {
						name: "red supergiant (Betelgeuse)",
						color: "#dca562", // #hex
						massFactor: 3.58020, // kg
						massPower: 31, // 10^x
						radius: 4.124964, // AU
						habitableZone: 375.710190, // AU
					},
					"blue-giant": {
						name: "blue giant (Bellatrix)",
						color: "#cad0ff", // #hex
						massFactor: 1.53153, // kg
						massPower: 31, // 10^x
						radius: 0.026740, // AU
						habitableZone: 44.420546, // AU
					},
					"yellow-giant": {
						name: "yellow giant (Polaris)",
						color: "#fdffc0", // #hex
						massFactor: 1.07406, // kg
						massPower: 31, // 10^x
						radius: 0.174393, // AU
						habitableZone: 23.20526, // AU
					},
					"red-giant": {
						name: "red giant (Arcturus)",
						color: "#e63d09", // #hex
						massFactor: 2.148120, // kg
						massPower: 30, // 10^x
						radius: 0.118122, // AU
						habitableZone: 1.220313, // AU
					},
					"main-sequence-o": {
						name: "Main Sequence O (blue)",
						color: "#92b5ff", // #hex
						massFactor: 1.1934, // kg
						massPower: 32, // 10^x
						radius: 0.055806, // AU
						habitableZone: 862.115203, // AU
					},
					"main-sequence-b": {
						name: "Main Sequence B (blue)",
						color: "#a2c0ff", // #hex
						massFactor: 1.1934, // kg
						massPower: 31, // 10^x
						radius: 0.018602, // AU
						habitableZone: 28.139907, // AU
					},
					"main-sequence-a": {
						name: "Main Sequence A (white)",
						color: "#d5e0ff", // #hex
						massFactor: 3.978, // kg
						massPower: 30, // 10^x
						radius: 0.007906, // AU
						habitableZone: 3.768693, // AU
					},
					"main-sequence-f": {
						name: "Main Sequence F (pale)",
						color: "#fdffbe", // #hex
						massFactor: 2.5857, // kg
						massPower: 30, // 10^x
						radius: 0.006046, // AU
						habitableZone: 1.713256, // AU
					},
					"main-sequence-g": {
						name: "Main Sequence G (yellow) (Sun)",
						color: "#f6fa78", // #hex
						massFactor: 1.989, // kg
						massPower: 30, // 10^x
						radius: 0.004650, // AU
						habitableZone: 1.06, // AU
					},
					"main-sequence-k": {
						name: "Main Sequence K (orange dwarf)",
						color: "#d58838", // #hex
						massFactor: 1.33263, // kg
						massPower: 30, // 10^x
						radius: 0.003348, // AU
						habitableZone: 0.509358, // AU
					},
					"main-sequence-m": {
						name: "Main Sequence M (red dwarf)",
						color: "#e63d09", // #hex
						massFactor: 4.1769, // kg
						massPower: 29, // 10^x
						radius: 0.001256, // AU
						habitableZone: 0.060949, // AU
					},
					"white-dwarf": {
						name: "white dwarf",
						color: "#ffffff", // #hex
						massFactor: 1.989, // kg
						massPower: 30, // 10^x
						radius: 0.000047, // AU
						habitableZone: 0.01, // AU
					},
					"binary": {
						name: "binary",
						color: "transparent", // hex
						massFactor: 0, // kg
						massPower: 0, // 10^x
						radius: 0, // AU
						habitableZone: 0, // AU
					}
				},
				planets: {
					"jovian": {
						name: "Jovian",
						color: "#ff7700", // #hex
						massFactor: 2, // kg
						massPower: 27, // 10^x
						semiMajorAxis: 5, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 5, // AU
						periapsis: 5, // AU
					},
					"neptunian": {
						name: "Neptunian",
						color: "#7777ff", // #hex
						massFactor: 1, // kg
						massPower: 26, // 10^x
						semiMajorAxis: 5, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 5, // AU
						periapsis: 5, // AU
					},
					"superterran": {
						name: "Superterran (Super Earth)",
						color: "#0077ff", // #hex
						massFactor: 3, // kg
						massPower: 25, // 10^x
						semiMajorAxis: 2, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 2, // AU
						periapsis: 2, // AU
					},
					"terran": {
						name: "Terran (Earth-like)",
						color: "#0077ff", // #hex
						massFactor: 6, // kg
						massPower: 24, // 10^x
						semiMajorAxis: 1, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 1, // AU
						periapsis: 1, // AU
					},
					"subterran": {
						name: "Subterran (Sub Earth)",
						color: "#0077ff", // #hex
						massFactor: 1.5, // kg
						massPower: 24, // 10^x
						semiMajorAxis: 0.75, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.75, // AU
						periapsis: 0.75, // AU
					},
					"mercurian": {
						name: "Mercurian",
						color: "#555555", // #hex
						massFactor: 5, // kg
						massPower: 23, // 10^x
						semiMajorAxis: 0.25, // AU
						retrograde: false,
						eccentricity: 0.25, // ratio
						apoapsis: 0.3125, // AU
						periapsis: 0.1875, // AU
					},
					"asteroidan": {
						name: "Asteroid",
						color: "#7777dd", // #hex
						massFactor: 5, // kg
						massPower: 18, // 10^x
						semiMajorAxis: 3, // AU
						retrograde: false,
						eccentricity: 0.5, // ratio
						apoapsis: 4.5, // AU
						periapsis: 1.5, // AU
					},
					"comet": {
						name: "Comet",
						color: "#ff7777",
						massFactor: 5, // kg
						massPower: 15, // 10^x
						semiMajorAxis: 10, // AU
						retrograde: false,
						eccentricity: 0.75, // ratio
						apoapsis: 17.5, // AU
						periapsis: 2.5, // AU
					}
				},
				moons: {
					"superlunar": {
						name: "superlunar (Titan-like)",
						color: "#ff7700",
						massFactor: 2, // kg
						massPower: 23, // 10^x
						semiMajorAxis: 0.0075, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.0075, // AU
						periapsis: 0.0075, // AU
					},
					"lunar": {
						name: "lunar (Moon-like)",
						color: "#cccccc",
						massFactor: 7, // kg
						massPower: 22, // 10^x
						semiMajorAxis: 0.0025, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.0025, // AU
						periapsis: 0.0025, // AU
					},
					"sublunar": {
						name: "sublunar (Charon-like)",
						color: "#ccccff",
						massFactor: 2, // kg
						massPower: 21, // 10^x
						semiMajorAxis: 0.0005, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.0005, // AU
						periapsis: 0.0005, // AU
					},
					"subsublunar": {
						name: "sublunar (Enceladus-like)",
						color: "#ffffff",
						massFactor: 1, // kg
						massPower: 20, // 10^x
						semiMajorAxis: 0.001, // AU
						retrograde: false,
						eccentricity: 0, // ratio
						apoapsis: 0.001, // AU
						periapsis: 0.001, // AU
					},
					"asteroidal": {
						name: "asteroidal (Asteroid-like)",
						color: "#555555",
						massFactor: 5, // kg
						massPower: 17, // 10^x
						semiMajorAxis: 0.0001, // AU
						retrograde: false,
						eccentricity: 0.8, // ratio
						apoapsis: 0.00018, // AU
						periapsis: 0.00002, // AU
					}
				}
			},
			random: {
				attempts: 10, // count
				names: ["Oub","Peague","Frau","Oomp","Cleyost","Hougeatree","Sluild","Stothseag","Therct","Lernmo","Yoasce","Kir","Sefood","Bloilo","Neeploa","Rerndleyne","Twiwur","Sershthiep","Yetoudphoe","Glolp","Oolb","Iskthy","Drorbimock","Yoasmo","Sca","Olf","Shaimstie","Lysmycroag","Ishbriequa","Marm","Taponoin","Eaphgorhit","Outch","Mighriet","Degroryi","Epyash","Aut","Yoilchaix","Irntlob","Quoscy","Matbloamop","Smea","Lutbendelb","Pefub","Tentspidou","Elp","Griskubea","Otmuedoith","Uinbroop","Lui","Narck","Ighx","Luimpstom","Fackhurma","Vied","Ailkig","Ceydrish","Ooshoon","Asturntpay","Yueph","Dighntilk","Poloskolt","Aldaiftree","Eeckgran","Erct","Goysqualk","Blirp","Eelmclig","Soo","Glie","Yurth","Skerdog","Amslon","Auteesk","Idaumurt","Ientspoulk","Cleblo","Eskpethath","Shoun","Ag","Durm","Bact","Terdsmoi","Oomgo","Stoi","Tweat","Oostskaw","Jerflalt","Dwoulp","Timoiyieth","Goolmna","Urntgir","Thror","Prieshdwo","Sinurtch","Arshpo","Porlp","Twosptynea","Easpseenlo","Ackpersh","Pypra","Ra","Bletvoisk","Poatieshzy","Irntpick","Weyboom","Cinroy","Aspyosh","Quaclarn","Slou","Urddart","Oonoump","Ne","Dalp","Meaphli","Beebu","Eylk","Snippu","Rea","Aib","Prui","Muistar","Geckuepcex","Zitoig","Sawirtdau","Oackfry","Sker","Lawpomstui","Ealchgudar","Iskhay","Ealdvi","Naumpbawd","Dee","Soumout","Oock","Chooph","Furoyrulp","Oaskzea","Yoopeab","Palchfe","Flirsh","Eagve","Maw","Aistdorpaw","Nernisp","Twaxdwoo","Orm","Smerlkjay","Toet","Quoosni","Erph","Iect","Irb","Oabbub","Twooloth","Puempsposk","Forpoyth","Ortchoin","Nabmoa","Yonnoo","Shoutarg","Aphped","Soquoo"," quorboust","Oon","Neaberb","Oadoctyick","Bapow","Omintked","Raytch","Stertstoe","Uisp","Crundalb","Oogbubalp","Oackolf","Snau","Teest","Oin","Groon","Cla","Toulf","Chuenoylf","Phiedsee","Shoomphoe","Rylailt","Teelerct","Osp","Oit","Cleptouxob","Glash","Tooslo","Aigseesh","Puifai","Salk","Sistockoem","Clodirt","Cargurfla","Ornted","Ish","Rartdrauty","Erstdroock","Uem","Bawrayth","Groatch","Twalchkor","Irsk","Jinyhi","Aitchspim","Toosea","Sep","Leethealb","Barspmar","Tox","Unroend","Oatob","Eshayd","Thuimmie","Spuileyd","Smiskwent","Foithgror","Oskerth","Ragpho","Poam","Sincim","Impirtwou","Owld","Tesuipre","Du","Skitee","Grirmnick","Froosh","Ulb","Yoashump","Lerfliefri","Backcrood","Gounkoyhoi","Uigoyft","Soduip","Eabscue","Ilf","Honchmoun","Otog","Ix","Siseeph","Yaiton","Larmarshfa","Ood","Puiroat","Ien","Bea","Oask","Athglea","Claitood","Stowld","Eed","Tebsterlt","Laderpu","Inchtorn","Pofunch","Fesend","Meem","Ploo","Scoobith","Cougor","Piegatherb","Supuinchmu","Gar","Pranarndre","Outchdwa","Inirntint","Belbeagoit","Indaft","Irpsmi","Ootkilt","Oct","Fru","Proolt","Seboa","Umyuickpar","Uepteyph","Od","Orgquay","Tir","Crurpra","Arlf","Moa","Un","Ietch","Oack","Astkacrod","Cetstoi","Oupbisci","Scoagcoilm","Tanormthi","Pavoypheb","Gargree","Felm","Yylb","Sleeck","Oeft","Skurtoob","Iep","Keaulkdulk","Gerck","Gaulchold","Nunchfeg","Edoondsoi","Eathtotoe","Erlp","Smuwhoo","Aid","Dea","Arp","Seyvooboon","Omnorca","Kaphchoa","Bralkausp","Awshgrost","Uictfuhee","Eld","Obnulpeeg","Kethwyvy","Scuemeft","Coanchcro","Yolftaylar","Tweelp","Drey","Ielkstush","Buigsurft","Fyprob","Erctconir","Olch","Itlictirlt","Flesnorct","Snerkith","Irlch","Cheascib","Uiltun","Figroytalk","Seapdopip","Mompdir","Leabowt","Erlchphi","Urncloi","Ubthaid","Irpiguim","Om","Brorsorui","Ulkaymclee","Mortoolt","Tardaux","Erlkack","Lai","Yarlt","Fysmighvi","Righ","Katoospflo","Slee","Uinch","Sar","Ouct","Meabarb","Rer","Excro","Unuesp","Darnuict","Chawg","Raultadkar","Dockroa","Droump","Blod","Fumpkui","Tor","Arckarshva","Rin","Ersk","Skead","Omtwogshi","Oapalkdin","Alk","Lienese","Feelp","Roeproy","Skiesk","Uth","Frowgoi","Thect","Paspaup","Uldirnd","Girn","Panbooroi","Broalieck","Otdrash","Erskyay","Caltje","Kalf","Tuclorn","Skea","Fuilo","Zea","Ki","Colch","Eackam","Zowm","Pra","Arnerph","Guibkoydaw","Idhejorth","Roibneelch","Bo","Snaupso","Vou","Ud","Threy","Athpuit","Stoant","Orsteth","Um","Sceed","Inmigh","Orltblui","Eadrowmgla","Oop","Eaphuilkri","Hooth","Nuemp","Burpowckip","Alm","Irntlorn","Greytchuim","Drenmu","Ny","Een","Bleretwu","Skeauty","Ooshquee","Owpnui","Estyon","Aupree","Uck","Dy","Ertgerd","Pyvovoa","Twurnufe","Thy","Aimp","Plu","Oeck","Stowhou","Uipuithap","Crerstpe","Thaulb","Suifeagrea","Oomyuinch","Prolt","Deapgluem","Bray","Suth","Erck","Ab","Ailfpep","Oebbyree","Ipfly","Shigh","Unverth","Uigthywui","Eelk","Alfni","Etchsni","Flitch","Bree","Arlkobeep","Orddeblont","Spaict","Arneed","Urlp","Fley","Zuipeasp","Chukalk","Scurlp","Yie","Whuesp","Gytir","Eapeld","Greau","Toold","Gowhen","Eanch","Ertorck","Throa","Leelp","Sheeli","Proa","Oumpnalp","Murnspip","Jaycrairy","Rix","Roameap","Smui","Oyg","Uemcar","Narposcod","Grageanch","Smerbshint","Twarpind","Scovighn","Isk","Builb","Uint","Artruep","Slectact","Imrirnd","Sard","Rotdu","Ashbeemp","Gruinch","Droict","Sheautch","Auck","Chirtoo","Mu","Chayn","Si","Thuro","Nucoo","Roeth","Depee","Ha","Tieckdrum","Quarnt","Askgem","Skawmstart","Oash","Ebsketskor","Oanhayft","Blarnishab","Gloag","Jien","Jaushow","Ixilch","Chowb","Ophnargock","Ornwau","Seyn","Kadipoyth","Bidreasnir","Mutch","Leshflupe","Ug","Udectep","Erntlu","Dwaquoiceb","Narmchoeg","Bied","Oep","Arneest","Skain","Uedlea","Wum","Oepsmi","Pricibfrar","Ard","Goosawsai","Loa","Thighft","Dibandbleg","Uim","It","Doyartch","Itchouthme","Muidriryai","Sloapath","Puefooth","Eetjospuck","Sliesup","Amglui","Yee","Ib","Leausty","Ailt","Reckgayp","Glesichat","Har","Inthab","Idirst","Bernirbsu","Lurd","Pliemir","Broi","Teyshsoib","Pailpfoa","Choo","Irdbee","Clon","Oontflern","Thruep","Ithborp","Aisktu","Snir","Dra","Ceant","Sheygilflo","Prer","Ceegan","Uigmer","Oygirbdu","Vailm","Lu","Drailpmi","Oylkargque","Plersnird","Boip","Muiskchar","Deeboab","Ormarsh","Uetnoa","Snaisipaib","Steeslid","Aptebslar","Tikacotch","Ain","Co","Glamig","Nedien","Rostin","Twyyoot","Ceautdraip","Uipskeact","Leadrerlk","Eageepsoe","Easp","Bou","Foi","Rofar","Spui","Oshclecie","Frelk","Varfieb","Ormemzeelk","Fruboocir","Oimp","Ighlk","Gruproanai","Gir","Rayquer","Cli","Enob","Rau","Rirst","Nayde","Oad","Floo","Ooctielk","Noo","Wheskock","Irdroustum","Shoonch","Halpbo","Yithowdseg","Sau","Uinchpra","Ayn","Onshee","Drea","Oulk","Groche","Idooph","Oskoabyoo","Scortch","Ickpoiyaw","Scoond","Jeasnag","Eelm","Uibidflond","Andoymptu","Seecre","Girckscy","Lolp","Icksmoo","Sparsurst","Depo","Oyst","Spealf","Wowt","Margke","Ainthrerg","Ailtirpoib","Twep","Skershcoo","Ont","Scorph","Ordfo","Creameau","Arlmoam","Foodawgrin","Koisheeloe","Aip","Ockowm","Wolt","Smoushelf","Eex","Joist","Meyd","Owx","Tufoot","Meack","Oud","Arsh","Agult","Chethoag","Atkuilp","Yood","Dond","Foutar","Orctstee","Crayb","Guesno","Seck","Luit","Prergnousy","Ishaulp","Pondroihy","Twi","Kue","Po","Chugawdwid","Quo","Naiboop","Yoithack","Ergomdash","Twyspeelk","Kou"],
				star: {
					emoji: {
						"star": ["☀️"],
						"black-hole": ["⚫"],
						"binary": ["⚇"]
					},
					massFactor: [0,10], // kg
					massPower: [30, 32], // 10^x
					semiMajorAxis: [0.1, 25], // AU
					radius: [0.001, 0.1], // AU
					inclination: [0, 15], // °
					longitudeOfAscendingNode: [0, 360], // °
					eccentricity: [0, 0.2], // ratio
					argumentOfPeriapsis: [0, 360], // °
					children: [1, 7], // count
					binaryChance: 0.2 // ratio
				},
				planet: {
					emoji: {
						"0-19": ["☄️"],
						"20-24": ["🌎", "🌍", "🌏"],
						"25-29": ["🪐"]
					},
					massFactor: [0,10], // kg
					massPower: [20, 29], // 10^x
					semiMajorAxis: [0.1, 25], // AU
					inclination: [0, 30], // °
					longitudeOfAscendingNode: [0, 360], // °
					eccentricity: [0, 0.3], // ratio
					argumentOfPeriapsis: [0, 360], // °
					children: [0, 4] // count
				},
				moon: {
					emoji: ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"],
					massFactor: [0,10], // kg
					massPower: [17, 23], // 10^x
					semiMajorAxis: [0.001, 0.01], // AU
					inclination: [0, 45], // °
					longitudeOfAscendingNode: [0, 360], // °
					eccentricity: [0, 0.5], // ratio
					argumentOfPeriapsis: [0, 360] // °
				}
			}
		}

	/* default simulation */
		// from https://ssd.jpl.nasa.gov/sats/elem and also wikipedia
		CONSTANTS.defaults = {
			massFactor: 1.989, // kg
			massPower: 30, // 10^x
			children: {
				"star-0": {
					type: "star",
					name: "Sun",
					class: "main-sequence-g",
					description: "",
					color: "#f6fa78", // #hex
					massFactor: 1.989, // kg
					massPower: 30, // 10^x
					radius: 0.004650, // AU
					day: 0, // d
					period: 0, // d
					semiMajorAxis: 0, // AU
					eccentricity: 0, // ratio
					apoapsis: 0, // AU
					periapsis: 0, // AU
					habitableZone: 1.06, // AU
					position: {tracking: true},
					children: {
						"star-0-planet-0": {
							type: "planet",
							name: "Mercury",
							description: "",
							color: "#8e8888", // #hex
							massFactor: 3.3011, // kg
							massPower: 23, // 10^x
							day: calculateDayFromPeriapsis(87.9691, "2022-10-06T00:00"), // d
							period: 87.9691, // d
							semiMajorAxis: 0.387098, // AU
							retrograde: false,
							inclination: 6.35 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 48.331 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.205630, // ratio
							apoapsis: 0.466697, // AU
							periapsis: 0.307499, // AU
							argumentOfPeriapsis: 29.124 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
						},
						"star-0-planet-1": {
							type: "planet",
							name: "Venus",
							description: "",
							color: "#f1e9dc", // #hex
							massFactor: 4.8675, // kg
							massPower: 24, // 10^x
							day: calculateDayFromPeriapsis(224.701, "2022-01-22T00:00"), // d
							period: 224.701, // d
							semiMajorAxis: 0.723332, // AU
							retrograde: false,
							inclination: 2.15 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 76.680 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.006772, // ratio
							apoapsis: 0.728213, // AU
							periapsis: 0.718440, // AU
							argumentOfPeriapsis: 54.884 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
						},
						"star-0-planet-2": {
							type: "planet",
							name: "Earth",
							description: "",
							color: "#516e8d", // #hex
							massFactor: 5.97237, // kg
							massPower: 24, // 10^x
							day: calculateDayFromPeriapsis(365.256363, "2022-01-03T00:00"), // d
							period: 365.256363, // d
							semiMajorAxis: 1.000001, // AU
							retrograde: false,
							inclination: 1.57869 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // coordinate system is based on earth's ascending node !!!
							eccentricity: 0.016709, // ratio
							apoapsis: 1.016726, // AU
							periapsis: 0.983269, // AU
							argumentOfPeriapsis: -114.20783 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-2-moon-0": {
									type: "moon",
									name: "Moon",
									description: "",
									color: "#cabcb7",
									massFactor: 7.342, // kg
									massPower: 22, // 10^x
									day: calculateDayFromPeriapsis(27.321661, "2021-12-04T00:00"), // d
									period: 27.321661, // d
									semiMajorAxis: 0.002570, // AU
									retrograde: false,
									inclination: 5.16 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // already measured from ecliptic !!!
									longitudeOfAscendingNode: 125.08 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0549, // ratio
									apoapsis: 0.002710, // AU
									periapsis: 0.002424, // AU
									argumentOfPeriapsis: 318.15 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-3": {
							type: "planet",
							name: "Mars",
							description: "",
							color: "#ea7a56", // #hex
							massFactor: 6.4171, // kg
							massPower: 23, // 10^x
							day: calculateDayFromPeriapsis(686.980, "2022-06-21T00:00"), // d
							period: 686.980, // d
							semiMajorAxis: 1.523679, // AU
							retrograde: false,
							inclination: 1.63 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: -49.558 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // positive value made orbit cross Earth !!!
							eccentricity: 0.0934, // ratio
							apoapsis: 1.666, // AU
							periapsis: 1.382, // AU
							argumentOfPeriapsis: 286.502 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-3-moon-0": {
									type: "moon",
									name: "Phobos",
									description: "",
									color: "#958075",
									massFactor: 1.0659, // kg
									massPower: 16, // 10^x
									day: 0, // d
									period: 0.318910, // d
									semiMajorAxis: 0.000063, // AU
									retrograde: false,
									inclination: (-1.63 + 1.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians // subtract out planet inclination !!!
									longitudeOfAscendingNode: 169.2 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0151, // ratio
									apoapsis: 0.000064, // AU
									periapsis: .000062, // AU
									argumentOfPeriapsis: 216.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-3-moon-1": {
									type: "moon",
									name: "Deimos",
									description: "",
									color: "#bfa78d",
									massFactor: 1.4762, // kg
									massPower: 15, // 10^x
									day: 0, // d
									period: 1.263, // d
									semiMajorAxis: 0.000157, // AU
									retrograde: false,
									inclination: (-1.63 + 1.8) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 54.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.00033, // ratio
									apoapsis: 0.000157, // AU
									periapsis: 0.000157, // AU
									argumentOfPeriapsis: 0.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-4": {
							type: "planet",
							name: "Vesta",
							description: "",
							color: "#8c877b", // #hex
							massFactor: 2.59076, // kg
							massPower: 20, // 10^x
							day: calculateDayFromPeriapsis(686.98, "2021-12-26T00:00"), // d
							period: 1325.75, // d
							semiMajorAxis: 2.36179, // AU
							retrograde: false,
							inclination: 5.58 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 103.85136 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.08874, // ratio
							apoapsis: 2.57138, // AU
							periapsis: 2.15221, // AU
							argumentOfPeriapsis: 151.19853 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-5": {
							type: "planet",
							name: "Ceres",
							description: "",
							color: "#847d77", // #hex
							massFactor: 9.3835, // kg
							massPower: 20, // 10^x
							day: calculateDayFromPeriapsis(686.98, "2022-12-07T00:00"), // d
							period: 1680, // d
							semiMajorAxis: 2.77, // AU
							retrograde: false,
							inclination: 9.20 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 80.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.0785, // ratio
							apoapsis: 2.98, // AU
							periapsis: 2.55, // AU
							argumentOfPeriapsis: 73.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-6": {
							type: "planet",
							name: "Pallas",
							description: "",
							color: "#dedede", // #hex
							massFactor: 2.04, // kg
							massPower: 20, // 10^x
							day: calculateDayFromPeriapsis(686.98, "2023-03-06T00:00"), // d
							period: 1684.9, // d
							semiMajorAxis: 2.77, // AU
							retrograde: false,
							inclination: 34.43 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 172.9 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.23, // ratio
							apoapsis: 3.41, // AU
							periapsis: 2.13, // AU
							argumentOfPeriapsis: 310.7 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-7": {
							type: "planet",
							name: "Jupiter",
							description: "",
							color: "#ba9779", // #hex
							massFactor: 1.8982, // kg
							massPower: 27, // 10^x
							day: calculateDayFromPeriapsis(4332.59, "2023-01-21T00:00"), // d
							period: 4332.59, // d
							semiMajorAxis: 5.2044, // AU
							retrograde: false,
							inclination: 0.32 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 100.464 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.0489, // ratio
							apoapsis: 5.4588, // AU
							periapsis: 4.9501, // AU
							argumentOfPeriapsis: 273.867 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-7-moon-0": {
									type: "moon",
									name: "Io",
									description: "",
									color: "#fbf690",
									massFactor: 8.931938, // kg
									massPower: 22, // 10^x
									day: 0, // d
									period: 1.769138, // d
									semiMajorAxis: 0.002819, // AU
									retrograde: false,
									inclination: (-0.32 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0041, // ratio
									apoapsis: 0.002830, // AU
									periapsis: 0.002807, // AU
									argumentOfPeriapsis: 49.1 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-7-moon-1": {
									type: "moon",
									name: "Europa",
									description: "",
									color: "#8c6438",
									massFactor: 4.799844, // kg
									massPower: 22, // 10^x
									day: 0, // d
									period: 3.551181, // d
									semiMajorAxis: 0.004485, // AU
									retrograde: false,
									inclination: (-0.32 + 0.5) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 184.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0094, // ratio
									apoapsis: 0.004525, // AU
									periapsis: 0.004444, // AU
									argumentOfPeriapsis: 45.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-7-moon-2": {
									type: "moon",
									name: "Ganymede",
									description: "",
									color: "#9c8b79",
									massFactor: 1.4819, // kg
									massPower: 23, // 10^x
									day: 0, // d
									period: 7.154553, // d
									semiMajorAxis: 0.007155, // AU
									retrograde: false,
									inclination: (-0.32 + 0.2) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 58.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0013, // ratio
									apoapsis: 0.007163, // AU
									periapsis: 0.007147, // AU
									argumentOfPeriapsis: 198.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-7-moon-3": {
									type: "moon",
									name: "Callisto",
									description: "",
									color: "#5a523b",
									massFactor: 1.075938, // kg
									massPower: 23, // 10^x
									day: 0, // d
									period: 16.689018, // d
									semiMajorAxis: 0.012585, // AU
									retrograde: false,
									inclination: (-0.32 + 0.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 309.1 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0074, // ratio
									apoapsis: 0.0126807, // AU
									periapsis: 0.012493, // AU
									argumentOfPeriapsis: 43.8 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-8": {
							type: "planet",
							name: "Saturn",
							description: "",
							color: "#e2c17f", // #hex
							massFactor: 5.6834, // kg
							massPower: 26, // 10^x
							day: calculateDayFromPeriapsis(10759.22, "2032-11-29T00:00"), // d
							period: 10759.22, // d
							semiMajorAxis: 9.5826, // AU
							retrograde: false,
							inclination: 0.93 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 113.665 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.054, // ratio
							apoapsis: 10.1238, // AU
							periapsis: 9.0412, // AU
							argumentOfPeriapsis: 339.392 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-8-moon-0": {
									type: "moon",
									name: "Mimas",
									description: "",
									color: "#7D7D7D",
									massFactor: 3.7493, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 0.942422, // d
									semiMajorAxis: 0.001240, // AU
									retrograde: false,
									inclination: (-0.93 + 1.6) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 66.2 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0196, // ratio
									apoapsis: 0.001265, // AU
									periapsis: 0.001216, // AU
									argumentOfPeriapsis: 160.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-1": {
									type: "moon",
									name: "Enceladus",
									description: "",
									color: "#F2F2F2",
									massFactor: 1.08022, // kg
									massPower: 20, // 10^x
									day: 0, // d
									period: 1.37022, // d
									semiMajorAxis: 0.001591, // AU
									retrograde: false,
									inclination: (-0.93 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0047, // ratio
									apoapsis: 0.001598, // AU
									periapsis: 0.001584, // AU
									argumentOfPeriapsis: 119.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-2": {
									type: "moon",
									name: "Tethys",
									description: "",
									color: "#BEBEBE",
									massFactor: 6.17449, // kg
									massPower: 20, // 10^x
									day: 0, // d
									period: 1.887802, // d
									semiMajorAxis: 0.001969, // AU
									retrograde: false,
									inclination: (-0.93 + 1.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 273.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0001, // ratio
									apoapsis: 0.001969, // AU
									periapsis: 0.001969, // AU
									argumentOfPeriapsis: 335.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-3": {
									type: "moon",
									name: "Dione",
									description: "",
									color: "#C1C1C1",
									massFactor: 1.095452, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 2.736915, // d
									semiMajorAxis: 0.002523, // AU
									retrograde: false,
									inclination: (-0.93 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0022, // ratio
									apoapsis: 0.002529, // AU
									periapsis: 0.002517, // AU
									argumentOfPeriapsis: 116.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-4": {
									type: "moon",
									name: "Rhea",
									description: "",
									color: "#D7D2BF",
									massFactor: 2.306518, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 4.518212, // d
									semiMajorAxis: 0.003523, // AU
									retrograde: false,
									inclination: (-0.93 + 0.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 133.7	* CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.001258, // ratio
									apoapsis: 0.003528, // AU
									periapsis: 0.003518, // AU
									argumentOfPeriapsis: 44.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-5": {
									type: "moon",
									name: "Titan",
									description: "",
									color: "#765A32",
									massFactor: 1.345200, // kg
									massPower: 23, // 10^x
									day: 0, // d
									period: 15.9454, // d
									semiMajorAxis: 0.008168, // AU
									retrograde: false,
									inclination: (-0.93 + 0.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 78.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0288, // ratio
									apoapsis: 0.008403, // AU
									periapsis: 0.007932, // AU
									argumentOfPeriapsis: 78.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-8-moon-6": {
									type: "moon",
									name: "Iapetus",
									description: "",
									color: "#5C5A47",
									massFactor: 1.805635, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 79.3215, // d
									semiMajorAxis: 0.023803, // AU
									retrograde: false,
									inclination: (-0.93 + 7.6) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 86.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.027681, // ratio
									apoapsis: 0.024462, // AU
									periapsis: 0.023144, // AU
									argumentOfPeriapsis: 254.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-9": {
							type: "planet",
							name: "Uranus",
							description: "",
							color: "#6c7e87", // #hex
							massFactor: 8.6810, // kg
							massPower: 25, // 10^x
							day: calculateDayFromPeriapsis(30688.5, "2050-08-18T00:00"), // d
							period: 30688.5, // d
							semiMajorAxis: 19.19126, // AU
							retrograde: false,
							inclination: 0.99 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 74.006 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.04717, // ratio
							apoapsis: 20.0965, // AU
							periapsis: 18.2861, // AU
							argumentOfPeriapsis: 96.998857 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-9-moon-0": {
									type: "moon",
									name: "Miranda",
									description: "",
									color: "#bababa",
									massFactor: 6.400, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 1.413479, // d
									semiMajorAxis: 0.000865, // AU
									retrograde: false,
									inclination: (-0.99 + 4.4) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 100.7 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0013, // ratio
									apoapsis: 0.000866, // AU
									periapsis: 0.000864, // AU
									argumentOfPeriapsis: 155.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-1": {
									type: "moon",
									name: "Ariel",
									description: "",
									color: "#d6d6d6",
									massFactor: 1.25100, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 2.52038, // d
									semiMajorAxis: 0.001277, // AU
									retrograde: false,
									inclination: (-0.99 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0012, // ratio
									apoapsis: 0.001279, // AU
									periapsis: 0.001275, // AU
									argumentOfPeriapsis: 83.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-2": {
									type: "moon",
									name: "Umbriel",
									description: "",
									color: "#5b5b5b",
									massFactor: 1.275, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 4.14418, // d
									semiMajorAxis: 0.001778, // AU
									retrograde: false,
									inclination: (-0.99 + 0.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 195.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0039, // ratio
									apoapsis: 0.001785, // AU
									periapsis: 0.001771, // AU
									argumentOfPeriapsis: 157.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-3": {
									type: "moon",
									name: "Titania",
									description: "",
									color: "#c8bfb2",
									massFactor: 3.40000, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 8.706234, // d
									semiMajorAxis: 0.002914, // AU
									retrograde: false,
									inclination: (-0.99 + 0.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 26.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0011, // ratio
									apoapsis: 0.002917, // AU
									periapsis: 0.002911, // AU
									argumentOfPeriapsis: 202.0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-9-moon-4": {
									type: "moon",
									name: "Oberon",
									description: "",
									color: "#b0a299",
									massFactor: 3.07600, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 13.463234, // d
									semiMajorAxis: 0.003901, // AU
									retrograde: false,
									inclination: (-0.99 + 0.1) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 30.5 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0014, // ratio
									apoapsis: 0.003906, // AU
									periapsis: 0.003896, // AU
									argumentOfPeriapsis: 182.4 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-10": {
							type: "planet",
							name: "Neptune",
							description: "",
							color: "#6280af", // #hex
							massFactor: 1.02413, // kg
							massPower: 26, // 10^x
							day: calculateDayFromPeriapsis(60195, "2042-09-04T00:00"), // d
							period: 60195, // d
							semiMajorAxis: 30.07, // AU
							retrograde: false,
							inclination: 0.74 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 131.783 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.008678, // ratio
							apoapsis: 30.33, // AU
							periapsis: 29.81, // AU
							argumentOfPeriapsis: 273.187 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-10-moon-0": {
									type: "moon",
									name: "Proteus",
									description: "",
									color: "#e4e4e4",
									massFactor: 4.400, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 1.122315, // d
									semiMajorAxis: 0.000786, // AU
									retrograde: false,
									inclination: (-0.74 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.00053, // ratio
									apoapsis: 0.000787, // AU
									periapsis: 0.000786, // AU
									argumentOfPeriapsis: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-10-moon-1": {
									type: "moon",
									name: "Triton",
									description: "",
									color: "#6f6457",
									massFactor: 2.1390, // kg
									massPower: 22, // 10^x
									day: 0, // d
									period: 5.876854, // d
									semiMajorAxis: 0.002371, // AU
									inclination: (-0.74 + 157.3) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 178.1 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									retrograde: true,
									eccentricity: 0.000016, // ratio
									apoapsis: 0.002371, // AU
									periapsis: 0.002371, // AU
									argumentOfPeriapsis: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
								"star-0-planet-10-moon-2": {
									type: "moon",
									name: "Nereid",
									description: "",
									color: "#e2e2e2",
									massFactor: 2.700, // kg
									massPower: 19, // 10^x
									day: 0, // d
									period: 360.11, // d
									semiMajorAxis: 0.036858, // AU
									retrograde: false,
									inclination: (-0.74 + 5.0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 321.6 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.741748, // ratio
									apoapsis: 0.064197, // AU
									periapsis: 0.009519, // AU
									argumentOfPeriapsis: 295.3 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-11": {
							type: "planet",
							name: "Pluto",
							description: "",
							color: "#d8cab7", // #hex
							massFactor: 1.303, // kg
							massPower: 22, // 10^x
							day: calculateDayFromPeriapsis(90560, "1989-09-05T00:00"), // d
							period: 90560, // d
							semiMajorAxis: 39.482, // AU
							retrograde: false,
							inclination: -15.58 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 110.299 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.2488, // ratio
							apoapsis: 49.305, // AU
							periapsis: 29.658, // AU
							argumentOfPeriapsis: 113.834 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							children: {
								"star-0-planet-11-moon-0": {
									type: "moon",
									name: "Charon",
									description: "",
									color: "#979596",
									massFactor: 1.586, // kg
									massPower: 21, // 10^x
									day: 0, // d
									period: 6.387230, // d
									semiMajorAxis: 0.000131, // AU
									retrograde: false,
									inclination: (-15.58 + 0) * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									longitudeOfAscendingNode: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
									eccentricity: 0.0002, // ratio
									apoapsis: 0.000131, // AU
									periapsis: 0.000131, // AU
									argumentOfPeriapsis: 0 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
								},
							}
						},
						"star-0-planet-12": {
							type: "planet",
							name: "Encke",
							description: "",
							color: "#cbcbcb", // #hex
							massFactor: 2.0, // kg
							massPower: 13, // 10^x
							period: 3.30 * 365.25, // d
							day: calculateDayFromPeriapsis(3.30 * 365.25, "2023-10-22T00:00"), // d
							semiMajorAxis: 2.2178, // AU
							retrograde: false,
							inclination: 10.18 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 334.49 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.8471, // ratio
							apoapsis: 4.11, // AU
							periapsis: 0.3302, // AU
							argumentOfPeriapsis: 186.5665 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-13": {
							type: "planet",
							name: "Tempel 1",
							description: "",
							color: "#494949", // #hex
							massFactor: 2.0, // kg
							massPower: 14, // 10^x
							period: 5.58 * 365.25, // d
							day: calculateDayFromPeriapsis(5.58 * 365.25, "2022-03-04T00:00"), // d
							semiMajorAxis: 3.145, // AU
							retrograde: false,
							inclination: 8.894 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 68.75 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.5096, // ratio
							apoapsis: 4.748, // AU
							periapsis: 1.542, // AU
							argumentOfPeriapsis: 179.21 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-14": {
							type: "planet",
							name: "Wild 2",
							description: "",
							color: "#a2a2a2", // #hex
							massFactor: 2.3, // kg
							massPower: 13, // 10^x
							period: 6.408 * 365.25, // d
							day: calculateDayFromPeriapsis(6.408 * 365.25, "2022-12-15T00:00"), // d
							semiMajorAxis: 3.45, // AU
							retrograde: false,
							inclination: 1.66 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 136.098138 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.5384, // ratio
							apoapsis: 5.308, // AU
							periapsis: 1.592, // AU
							argumentOfPeriapsis: 41.731965 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-15": {
							type: "planet",
							name: "Borrelly",
							description: "",
							color: "#929292", // #hex
							massFactor: 2.0, // kg
							massPower: 13, // 10^x
							period: 6.8 * 365.25, // d
							day: calculateDayFromPeriapsis(6.8 * 365.25, "2022-02-01T00:00"), // d
							semiMajorAxis: 3.59, // AU
							retrograde: false,
							inclination: 28.7 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 74.25 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.624, // ratio
							apoapsis: 5.86, // AU
							periapsis: 1.35, // AU
							argumentOfPeriapsis: 351.92 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-16": {
							type: "planet",
							name: "Tempel-Tuttle",
							description: "",
							color: "#a2a2a2", // #hex
							massFactor: 1.2, // kg
							massPower: 13, // 10^x
							period: 33.2226 * 365.25, // d
							day: calculateDayFromPeriapsis(33.2226 * 365.25, "2031-05-20T00:00"), // d
							semiMajorAxis: 10.3345, // AU
							retrograde: false,
							inclination: 160.91 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 235.41 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.9055, // ratio
							apoapsis: 19.6924, // AU
							periapsis: 0.9766, // AU
							argumentOfPeriapsis: 172.5893 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
						"star-0-planet-17": {
							type: "planet",
							name: "Halley's Comet",
							description: "",
							color: "#da671b", // #hex
							massFactor: 2.2, // kg
							massPower: 14, // 10^x
							period: 75.32 * 365.25, // d
							day: calculateDayFromPeriapsis(75.32 * 365.256, "2061-07-28T00:00"), // d
							semiMajorAxis: 17.834, // AU
							retrograde: false,
							inclination: 160.68 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 58.98 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.96714, // ratio
							apoapsis: 35.082, // AU
							periapsis: 0.586, // AU
							argumentOfPeriapsis: 111.33 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
						},
						"star-0-planet-18": {
							type: "planet",
							name: "Hale-Bopp",
							description: "",
							color: "#7698d8", // #hex
							massFactor: 1.3, // kg
							massPower: 19, // 10^x
							period: 2525 * 365.25, // d
							day: calculateDayFromPeriapsis(2525 * 365.25, "1997-04-01T00:00"), // d
							semiMajorAxis: 186, // AU
							retrograde: false,
							inclination: 87.8 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							longitudeOfAscendingNode: 58.98 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							eccentricity: 0.995086, // ratio
							apoapsis: 370.8, // AU
							periapsis: 0.914, // AU
							argumentOfPeriapsis: 282.47 * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree, // radians
							position: {visible: false},
						},
					}
				}
			}
		}

	/* elements */
		const ELEMENTS = {
			options: {
				button: document.querySelector("#options-button"),
				overlay: document.querySelector("#options-overlay"),
				header: document.querySelector("#options-header"),
			},
			controls: {
				element: document.querySelector("#controls"),
				play: document.querySelector("#controls-play"),
				rate: document.querySelector("#controls-rate"),
				ratePower: document.querySelector("#controls-rate-power"),
				zoom: document.querySelector("#controls-zoom"),
				zoomPower: document.querySelector("#controls-zoom-power"),
				tracking: document.querySelector("#controls-tracking"),
				x: document.querySelector("#controls-x"),
				y: document.querySelector("#controls-y"),
				randomize: document.querySelector("#controls-randomize"),
				upload: document.querySelector("#controls-upload"),
				download: document.querySelector("#controls-download")
			},
			system: document.querySelector("#system"),
			simulation: {
				canvas: document.querySelector("#simulation"),
				context: document.querySelector("#simulation").getContext("2d")
			}
		}

	/* state */
		const STATE = {
			loop: null,
			grab: {
				grabbing: false,
				x: null,
				y: null
			},
			controls: {
				play: true,
				rate: 2, // d/s
				zoom: 100, // AU/px
				x: 0, // AU
				y: 0, // AU
				tracking: null
			},
			field: {
				stars: []
			},
			system: {
				children: {},
				elements: {
					children: ELEMENTS.system
				}
			}
		}

/*** inputs - controls menu ***/
	/* setDefaults */
		setDefaults()
		function setDefaults() {
			try {
				// set control limits
					ELEMENTS.controls.ratePower.min  = CONSTANTS.limit.minimumRatePower // 10^x
					ELEMENTS.controls.ratePower.max  = CONSTANTS.limit.maximumRatePower // 10^x
					ELEMENTS.controls.ratePower.step = CONSTANTS.limit.stepRatePower // 10^x

					ELEMENTS.controls.zoomPower.min  = CONSTANTS.limit.minimumZoomPower // 10^x
					ELEMENTS.controls.zoomPower.max  = CONSTANTS.limit.maximumZoomPower // 10^x
					ELEMENTS.controls.zoomPower.step = CONSTANTS.limit.stepZoomPower // 10^x

					ELEMENTS.controls.x.step = CONSTANTS.limit.stepOffset // AU
					ELEMENTS.controls.y.step = CONSTANTS.limit.stepOffset // AU

				// set controls
					ELEMENTS.controls.rate.value = STATE.controls.rate // d/s
					ELEMENTS.controls.ratePower.value = roundNumber(Math.log10(STATE.controls.rate)) // 10^x
					ELEMENTS.controls.zoom.value = STATE.controls.zoom // AU/px
					ELEMENTS.controls.zoomPower.value = roundNumber(Math.log10(STATE.controls.zoom)) // 10^x
					ELEMENTS.controls.x.value = STATE.controls.x // AU
					ELEMENTS.controls.y.value = STATE.controls.y // AU
					ELEMENTS.controls.play.setAttribute("play", STATE.controls.play || false)

				// loop through children
					for (let i in CONSTANTS.defaults.children) {
						let child = createCelestialBody(CONSTANTS.defaults.children[i], null)
						STATE.system.children[child.id] = child
						ELEMENTS.system.appendChild(child.elements.section)
					}

				// begin loop
					resizeCanvas()
					simulateSystem()
					STATE.loop = setInterval(simulateSystem, CONSTANTS.convert.second_to_ms / CONSTANTS.convert.second_to_loop)
			} catch (error) {console.log(error)}
		}

	/* toggleOverlay */
		ELEMENTS.options.button.addEventListener(TRIGGERS.click, toggleOverlay)
		function toggleOverlay(event) {
			try {
				// open --> close
					if (ELEMENTS.options.overlay.getAttribute("active")) {
						ELEMENTS.options.button.removeAttribute("active")
						ELEMENTS.options.overlay.removeAttribute("active")
						return
					}

				// close --> open
					ELEMENTS.options.button.setAttribute("active", true)
					ELEMENTS.options.overlay.setAttribute("active", true)
			} catch (error) {console.log(error)}
		}

	/* scrollToTop */
		ELEMENTS.options.header.addEventListener(TRIGGERS.click, scrollToTop)
		function scrollToTop(event) {
			try {
				// change scroll position
					ELEMENTS.options.overlay.scrollTop = 0
			} catch (error) {console.log(error)}
		}

	/* changePlay */
		ELEMENTS.controls.play.addEventListener(TRIGGERS.click, changePlay)
		function changePlay(event) {
			try {
				// flip current state
					STATE.controls.play = !STATE.controls.play

				// update button
					ELEMENTS.controls.play.setAttribute("play", STATE.controls.play || false)
			} catch (error) {console.log(error)}
		}

	/* changeRate */
		ELEMENTS.controls.rate.addEventListener(TRIGGERS.input, changeRate)
		function changeRate(event) {
			try {
				// days per second
					// get rate
						let rate = Number(ELEMENTS.controls.rate.value) // d/s

					// errors
						if (!rate) {
							return
						}

					// save new value
						STATE.controls.rate = roundNumber(rate) // d/s

					// set value
						ELEMENTS.controls.ratePower.value = roundNumber(Math.log10(rate)) // 10^x
			} catch (error) {console.log(error)}
		}

	/* changeRatePower */
		ELEMENTS.controls.ratePower.addEventListener(TRIGGERS.input, changeRatePower)
		function changeRatePower(event) {
			try {
				// days per second (logarithmic)
					// get ratePower
						let ratePower = Number(ELEMENTS.controls.ratePower.value) // 10^x

					// get rate
						let rate = roundNumber(10 ** ratePower) // d/s

					// set & save value
						ELEMENTS.controls.rate.value = STATE.controls.rate = rate // d/s
			} catch (error) {console.log(error)}
		}

	/* changeZoom */
		ELEMENTS.controls.zoom.addEventListener(TRIGGERS.input, changeZoom)
		function changeZoom(event) {
			try {
				// days per second
					// get zoom
						let zoom = Number(ELEMENTS.controls.zoom.value) // AU/px

					// errors
						if (!zoom) {
							return
						}

					// save new value
						STATE.controls.zoom = roundNumber(zoom) // AU/px

					// set value
						ELEMENTS.controls.zoomPower.value = roundNumber(Math.log10(zoom)) // 10^x
			} catch (error) {console.log(error)}
		}

	/* changeZoomPower */
		ELEMENTS.controls.zoomPower.addEventListener(TRIGGERS.input, changeZoomPower)
		function changeZoomPower(event) {
			try {
				// days per second (logarithmic)
					// get zoomPower
						let zoomPower = Number(ELEMENTS.controls.zoomPower.value) // 10^x

					// get zoom
						let zoom = roundNumber(10 ** zoomPower) // AU/px

					// set & save value
						ELEMENTS.controls.zoom.value = STATE.controls.zoom = zoom // AU/px
			} catch (error) {console.log(error)}
		}

	/* changeOffset */
		ELEMENTS.controls.x.addEventListener(TRIGGERS.input, changeOffset)
		ELEMENTS.controls.y.addEventListener(TRIGGERS.input, changeOffset)
		function changeOffset(event) {
			try {
				// get x & y
					let x = Number(ELEMENTS.controls.x.value) // AU
					let y = Number(ELEMENTS.controls.y.value) // AU

				// set state
					STATE.controls.x = roundNumber(x) // AU
					STATE.controls.y = roundNumber(y) // AU

				// stop tracking
					if (STATE.controls.tracking) {
						changeTracking(false)
					}
			} catch (error) {console.log(error)}
		}

	/* changeTracking */
		function changeTracking(event) {
			try {
				// previous tracking
					if (STATE.controls.tracking) {
						let previousCelestialBody = getCelestialBodyFromId(STATE.controls.tracking)
						if (previousCelestialBody) {
							previousCelestialBody.position.tracking = false
						}
					}

				// clear tracking
					STATE.controls.tracking = null

				// no event
					if (!event) {
						ELEMENTS.controls.tracking.checked = true
						return
					}

				// new tracking
					let currentId = event.target.value
					let currentCelestialBody = getCelestialBodyFromId(currentId)
						currentCelestialBody.position.tracking = true
						currentCelestialBody.elements.tracking.checked = true
						currentCelestialBody.position.visible = true
						currentCelestialBody.elements.visible.checked = true
					STATE.controls.tracking = currentId
			} catch (error) {console.log(error)}
		}

	/* randomizeSystem */
		ELEMENTS.controls.randomize.addEventListener(TRIGGERS.click, randomizeSystem)
		function randomizeSystem(event, celestialBody, parent) {
			try {
				// get celestialBody
					if (!celestialBody) {
						// reset top-level
							let celestialBody = STATE.system.children[Object.keys(STATE.system.children)[0]]
								celestialBody.class = "custom"
							return randomizeSystem(null, celestialBody, STATE.system)
					}

				// star
					if (celestialBody.type == "star") {
						// clear children
							for (let i in celestialBody.children) {
								celestialBody.children[i].elements.section.remove()
								delete celestialBody.children[i]
							}

						// binary?
							if (Math.random() < CONSTANTS.random.star.binaryChance) {
								changeStarToBinary(celestialBody, true)

								for (let i in celestialBody.children) {
									randomizeSystem(null, celestialBody.children[i], celestialBody)
								}
								return
							}

						// normal star --> randomize
							randomizeStar(null, celestialBody)

						// add planets
							let numberOfChildren = generateRandom(CONSTANTS.random.star.children[0], CONSTANTS.random.star.children[1])
							for (let i = 0; i < numberOfChildren; i++) {
								let planet = createPlanet(null, celestialBody.id)
								celestialBody.children[planet.id] = planet
								celestialBody.elements.children.appendChild(planet.elements.section)
								randomizeSystem(null, planet, celestialBody)
							}
						return
					}

				// planet
					if (celestialBody.type == "planet") {
						// randomize
							randomizePlanet(null, celestialBody, parent)

						// add moons
							let numberOfChildren = generateRandom(CONSTANTS.random.planet.children[0], CONSTANTS.random.planet.children[1])
							for (let i = 0; i < numberOfChildren; i++) {
								let moon = createMoon(null, celestialBody.id)
								celestialBody.children[moon.id] = moon
								celestialBody.elements.children.appendChild(moon.elements.section)
								randomizeSystem(null, moon, celestialBody)
							}
						return
					}

				// moon
					if (celestialBody.type == "moon") {
						// randomize
							randomizeMoon(null, celestialBody, parent)
						return
					}
			} catch (error) {console.log(error)}
		}

	/* uploadFile */
		ELEMENTS.controls.upload.addEventListener(TRIGGERS.input, uploadFile)
		function uploadFile() {
			try {
				// get file
					let file = ELEMENTS.controls.upload.files[0]

				// no file
					if (!file) {
						return
					}

				// read file
					let reader = new FileReader()
						reader.readAsText(file)
						reader.onload = function(event) {
							try {
								// try to parse data
									let data = String(event.target.result)
									if (!data || !data.length) {
										return
									}
									data = JSON.parse(data)

								// clear existing data
									for (let childId in STATE.system.children) {
										STATE.system.children[childId].elements.section.remove()
									}
									STATE.system.children = {}

								// loop through data to create system
									for (let i in data.children) {
										let child = createCelestialBody(data.children[i], null)
										STATE.system.children[child.id] = child
										ELEMENTS.system.appendChild(child.elements.section)
									}
							} catch (error) {console.log(error)}
							ELEMENTS.controls.upload.value = null
						}
			} catch (error) {console.log(error)}
		}

	/* downloadFile */
		ELEMENTS.controls.download.addEventListener(TRIGGERS.click, downloadFile)
		function downloadFile() {
			try {
				// copy
					let system = duplicateObject(STATE.system)

				// sanitize
					system = sanitizeObject(system)

				// package up
					let link = document.createElement("a")
						link.id = "controls-download-link"
						link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(system)))
						link.setAttribute("download", "orbitMaker_" + (new Date().getTime()) + ".json")
						link.addEventListener(TRIGGERS.click, function() {
							var link = document.getElementById("controls-download-link")
							document.body.removeChild(link)
						})
				
				// click
					document.body.appendChild(link)
					link.click()
			} catch (error) {console.log(error)}
		}

/*** inputs - outside of menu ***/
	/* pressKey */
		window.addEventListener(TRIGGERS.keydown, pressKey)
		function pressKey(event) {
			try {
				// activeElement
					if (document.activeElement && document.activeElement !== document.body && document.activeElement !== ELEMENTS.simulation.canvas) {
						return
					}

				// space --> play/pause
					if (event.key == " " || event.keyCode == 32 || event.code == "Space") {
						changePlay()
						return
					}

				// plus/minus --> zoom
					if (event.key == "-" || event.key == "_" || event.keyCode == 189 || event.code == "Minus") {
						let zoomPower = Math.log10(STATE.controls.zoom) // 10^x
							zoomPower = roundNumber(Math.max(CONSTANTS.limit.minimumZoomPower, zoomPower - CONSTANTS.limit.stepZoomPower)) // 10^x
						ELEMENTS.controls.zoomPower.value = zoomPower
						ELEMENTS.controls.zoom.value = STATE.controls.zoom = roundNumber(10 ** zoomPower) // d/s
						return
					}
					if (event.key == "+" || event.key == "=" || event.keyCode == 187 || event.code == "Plus" || event.code == "Equal") {
						let zoomPower = Math.log10(STATE.controls.zoom) // 10^x
							zoomPower = roundNumber(Math.min(CONSTANTS.limit.maximumZoomPower, zoomPower + CONSTANTS.limit.stepZoomPower)) // 10^x
						ELEMENTS.controls.zoomPower.value = zoomPower
						ELEMENTS.controls.zoom.value = STATE.controls.zoom = roundNumber(10 ** zoomPower) // d/s
						return
					}

				// brackets --> rate
					if (event.key == "[" || event.keyCode == 91 || event.code == "BracketLeft" || event.key == "," || event.key == "<" || event.keyCode == 188 || event.code == "Comma") {
						let ratePower = Math.log10(STATE.controls.rate) // 10^x
							ratePower = roundNumber(Math.max(CONSTANTS.limit.minimumRatePower, ratePower - CONSTANTS.limit.stepRatePower)) // 10^x
						ELEMENTS.controls.ratePower.value = ratePower
						ELEMENTS.controls.rate.value = STATE.controls.rate = roundNumber(10 ** ratePower) // d/s
						return
					}
					if (event.key == "]" || event.keyCode == 93 || event.code == "BracketRight" || event.key == "." || event.key == ">" || event.keyCode == 190 || event.code == "Period") {
						let ratePower = Math.log10(STATE.controls.rate) // 10^x
							ratePower = roundNumber(Math.min(CONSTANTS.limit.maximumRatePower, ratePower + CONSTANTS.limit.stepRatePower)) // 10^x
						ELEMENTS.controls.ratePower.value = ratePower
						ELEMENTS.controls.rate.value = STATE.controls.rate = roundNumber(10 ** ratePower) // d/s
						return
					}

				// arrows --> offset
					if (event.key == "ArrowLeft" || event.keyCode == 37 || event.code == "ArrowLeft") {
						ELEMENTS.controls.x.value = STATE.controls.x = STATE.controls.x - CONSTANTS.limit.stepOffset
						changeTracking(false)
						return
					}
					if (event.key == "ArrowRight" || event.keyCode == 39 || event.code == "ArrowRight") {
						ELEMENTS.controls.x.value = STATE.controls.x = STATE.controls.x + CONSTANTS.limit.stepOffset
						changeTracking(false)
						return
					}
					if (event.key == "ArrowUp" || event.keyCode == 38 || event.code == "ArrowUp") {
						ELEMENTS.controls.y.value = STATE.controls.y = STATE.controls.y + CONSTANTS.limit.stepOffset
						changeTracking(false)
						return
					}
					if (event.key == "ArrowDown" || event.keyCode == 40 || event.code == "ArrowDown") {
						ELEMENTS.controls.y.value = STATE.controls.y = STATE.controls.y - CONSTANTS.limit.stepOffset
						changeTracking(false)
						return
					}
			} catch (error) {console.log(error)}
		}

	/* scrollMouse */
		ELEMENTS.simulation.canvas.addEventListener(TRIGGERS.scroll, scrollMouse)
		function scrollMouse(event) {
			try {
				// prevent scroll while grabbing
					if (STATE.grab.grabbing) {
						return
					}

				// get direction
					let direction = Math.sign(event.deltaY)
					if (direction == 0) {
						return
					}
					direction = -direction

				// zoom by a constant amount
					let zoomPower = Math.log10(STATE.controls.zoom) // 10^x
						zoomPower = roundNumber(zoomPower + (CONSTANTS.canvas.scroll_to_zoom * direction)) // 10^x

				// get new zoom
					let zoom = roundNumber(10 ** zoomPower) // AU/px

				// set & save value
					ELEMENTS.controls.zoom.value = STATE.controls.zoom = zoom // AU/px
					ELEMENTS.controls.zoomPower.value = zoomPower // 10^x
			} catch (error) {console.log(error)}
		}

	/* downMouse */
		ELEMENTS.simulation.canvas.addEventListener(TRIGGERS.mousedown, downMouse)
		function downMouse(event) {
			try {
				// right click
					if (event.button !== undefined && event.button !== 0) {
						return
					}
					if (event.ctrlKey) {
						return
					}

				// get position
					let x = (event.touches ? event.touches[0].clientX : event.clientX) // px
					let y = (event.touches ? event.touches[0].clientY : event.clientY) // px

				// set grab offset
					STATE.grab.grabbing = true
					STATE.grab.x = x // px
					STATE.grab.y = y // px
					STATE.grab.offsetX = -STATE.controls.x // AU
					STATE.grab.offsetY = -STATE.controls.y // AU

				// set cursor
					ELEMENTS.simulation.canvas.setAttribute("grabbing", true)

				// get position in-universe
					let invariableX = x - (ELEMENTS.simulation.canvas.width / 2)
						invariableX /= STATE.controls.zoom
						invariableX += STATE.controls.x
					let invariableY = (ELEMENTS.simulation.canvas.height - y) - (ELEMENTS.simulation.canvas.height / 2)
						invariableY /= STATE.controls.zoom
						invariableY += STATE.controls.y

				// select object, if exists
					selectCelestialBody(invariableX, invariableY, STATE.system.children)
			} catch (error) {console.log(error)}
		}

	/* moveMouse */
		window.addEventListener(TRIGGERS.mousemove, moveMouse)
		function moveMouse(event) {
			try {
				// not grabbing
					if (!STATE.grab.grabbing) {
						return
					}

				// get new position
					let x = (event.touches ? event.touches[0].clientX : event.clientX) // px
					let y = (event.touches ? event.touches[0].clientY : event.clientY) // px

				// calculate difference
					let deltaX = x - STATE.grab.x
					let deltaY = y - STATE.grab.y

				// convert into AU
					deltaX = deltaX / STATE.controls.zoom // AU/px
					deltaY = deltaY / STATE.controls.zoom // AU/px

				// new offset
					let offsetX = roundNumber(STATE.grab.offsetX + deltaX) // AU/px
					let offsetY = roundNumber(STATE.grab.offsetY - deltaY) // AU/px

				// set & save values
					ELEMENTS.controls.x.value = STATE.controls.x = -offsetX // AU/px
					ELEMENTS.controls.y.value = STATE.controls.y = -offsetY // AU/px

				// stop tracking
					if (STATE.controls.tracking) {
						changeTracking(false)
					}
			} catch (error) {console.log(error)}
		}

	/* upMouse */
		window.addEventListener(TRIGGERS.mouseup, upMouse)
		function upMouse(event) {
			try {
				// not grabbing
					if (!STATE.grab.grabbing) {
						return
					}

				// stop grabbing
					STATE.grab.grabbing = false
					STATE.grab.x = null
					STATE.grab.y = null

				// set cursor
					ELEMENTS.simulation.canvas.removeAttribute("grabbing")
			} catch (error) {console.log(error)}
		}

	/* selectCelestialBody */
		function selectCelestialBody(x, y, list) {
			try {
				// loop through to find something
					for (let i in list) {
						// get this celestial body
							let celestialBody = list[i]
						
						// if visible, get distance
							if (celestialBody.position.visible) {
								let distance = getDistance({x: celestialBody.position.invariableX, y: celestialBody.position.invariableY}, {x: x, y: y}) // AU
								if (distance < CONSTANTS.limit.minimumDistanceForSelection / STATE.controls.zoom) { // AU
									celestialBody.position.tracking = true
									celestialBody.elements.tracking.checked = true
									STATE.controls.tracking = celestialBody.id
									return true
								}
							}

						// loop through children
							if (selectCelestialBody(x, y, celestialBody.children)) {
								return true
							}
					}

				// not here
					return false
			} catch (error) {console.log(error)}
		}

/*** inputs - general ***/
	/* createCelestialBody */
		function createCelestialBody(celestialBody, parentId) {
			try {
				// get type
					if (celestialBody.type == "star") {
						return createStar(celestialBody, parentId)
					}
					if (celestialBody.type == "planet") {
						return createPlanet(celestialBody, parentId)
					}
					if (celestialBody.type == "moon") {
						return createMoon(celestialBody, parentId)
					}

				// nothing
					return false
			} catch (error) {console.log(error)}
		}

/*** inputs - star ***/
	/* createStar */
		function createStar(starSeed, parentId) {
			try {
				// values
					let star = duplicateObject(CONSTANTS.star)
					for (let i in starSeed) {
						if (!CONSTANTS.ignoreKeys.includes(i)) {
							star[i] = starSeed[i]
						}
					}

				// id
					star.id = (parentId || "") + "-star-" + generateRandom()

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)

				// tracking / visible
					if (starSeed && starSeed.position && starSeed.position.tracking) {
						star.position.tracking = starSeed.position.tracking
						STATE.controls.tracking = star.id
					}
					if (starSeed && starSeed.position && starSeed.position.visible !== undefined) {
						star.position.visible = starSeed.position.visible
					}

				// form
					var section = document.createElement("details")
						section.id = star.id
						section.className = "star"
					star.elements.section = section

					if (star.class == "binary") {
						section.setAttribute("binary", true)
					}

					var summary = document.createElement("summary")
					section.appendChild(summary)

					var header = document.createElement("h3")
						header.innerHTML = getNameSymbol(star) + (star.name || "")
					summary.appendChild(header)
					star.elements.summary = header

				// track
					var label = document.createElement("label")
						label.className = "star-tracking-label"
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "radio"
						input.name = "tracking"
						input.value = star.id
						input.checked = star.position.tracking
						input.addEventListener(TRIGGERS.input, changeTracking)
					label.appendChild(input)
					star.elements.tracking = input

					var span = document.createElement("span")
						span.innerText = "track"
					label.appendChild(span)

				// visible
					var label = document.createElement("label")
						label.className = "star-visible-label"
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = star.position.visible
						input.addEventListener(TRIGGERS.input, changeStarVisible)
					label.appendChild(input)
					star.elements.visible = input

					var span = document.createElement("span")
						span.innerText = "show"
					label.appendChild(span)

				// randomize
					var button = document.createElement("button")
						button.className = "star-randomize"
						button.innerHTML = "&olarr; randomize"
						button.addEventListener(TRIGGERS.click, randomizeStar)
					section.appendChild(button)
					star.elements.randomize = button

				// name
					var label = document.createElement("label")
						label.className = "star-name-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "name"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "text"
						input.className = "star-name"
						input.placeholder = "name"
						input.value = star.name
						input.addEventListener(TRIGGERS.input, changeStarName)
					label.appendChild(input)
					star.elements.name = input

				// class
					var label = document.createElement("label")
						label.className = "star-class-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "class"
					label.appendChild(heading)

					var select = document.createElement("select")
						select.className = "star-class"

						var option = document.createElement("option")
							option.value = option.innerText = "custom"
						select.appendChild(option)

						for (let i in CONSTANTS.classes.stars) {
							var option = document.createElement("option")
								option.value = i
								option.innerText = CONSTANTS.classes.stars[i].name
							select.appendChild(option)
						}
						
						select.value = star.class || "custom"
						select.addEventListener(TRIGGERS.input, changeStarClass)
					label.appendChild(select)
					star.elements.class = select

				// description
					var label = document.createElement("label")
						label.className = "star-description-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "description"
					label.appendChild(heading)

					var textarea = document.createElement("textarea")
						textarea.className = "star-description"
						textarea.placeholder = "description"
						textarea.value = star.description
						textarea.addEventListener(TRIGGERS.input, changeStarDescription)
					label.appendChild(textarea)
					star.elements.description = textarea

				// color
					var label = document.createElement("label")
						label.className = "star-color-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "color"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "color"
						input.className = "star-color"
						input.value = star.color
						input.addEventListener(TRIGGERS.input, changeStarColor)
					label.appendChild(input)
					star.elements.color = input

				// mass
					var label = document.createElement("label")
						label.className = "star-mass-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "mass"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-mass-factor"
						input.min = 1
						input.max = 10 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "n"
						input.value = star.massFactor
						input.addEventListener(TRIGGERS.input, changeStarMass)
					label.appendChild(input)
					star.elements.massFactor = input

					var span = document.createElement("span")
						span.innerText = "x10^"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-mass-power"
						input.min = 0
						input.step = 1
						input.placeholder = "exponent"
						input.value = star.massPower
						input.addEventListener(TRIGGERS.input, changeStarMass)
					label.appendChild(input)
					star.elements.massPower = input

					var span = document.createElement("span")
						span.innerText = "kg"
					label.appendChild(span)

				// habitableZone
					var label = document.createElement("label")
						label.className = "star-habitablezone-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "habitable zone"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-habitablezone"
						input.min = 0
						input.step = 0.1
						input.placeholder = "distance"
						input.value = star.habitableZone
						input.addEventListener(TRIGGERS.input, changeStarHabitableZone)
					label.appendChild(input)
					star.elements.habitableZone = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// radius
					var label = document.createElement("label")
						label.className = "star-radius-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "radius"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-radius"
						input.min = 0
						input.step = 0.01
						input.placeholder = "radius"
						input.value = star.radius
						input.addEventListener(TRIGGERS.input, changeStarRadius)
					label.appendChild(input)
					star.elements.radius = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// advanced
					var details = document.createElement("details")
						details.className = "star-advanced-outer"
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "advanced"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "star-advanced"
					details.appendChild(inner)

				// orbit
					var label = document.createElement("label")
						label.className = "star-orbit-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "orbit"
					label.appendChild(heading)

					var span = document.createElement("span")
						span.innerText = "day"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-day"
						input.min = 0
						input.step = 1
						input.placeholder = "day"
						input.value = star.day
						input.addEventListener(TRIGGERS.input, changeStarDay)
					label.appendChild(input)
					star.elements.day = input

					var span = document.createElement("span")
						span.innerText = "/"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-period"
						input.min = 0
						input.step = 1
						input.placeholder = "period"
						input.value = star.period
						input.addEventListener(TRIGGERS.input, changeStarPeriod)
					label.appendChild(input)
					star.elements.period = input

				// distance
					var label = document.createElement("label")
						label.className = "star-distance-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "distance"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-semimajoraxis"
						input.min = 0
						input.placeholder = "distance"
						input.value = star.semiMajorAxis
						input.addEventListener(TRIGGERS.input, changeStarSemiMajorAxis)
					label.appendChild(input)
					star.elements.semiMajorAxis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// retrograde
					var label = document.createElement("label")
						label.className = "star-retrograde-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "retrograde"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = star.retrograde
						input.addEventListener(TRIGGERS.input, changeStarRetrograde)
					label.appendChild(input)
					star.elements.retrograde = input

				// eccentricity
					var label = document.createElement("label")
						label.className = "star-eccentricity-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "eccentricity"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-eccentricity"
						input.min = 0
						input.max = 1 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "eccentricity"
						input.value = star.eccentricity
						input.addEventListener(TRIGGERS.input, changeStarEccentricity)
					label.appendChild(input)
					star.elements.eccentricity = input

					var span = document.createElement("span")
						span.innerText = " /1"
					label.appendChild(span)

				// apoapsis
					var label = document.createElement("label")
						label.className = "star-aphelion-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "aphelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-apoapsis"
						input.min = 0
						input.step = 0.01
						input.placeholder = "apoapsis"
						input.value = star.apoapsis
						input.addEventListener(TRIGGERS.input, changeStarApoapsisOrPeriapsis)
					label.appendChild(input)
					star.elements.apoapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// periapsis
					var label = document.createElement("label")
						label.className = "star-perihelion-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "perihelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-periapsis"
						input.min = 0
						input.step = 0.01
						input.placeholder = "periapsis"
						input.value = star.periapsis
						input.addEventListener(TRIGGERS.input, changeStarApoapsisOrPeriapsis)
					label.appendChild(input)
					star.elements.periapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// inclination
					var label = document.createElement("label")
						label.className = "star-inclination-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "inclination"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-inclination"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "inclination"
						input.value = roundNumber(star.inclination * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeStarInclination)
					label.appendChild(input)
					star.elements.inclination = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// longitude of ascending node
					var label = document.createElement("label")
						label.className = "star-longitudeofascendingnode-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "longitude of ascending node"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-longitudeofascendingnode"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(star.longitudeOfAscendingNode * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeStarLongitudeOfAscendingNode)
					label.appendChild(input)
					star.elements.longitudeOfAscendingNode = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// argument of periapsis
					var label = document.createElement("label")
						label.className = "star-argumentofperiapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "argument of perihelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "star-argumentofperiapsis"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(star.argumentOfPeriapsis * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeStarArgumentOfPeriapsis)
					label.appendChild(input)
					star.elements.argumentOfPeriapsis = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// children
					var details = document.createElement("details")
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "satellites"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "star-children"
					details.appendChild(inner)

				// children buttons
					var button = document.createElement("button")
						button.className = "star-addplanet"
						button.innerText = "+ planet"
						button.addEventListener(TRIGGERS.click, addPlanet)
					inner.appendChild(button)
					star.elements.addPlanet = button

					var button = document.createElement("button")
						button.className = "star-clearall"
						button.innerHTML = "&#x2715; all"
						button.addEventListener(TRIGGERS.click, clearPlanets)
					inner.appendChild(button)
					star.elements.clearAll = button

				// children list
					var list = document.createElement("div")
					inner.appendChild(list)
					star.elements.children = list

				// children
					if (starSeed && starSeed.children) {
						for (let i in starSeed.children) {
							var child = createCelestialBody(starSeed.children[i], star.id)
							star.children[child.id] = child
							star.elements.children.appendChild(child.elements.section)
						}
					}

				// return star
					return star
			} catch (error) {console.log(error)}
		}

	/* randomizeStar */
		function randomizeStar(event, starData) {
			try {
				// get id
					let star = null

					if (starData) {
						star = starData
					}
					else {
						let starId = event.target.closest(".star").id
						star = getCelestialBodyFromId(starId)
					}

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(star.id)

				// visible
					star.elements.visible.checked = star.position.visible = true

				// name
					star.elements.name.value = star.name = chooseRandom(CONSTANTS.random.names)
					star.elements.summary.innerHTML = getNameSymbol(star) + (star.name || "")

				// class
					star.elements.class.value = star.class = "custom"
					star.elements.section.removeAttribute("binary")

				// description
					star.elements.description.value = star.description = ""

				// color
					star.elements.color.value = star.color = generateRandomColor() // #hex

				// mass
					star.elements.massFactor.value = star.massFactor = generateRandom(CONSTANTS.random.star.massFactor[0], CONSTANTS.random.star.massFactor[1] * CONSTANTS.rounding) / CONSTANTS.rounding // kg
					star.elements.massPower.value = star.massPower = generateRandom(CONSTANTS.random.star.massPower[0], CONSTANTS.random.star.massPower[1]) // 10^x

				// habitableZone
					let starMass = star.massFactor * (10 ** star.massPower) // kg
					star.elements.habitableZone.value = star.habitableZone = calculateHabitableZone(starMass, null) // AU

				// radius
					star.elements.radius.value = star.radius = generateRandom(CONSTANTS.random.star.radius[0] * CONSTANTS.rounding, Math.min(CONSTANTS.random.star.radius[1], star.habitableZone) * CONSTANTS.rounding) / CONSTANTS.rounding // AU
				
				// not part of binary?
					if (!sibling) {
						star.elements.semiMajorAxis.value = star.semiMajorAxis = 0 // AU
						star.elements.eccentricity.value = star.eccentricity = 0 // ratio
						star.elements.apoapsis.value = star.apoapsis = 0 // AU
						star.elements.periapsis.value = star.periapsis = 0 // AU
						star.elements.period.value = star.period = 0 // d
						star.elements.day.value = star.day = 0 // d
						star.elements.retrograde.checked = star.retrograde = false
						star.elements.inclination.value = star.inclination = 0 // ° & AU
						star.elements.longitudeOfAscendingNode.value = star.longitudeOfAscendingNode = 0 // ° & AU
						star.elements.argumentOfPeriapsis.value = star.argumentOfPeriapsis = 0 // ° & AU
						star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					}

				// part of binary
					else {
						// semiMajorAxis
							star.elements.semiMajorAxis.value = star.semiMajorAxis = generateRandom(CONSTANTS.random.star.semiMajorAxis[0] * CONSTANTS.rounding, Math.max(CONSTANTS.random.star.semiMajorAxis[1], star.radius + sibling.radius) * CONSTANTS.rounding) / CONSTANTS.rounding // AU

						// eccentricity
							star.elements.eccentricity.value = star.eccentricity = generateRandom(CONSTANTS.random.star.eccentricity[0] * CONSTANTS.rounding, CONSTANTS.random.star.eccentricity[1] * CONSTANTS.rounding) / CONSTANTS.rounding // ratio
							sibling.elements.eccentricity.value = sibling.eccentricity = star.eccentricity // ratio

						// semiMajorAxis & eccentricity --> apoapsis & periapsis
							let [apoapsis, periapsis] = calculateEllipse(star.semiMajorAxis, star.eccentricity, [null, null]) // AU, AU

							// set & save values
								star.elements.apoapsis.value  = star.apoapsis  = apoapsis // AU
								star.elements.periapsis.value = star.periapsis = periapsis // AU

						// update binary system
							updateBinarySystem(star, sibling, parent)

						// period --> day
							star.elements.day.value = star.day = generateRandom(0, Math.floor(star.period)) // d
							sibling.elements.day.value = sibling.day = star.day // d

						// retrograde
							star.elements.retrograde.checked = star.retrograde = chooseRandom([true, false])
							sibling.elements.retrograde.checked = sibling.retrograde = star.retrograde

						// inclination
							let inclination = generateRandom(CONSTANTS.random.star.inclination[0], CONSTANTS.random.star.inclination[1]) // °
							sibling.elements.inclination.value = star.elements.inclination.value = inclination // °
							sibling.inclination = star.inclination = roundNumber(inclination * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

						// longitudeOfAscendingNode
							let longitudeOfAscendingNode = generateRandom(CONSTANTS.random.star.longitudeOfAscendingNode[0], CONSTANTS.random.star.longitudeOfAscendingNode[1]) // °
							sibling.elements.longitudeOfAscendingNode.value = star.elements.longitudeOfAscendingNode.value = longitudeOfAscendingNode // °
							sibling.longitudeOfAscendingNode = star.longitudeOfAscendingNode = roundNumber(longitudeOfAscendingNode * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

						// argumentOfPeriapsis
							let argumentOfPeriapsis = generateRandom(CONSTANTS.random.star.argumentOfPeriapsis[0], CONSTANTS.random.star.argumentOfPeriapsis[1]) // °
							star.elements.argumentOfPeriapsis.value = argumentOfPeriapsis // °
							star.argumentOfPeriapsis = roundNumber(argumentOfPeriapsis * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians
							
							let oppositeAngle = argumentOfPeriapsis + (CONSTANTS.convert.circle_to_degree / 2) % CONSTANTS.convert.circle_to_degree // °
							sibling.elements.argumentOfPeriapsis.value = oppositeAngle // °
							sibling.argumentOfPeriapsis = roundNumber(oppositeAngle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians
							
						// computed
							star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
							sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
					}

				// update children orbits
					updateChildrenOrbits(star)
			} catch (error) {console.log(error)}
		}

	/* changeStarVisible */
		function changeStarVisible(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// get visible
					let visible = star.elements.visible.checked || false

				// save new value
					star.position.visible = visible
			} catch (error) {console.log(error)}
		}

	/* changeStarName */
		function changeStarName(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// get name
					let name = star.elements.name.value

				// save new value
					star.name = name
					star.elements.summary.innerHTML = getNameSymbol(star) + (name || "")
			} catch (error) {console.log(error)}
		}

	/* changeStarClass */
		function changeStarClass(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// star --> binary?
					if (star.elements.class.value == "binary" && star.class !== "binary") {
						changeStarToBinary(star)
						return
					}

				// binary --> star?					
					if (star.class == "binary" && star.elements.class.value !== "binary") {
						let success = changeBinaryToStar(star)
						if (!success) {
							event.target.value = "binary"
							return
						}
					}

				// update class
					// get class
						let starClass = star.class = star.elements.class.value
						if (!CONSTANTS.classes.stars[starClass]) {
							return
						}

					// set & save values
						star.elements.color.value = star.color = CONSTANTS.classes.stars[starClass].color // #hex
						star.elements.massFactor.value = star.massFactor = CONSTANTS.classes.stars[starClass].massFactor // kg
						star.elements.massPower.value = star.massPower = CONSTANTS.classes.stars[starClass].massPower // kg
						star.elements.radius.value = star.radius = CONSTANTS.classes.stars[starClass].radius // kg
						star.elements.habitableZone.value = star.habitableZone = CONSTANTS.classes.stars[starClass].habitableZone // AU
						star.elements.summary.innerHTML = getNameSymbol(star) + (star.name || "")

				// update children orbits
					updateChildrenOrbits(star)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (sibling) {
						updateBinarySystem(star, sibling, parent)
					}
			} catch (error) {console.log(error)}
		}

	/* changeStarDescription */
		function changeStarDescription(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// get description
					let description = star.elements.description.value

				// save new value
					star.description = description
			} catch (error) {console.log(error)}
		}

	/* changeStarColor */
		function changeStarColor(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// get color
					let color = star.elements.color.value // #hex

				// save new value
					star.color = color // #hex

				// custom class
					star.elements.class.value = star.class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changeStarMass */
		function changeStarMass(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// update values
					// get star mass
						let massFactor = Number(star.elements.massFactor.value) // kg
						let massPower = Number(star.elements.massPower.value) // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// get mass
						let mass = massFactor * Math.pow(10, massPower) // kg
						if (mass <= 0) {
							return
						}

					// save new values
						star.massFactor = massFactor // kg
						star.massPower = massPower // 10^x

				// mass --> habitable zone
					// get habitable zone
						let habitableZone = (star.class == "binary") ? 0 : calculateHabitableZone(mass, null) // AU

					// set & save value
						star.elements.habitableZone.value = star.habitableZone = habitableZone // AU

				// custom class
					star.elements.class.value = star.class = "custom"
					star.elements.summary.innerHTML = getNameSymbol(star) + (star.name || "")

				// update children orbits
					updateChildrenOrbits(star)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (sibling) {
						updateBinarySystem(star, sibling, parent)
					}
			} catch (error) {console.log(error)}
		}

	/* changeStarDay */
		function changeStarDay(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.day.value = star.day = 0 // d
						return
					}

				// day
					// get star day
						let day = Number(star.elements.day.value) // d

					// save new values
						star.day = roundNumber(day) // d

					// sibling is the same
						sibling.elements.day.value = sibling.day = star.day // d
			} catch (error) {console.log(error)}
		}

	/* changeStarPeriod */
		function changeStarPeriod(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.period.value = star.period = 0 // d
						return
					}

				// update value
					// get period
						let period = Number(star.elements.period.value) // d

					// errors
						if (!period) {
							return
						}

					// save new value
						star.period = period // d

					// update sibling
						sibling.elements.period.value = sibling.period = star.period // d

				// update day
					if (star.day > star.period) {
						star.elements.day.value = star.day = 0 // d
						sibling.elements.day.value = sibling.day = 0 // d
					}

				// mass & period --> semiMajorAxis
					// masses
						let starMass = star.massFactor * (10 ** star.massPower) // kg
						let siblingMass = sibling.massFactor * (10 ** sibling.massPower) // kg

					// convert to SI
						period = period * CONSTANTS.convert.day_to_hour * CONSTANTS.convert.hour_to_second // s

					// orbit distances
						let [starDistance, siblingDistance, totalDistance] = calculateBarycenterOrbit(starMass, siblingMass, period, null) // m

					// convert from SI
						starDistance = roundNumber(starDistance / CONSTANTS.convert.AU_to_meter) // AU
						siblingDistance = roundNumber(siblingDistance / CONSTANTS.convert.AU_to_meter) // AU

					// set & save values
						star.elements.semiMajorAxis.value = star.semiMajorAxis = starDistance // AU
						sibling.elements.semiMajorAxis.value = sibling.semiMajorAxis = siblingDistance // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = star.eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// get apoapsis & periapsis
						let [starApoapsis, starPeriapsis] = calculateEllipse(star.semiMajorAxis, eccentricity, [null, null]) // AU, AU
						let [siblingApoapsis, siblingPeriapsis] = calculateEllipse(sibling.semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						star.elements.apoapsis.value  = star.apoapsis  = starApoapsis // AU
						star.elements.periapsis.value = star.periapsis = starPeriapsis // AU

						sibling.elements.apoapsis.value  = sibling.apoapsis  = siblingApoapsis // AU
						sibling.elements.periapsis.value = sibling.periapsis = siblingPeriapsis // AU

				// computed values
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeStarSemiMajorAxis */
		function changeStarSemiMajorAxis(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.semiMajorAxis.value = star.semiMajorAxis = 0 // AU
						return
					}

				// update value
					// get semiMajorAxis
						let starSemiMajorAxis = Number(star.elements.semiMajorAxis.value) // AU

					// errors
						if (!starSemiMajorAxis) {
							return
						}

					// save new value
						star.semiMajorAxis = starSemiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = star.eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// semiMajorAxis & eccentricity --> apoapsis & periapsis
						let [starApoapsis, starPeriapsis] = calculateEllipse(starSemiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						star.elements.apoapsis.value  = star.apoapsis  = starApoapsis // AU
						star.elements.periapsis.value = star.periapsis = starPeriapsis // AU

				// sibling orbit
					// get masses
						let starMass = star.massFactor * (10 ** star.massPower) // kg
						let siblingMass = sibling.massFactor * (10 ** sibling.massPower) // 10^x

					// m1d1 = m2d2 --> get semiMajorAxis
						let siblingSemiMajorAxis = starMass / siblingMass * starSemiMajorAxis // AU
						sibling.elements.semiMajorAxis.value = sibling.semiMajorAxis = siblingSemiMajorAxis // AU

					// semiMajorAxis & eccentricity --> apoapsis & periapsis
						let [siblingApoapsis, siblingPeriapsis] = calculateEllipse(siblingSemiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						sibling.elements.apoapsis.value  = sibling.apoapsis  = siblingApoapsis // AU
						sibling.elements.periapsis.value = sibling.periapsis = siblingPeriapsis // AU

				// semiMajorAxis & mass --> period
					// convert to SI
						starSemiMajorAxis = starSemiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						siblingSemiMajorAxis = siblingSemiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						let totalDistance = starSemiMajorAxis + siblingSemiMajorAxis // m

					// get period
						let period = calculateBarycenterOrbit(starMass, siblingMass, null, totalDistance) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						star.elements.period.value = star.period = period // d
						sibling.elements.period.value = sibling.period = period // d

					// update day
						if (star.day > star.period) {
							star.elements.day.value = star.day = 0 // d
							sibling.elements.day.value = sibling.day = 0 // d
						}

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeStarRetrograde */
		function changeStarRetrograde(event) {
			try {
				// retrograde
					// get id
						let starId = event.target.closest(".star").id
						let star = getCelestialBodyFromId(starId)

					// part of a binary?
						let [sibling, parent] = getBinaryFamilyFromId(starId)
						if (!sibling) {
							star.elements.retrograde.checked = star.retrograde = false // d
							return
						}

					// get retrograde
						let retrograde = star.elements.retrograde.checked || false

					// save new value
						star.retrograde = retrograde
						sibling.elements.retrograde.checked = sibling.retrograde = retrograde

				// update day
					// current
						let day = star.day // d
						let period = star.period // d

					// flip
						day = roundNumber((period - day + period) % period) // d

					// set & save value
						star.elements.day.value = star.day = day // d
						sibling.elements.day.value = sibling.day = day // d
			} catch (error) {console.log(error)}
		}

	/* changeStarInclination */
		function changeStarInclination(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.inclination.value = star.inclination = 0 // AU
						return
					}

				// angle
					// get angle
						let angle = Number(star.elements.inclination.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							star.elements.inclination.value = angle // °
						}
						sibling.elements.inclination.value = angle // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						sibling.inclination = star.inclination = angle // radians

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}
	
	/* changeStarEccentricity */
		function changeStarEccentricity(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.eccentricity.value = star.eccentricity = 0 // d
						return
					}

				// update new value
					// get eccentricity
						let eccentricity = Number(star.elements.eccentricity.value) // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// save new value
						star.eccentricity = eccentricity // ratio
						sibling.elements.eccentricity.value = sibling.eccentricity = eccentricity // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get apoapsis & periapsis
						let [starApoapsis, starPeriapsis] = calculateEllipse(star.semiMajorAxis, eccentricity, [null, null]) // AU, AU
						let [siblingApoapsis, siblingPeriapsis] = calculateEllipse(sibling.semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						star.elements.apoapsis.value  = star.apoapsis  = starApoapsis // AU
						star.elements.periapsis.value = star.periapsis = starPeriapsis // AU
						sibling.elements.apoapsis.value  = sibling.apoapsis  = siblingApoapsis // AU
						sibling.elements.periapsis.value = sibling.periapsis = siblingPeriapsis // AU

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeStarApoapsisOrPeriapsis */
		function changeStarApoapsisOrPeriapsis(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.apoapsis.value = star.apoapsis = 0 // d
						star.elements.periapsis.value = star.periapsis = 0 // d
						return
					}

				// update new values
					// get apoapsis & periapsis
						let starApoapsis  = Number(star.elements.apoapsis.value) // AU
						let starPeriapsis = Number(star.elements.periapsis.value) // AU

					// errors
						if (!starApoapsis || !starPeriapsis) {
							return
						}

					// save new values
						star.apoapsis  = starApoapsis // AU
						star.periapsis = starPeriapsis // AU

				// apoapsis & periapsis --> semiMajorAxis
					// get semiMajorAxis
						let starSemiMajorAxis = calculateEllipse(null, null, [starApoapsis, starPeriapsis]) // AU

					// set & save value
						star.elements.semiMajorAxis.value = star.semiMajorAxis = starSemiMajorAxis // AU

				// semiMajorAxis & apoapsis & periapsis --> eccentricity
					// calculate eccentricity
						let eccentricity = calculateEllipse(starSemiMajorAxis, null, [starApoapsis, starPeriapsis]) // ratio

					// set & save value
						star.elements.eccentricity.value = star.eccentricity = eccentricity // ratio
						sibling.elements.eccentricity.value = sibling.eccentricity = eccentricity // ratio
				
				// sibling orbit
					// get masses
						let starMass = star.massFactor * (10 ** star.massPower) // kg
						let siblingMass = sibling.massFactor * (10 ** sibling.massPower) // 10^x

					// m1d1 = m2d2 --> get semiMajorAxis
						let siblingSemiMajorAxis = starMass / siblingMass * starSemiMajorAxis // AU
						sibling.elements.semiMajorAxis.value = sibling.semiMajorAxis = siblingSemiMajorAxis // AU

					// semiMajorAxis & eccentricity --> apoapsis & periapsis
						let [siblingApoapsis, siblingPeriapsis] = calculateEllipse(siblingSemiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						sibling.elements.apoapsis.value  = sibling.apoapsis  = siblingApoapsis // AU
						sibling.elements.periapsis.value = sibling.periapsis = siblingPeriapsis // AU

				// semiMajorAxis & mass --> period
					// convert to SI
						starSemiMajorAxis = starSemiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						siblingSemiMajorAxis = siblingSemiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						let totalDistance = starSemiMajorAxis + siblingSemiMajorAxis // m

					// get period
						let period = calculateBarycenterOrbit(starMass, siblingMass, null, totalDistance) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						star.elements.period.value = star.period = period // d
						sibling.elements.period.value = sibling.period = period // d

					// update day
						if (star.day > star.period) {
							star.elements.day.value = star.day = 0 // d
							sibling.elements.day.value = sibling.day = 0 // d
						}

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeStarLongitudeOfAscendingNode */
		function changeStarLongitudeOfAscendingNode(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.longitudeOfAscendingNode.value = star.longitudeOfAscendingNode = 0 // ° | radians
						return
					}

				// angle
					// get angle
						let angle = Number(star.elements.longitudeOfAscendingNode.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							star.elements.longitudeOfAscendingNode.value = angle // °
						}
						sibling.elements.longitudeOfAscendingNode.value = angle // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						sibling.longitudeOfAscendingNode = star.longitudeOfAscendingNode = angle // radians

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeStarArgumentOfPeriapsis */
		function changeStarArgumentOfPeriapsis(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (!sibling) {
						star.elements.argumentOfPeriapsis.value = star.argumentOfPeriapsis = 0 // ° | radians
						return
					}

				// angle
					// get angle
						let angle = Number(star.elements.argumentOfPeriapsis.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							star.elements.argumentOfPeriapsis.value = angle // °
						}

					// opposite
						let oppositeAngle = angle + (CONSTANTS.convert.circle_to_degree / 2) % CONSTANTS.convert.circle_to_degree // °
						sibling.elements.argumentOfPeriapsis.value = oppositeAngle // °

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians
						oppositeAngle = roundNumber(oppositeAngle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						star.argumentOfPeriapsis = angle // radians
						sibling.argumentOfPeriapsis = oppositeAngle // radians

				// computed
					star.computed = calculateComputedValues(star.semiMajorAxis, star.eccentricity, star.longitudeOfAscendingNode, star.argumentOfPeriapsis, star.inclination)
					sibling.computed = calculateComputedValues(sibling.semiMajorAxis, sibling.eccentricity, sibling.longitudeOfAscendingNode, sibling.argumentOfPeriapsis, sibling.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeStarRadius */
		function changeStarRadius(event) {
			try {
				// get id
					let starId = event.target.closest(".star").id
					let star = getCelestialBodyFromId(starId)

				// update values
					// get star radius
						let radius = Number(star.elements.radius.value) // AU

					// errors
						if (!radius || star.class == "binary") {
							return
						}

					// save new values
						star.radius = radius // AU

				// custom class
					star.elements.class.value = star.class = "custom"
			} catch (error) {console.log(error)}
		}

	/* changeStarHabitableZone */
		function changeStarHabitableZone(event) {
			try {
				// save value
					// get id
						let starId = event.target.closest(".star").id
						let star = getCelestialBodyFromId(starId)

					// get habitableZone
						let habitableZone = Number(star.elements.habitableZone.value) // AU

					// errors
						if (!habitableZone || star.class == "binary") {
							return
						}

					// save new value
						star.habitableZone = habitableZone // AU

				// habitable zone --> mass
					// get mass
						let [massFactor, massPower, mass] = calculateHabitableZone(null, habitableZone) // kg, 10^x, kg

					// set & save values
						star.elements.massFactor.value = star.massFactor = massFactor // kg
						star.elements.massPower.value = star.massPower = massPower // kg

				// custom class
					star.elements.class.value = star.class = "custom"

				// update children
					updateChildrenOrbits(star)

				// part of a binary?
					let [sibling, parent] = getBinaryFamilyFromId(starId)
					if (sibling) {
						updateBinarySystem(star, sibling, parent)
					}
			} catch (error) {console.log(error)}
		}

	/* changeStarToBinary */
		function changeStarToBinary(parentStar, override) {
			try {
				// cancel
					if (!override && !window.confirm("This will create " + parentStar.name + " A and " + parentStar.name + " B. Proceed?")) {
						parentStar.elements.class.value = parentStar.class
						return
					}

				// what to do with satellites
					let starASatellites = override ? false : window.confirm("Copy satellites to " + parentStar.name + " A?")
					let starBSatellites = override ? false : window.confirm("Copy satellites to " + parentStar.name + " B?")
					let barycenterSatellites = override ? false : window.confirm("Also keep satellites orbiting A/B barycenter?")

				// create substars
					// first substar
						let firstSeed = duplicateObject(parentStar)
						for (let i in firstSeed) {
							if (CONSTANTS.ignoreKeys.includes(i) && !(starASatellites && i == "children")) {
								delete firstSeed[i]
							}
						}
						let starA = createStar(firstSeed, parentStar.id)
							starA.name += " A"
							starA.elements.name.value = starA.name
							starA.elements.summary.innerHTML = getNameSymbol(starA) + (starA.name || "")

					// second substar
						let secondSeed = duplicateObject(parentStar)
						for (let i in secondSeed) {
							if (CONSTANTS.ignoreKeys.includes(i) && !(starBSatellites && i == "children")) {
								delete secondSeed[i]
							}
						}
						let starB = createStar(secondSeed, parentStar.id)
							starB.name += " B"
							starB.elements.name.value = starB.name
							starB.elements.summary.innerHTML = getNameSymbol(starB) + (starB.name || "")

					// add to parent / elements
						parentStar.children[starA.id] = starA
						parentStar.children[starB.id] = starB
						parentStar.elements.children.prepend(starB.elements.section)
						parentStar.elements.children.prepend(starA.elements.section)

					// planets
						if (!barycenterSatellites) {
							for (let i in parentStar.children) {
								if (i == starA.id || i == starB.id) {
									continue
								}
								parentStar.children[i].elements.section.remove()
								delete parentStar.children[i]
							}
						}

				// substar values
					// get masses
						let starAmass = starA.massFactor * (10 ** starA.massPower) // kg
						let starBmass = starB.massFactor * (10 ** starB.massPower) // kg

					// get starting period
						let period = CONSTANTS.limit.initialBarycenterPeriod // d
						let periodSeconds = period * CONSTANTS.convert.day_to_hour * CONSTANTS.convert.hour_to_second // s
						let [starAdistance, starBdistance, totalDistance] = calculateBarycenterOrbit(starAmass, starBmass, periodSeconds, null) // m
							starAdistance = roundNumber(starAdistance / CONSTANTS.convert.AU_to_meter) // AU
							starBdistance = roundNumber(starBdistance / CONSTANTS.convert.AU_to_meter) // AU

					// starA
						starA.elements.period.value = starA.period = period // d
						starA.elements.day.value = starA.day = 0 // d
						starA.elements.retrograde.checked = starA.retrograde = false
						starA.elements.semiMajorAxis.value = starA.semiMajorAxis = starAdistance // AU
						starA.elements.eccentricity.value = starA.eccentricity = 0 // ratio
						starA.elements.apoapsis.value = starA.apoapsis = starAdistance // AU
						starA.elements.periapsis.value = starA.periapsis = starAdistance // AU
						starA.elements.inclination.value = starA.inclination = 0 // ° | radians
						starA.elements.longitudeOfAscendingNode.value = starA.longitudeOfAscendingNode = 0 // ° | radians
						starA.argumentOfPeriapsis = roundNumber(CONSTANTS.convert.circle_to_radian / 2) // radians
						starA.elements.argumentOfPeriapsis.value = (CONSTANTS.convert.circle_to_degree / 2) // °
						starA.computed = calculateComputedValues(starA.semiMajorAxis, starA.eccentricity, starA.longitudeOfAscendingNode, starA.argumentOfPeriapsis, starA.inclination)

					// starB
						starB.elements.period.value = starB.period = period // d
						starB.elements.day.value = starB.day = 0 // d
						starB.elements.retrograde.checked = starB.retrograde = false
						starB.elements.semiMajorAxis.value = starB.semiMajorAxis = starBdistance // AU
						starB.elements.eccentricity.value = starB.eccentricity = 0 // ratio
						starB.elements.apoapsis.value = starB.apoapsis = starBdistance // AU
						starB.elements.periapsis.value = starB.periapsis = starBdistance // AU
						starB.elements.inclination.value = starB.inclination = 0 // ° | radians
						starB.elements.longitudeOfAscendingNode.value = starB.longitudeOfAscendingNode = 0 // ° | radians
						starB.elements.argumentOfPeriapsis.value = starB.argumentOfPeriapsis = 0 // ° | radians
						starB.computed = calculateComputedValues(starB.semiMajorAxis, starB.eccentricity, starB.longitudeOfAscendingNode, starB.argumentOfPeriapsis, starB.inclination)

				// transform parent into binary
					// adjust listing
						parentStar.elements.class.value = parentStar.class = "binary"
						parentStar.elements.color.value = parentStar.color = CONSTANTS.canvas.barycenterColor
						parentStar.elements.name.value = parentStar.name = ""
						parentStar.elements.summary.innerHTML = getNameSymbol(parentStar) + (parentStar.name || "")
						parentStar.elements.section.setAttribute("binary", true)
						parentStar.elements.massFactor.setAttribute("readonly", true)
						parentStar.elements.massPower.setAttribute("readonly", true)
						parentStar.elements.radius.value = parentStar.radius = 0 // AU
						parentStar.elements.habitableZone.value = parentStar.habitableZone = 0 // AU

					// barycenter mass
						let [totalMassFactor, totalMassPower, totalMass] = calculateBarycenterMass(starAmass, starBmass) // kg
						parentStar.elements.massFactor.value = parentStar.massFactor = totalMassFactor // kg
						parentStar.elements.massPower.value = parentStar.massPower = totalMassPower // 10^x

					// track
						if (STATE.controls.tracking) {
							let trackingCelestialBody = getCelestialBodyFromId(STATE.controls.tracking)
							if (trackingCelestialBody) {
								trackingCelestialBody.position.tracking = false
							}
						}
						STATE.controls.tracking = parentStar.id
						parentStar.position.tracking = true
						parentStar.elements.tracking.checked = true

					// this binary is itself part of a binary?
						let [uncleStar, grandparentStar] = getBinaryFamilyFromId(parentStar.id)
						if (uncleStar) {
							updateBinarySystem(parentStar, uncleStar, grandparentStar)
						}

					// success
						return true
			} catch (error) {console.log(error)}
		}

	/* changeBinaryToStar */
		function changeBinaryToStar(parentBinary) {
			try {
				// consolidate children
					// identify substars
						let childKeys = Object.keys(parentBinary.children).filter(function(id) {
							return parentBinary.children[id].type == "star"
						})
						let starA = parentBinary.children[childKeys[0]]
						let starB = parentBinary.children[childKeys[1]]

					// if either star is itself a binary, stop
						if (starA.class == "binary" || starB.class == "binary") {
							return false
						}

					// combine names
						let newName = starA.name + " - " + starB.name

					// move all of the substars' children up
						let starAidFragment = starA.id.split("-")
							starAidFragment = "-" + starAidFragment.slice(starAidFragment.length - 2).join("-")
						for (let i in starA.children) {
							let child = reduceAncestry(starA.children[i], starAidFragment)
							parentBinary.children[child.id] = child
							parentBinary.elements.children.appendChild(child.elements.section)
						}

						let starBidFragment = starB.id.split("-")
							starBidFragment = "-" + starBidFragment.slice(starBidFragment.length - 2).join("-")
						for (let i in starB.children) {
							let child = reduceAncestry(starB.children[i], starBidFragment)
							parentBinary.children[child.id] = child
							parentBinary.elements.children.appendChild(child.elements.section)
						}

					// destroy substars
						starA.elements.section.remove()
						delete parentBinary.children[starA.id]
						starB.elements.section.remove()
						delete parentBinary.children[starB.id]

				// make parent not a binary
					// adjust listing
						parentBinary.elements.name.value = parentBinary.name = newName
						parentBinary.elements.summary.innerHTML = getNameSymbol(parentBinary) + (parentBinary.name || "")
						parentBinary.elements.section.removeAttribute("binary", true)
						parentBinary.elements.massFactor.removeAttribute("readonly")
						parentBinary.elements.massPower.removeAttribute("readonly")

					// track
						if (STATE.controls.tracking) {
							let trackingCelestialBody = getCelestialBodyFromId(STATE.controls.tracking)
							if (trackingCelestialBody) {
								trackingCelestialBody.position.tracking = false
							}
						}
						STATE.controls.tracking = parentBinary.id
						parentBinary.position.tracking = true
						parentBinary.elements.tracking.checked = true

					// success
						return true
			} catch (error) {console.log(error)}
		}

/*** inputs - planet ***/
	/* addPlanet */
		function addPlanet(event) {
			try {
				// get parent
					let parentId = event.target.closest(".star").id
					let parent = getCelestialBodyFromId(parentId)

				// createPlanet
					let planet = createPlanet(null, parentId)
					parent.children[planet.id] = planet
					parent.elements.children.appendChild(planet.elements.section)

				// jump
					planet.elements.section.setAttribute("open", true)
					planet.elements.name.focus()
			} catch (error) {console.log(error)}
		}

	/* clearPlanets */
		function clearPlanets(event) {
			try {
				// get parent
					let parentId = event.target.closest(".star").id
					let parent = getCelestialBodyFromId(parentId)

				// remove all planets from HTML & object
					for (let i in parent.children) {
						if (parent.children[i].type == "planet") {
							parent.children[i].elements.section.remove()
							delete parent.children[i]
						}
					}
			} catch (error) {console.log(error)}
		}

	/* createPlanet */
		function createPlanet(planetSeed, parentId) {
			try {
				// values
					let planet = duplicateObject(CONSTANTS.planet)
					for (let i in planetSeed) {
						if (!CONSTANTS.ignoreKeys.includes(i)) {
							planet[i] = planetSeed[i]
						}
					}

				// id
					planet.id = (parentId || "") + "-planet-" + generateRandom()

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)

				// tracking / visible
					if (planetSeed && planetSeed.position && planetSeed.position.tracking) {
						planet.position.tracking = planetSeed.position.tracking
						STATE.controls.tracking = planet.id
					}
					if (planetSeed && planetSeed.position && planetSeed.position.visible !== undefined) {
						planet.position.visible = planetSeed.position.visible
					}

				// form
					var section = document.createElement("details")
						section.id = planet.id
						section.className = "planet"
					planet.elements.section = section

					var summary = document.createElement("summary")
					section.appendChild(summary)

					var header = document.createElement("h3")
						header.innerHTML = getNameSymbol(planet) + (planet.name || "")
					summary.appendChild(header)
					planet.elements.summary = header

				// track
					var label = document.createElement("label")
						label.className = "planet-tracking-label"
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "radio"
						input.name = "tracking"
						input.value = planet.id
						input.checked = planet.position.tracking
						input.addEventListener(TRIGGERS.input, changeTracking)
					label.appendChild(input)
					planet.elements.tracking = input

					var span = document.createElement("span")
						span.innerText = "track"
					label.appendChild(span)

				// visible
					var label = document.createElement("label")
						label.className = "planet-visible-label"
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = planet.position.visible
						input.addEventListener(TRIGGERS.input, changePlanetVisible)
					label.appendChild(input)
					planet.elements.visible = input

					var span = document.createElement("span")
						span.innerText = "show"
					label.appendChild(span)

				// randomize
					var button = document.createElement("button")
						button.className = "planet-randomize"
						button.innerHTML = "&olarr; randomize"
						button.addEventListener(TRIGGERS.click, randomizePlanet)
					section.appendChild(button)
					planet.elements.randomize = button

				// name
					var label = document.createElement("label")
						label.className = "planet-name-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "name"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "text"
						input.className = "planet-name"
						input.placeholder = "name"
						input.value = planet.name
						input.addEventListener(TRIGGERS.input, changePlanetName)
					label.appendChild(input)
					planet.elements.name = input

					var button = document.createElement("button")
						button.className = "planet-remove"
						button.innerHTML = "&#x2715;"
						button.addEventListener(TRIGGERS.click, removePlanet)
					section.appendChild(button)
					planet.elements.remove = button

				// class
					var label = document.createElement("label")
						label.className = "planet-class-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "class"
					label.appendChild(heading)

					var select = document.createElement("select")
						select.className = "planet-class"
						
						var option = document.createElement("option")
							option.value = option.innerText = "custom"
						select.appendChild(option)

						for (let i in CONSTANTS.classes.planets) {
							var option = document.createElement("option")
								option.value = i
								option.innerText = CONSTANTS.classes.planets[i].name
							select.appendChild(option)
						}

						select.value = planet.class || "custom"
						select.addEventListener(TRIGGERS.input, changePlanetClass)
					label.appendChild(select)
					planet.elements.class = select

				// description
					var label = document.createElement("label")
						label.className = "planet-description-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "description"
					label.appendChild(heading)

					var textarea = document.createElement("textarea")
						textarea.className = "planet-description"
						textarea.placeholder = "description"
						textarea.value = planet.description
						textarea.addEventListener(TRIGGERS.input, changePlanetDescription)
					label.appendChild(textarea)
					planet.elements.description = textarea

				// color
					var label = document.createElement("label")
						label.className = "planet-color-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "color"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "color"
						input.className = "planet-color"
						input.value = planet.color
						input.addEventListener(TRIGGERS.input, changePlanetColor)
					label.appendChild(input)
					planet.elements.color = input

				// mass
					var label = document.createElement("label")
						label.className = "planet-mass-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "mass"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-mass-factor"
						input.min = 1
						input.max = 10 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "n"
						input.value = planet.massFactor
						input.addEventListener(TRIGGERS.input, changePlanetMass)
					label.appendChild(input)
					planet.elements.massFactor = input

					var span = document.createElement("span")
						span.innerText = "x10^"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-mass-power"
						input.min = 0
						input.step = 1
						input.placeholder = "exponent"
						input.value = planet.massPower
						input.addEventListener(TRIGGERS.input, changePlanetMass)
					label.appendChild(input)
					planet.elements.massPower = input

					var span = document.createElement("span")
						span.innerText = "kg"
					label.appendChild(span)

				// orbit
					var label = document.createElement("label")
						label.className = "planet-orbit-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "orbit"
					label.appendChild(heading)

					var span = document.createElement("span")
						span.innerText = "day"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-day"
						input.min = 0
						input.step = 1
						input.placeholder = "day"
						input.value = planet.day
						input.addEventListener(TRIGGERS.input, changePlanetDay)
					label.appendChild(input)
					planet.elements.day = input

					var span = document.createElement("span")
						span.innerText = "/"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-period"
						input.min = 0
						input.step = 1
						input.placeholder = "period"
						input.value = planet.period
						input.addEventListener(TRIGGERS.input, changePlanetPeriod)
					label.appendChild(input)
					planet.elements.period = input

				// distance
					var label = document.createElement("label")
						label.className = "planet-distance-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "distance"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-semimajoraxis"
						input.min = 0
						input.placeholder = "distance"
						input.value = planet.semiMajorAxis
						input.addEventListener(TRIGGERS.input, changePlanetSemiMajorAxis)
					label.appendChild(input)
					planet.elements.semiMajorAxis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// advanced
					var details = document.createElement("details")
						details.className = "planet-advanced-outer"
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "advanced"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "planet-advanced"
					details.appendChild(inner)

				// retrograde
					var label = document.createElement("label")
						label.className = "planet-retrograde-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "retrograde"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = planet.retrograde
						input.addEventListener(TRIGGERS.input, changePlanetRetrograde)
					label.appendChild(input)
					planet.elements.retrograde = input

				// eccentricity
					var label = document.createElement("label")
						label.className = "planet-eccentricity-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "eccentricity"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-eccentricity"
						input.min = 0
						input.max = 1 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "eccentricity"
						input.value = planet.eccentricity
						input.addEventListener(TRIGGERS.input, changePlanetEccentricity)
					label.appendChild(input)
					planet.elements.eccentricity = input

					var span = document.createElement("span")
						span.innerText = " /1"
					label.appendChild(span)

				// apoapsis
					var label = document.createElement("label")
						label.className = "planet-apoapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "aphelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-apoapsis"
						input.min = 0
						input.step = 0.01
						input.placeholder = "apoapsis"
						input.value = planet.apoapsis
						input.addEventListener(TRIGGERS.input, changePlanetApoapsisOrPeriapsis)
					label.appendChild(input)
					planet.elements.apoapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// periapsis
					var label = document.createElement("label")
						label.className = "planet-periapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "perihelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-periapsis"
						input.min = 0
						input.step = 0.01
						input.placeholder = "periapsis"
						input.value = planet.periapsis
						input.addEventListener(TRIGGERS.input, changePlanetApoapsisOrPeriapsis)
					label.appendChild(input)
					planet.elements.periapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// inclination
					var label = document.createElement("label")
						label.className = "planet-inclination-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "inclination"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-inclination"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "inclination"
						input.value = roundNumber(planet.inclination * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changePlanetInclination)
					label.appendChild(input)
					planet.elements.inclination = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// longitude of ascending node
					var label = document.createElement("label")
						label.className = "planet-longitudeofascendingnode-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "longitude of ascending node"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-longitudeofascendingnode"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(planet.longitudeOfAscendingNode * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changePlanetLongitudeOfAscendingNode)
					label.appendChild(input)
					planet.elements.longitudeOfAscendingNode = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// argument of periapsis
					var label = document.createElement("label")
						label.className = "planet-argumentofperiapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "argument of perihelion"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "planet-argumentofperiapsis"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(planet.argumentOfPeriapsis * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changePlanetArgumentOfPeriapsis)
					label.appendChild(input)
					planet.elements.argumentOfPeriapsis = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// moons
					var details = document.createElement("details")
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "satellites"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "planet-children"
					details.appendChild(inner)

				// moon buttons
					var button = document.createElement("button")
						button.className = "planet-addmoon"
						button.innerText = "+ moon"
						button.addEventListener(TRIGGERS.click, addMoon)
					inner.appendChild(button)
					planet.elements.addMoon = button

					var button = document.createElement("button")
						button.className = "planet-clearall"
						button.innerHTML = "&#x2715; all"
						button.addEventListener(TRIGGERS.click, clearMoons)
					inner.appendChild(button)
					planet.elements.clearMoons = button

				// children list
					var list = document.createElement("div")
					inner.appendChild(list)
					planet.elements.children = list

				// moons
					if (planetSeed && planetSeed.children) {
						for (let i in planetSeed.children) {
							var moon = createMoon(planetSeed.children[i], planet.id)
							planet.children[moon.id] = moon
							planet.elements.children.appendChild(moon.elements.section)
						}
					}

				// return planet
					return planet
			} catch (error) {console.log(error)}
		}

	/* removePlanet */
		function removePlanet(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

					let parentId = event.target.closest(".star").id
					let parent = getCelestialBodyFromId(parentId)

				// remove elements
					planet.elements.section.remove()

				// remove from state
					delete parent.children[planetId]
			} catch (error) {console.log(error)}
		}

	/* randomizePlanet */
		function randomizePlanet(event, planetData, starData) {
			try {
				// get id
					let planet = null
					let parent = null

					if (planetData && starData) {
						planet = planetData
						parent = starData
					}
					else {
						let planetId = event.target.closest(".planet").id
						planet = getCelestialBodyFromId(planetId)

						let parentElement = event.target.closest(".star")
						let parentId = parentElement ? parentElement.id : null
						parent = getCelestialBodyFromId(parentId) || null
					}

				// visible
					planet.elements.visible.checked = planet.position.visible = true

				// name
					planet.elements.name.value = planet.name = chooseRandom(CONSTANTS.random.names)

				// class
					planet.elements.class.value = planet.class = "custom"

				// description
					planet.elements.description.value = planet.description = ""

				// color
					planet.elements.color.value = planet.color = generateRandomColor() // #hex

				// mass
					let parentMass = parent.massFactor * (10 ** parent.massPower) // kg
					let attempts = CONSTANTS.random.attempts
					do {
						planet.elements.massFactor.value = planet.massFactor = generateRandom(CONSTANTS.random.planet.massFactor[0], CONSTANTS.random.planet.massFactor[1] * CONSTANTS.rounding) / CONSTANTS.rounding // kg
						planet.elements.massPower.value = planet.massPower = generateRandom(CONSTANTS.random.planet.massPower[0], CONSTANTS.random.planet.massPower[1]) // 10^x
						attempts--
					} while (attempts && planet.massFactor * (10 ** planet.massPower) > parentMass)

				// name symbol
					planet.elements.summary.innerHTML = getNameSymbol(planet) + (planet.name || "")

				// semiMajorAxis
					planet.elements.semiMajorAxis.value = planet.semiMajorAxis = generateRandom(CONSTANTS.random.planet.semiMajorAxis[0] * CONSTANTS.rounding, CONSTANTS.random.planet.semiMajorAxis[1] * CONSTANTS.rounding) / CONSTANTS.rounding // AU

				// eccentricity
					planet.elements.eccentricity.value = planet.eccentricity = generateRandom(CONSTANTS.random.planet.eccentricity[0] * CONSTANTS.rounding, CONSTANTS.random.planet.eccentricity[1] * CONSTANTS.rounding) / CONSTANTS.rounding // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// ellipse
						let [apoapsis, periapsis] = calculateEllipse(planet.semiMajorAxis, planet.eccentricity, [null, null]) // AU, AU

					// set & save values
						planet.elements.apoapsis.value  = planet.apoapsis  = apoapsis // AU
						planet.elements.periapsis.value = planet.periapsis = periapsis // AU

				// semiMajorAxis & mass --> period
					// get period
						let semiMajorAxis = planet.semiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						let period = calculateOrbit(parentMass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						planet.elements.period.value = planet.period = period // d

				// period --> day
					planet.elements.day.value = planet.day = generateRandom(0, Math.floor(planet.period)) // d

				// retrograde
					planet.elements.retrograde.checked = planet.retrograde = chooseRandom([true, false])

				// inclination
					let inclination = generateRandom(CONSTANTS.random.planet.inclination[0], CONSTANTS.random.planet.inclination[1]) // °
					planet.elements.inclination.value = inclination // °
					planet.inclination = roundNumber(inclination * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

				// longitudeOfAscendingNode
					let longitudeOfAscendingNode = generateRandom(CONSTANTS.random.planet.longitudeOfAscendingNode[0], CONSTANTS.random.planet.longitudeOfAscendingNode[1]) // °
					planet.elements.longitudeOfAscendingNode.value = longitudeOfAscendingNode // °
					planet.longitudeOfAscendingNode = roundNumber(longitudeOfAscendingNode * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

				// argumentOfPeriapsis
					let argumentOfPeriapsis = generateRandom(CONSTANTS.random.planet.argumentOfPeriapsis[0], CONSTANTS.random.planet.argumentOfPeriapsis[1]) // °
					planet.elements.argumentOfPeriapsis.value = argumentOfPeriapsis // °
					planet.argumentOfPeriapsis = roundNumber(argumentOfPeriapsis * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)

				// update children orbits
					updateChildrenOrbits(planet)
			} catch (error) {console.log(error)}
		}

	/* changePlanetVisible */
		function changePlanetVisible(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// get visible
					let visible = planet.elements.visible.checked || false

				// save new value
					planet.position.visible = visible
			} catch (error) {console.log(error)}
		}

	/* changePlanetName */
		function changePlanetName(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// get name
					let name = planet.elements.name.value

				// save new value
					planet.name = name
					planet.elements.summary.innerHTML = getNameSymbol(planet) + (name || "")
			} catch (error) {console.log(error)}
		}

	/* changePlanetClass */
		function changePlanetClass(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// update class
					// get class
						let planetClass = planet.class = planet.elements.class.value
						if (!CONSTANTS.classes.planets[planetClass]) {
							return
						}

					// get orbitalFraction
						let day = planet.day // d
						let period = planet.period // d
						let orbitalFraction = (day / period) || 0 // ratio
						let retrograde = planet.retrograde

					// set & save values
						planet.elements.color.value = planet.color = CONSTANTS.classes.planets[planetClass].color // #hex
						planet.elements.massFactor.value = planet.massFactor = CONSTANTS.classes.planets[planetClass].massFactor // kg
						planet.elements.massPower.value = planet.massPower = CONSTANTS.classes.planets[planetClass].massPower // kg
						planet.elements.semiMajorAxis.value = planet.semiMajorAxis = CONSTANTS.classes.planets[planetClass].semiMajorAxis // AU
						planet.elements.retrograde.checked = planet.retrograde = CONSTANTS.classes.planets[planetClass].retrograde
						planet.elements.eccentricity.value = planet.eccentricity = CONSTANTS.classes.planets[planetClass].eccentricity // ratio
						planet.elements.apoapsis.value = planet.apoapsis = CONSTANTS.classes.planets[planetClass].apoapsis // AU
						planet.elements.periapsis.value = planet.periapsis = CONSTANTS.classes.planets[planetClass].periapsis // AU
						planet.elements.summary.innerHTML = getNameSymbol(planet) + (planet.name || "")

					// computed
						planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)

				// update period
					// get parent
						let parentId = event.target.closest(".star").id
						let parent = getCelestialBodyFromId(parentId)

					// get parent mass
						let parentMass = parent.massFactor * (10 ** parent.massPower) // kg

					// convert to SI
						let semiMajorAxis = planet.semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						period = calculateOrbit(parentMass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save period
						planet.elements.period.value = planet.period = period // d

				// update day
					// get equivalent day in new period
						day = roundNumber(orbitalFraction * period) // d

					// flip
						if (retrograde != planet.retrograde) {
							day = roundNumber((period - day + period) % period) // d
						}

					// set & save values
						planet.elements.day.value = planet.day = day // d

				// update children orbits
					updateChildrenOrbits(planet)
			} catch (error) {console.log(error)}
		}

	/* changePlanetDescription */
		function changePlanetDescription(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// get description
					let description = planet.elements.description.value

				// save new value
					planet.description = description
			} catch (error) {console.log(error)}
		}

	/* changePlanetColor */
		function changePlanetColor(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// get color
					let color = planet.elements.color.value // #hex

				// save new value
					planet.color = color // #hex
			} catch (error) {console.log(error)}
		}

	/* changePlanetMass */
		function changePlanetMass(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

					let parentElement = event.target.closest(".star")
					let parentId = parentElement ? parentElement.id : null
					let parent = getCelestialBodyFromId(parentId) || null

				// mass
					// get planet mass
						let massFactor = Number(planet.elements.massFactor.value) // kg
						let massPower = Number(planet.elements.massPower.value) // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// get mass
						let mass = massFactor * (10 ** massPower) // kg
						if (mass <= 0) {
							return
						}

					// get parent mass
						if (parent) {
							let parentMass = parent.massFactor * (10 ** parent.massPower) // kg
							if (parentMass < mass) {
								return
							}
						}

					// save new values
						planet.massFactor = massFactor // kg
						planet.massPower = massPower // 10^x

				// custom class
					planet.elements.class.value = planet.class = "custom"
					planet.elements.summary.innerHTML = getNameSymbol(planet) + (planet.name || "")

				// update children orbits
					updateChildrenOrbits(planet)
			} catch (error) {console.log(error)}
		}

	/* changePlanetDay */
		function changePlanetDay(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// day
					// get planet day
						let day = Number(planet.elements.day.value) // d

					// save new values
						planet.day = roundNumber(day) // d
			} catch (error) {console.log(error)}
		}

	/* changePlanetPeriod */
		function changePlanetPeriod(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// update value
					// get period
						let period = Number(planet.elements.period.value) // d

					// errors
						if (!period) {
							return
						}

					// save new value
						planet.period = period // d

				// update day
					if (planet.day > planet.period) {
						planet.elements.day.value = planet.day = 0 // d
					}

				// mass & period --> semiMajorAxis
					// get parent
						let parentId = event.target.closest(".star").id
						let parent = getCelestialBodyFromId(parentId)

					// get star mass
						let massFactor = parent.massFactor // kg
						let massPower = parent.massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						period = period * CONSTANTS.convert.day_to_hour * CONSTANTS.convert.hour_to_second // s

					// get semiMajorAxis
						let semiMajorAxis = calculateOrbit(mass, period, null) // m

					// convert from SI
						semiMajorAxis = semiMajorAxis / CONSTANTS.convert.AU_to_meter // AU

					// set & save value
						planet.elements.semiMajorAxis.value = planet.semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = planet.eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity || !semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						planet.elements.apoapsis.value   = planet.apoapsis   = apoapsis // AU
						planet.elements.periapsis.value = planet.periapsis = periapsis // AU

				// computed values
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

	/* changePlanetSemiMajorAxis */
		function changePlanetSemiMajorAxis(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// update value
					// get semiMajorAxis
						let semiMajorAxis = Number(planet.elements.semiMajorAxis.value) // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// save new value
						planet.semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = planet.eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						planet.elements.apoapsis.value   = planet.apoapsis   = apoapsis // AU
						planet.elements.periapsis.value = planet.periapsis = periapsis // AU

				// semiMajorAxis & mass --> period
					// get parent
						let parentId = event.target.closest(".star").id
						let parent = getCelestialBodyFromId(parentId)

					// get star mass
						let massFactor = parent.massFactor // kg
						let massPower = parent.massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						planet.elements.period.value = planet.period = period // d

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

	/* changePlanetRetrograde */
		function changePlanetRetrograde(event) {
			try {
				// retrograde
					// get id
						let planetId = event.target.closest(".planet").id
						let planet = getCelestialBodyFromId(planetId)

					// get retrograde
						let retrograde = planet.elements.retrograde.checked || false

					// save new value
						planet.retrograde = retrograde

				// update day
					// current
						let day = planet.day // d
						let period = planet.period // d

					// flip
						day = roundNumber((period - day + period) % period) // d

					// set & save value
						planet.elements.day.value = planet.day = day // d
			} catch (error) {console.log(error)}
		}

	/* changePlanetInclination */
		function changePlanetInclination(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// angle
					// get angle
						let angle = Number(planet.elements.inclination.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							planet.elements.inclination.value = angle // °
						}

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						planet.inclination = angle // radians

					// computed
						planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

	/* changePlanetEccentricity */
		function changePlanetEccentricity(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// update new value
					// get eccentricity
						let eccentricity = Number(planet.elements.eccentricity.value) // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// save new value
						planet.eccentricity = eccentricity // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get semiMajorAxis
						let semiMajorAxis = planet.semiMajorAxis // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						planet.elements.apoapsis.value   = planet.apoapsis   = apoapsis // AU
						planet.elements.periapsis.value = planet.periapsis = periapsis // AU

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

	/* changePlanetApoapsisOrPeriapsis */
		function changePlanetApoapsisOrPeriapsis(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// update new values
					// get apoapsis & periapsis
						let apoapsis   = Number(planet.elements.apoapsis.value) // AU
						let periapsis = Number(planet.elements.periapsis.value) // AU

					// errors
						if (!apoapsis || !periapsis) {
							return
						}

					// save new values
						planet.apoapsis   = apoapsis // AU
						planet.periapsis = periapsis // AU

				// apoapsis & periapsis --> semiMajorAxis
					// get semiMajorAxis
						let semiMajorAxis = calculateEllipse(null, null, [apoapsis, periapsis]) // AU

					// set & save value
						planet.elements.semiMajorAxis.value = planet.semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & apoapsis & periapsis --> eccentricity
					// calculate eccentricity
						let eccentricity = calculateEllipse(semiMajorAxis, null, [apoapsis, periapsis]) // ratio

					// set & save value
						planet.elements.eccentricity.value = planet.eccentricity = eccentricity // ratio

				// semiMajorAxis & mass --> period
					// get parent
						let parentId = event.target.closest(".star").id
						let parent = getCelestialBodyFromId(parentId)

					// get star mass
						let massFactor = parent.massFactor // kg
						let massPower = parent.massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						planet.elements.period.value = planet.period = period // d

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

	/* changePlanetLongitudeOfAscendingNode */
		function changePlanetLongitudeOfAscendingNode(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// angle
					// get angle
						let angle = Number(planet.elements.longitudeOfAscendingNode.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							planet.elements.longitudeOfAscendingNode.value = angle // °
						}

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						planet.longitudeOfAscendingNode = angle // radians

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

	/* changePlanetArgumentOfPeriapsis */
		function changePlanetArgumentOfPeriapsis(event) {
			try {
				// get id
					let planetId = event.target.closest(".planet").id
					let planet = getCelestialBodyFromId(planetId)

				// angle
					// get angle
						let angle = Number(planet.elements.argumentOfPeriapsis.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							planet.elements.argumentOfPeriapsis.value = angle // °
						}

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						planet.argumentOfPeriapsis = angle // radians

				// computed
					planet.computed = calculateComputedValues(planet.semiMajorAxis, planet.eccentricity, planet.longitudeOfAscendingNode, planet.argumentOfPeriapsis, planet.inclination)
			} catch (error) {console.log(error)}
		}

/*** inputs - moon ***/
	/* addMoon */
		function addMoon(event) {
			try {
				// get parent
					let parentId = event.target.closest(".planet").id
					let parent = getCelestialBodyFromId(parentId)

				// createMoon
					let moon = createMoon(null, parentId)
					parent.children[moon.id] = moon
					parent.elements.children.appendChild(moon.elements.section)

				// jump
					moon.elements.section.setAttribute("open", true)
					moon.elements.name.focus()
			} catch (error) {console.log(error)}
		}

	/* clearMoons */
		function clearMoons(event) {
			try {
				// get parent
					let parentId = event.target.closest(".planet").id
					let parent = getCelestialBodyFromId(parentId)

				// remove all moons from HTML & object
					for (let i in parent.children) {
						if (parent.children[i].type == "moon") {
							parent.children[i].elements.section.remove()
							delete parent.children[i]
						}
					}
			} catch (error) {console.log(error)}
		}

	/* createMoon */
		function createMoon(moonSeed, parentId) {
			try {
				// values
					let moon = duplicateObject(CONSTANTS.moon)
					for (let i in moonSeed) {
						if (!CONSTANTS.ignoreKeys.includes(i)) {
							moon[i] = moonSeed[i]
						}
					}

				// id
					moon.id = (parentId || "") + "-moon-" + generateRandom()

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)

				// tracking / visible
					if (moonSeed && moonSeed.position && moonSeed.position.tracking) {
						moon.position.tracking = moonSeed.position.tracking
						STATE.controls.tracking = moon.id
					}
					if (moonSeed && moonSeed.position && moonSeed.position.visible !== undefined) {
						moon.position.visible = moonSeed.position.visible
					}

				// form
					var section = document.createElement("details")
						section.id = moon.id
						section.className = "moon"
					moon.elements.section = section

					var summary = document.createElement("summary")
					section.appendChild(summary)

					var header = document.createElement("h3")
						header.innerHTML = getNameSymbol(moon) + (moon.name || "")
					summary.appendChild(header)
					moon.elements.summary = header

				// track
					var label = document.createElement("label")
						label.className = "moon-tracking-label"
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "radio"
						input.name = "tracking"
						input.value = moon.id
						input.checked = moon.position.tracking
						input.addEventListener(TRIGGERS.input, changeTracking)
					label.appendChild(input)
					moon.elements.tracking = input

					var span = document.createElement("span")
						span.innerText = "track"
					label.appendChild(span)

				// visible
					var label = document.createElement("label")
						label.className = "moon-visible-label"
					summary.appendChild(label)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = moon.position.visible
						input.addEventListener(TRIGGERS.input, changeMoonVisible)
					label.appendChild(input)
					moon.elements.visible = input

					var span = document.createElement("span")
						span.innerText = "show"
					label.appendChild(span)

				// randomize
					var button = document.createElement("button")
						button.className = "moon-randomize"
						button.innerHTML = "&olarr; randomize"
						button.addEventListener(TRIGGERS.click, randomizeMoon)
					section.appendChild(button)
					moon.elements.randomize = button

				// name
					var label = document.createElement("label")
						label.className = "moon-name-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "name"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "text"
						input.className = "moon-name"
						input.placeholder = "name"
						input.value = moon.name
						input.addEventListener(TRIGGERS.input, changeMoonName)
					label.appendChild(input)
					moon.elements.name = input

					var button = document.createElement("button")
						button.className = "moon-remove"
						button.innerHTML = "&#x2715;"
						button.addEventListener(TRIGGERS.click, removeMoon)
					section.appendChild(button)
					moon.elements.remove = button

				// class
					var label = document.createElement("label")
						label.className = "moon-class-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "class"
					label.appendChild(heading)

					var select = document.createElement("select")
						select.className = "moon-class"
						
						var option = document.createElement("option")
							option.value = option.innerText = "custom"
						select.appendChild(option)

						for (let i in CONSTANTS.classes.moons) {
							var option = document.createElement("option")
								option.value = i
								option.innerText = CONSTANTS.classes.moons[i].name
							select.appendChild(option)
						}
						
						select.value = moon.class || "custom"
						select.addEventListener(TRIGGERS.input, changeMoonClass)
					label.appendChild(select)
					moon.elements.class = select

				// description
					var label = document.createElement("label")
						label.className = "moon-description-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "description"
					label.appendChild(heading)

					var textarea = document.createElement("textarea")
						textarea.className = "moon-description"
						textarea.placeholder = "description"
						textarea.value = moon.description
						textarea.addEventListener(TRIGGERS.input, changeMoonDescription)
					label.appendChild(textarea)
					moon.elements.description = textarea

				// color
					var label = document.createElement("label")
						label.className = "moon-color-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "color"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "color"
						input.className = "moon-color"
						input.value = moon.color
						input.addEventListener(TRIGGERS.input, changeMoonColor)
					label.appendChild(input)
					moon.elements.color = input

				// mass
					var label = document.createElement("label")
						label.className = "moon-mass-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "mass"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-mass-factor"
						input.min = 1
						input.max = 10 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "n"
						input.value = moon.massFactor
						input.addEventListener(TRIGGERS.input, changeMoonMass)
					label.appendChild(input)
					moon.elements.massFactor = input

					var span = document.createElement("span")
						span.innerText = "x10^"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-mass-power"
						input.min = 0
						input.step = 1
						input.placeholder = "exponent"
						input.value = moon.massPower
						input.addEventListener(TRIGGERS.input, changeMoonMass)
					label.appendChild(input)
					moon.elements.massPower = input

					var span = document.createElement("span")
						span.innerText = "kg"
					label.appendChild(span)

				// orbit
					var label = document.createElement("label")
						label.className = "moon-orbit-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "orbit"
					label.appendChild(heading)

					var span = document.createElement("span")
						span.innerText = "day"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-day"
						input.min = 0
						input.step = 0.1
						input.placeholder = "day"
						input.value = moon.day
						input.addEventListener(TRIGGERS.input, changeMoonDay)
					label.appendChild(input)
					moon.elements.day = input

					var span = document.createElement("span")
						span.innerText = "/"
					label.appendChild(span)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-period"
						input.min = 0
						input.step = 0.1
						input.placeholder = "period"
						input.value = moon.period
						input.addEventListener(TRIGGERS.input, changeMoonPeriod)
					label.appendChild(input)
					moon.elements.period = input

				// distance
					var label = document.createElement("label")
						label.className = "moon-distance-label"
					section.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "distance"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-semimajoraxis"
						input.min = 0
						input.step = 0.001
						input.placeholder = "distance"
						input.value = moon.semiMajorAxis
						input.addEventListener(TRIGGERS.input, changeMoonSemiMajorAxis)
					label.appendChild(input)
					moon.elements.semiMajorAxis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// advanced
					var details = document.createElement("details")
						details.className = "moon-advanced-outer"
					section.appendChild(details)

					var summary = document.createElement("summary")
					details.appendChild(summary)

					var heading = document.createElement("h3")
						heading.innerText = "advanced"
					summary.appendChild(heading)

					var inner = document.createElement("div")
						inner.className = "moon-advanced"
					details.appendChild(inner)

				// retrograde
					var label = document.createElement("label")
						label.className = "moon-retrograde-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "retrograde"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "checkbox"
						input.checked = moon.retrograde
						input.addEventListener(TRIGGERS.input, changeMoonRetrograde)
					label.appendChild(input)
					moon.elements.retrograde = input

				// eccentricity
					var label = document.createElement("label")
						label.className = "moon-eccentricity-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "eccentricity"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-eccentricity"
						input.min = 0
						input.max = 1 - (1 / CONSTANTS.rounding)
						input.step = 0.01
						input.placeholder = "eccentricity"
						input.value = moon.eccentricity
						input.addEventListener(TRIGGERS.input, changeMoonEccentricity)
					label.appendChild(input)
					moon.elements.eccentricity = input

					var span = document.createElement("span")
						span.innerText = " /1"
					label.appendChild(span)

				// apoapsis
					var label = document.createElement("label")
						label.className = "moon-apoapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "apoapsis"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-apoapsis"
						input.min = 0
						input.step = 0.001
						input.placeholder = "apoapsis"
						input.value = moon.apoapsis
						input.addEventListener(TRIGGERS.input, changeMoonApoapsisOrPeriapsis)
					label.appendChild(input)
					moon.elements.apoapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// periapsis
					var label = document.createElement("label")
						label.className = "moon-periapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "periapsis"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-periapsis"
						input.min = 0
						input.step = 0.001
						input.placeholder = "periapsis"
						input.value = moon.periapsis
						input.addEventListener(TRIGGERS.input, changeMoonApoapsisOrPeriapsis)
					label.appendChild(input)
					moon.elements.periapsis = input

					var span = document.createElement("span")
						span.innerText = "AU"
					label.appendChild(span)

				// inclination
					var label = document.createElement("label")
						label.className = "moon-inclination-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "inclination"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-inclination"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "inclination"
						input.value = roundNumber(moon.inclination * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeMoonInclination)
					label.appendChild(input)
					moon.elements.inclination = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// longitude of ascending node
					var label = document.createElement("label")
						label.className = "moon-longitudeofascendingnode-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "longitude of ascending node"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-longitudeofascendingnode"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(moon.longitudeOfAscendingNode * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeMoonLongitudeOfAscendingNode)
					label.appendChild(input)
					moon.elements.longitudeOfAscendingNode = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// argument of periapsis
					var label = document.createElement("label")
						label.className = "moon-argumentofperiapsis-label"
					inner.appendChild(label)

					var heading = document.createElement("h3")
						heading.innerText = "argument of periapsis"
					label.appendChild(heading)

					var input = document.createElement("input")
						input.type = "number"
						input.className = "moon-argumentofperiapsis"
						input.min = 0
						input.max = CONSTANTS.convert.circle_to_degree - (1 / CONSTANTS.rounding)
						input.step = 0.1
						input.placeholder = "angle"
						input.value = roundNumber(moon.argumentOfPeriapsis * CONSTANTS.convert.circle_to_degree / CONSTANTS.convert.circle_to_radian)
						input.addEventListener(TRIGGERS.input, changeMoonArgumentOfPeriapsis)
					label.appendChild(input)
					moon.elements.argumentOfPeriapsis = input

					var span = document.createElement("span")
						span.innerText = "°"
					label.appendChild(span)

				// return moon
					return moon
			} catch (error) {console.log(error)}
		}

	/* removeMoon */
		function removeMoon(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

					let parentId = event.target.closest(".planet").id
					let parent = getCelestialBodyFromId(parentId)

				// remove elements
					moon.elements.section.remove()

				// remove from state
					delete parent.children[moonId]
			} catch (error) {console.log(error)}
		}

	/* randomizeMoon */
		function randomizeMoon(event, moonData, planetData) {
			try {
				// get id
					let moon = null
					let parent = null

					if (moonData && planetData) {
						moon = moonData
						parent = planetData
					}
					else {
						let moonId = event.target.closest(".moon").id
						moon = getCelestialBodyFromId(moonId)

						let parentElement = event.target.closest(".planet")
						let parentId = parentElement ? parentElement.id : null
						parent = getCelestialBodyFromId(parentId) || null
					}

				// visible
					moon.elements.visible.checked = moon.position.visible = true

				// name
					moon.elements.name.value = moon.name = chooseRandom(CONSTANTS.random.names)
					moon.elements.summary.innerHTML = getNameSymbol(moon) + (moon.name || "")

				// class
					moon.elements.class.value = moon.class = "custom"

				// description
					moon.elements.description.value = moon.description = ""

				// color
					moon.elements.color.value = moon.color = generateRandomColor() // #hex

				// mass
					let parentMass = parent.massFactor * (10 ** parent.massPower) // kg
					let attempts = CONSTANTS.random.attempts
					do {
						moon.elements.massFactor.value = moon.massFactor = generateRandom(CONSTANTS.random.moon.massFactor[0], CONSTANTS.random.moon.massFactor[1] * CONSTANTS.rounding) / CONSTANTS.rounding // kg
						moon.elements.massPower.value = moon.massPower = generateRandom(CONSTANTS.random.moon.massPower[0], CONSTANTS.random.moon.massPower[1]) // 10^x
						attempts--
					} while (attempts && moon.massFactor * (10 ** moon.massPower) > parentMass)

				// semiMajorAxis
					moon.elements.semiMajorAxis.value = moon.semiMajorAxis = generateRandom(CONSTANTS.random.moon.semiMajorAxis[0] * CONSTANTS.rounding, CONSTANTS.random.moon.semiMajorAxis[1] * CONSTANTS.rounding) / CONSTANTS.rounding // AU

				// eccentricity
					moon.elements.eccentricity.value = moon.eccentricity = generateRandom(CONSTANTS.random.moon.eccentricity[0] * CONSTANTS.rounding, CONSTANTS.random.moon.eccentricity[1] * CONSTANTS.rounding) / CONSTANTS.rounding // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get ellipse
						let [apoapsis, periapsis] = calculateEllipse(moon.semiMajorAxis, moon.eccentricity, [null, null]) // AU, AU

					// set & save values
						moon.elements.apoapsis.value  = moon.apoapsis  = apoapsis // AU
						moon.elements.periapsis.value = moon.periapsis = periapsis // AU

				// semiMajorAxis & mass --> period
					// get period
						let semiMajorAxis = moon.semiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						let period = calculateOrbit(parentMass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						moon.elements.period.value = moon.period = period // d

				// period --> day
					moon.elements.day.value = moon.day = generateRandom(0, Math.floor(moon.period)) // d

				// retrograde
					moon.elements.retrograde.checked = moon.retrograde = chooseRandom([true, false])

				// inclination
					let inclination = generateRandom(CONSTANTS.random.moon.inclination[0], CONSTANTS.random.moon.inclination[1]) // °
					moon.elements.inclination.value = inclination // °
					moon.inclination = roundNumber(inclination * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

				// longitudeOfAscendingNode
					let longitudeOfAscendingNode = generateRandom(CONSTANTS.random.moon.longitudeOfAscendingNode[0], CONSTANTS.random.moon.longitudeOfAscendingNode[1]) // °
					moon.elements.longitudeOfAscendingNode.value = longitudeOfAscendingNode // °
					moon.longitudeOfAscendingNode = roundNumber(longitudeOfAscendingNode * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

				// argumentOfPeriapsis
					let argumentOfPeriapsis = generateRandom(CONSTANTS.random.moon.argumentOfPeriapsis[0], CONSTANTS.random.moon.argumentOfPeriapsis[1]) // °
					moon.elements.argumentOfPeriapsis.value = argumentOfPeriapsis // °
					moon.argumentOfPeriapsis = roundNumber(argumentOfPeriapsis * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonVisible */
		function changeMoonVisible(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// get visible
					let visible = moon.elements.visible.checked || false

				// save new value
					moon.position.visible = visible
			} catch (error) {console.log(error)}
		}

	/* changeMoonName */
		function changeMoonName(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// get name
					let name = moon.elements.name.value

				// save new value
					moon.name = name
					moon.elements.summary.innerHTML = getNameSymbol(moon) + (name || "")
			} catch (error) {console.log(error)}
		}

	/* changeMoonClass */
		function changeMoonClass(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// update class
					// get class
						let moonClass = moon.class = moon.elements.class.value
						if (!CONSTANTS.classes.moons[moonClass]) {
							return
						}

					// get orbitalFraction
						let day = moon.day // d
						let period = moon.period // d
						let orbitalFraction = (day / period) || 0 // ratio
						let retrograde = moon.retrograde

					// set & save values
						moon.elements.color.value = moon.color = CONSTANTS.classes.moons[moonClass].color // #hex
						moon.elements.massFactor.value = moon.massFactor = CONSTANTS.classes.moons[moonClass].massFactor // kg
						moon.elements.massPower.value = moon.massPower = CONSTANTS.classes.moons[moonClass].massPower // kg
						moon.elements.semiMajorAxis.value = moon.semiMajorAxis = CONSTANTS.classes.moons[moonClass].semiMajorAxis // AU
						moon.elements.retrograde.checked = moon.retrograde = CONSTANTS.classes.moons[moonClass].retrograde
						moon.elements.eccentricity.value = moon.eccentricity = CONSTANTS.classes.moons[moonClass].eccentricity // ratio
						moon.elements.apoapsis.value = moon.apoapsis = CONSTANTS.classes.moons[moonClass].apoapsis // AU
						moon.elements.periapsis.value = moon.periapsis = CONSTANTS.classes.moons[moonClass].periapsis // AU
						moon.elements.summary.innerHTML = getNameSymbol(moon) + (moon.name || "")

					// computed
						moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)

				// update period
					// get parent
						let parentId = event.target.closest(".planet").id
						let parent = getCelestialBodyFromId(parentId)

					// get planet mass
						let planetMass = parent.massFactor * (10 ** parent.massPower) // kg

					// convert to SI
						let semiMajorAxis = moon.semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						period = calculateOrbit(planetMass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save period
						moon.elements.period.value = moon.period = period // d

				// update day
					// get equivalent day in new period
						day = roundNumber(orbitalFraction * period) // d

					// flip
						if (retrograde != moon.retrograde) {
							day = roundNumber((period - day + period) % period) // d
						}

					// set & save values
						moon.elements.day.value = moon.day = day // d
			} catch (error) {console.log(error)}
		}

	/* changeMoonDescription */
		function changeMoonDescription(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// get description
					let description = moon.elements.description.value

				// save new value
					moon.description = description
			} catch (error) {console.log(error)}
		}

	/* changeMoonColor */
		function changeMoonColor(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// get color
					let color = moon.elements.color.value // #hex

				// save new value
					moon.color = color // #hex
			} catch (error) {console.log(error)}
		}

	/* changeMoonMass */
		function changeMoonMass(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

					let parentElement = event.target.closest(".planet")
					let parentId = parentElement ? parentElement.id : null
					let parent = getCelestialBodyFromId(parentId) || null

				// mass
					// get moon mass
						let massFactor = Number(moon.elements.massFactor.value) // kg
						let massPower = Number(moon.elements.massPower.value) // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// get mass
						let mass = massFactor * (10 ** massPower) // kg
						if (mass <= 0) {
							return
						}

					// get parent mass
						if (parent) {
							let parentMass = parent.massFactor * (10 ** parent.massPower) // kg
							if (parentMass < mass) {
								return
							}
						}

					// save new values
						moon.massFactor = massFactor // kg
						moon.massPower = massPower // 10^x

				// custom class
					moon.elements.class.value = moon.class = "custom"
					moon.elements.summary.innerHTML = getNameSymbol(moon) + (moon.name || "")
			} catch (error) {console.log(error)}
		}

	/* changeMoonDay */
		function changeMoonDay(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// day
					// get moon day
						let day = Number(moon.elements.day.value) // d

					// save new values
						moon.day = roundNumber(day) // d
			} catch (error) {console.log(error)}
		}

	/* changeMoonPeriod */
		function changeMoonPeriod(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// update value
					// get period
						let period = Number(moon.elements.period.value) // d

					// errors
						if (!period) {
							return
						}

					// save new value
						moon.period = period // d

				// update day
					if (moon.day > moon.period) {
						moon.elements.day.value = moon.day = 0 // d
					}

				// mass & period --> semiMajorAxis
					// get parent
						let parentId = event.target.closest(".planet").id
						let parent = getCelestialBodyFromId(parentId)

					// get planet mass
						let massFactor = parent.massFactor // kg
						let massPower = parent.massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						period = period * CONSTANTS.convert.day_to_hour * CONSTANTS.convert.hour_to_second // s

					// get semiMajorAxis
						let semiMajorAxis = calculateOrbit(mass, period, null) // m

					// convert from SI
						semiMajorAxis = semiMajorAxis / CONSTANTS.convert.AU_to_meter // AU

					// set & save value
						moon.elements.semiMajorAxis.value = moon.semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = moon.eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity || !semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						moon.elements.apoapsis.value   = moon.apoapsis   = apoapsis // AU
						moon.elements.periapsis.value = moon.periapsis = periapsis // AU

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonSemiMajorAxis */
		function changeMoonSemiMajorAxis(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// update value
					// get semiMajorAxis
						let semiMajorAxis = Number(moon.elements.semiMajorAxis.value) // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// save new value
						moon.semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get eccentricity
						let eccentricity = moon.eccentricity // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						moon.elements.apoapsis.value  = moon.apoapsis  = apoapsis // AU
						moon.elements.periapsis.value = moon.periapsis = periapsis // AU

				// semiMajorAxis & mass --> period
					// get parent
						let parentId = event.target.closest(".planet").id
						let parent = getCelestialBodyFromId(parentId)

					// get planet mass
						let massFactor = parent.massFactor // kg
						let massPower = parent.massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						moon.elements.period.value = moon.period = period // d

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonRetrograde */
		function changeMoonRetrograde(event) {
			try {
				// retrograde
					// get id
						let moonId = event.target.closest(".moon").id
						let moon = getCelestialBodyFromId(moonId)

					// get retrograde
						let retrograde = moon.elements.retrograde.checked || false

					// save new value
						moon.retrograde = retrograde

				// update day
					// current
						let day = moon.day // d
						let period = moon.period // d

					// flip
						day = roundNumber((period - day + period) % period) // d

					// set & save value
						moon.elements.day.value = moon.day = day // d
			} catch (error) {console.log(error)}
		}

	/* changeMoonInclination */
		function changeMoonInclination(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// angle
					// get angle
						let angle = Number(moon.elements.inclination.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							moon.elements.inclination.value = angle // °
						}

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						moon.inclination = angle // radians
			} catch (error) {console.log(error)}
		}

	/* changeMoonEccentricity */
		function changeMoonEccentricity(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// update new value
					// get eccentricity
						let eccentricity = Number(moon.elements.eccentricity.value) // ratio

					// errors
						if (CONSTANTS.limit.minimumEccentricity > eccentricity || eccentricity >= CONSTANTS.limit.maximumEccentricity) {
							return
						}

					// save new value
						moon.eccentricity = eccentricity // ratio

				// semiMajorAxis & eccentricity --> apoapsis & periapsis
					// get semiMajorAxis
						let semiMajorAxis = moon.semiMajorAxis // AU

					// errors
						if (!semiMajorAxis) {
							return
						}

					// get apoapsis & periapsis
						let [apoapsis, periapsis] = calculateEllipse(semiMajorAxis, eccentricity, [null, null]) // AU, AU

					// set & save values
						moon.elements.apoapsis.value  = moon.apoapsis  = apoapsis // AU
						moon.elements.periapsis.value = moon.periapsis = periapsis // AU

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonApoapsisOrPeriapsis */
		function changeMoonApoapsisOrPeriapsis(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// update new values
					// get apoapsis & periapsis
						let apoapsis   = Number(moon.elements.apoapsis.value) // AU
						let periapsis = Number(moon.elements.periapsis.value) // AU

					// errors
						if (!apoapsis || !periapsis) {
							return
						}

					// save new values
						moon.apoapsis   = apoapsis // AU
						moon.periapsis = periapsis // AU

				// apoapsis & periapsis --> semiMajorAxis
					// get semiMajorAxis
						let semiMajorAxis = calculateEllipse(null, null, [apoapsis, periapsis]) // AU

					// set & save value
						moon.elements.semiMajorAxis.value = moon.semiMajorAxis = semiMajorAxis // AU

				// semiMajorAxis & apoapsis & periapsis --> eccentricity
					// calculate eccentricity
						let eccentricity = calculateEllipse(semiMajorAxis, null, [apoapsis, periapsis]) // ratio

					// set & save value
						moon.elements.eccentricity.value = moon.eccentricity = eccentricity // ratio

				// semiMajorAxis & mass --> period
					// get parent
						let parentId = event.target.closest(".planet").id
						let parent = getCelestialBodyFromId(parentId)

					// get planet mass
						let massFactor = parent.massFactor // kg
						let massPower = parent.massPower // 10^x

					// errors
						if (!massFactor || !massPower) {
							return
						}

					// convert to SI
						let mass = massFactor * Math.pow(10, massPower) // kg
						semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

					// get period
						let period = calculateOrbit(mass, null, semiMajorAxis) // s

					// convert from SI
						period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

					// set & save value
						moon.elements.period.value = moon.period = period // d

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}
	
	/* changeMoonLongitudeOfAscendingNode */
		function changeMoonLongitudeOfAscendingNode(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// angle
					// get angle
						let angle = Number(moon.elements.longitudeOfAscendingNode.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							moon.elements.longitudeOfAscendingNode.value = angle // °
						}

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						moon.longitudeOfAscendingNode = angle // radians

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}

	/* changeMoonArgumentOfPeriapsis */
		function changeMoonArgumentOfPeriapsis(event) {
			try {
				// get id
					let moonId = event.target.closest(".moon").id
					let moon = getCelestialBodyFromId(moonId)

				// angle
					// get angle
						let angle = Number(moon.elements.argumentOfPeriapsis.value) // °

					// bound
						if (angle < 0 || angle >= CONSTANTS.convert.circle_to_degree) {
							while (angle < 0) {
								angle += CONSTANTS.convert.circle_to_degree // °
							}
							angle = angle % CONSTANTS.convert.circle_to_degree // °
							moon.elements.argumentOfPeriapsis.value = angle // °
						}

					// convert to SI
						angle = roundNumber(angle * CONSTANTS.convert.circle_to_radian / CONSTANTS.convert.circle_to_degree) // radians

					// save new values
						moon.argumentOfPeriapsis = angle // radians

				// computed
					moon.computed = calculateComputedValues(moon.semiMajorAxis, moon.eccentricity, moon.longitudeOfAscendingNode, moon.argumentOfPeriapsis, moon.inclination)
			} catch (error) {console.log(error)}
		}

/*** simulation ***/
	/* simulateSystem */
		function simulateSystem() {
			try {
				// recompute positions
					for (let i in STATE.system.children) {
						computeCelestialBody(STATE.system.children[i], 0, 0, 0)
					}

				// tracking
					computeTracking()

				// clear canvas
					clearCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context)

				// origin at center of screen
					translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, (ELEMENTS.simulation.canvas.width / 2), (ELEMENTS.simulation.canvas.height / -2), function() {
						// background field
							simulateField()

						// move to user offset (pan * zoom)
							translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, (-STATE.controls.x * STATE.controls.zoom), (-STATE.controls.y * STATE.controls.zoom), function() {
								// loop through children
									for (let i in STATE.system.children) {
										simulateCelestialBody(STATE.system.children[i], i)
									}
							})
					})
			} catch (error) {console.log(error)}
		}

	/* computeCelestialBody */
		function computeCelestialBody(celestialBody, x, y, inclination) {
			try {
				// update inclination
					inclination = ((inclination || 0) + Math.abs(celestialBody.inclination)) % CONSTANTS.convert.circle_to_radian

				// calculate moon's position at day
					celestialBody.position.trueAnomaly = calculateTrueAnomaly(celestialBody.day, celestialBody.period, celestialBody.retrograde, celestialBody.eccentricity)
					let position = calculatePositionOnEllipse(celestialBody.semiMajorAxis, celestialBody.computed.semiMinorAxis, celestialBody.position.trueAnomaly)
					celestialBody.position.x = position.x - celestialBody.computed.focalDistance
					celestialBody.position.y = position.y

				// get local point
					let celestialBodyPoint = {
						x: celestialBody.position.x * Math.abs(Math.cos(inclination)),
						y: celestialBody.position.y
					}

				// rotate around orbit & move to point
					celestialBodyPoint = rotatePoint(celestialBodyPoint.x, celestialBodyPoint.y, (celestialBody.computed.longitudeOfPeriapsis || 0))
					x += celestialBodyPoint.x
					y += celestialBodyPoint.y

				// save
					celestialBody.position.invariableX = x
					celestialBody.position.invariableY = y

				// loop through children
					for (let i in celestialBody.children) {
						computeCelestialBody(celestialBody.children[i], x, y, inclination)
					}

				// increment day
					iterateDay(celestialBody)
			} catch (error) {console.log(error)}
		}

	/* computeTracking */
		function computeTracking() {
			try {
				// not tracking
					if (!STATE.controls.tracking) {
						return
					}

				// get position of tracked object
					let celestialBody = null
					let changed = false
					while (!celestialBody && STATE.controls.tracking && STATE.controls.tracking.length) {
						celestialBody = getCelestialBodyFromId(STATE.controls.tracking)
						if (!celestialBody) {
							changed = true
							STATE.controls.tracking = STATE.controls.tracking.split("-")
							STATE.controls.tracking.pop()
							STATE.controls.tracking.pop()
							STATE.controls.tracking = STATE.controls.tracking.join()
						}
					}

				// not tracking anymore
					if (!STATE.controls.tracking) {
						ELEMENTS.controls.tracking.checked = true
						return
					}

				// different celestialBody
					if (changed) {
						celestialBody.position.tracking = true
						celestialBody.elements.tracking.checked = true
					}

				// tracking something
					ELEMENTS.controls.x.value = STATE.controls.x = celestialBody.position.invariableX
					ELEMENTS.controls.y.value = STATE.controls.y = celestialBody.position.invariableY
			} catch (error) {console.log(error)}
		}

	/* simulateField */
		function simulateField() {
			try {
				// remove at least 1 star
					STATE.field.stars.shift()

				// always have enough stars
					while (STATE.field.stars.length < CONSTANTS.field.starCount) {
						STATE.field.stars.push({
							x: generateRandom(0, ELEMENTS.simulation.canvas.width ) - (ELEMENTS.simulation.canvas.width  / 2),
							y: generateRandom(0, ELEMENTS.simulation.canvas.height) - (ELEMENTS.simulation.canvas.height / 2),
							color: chooseRandom(CONSTANTS.field.starColors)
						})
					}

				// loop through distant stars
					for (let i in STATE.field.stars) {
						drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
							x: STATE.field.stars[i].x,
							y: STATE.field.stars[i].y,
							eccentricity: 0,
							semiMajorAxis: CONSTANTS.field.starRadius,
							fill: STATE.field.stars[i].color,
							opacity: CONSTANTS.field.starOpacity
						})
					}
			} catch (error) {console.log(error)}
		}

	/* simulateCelestialBody */
		function simulateCelestialBody(celestialBody, inclination) {
			try {
				// type
					let type = celestialBody.type

				// update inclination
					inclination = ((inclination || 0) + Math.abs(celestialBody.inclination)) % CONSTANTS.convert.circle_to_radian

				// rotate orbit
					rotateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, celestialBody.computed.longitudeOfPeriapsis, function() {
						// save
							ELEMENTS.simulation.context.save()

						// stretch
							ELEMENTS.simulation.context.scale(Math.abs(Math.cos(inclination)), 1)

						// draw orbit
							if (celestialBody.position.visible && celestialBody.semiMajorAxis) {
								// above
									drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
										x: -celestialBody.computed.focalDistance * STATE.controls.zoom,
										y: 0,
										eccentricity: celestialBody.eccentricity,
										semiMajorAxis: celestialBody.semiMajorAxis * STATE.controls.zoom,
										startAngle: celestialBody.computed.ascendingNode.a,
										endAngle: celestialBody.computed.descendingNode.a,
										stroke: celestialBody.color,
										lineWidth: CONSTANTS.canvas.orbitThickness,
										opacity: CONSTANTS.canvas.orbitAboveOpacity
									})

								// below
									drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
										x: -celestialBody.computed.focalDistance * STATE.controls.zoom,
										y: 0,
										eccentricity: celestialBody.eccentricity,
										semiMajorAxis: celestialBody.semiMajorAxis * STATE.controls.zoom,
										startAngle: celestialBody.computed.descendingNode.a,
										endAngle: celestialBody.computed.ascendingNode.a,
										stroke: celestialBody.color,
										lineWidth: CONSTANTS.canvas.orbitThickness,
										opacity: CONSTANTS.canvas.orbitBelowOpacity
									})
							}

						// move to object
							translateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, celestialBody.position.x * STATE.controls.zoom, celestialBody.position.y * STATE.controls.zoom, function() {
								ELEMENTS.simulation.context.scale(1 / Math.abs(Math.cos(-inclination)), 1)
								rotateCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, -celestialBody.computed.longitudeOfPeriapsis, function() {
									// draw habitableZone (for stars)
										if (celestialBody.position.visible && celestialBody.habitableZone && celestialBody.class !== "binary") {
											drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: 0,
												eccentricity: 0,
												semiMajorAxis: celestialBody.habitableZone * STATE.controls.zoom,
												stroke: CONSTANTS.canvas.habitableZoneColor,
												lineWidth: CONSTANTS.canvas.habitableZoneThickness * celestialBody.habitableZone * STATE.controls.zoom,
												opacity: CONSTANTS.canvas.habitableZoneOpacity,
												shadowColor: CONSTANTS.canvas.habitableZoneColor,
												shadowBlur: CONSTANTS.canvas.habitableZoneShadowBlur * celestialBody.habitableZone * STATE.controls.zoom
											})

											drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: 0,
												eccentricity: 0,
												semiMajorAxis: celestialBody.habitableZone * CONSTANTS.canvas.habitableZoneThickness * STATE.controls.zoom,
												fill: CONSTANTS.canvas.uninhabitableZoneColor,
												opacity: CONSTANTS.canvas.habitableZoneOpacity,
												shadowColor: CONSTANTS.canvas.uninhabitableZoneColor,
												shadowBlur: CONSTANTS.canvas.habitableZoneShadowBlur * celestialBody.habitableZone * STATE.controls.zoom
											})
										}

									// draw celestial body (and label)
										if (celestialBody.position.visible && celestialBody.class == "binary") {
											drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: 0,
												eccentricity: 0,
												semiMajorAxis: Math.log10(celestialBody.massFactor * (10 ** celestialBody.massPower)) * CONSTANTS.canvas.barycenter_log_kg_to_pixel,
												fill: CONSTANTS.canvas.barycenterColor,
												opacity: CONSTANTS.canvas.barycenterOpacity,
												shadowColor: CONSTANTS.canvas.barycenterColor,
												shadowBlur: CONSTANTS.canvas.glowThickness
											})
										}
										else if (celestialBody.position.visible) {
											let radius = (type == "star") ? (celestialBody.radius * STATE.controls.zoom) : Math.log10(celestialBody.massFactor * (10 ** celestialBody.massPower)) * ((type == "planet") ? CONSTANTS.canvas.planet_log_kg_to_pixel : CONSTANTS.canvas.moon_log_kg_to_pixel)
											drawEllipse(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: 0,
												eccentricity: 0,
												semiMajorAxis: radius,
												fill: celestialBody.color,
												opacity: CONSTANTS.canvas.celestialBodyOpacity,
												shadowColor: celestialBody.color,
												shadowBlur: CONSTANTS.canvas.glowThickness
											})
										}

										if (celestialBody.position.visible) {
											let fontSize = (type == "star") ? CONSTANTS.canvas.starFontSize : (type == "planet") ? CONSTANTS.canvas.planetFontSize : CONSTANTS.canvas.moonFontSize
											drawText(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context, {
												x: 0,
												y: fontSize,
												body: celestialBody.name,
												fill: celestialBody.color,
												opacity: CONSTANTS.canvas.celestialBodyOpacity,
												fontSize: fontSize,
												fontFamily: CONSTANTS.canvas.fontFamily
											})
										}

									// loop through children
										for (let i in celestialBody.children) {
											simulateCelestialBody(celestialBody.children[i], inclination)
										}
								})
							})

						// restore
							ELEMENTS.simulation.context.restore()
					})
			} catch (error) {console.log(error)}
		}

	/* iterateDay */
		function iterateDay(celestialBody) {
			try {
				// paused
					if (!STATE.controls.play) {
						return
					}

				// invalid day
					if (!celestialBody.day || isNaN(celestialBody.day)) {
						celestialBody.day = 0
					}

				// iterate day
					celestialBody.day += (STATE.controls.rate / CONSTANTS.convert.second_to_loop) // d/l
					celestialBody.day = roundNumber(celestialBody.day)

				// restart
					if (celestialBody.day > celestialBody.period) {
						celestialBody.day = 0
					}

				// set value
					if (celestialBody.elements.day && document.activeElement !== celestialBody.elements.day) {
						celestialBody.elements.day.value = celestialBody.day
					}
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* getCelestialBodyFromId */
		function getCelestialBodyFromId(id, list) {
			try {
				// no id
					if (!id || id.length == 0) {
						return STATE.system
					}

				// no list
					if (!list) {
						list = STATE.system.children
					}

				// loop through list
					for (let i in list) {
						if (i == id) {
							return list[i]
						}
						else if (id.includes(i) && list[i].children) {
							return getCelestialBodyFromId(id, list[i].children)
						}
					}

				// something broke
					return null
			} catch (error) {console.log(error)}
		}

	/* getBinaryFamilyFromId */
		function getBinaryFamilyFromId(starId) {
			try {
				// get parentId
					let parentId = starId.split("-")
						parentId.pop()
						parentId.pop()
					parentId = parentId.join("-")

				// no parent
					if (!parentId || !parentId.length) {
						return [null, null]
					}

				// get parent
					let parent = getCelestialBodyFromId(parentId)

				// get sibling
					let siblingId = Object.keys(parent.children).find(function(id) {
						return id !== starId && parent.children[id].type == "star"
					})
					let sibling = parent.children[siblingId]

				// return
					return [sibling, parent]
			} catch (error) {console.log(error)}
		}

	/* reduceAncestry */
		function reduceAncestry(celestialBody, idToRemove) {
			try {
				// update its id
					celestialBody.id = celestialBody.id.replace(idToRemove, "")

				// update its elements
					celestialBody.elements.section.id = celestialBody.id
					celestialBody.elements.tracking.value = celestialBody.id

				// loop through children
					for (let i in celestialBody.children) {
						reduceAncestry(celestialBody.children[i], idToRemove)
					}

				// return
					return celestialBody
			} catch (error) {console.log(error)}
		}

	/* getNameSymbol */
		function getNameSymbol(celestialBody) {
			try {
				// star
					if (celestialBody.type == "star") {
						if (celestialBody.class == "binary") {
							return "<span class='name-symbol'>" + chooseRandom(CONSTANTS.random.star.emoji.binary) + "</span>"
						}
						if (celestialBody.class == "black-hole") {
							return "<span class='name-symbol'>" + chooseRandom(CONSTANTS.random.star.emoji["black-hole"]) + "</span>"
						}
						return "<span class='name-symbol'>" + chooseRandom(CONSTANTS.random.star.emoji.star) + "</span>"
					}

				// planet
					if (celestialBody.type == "planet") {
						for (let i in CONSTANTS.random.planet.emoji) {
							let range = i.split("-")
							if (range[0] <= celestialBody.massPower && celestialBody.massPower <= range[1]) { // 10^x
								return "<span class='name-symbol'>" + chooseRandom(CONSTANTS.random.planet.emoji[i]) + "</span>"
							}
						}
					}

				// moon
					if (celestialBody.type == "moon") {
						return "<span class='name-symbol'>" + chooseRandom(CONSTANTS.random.moon.emoji) + "</span>"
					}

				// something else
					return ""
			} catch (error) {console.log(error)}
		}

	/* sanitizeObject */
		function sanitizeObject(obj) {
			try {
				// clear out unnecessary things
					if (obj.elements) {
						delete obj.elements
					}
					if (obj.position) {
						delete obj.position
					}
					if (obj.computed) {
						delete obj.computed
					}

				// clean children
					for (let i in obj.children) {
						obj.children[i] = sanitizeObject(obj.children[i])
					}

				// return
					return obj
			} catch (error) {console.log(error)}
		}

	/* generateRandom */
		function generateRandom(a, b) {
			try {
				// bounds
					if (a !== undefined && b !== undefined) {
						return roundNumber(Math.floor(Math.random() * (b - a)) + a) // random number [a - b)
					}

				// random number
					return String(Math.floor(Math.random() * 1000000000000000)).slice(3, 13) // middle 10 digits of a ~15 digit number
			} catch (error) {console.log(error)}
		}

	/* generateRandomColor */
		function generateRandomColor() {
			try {
				// rgb
					const r = generateRandom(0, 256)
					const g = generateRandom(0, 256)
					const b = generateRandom(0, 256)

				// hex
					return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2)
			} catch (error) {console.log(error)}
		}

	/* duplicateObject */
		function duplicateObject(obj) {
			try {
				// not an object
					if (!obj || typeof obj !== "object") {
						return obj
					}

				// stringify -> parse
					return JSON.parse(JSON.stringify(obj))
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(arr) {
			try {
				// not an array
					if (!Array.isArray(arr)) {
						return arr
					}

				// random element from list
					return duplicateObject(arr[Math.floor(Math.random() * arr.length)])
			} catch (error) {console.log(error)}
		}

	/* roundNumber */
		function roundNumber(number) {
			try {
				return Math.round(number * CONSTANTS.rounding) / CONSTANTS.rounding
			} catch (error) {console.log(error)}
		}

	/* rotatePoint */
		function rotatePoint(x, y, a) {
			try {
				let newX = x * Math.cos(a) - y * Math.sin(a)
				let newY = y * Math.cos(a) + x * Math.sin(a)
				return {x: newX, y: newY}
			} catch (error) {console.log(error)}
		}

	/* getDistance */
		function getDistance(a, b) {
			try {
				return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2))
			} catch (error) {console.log(error)}
		}

	/* updateChildrenOrbits */
		function updateChildrenOrbits(parent) {
			try {
				// get mass
					let mass = parent.massFactor * (10 ** parent.massPower) // kg

				// loop through children
					for (let childId in parent.children) {
						// get child
							let child = parent.children[childId]
							if (child.type == "star") {
								continue
							}

						// get orbitalFraction
							let day = child.day // d
							let period = child.period // d
							let orbitalFraction = (day / period) || 0 // ratio

						// get semiMajorAxis
							let semiMajorAxis = child.semiMajorAxis // AU

						// convert to SI
							semiMajorAxis = semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

						// get period
							period = calculateOrbit(mass, null, semiMajorAxis) // s

						// convert from SI
							period = period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

						// get equivalent day in new period
							day = roundNumber(orbitalFraction * period) // d

						// set & save values
							child.elements.period.value = child.period = period // d
							child.elements.day.value = child.day = day // d
					}
			} catch (error) {console.log(error)}
		}

	/* updateBinarySystem */
		function updateBinarySystem(changedStar, siblingStar, parentBinary) {
			try {
				// get masses
					let changedStarMass = changedStar.massFactor * (10 ** changedStar.massPower) // kg
					let siblingStarMass = siblingStar.massFactor * (10 ** siblingStar.massPower) // kg

				// update parent
					// parent mass
						let [totalMassFactor, totalMassPower, totalMass] = calculateBarycenterMass(changedStarMass, siblingStarMass) // kg, 10^x, kg
						parentBinary.elements.massFactor.value = parentBinary.massFactor = totalMassFactor // kg
						parentBinary.elements.massPower.value = parentBinary.massPower = totalMassPower // 10^x

					// children orbits
						updateChildrenOrbits(parentBinary)

				// update sibling
					// new semiMajorAxis
						// m1r1 = m2r2
						siblingStar.elements.semiMajorAxis.value = siblingStar.semiMajorAxis = (changedStarMass / siblingStarMass) * changedStar.semiMajorAxis // AU
						let [siblingStarApoapsis, siblingStarPeriapsis] = calculateEllipse(siblingStar.semiMajorAxis, siblingStar.eccentricity, [null, null]) // AU, AU
						siblingStar.elements.apoapsis.value = siblingStar.apoapsis = siblingStarApoapsis // AU
						siblingStar.elements.periapsis.value = siblingStar.periapsis = siblingStarPeriapsis // AU

					// convert to SI
						let changedStarSemiMajorAxis = changedStar.semiMajorAxis * CONSTANTS.convert.AU_to_meter // m
						let siblingStarSemiMajorAxis = siblingStar.semiMajorAxis * CONSTANTS.convert.AU_to_meter // m

				// get new barycenter period
					// get totalDistance
						let totalDistance = changedStarSemiMajorAxis + siblingStarSemiMajorAxis // m

					// get period
						let period = calculateBarycenterOrbit(changedStarMass, siblingStarMass, null, totalDistance) // s

					// convert from SI
						period = roundNumber(period / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour) // d

					// save new value
						changedStar.elements.period.value = changedStar.period = period // d
						siblingStar.elements.period.value = siblingStar.period = period // d

				// update day
					if (changedStar.day > changedStar.period) {
						changedStar.elements.day.value = changedStar.day = 0 // d
						siblingStar.elements.day.value = siblingStar.day = 0 // d
					}

				// computed
					changedStar.computed = calculateComputedValues(changedStar.semiMajorAxis, changedStar.eccentricity, changedStar.longitudeOfAscendingNode, changedStar.argumentOfPeriapsis, changedStar.inclination)
					siblingStar.computed = calculateComputedValues(siblingStar.semiMajorAxis, siblingStar.eccentricity, siblingStar.longitudeOfAscendingNode, siblingStar.argumentOfPeriapsis, siblingStar.inclination)

				// parent is itself part of a binary?
					let [uncleStar, grandparentStar] = getBinaryFamilyFromId(parentBinary.id)
					if (uncleStar) {
						updateBinarySystem(parentBinary, uncleStar, grandparentStar)
					}
			} catch (error) {console.log(error)}
		}

/*** calculations ***/
	/* calculateHabitableZone */
		function calculateHabitableZone(mass, habitableZone) {
			try {
				// formula for habitable zone      // derived from https://www.zmescience.com/other/feature-post/the-types-of-stars
					// HZ = 1.06 * m^1.83          // [m < 8*sun] [HZ < 48 AU]
					// HZ = -792 + 404 * log(m)    // [m > 8*sun] [HZ > 48 AU]

				// missing habitableZone
					if (!habitableZone) {
						// convert from SI
							mass = mass / CONSTANTS.convert.solarMass_to_kg // solarMass

						// get habitable zone (from functions of best fit)
							if (mass <= 8) { // solarMass
								return 1.06 * (mass ** 1.83) // AU
							}
							else {
								return -792 + 404 * Math.log(mass) // AU
							}
					}

				// missing mass
					if (!mass) {
						// get mass (from functions of best fit)
							if (habitableZone <= 48) { // AU
								mass = Math.pow(habitableZone / 1.06, 1 / 1.83) // solarMass
							}
							else {
								mass = Math.pow(Math.E, (habitableZone + 792) / 404) // solarMass
							}

						// convert to SI
							mass = mass * CONSTANTS.convert.solarMass_to_kg // kg

						// split
							let massPower = 0 // 10^x
							let massFactor = mass // kg
							while (massFactor >= 10) { // kg
								massFactor /= 10 // kg
								massPower++ // 10^x
							}
							massFactor = roundNumber(massFactor) // kg

						// return
							return [massFactor, massPower, mass] // kg, 10^x, kg
					}
			} catch (error) {console.log(error)}
		}

	/* calculateBarycenterMass */
		function calculateBarycenterMass(starAmass, starBmass) {
			try {
				// combine
					let totalMass = roundNumber(starAmass + starBmass) // kg

				// split factor / power
					let totalMassPower = 0 // 10^x
					let totalMassFactor = totalMass // kg
					while (totalMassFactor >= 10) { // kg
						totalMassFactor /= 10 // kg
						totalMassPower++ // 10^x
					}
					totalMassFactor = roundNumber(totalMassFactor) // kg

				// return
					return [totalMassFactor, totalMassPower, totalMass] // kg, 10^x, kg
			} catch (error) {console.log(error)}
		}

	/* calculateBarycenterOrbit */
		function calculateBarycenterOrbit(starAmass, starBmass, period, distance) {
			try {
				// formula for binary orbital period
					// T^2 / d^3 = 4π^2 / G(m1 + m2)

				// get total mass
					let [totalMassFactor, totalMassPower, totalMass] = calculateBarycenterMass(starAmass, starBmass) // kg, 10^x, kg

				// missing period
					// T^2 = (4π^2 / G(m1 + m2)) * d^3
					// T = ((4π^2 / G(m1 + m2)) * d^3) ^ (1/2)
					if (!period) {
						return roundNumber( Math.sqrt((CONSTANTS['4π^2'] * Math.pow(distance, 3)) / (CONSTANTS.G * totalMass)) ) // s
					}

				// missing distance
					// d^3 = (G * (m1 + m2) * T^2) / 4π^2
					// d = ((G * (m1 + m2) * T^2) / 4π^2) ^ (1/3)
					if (!distance) {
						let totalDistance = roundNumber( Math.cbrt((CONSTANTS.G * totalMass * (period ** 2)) / CONSTANTS['4π^2']) ) // m

						// formula for binary star radii
							// m1r1 = m2r2
							// r1 + r2 = d
							// r1 = m2d / (m1 + m2)

						// starAdistance
							let starAdistance = roundNumber( (starBmass * totalDistance) / totalMass ) // m
							let starBdistance = roundNumber( (starAmass * totalDistance) / totalMass ) // m
						return [starAdistance, starBdistance, totalDistance] // m
					}
			} catch (error) {console.log(error)}
		}

	/* calculateEllipse */
		function calculateEllipse(semiMajorAxis, eccentricity, [apoapsis, periapsis]) {
			try {
				// formula for semimajor axis
					// a = (A+P)/2
					// semiMajorAxis = (apoapsis + periapsis) / 2

				// missing semiMajorAxis
					if (!semiMajorAxis) {
						return roundNumber((apoapsis + periapsis) / 2) // AU
					}

				// formula for apoapsis and periapsis (focal points)
					// A = a(1+e)
					// P = a(1-e)

				// missing eccentricity
					if (eccentricity == null) {
						if (periapsis) {
							return roundNumber(1 - (periapsis / semiMajorAxis)) // ratio
						}
						if (apoapsis) {
							return roundNumber((apoapsis / semiMajorAxis) - 1) // ratio
						}
					}

				// missing apoapsis & periapsis
					if (!apoapsis || !periapsis) {
						return [
							roundNumber(semiMajorAxis * (1 + eccentricity)), // AU
							roundNumber(semiMajorAxis * (1 - eccentricity)), // AU
						]
					}
			} catch (error) {console.log(error)}
		}

	/* calculateComputedValues */
		function calculateComputedValues(semiMajorAxis, eccentricity, longitudeOfAscendingNode, argumentOfPeriapsis, inclination) {
			try {
				// empty computed object
					let computed = {}

				// semiMinorAxis & focalDistance
					computed.semiMinorAxis = calculateSemiMinorAxis(semiMajorAxis, eccentricity) // AU
					computed.focalDistance = calculateFocalDistance(semiMajorAxis, computed.semiMinorAxis) // AU

				// stars --> return early
					if (longitudeOfAscendingNode == undefined || argumentOfPeriapsis == undefined || inclination == undefined) {
						return computed
					}

				// inclination --> flip ascending / descending
					let inclinationFlip = 1
					if (inclination) {
						while (inclination < 0) {
							inclination += CONSTANTS.convert.circle_to_radian
						}
						inclination = inclination % CONSTANTS.convert.circle_to_radian

						if (inclination > CONSTANTS.convert.circle_to_radian / 2) {
							inclinationFlip = -1
						}
					}

				// nodes
					// ascending node
						computed.ascendingNode = calculatePositionOnEllipse(semiMajorAxis, computed.semiMinorAxis, argumentOfPeriapsis * inclinationFlip) // AU, AU
						computed.ascendingNode.a = Math.atan2(computed.ascendingNode.y, (computed.ascendingNode.x + computed.focalDistance)) // radians

					// descending node
						computed.descendingNode = calculatePositionOnEllipse(semiMajorAxis, computed.semiMinorAxis, argumentOfPeriapsis * inclinationFlip + (CONSTANTS.convert.circle_to_radian / 2)) // AU, AU
						computed.descendingNode.a = Math.atan2(computed.descendingNode.y, (computed.descendingNode.x + computed.focalDistance)) // radians

					// longitude of periapsis
						computed.longitudeOfPeriapsis = longitudeOfAscendingNode + argumentOfPeriapsis

				// return values
					return computed
			} catch (error) {console.log(error)}
		}

	/* calculateSemiMinorAxis */
		function calculateSemiMinorAxis(semiMajorAxis, eccentricity) {
			try {
				// circle
					if (!eccentricity) {
						return semiMajorAxis // AU
					}

				// formula for semiminor axis
					// e = sqrt(a^2 - b^2) / a
					// ea = sqrt(a^2 - b^2)
					// (ea)^2 = a^2 - b^2
					// b^2 = a^2 - (ea)^2
					// b = sqrt(a^2 - (ea)^2)
					// b = sqrt(a^2(1 - e))

				// calculate
					let semiMinorAxis = Math.sqrt( ((semiMajorAxis ** 2) * (1 - eccentricity)) ) // AU
					return roundNumber(semiMinorAxis) // AU
			} catch (error) {console.log(error)}
		}

	/* calculateOrbit */
		function calculateOrbit(mass, period, semiMajorAxis) {
			try {
				// formula for orbital period
					// T^2 = (4π^2/GM) * a^3
					// period^2 = ((4π^2) / (G * mass)) * semiMajorAxis^3

				// missing mass
					if (!mass) {
						return roundNumber( ((CONSTANTS['4π^2'] / (CONSTANTS.G * (period ** 2))) * (semiMajorAxis ** 3)) ) // kg
					}

				// missing period
					if (!period) {
						return roundNumber(Math.sqrt( ((CONSTANTS['4π^2'] / (CONSTANTS.G * mass)) * (semiMajorAxis ** 3)) )) // s
					}

				// missing semiMajorAxis
					if (!semiMajorAxis) {
						return roundNumber(Math.cbrt( (((CONSTANTS.G * mass) / CONSTANTS['4π^2']) * (period ** 2)) )) // m
					}
			} catch (error) {console.log(error)}
		}

	/* calculateEccentricAnomaly */
		function calculateEccentricAnomaly(day, period, eccentricity, retrograde, previousGuess) {
			try {
				// formula for mean motion
					// n = 2π/P
				
				// meanMotion
					let meanMotion = CONSTANTS.convert.circle_to_radian / period // radians

				// formula for eccentric anomaly
					// E = (t * n) + (e * sin(E))

				// generate a new guess
					let nextGuess = (day * meanMotion) + (eccentricity * Math.sin(previousGuess || 0)) // radians
					if (retrograde) {
						nextGuess *= -1
					}

				// not good enough --> recursive calculation
					if (Math.abs(nextGuess - previousGuess) > CONSTANTS.limit.minimumAngle) {
						return calculateEccentricAnomaly(day, period, eccentricity, retrograde, previousGuess) // radians
					}

				// good enough
					return nextGuess // radians
			} catch (error) {console.log(error)}
		}

	/* calculateTrueAnomaly */
		function calculateTrueAnomaly(day, period, retrograde, eccentricity) {
			try {
				// no period
					if (!period) {
						return 0
					}

				// formula for true anomaly
					// E = eccentricAnomaly
					// tan(v / 2) = sqrt(1+e/1-e) * tan(E / 2)
					// v = 2 * arctan(sqrt(1+e/1-e) * tan(E / 2))

				// calculate
					let eccentricAnomaly = calculateEccentricAnomaly(day, period, eccentricity, retrograde) // radians
					let trueAnomaly = 2 * Math.atan( Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2) ) // radians

				// ensure positive
					trueAnomaly = (trueAnomaly + CONSTANTS.convert.circle_to_radian) % CONSTANTS.convert.circle_to_radian // radians
					return trueAnomaly // radians
			} catch (error) {console.log(error)}
		}

	/* calculateFocalDistance */
		function calculateFocalDistance(semiMajorAxis, semiMinorAxis) {
			try {
				// formula for focal radii (f & g) to semimajoraxis (a)
					// f+g = 2a

				// formula for focal radii (f&g) to semiminoraxis (b) and focal distance (c)
					// f+g = 2*sqrt(b^2+c^2)

				// combined
					// 2a = 2*sqrt(b^2 + c^2)
					// a^2 = b^2 + c^2
					// c = sqrt(a^2 - b^2)

				// calculate
					let focalDistance = Math.sqrt((semiMajorAxis ** 2) - (semiMinorAxis ** 2)) // AU
					return roundNumber(focalDistance) // AU
			} catch (error) {console.log(error)}
		}

	/* calculatePositionOnEllipse */
		function calculatePositionOnEllipse(semiMajorAxis, semiMinorAxis, trueAnomaly) {
			try {
				// no ellipse
					if (!semiMajorAxis || !semiMinorAxis) {
						return {x: 0, y: 0}
					}

				// formula for a line
					// y = mx + c // c = 0, m = tanθ
					// y = tanθ * x

				// formula for an ellipse
					// (x^2 / a^2) + (y^2 / b^2) = 1
					// y = b * sqrt(1 - (x^2 / a^2))

				// combined
					// tanθ * x = b * sqrt(1 - (x^2 / a^2))
					// (x^2 * (tanθ)^2) / b^2 = 1 - (x^2 / a^2)
					// ((x^2 * (tanθ)^2) / b^2) + (x^2 / a^2) = 1
					// x^2 * (((tanθ)^2 / b^2) + (1 / a^2)) = 1
					// x = sqrt(1 / (((tanθ)^2 / b^2) + (1 / a^2)))

				// get coordinates
					while (trueAnomaly < 0) {
						trueAnomaly = (trueAnomaly + CONSTANTS.convert.circle_to_radian)
					}
					trueAnomaly = trueAnomaly % CONSTANTS.convert.circle_to_radian // radian
					let tanA = Math.tan(trueAnomaly) // ratio
					let x = Math.sqrt(1 / (((tanA ** 2) / (semiMinorAxis ** 2)) + (1 / (semiMajorAxis ** 2)))) // AU
					let y = tanA * x // AU

				// adjust for quadrants 2 & 3
					if (CONSTANTS.convert.quarterCircle_to_radian <= trueAnomaly && trueAnomaly < 3 * CONSTANTS.convert.quarterCircle_to_radian) {
						x = -x // AU
						y = -y // AU
					}

				// round
					x = roundNumber(x) // AU
					y = roundNumber(y) // AU

				// return coordinates (relative to center of ellipse)
					return {x: x, y: y} // AU, AU
			} catch (error) {console.log(error)}
		}

	/* calculateDayFromPeriapsis */
		function calculateDayFromPeriapsis(period, dateOfPeriapsis) {
			try {
				// get days from now
					let daysFromNow = new Date(dateOfPeriapsis).getTime() - new Date().getTime() // ms
					daysFromNow = daysFromNow / CONSTANTS.convert.second_to_ms / CONSTANTS.convert.hour_to_second / CONSTANTS.convert.day_to_hour // d

				// convert to day within period
					daysFromNow = period - daysFromNow
					while (daysFromNow < 0) {
						daysFromNow += period
					}
					daysFromNow = daysFromNow % period

				// round and return
					return roundNumber(daysFromNow)
			} catch (error) {console.log(error)}
		}

/*** canvas ***/
	/* resizeCanvas */
		window.addEventListener(TRIGGERS.resize, resizeCanvas)
		function resizeCanvas() {
			try {
				// set height and width
					ELEMENTS.simulation.canvas.width  = window.innerWidth
					ELEMENTS.simulation.canvas.height = window.innerHeight

				// clear canvas
					clearCanvas(ELEMENTS.simulation.canvas, ELEMENTS.simulation.context)
			} catch (error) {console.log(error)}
		}

	/* clearCanvas */
		function clearCanvas(canvas, context) {
			try {
				// clear
					context.globalAlpha = 1
					context.clearRect(0, 0, canvas.width, canvas.height)

				// redraw
					context.fillStyle = CONSTANTS.canvas.spaceColor
					context.globalAlpha = 1
					context.fillRect(0, 0, canvas.width, ELEMENTS.simulation.canvas.height)
			} catch (error) {console.log(error)}
		}

	/* translateCanvas */
		function translateCanvas(canvas, context, x, y, callback) {
			try {
				// slide
					context.translate(x, -y)

				// do stuff
					callback()

				// slide back
					context.translate(-x, y)
			} catch (error) {console.log(error)}
		}

	/* rotateCanvas */
		function rotateCanvas(canvas, context, a, callback) {
			try {
				// slide
					context.rotate(-a)

				// do stuff
					callback()

				// slide back
					context.rotate(a)
			} catch (error) {console.log(error)}
		}

	/* drawEllipse */
		function drawEllipse(canvas, context, ellipse) {
			try {
				// set values
					context.strokeStyle = ellipse.stroke || "transparent"
					context.lineWidth = ellipse.lineWidth || 0
					context.fillStyle = ellipse.fill || "transparent"
					context.globalAlpha = ellipse.opacity || 0
					context.shadowColor = ellipse.shadowColor || "transparent"
					context.shadowBlur = ellipse.shadowBlur || 0

				// get variables
					let radiusX = ellipse.semiMajorAxis
					let radiusY = calculateSemiMinorAxis(ellipse.semiMajorAxis, ellipse.eccentricity)
					let startAngle = ellipse.startAngle !== undefined ? ellipse.startAngle : 0
					let endAngle   = ellipse.endAngle   !== undefined ? ellipse.endAngle : CONSTANTS.convert.circle_to_radian

				// draw
					context.beginPath()
					context.ellipse(ellipse.x, -ellipse.y, radiusX, radiusY, 0, startAngle, endAngle, true)

					if (context.strokeStyle !== "transparent" && context.lineWidth) {
						context.stroke()
					}
					if (context.fillStyle !== "transparent") {
						context.fill()
					}
			} catch (error) {console.log(error)}
		}

	/* drawText */
		function drawText(canvas, context, text) {
			try {
				// no body
					if (!text.body) {
						return
					}

				// set values
					context.strokeStyle = text.stroke || "transparent"
					context.lineWidth = text.lineWidth || 0
					context.fillStyle = text.fill || "transparent"
					context.globalAlpha = text.opacity || 0
					context.shadowColor = text.shadowColor || "transparent"
					context.shadowBlur = text.shadowBlur || 0
					context.font = (text.fontSize || 0) + "px " + (text.fontFamily || "monospace")
					context.textAlign = "center"
					context.textBaseline = "middle"

				// draw
					if (context.fillStyle !== "transparent") {
						context.fillText(text.body, text.x, -text.y)
					}
					if (context.strokeStyle !== "transparent" && context.lineWidth) {
						context.strokeText(text.body, text.x, -text.y)
					}
			} catch (error) {console.log(error)}
		}
