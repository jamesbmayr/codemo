window.onload = function() {

	/*** onload ***/
		/* lines & trains */
			var lines = [
				{
					name: "1",
					color: "#EE352E",
					total: 0.22532429653307362,
					stations: ["Van Cortlandt Park-242nd St", "238th St", "231st St", "Marble Hill-225th St", "215th St", "207th St", "Dyckman St-Saint Nicholas Av", "191st St-Saint Nicholas Av", "181st St-Saint Nicholas Av", "Washington Heights-168th St", "157th St-Broadway", "145th St-Broadway", "137th St-City College", "125th St-Broadway", "116th St-Columbia University", "Cathedral Parkway-110th St-Broadway", "103rd St-Broadway", "96th St-Broadway", "86th St-Broadway", "79th St-Broadway", "72nd St-Broadway", "66th St-Lincoln Center", "59th St-Columbus Circle", "50th St-Broadway", "Times Square-42nd St", "34th St-Penn Station-7th Av", "28th St-7th Av", "23rd St-7th Av", "18th St-7th Av", "14th St-7th Av", "Christopher St-Sheridan Square", "Houston St", "Canal St-Varick St", "Franklin St-Varick St", "Chambers St-Varick St", "Rector St-Varick St", "South Ferry"],
					distances: [0.005120149411882022, 0.007034274447304059, 0.006589160341043621, 0.007474248657897988, 0.005988363716402238, 0.007860596542252352, 0.0065709217009491715, 0.007086907364992578, 0.010619558418314917, 0.008543648225440759, 0.009274750670497656, 0.005624473753167327, 0.007959820663803558, 0.009730802895968, 0.004646632544103846, 0.004773517047208095, 0.006789909056826646, 0.006557183084225604, 0.005988881448147991, 0.005852877070302496, 0.00501869405323152, 0.005200543144710498, 0.0067958635213010606, 0.006218474491373092, 0.007401464990121945, 0.003911499456740529, 0.0038826820626913835, 0.003761579056736354, 0.003969722408423417, 0.005168388627028256, 0.005726758419910159, 0.005473180885009049, 0.003588060339513001, 0.004517742799228906, 0.009156665004251678, 0.0054463002120718725],
					trains: []
				},
				{	
					name: "2",
					color: "#EE352E",
					total: 0.39470678414146054,
					stations: ["Wakefield-241st St", "238th St-Nereid Av", "233rd St", "225th St", "219th St", "Gun Hill Rd-White Plains Rd", "Burke Av", "Allerton Av", "Pelham Parkway-White Plains Rd", "Bronx Park East", "East 180th St", "West Farms Square-East Tremont Av", "174th St", "Freeman St", "Simpson St", "Intervale Av", "Prospect Av-Bronx", "Jackson Av", "3rd Av-149th St", "149th St-Grand Concourse", "135th St-Lenox Av", "125th St-Lenox Av", "116th St-Lenox Av", "Central Park North-110th St", "96th St-Broadway", "86th St-Broadway", "79th St-Broadway", "72nd St-Broadway", "66th St-Lincoln Center", "59th St-Columbus Circle", "Times Square-42nd St", "34th St-Penn Station-7th Av", "28th St-7th Av", "23rd St-7th Av", "18th St-7th Av", "14th St-7th Av", "Christopher St-Sheridan Square", "Houston St", "Canal St-Varick St", "Franklin St-Varick St", "Chambers St-Varick St", "Park Place", "Fulton St", "Wall St", "Clark St", "Borough Hall-Court St", "Hoyt St", "Nevins St", "Atlantic Av", "Bergen St-Flatbush Av", "Grand Army Plaza", "Eastern Parkway-Brooklyn Museum", "Franklin Av-Bedford Av", "President St", "Sterling St", "Winthrop St", "Church Av-Nostrand Av", "Beverly Rd-Nostrand Av", "Newkirk Av", "Flatbush Av-Brooklyn College"],
					distances: [0.006052441821279608, 0.006040364641308355, 0.005913092676430081, 0.004720740725774562, 0.007047563692511092, 0.006557171646372803, 0.00589699754112234, 0.00827418086580294, 0.008406275037139244, 0.008566873233555703, 0.006753037983012972, 0.008252349604805495, 0.008383447143029351, 0.00604019875500894, 0.00413076845151829, 0.005663953742747028, 0.006784128094317362, 0.009957291850687746, 0.009857970987995315, 0.014044887931198157, 0.008015687743414449, 0.007003373187264954, 0.0037370226116559178, 0.021139426127488852, 0.006557183084225604, 0.005988881448147991, 0.005852877070302496, 0.00501869405323152, 0.005200543144710498, 0.01299598768851503, 0.007401464990121945, 0.003911499456740529, 0.0038826820626913835, 0.003761579056736354, 0.003969722408423417, 0.005168388627028256, 0.005726758419910159, 0.005473180885009049, 0.003588060339513001, 0.004517742799228906, 0.002469282081896362, 0.0042697570188519884, 0.003623515696119569, 0.01854627242870249, 0.005851330532450806, 0.00541509713670912, 0.005118371811434292, 0.00522572483009955, 0.0040491264490027145, 0.006907354052024385, 0.007419686314122451, 0.006378915346677095, 0.00795657621090674, 0.005143711694873175, 0.006124589782183648, 0.00584252565249223, 0.005777930511871651, 0.005160180713889346, 0.007172344247175263],
					trains: []
				},
				{	
					name: "3",
					color: "#EE352E",
					total: 0.29053349212834034,
					stations: ["Harlem-148th St", "145th St-Lenox Av", "135th St-Lenox Av", "125th St-Lenox Av", "116th St-Lenox Av", "Central Park North-110th St", "96th St-Broadway", "72nd St-Broadway", "Times Square-42nd St", "34th St-Penn Station-7th Av", "14th St-7th Av", "Chambers St-Varick St", "Park Place", "Fulton St", "Wall St", "Clark St", "Borough Hall-Court St", "Hoyt St", "Nevins St", "Atlantic Av", "Bergen St-Flatbush Av", "Grand Army Plaza", "Eastern Parkway-Brooklyn Museum", "Franklin Av-Bedford Av", "Nostrand Av-Eastern Parkway", "Kingston Av", "Crown Heights-Utica Av", "Sutter Av-Rutland Rd", "Saratoga Av", "Rockaway Av-Livonia Av", "Junius St", "Pennsylvania Av", "Van Siclen Av-Livonia Av", "New Lots Av-Livonia Av"],
					distances: [0.0034663101419258086, 0.00766919089604972, 0.008015687743414449, 0.007003373187264954, 0.0037370226116559178, 0.021139426127488852, 0.018228048853354314, 0.022870067358879025, 0.007401464990121945, 0.015525461184782456, 0.024116536422131768, 0.002469282081896362, 0.0042697570188519884, 0.003623515696119569, 0.01854627242870249, 0.005851330532450806, 0.00541509713670912, 0.005118371811434292, 0.00522572483009955, 0.0040491264490027145, 0.006907354052024385, 0.007419686314122451, 0.006378915346677095, 0.007710346944195382, 0.008317074545780847, 0.009232657526417172, 0.011145520355714393, 0.007080239049654258, 0.007461928504073358, 0.006570400063921751, 0.007634599138124732, 0.005559909711509693, 0.005373793073788713],
					trains: []
				},
				{	
					name: "4",
					color: "#00933C",
					total: 0.3736794944712881,
					stations: ["Woodlawn", "Mosholu Parkway", "Bedford Park Blvd-Lehman College", "Kingsbridge Rd-Jerome Av", "Fordham Rd-Jerome Av", "183rd St-Jerome Av", "Burnside Av-Jerome Av", "176th St-Jerome Av", "Mt Eden Av-Jerome Av", "170th St-Jerome Av", "167th St-Jerome Av", "161st St-Yankee Stadium", "149th St-Grand Concourse", "138th St-Grand Concourse", "125th St-Lexington Av", "116th St-Lexington Av", "110th St-Lexington Av", "103rd St-Lexington Av", "96th St-Lexington Av", "86th St-Lexington Av", "77th St-Lexington Av", "68th St-Hunter College", "Lexington Av-59th St", "51st St-Lexington Av", "Grand Central-42nd St", "33rd St-Park Av", "28th St-Park Av", "23rd St-Park Av", "14th St-Union Square", "Astor Place", "Broadway-Lafayette St-Bleecker St", "Spring St-LaFayette St", "Canal St-Broadway", "Brooklyn Bridge-City Hall", "Fulton St", "Wall St-Broadway", "Bowling Green", "Borough Hall-Court St", "Nevins St", "Atlantic Av", "Bergen St-Flatbush Av", "Grand Army Plaza", "Eastern Parkway-Brooklyn Museum", "Franklin Av-Bedford Av", "Nostrand Av-Eastern Parkway", "Kingston Av", "Crown Heights-Utica Av", "Sutter Av-Rutland Rd", "Saratoga Av", "Rockaway Av-Livonia Av", "Junius St", "Pennsylvania Av", "Van Siclen Av-Livonia Av", "New Lots Av-Livonia Av"],
					distances: [0.008624591874404152, 0.008332318104823568, 0.009082797146271573, 0.006282630738782845, 0.005236300316063526, 0.006246610360828877, 0.006451575699002713, 0.004972725309127361, 0.005352393576701213, 0.00579813116444124, 0.008736041723802523, 0.009680439039623505, 0.005724753706497796, 0.01193902931565556, 0.0068215548081005375, 0.004467389618112092, 0.0054732425489857775, 0.0060981675936348, 0.007655962447657062, 0.007269223411063058, 0.006781405237855282, 0.006950800961042783, 0.006707590476467362, 0.007259803371990387, 0.007730783207418817, 0.003722024314799484, 0.0039661897332357865, 0.006179189671792403, 0.004752612123867871, 0.006999071724175149, 0.0031391057643820803, 0.005400836231544577, 0.007316368088065826, 0.003877051585932277, 0.005608080063613499, 0.0035157942203826948, 0.026943681355745246, 0.01051595193029026, 0.00522572483009955, 0.0040491264490027145, 0.006907354052024385, 0.007419686314122451, 0.006378915346677095, 0.007710346944195382, 0.008317074545780847, 0.009232657526417172, 0.011145520355714393, 0.007080239049654258, 0.007461928504073358, 0.006570400063921751, 0.007634599138124732, 0.005559909711509693, 0.005373793073788713],
					trains: []
				},
				{	
					name: "5",
					color: "#00933C",
					total: 0.38215953322612806,
					stations: ["Eastchester-Dyre Av", "Baychester Av", "Gun Hill Rd", "Pelham Parkway", "Morris Park", "East 180th St", "West Farms Square-East Tremont Av", "174th St", "Freeman St", "Simpson St", "Intervale Av", "Prospect Av-Bronx", "Jackson Av", "3rd Av-149th St", "149th St-Grand Concourse", "138th St-Grand Concourse", "125th St-Lexington Av", "86th St-Lexington Av", "Lexington Av-59th St", "Grand Central-42nd St", "14th St-Union Square", "Brooklyn Bridge-City Hall", "Fulton St", "Wall St-Broadway", "Bowling Green", "Borough Hall-Court St", "Nevins St", "Atlantic Av", "Franklin Av-Bedford Av", "President St", "Sterling St", "Winthrop St", "Church Av-Nostrand Av", "Beverly Rd-Nostrand Av", "Newkirk Av", "Flatbush Av-Brooklyn College"],
					distances: [0.01237104757083698, 0.012008980722778739, 0.013844251731324366, 0.006908844838313091, 0.01800885751511938, 0.006753037983012972, 0.008252349604805495, 0.008383447143029351, 0.00604019875500894, 0.00413076845151829, 0.005663953742747028, 0.006784128094317362, 0.009957291850687746, 0.009857970987995315, 0.005724753706497796, 0.01193902931565556, 0.030516312703207375, 0.02100142947515674, 0.013943982967570366, 0.021545329377852845, 0.026384257616997444, 0.003877051585932277, 0.005608080063613499, 0.0035157942203826948, 0.026943681355745246, 0.01051595193029026, 0.00522572483009955, 0.02327516627223942, 0.00795657621090674, 0.005143711694873175, 0.006124589782183648, 0.00584252565249223, 0.005777930511871651, 0.005160180713889346, 0.007172344247175263],
					trains: []
				},
				{	
					name: "6",
					color: "#00933C",
					total: 0.24207707402691986,
					stations: ["Pelham Bay Park", "Buhre Av", "Middletown Rd", "Westchester Square-East Tremont Av", "Zerega Av", "Castle Hill Av", "Parkchester-East 177th St", "Saint Lawrence Av", "Morrison Av-Soundview Av", "Elder Av", "Whitlock Av", "Hunts Point Av", "Longwood Av", "East 149th St", "East 143rd St-Saint Mary's St", "Cypress Av", "Brook Av", "3rd Av-138th St", "125th St-Lexington Av", "116th St-Lexington Av", "110th St-Lexington Av", "103rd St-Lexington Av", "96th St-Lexington Av", "86th St-Lexington Av", "77th St-Lexington Av", "68th St-Hunter College", "Lexington Av-59th St", "51st St-Lexington Av", "Grand Central-42nd St", "33rd St-Park Av", "28th St-Park Av", "23rd St-Park Av", "14th St-Union Square", "Astor Place", "Broadway-Lafayette St-Bleecker St", "Spring St-LaFayette St", "Canal St-Broadway", "Brooklyn Bridge-City Hall"],
					distances: [0.007192343707038328, 0.004771773045725993, 0.0077282430733044616, 0.00531660342699727, 0.004744352959054907, 0.009649024665731169, 0.007015361216636058, 0.007178756716877486, 0.004736604057755883, 0.00741558204055239, 0.0070215158619574515, 0.00762294772382199, 0.008637694426189248, 0.00492134961162566, 0.007210924073932239, 0.005643616570969281, 0.007486688453501998, 0.013092371061056918, 0.0068215548081005375, 0.004467389618112092, 0.0054732425489857775, 0.0060981675936348, 0.007655962447657062, 0.007269223411063058, 0.006781405237855282, 0.006950800961042783, 0.006707590476467362, 0.007259803371990387, 0.007730783207418817, 0.003722024314799484, 0.0039661897332357865, 0.006179189671792403, 0.004752612123867871, 0.006999071724175149, 0.0031391057643820803, 0.005400836231544577, 0.007316368088065826],
					trains: []
				},
				{	
					name: "7",
					color: "#B933AD",
					total: 0.181651083896736,
					stations: ["Flushing-Main St", "Mets-Willets Point", "111th St-Roosevelt Av", "103rd St-Corona Plaza", "Junction Blvd", "90th St-Elmhurst Av", "82nd St-Jackson Heights", "74th St-Broadway", "69th St", "Woodside-61st St", "Lincoln Av-52nd St", "Bliss St-46th St", "Lowery St-40th St", "33rd St-Rawson St", "Queensboro Plaza", "Court Square", "Hunters Point Av", "Vernon Blvd-Jackson Av", "Grand Central-42nd St", "5th Av-Bryant Park", "Times Square-42nd St", "34th St-Hudson Yards"],
					distances: [0.016370232405199556, 0.010130564890463593, 0.00759843279894326, 0.0068648619068432185, 0.00712422381737043, 0.007123486295343904, 0.007739607871212465, 0.005036229740586245, 0.0066175966936702305, 0.009678976495467955, 0.005973213958998978, 0.005618608546600415, 0.0070273748299240135, 0.010985083067497287, 0.005422331970649243, 0.0066832103064336824, 0.004682982489838415, 0.025001515734044074, 0.005508652285260841, 0.004782572529510221, 0.015681325262877986],
					trains: []
				},
				{	
					name: "A",
					color: "#0039A6",
					total: 0.38367344856369406,
					stations: ["Inwood-207th St", "Dyckman St-Broadway", "190th St-Fort Washington Av", "181st St-Fort Washington Av", "175th St-Fort Washington Av", "Washington Heights-168th St", "163rd St-Amsterdam Av", "155th St-Fort Washington Av", "145th St-Saint Nicholas Av", "135th St-Saint Nicholas Av", "125th St-Saint Nicholas Av", "116th St-Saint Nicholas Av", "Cathedral Parkway-110th St-Saint Nicholas Av", "103rd St-Saint Nicholas Av", "96th St-Saint Nicholas Av", "86th St-Saint Nicholas Av", "81st St-Museum of Natural History", "72nd St-Saint Nicholas Av", "59th St-Columbus Circle", "50th St-8th Av", "42nd St-Port Authority Bus Terminal", "34th St-Penn Station-8th Av", "23rd St-8th Av", "14th St-8th Av", "West 4th St", "Spring St-6th Av", "Canal St-6th Av", "Chambers St-Church St", "Fulton St", "High St", "Jay St-MetroTech", "Hoyt St-Schermerhorn St", "Lafayette Av", "Clinton-Washington Avs-Fulton St", "Franklin Av-Fulton St", "Nostrand Av-Fulton St", "Kingston-Throop Avs", "Utica Av", "Ralph Av", "Rockaway Av-Fulton St", "Broadway Junction-East New York", "Liberty Av", "Van Siclen Av-Pitkin Av", "Shepherd Av", "Euclid Av", "Grant Av", "80th St-Hudson St", "88th St-Boyd Av", "Rockaway Blvd", "104th St-Oxford Av", "111th St-Greenwood Av", "Ozone Park-Lefferts Blvd"],
					distances: [0.0078107582858599105, 0.009464789590884828, 0.00824872414377144, 0.004640543179414914, 0.006673532273095101, 0.004717626203929419, 0.005729389932619678, 0.006339639500790815, 0.007697000064959738, 0.00825044610914561, 0.006537208655081004, 0.005550006846842234, 0.005588451037631434, 0.005504265709428317, 0.007153207182793565, 0.005484774744697042, 0.007231957549650905, 0.009189002666225387, 0.007069561938343529, 0.007128772124280367, 0.005554354147875754, 0.007895546909497233, 0.006200433049385576, 0.008638058230873937, 0.006918660058134248, 0.005604686342699039, 0.007505138572997002, 0.005108739668457497, 0.018943807457838538, 0.007691275706933807, 0.004509278988923241, 0.011306399338432766, 0.00859430997811722, 0.009185085138420116, 0.0064907201449539145, 0.009581957680956998, 0.010144303327487612, 0.009957761445218243, 0.008853130745688085, 0.006630002714924585, 0.009552857582945185, 0.006455410443952209, 0.00971236654991492, 0.008733484127202481, 0.0072502430993790015, 0.0064895526039903464, 0.007536794278733852, 0.007639508164812677, 0.00630177943123562, 0.006110220945275482, 0.00656792394899157],
					trains: []
				},
				{	
					name: "AR",
					color: "#0039A6",
					total: 0.14894671753695204,
					stations: ["Rockaway Blvd", "Aqueduct Racetrack", "Aqueduct-North Conduit Av", "Howard Beach-JFK Airport", "Broad Channel", "Beach 67th St", "Beach 60th St", "Beach 44th St", "Beach 36th St", "Beach 25th St", "Far Rockaway-Mott Av"],
					distances: [0.011554846818536118, 0.004273537761625216, 0.00861983833954538, 0.05404122696608937, 0.025801453951270894, 0.008525691350267333, 0.012521934435218813, 0.008213480930764383, 0.00826619065833235, 0.007128516325302191],
					trains: []
				},
				{	
					name: "B",
					color: "#FF6319",
					total: 0.359327918403705,
					stations: ["Bedford Park Blvd-Grand Concourse", "Kingsbridge Rd-Grand Concourse", "Fordham Rd-Grand Concourse", "182nd-183rd Sts-Grand Concourse", "Tremont Av-Grand Concourse", "174-175th Sts-Grand Concourse", "170th St-Grand Concourse", "167th St-Grand Concourse", "161st St-Yankee Stadium", "155th St", "145th St-Saint Nicholas Av", "135th St-Saint Nicholas Av", "125th St-Saint Nicholas Av", "116th St-Saint Nicholas Av", "Cathedral Parkway-110th St-Saint Nicholas Av", "103rd St-Saint Nicholas Av", "96th St-Saint Nicholas Av", "86th St-Saint Nicholas Av", "81st St-Museum of Natural History", "72nd St-Saint Nicholas Av", "59th St-Columbus Circle", "7th Av-53rd St", "47-50th Sts-Rockefeller Center", "42nd St-Bryant Park", "34th St-Herald Square", "West 4th St", "Broadway-Lafayette St-Bleecker St", "Grand St", "DeKalb Av", "Atlantic Av", "7th Av-Flatbush Av", "Prospect Park", "Church Av-East 15th St", "Newkirk Plaza", "Kings Highway", "Sheepshead Bay", "Brighton Beach"],
					distances: [0.008936016841975444, 0.007089620864335955, 0.006001939103321899, 0.007240213049359144, 0.006666211892817914, 0.007357617277353599, 0.00748193778375681, 0.009300562187310804, 0.012754460553072777, 0.008045368419156353, 0.007697000064959738, 0.00825044610914561, 0.006537208655081004, 0.005550006846842234, 0.005588451037631434, 0.005504265709428317, 0.007153207182793565, 0.005484774744697042, 0.007231957549650905, 0.009189002666225387, 0.005392910995003206, 0.004210280869490392, 0.005497279418036581, 0.005555675026499727, 0.0215099685029901, 0.008245505563637318, 0.007445018535906287, 0.030096984317371855, 0.007904111651532762, 0.008681337972918398, 0.018458188887323618, 0.011111402476740579, 0.015446156350368596, 0.026892140580475555, 0.02206618038990095, 0.011754508326593086],
					trains: []
				},
				{	
					name: "C",
					color: "#0039A6",
					total: 0.29893907861824925,
					stations: ["Washington Heights-168th St", "163rd St-Amsterdam Av", "155th St-Fort Washington Av", "145th St-Saint Nicholas Av", "135th St-Saint Nicholas Av", "125th St-Saint Nicholas Av", "116th St-Saint Nicholas Av", "Cathedral Parkway-110th St-Saint Nicholas Av", "103rd St-Saint Nicholas Av", "96th St-Saint Nicholas Av", "86th St-Saint Nicholas Av", "81st St-Museum of Natural History", "72nd St-Saint Nicholas Av", "59th St-Columbus Circle", "50th St-8th Av", "42nd St-Port Authority Bus Terminal", "34th St-Penn Station-8th Av", "23rd St-8th Av", "14th St-8th Av", "West 4th St", "Spring St-6th Av", "Canal St-6th Av", "Chambers St-Church St", "Fulton St", "High St", "Jay St-MetroTech", "Hoyt St-Schermerhorn St", "Lafayette Av", "Clinton-Washington Avs-Fulton St", "Franklin Av-Fulton St", "Nostrand Av-Fulton St", "Kingston-Throop Avs", "Utica Av", "Ralph Av", "Rockaway Av-Fulton St", "Broadway Junction-East New York", "Liberty Av", "Van Siclen Av-Pitkin Av", "Shepherd Av", "Euclid Av"],
					distances: [0.004717626203929419, 0.005729389932619678, 0.006339639500790815, 0.007697000064959738, 0.00825044610914561, 0.006537208655081004, 0.005550006846842234, 0.005588451037631434, 0.005504265709428317, 0.007153207182793565, 0.005484774744697042, 0.007231957549650905, 0.009189002666225387, 0.007069561938343529, 0.007128772124280367, 0.005554354147875754, 0.007895546909497233, 0.006200433049385576, 0.008638058230873937, 0.006918660058134248, 0.005604686342699039, 0.007505138572997002, 0.005108739668457497, 0.018943807457838538, 0.007691275706933807, 0.004509278988923241, 0.011306399338432766, 0.00859430997811722, 0.009185085138420116, 0.0064907201449539145, 0.009581957680956998, 0.010144303327487612, 0.009957761445218243, 0.008853130745688085, 0.006630002714924585, 0.009552857582945185, 0.006455410443952209, 0.00971236654991492, 0.008733484127202481],
					trains: []
				},
				{	
					name: "D",
					color: "#FF6319",
					total: 0.38199660204922226,
					stations: ["Norwood-205th St", "Bedford Park Blvd-Grand Concourse", "Kingsbridge Rd-Grand Concourse", "Fordham Rd-Grand Concourse", "182nd-183rd Sts-Grand Concourse", "Tremont Av-Grand Concourse", "174-175th Sts-Grand Concourse", "170th St-Grand Concourse", "167th St-Grand Concourse", "161st St-Yankee Stadium", "155th St", "145th St-Saint Nicholas Av", "125th St-Saint Nicholas Av", "59th St-Columbus Circle", "7th Av-53rd St", "47-50th Sts-Rockefeller Center", "42nd St-Bryant Park", "34th St-Herald Square", "West 4th St", "Broadway-Lafayette St-Bleecker St", "Grand St", "DeKalb Av", "Atlantic Av-Barclays Center", "Union St", "9th St", "Prospect Av-Brooklyn", "25th St", "36th St-Brooklyn", "9th Av-West End Line", "Fort Hamilton Parkway-West End Line", "50th St-West End Line", "55th St-West End Line", "62nd St-West End Line", "71st St-West End Line", "79th St-West End Line", "18th Av-West End Line", "20th Av-West End Line", "Bay Parkway-West End Line", "25th Av-West End Line", "Bay 50th St-West End Line", "Coney Island-Stillwell Av"],
					distances: [0.008429921589180567, 0.008936016841975444, 0.007089620864335955, 0.006001939103321899, 0.007240213049359144, 0.006666211892817914, 0.007357617277353599, 0.00748193778375681, 0.009300562187310804, 0.012754460553072777, 0.008045368419156353, 0.015906803732989402, 0.05208149805833044, 0.005392910995003206, 0.004210280869490392, 0.005497279418036581, 0.005555675026499727, 0.0215099685029901, 0.008245505563637318, 0.007445018535906287, 0.030096984317371855, 0.007592835899710367, 0.007668930825093803, 0.00829486738893222, 0.007099463993862129, 0.007239354252961165, 0.0075752077859363495, 0.01278509010527223, 0.00537803718842017, 0.004679410753506709, 0.004873381782698811, 0.005161872722185867, 0.0071590956132772995, 0.006333424034432069, 0.0056601311822285245, 0.004927172414269753, 0.0051866521957828855, 0.008061851028145127, 0.009377679083862575, 0.011696349216747604],
					trains: []
				},
				{	
					name: "E",
					color: "#0039A6",
					total: 0.2639761521708484,
					stations: ["Jamaica Center-Parsons-Archer", "Sutphin Blvd-Archer Av-JFK Airport", "Jamaica-Van Wyck", "Briarwood", "Kew Gardens-Union Turnpike", "75th Av", "Forest Hills-71st Av", "67th Av", "63rd Dr-Rego Park", "Woodhaven Blvd-Queens Blvd", "Grand Av-Newtown", "Elmhurst Av", "Jackson Heights-Roosevelt Av", "65th St", "Northern Blvd", "46th St", "Steinway St", "36th St-Queens", "Queens Plaza", "Court Square-23rd St", "Lexington Av-53rd St", "5th Av-53rd St", "7th Av-53rd St", "50th St-8th Av", "42nd St-Port Authority Bus Terminal", "34th St-Penn Station-8th Av", "23rd St-8th Av", "14th St-8th Av", "West 4th St", "Spring St-6th Av", "Canal St-6th Av", "World Trade Center"],
					distances: [0.0070582236433796445, 0.009130087622801687, 0.007585050691987724, 0.011685760565747886, 0.007417813424454272, 0.007942695323373807, 0.009516061580295507, 0.009486071578909353, 0.00829266091191391, 0.00889855701785018, 0.0072501832390687365, 0.010219449153450006, 0.007731354991200618, 0.008209169568236679, 0.00808883539206167, 0.00742867000208801, 0.009385269362155026, 0.00900032221644398, 0.00825463148783398, 0.02601675464004131, 0.006700357154668496, 0.006956262933510361, 0.004365918574581335, 0.007128772124280367, 0.005554354147875754, 0.007895546909497233, 0.006200433049385576, 0.008638058230873937, 0.006918660058134248, 0.005604686342699039, 0.009415480232047966],
					trains: []
				},
				{	
					name: "F",
					color: "#FF6319",
					total: 0.4303156340587864,
					stations: ["Jamaica-179th St", "169th St", "Parsons Blvd", "Sutphin Blvd", "Briarwood", "Kew Gardens-Union Turnpike", "75th Av", "Forest Hills-71st Av", "Jackson Heights-Roosevelt Av", "21st St-Queensbridge", "Roosevelt Island", "Lexington Av-63rd St", "57th St", "47-50th Sts-Rockefeller Center", "42nd St-Bryant Park", "34th St-Herald Square", "23rd St-6th Av", "14th St-6th Av", "West 4th St", "Broadway-Lafayette St-Bleecker St", "2nd Av", "Delancey St", "East Broadway", "York St", "Jay St-MetroTech", "Bergen St-Smith St", "Carroll St", "Smith-9th Sts", "4th Av", "7th Av-9th St", "15th St-Prospect Park", "Fort Hamilton Parkway-McDonald Av", "Church Av-McDonald Av", "Ditmas Av-McDonald Av", "18th Av-McDonald Av", "Av I-McDonald Av", "Bay Parkway-McDonald Av", "Av N-McDonald Av", "Av P-McDonald Av", "Kings Highway-McDonald Av", "Av U-McDonald Av", "Av X-McDonald Av", "Neptune Av-Van Siclen", "West 8th St-New York Aquarium", "Coney Island-Stillwell Av"],
					distances: [0.01002598349290457, 0.010147025179823797, 0.007675984627398816, 0.010543667151413355, 0.011685760565747886, 0.007417813424454272, 0.007942695323373807, 0.05305170777647805, 0.05204980773259082, 0.011536166607671913, 0.013970498344726563, 0.011358900695051598, 0.006575113839322943, 0.005497279418036581, 0.005555675026499727, 0.008472265635591579, 0.005753350675903934, 0.007284359683592435, 0.008245505563637318, 0.006546279935965403, 0.005126466326815389, 0.005311336649093813, 0.01435366601255887, 0.007419088488485501, 0.007123457657635264, 0.007186901975112211, 0.006784441760384614, 0.007009655055701703, 0.010284195495999831, 0.005961558521063536, 0.01027861751404102, 0.007788882140588598, 0.008063877479231986, 0.006476333607830743, 0.004512629499535307, 0.004634067112156798, 0.005729234678386464, 0.006306428545538369, 0.005765019514277822, 0.007223000207665745, 0.00650459053285256, 0.008615094717990237, 0.005071161701225324, 0.005450088164429272],
					trains: []
				},
				{	
					name: "G",
					color: "#6CBE45",
					total: 0.15765743597476994,
					stations: ["Court Square", "21st St", "Greenpoint Av", "Nassau Av", "Metropolitan Av", "Broadway-Union Av", "Flushing Av-Union Av", "Myrtle-Willoughby Avs", "Bedford-Nostrand Avs", "Classon Av", "Clinton-Washington Avs-LaFayette Av", "Fulton St-LaFayette Av", "Hoyt St-Schermerhorn St", "Bergen St-Smith St", "Carroll St", "Smith-9th Sts", "4th Av", "7th Av-9th St", "15th St-Prospect Park", "Fort Hamilton Parkway-McDonald Av", "Church Av-McDonald Av"],
					distances: [0.006396153922482268, 0.013562669132580942, 0.007428302161331254, 0.011843839326839266, 0.006791325349296324, 0.005715479070030934, 0.005929234773563184, 0.0066669376028343965, 0.006591268466689946, 0.0068142510226561785, 0.00859093685229765, 0.009722299162236487, 0.006310486669039609, 0.007186901975112211, 0.006784441760384614, 0.007009655055701703, 0.010284195495999831, 0.005961558521063536, 0.01027861751404102, 0.007788882140588598],
					trains: []
				},
				{	
					name: "J",
					color: "#996633",
					total: 0.23580616763663073,
					stations: ["Jamaica Center-Parsons-Archer", "Sutphin Blvd-Archer Av-JFK Airport", "121st St", "111th St-Jamaica Av", "104th St-102nd St", "Woodhaven Blvd-Jamaica Av", "85th St-Forest Parkway", "75th St-Elderts Lane", "Cypress Hills", "Crescent St", "Norwood Av", "Cleveland St", "Van Siclen Av-Fulton St", "Alabama Av", "Broadway Junction-East New York", "Chauncey St", "Halsey St", "Gates Av", "Kosciuszko St", "Myrtle Av", "Flushing Av", "Lorimer St", "Hewes St", "Marcy Av", "Essex St", "Bowery", "Canal St-Broadway", "Chambers St-Broadway", "Fulton St", "Broad St"],
					distances: [0.0070582236433796445, 0.020325000885608836, 0.008617892839900556, 0.00829323971679097, 0.007361515944407086, 0.008556722035928365, 0.00721505107396316, 0.005584944941547354, 0.006859098628825551, 0.006503473840960363, 0.004827045576747889, 0.007306594966191824, 0.0070420295369932, 0.006795822834664286, 0.006870522614759929, 0.007023968821125893, 0.006575950197490386, 0.007523488552531716, 0.007859063175728268, 0.006263447133960692, 0.007244888197891954, 0.006729229524988961, 0.004575084370819073, 0.031305340375077616, 0.0067694688861142, 0.007895986892084332, 0.006490957710541274, 0.004969389197877817, 0.005362725519729551],
					trains: []
				},
				{	
					name: "L",
					color: "#A7A9AC",
					total: 0.1630212634171846,
					stations: ["8th Av-14th St", "6th Av-14th St", "14th St-Union Square", "3rd Av-14th St", "1st Av-14th St", "Bedford Av-Bushwick Av", "Lorimer St-Bushwick Av", "Graham Av-Bushwick Av", "Grand St-Bushwick Av", "Montrose Av-Bushwick Av", "Morgan Av", "Jefferson St-Wyckoff Av", "DeKalb Av-Wyckoff Av", "Myrtle-Wyckoff Avs", "Halsey St-Wyckoff Av", "Wilson Av", "Bushwick Av-Aberdeen St", "Broadway Junction-East New York", "Atlantic Av-Van Sinderen Av", "Sutter Av", "Livonia Av", "New Lots Av-Van Sinderen Av", "East 105th St", "Canarsie-Rockaway Parkway"],
					distances: [0.006285748006404024, 0.007335084798418944, 0.004241251819925944, 0.00487758669835378, 0.028269325018466126, 0.0073501353729098174, 0.006242218195490443, 0.004290572222906756, 0.004266540636161586, 0.006888307339253781, 0.010244109575771277, 0.005287698932416525, 0.007921359100561172, 0.008603542758656112, 0.006838105585614074, 0.0060556943449986125, 0.004495499304861588, 0.0037226444901441265, 0.006082381770330867, 0.005510849027142319, 0.0054713751470771175, 0.008163921177955384, 0.004577312093364234],
					trains: []
				},
				{	
					name: "M",
					color: "#FF6319",
					total: 0.30808605030212416,
					stations: ["Forest Hills-71st Av", "67th Av", "63rd Dr-Rego Park", "Woodhaven Blvd-Queens Blvd", "Grand Av-Newtown", "Elmhurst Av", "Jackson Heights-Roosevelt Av", "65th St", "Northern Blvd", "46th St", "Steinway St", "36th St-Queens", "Queens Plaza", "Court Square-23rd St", "Lexington Av-53rd St", "5th Av-53rd St", "47-50th Sts-Rockefeller Center", "42nd St-Bryant Park", "34th St-Herald Square", "23rd St-6th Av", "14th St-6th Av", "West 4th St", "Broadway-Lafayette St-Bleecker St", "Essex St", "Marcy Av", "Hewes St", "Lorimer St", "Flushing Av", "Myrtle Av", "Central Av", "Knickerbocker Av", "Seneca Av", "Forest Av", "Fresh Pond Rd", "Middle Village-Metropolitan Av"],
					distances: [0.009516061580295507, 0.009486071578909353, 0.00829266091191391, 0.00889855701785018, 0.0072501832390687365, 0.010219449153450006, 0.007731354991200618, 0.008209169568236679, 0.00808883539206167, 0.00742867000208801, 0.009385269362155026, 0.00900032221644398, 0.00825463148783398, 0.02601675464004131, 0.006700357154668496, 0.006287530596352439, 0.005497279418036581, 0.005555675026499727, 0.008472265635591579, 0.005753350675903934, 0.007284359683592435, 0.008245505563637318, 0.01120752483825413, 0.031305340375077616, 0.004575084370819073, 0.006729229524988961, 0.007244888197891954, 0.006263447133960692, 0.008285535589215331, 0.007728249801850396, 0.012653001422594335, 0.004949998989898857, 0.007412703218126445, 0.008156731943614883],
					trains: []
				},
				{	
					name: "N",
					color: "#FCCC0A",
					total: 0.3154325948827193,
					stations: ["Astoria-Ditmars Blvd", "Astoria Blvd", "30th Av-Grand Av", "Broadway", "36th Av-Washington Av", "39th Av-Beebe Av", "Queensboro Plaza", "Lexington Av-59th St", "5th Av-59th St", "57th St-7th Av", "49th St", "Times Square-42nd St", "34th St-Herald Square", "28th St-Broadway", "23rd St-Broadway", "14th St-Union Square", "8th St-New York University", "Prince St", "Canal St-Broadway", "Atlantic Av-Barclays Center", "36th St-Brooklyn", "59th St", "8th Av-Sea Beach", "Fort Hamilton Parkway-Sea Beach", "New Utrecht Av-Sea Beach", "18th Av-Sea Beach", "20th Av-Sea Beach", "Bay Parkway-Sea Beach", "Kings Highway-Sea Beach", "Av U-Sea Beach", "86th St-Sea Beach", "Coney Island-Stillwell Av"],
					distances: [0.007521553363500709, 0.005032289439209082, 0.006389407014731796, 0.006457611400510904, 0.005049206274262656, 0.007794088080074434, 0.03022506180308214, 0.007871140514561323, 0.005289822681343189, 0.005899451669431855, 0.004440588249315129, 0.006463631487025998, 0.004313241124721487, 0.004241566927443464, 0.006657728516547932, 0.005103989518005708, 0.007856419668026771, 0.006296708108205971, 0.04258406446078165, 0.03775609361415476, 0.019883403833344845, 0.00881107530328247, 0.007353849876081067, 0.011126002876144223, 0.007257338492862623, 0.0062979889647437354, 0.006434571392094864, 0.008032352644150727, 0.006563623694275495, 0.004837783893481553, 0.015590939997320823],
					trains: []
				},
				{	
					name: "Q",
					color: "#FCCC0A",
					total: 0.2719767650117563,
					stations: ["96th St-2nd Av", "86th St-2nd Av", "72nd St-2nd Av", "Lexington Av-63rd St", "57th St-7th Av", "49th St", "Times Square-42nd St", "34th St-Herald Square", "28th St-Broadway", "23rd St-Broadway", "14th St-Union Square", "8th St-New York University", "Prince St", "Canal St-Broadway", "DeKalb Av", "Atlantic Av-Barclays Center", "7th Av-Flatbush Av", "Prospect Park", "Parkside Av", "Church Av-East 15th St", "Beverly Rd-East 15th St", "Cortelyou Rd", "Newkirk Plaza", "Av H", "Av J", "Av M", "Kings Highway", "Av U", "Neck Rd", "Sheepshead Bay", "Brighton Beach", "Ocean Parkway", "West 8th St-New York Aquarium", "Coney Island-Stillwell Av"],
					distances: [0.0077218923198926715, 0.011320177604612677, 0.008719714960937448, 0.014548047051074757, 0.005899451669431855, 0.004440588249315129, 0.006463631487025998, 0.004313241124721487, 0.004241566927443464, 0.006657728516547932, 0.005103989518005708, 0.007856419668026771, 0.006296708108205971, 0.03511111027866079, 0.007592835899710367, 0.009234917704016594, 0.018458188887323618, 0.006366449952678971, 0.00499163239833186, 0.006669191555202154, 0.0031616478298545914, 0.005947237089608041, 0.005925458632038805, 0.004312801525684487, 0.007552645695386588, 0.009101589366702861, 0.00954227043213142, 0.004126104700558748, 0.008410382631009591, 0.011754508326593086, 0.007244246406632419, 0.007440300329960214, 0.005450088164429272],
					trains: []
				},
				{	
					name: "R",
					color: "#FCCC0A",
					total: 0.34828987120696536,
					stations: ["Forest Hills-71st Av", "67th Av", "63rd Dr-Rego Park", "Woodhaven Blvd-Queens Blvd", "Grand Av-Newtown", "Elmhurst Av", "Jackson Heights-Roosevelt Av", "65th St", "Northern Blvd", "46th St", "Steinway St", "36th St-Queens", "Queens Plaza", "Lexington Av-59th St", "5th Av-59th St", "57th St-7th Av", "49th St", "Times Square-42nd St", "34th St-Herald Square", "28th St-Broadway", "23rd St-Broadway", "14th St-Union Square", "8th St-New York University", "Prince St", "Canal St-Broadway", "City Hall", "Cortlandt St", "Rector St", "Whitehall St-South Ferry", "Borough Hall-Court St", "DeKalb Av", "Union St", "4th Av", "Prospect Av-Brooklyn", "25th St", "36th St-Brooklyn", "45th St", "53rd St", "59th St", "Bay Ridge Av", "77th St", "86th St", "Bay Ridge-95th St"],
					distances: [0.009516061580295507, 0.009486071578909353, 0.00829266091191391, 0.00889855701785018, 0.0072501832390687365, 0.010219449153450006, 0.007731354991200618, 0.008209169568236679, 0.00808883539206167, 0.00742867000208801, 0.009385269362155026, 0.00900032221644398, 0.03358047029153603, 0.007871140514561323, 0.005289822681343189, 0.005899451669431855, 0.004440588249315129, 0.006463631487025998, 0.004313241124721487, 0.004241566927443464, 0.006657728516547932, 0.005103989518005708, 0.007856419668026771, 0.006296708108205971, 0.008128421371954311, 0.004821161374598503, 0.004151948096976804, 0.004147624983053818, 0.0252176354561648, 0.008512830903997355, 0.0133809400641361, 0.009700180256061432, 0.005759063552353588, 0.007239354252961165, 0.0075752077859363495, 0.008955159071726162, 0.00558584675764899, 0.005342401894286244, 0.008432202618527349, 0.005643608242963268, 0.007623225629612851, 0.006551695124167645],
					trains: []
				},
				{	
					name: "S",
					color: "#808183",
					total: 0.01028114828216636,
					stations: ["Times Square-42nd St", "Grand Central-42nd St"],
					distances: [0.01028114828216636],
					trains: []
				},
				{	
					name: "FS",
					color: "#808183",
					total: 0.02060019167965711,
					stations: ["Franklin Av-Fulton St", "Park Place-Franklin Av", "Botanic Gardens", "Prospect Park"],
					distances: [0.006653408149213678, 0.0047163208118106, 0.009230462718632834],
					trains: []
				},
				{	
					name: "RS",
					color: "#808183",
					total: 0.04357696553024275,
					stations: ["Broad Channel", "Beach 90th St", "Beach 98th St", "Beach 105th St", "Rockaway Park-Beach 116th St"],
					distances: [0.020475784722443637, 0.007435147476685861, 0.007308598018763013, 0.008357435312350232],
					trains: []
				},
				{	
					name: "W",
					color: "#FCCC0A",
					total: 0.15415266166658392,
					stations: ["Astoria-Ditmars Blvd", "Astoria Blvd", "30th Av-Grand Av", "Broadway", "36th Av-Washington Av", "39th Av-Beebe Av", "Queensboro Plaza", "Lexington Av-59th St", "5th Av-59th St", "57th St-7th Av", "49th St", "Times Square-42nd St", "34th St-Herald Square", "28th St-Broadway", "23rd St-Broadway", "14th St-Union Square", "8th St-New York University", "Prince St", "Canal St-Broadway", "City Hall", "Cortlandt St", "Rector St", "Whitehall St-South Ferry"],
					distances: [0.007521553363500709, 0.005032289439209082, 0.006389407014731796, 0.006457611400510904, 0.005049206274262656, 0.007794088080074434, 0.03022506180308214, 0.007871140514561323, 0.005289822681343189, 0.005899451669431855, 0.004440588249315129, 0.006463631487025998, 0.004313241124721487, 0.004241566927443464, 0.006657728516547932, 0.005103989518005708, 0.007856419668026771, 0.006296708108205971, 0.008128421371954311, 0.004821161374598503, 0.004151948096976804, 0.004147624983053818],
					trains: []
				},
				{	
					name: "Z",
					color: "#996633",
					total: 0.23368606815190623,
					stations: ["Jamaica Center-Parsons-Archer", "Sutphin Blvd-Archer Av-JFK Airport", "121st St", "104th St-102nd St", "Woodhaven Blvd-Jamaica Av", "75th St-Elderts Lane", "Crescent St", "Norwood Av", "Van Siclen Av-Fulton St", "Alabama Av", "Broadway Junction-East New York", "Gates Av", "Myrtle Av", "Marcy Av", "Essex St", "Bowery", "Canal St-Broadway", "Chambers St-Broadway", "Fulton St", "Broad St"],
					distances: [0.0070582236433796445, 0.020325000885608836, 0.016893545868181238, 0.007361515944407086, 0.015771334566232444, 0.01050077216208819, 0.006503473840960363, 0.012131125133307661, 0.0070420295369932, 0.006795822834664286, 0.020372474861925317, 0.015382545238039362, 0.024754335054693787, 0.031305340375077616, 0.0067694688861142, 0.007895986892084332, 0.006490957710541274, 0.004969389197877817, 0.005362725519729551],
					trains: []
				}
			]

		/* stations */
			var stations = [
				[ ["2 Avenue", "96th St-2nd Av"], ["40.7841", "-73.9472"], ["Q", null, null, null, null, null, null, null, null, null, null] ],
				[ ["2 Avenue", "86th St-2nd Av"], ["40.777861", "-73.95175"], ["Q", null, null, null, null, null, null, null, null, null, null] ],
				[ ["2 Avenue", "72nd St-2nd Av"], ["40.7687", "-73.9584"], ["Q", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "25th St"], ["40.660397", "-73.998091"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "36th St-Brooklyn"], ["40.655144", "-74.003549"], ["N", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "45th St"], ["40.648939", "-74.010006"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "53rd St"], ["40.645069", "-74.014034"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "59th St"], ["40.641362", "-74.017881"], ["N", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "77th St"], ["40.629742", "-74.02551"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "86th St"], ["40.622687", "-74.028398"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "Bay Ridge-95th St"], ["40.616622", "-74.030876"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "9th St"], ["40.670847", "-73.988302"], ["F", "G", "R", null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "Atlantic Av-Barclays Center"], ["40.683666", "-73.97881"], ["B", "Q", "D", "N", "R", "2", "3", "4", "5", null, null] ],
				[ ["4 Avenue", "Bay Ridge Av"], ["40.634967", "-74.023377"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "DeKalb Av"], ["40.690635", "-73.981824"], ["B", "Q", "R", null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "Prospect Av-Brooklyn"], ["40.665414", "-73.992872"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["4 Avenue", "Union St"], ["40.677316", "-73.98311"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["42nd St Shuttle", "Times Square-42nd St"], ["40.755983", "-73.986229"], ["N", "Q", "R", "GS", "1", "2", "3", "7", null, null, null] ],
				[ ["42nd St Shuttle", "42nd St-Port Authority Bus Terminal"], ["40.7572", "-73.9908"], ["A", "C", "E", null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "14th St-6th Av"], ["40.738228", "-73.996209"], ["F", "L", "M", "1", "2", "3", null, null, null, null, null] ],
				[ ["6 Avenue", "23rd St-6th Av"], ["40.742878", "-73.992821"], ["F", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "2nd Av"], ["40.723402", "-73.989938"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "34th St-Herald Square"], ["40.749719", "-73.987823"], ["B", "D", "F", "M", "N", "Q", "R", null, null, null, null] ],
				[ ["6 Avenue", "42nd St-Bryant Park"], ["40.754222", "-73.984569"], ["B", "D", "F", "M", "7", null, null, null, null, null, null] ],
				[ ["6 Avenue", "47-50th Sts-Rockefeller Center"], ["40.758663", "-73.981329"], ["B", "D", "F", "M", null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "4th Av"], ["40.670272", "-73.989779"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "57th St"], ["40.763972", "-73.97745"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "7th Av-9th St"], ["40.666271", "-73.980305"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Bergen St-Smith St"], ["40.686145", "-73.990862"], ["F", "G", null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Broadway-Lafayette St-Bleecker St"], ["40.725297", "-73.996204"], ["B", "D", "F", "M", "6", null, null, null, null, null, null] ],
				[ ["6 Avenue", "Carroll St"], ["40.680303", "-73.995048"], ["F", "G", null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Church Av-McDonald Av"], ["40.644041", "-73.979678"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Delancey St"], ["40.718611", "-73.988114"], ["F", "J", "M", "Z", null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "East Broadway"], ["40.713715", "-73.990173"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Fort Hamilton Parkway-McDonald Av"], ["40.650782", "-73.975776"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Grand St"], ["40.718267", "-73.993753"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "15th St-Prospect Park"], ["40.660365", "-73.979493"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "Smith-9th Sts"], ["40.67358", "-73.995959"], ["F", "G", "R", null, null, null, null, null, null, null, null] ],
				[ ["6 Avenue", "York St"], ["40.699743", "-73.986885"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["63rd Street", "21st St-Queensbridge"], ["40.754203", "-73.942836"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["63rd Street", "Lexington Av-63rd St"], ["40.764627", "-73.96611"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["63rd Street", "Roosevelt Island"], ["40.759145", "-73.95326"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "103rd St-Saint Nicholas Av"], ["40.796092", "-73.961454"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "116th St-Saint Nicholas Av"], ["40.805085", "-73.954882"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "125th St-Saint Nicholas Av"], ["40.811109", "-73.952343"], ["A", "B", "C", "D", null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "135th St-Saint Nicholas Av"], ["40.817894", "-73.947649"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "145th St-Saint Nicholas Av"], ["40.824783", "-73.944216"], ["A", "B", "C", "D", null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "14th St-8th Av"], ["40.740893", "-74.00169"], ["A", "C", "E", "L", null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "155th St-Fort Washington Av"], ["40.830518", "-73.941514"], ["C", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "163rd St-Amsterdam Av"], ["40.836013", "-73.939892"], ["C", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "Washington Heights-168th St"], ["40.840719", "-73.939561"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "175th St-Fort Washington Av"], ["40.847391", "-73.939704"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "181st St-Fort Washington Av"], ["40.851695", "-73.937969"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "190th St-Fort Washington Av"], ["40.859022", "-73.93418"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "23rd St-8th Av"], ["40.745906", "-73.998041"], ["C", "E", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "34th St-Penn Station-8th Av"], ["40.752287", "-73.993391"], ["A", "C", "E", null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "50th St-8th Av"], ["40.762456", "-73.985984"], ["C", "E", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "72nd St-Saint Nicholas Av"], ["40.775594", "-73.97641"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "81st St-Museum of Natural History"], ["40.781433", "-73.972143"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "86th St-Saint Nicholas Av"], ["40.785868", "-73.968916"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "96th St-Saint Nicholas Av"], ["40.791646", "-73.964699"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "Canal St-6th Av"], ["40.720824", "-74.005229"], ["A", "C", "E", null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "Cathedral Parkway-110th St-Saint Nicholas Av"], ["40.800605", "-73.958158"], ["B", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "Chambers St-Church St"], ["40.714111", "-74.008585"], ["A", "C", "E", "2", "3", null, null, null, null, null, null] ],
				[ ["8 Avenue", "Dyckman St-Broadway"], ["40.865491", "-73.927271"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "High St"], ["40.699337", "-73.990531"], ["A", "C", "J", "Z", "2", "3", "4", "5", null, null, null] ],
				[ ["8 Avenue", "Inwood-207th St"], ["40.868072", "-73.919899"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "Spring St-6th Av"], ["40.726227", "-74.003739"], ["C", "E", null, null, null, null, null, null, null, null, null] ],
				[ ["8 Avenue", "West 4th St"], ["40.732338", "-74.000495"], ["A", "B", "C", "D", "E", "F", "M", null, null, null, null] ],
				[ ["8 Avenue", "World Trade Center"], ["40.712582", "-74.009781"], ["A", "C", "E", "2", "3", null, null, null, null, null, null] ],
				[ ["Archer Av", "Jamaica-Van Wyck"], ["40.702566", "-73.816859"], ["E", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Archer Av", "Jamaica Center-Parsons-Archer"], ["40.702147", "-73.801109"], ["E", "J", "Z", null, null, null, null, null, null, null, null] ],
				[ ["Archer Av", "Sutphin Blvd-Archer Av-JFK Airport"], ["40.700486", "-73.807969"], ["E", "J", "Z", null, null, null, null, null, null, null, null] ],
				[ ["Astoria", "30th Av-Grand Av"], ["40.766779", "-73.921479"], ["N", "W", null, null, null, null, null, null, null, null, null] ],
				[ ["Astoria", "36th Av-Washington Av"], ["40.756804", "-73.929575"], ["N", "W", null, null, null, null, null, null, null, null, null] ],
				[ ["Astoria", "39th Av-Beebe Av"], ["40.752882", "-73.932755"], ["N", "W", null, null, null, null, null, null, null, null, null] ],
				[ ["Astoria", "Astoria Blvd"], ["40.770258", "-73.917843"], ["N", "W", null, null, null, null, null, null, null, null, null] ],
				[ ["Astoria", "Broadway"], ["40.76182", "-73.925508"], ["N", "W", null, null, null, null, null, null, null, null, null] ],
				[ ["Astoria", "Astoria-Ditmars Blvd"], ["40.775036", "-73.912034"], ["N", "W", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "7th Av-Flatbush Av"], ["40.67705", "-73.972367"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Atlantic Av"], ["40.68446", "-73.97689"], ["B", "Q", "D", "N", "R", "2", "3", "4", "5", null, null] ],
				[ ["Brighton", "Av H"], ["40.62927", "-73.961639"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Av J"], ["40.625039", "-73.960803"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Av M"], ["40.617618", "-73.959399"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Av U"], ["40.5993", "-73.955929"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Beverly Rd-East 15th St"], ["40.644031", "-73.964492"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Brighton Beach"], ["40.577621", "-73.961376"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Church Av-East 15th St"], ["40.650527", "-73.962982"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Cortelyou Rd"], ["40.640927", "-73.963891"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Kings Highway"], ["40.60867", "-73.957734"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Neck Rd"], ["40.595246", "-73.955161"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Newkirk Plaza"], ["40.635082", "-73.962793"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Ocean Parkway"], ["40.576312", "-73.968501"], ["Q", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Parkside Av"], ["40.655292", "-73.961495"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Prospect Park"], ["40.661614", "-73.962246"], ["B", "Q", "FS", null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Sheepshead Bay"], ["40.586896", "-73.954155"], ["B", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Brighton", "Coney Island-Stillwell Av"], ["40.577422", "-73.981233"], ["D", "F", "N", "Q", null, null, null, null, null, null, null] ],
				[ ["Broadway", "23rd St-Broadway"], ["40.741303", "-73.989344"], ["N", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "28th St-Broadway"], ["40.745494", "-73.988691"], ["N", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "34th St-Herald Square"], ["40.749567", "-73.98795"], ["B", "D", "F", "M", "N", "Q", "R", null, null, null, null] ],
				[ ["Broadway", "49th St"], ["40.759901", "-73.984139"], ["N", "Q", "R", null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "57th St-7th Av"], ["40.764664", "-73.980658"], ["N", "Q", "R", "W", null, null, null, null, null, null, null] ],
				[ ["Broadway", "8th St-New York University"], ["40.730328", "-73.992629"], ["N", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "Canal St-Broadway"], ["40.719527", "-74.001775"], ["J", "N", "Q", "R", "Z", "6", null, null, null, null, null] ],
				[ ["Broadway", "City Hall"], ["40.713282", "-74.006978"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "Cortlandt St"], ["40.710668", "-74.011029"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "Lexington Av-63rd St"], ["40.76266", "-73.967258"], ["N", "Q", "R", "4", "5", "6", null, null, null, null, null] ],
				[ ["Broadway", "Prince St"], ["40.724329", "-73.997702"], ["N", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "Rector St"], ["40.70722", "-74.013342"], ["R", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway", "Whitehall St-South Ferry"], ["40.703087", "-74.012994"], ["R", "1", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "104th St-102nd St"], ["40.695178", "-73.84433"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "111th St-Jamaica Av"], ["40.697418", "-73.836345"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "121st St"], ["40.700492", "-73.828294"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Alabama Av"], ["40.676992", "-73.898654"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Chauncey St"], ["40.682893", "-73.910456"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Cleveland St"], ["40.679947", "-73.884639"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Crescent St"], ["40.683194", "-73.873785"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Cypress Hills"], ["40.689941", "-73.87255"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "75th St-Elderts Lane"], ["40.691324", "-73.867139"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Flushing Av"], ["40.70026", "-73.941126"], ["J", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "85th St-Forest Parkway"], ["40.692435", "-73.86001"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Gates Av"], ["40.68963", "-73.92227"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Halsey St"], ["40.68637", "-73.916559"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Hewes St"], ["40.70687", "-73.953431"], ["J", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Kosciuszko St"], ["40.693342", "-73.928814"], ["J", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Lorimer St"], ["40.703869", "-73.947408"], ["J", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Marcy Av"], ["40.708359", "-73.957757"], ["J", "M", "Z", null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Myrtle Av"], ["40.697207", "-73.935657"], ["J", "M", "Z", null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Norwood Av"], ["40.68141", "-73.880039"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Van Siclen Av-Fulton St"], ["40.678024", "-73.891688"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway Jamaica", "Woodhaven Blvd-Jamaica Av"], ["40.693879", "-73.851576"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "103rd St-Broadway"], ["40.799446", "-73.968379"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "116th St-Columbia University"], ["40.807722", "-73.96411"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "125th St-Broadway"], ["40.815581", "-73.958372"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "137th St-City College"], ["40.822008", "-73.953676"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "145th St-Broadway"], ["40.826551", "-73.95036"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "14th St-7th Av"], ["40.737826", "-74.000201"], ["F", "L", "M", "1", "2", "3", null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "157th St-Broadway"], ["40.834041", "-73.94489"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "181st St-Saint Nicholas Av"], ["40.849505", "-73.933596"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "18th St-7th Av"], ["40.74104", "-73.997871"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "191st St-Saint Nicholas Av"], ["40.855225", "-73.929412"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "207th St"], ["40.864614", "-73.918819"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "215th St"], ["40.869444", "-73.915279"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "231st St"], ["40.878856", "-73.904834"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "238th St"], ["40.884667", "-73.90087"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "23rd St-7th Av"], ["40.744081", "-73.995657"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "28th St-7th Av"], ["40.747215", "-73.993365"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "34th St-Penn Station-7th Av"], ["40.750373", "-73.991057"], ["1", "2", "3", null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "50th St-Broadway"], ["40.761728", "-73.983849"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "59th St-Columbus Circle"], ["40.768247", "-73.981929"], ["A", "B", "C", "D", "1", null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "66th St-Lincoln Center"], ["40.77344", "-73.982209"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "72nd St-Broadway"], ["40.778453", "-73.98197"], ["1", "2", "3", null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "79th St-Broadway"], ["40.783934", "-73.979917"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "86th St-Broadway"], ["40.788644", "-73.976218"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "96th St-Broadway"], ["40.793919", "-73.972323"], ["1", "2", "3", null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Canal St-Varick St"], ["40.722854", "-74.006277"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Cathedral Parkway-110th St-Broadway"], ["40.803967", "-73.966847"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Chambers St-Varick St"], ["40.715478", "-74.009266"], ["1", "2", "3", null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Christopher St-Sheridan Square"], ["40.733422", "-74.002906"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Dyckman St-Saint Nicholas Av"], ["40.860531", "-73.925536"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Franklin St-Varick St"], ["40.719318", "-74.006886"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Houston St"], ["40.728251", "-74.005367"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Marble Hill-225th St"], ["40.874561", "-73.909831"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Rector St-Varick St"], ["40.707513", "-74.013783"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "South Ferry"], ["40.702068", "-74.013664"], ["R", "1", null, null, null, null, null, null, null, null, null] ],
				[ ["Broadway-7th Ave", "Van Cortlandt Park-242nd St"], ["40.889248", "-73.898583"], ["1", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "1st Av-14th St"], ["40.730953", "-73.981628"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "3rd Av-14th St"], ["40.732849", "-73.986122"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "6th Av-14th St"], ["40.737335", "-73.996786"], ["F", "L", "M", "1", "2", "3", null, null, null, null, null] ],
				[ ["Canarsie", "8th Av-14th St"], ["40.739777", "-74.002578"], ["A", "C", "E", "L", null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Atlantic Av-Van Sinderen Av"], ["40.675345", "-73.903097"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Bedford Av-Bushwick Av"], ["40.717304", "-73.956872"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Bushwick Av-Aberdeen St"], ["40.682829", "-73.905249"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Canarsie-Rockaway Parkway"], ["40.646654", "-73.90185"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "DeKalb Av-Wyckoff Av"], ["40.703811", "-73.918425"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "East 105th St"], ["40.650573", "-73.899485"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Graham Av-Bushwick Av"], ["40.714565", "-73.944053"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Grand St-Bushwick Av"], ["40.711926", "-73.94067"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Halsey St-Wyckoff Av"], ["40.695602", "-73.904084"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Jefferson St-Wyckoff Av"], ["40.706607", "-73.922913"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Livonia Av"], ["40.664038", "-73.900571"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Lorimer St-Bushwick Av"], ["40.714063", "-73.950275"], ["G", "L", null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Montrose Av-Bushwick Av"], ["40.707739", "-73.93985"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Morgan Av"], ["40.706152", "-73.933147"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Myrtle-Wyckoff Avs"], ["40.699814", "-73.911586"], ["L", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "New Lots Av-Van Sinderen Av"], ["40.658733", "-73.899232"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Sutter Av"], ["40.669367", "-73.901975"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Canarsie", "Wilson Av"], ["40.688764", "-73.904046"], ["L", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Clark", "Clark St"], ["40.697466", "-73.993086"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Clark", "Fulton St"], ["40.709416", "-74.006571"], ["A", "C", "J", "Z", "2", "3", "4", "5", null, null, null] ],
				[ ["Clark", "Park Place"], ["40.713051", "-74.008811"], ["A", "C", "E", "1", "2", "3", null, null, null, null, null] ],
				[ ["Clark", "Wall St"], ["40.706821", "-74.0091"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "155th St"], ["40.830135", "-73.938209"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "167th St-Grand Concourse"], ["40.833769", "-73.918432"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "170th St-Grand Concourse"], ["40.839306", "-73.9134"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "174-175th Sts-Grand Concourse"], ["40.8459", "-73.910136"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "182nd-183rd Sts-Grand Concourse"], ["40.856093", "-73.900741"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "Bedford Park Blvd-Grand Concourse"], ["40.873244", "-73.887138"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "Fordham Rd-Grand Concourse"], ["40.861296", "-73.897749"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "Kingsbridge Rd-Grand Concourse"], ["40.866978", "-73.893509"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "Norwood-205th St"], ["40.874811", "-73.878855"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "Tremont Av-Grand Concourse"], ["40.85041", "-73.905227"], ["B", "D", null, null, null, null, null, null, null, null, null] ],
				[ ["Concourse", "161st St-Yankee Stadium"], ["40.827905", "-73.925651"], ["B", "D", "4", null, null, null, null, null, null, null, null] ],
				[ ["Coney Island", "West 8th St-New York Aquarium"], ["40.576127", "-73.975939"], ["F", "Q", null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "21st St"], ["40.744065", "-73.949724"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Bedford-Nostrand Avs"], ["40.689627", "-73.953522"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Broadway-Union Av"], ["40.706092", "-73.950308"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Classon Av"], ["40.688873", "-73.96007"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Clinton-Washington Avs-LaFayette Av"], ["40.688089", "-73.966839"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Flushing Av-Union Av"], ["40.700377", "-73.950234"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Fulton St-LaFayette Av"], ["40.687119", "-73.975375"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Greenpoint Av"], ["40.731352", "-73.954449"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Court Square"], ["40.746554", "-73.943832"], ["7", "G", null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Metropolitan Av"], ["40.712792", "-73.951418"], ["G", "L", null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Myrtle-Willoughby Avs"], ["40.694568", "-73.949046"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Crosstown", "Nassau Av"], ["40.724635", "-73.951277"], ["G", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "18th Av-McDonald Av"], ["40.629755", "-73.976971"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Av I-McDonald Av"], ["40.625322", "-73.976127"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Av N-McDonald Av"], ["40.61514", "-73.974197"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Av P-McDonald Av"], ["40.608944", "-73.973022"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Av U-McDonald Av"], ["40.596063", "-73.973357"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Av X-McDonald Av"], ["40.58962", "-73.97425"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Bay Parkway-McDonald Av"], ["40.620769", "-73.975264"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Ditmas Av-McDonald Av"], ["40.636119", "-73.978172"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Kings Highway-McDonald Av"], ["40.603217", "-73.972361"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Culver", "Neptune Av-Van Siclen"], ["40.581011", "-73.974574"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Dyre Av", "Baychester Av"], ["40.878663", "-73.838591"], ["5", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Dyre Av", "Eastchester-Dyre Av"], ["40.8883", "-73.830834"], ["5", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Dyre Av", "Gun Hill Rd"], ["40.869526", "-73.846384"], ["5", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Dyre Av", "Morris Park"], ["40.854364", "-73.860495"], ["5", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Dyre Av", "Pelham Parkway"], ["40.858985", "-73.855359"], ["5", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Atlantic Av-Barclays Ctr"], ["40.684359", "-73.977666"], ["B", "D", "N", "Q", "R", "2", "3", "4", "5", null, null] ],
				[ ["Eastern Parkway", "Bergen St-Flatbush Av"], ["40.680829", "-73.975098"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Eastern Parkway-Brooklyn Museum"], ["40.671987", "-73.964375"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Franklin Av-Bedford Av"], ["40.670682", "-73.958131"], ["FS", "2", "3", "4", "5", null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Grand Army Plaza"], ["40.675235", "-73.971046"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Hoyt St"], ["40.690545", "-73.985065"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Kingston Av"], ["40.669399", "-73.942161"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Nevins St"], ["40.688246", "-73.980492"], ["2", "3", "4", "5", null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Nostrand Av-Eastern Parkway"], ["40.669847", "-73.950466"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Eastern Parkway", "Crown Heights-Utica Av"], ["40.668897", "-73.932942"], ["3", "4", null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "103rd St-Corona Plaza"], ["40.749865", "-73.8627"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "111th St-Roosevelt Av"], ["40.75173", "-73.855334"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Court Square-23rd St"], ["40.747023", "-73.945264"], ["E", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "5th Av-Bryant Park"], ["40.753821", "-73.981963"], ["B", "D", "F", "M", "7", null, null, null, null, null, null] ],
				[ ["Flushing", "82nd St-Jackson Heights"], ["40.747659", "-73.883697"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "90th St-Elmhurst Av"], ["40.748408", "-73.876613"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Bliss St-46th St"], ["40.743132", "-73.918435"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "74th St-Broadway"], ["40.746848", "-73.891394"], ["E", "F", "M", "R", "7", null, null, null, null, null, null] ],
				[ ["Flushing", "69th St"], ["40.746325", "-73.896403"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Flushing-Main St"], ["40.7596", "-73.83003"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Hunters Point Av"], ["40.742216", "-73.948916"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Junction Blvd"], ["40.749145", "-73.869527"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Lincoln Av-52nd St"], ["40.744149", "-73.912549"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Lowery St-40th St"], ["40.743781", "-73.924016"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Mets-Willets Point"], ["40.754622", "-73.845625"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Queensboro Plaza"], ["40.750582", "-73.940202"], ["N", "Q", "7", null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "33rd St-Rawson St"], ["40.744587", "-73.930997"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Vernon Blvd-Jackson Av"], ["40.742626", "-73.953581"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "Woodside-61st St"], ["40.74563", "-73.902984"], ["7", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Franklin", "Botanic Gardens"], ["40.670343", "-73.959245"], ["FS", "2", "3", "4", "5", null, null, null, null, null, null] ],
				[ ["Franklin", "Park Place-Franklin Av"], ["40.674772", "-73.957624"], ["FS", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Broadway Junction-East New York"], ["40.678334", "-73.905316"], ["A", "C", "J", "L", null, null, null, null, null, null, null] ],
				[ ["Fulton", "Clinton-Washington Avs-Fulton St"], ["40.683263", "-73.965838"], ["C", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Euclid Av"], ["40.675377", "-73.872106"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Franklin Av-Fulton St"], ["40.68138", "-73.956848"], ["A", "C", "FS", null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Hoyt St-Schermerhorn St"], ["40.688484", "-73.985001"], ["A", "C", "G", null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Jay St-MetroTech"], ["40.692338", "-73.987342"], ["A", "C", "F", "R", null, null, null, null, null, null, null] ],
				[ ["Fulton", "Kingston-Throop Avs"], ["40.679921", "-73.940858"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Lafayette Av"], ["40.686113", "-73.973946"], ["C", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Liberty Av"], ["40.674542", "-73.896548"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Nostrand Av-Fulton St"], ["40.680438", "-73.950426"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Ralph Av"], ["40.678822", "-73.920786"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Rockaway Av-Fulton St"], ["40.67834", "-73.911946"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Shepherd Av"], ["40.67413", "-73.88075"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Utica Av"], ["40.679364", "-73.930729"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Fulton", "Van Siclen Av-Pitkin Av"], ["40.67271", "-73.890358"], ["A", "C", null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "138th St-Grand Concourse"], ["40.813224", "-73.929849"], ["4", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "149th St-Grand Concourse"], ["40.818375", "-73.927351"], ["2", "4", "5", null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "167th St-Jerome Av"], ["40.835537", "-73.9214"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "170th St-Jerome Av"], ["40.840075", "-73.917791"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "176th St-Jerome Av"], ["40.84848", "-73.911794"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "183rd St-Jerome Av"], ["40.858407", "-73.903879"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Bedford Park Blvd-Lehman College"], ["40.873412", "-73.890064"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Burnside Av-Jerome Av"], ["40.853453", "-73.907684"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Fordham Rd-Jerome Av"], ["40.862803", "-73.901034"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Kingsbridge Rd-Jerome Av"], ["40.86776", "-73.897174"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Mosholu Parkway"], ["40.87975", "-73.884655"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Mt Eden Av-Jerome Av"], ["40.844434", "-73.914685"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Woodlawn"], ["40.886037", "-73.878751"], ["4", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Jerome", "Yankee Stadium-161st St"], ["40.827994", "-73.925831"], ["B ", "D", "4", null, null, null, null, null, null, null, null] ],
				[ ["Lenox", "Central Park North-110th St"], ["40.799075", "-73.951822"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Lenox", "116th St-Lenox Av"], ["40.802098", "-73.949625"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Lenox", "125th St-Lenox Av"], ["40.807754", "-73.945495"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Lenox", "135th St-Lenox Av"], ["40.814229", "-73.94077"], ["2", "3", null, null, null, null, null, null, null, null, null] ],
				[ ["Lenox", "145th St-Lenox Av"], ["40.820421", "-73.936245"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lenox", "Harlem-148th St"], ["40.82388", "-73.93647"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "103rd St-Lexington Av"], ["40.7906", "-73.947478"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "110th St-Lexington Av"], ["40.79502", "-73.94425"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "116th St-Lexington Av"], ["40.798629", "-73.941617"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "125th St-Lexington Av"], ["40.804138", "-73.937594"], ["4", "5", "6", null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "14th St-Union Square"], ["40.734673", "-73.989951"], ["L", "N", "Q", "R", "4", "5", "6", null, null, null, null] ],
				[ ["Lexington", "23rd St-Park Av"], ["40.739864", "-73.986599"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "28th St-Park Av"], ["40.74307", "-73.984264"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "33rd St-Park Av"], ["40.746081", "-73.982076"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "51st St-Lexington Av"], ["40.757107", "-73.97192"], ["E", "M", "6", null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "5th Av-59th St"], ["40.765144","-73.975390"], ["N", "R", "W", null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "Lexington Av-59th St"], ["40.762526", "-73.967967"], ["N", "Q", "R", "4", "5", "6", null, null, null, null, null] ],
				[ ["Lexington", "68th St-Hunter College"], ["40.768141", "-73.96387"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "77th St-Lexington Av"], ["40.77362", "-73.959874"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "86th St-Lexington Av"], ["40.779492", "-73.955589"], ["4", "5", "6", null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "96th St-Lexington Av"], ["40.785672", "-73.95107"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "Astor Place"], ["40.730054", "-73.99107"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "Borough Hall-Court St"], ["40.692404", "-73.990151"], ["R", "2", "3", "4", "5", null, null, null, null, null, null] ],
				[ ["Lexington", "Bowling Green"], ["40.704817", "-74.014065"], ["4", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "Brooklyn Bridge-City Hall"], ["40.712868", "-74.004806"], ["J", "Z", "4", "5", "6", null, null, null, null, null, null] ],
				[ ["Lexington", "Grand Central-42nd St"], ["40.751776", "-73.976848"], ["GS", "4", "5", "6", "7", null, null, null, null, null, null] ],
				[ ["Lexington", "Spring St-LaFayette St"], ["40.722301", "-73.997141"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Lexington", "Wall St-Broadway"], ["40.707557", "-74.011862"], ["4", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "104th St-Oxford Av"], ["40.681711", "-73.837683"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "111th St-Greenwood Av"], ["40.684331", "-73.832163"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "80th St-Hudson St"], ["40.679371", "-73.858992"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "88th St-Boyd Av"], ["40.679843", "-73.85147"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "Grant Av"], ["40.677044", "-73.86505"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "Ozone Park-Lefferts Blvd"], ["40.685951", "-73.825798"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Liberty", "Rockaway Blvd"], ["40.680429", "-73.843853"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Myrtle", "Central Av"], ["40.697857", "-73.927397"], ["M", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Myrtle", "Forest Av"], ["40.704423", "-73.903077"], ["M", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Myrtle", "Fresh Pond Rd"], ["40.706186", "-73.895877"], ["M", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Myrtle", "Knickerbocker Av"], ["40.698664", "-73.919711"], ["M", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Myrtle", "Middle Village-Metropolitan Av"], ["40.711396", "-73.889601"], ["M", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Myrtle", "Seneca Av"], ["40.702762", "-73.90774"], ["M", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Nassau", "Bowery"], ["40.72028", "-73.993915"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Nassau", "Broad St"], ["40.706476", "-74.011056"], ["J", "Z", null, null, null, null, null, null, null, null, null] ],
				[ ["Nassau", "Chambers St-Broadway"], ["40.713243", "-74.003401"], ["J", "Z", "4", "5", "6", null, null, null, null, null, null] ],
				[ ["Nassau", "Essex St"], ["40.718315", "-73.987437"], ["F", "J", "M", "Z", null, null, null, null, null, null, null] ],
				[ ["New Lots", "Junius St"], ["40.663515", "-73.902447"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["New Lots", "New Lots Av-Livonia Av"], ["40.666235", "-73.884079"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["New Lots", "Pennsylvania Av"], ["40.664635", "-73.894895"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["New Lots", "Rockaway Av-Livonia Av"], ["40.662549", "-73.908946"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["New Lots", "Saratoga Av"], ["40.661453", "-73.916327"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["New Lots", "Sutter Av-Rutland Rd"], ["40.664717", "-73.92261"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["New Lots", "Van Siclen Av-Livonia Av"], ["40.665449", "-73.889395"], ["3", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "Beverly Rd-Nostrand Av"], ["40.645098", "-73.948959"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "Church Av-Nostrand Av"], ["40.650843", "-73.949575"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "Flatbush Av-Brooklyn College"], ["40.632836", "-73.947642"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "Newkirk Av"], ["40.639967", "-73.948411"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "President St"], ["40.667883", "-73.950683"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "Sterling St"], ["40.662742", "-73.95085"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Nostrand", "Winthrop St"], ["40.656652", "-73.9502"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "3rd Av-138th St"], ["40.810476", "-73.926138"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Brook Av"], ["40.807566", "-73.91924"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Buhre Av"], ["40.84681", "-73.832569"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Castle Hill Av"], ["40.834255", "-73.851222"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Cypress Av"], ["40.805368", "-73.914042"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "East 143rd St-Saint Mary's St"], ["40.808719", "-73.907657"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "East 149th St"], ["40.812118", "-73.904098"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Elder Av"], ["40.828584", "-73.879159"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Hunts Point Av"], ["40.820948", "-73.890549"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Longwood Av"], ["40.816104", "-73.896435"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Middletown Rd"], ["40.843863", "-73.836322"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Morrison Av-Soundview Av"], ["40.829521", "-73.874516"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Parkchester-East 177th St"], ["40.833226", "-73.860816"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Pelham Bay Park"], ["40.852462", "-73.828121"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Saint Lawrence Av"], ["40.831509", "-73.867618"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Westchester Square-East Tremont Av"], ["40.839892", "-73.842952"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Whitlock Av"], ["40.826525", "-73.886283"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Pelham", "Zerega Av"], ["40.836488", "-73.847036"], ["6", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "169th St"], ["40.71047", "-73.793604"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "36th St-Queens"], ["40.752039", "-73.928781"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "46th St"], ["40.756312", "-73.913333"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "5th Av-53rd St"], ["40.760167", "-73.975224"], ["E", "M", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "63rd Dr-Rego Park"], ["40.729846", "-73.861604"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "65th St"], ["40.749669", "-73.898453"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "67th Av"], ["40.726523", "-73.852719"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "75th Av"], ["40.718331", "-73.837324"], ["E", "F", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "7th Av-53rd St"], ["40.762862", "-73.981637"], ["B", "D", "E", null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Briarwood"], ["40.709179", "-73.820574"], ["E", "F", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Elmhurst Av"], ["40.742454", "-73.882017"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Forest Hills-71st Av"], ["40.721691", "-73.844521"], ["E", "F", "M", "R", null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Grand Av-Newtown"], ["40.737015", "-73.877223"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Jackson Heights-Roosevelt Av"], ["40.746644", "-73.891338"], ["E", "F", "M", "R", "7", null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Jamaica-179th St"], ["40.712646", "-73.783817"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Kew Gardens-Union Turnpike"], ["40.714441", "-73.831008"], ["E", "F", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Lexington Av-53rd St"], ["40.757552", "-73.969055"], ["E", "M", "6", null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Northern Blvd"], ["40.752885", "-73.906006"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Parsons Blvd"], ["40.707564", "-73.803326"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Queens Plaza"], ["40.748973", "-73.937243"], ["E", "M", "R", null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Steinway St"], ["40.756879", "-73.92074"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Sutphin Blvd"], ["40.70546", "-73.810708"], ["F", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Queens Boulevard", "Woodhaven Blvd-Queens Blvd"], ["40.733106", "-73.869229"], ["M", "R", null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Aqueduct Racetrack"], ["40.672131", "-73.835812"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Aqueduct-North Conduit Av"], ["40.668234", "-73.834058"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 105th St"], ["40.583209", "-73.827559"], ["H", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 25th St"], ["40.600066", "-73.761353"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 36th St"], ["40.595398", "-73.768175"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 44th St"], ["40.592943", "-73.776013"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 60th St"], ["40.592374", "-73.788522"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 67th St"], ["40.590927", "-73.796924"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 90th St"], ["40.588034", "-73.813641"], ["H", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Beach 98th St"], ["40.585307", "-73.820558"], ["H", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Broad Channel"], ["40.608382", "-73.815925"], ["A", "H", null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Far Rockaway-Mott Av"], ["40.603995", "-73.755405"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Howard Beach-JFK Airport"], ["40.660476", "-73.830301"], ["A", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Rockaway", "Rockaway Park-Beach 116th St"], ["40.580903", "-73.835592"], ["H", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "18th Av-Sea Beach"], ["40.620671", "-73.990414"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "20th Av-Sea Beach"], ["40.61741", "-73.985026"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "86th St-Sea Beach"], ["40.592721", "-73.97823"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "8th Av-Sea Beach"], ["40.635064", "-74.011719"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "Av U-Sea Beach"], ["40.597473", "-73.979137"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "Bay Parkway-Sea Beach"], ["40.611815", "-73.981848"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "Fort Hamilton Parkway-Sea Beach"], ["40.631386", "-74.005351"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "Kings Highway-Sea Beach"], ["40.603923", "-73.980353"], ["N", null, null, null, null, null, null, null, null, null, null] ],
				[ ["Sea Beach", "New Utrecht Av-Sea Beach"], ["40.624842", "-73.996353"], ["D", "N", null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "18th Av-West End Line"], ["40.607954", "-74.001736"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "20th Av-West End Line"], ["40.604556", "-73.998168"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "25th Av-West End Line"], ["40.597704", "-73.986829"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "50th St-West End Line"], ["40.63626", "-73.994791"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "55th St-West End Line"], ["40.631435", "-73.995476"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "62nd St-West End Line"], ["40.626472", "-73.996895"], ["D", "N", null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "71st St-West End Line"], ["40.619589", "-73.998864"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "79th St-West End Line"], ["40.613501", "-74.00061"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "9th Av-West End Line"], ["40.646292", "-73.994324"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "Bay 50th St-West End Line"], ["40.588841", "-73.983765"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "Bay Parkway-West End Line"], ["40.601875", "-73.993728"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["West End", "Fort Hamilton Parkway-West End Line"], ["40.640914", "-73.994304"], ["D", null, null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "3rd Av-149th St"], ["40.816109", "-73.917757"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "174th St"], ["40.837288", "-73.887734"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "219th St"], ["40.883895", "-73.862633"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "225th St"], ["40.888022", "-73.860341"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "233rd St"], ["40.893193", "-73.857473"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "238th St-Nereid Av"], ["40.898379", "-73.854376"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Allerton Av"], ["40.865462", "-73.867352"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Bronx Park East"], ["40.848828", "-73.868457"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Burke Av"], ["40.871356", "-73.867164"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "East 180th St"], ["40.841894", "-73.873488"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "West Farms Square-East Tremont Av"], ["40.840295", "-73.880049"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Freeman St"], ["40.829993", "-73.891865"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Gun Hill Rd-White Plains Rd"], ["40.87785", "-73.866256"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Intervale Av"], ["40.822181", "-73.896736"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Jackson Av"], ["40.81649", "-73.907807"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Pelham Parkway-White Plains Rd"], ["40.857192", "-73.867615"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Prospect Av-Bronx"], ["40.819585", "-73.90177"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Simpson St"], ["40.824073", "-73.893064"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["White Plains Road", "Wakefield-241st St"], ["40.903125", "-73.85062"], ["2", "5", null, null, null, null, null, null, null, null, null] ],
				[ ["Flushing", "34th St-Hudson Yards"], ["40.755882", "-74.00191"], ["7", null, null, null, null, null, null, null, null, null, null] ]
			]
		
		/* build and refresh */
			window.refresh = setInterval(refreshTrains, 3000)
			buildMap()

	/*** math ***/
		/* getDistance */
			function getDistance(x1, y1, x2, y2) {
				//calculate change in x and y
					var xDiff = ((10000000 * x1) - (10000000 * x2)) / 10000000
					var yDiff = ((10000000 * y1) - (10000000 * y2)) / 10000000

				//use pythagorean theorem to calculate hypotenuse
					var distance = Math.pow(Math.pow(xDiff, 2) + Math.pow(yDiff, 2), 0.5)

				//return values
					return distance
			}

		/* getPoint */
			function getPoint(x1, y1, x2, y2, d, direction) {
				//get slope and ...r?
					var m = getLineEquation(x1, y1, x2, y2).m
					var r = Math.pow(1 + Math.pow(m, 2), 0.5)

				//calculate x and y
					var x = ((x2 * 10000000) + (d * direction * 10000000     / r)) / 10000000
					var y = ((y2 * 10000000) + (d * direction * 10000000 * m / r)) / 10000000

				//return point
					return [x, y]
			}

		/* getLineEquation */
			function getLineEquation(x1, y1, x2, y2) {
				//convert to numbers
					x1 = Number(x1)
					y1 = Number(y1)
					x2 = Number(x2)
					y2 = Number(y2)

				//get slope and y-intercept
					var m = ((y2 * 10000000) - (y1 * 10000000)) / ((x2 * 10000000) - (x1 * 10000000))
					var b = (y1 * 10000000) - (m * x1 * 10000000)

				//return values
					return {
						m: m,
						b: b,
						equation: "y = " + m + "x + " + b
					}
			}
	
	/*** build ***/
		/* buildStation */
			function buildStation(station) {
				//create station element
					var element = document.createElement("circle")
						element.className = "station"
						element.id = "_" + station[0][1].replace(/\s/g,"_")
						element.title = station[0][1]
						element.setAttribute("cx", Math.floor((((Number(station[1][1]) * 10000000) + 740000000) / 35000 + 20) * 100))
						element.setAttribute("cy", Math.floor(10000 - (((Number(station[1][0]) * 10000000) - 407300000) / 35000 + 47) * 100))
						element.setAttribute("r", 10)
						element.setAttribute("onclick", "window.clickStation(this)")

					return element
			}

		/* buildLine */
			function buildLine(l, s) {
				//get start and end coordinates
					var station_a = stations.find(function(station) {
						return station[0][1] == lines[l].stations[s]
					})
					var station_b = stations.find(function(station)  {
						return station[0][1] == lines[l].stations[s + 1]
					})

				//create line element
					var element = document.createElement("line")
						element.className = "line"
						element.id = "_" + lines[l].name + "___" + lines[l].stations[s].replace(/\s/g,"_") + "___" + lines[l].stations[s + 1].replace(/\s/g,"_")
						element.title = lines[l].name
						element.style.stroke = lines[l].color
						element.setAttribute("x1", Math.floor((((Number(station_a[1][1]) * 10000000) + 740000000) / 35000 + 20) * 100))
						element.setAttribute("y1", Math.floor(10000 - (((Number(station_a[1][0]) * 10000000) - 407300000) / 35000 + 47) * 100))
						element.setAttribute("x2", Math.floor((((Number(station_b[1][1]) * 10000000) + 740000000) / 35000 + 20) * 100))
						element.setAttribute("y2", Math.floor(10000 - (((Number(station_b[1][0]) * 10000000) - 407300000) / 35000 + 47) * 100))

					return element
			}

		/* buildTrain */
			function buildTrain(timeNow, l, t) {
				//get direction
					var direction = lines[l].trains[t][2]

				//get start and end times
					var startTime = lines[l].trains[t][0].split(":")
						startTime = Number((startTime[0] * 10000) + (startTime[1] * 10000 / 60))
					var endTime = lines[l].trains[t][1].split(":")
						endTime = Number((endTime[0] * 10000) + (endTime[1] * 10000 / 60))
						if (endTime < startTime) {
							endTime = endTime + (24 * 10000)
						}

				//use current time to calculate how much distance has been traveled
					var travelFraction = (timeNow - startTime) / (endTime - startTime)
					var travelCovered = travelFraction * lines[l].total * 10000000

				//loop through to find the previous and next station (and extra distance covered)
					var lineDistances = JSON.parse(JSON.stringify(lines[l].distances))
					if (direction == -1) {
						lineDistances.reverse()
					}

					var d = 0
					while ((travelFraction < 1) && (travelCovered > 0) && (d < lineDistances.length)) {
						var remaining = travelCovered - (lineDistances[d] * 10000000)

						if (remaining > 0) {
							travelCovered = remaining
							d++
						}
						else {
							var lineStations = JSON.parse(JSON.stringify(lines[l].stations))
							if (direction == -1) {
								lineStations.reverse()
							}

							var previousStationName = lineStations[d]
							var previousStation = stations.find(function (s) {
								return s[0][1] == previousStationName
							})
							var nextStationName = lineStations[d + 1]
							var nextStation = stations.find(function (s) {
								return s[0][1] == nextStationName
							})

							var currentPoint = getPoint(Number(nextStation[1][0]), Number(nextStation[1][1]), Number(previousStation[1][0]), Number(previousStation[1][1]), Number(travelCovered / 10000000), direction * -1)
							travelCovered = 0
							break
						}
					}

				//if this train is in service, create an element
					if (currentPoint) {
						if (direction == 1) {
							direction = "downtown"
						}
						else if (direction == -1) {
							direction = "uptown"
						}

						var element = document.createElement("circle")
							element.className = "train"
							element.id = "_" + lines[l].name + "___" + Math.round(startTime) + "_" + Math.round(endTime)
							element.title = "[" + lines[l].name + "] " + direction + " train: " + Math.round(startTime) + " - " + Math.round(endTime)
							element.setAttribute("cx", Math.floor((((Number(currentPoint[1]) * 10000000) + 740000000) / 35000 + 20) * 100))
							element.setAttribute("cy", Math.floor(10000 - (((Number(currentPoint[0]) * 10000000) - 407300000) / 35000 + 47) * 100))
							element.setAttribute("r", 20)
							element.setAttribute("onclick", "window.clickTrain(this)")

						return element
					}
			}

		/* buildMap */
			function buildMap() {
				//build all stations
					for (var s in stations) {
						document.getElementById("stations").appendChild(buildStation(stations[s]))
					}

				//build all lines
					for (var l in lines) {
						for (var s = 0; s < lines[l].stations.length - 1; s++) {
							document.getElementById("lines").appendChild(buildLine(l, s))
						}
					}

				//build all trains
					var timeNow = Number((new Date().getHours() * 10000) + (new Date().getMinutes() * 10000 / 60) + (new Date().getSeconds() * 10000 / 60 / 60))
					for (var l in lines) {
						for (var t in lines[l].trains) {
							var train = buildTrain(timeNow, l, t)
							if (train) { document.getElementById("trains").appendChild(train) }
						}
					}

				//refresh svg
					document.getElementById("stations").innerHTML = document.getElementById("stations").innerHTML
					document.getElementById("lines").innerHTML = document.getElementById("lines").innerHTML
					document.getElementById("trains").innerHTML = document.getElementById("trains").innerHTML
			}

		/* refreshTrains */
			function refreshTrains() {
				//remove existing trains
					var trains = Array.prototype.slice.call(document.getElementsByClassName("train"))
					for (var t in trains) {
						document.getElementById("trains").removeChild(trains[t])
					}

				//build all trains
					var timeNow = Number((new Date().getHours() * 10000) + (new Date().getMinutes() * 10000 / 60) + (new Date().getSeconds() * 10000 / 60 / 60))
					for (var l in lines) {
						for (var t in lines[l].trains) {
							var train = buildTrain(timeNow, l, t)
							if (train) { document.getElementById("trains").appendChild(train) }
						}
					}

				//refresh svg
					document.getElementById("trains").innerHTML = document.getElementById("trains").innerHTML
			}

	/*** interact ***/
		/* dragMap */
			document.getElementById("map").addEventListener("mousedown", function(event) {
				window.mapMouseXOffset = event.clientX - document.getElementById("map").getBoundingClientRect().left
				window.mapMouseYOffset = event.clientY - document.getElementById("map").getBoundingClientRect().top
			})
			document.addEventListener("mouseup", function() {
				window.mapMouseXOffset = false
				window.mapMouseYOffset = false
			})

			document.onmousemove = dragMap
			function dragMap(event) {
				if (window.mapMouseXOffset || window.mapMouseYOffset) {
					//get data
						var container = document.getElementById("container")
						
						var map = document.getElementById("map")
							var mapRadius = (map.getBoundingClientRect().bottom - map.getBoundingClientRect().top) / 2

					//calculate new position
						var newLeft = event.clientX - window.mapMouseXOffset
						var newTop = event.clientY - window.mapMouseYOffset

					//account for screen size
						if (newLeft > container.getBoundingClientRect().left + 100) {
							newLeft = container.getBoundingClientRect().left + 100
						}
						else if (newLeft < container.getBoundingClientRect().right - (mapRadius * 2) - 100) {
							newLeft = container.getBoundingClientRect().right - (mapRadius * 2) - 100
						}

						if (newTop > container.getBoundingClientRect().top + 100) {
							newTop = container.getBoundingClientRect().top + 100
						}
						else if (newTop < container.getBoundingClientRect().bottom - (mapRadius * 2) - 100) {
							newTop = container.getBoundingClientRect().bottom - (mapRadius * 2) - 100
						}

					//move map
						document.getElementById("map").style.left = newLeft + "px"
						document.getElementById("map").style.top = newTop + "px"
				}
			}

		/* zoomMap */
			document.getElementById("zoom-in").addEventListener("click", function() { zoomMap(2) })
			document.getElementById("zoom-out").addEventListener("click", function() { zoomMap(0.5) })

			function zoomMap(factor) {
				//get data
					var container = document.getElementById("container")
						var screenCenterX = (container.getBoundingClientRect().right - container.getBoundingClientRect().left) / 2
						var screenCenterY = (container.getBoundingClientRect().bottom - container.getBoundingClientRect().top) / 2

					var map = document.getElementById("map")
						var mapRadius = (map.getBoundingClientRect().bottom - map.getBoundingClientRect().top) / 2
						var mapCenterOffsetX = screenCenterX - (map.getBoundingClientRect().left + mapRadius)
						var mapCenterOffsetY = screenCenterY - (map.getBoundingClientRect().top  + mapRadius)

				//account for screen size
					if (2 * mapRadius * factor < (screenCenterX * 2 - 200)) {
						factor = (screenCenterX - 100) / mapRadius
					}
					else if (2 * mapRadius * factor < (screenCenterY * 2 - 200)) {
						factor = (screenCenterY - 100) / mapRadius
					}

				//calculate new position
					var newLeft = screenCenterX - (mapRadius * factor) - (mapCenterOffsetX * factor)
					var newTop = screenCenterY - (mapRadius * factor) - (mapCenterOffsetY * factor)

				//account for screen size
					if (newLeft > container.getBoundingClientRect().left + 100) {
						newLeft = container.getBoundingClientRect().left + 100
					}
					else if (newLeft < container.getBoundingClientRect().right - (mapRadius * 2 * factor) - 100) {
						newLeft = container.getBoundingClientRect().right - (mapRadius * 2 * factor) - 100
					}

					if (newTop > container.getBoundingClientRect().top + 100) {
						newTop = container.getBoundingClientRect().top + 100
					}
					else if (newTop < container.getBoundingClientRect().bottom - (mapRadius * 2 * factor) - 100) {
						newTop = container.getBoundingClientRect().bottom - (mapRadius * 2 * factor) - 100
					}

				//resize & reposition map
					map.style.height = mapRadius * 2 * factor + "px"
					map.style.width = mapRadius * 2 * factor + "px"
					map.style.left = newLeft + "px"
					map.style.top = newTop + "px"
			}

		/* clickStation */
			window.clickStation = function(station) {
				var info = document.getElementById("station-info")
					info.textContent = station.getAttribute("title")
					info.setAttribute("x", Number(station.getAttribute("cx")) + 20)
					info.setAttribute("y", Number(station.getAttribute("cy")) - 20)
			}

		/* clickTrain */
			window.clickTrain = function(train) {
				var info = document.getElementById("train-info")
					info.textContent = train.getAttribute("title")
					info.setAttribute("x", Number(train.getAttribute("cx")) + 20)
					info.setAttribute("y", Number(train.getAttribute("cy")) - 20)
			}
}