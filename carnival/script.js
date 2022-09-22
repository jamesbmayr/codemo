/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			mousedown: "mousedown",
			mousemove: "mousemove",
			mouseup: "mouseup"
		}
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			TRIGGERS.mousedown = "touchstart"
			TRIGGERS.mousemove = "touchmove"
			TRIGGERS.mouseup = "touchend"
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
				description: "The Park entrance is located in the bottom middle of the map. It is represented by pass through ticket booths past a pair of lamp posts and the bust of a large Unicorn who guards the entrance.",
				clippath: "polygon(53.13% 88.38%, 54.83% 88.37%, 57.31% 91.64%, 57.31% 99.87%, 51.96% 100%, 51.04% 91.91%, 52.09% 90.07%)"
			},
			"thekeepsake": {
				description: "Inside the entrance to the Park is a Keep known as “The Keepsake” which contains souvenir and food shops, with an area outside for enjoying a relaxing game of lawn bowling.",
				clippath: "polygon(51.96% 73.76%, 55.22% 73.11%, 56.53% 76.5%, 58.09% 79.37%, 58.22% 84.07%, 54.31% 87.86%, 50.13% 84.99%, 47.26% 77.42%, 49.48% 75.59%, 54.96% 70.63%)"
			},
			"fieldofhonor": {
				description: "To the east of The Keepsake is the “Field of Honor” where several times a day knights on horseback can be seen jousting. Behind this is a children’s roller coaster where they, too, can safely ride.",
				clippath: "polygon(60.97% 65.93%, 63.97% 65.93%, 66.45% 72.58%, 59.01% 83.03%, 57.44% 77.42%, 55.35% 72.06%)"
			},
			"ferriswheel": {
				description: "East of the Field of Honor is the traditional “Ferris Wheel” suitable for the entire family. It offers thrills most acceptable to the young and less adventurous.",
				clippath: "polygon(71.28% 65.93%, 73.24% 69.32%, 69.84% 74.15%, 67.75% 72.32%, 69.45% 66.84%)"
			},
			"bardstable": {
				description: "To the northeast of the Field of Honor is the “Bard’s Table”. This restaurant will please young and old alike and offer many edible treats paired with musical delights and tales of might and magic.",
				clippath: "polygon(64.88% 61.88%, 67.36% 62.01%, 70.76% 64.36%, 69.19% 66.84%, 68.67% 69.32%, 67.1% 70.76%, 64.23% 68.28%, 63.32% 65.4%)"
			},
			"justleaves": {
				description: "Northeast of Bard’s Table is “Just Leaves”. Here you can find and purchase teas from all over the world. Try some. You might get to have tea with the Queen if you’re lucky enough.",
				clippath: "polygon(71.15% 58.22%, 73.37% 54.57%, 74.8% 58.36%, 75.85% 63.05%, 69.71% 63.45%, 69.19% 62.53%)"
			},
			"paradeofenchantedmounts": {
				description: "North of the Field of Honor is a large merry-go-round called the “Parade of Enchanted Mounts”. These magical beasts are sure to appeal to children of all ages.",
				clippath: "polygon(58.75% 63.32%, 59.01% 65.27%, 59.4% 67.75%, 55.61% 69.71%, 50.91% 68.67%, 49.87% 63.71%, 51.83% 61.75%, 54.7% 60.84%)"
			},
			"knightscourtyard": {
				description: "North of the Parade of Enchanted Mounts is the “Knights’ Court-Yard” for picnicking and family relaxing. These topiary knights may seem to move occasionally, so don’t be surprised if they watch you too.",
				clippath: "polygon(49.22% 51.83%, 51.96% 51.31%, 63.19% 61.36%, 63.45% 65.01%, 60.57% 66.19%, 59.14% 64.49%, 58.22% 62.92%, 54.57% 60.7%, 50.91% 63.05%, 50.26% 66.06%, 48.56% 67.1%, 46.34% 66.84%, 46.21% 63.19%, 48.43% 60.7%, 49.35% 57.83%)"
			},
			"allthekingshorsesandallthekingsmen": {
				description: "To the west of The Knights’ Court-Yard is “All the King’s Horses and all the King’s Men” where egg-shaped transports sway passengers precariously all the way around the top of the wall. Hopefully, they will not fall...",
				clippath: "polygon(36.03% 56.4%, 46.61% 52.61%, 47.78% 59.14%, 43.86% 67.62%, 38.38% 74.41%, 36.03% 71.54%, 37.21% 67.23%, 36.81% 61.36%)"
			},
			"thehive": {
				description: "Northwest of the Keepsake can be found “The Hive”. Here you can see and taste how special honey was in medieval life. Mead is obtainable here for adults.",
				clippath: "polygon(43.99% 68.02%, 46.08% 67.1%, 50.26% 69.58%, 51.31% 72.19%, 45.69% 76.76%, 42.82% 75.46%, 42.43% 70.1%)"
			},
			"thewindmill": {
				description: "North of All the King’s Horses and all the King’s Men is the “Windmill”. Sit in one of the curved sections at the ends of the arms and enjoy a swirling ride as the whole windmill spins and rises and falls.",
				clippath: "polygon(35.51% 43.99%, 38.64% 48.17%, 38.77% 50.39%, 34.6% 52.74%, 33.42% 50.65%, 30.81% 48.43%, 31.07% 47.13%)"
			},
			"magicalfruit": {
				description: "West of the Windmill is the “Magical Fruit”. Here you can get not only a history of various fruits and how and where they were first used, but also the best smoothies in the park.",
				clippath: "polygon(23.5% 38.77%, 26.11% 40.47%, 26.63% 43.47%, 25.59% 45.04%, 22.98% 45.43%, 21.8% 41.78%)"
			},
			"fairyfort": {
				description: "North of the Serpent’s Coils is the “Fairy Fort”. Enjoy exploring this magical tree fortress with its sprites and fairies. You may even witness how excited they get when the Gryphons fly over.",
				clippath: "polygon(28.72% 34.73%, 29.5% 31.98%, 31.98% 30.55%, 33.68% 30.68%, 35.38% 32.38%, 35.25% 34.86%, 34.07% 36.16%, 34.2% 38.12%, 32.9% 39.43%, 30.29% 39.3%, 30.03% 36.81%)"
			},
			"counterweight": {
				description: "East of the Fairy Fort is the “Counterweight”. Two smaller Ferris wheels are positioned at either end of a larger rotating arm, so that each wheel rotates individually as the big arms also rotate.",
				clippath: "polygon(35.92% 28.44%, 38.01% 28.18%, 42.06% 25.17%, 42.58% 22.95%, 44.15% 22.69%, 45.19% 24.26%, 44.15% 26.87%, 42.71% 26.48%, 41.28% 27.78%, 43.23% 35.1%, 42.19% 36.01%, 42.32% 33.14%, 41.41% 30%, 40.75% 33.27%, 40.75% 36.27%, 39.84% 36.01%, 38.4% 34.7%, 39.06% 32.09%, 38.27% 31.44%, 37.62% 32.22%, 36.58% 31.96%, 35.4% 30.4%)"
			},
			"merchantoftime": {
				description: "North of the Counterweight is the “Merchant of Time”. In this tent you may find all sorts of time pieces for sale. From sundials to pendulum clocks, to regular clocks and watches, to more unique pieces. Don’t loose track of time.",
				clippath: "polygon(37.62% 24.39%, 39.84% 24.91%, 40.62% 26.22%, 38.27% 28.18%, 36.05% 28.44%, 36.71% 26.22%)"
			},
			"followtherainbow": {
				description: "West of the Keepsake is “Follow the Rainbow”. It is a series of large different colored slides which can be ridden to the Pot of Gold at the end. Some colors dip below and then over others.",
				clippath: "polygon(33.55% 81.07%, 35.12% 75.59%, 39.3% 75.59%, 44.78% 78.2%, 48.69% 85.38%, 46.61% 86.95%, 36.95% 84.99%)"
			},
			"theknarr": {
				description: "“The Knarr” is just to the west of the entrance way. It is a Viking boat ride which will rock adventurers forward and back in increasingly larger arcs. Rough seas may be in store...",
				clippath: "polygon(50.13% 86.55%, 51.96% 88.25%, 51.17% 97.91%, 47% 98.04%, 47.65% 89.56%)"
			},
			"onceaknightisenough": {
				description: "West of The Knarr is “Once a Knight is Enough!” This is place where costumes can be rented for the day and returned, or purchased before leaving.",
				clippath: "polygon(28.72% 88.77%, 45.43% 89.16%, 45.69% 95.43%, 26.76% 97.26%)"
			},
			"thejuggle": {
				description: "West of Once a Knight is Enough is “The Juggle”. Three large balls carrying adventurers travel simultaneously along a complicated pathway while spinning. Hopefully, none of the balls collide!",
				clippath: "polygon(22.32% 80.68%, 26.37% 83.92%, 32.77% 82.51%, 33.03% 86.68%, 27.28% 88.25%, 24.02% 95.69%, 20.1% 93.99%, 22.98% 86.95%, 20.5% 83.03%)"
			},
			"thejoust": {
				description: "West of The Juggle is “The Joust” This is a roller coaster where two horse-shaped cars travel in a perfectly timed dance, passing very closely in what looks to be an exciting joust... or crash.",
				clippath: "polygon(6.79% 79.59%, 7.83% 86.38%, 12.53% 87.81%, 17.62% 87.21%, 20.63% 96.43%, 19.58% 99.3%, 12.01% 99.43%, 10.57% 95.52%, 0% 80.55%, 1.44% 76.33%, 3.52% 73.76%)"
			},
			"duncecap": {
				description: "The southwest corner of Carnival holds the “Dunce Cap”. This is not really for those of weak minds, but rather those who accidently misplaced the rest of their party of adventurers! Here there is help and hope for reunification!",
				clippath: "polygon(2.61% 86.55%, 5.22% 92.43%, 6.14% 99.48%, 0.13% 99.74%, 0.52% 92.04%)"
			},
			"lightsinthesky": {
				description: "Northwest of the Joust is “Lights in the Sky”. This planetarium show will paint a history of what people in the Middle Ages thought about the celestial heavens above.",
				clippath: "polygon(6.53% 70.23%, 9.79% 75.07%, 11.49% 81.2%, 9.4% 83.81%, 6.92% 81.07%, 4.44% 74.41%, 4.83% 71.15%)"
			},
			"gryphonsnests1": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(-0.13% 69.84%, 0.26% 62.4%, 2.35% 61.23%, 6.66% 62.92%, 8.22% 64.62%, 9.14% 67.62%, 6.53% 70.5%)"
			},
			"gryphonsnests2": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(41.78% 13.45%, 43.47% 13.71%, 44.26% 16.58%, 45.3% 17.75%, 45.3% 19.71%, 44.78% 22.85%, 42.56% 22.72%, 41.25% 22.58%, 39.43% 22.32%, 40.08% 19.19%, 40.86% 16.84%)"
			},
			"gryphonsnests3": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(95.3% 29.11%, 97.52% 29.11%, 99.35% 32.25%, 95.43% 36.95%, 91.51% 35.38%, 93.08% 30.94%)"
			},
			"gryphoncar1": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(26.24% 35.77%, 28.85% 35.64%, 29.5% 37.34%, 28.59% 38.51%, 26.89% 40.08%, 24.8% 39.3%, 24.8% 37.73%)"
			},
			"gryphoncar2": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(65.4% 18.93%, 67.49% 19.45%, 68.15% 20.23%, 67.89% 21.54%, 66.58% 21.54%, 65.01% 21.8%)"
			},
			"gryphonsupport1": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(19.71% 40.73%, 21.54% 40.73%, 22.06% 42.43%, 21.8% 46.21%, 20.89% 47.26%, 19.71% 46.08%)"
			},
			"gryphonsupport2": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(32.64% 25.07%, 34.73% 24.41%, 34.99% 26.11%, 34.99% 28.33%, 34.6% 29.77%, 32.9% 29.63%, 32.77% 26.89%)"
			},
			"gryphonsupport3": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(75.98% 21.28%, 77.28% 21.41%, 77.42% 22.72%, 77.55% 23.63%, 76.76% 24.8%, 75.33% 24.41%, 75.72% 22.58%)"
			},
			"thecrown": {
				description: "North of the Joust is “The Crown”. A spiraling ride along the inner edge shows history’s most memorable royal families. The top half of this ride is a very fancy restaurant, fit for royalty.",
				clippath: "polygon(12.4% 74.67%, 15.4% 72.45%, 18.41% 75.39%, 19.58% 78.2%, 18.8% 80.03%, 18.93% 82.96%, 15.8% 85.05%, 12.53% 83.75%, 12.53% 80.87%, 11.23% 78.2%)"
			},
			"thebazaar": {
				description: "North of the Crown is a large tent complex called “The Bazaar”. You will find many sellers of interesting crafts, foods, and items you have probably never seen before. Enjoy the experience!",
				clippath: "polygon(15.14% 70.32%, 21.15% 73.06%, 27.68% 75.28%, 31.46% 74.5%, 33.55% 77.55%, 32.11% 80.81%, 19.19% 79.11%, 18.54% 74.89%, 15.8% 72.54%, 13.19% 74.63%, 11.1% 77.81%, 9.79% 74.28%, 10.84% 70.71%)"
			},
			"serpentscoils": {
				description: "The “Serpent’s Coils” lie north of the Bazaar. Stroll through the sea serpent’s coils and see the wonders visible under water. If you make it to the end, have your photo taken in the serpent’s mouth.",
				clippath: "polygon(16.32% 46.84%, 19.45% 46.71%, 21.54% 48.02%, 24.54% 47.11%, 28.07% 48.93%, 32.64% 50.37%, 33.81% 54.16%, 36.42% 61.47%, 35.12% 68.65%, 32.51% 72.04%, 27.81% 72.95%, 20.5% 71%, 15.14% 68.52%, 11.75% 69.17%, 10.31% 67.99%, 11.1% 66.43%, 9.79% 63.55%, 5.48% 59.51%, 9.14% 54.68%, 12.01% 51.94%)"
			},
			"standingstones": {
				description: "West of the Serpent’s Coils is the “Standing Stones”. Some think that these ancient sites were astrological timekeepers, or portals to other worlds. Stand in the center and start a journey through other times and worlds!",
				clippath: "polygon(0.28% 34.16%, 1.59% 33.9%, 3.68% 35.6%, 5.24% 35.07%, 7.07% 35.86%, 8.25% 35.86%, 9.16% 36.51%, 10.34% 36.12%, 11.9% 36.51%, 14.9% 39.38%, 16.73% 40.03%, 17.91% 41.6%, 17.52% 42.78%, 17.65% 45.52%, 16.08% 46.04%, 13.99% 47.21%, 12.95% 48.65%, 10.34% 50.74%, 7.72% 53.61%, 5.37% 54.79%, 2.63% 55.05%, 0.15% 54.13%)"
			},
			"sanctuary": {
				description: "North of the Standing Stones is “Sanctuary”. This cathedral will display medieval religious art and sculpture, pomp and circumstance, and beautiful stained-glass windows. There is rest here.",
				clippath: "polygon(14.8% 24.78%, 17.8% 22.56%, 18.45% 19.04%, 18.71% 17.73%, 19.5% 19.17%, 20.28% 19.69%, 21.32% 18.65%, 22.89% 20.73%, 24.2% 20.21%, 24.72% 21.52%, 24.85% 24.52%, 28.11% 25.7%, 29.03% 26.74%, 27.07% 31.44%, 24.98% 33.14%, 23.54% 34.96%, 21.72% 36.4%, 19.76% 38.88%, 18.45% 37.97%, 16.89% 37.18%, 16.23% 35.88%, 13.75% 35.23%, 10.75% 33.01%, 10.62% 30.53%, 11.92% 29.09%, 13.1% 26.87%)"
			},
			"dragonflume": {
				description: "North of Sanctuary is the “Dragon Flume”. Ride the swiftly moving water along the back of the dragon until, at last, it sprays you forth from the dragon’s mouth in a spiral.",
				clippath: "polygon(4.87% 5.59%, 5.66% 3.24%, 7.88% 1.28%, 10.1% 1.41%, 12.05% 3.89%, 14.14% 4.16%, 19.5% 9.9%, 19.89% 13.29%, 20.15% 15.51%, 19.5% 17.34%, 16.36% 19.69%, 15.32% 21.65%, 12.58% 21.91%, 11.14% 21.39%, 9.57% 21.78%, 6.57% 20.87%, 3.83% 21%, 1.61% 19.69%, 0.83% 17.86%, 1.48% 11.07%, 4.22% 7.94%)"
			},
			"relicsofthedragon": {
				description: "West of the Dragon Flume are four tents, known collectively as the “Relics of the Dragon”. You can find dragon’s claws, dragon’s teeth, dragon’s scales, and dragon’s breath, and items made with them.",
				clippath: "polygon(1.35% 7.42%, 3.31% 5.85%, 4.22% 7.68%, 3.05% 9.25%, 1.87% 10.29%, 1.35% 11.47%, 1.09% 16.04%, 0.04% 15.9%, -0.22% 10.42%, 0.96% 9.38%)"
			},
			"wreckedship": {
				description: "Northwest of the Dragon Flume is the “Wrecked Ship”. This is a derelict and haunted remnant of the shattered dreams of once valiant adventurers. You’ll need your bravery if you venture here.",
				clippath: "polygon(0.96% 2.61%, 5.92% 2.48%, 5.27% 4.7%, 4.48% 6.14%, 3.7% 5.87%, 3.31% 5.22%, 1.61% 6.66%, 1.09% 7.18%, 0.17% 5.87%, 0.04% 3.79%)"
			},
			"circusoftheimagination": {
				description: "Northeast of the Dragon Flume is the “Circus of the Imagination”. See magical creatures performing acts which any traditional circus would envy.",
				clippath: "polygon(19.5% 5.59%, 22.63% 3.5%, 26.15% 5.85%, 26.28% 8.72%, 23.41% 10.81%, 19.23% 9.12%)"
			},
			"odeum": {
				description: "East of the entrance is a large amphitheater, the “Odeum” where various plays, magic shows, juggling acts, and musical ensembles can be enjoyed throughout the day. Relax on the lawn and enjoy.",
				clippath: "polygon(61.6% 88.49%, 63.82% 85.62%, 70.08% 85.75%, 74.26% 86.4%, 77% 89.66%, 77.52% 92.93%, 77.39% 96.32%, 73.22% 97.24%, 64.99% 96.58%, 61.73% 92.14%)"
			},
			"armory": {
				description: "North of the Odeum is the “Armory”. Here you can look at armor and weapons of leather, wood or metal. Armor is bespoke and must be fitted to each customer and must be shipped for delivery. Real weapons are not permitted in the park.",
				clippath: "polygon(60.7% 83.68%, 63.84% 81.82%, 65.27% 83.13%, 65.4% 84.95%, 61.62% 86.78%, 60.57% 85.48%)"
			},
			"abandonhope": {
				description: "Just east of the Field of Honor is a cave with a sign reading “Abandon Hope...”. This underground maze contains twists and turns and large numbers of beasts to be wary of. Can you find your way through?",
				clippath: "polygon(64.49% 79.37%, 68.15% 75.46%, 70.63% 74.8%, 72.32% 76.24%, 68.93% 81.85%)"
			},
			"maypole": {
				description: "East of Abandon Hope is a large “May Pole” and “Musicians and Dancers” tent. You can learn to play an instrument or dance so you can participate, or you can just watch.",
				clippath: "polygon(71.93% 78.58%, 74.8% 80.41%, 78.33% 78.97%, 80.81% 80.93%, 81.59% 83.02%, 80.81% 86.41%, 78.2% 87.59%, 76.11% 86.28%, 74.41% 83.93%, 71.28% 84.32%, 69.32% 82.89%)"
			},
			"heavensawait": {
				description: "South of the May Pole is the “Heavens Await”. If weather permits, adventurers may take a ride over Carnival in one of these multicolored miracles. Ride times are about an hour, but no better view exists.",
				clippath: "polygon(79.77% 95.68%, 78.85% 89.55%, 84.2% 87.98%, 84.33% 86.41%, 83.03% 84.45%, 83.42% 82.63%, 84.07% 81.97%, 85.25% 81.84%, 86.16% 83.28%, 86.16% 84.98%, 85.38% 86.41%, 85.51% 87.98%, 86.95% 89.81%, 88.12% 95.42%)"
			},
			"checkmate": {
				description: "East of the May Pole is “Checkmate”. Watch a living chess game on the big board with Carnival actors making great display of their talents and wit while trying to decide who will win.",
				clippath: "polygon(86.81% 77.27%, 87.99% 78.71%, 86.55% 79.75%, 86.29% 81.32%, 86.68% 83.15%, 89.69% 83.8%, 89.56% 88.37%, 85.77% 87.98%, 85.38% 86.41%, 86.16% 85.5%, 86.16% 84.19%, 84.99% 82.36%, 83.81% 82.63%, 83.03% 84.32%, 84.33% 86.41%, 84.2% 87.72%, 82.64% 87.59%, 82.64% 82.76%, 80.94% 79.49%, 81.59% 77.14%, 84.33% 76.62%)"
			},
			"sherwood": {
				description: "North of Checkmate can be found “Sherwood”. Here in the forest, you can learn from Robin’s friends how to climb rope ladders, play tug of war, or try log rolling or quarter staff dueling. Be sure to explore the tree castle.",
				clippath: "polygon(86.29% 63.04%, 90.08% 62.13%, 93.99% 64.35%, 94.39% 68.66%, 95.3% 71.4%, 95.04% 75.71%, 92.17% 77.14%, 87.99% 78.97%, 86.55% 77.4%, 84.07% 76.62%, 81.72% 77.27%, 80.81% 79.23%, 78.33% 78.19%, 75.07% 79.75%, 74.15% 75.84%, 72.58% 72.18%, 74.41% 69.05%, 74.93% 67.48%, 80.94% 64.87%)"
			},
			"southeastrestrooms": {
				description: "Despite the fact that there are rest rooms and first aid available throughout the park, we put these here along the southeast edge in case you couldn’t find them elsewhere!",
				clippath: "polygon(97.26% 76.89%, 99.87% 73.76%, 100% 81.85%, 98.83% 80.55%)"
			},
			"jugglersroost": {
				description: "East of Checkmate is “Jugglers Roost”. Here there are jugglers and acrobats to amaze and enchant you with shows of wit and humor.",
				clippath: "polygon(89.69% 81.46%, 91.12% 78.98%, 93.73% 76.11%, 95.95% 77.81%, 97.65% 81.07%, 98.3% 83.94%, 96.34% 85.51%, 93.21% 86.68%, 90.73% 84.46%)"
			},
			"threetreatsrow": {
				description: "Just south of the Jugglers Roost is “Three Treats Row” where you can find plain and caramel popcorn, cotton candy, and warm pretzels... mall things we’re sure they wish they had in the Middle Ages.",
				clippath: "polygon(93.21% 88.38%, 93.73% 86.42%, 94.91% 85.51%, 96.34% 86.03%, 97.26% 87.47%, 98.04% 88.38%, 98.04% 89.69%, 93.08% 91.91%, 91.91% 90.99%, 91.91% 89.3%)"
			},
			"decoysdelight": {
				description: "The southwest corner of Carnival contains “Decoys Delight”. Bertrand always wanted a duck pond, so we let him use this one for his collection of mechanical wooden ducks. Come visit, and maybe leave with a friend.",
				clippath: "polygon(89.95% 93.6%, 97.52% 91.51%, 99.87% 91.38%, 99.87% 100%, 92.43% 99.87%, 90.86% 97.13%)"
			},
			"farelane": {
				description: "North of Sherwood is a row of simple huts. In the “Fare Lane” you can find foods like turkey legs, fried sausage, pancakes, funnel cakes, and cream puffs. Enjoy and keep up your strength.",
				clippath: "polygon(73.37% 65.01%, 76.11% 63.05%, 80.81% 61.1%, 84.86% 60.7%, 85.9% 62.53%, 80.55% 64.23%, 77.42% 65.8%, 73.89% 67.36%)"
			},
			"tudorvillage": {
				description: "North of Fare Lane is “Tudor Village”. Here there are crafts persons with various skills from the Middle Ages. Learn or watch candle making, glass blowing, wood working, forging, weaving and other skills.",
				clippath: "polygon(76.64% 62.14%, 75.47% 57.31%, 77.3% 53.52%, 79.65% 50.65%, 84.61% 45.3%, 88.26% 44.78%, 89.96% 45.3%, 90.35% 47%, 85.39% 53.92%, 86.3% 57.57%, 86.3% 58.75%, 81.73% 60.84%)"
			},
			"enchantedforest": {
				description: "East of Tudor Village and Sherwood is the “Enchanted Forest”. Carriages will leave from Tudor Village to take you ‘safely’ on a tour to see fairies, fawns, sylphs, elves, unicorns and an occasional dragon. Stay with your tour!",
				clippath: "polygon(93.99% 48.3%, 98.17% 51.04%, 99.87% 56.14%, 100% 69.45%, 98.43% 74.15%, 96.34% 76.37%, 95.43% 74.15%, 95.43% 71.15%, 94.39% 67.89%, 94.39% 64.62%, 89.95% 61.75%, 87.47% 62.27%, 88.12% 59.14%, 88.12% 57.18%, 86.42% 55.22%, 86.55% 52.61%, 88.25% 49.22%, 90.6% 46.21%)"
			},
			"pegasisdance": {
				description: "North of Enchanted Forest is “Pegasi’s Dance”. This is your chance to mount a Pegasus and take off for a swirling flight. Unlike Bellerophon, you won’t need to fight the Chimera!",
				clippath: "polygon(92.69% 37.99%, 96.74% 38.25%, 97.65% 41.51%, 97.65% 45.43%, 95.43% 47.91%, 93.21% 47.65%, 92.04% 45.04%)"
			},
			"dwarvenkingdom": {
				description: "East of Knights’ Court-Yard is the “Dwarven Kingdom”. This roller coaster takes you through gem and gold mines, past attacking orcs, goblins, ogres, trolls, and dragons to the dwarves and the Hall of the Mountain King.",
				clippath: "polygon(55.48% 51.31%, 63.84% 45.17%, 65.8% 47.91%, 68.15% 51.04%, 70.63% 54.7%, 71.15% 58.22%, 68.41% 58.75%, 65.93% 61.36%, 62.4% 59.92%, 59.14% 57.05%, 57.57% 53.79%)"
			},
			"pointofnoreturn": {
				description: "East of the Dwarven Kingdom is “Point of No Return”. This flume ride will flow you past sea monsters and waterfalls over the edge of the world into a fantasy adventure for the ages!",
				clippath: "polygon(64.75% 47.26%, 75.85% 37.86%, 82.25% 40.73%, 85.77% 42.69%, 85.25% 44.65%, 78.72% 50.39%, 73.5% 54.31%, 66.58% 49.74%)"
			},
			"onceuponatime": {
				description: "North of the Point of No Return is “Once Upon A Time”. In here you can meet representatives of most creatures, big or small, who populate the stories you have been reading all your life.",
				clippath: "polygon(61.36% 28.72%, 70.89% 22.58%, 77.28% 34.6%, 77.55% 36.42%, 68.41% 42.95%, 66.32% 38.77%, 66.06% 37.6%, 64.88% 36.68%, 61.23% 30.81%)"
			},
			"vintagefriars": {
				description: "North of the Dwarven Kingdom are the “Vintage Friars”. Experience the crafts which monasteries of the Middle Ages were renowned for, including illustrated texts, stained glass, organ music, fine wines and brandies.",
				clippath: "polygon(61.75% 34.2%, 65.01% 39.16%, 65.54% 36.81%, 66.58% 38.25%, 66.19% 44.13%, 61.62% 46.87%, 60.31% 46.34%, 57.44% 48.3%, 54.44% 43.08%, 54.7% 40.99%, 56.79% 39.82%, 56.79% 36.68%)"
			},
			"jewel": {
				description: "North of the Vintage Friars is the “Jewel”. Various stones and minerals have always been thought to have special powers. In this gem and mineral show/shop, take time to find stones which speak to you.",
				clippath: "polygon(52.75% 28.58%, 55.62% 26.23%, 58.11% 28.45%, 58.76% 31.32%, 57.58% 33.8%, 56.28% 35.76%, 53.27% 35.63%, 52.1% 34.85%, 51.97% 30.8%)"
			},
			"dragonshield": {
				description: "Northwest of the Jewel is the “Dragon Shield”. This medieval tavern has many traditional foods such as fried fish, ratatouille, shepherd’s pie, leg of lamb, and chicken or venison pot pies. As with any decent tavern, good ale can be found here too.",
				clippath: "polygon(48.71% 17.49%, 50.66% 18.41%, 51.58% 18.02%, 51.97% 19.06%, 53.8% 19.84%, 53.54% 22.45%, 51.97% 25.46%, 48.58% 28.72%, 47.4% 28.07%, 47.14% 23.89%, 47.79% 20.63%)"
			},
			"alchemist": {
				description: "Northeast of the Jewel is the “Alchemist”. Learn about the historical use of herbs and barks for curative purposes. Not all alchemy sought to turn lead to gold. If you figure that one out though, we are definitely interested!",
				clippath: "polygon(56.4% 23.24%, 57.83% 22.98%, 59.92% 19.71%, 61.49% 18.93%, 62.4% 17.49%, 65.14% 17.75%, 65.27% 19.84%, 65.14% 22.06%, 65.14% 22.72%, 65.67% 23.11%, 65.14% 24.54%, 63.19% 24.54%, 60.84% 26.5%, 56.01% 24.93%, 56.14% 24.15%)"
			},
			"mageshat": {
				description: "Northeast of Point of No Return is the “Mage’s Hat”. Besides the amazing magical shows, there is a chance for those who wish to learn magic to do just that. Customers can learn a trick unique to them for the day.",
				clippath: "polygon(86.03% 42.95%, 85.25% 39.82%, 86.95% 36.81%, 88.9% 34.2%, 90.34% 37.86%, 91.38% 39.95%, 90.21% 43.47%)"
			},
			"castlebattles": {
				description: "Northeast of Mage’s Hat is “Castle Battles”. Participate in a wet and exciting water battle between neighboring castles. Use water balloons and water bows and water catapults to soak your foe into submission.",
				clippath: "polygon(77.55% 37.34%, 78.59% 35.38%, 78.98% 32.77%, 81.07% 31.72%, 82.51% 30.42%, 84.99% 28.72%, 89.43% 30.68%, 90.08% 34.07%, 89.03% 34.46%, 87.73% 36.29%, 86.68% 37.34%, 83.42% 40.47%)"
			},
			"hedgemaze": {
				description: "North of Castle Battles is the “Hedge Maze”. Work your way through this maze to get to the center and then back out again. Be aware that sections will change periodically, so you might not get out the way you got in!",
				clippath: "polygon(75.33% 24.15%, 76.89% 24.54%, 78.07% 22.85%, 84.07% 21.02%, 87.08% 21.41%, 90.08% 30.94%, 84.99% 28.59%, 78.59% 33.68%, 77.55% 33.03%, 75.46% 29.77%, 73.11% 24.28%)"
			},
			"cartwheel": {
				description: "Northwest of Hedge Maze is “Cart Wheel”. This version of a Ferris wheel is not for the faint of heart. It not only rotates, but it also rolls along a track. Just when you thought it was finished, it does the trip in reverse!",
				clippath: "polygon(66.19% 11.1%, 68.54% 9.4%, 70.1% 12.79%, 72.06% 11.62%, 73.37% 14.62%, 75.2% 13.58%, 76.5% 15.93%, 77.02% 17.62%, 76.5% 19.58%, 74.8% 21.02%, 64.75% 14.88%)"
			},
			"moat": {
				description: "East of Hedge Maze is the “Moat”. Once you cross the bridge into the castle courtyard, you can board a ride which takes you for a tour of this deep and creepy moat. You never know what you might see.",
				clippath: "polygon(87.21% 22.19%, 91.78% 20.23%, 96.87% 20.89%, 98.69% 29.24%, 95.43% 29.11%, 91.64% 31.46%, 90.21% 30.68%, 88.9% 26.63%)"
			},
			"cupboard": {
				description: "East of the Moat is an unassuming tent known as the “Cupboard”. The seller here has many different types of cups and goblets for sale. If you look hard, maybe you can find one needed just to the North!",
				clippath: "polygon(97.39% 20.5%, 99.22% 19.58%, 99.87% 21.67%, 99.74% 22.85%, 98.17% 23.24%, 97.13% 21.8%)"
			},
			"dragonslair": {
				description: "North of the Moat is the “Dragon’s Lair”. This indoor/outdoor roller coaster takes you on a tour of the dragon’s lair from the perspective of the flying dragon looking to find the thief who stole a single goblet.",
				clippath: "polygon(96.21% 0%, 100% 0%, 100% 16.32%, 96.48% 15.93%, 95.04% 17.23%, 92.56% 16.84%, 92.3% 17.89%, 90.73% 18.67%, 89.3% 19.19%, 88.51% 20.1%, 87.08% 19.97%, 85.25% 20.63%, 83.81% 20.63%, 82.77% 21.28%, 81.2% 20.76%, 79.37% 20.63%, 79.5% 17.89%, 79.5% 15.67%, 80.68% 15.01%, 81.85% 15.67%, 82.77% 13.97%, 82.9% 12.01%, 84.07% 11.49%, 86.42% 10.97%, 87.47% 9.4%, 89.3% 9.4%, 90.08% 7.05%, 91.38% 6.01%, 92.95% 6.66%, 95.04% 3.79%)"
			},
			"arabianknights": {
				description: "West of the Dragon’s Lair is “Arabian Knights”. This middle eastern, middle ages adventure ride will make you want to rub every lamp you ever see!",
				clippath: "polygon(77.94% 0.26%, 81.46% 0.26%, 87.99% 5.22%, 87.86% 7.83%, 84.86% 10.84%, 83.68% 10.84%, 83.03% 12.66%, 81.72% 15.14%, 80.55% 14.88%, 79.77% 16.32%, 78.85% 16.45%, 76.24% 14.62%, 74.02% 13.05%, 71.93% 12.01%, 69.97% 9.53%, 70.23% 7.83%, 74.02% 3.79%)"
			},
			"goflyakite": {
				description: "Northwest of the Dragon’s Lair is “Go Fly a Kite”. Learn about kite history and how to best fly them. See numerous styles and perhaps, take one home with you.",
				clippath: "polygon(89.16% 0.26%, 92.56% 0.13%, 96.21% 0.13%, 93.86% 5.87%, 91.64% 5.35%, 89.82% 6.92%, 89.03% 4.96%, 88.9% 2.87%)"
			},
			"siegeanddefense": {
				description: "Northeast of the Dragon Shield is “Siege and Defense”. Learn some of the ways in which castles were defended and attacked during the Middle Ages.",
				clippath: "polygon(51.7% 12.92%, 56.92% 10.05%, 61.88% 12.01%, 62.4% 15.93%, 58.09% 19.45%, 56.01% 18.8%, 55.22% 19.58%, 53.66% 19.06%, 52.61% 18.15%, 51.57% 17.75%)"
			},
			"trollbridge": {
				description: "Northeast of the Siege and Defense is the “Troll Bridge”. We recommend approaching only from the north and stopping first at the tent which supplies papier-mâché sheep to take with you.",
				clippath: "polygon(56.27% 10.57%, 55.74% 1.44%, 57.83% 0.78%, 58.75% 2.22%, 58.22% 4.7%, 60.05% 4.05%, 61.62% 1.57%, 63.05% 3.52%, 65.54% 3.52%, 67.75% 4.05%, 71.02% 3.26%, 71.8% 4.57%, 71.41% 6.01%, 70.37% 7.57%, 67.1% 8.75%, 65.54% 9.79%, 64.49% 10.44%, 62.4% 13.71%, 61.75% 11.88%)"
			},
			"entforest": {
				description: "Northwest of Siege and Defense is the “Ent Forest”. It is said that here the trees are able to move and speak and tell wonderful stories.",
				clippath: "polygon(42.44% 9.67%, 43.22% 8.63%, 44.53% 6.8%, 45.7% 5.76%, 48.31% 5.1%, 50.14% 4.84%, 52.75% 4.71%, 53.41% 6.15%, 54.71% 7.71%, 54.45% 9.15%, 53.67% 11.11%, 50.14% 13.85%, 47.4% 14.11%, 44.27% 13.59%, 43.09% 13.07%, 42.31% 11.63%)"
			},
			"tempusfugit": {
				description: "North of the Fairy Fort is “Tempus Fugit”. The ride starts in a corner of the top inside of the hourglass and swirls in ever smaller circles at increasing speeds until it gets to the center where the process reverses until it ends slowly at the bottom.",
				clippath: "polygon(33.06% 12.39%, 38.28% 12.65%, 37.34% 16.58%, 36.06% 18.4%, 36.98% 20.09%, 38.81% 21.14%, 35.93% 24.66%, 30.71% 25.05%, 31.33% 21.41%, 32.64% 19.32%, 33.03% 18.02%, 32.02% 15.92%, 30.58% 15.26%)"
			},
			"archeryrange": {
				description: "North of Tempus Fugit is the “Archery Range” This area can train you in the safe and proper use of many styles of bows. You can also take part in an archery contest if you think you have the skills to beat the current champion.",
				clippath: "polygon(36.81% 12.01%, 42.04% 11.88%, 42.04% 13.32%, 39.56% 19.06%, 37.73% 20.63%, 36.29% 18.54%, 37.08% 16.71%, 37.86% 13.84%, 38.38% 12.4%)"
			},
			"dreamsellers": {
				description: "North of the Archery Range is a tent that appears to be made of mist and shadows. This is the “Dream Seller’s” tent. It is possible to purchase not only dream catchers here, but dreams as well. Be careful what you wish for.",
				clippath: "polygon(40.11% 5.61%, 41.68% 7.31%, 42.46% 8.62%, 41.42% 10.31%, 39.72% 10.57%, 38.02% 9.79%, 38.68% 7.7%)"
			},
			"battleground": {
				description: "West of the Archery Range is “Battleground”. Enter a circular closet with projection walls and special armor and weapons which will allow you to take part in a multi-person virtual reality battlefield melee. Not for the faint of heart.",
				clippath: "polygon(27.06% 9.38%, 36.46% 10.68%, 35.77% 12.27%, 33.29% 12.14%, 30.97% 15.25%, 32.02% 16.04%, 33.03% 16.97%, 30.71% 21.39%, 21.57% 18.65%)"
			},
			"emeraldpalace": {
				description: "Near the center of Carnival is the “Emerald Palace”. There are many rooms to visit, people to interact with, and sights to see in this palace. Each evening is a Royal Ball. See if you can get yourself invited but be sure you leave by midnight.",
				clippath: "polygon(37.22% 34.18%, 37.74% 32.35%, 38.65% 34.57%, 39.57% 35.88%, 41.26% 36.53%, 41% 33.4%, 41.79% 30.53%, 42.44% 33.53%, 42.57% 35.88%, 44.79% 35.62%, 44.53% 28.7%, 44.92% 25.43%, 46.09% 28.83%, 46.36% 35.49%, 48.58% 35.49%, 48.97% 33.27%, 49.49% 30.13%, 50.4% 33.53%, 50.66% 36.01%, 52.49% 40.58%, 52.88% 39.53%, 53.8% 41.36%, 53.8% 45.54%, 55.1% 50.37%, 49.62% 51.81%, 48.05% 49.85%, 45.57% 49.72%, 46.62% 52.33%, 43.74% 52.07%, 41.26% 52.72%, 40.09% 52.72%, 39.7% 50.11%, 39.44% 47.89%, 38.26% 45.54%, 36.3% 42.41%, 37.61% 41.1%)"
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
						ELEMENTS.map.appendChild(element)
						ELEMENTS.zones[i] = element
					}
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

				// zone
					let hoverElement = document.elementFromPoint(x, y)
					if (hoverElement && hoverElement.className.includes("zone")) {
						let id = hoverElement.id.replace("zone-", "")

						let currentText = ELEMENTS.description.innerText || null
						if (!currentText || currentText !== ZONES[id].description) {
							ELEMENTS.description.innerText = ZONES[id].description
						}
					}
					else if (hoverElement && (hoverElement == document.body || hoverElement == ELEMENTS.map)) {
						ELEMENTS.description.innerText = ""
					}

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
