/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			mousedown: "mousedown",
			mouseup: "mouseup",
			mouseenter: "mouseenter",
			mousemove: "mousemove",
			mouseleave: "mouseleave"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
			TRIGGERS.mouseenter = "touchstart"
			TRIGGERS.mouseleave = "touchend"
		}

		document.addEventListener("contextmenu", function(event) {
			event.preventDefault()
			return
		})

	/* elements */
		const ELEMENTS = {
			map: document.querySelector("#map"),
			zones: {},
			description: document.querySelector("#description"),
			viewer: document.querySelector("#viewer")
		}

	/* zones */
		const ZONES = {
			"entrance": {
				description: "The Park entrance is located in the bottom middle of the map. It is represented by pass through ticket booths just past a pair of lamp posts and the bust of a large Unicorn who guards the entrance.",
				clippath: "polygon(52.61% 88.11%, 54.83% 88.37%, 57.31% 91.64%, 56.66% 98.96%, 51.57% 99.09%, 51.04% 91.91%, 52.09% 90.07%)"
			},
			"thekeepsake": {
				description: "Just inside the entrance to the Park is a Keep known as “The Keepsake” which contains souvenir and food shops, with an area outside for enjoying a relaxing game of lawn bowling.",
				clippath: "polygon(51.96% 73.76%, 55.61% 72.45%, 57.05% 77.15%, 58.09% 79.9%, 58.22% 83.29%, 54.31% 87.21%, 51.96% 79.37%)"
			},
			"fieldofhonor": {
				description: "To the east of The Keepsake is the “Field of Honor” where several times a day knights on horseback can be seen jousting. Behind this is a children’s roller coaster where they, too, can safely ride.",
				clippath: "polygon(60.97% 65.54%, 64.23% 65.54%, 66.19% 72.72%, 58.62% 82.64%, 56.53% 76.11%, 55.09% 71.93%)"
			},
			"ferriswheel": {
				description: "East of the Field of Honor is the traditional “Ferris Wheel” suitable for the entire family. It offers thrills most acceptable to the young and less adventurous.",
				clippath: "polygon(71.41% 64.75%, 73.63% 69.58%, 70.63% 73.76%, 67.49% 73.24%, 69.32% 66.58%)"
			},
			"bardstable": {
				description: "To the northeast of the Field of Honor is the “Bard’s Table”. This restaurant will please young and old alike and offer many edible treats paired with musical delights and tales of might and magic.",
				clippath: "polygon(64.49% 61.62%, 67.23% 61.49%, 70.63% 64.62%, 69.19% 66.84%, 68.67% 69.32%, 67.1% 70.76%, 64.49% 67.62%, 63.19% 65.54%)"
			},
			"justleaves": {
				description: "Northeast of Bard’s Table is “Just Leaves”. Here you can find and purchase teas from all over the world. Try some. You might get to have tea with the Queen if you’re lucky enough.",
				clippath: "polygon(71.15% 58.22%, 73.37% 54.57%, 74.8% 58.36%, 75.85% 63.05%, 69.71% 63.45%, 69.19% 62.53%)"
			},
			"paradeofenchantedmounts": {
				description: "North of the Field of Honor is a large merry-go-round called “Parade of Enchanted Mounts”. This is sure to appeal to children of all ages. North of this is the “Knights’ Court -Yard” for picnicking and family relaxing.",
				clippath: "polygon(63.19% 60.84%, 63.32% 64.62%, 60.31% 65.54%, 59.79% 66.71%, 55.87% 69.58%, 50.91% 68.15%, 46.34% 66.58%, 46.34% 62.79%, 48.96% 59.53%, 49.48% 51.7%, 51.96% 50.91%)"
			},
			"allthekingshorsesandallthekingsmen": {
				description: "Just to the west of The Knights’ Court-Yard is “All the King’s Horses and all the King’s Men” where egg-shaped transports sway passengers precariously all the way around the top of the wall. Hopefully, they will not fall…",
				clippath: "polygon(35.64% 55.87%, 46.87% 51.57%, 48.3% 58.75%, 43.99% 67.1%, 38.25% 73.37%, 35.51% 71.28%, 36.95% 63.32%)"
			},
			"thehive": {
				description: "Just northwest of the Keepsake can be found “The Hive”. Here you can see and taste how special honey was in medieval life. Mead is obtainable here for adults.",
				clippath: "polygon(43.99% 66.97%, 46.08% 66.19%, 50.65% 68.54%, 51.96% 71.67%, 46.61% 75.85%, 42.43% 74.41%, 42.3% 68.93%)"
			},
			"followtherainbow": {
				description: "Just west of the Keepsake is “Follow the Rainbow”. It is a series of large different colored slides which can be ridden to the Pot of Gold at the end. Some colors dip below and then over others.",
				clippath: "polygon(33.55% 80.55%, 34.99% 75.07%, 38.9% 74.54%, 44.65% 77.68%, 48.43% 85.38%, 46.34% 86.55%, 36.81% 84.46%)"
			},
			"theknarr": {
				description: "“The Knarr” is just to the west of the entrance way. It is a Viking boat ride which will rock adventurers forward and back in increasingly larger arcs. Rough seas may be in store…",
				clippath: "polygon(49.61% 85.51%, 51.57% 87.34%, 51.17% 97.91%, 47% 98.04%, 47.13% 88.51%)"
			},
			"onceaknightisenough": {
				description: "Just west of The Knarr is “Once a Knight is Enough!” This is place where costumes can be rented for the day and returned, or purchased before leaving.",
				clippath: "polygon(28.59% 87.73%, 45.56% 88.64%, 45.56% 94.91%, 26.5% 95.69%)"
			},
			"thejuggle": {
				description: "Just west of Once a Knight is Enough is “The Juggle”. Three large balls carrying adventurers travel simultaneously along a complicated pathway while spinning. Hopefully, none of the balls collide!",
				clippath: "polygon(23.24% 79.24%, 26.37% 83.42%, 32.77% 81.46%, 32.9% 85.64%, 26.89% 87.34%, 23.5% 94.78%, 20.1% 93.08%, 22.45% 86.55%, 20.5% 81.98%)"
			},
			"thejoust": {
				description: "West of The Juggle is “The Joust” This is a roller coaster where two horse-shaped cars travel in a perfectly timed dance, passing very closely in what looks to be an exciting joust… or crash.",
				clippath: "polygon(6.79% 78.59%, 7.83% 85.38%, 12.53% 86.81%, 17.89% 85.64%, 20.63% 95.43%, 19.58% 98.3%, 12.01% 98.43%, 10.57% 94.52%, 0.65% 79.5%, 1.44% 75.33%, 4.83% 73.89%)"
			},
			"duncecap": {
				description: "The southwest corner of Carnival holds the “Dunce Cap”. This is not really for those of weak minds, but rather those who accidently misplaced the rest of their party of adventurers! Here there is help and hope for reunification!",
				clippath: "polygon(2.35% 84.73%, 5.48% 89.16%, 6.27% 97.91%, 0.52% 98.04%, 0.65% 88.77%)"
			},
			"lightsinthesky": {
				description: "Northwest of the Joust is “Lights in the Sky”. This planetarium show will paint a history of what people in the Middle Ages thought about the celestial heavens above.",
				clippath: "polygon(7.18% 68.93%, 9.53% 73.24%, 11.75% 79.77%, 9.66% 82.38%, 7.57% 79.9%, 4.57% 72.72%, 4.96% 69.84%)"
			},
			"thecrown": {
				description: "North of the Joust is “The Crown”. A spiraling ride along the inner edge shows history’s most memorable royal families. The top half of this ride is a very fancy restaurant, fit for royalty.",
				clippath: "polygon(12.92% 73.63%, 15.93% 71.41%, 18.41% 73.89%, 19.71% 77.28%, 18.67% 79.11%, 18.93% 81.46%, 15.8% 83.55%, 12.53% 82.25%, 12.53% 79.37%, 11.88% 76.76%)"
			},
			"thebazaar": {
				description: "North of the Crown is a large tent complex called “The Bazaar”. You will find many sellers of interesting crafts, foods, and items you have probably never seen before. Enjoy the experience!",
				clippath: "polygon(15.14% 69.32%, 21.15% 72.06%, 27.68% 74.28%, 31.46% 73.5%, 33.55% 76.11%, 33.29% 79.37%, 19.84% 78.07%, 18.54% 73.89%, 15.8% 71.54%, 13.19% 73.63%, 11.75% 76.63%, 10.31% 72.19%, 10.84% 69.71%)"
			},
			"amphitheater": {
				description: "East of the entrance is a large amphitheater where various plays, magic shows, juggling acts, and musical ensembles can be enjoyed throughout the day. Just north are shops for swords and armor.",
				clippath: "polygon(61.62% 88.38%, 63.58% 84.86%, 68.93% 85.12%, 72.85% 90.86%, 72.06% 95.43%, 64.23% 95.56%, 61.62% 91.64%)" 
			},
			"abandonhope": {
				description: "Just east of the Field of Honor is a cave with a sign reading “Abandon Hope…”. This underground maze contains twists and turns and large numbers of beasts to be wary of. Can you find your way through?",
				clippath: "polygon(64.36% 78.98%, 68.54% 74.93%, 71.15% 74.41%, 72.06% 75.72%, 68.8% 81.33%)"
			},
			"maypole": {
				description: "Just east of Abandon Hope is a large “May Pole” and “Musicians and Dancers” tent. You can learn to play an instrument or dance so you can participate, or you can just watch.",
				clippath: "polygon(71.93% 78.33%, 74.8% 80.16%, 78.33% 78.72%, 80.81% 80.68%, 81.59% 82.77%, 80.81% 86.16%, 78.2% 87.34%, 76.11% 86.03%, 74.41% 83.68%, 71.28% 84.07%, 69.32% 82.64%)"
			},
			"heavensawait": {
				description: "South of the May Pole is the “Heavens Await”. If weather permits, adventurers may take a ride over Carnival in one of these multicolored miracles. Ride times are about an hour, but no better view exists.",
				clippath: "polygon(79.77% 95.43%, 78.85% 89.3%, 84.2% 87.73%, 84.33% 86.16%, 83.03% 84.2%, 83.42% 82.38%, 84.07% 81.72%, 85.25% 81.59%, 86.16% 83.03%, 86.16% 84.73%, 85.38% 86.16%, 85.51% 87.73%, 86.95% 89.56%, 88.12% 95.17%)"
			},
			"checkmate": {
				description: "East of the May Pole is “Checkmate”. Watch a living chess game on the big board with Carnival actors making great display of their talents and wit while trying to decide who will win.",
				clippath: "polygon(86.81% 77.02%, 87.99% 78.46%, 86.55% 79.5%, 86.29% 81.07%, 86.68% 82.9%, 89.69% 83.55%, 89.56% 88.12%, 85.77% 87.73%, 85.38% 86.16%, 86.16% 85.25%, 86.16% 83.94%, 84.99% 82.11%, 83.81% 82.38%, 83.03% 84.07%, 84.33% 86.16%, 84.2% 87.47%, 82.64% 87.34%, 82.64% 82.51%, 80.94% 79.24%, 81.59% 76.89%, 84.33% 76.37%)"
			},
			"sherwood": {
				description: "Just north of Checkmate can be found “Sherwood”. Here in the forest, you can learn from Robin’s friends how to climb rope ladders, play tug of war, or try log rolling or quarter staff dueling. Be sure to explore the tree castle.",
				clippath: "polygon(86.29% 62.79%, 90.08% 61.88%, 93.99% 64.1%, 94.39% 68.41%, 95.3% 71.15%, 95.04% 75.46%, 92.17% 76.89%, 87.99% 78.72%, 86.55% 77.15%, 84.07% 76.37%, 81.72% 77.02%, 80.81% 78.98%, 78.33% 77.94%, 75.07% 79.5%, 74.15% 75.59%, 72.58% 71.93%, 74.41% 68.8%, 74.93% 67.23%, 80.94% 64.62%)"
			},
			"southeastrestrooms": {
				description: "Despite the fact that there are rest rooms and first aid available throughout the park, we put these here along the southeast edge in case you couldn’t find them elsewhere!",
				clippath: "polygon(97.26% 76.89%, 99.87% 73.76%, 99.87% 80.94%, 98.83% 80.55%)"
			},
			"jugglersroost": {
				description: "East of Checkmate is “Jugglers Roost”. Here there are jugglers and acrobats to amaze and enchant you with shows of wit and humor.",
				clippath: "polygon(89.69% 81.46%, 91.12% 78.98%, 93.73% 76.11%, 95.95% 77.81%, 97.65% 81.07%, 98.3% 83.94%, 96.34% 85.51%, 93.21% 86.68%, 90.73% 84.46%)"
			},
			"threetreatsrow": {
				description: "Just south of the Jugglers Roost is “Three Treats Row” where you can find plain and caramel popcorn, cotton candy, and warm pretzels…all things we’re sure they wish they had in the Middle Ages.",
				clippath: "polygon(93.21% 88.38%, 93.73% 86.42%, 95.17% 86.29%, 96.34% 86.03%, 97.26% 87.47%, 98.04% 88.38%, 98.04% 89.69%, 93.08% 91.91%, 91.91% 90.99%, 91.91% 89.3%)"
			},
			"decoysdelight": {
				description: "The southwest corner of Carnival contains “Decoys Delight”. Bertrand always wanted a duck pond, so we let him use this one for his collection of mechanical wooden ducks. Come visit, and maybe leave with a friend.",
				clippath: "polygon(89.95% 93.6%, 97.52% 91.51%, 99.74% 92.17%, 99.87% 100%, 92.43% 99.35%, 90.86% 97.13%)"
			},
			"farelane": {
				description: "North of Sherwood is a row of simple huts. In the “Fare Lane” you can find foods like turkey legs, fried sausage, pancakes, funnel cakes, and cream puffs. Enjoy and keep up your strength.",
				clippath: "polygon(73.37% 65.01%, 76.11% 63.05%, 80.81% 61.1%, 84.86% 60.7%, 85.9% 62.53%, 80.55% 64.23%, 77.42% 65.8%, 73.89% 67.36%)"
			},
			"tudorvillage": {
				description: "North of Fare Lane is “Tudor Village”. Here there are crafts persons with various skills from the Middle Ages. Learn or watch candle making, glass blowing, wood working, forging, weaving and other skills.",
				clippath: "polygon(76.89% 62.14%, 75.72% 57.31%, 77.55% 53.52%, 79.9% 50.65%, 84.86% 45.3%, 88.51% 44.78%, 90.21% 45.3%, 90.6% 47%, 85.64% 53.92%, 86.55% 57.57%, 86.55% 58.75%, 81.98% 60.84%)"
			},
			"enchantedforest": {
				description: "East of Tudor Village and Sherwood is the “Enchanted Forest”. Carriages will leave from Tudor Village to take you ‘safely’ on a tour to see fairies, fawns, sylphs, elves, unicorns and an occasional dragon. Stay with your tour!",
				clippath: "polygon(93.99% 48.3%, 98.17% 51.04%, 99.87% 56.14%, 100% 69.45%, 98.43% 74.15%, 96.34% 76.37%, 95.43% 74.15%, 95.43% 71.15%, 94.91% 68.54%, 94.39% 64.62%, 89.95% 61.75%, 87.47% 62.27%, 88.77% 59.14%, 88.12% 57.18%, 86.42% 54.7%, 86.55% 52.61%, 88.9% 49.35%, 90.99% 46.74%)"
			},
			"pegasisdance": {
				description: "North of Enchanted Forest is “Pegasi’s Dance”. This is your chance to mount a Pegasus and take off for a swirling flight. Unlike Bellerophon, you won’t need to fight the Chimera!",
				clippath: "polygon(92.69% 37.99%, 96.74% 38.25%, 97.65% 41.51%, 97.65% 45.43%, 95.43% 47.91%, 93.21% 47.65%, 92.04% 45.04%)"
			},
			"dwarvenkingdom": {
				description: "East of Knights’ Court -Yard is the “Dwarven Kingdom”. This roller coaster takes you through gem and gold mines, past attacking orcs, goblins, ogres, trolls, and dragons to the dwarves and the Hall of the Mountain King.",
				clippath: "polygon(55.48% 51.31%, 63.84% 45.17%, 65.8% 47.91%, 68.15% 51.04%, 70.63% 54.7%, 71.15% 58.22%, 68.41% 58.75%, 65.93% 61.36%, 62.4% 59.92%, 59.14% 57.05%, 57.57% 53.79%)"
			},
			"pointofnoreturn": {
				description: "East of the Dwarven Kingdom is “Point of No Return”. This flume ride will flow you past sea monsters and waterfalls over the edge of the world into a fantasy adventure for the ages!",
				clippath: "polygon(65.4% 47.65%, 75.85% 37.86%, 82.9% 40.99%, 85.51% 43.34%, 85.25% 44.65%, 78.72% 50.39%, 73.5% 54.31%, 67.23% 49.74%)"
			},
			"mageshat": {
				description: "Northeast of Point of No Return is the “Mage’s Hat”. Besides the amazing magical shows, there is a chance for those who wish to learn magic to do just that. Customers can learn a trick unique to them for the day.",
				clippath: "polygon(86.68% 43.21%, 85.51% 40.08%, 86.95% 36.81%, 88.9% 34.2%, 90.6% 37.34%, 91.38% 39.95%, 90.21% 43.47%)"
			}
		}

/*** zones ***/
	/* createZones */
		createZones()
		function createZones() {
			try {
				// loop through
					for (let i in ZONES) {
						let element = document.createElement("div")
							element.className = "zone"
							element.id = "zone-" + i
							element.style.clipPath = ZONES[i].clippath
							element.addEventListener(TRIGGERS.mouseenter, enterZone)
							element.addEventListener(TRIGGERS.mouseleave, leaveZone)
						ELEMENTS.map.appendChild(element)
						ELEMENTS.zones[i] = element
					}
			} catch (error) {console.log(error)}
		}

	/* enterZone */
		function enterZone(event) {
			try {
				// get id
					let id = event.target.id.replace("zone-", "")

				// update description
					ELEMENTS.description.innerText = ZONES[id].description
			} catch (error) {console.log(error)}
		}

	/* leaveZone */
		function leaveZone(event) {
			try {
				// clear description
					ELEMENTS.description.innerText = ""
			} catch (error) {console.log(error)}
		}

/*** viewer ***/
	/* updateViewer */
		window.addEventListener(TRIGGERS.mousemove, updateViewer)
		window.addEventListener(TRIGGERS.mousedown, updateViewer)
		function updateViewer(event) {
			try {
				// position
					let x = event.touches ? event.touches[0].clientX : event.clientX
					let y = event.touches ? event.touches[0].clientY : event.clientY

				// map
					let mapRect = ELEMENTS.map.getBoundingClientRect()

				// percentage
					let relativeX = ((x - mapRect.left) / mapRect.width) * 100
					let relativeY = ((y - mapRect.top) / mapRect.height) * 100

				// outside
					if (0 > relativeX || relativeX > 100 || 0 > relativeY || relativeY > 100) {
						ELEMENTS.viewer.setAttribute("invisible", true)
						return
					}

				// inside
					ELEMENTS.viewer.removeAttribute("invisible")
					ELEMENTS.viewer.style.left = (relativeX + "%")
					ELEMENTS.viewer.style.top  = (relativeY + "%")

				// show image at position
					let adjustmentX = (relativeX - 50) * 1.1
					let adjustmentY = (relativeY - 50) * 1.1
					ELEMENTS.viewer.style.backgroundPosition = ((50 + adjustmentX) + "% " + (50 + adjustmentY) + "%")
			} catch (error) {console.log(error)}
		}
