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
				clippath: "polygon(52.61% 88.11%, 54.83% 88.37%, 57.31% 91.64%, 56.66% 98.96%, 51.57% 99.09%, 51.04% 91.91%, 52.09% 90.07%)"
			},
			"thekeepsake": {
				description: "Just inside the entrance to the Park is a Keep known as “The Keepsake” which contains souvenir and food shops, with an area outside for enjoying a relaxing game of lawn bowling.",
				clippath: "polygon(51.96% 73.76%, 55.22% 72.85%, 57.05% 77.15%, 58.09% 79.9%, 58.22% 83.29%, 54.31% 87.21%, 49.87% 83.94%, 47.65% 77.42%)"
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
				description: "North of the Field of Honor is a large merry-go-round called the “Parade of Enchanted Mounts”. These magical beasts are sure to appeal to children of all ages.",
				clippath: "polygon(58.88% 62.79%, 59.01% 65.01%, 59.53% 67.23%, 55.61% 69.19%, 50.26% 67.75%, 50% 62.79%, 51.83% 61.75%, 54.57% 60.31%)"
			},
			"knightscourtyard": {
				description: "North of the Parade of Enchanted Mounts is the “Knights’ Court-Yard” for picnicking and family relaxing. These topiary knights may seem to move occasionally, so don’t be surprised if they watch you too.",
				clippath: "polygon(49.22% 51.83%, 52.61% 51.04%, 63.32% 60.84%, 63.58% 64.49%, 60.44% 65.67%, 59.14% 64.49%, 58.75% 62.53%, 54.7% 60.18%, 50.13% 62.66%, 50.26% 66.06%, 48.56% 67.1%, 46.34% 66.84%, 46.21% 63.19%, 48.17% 60.31%)"
			},
			"allthekingshorsesandallthekingsmen": {
				description: "Just to the west of The Knights’ Court-Yard is “All the King’s Horses and all the King’s Men” where egg-shaped transports sway passengers precariously all the way around the top of the wall. Hopefully, they will not fall...",
				clippath: "polygon(35.64% 55.87%, 46.87% 51.57%, 48.3% 58.75%, 43.99% 67.1%, 38.25% 73.37%, 35.51% 71.28%, 36.95% 63.32%)"
			},
			"thehive": {
				description: "Just northwest of the Keepsake can be found “The Hive”. Here you can see and taste how special honey was in medieval life. Mead is obtainable here for adults.",
				clippath: "polygon(43.99% 66.97%, 46.08% 66.19%, 50.65% 68.54%, 51.96% 71.67%, 46.61% 75.85%, 42.43% 74.41%, 42.3% 68.93%)"
			},
			"thewindmill": {
				description: "Just north of All the King’s Horses and all the King’s Men is the “Windmill”. Sit in one of the curved sections at the ends of the arms and enjoy a swirling ride as the whole windmill spins and rises and falls.",
				clippath: "polygon(35.9% 43.08%, 39.3% 47.91%, 39.43% 50.39%, 35.12% 52.48%, 33.42% 50.65%, 30.81% 48.43%, 30.81% 45.3%)"
			},
			"magicalfruit": {
				description: "West of the Windmill is the “Magical Fruit”. Here you can get not only a history of various fruits and how and where they were first used, but also the best smoothies in the park.",
				clippath: "polygon(23.5% 38.12%, 26.37% 39.43%, 27.02% 42.95%, 25.85% 44.52%, 23.37% 44.91%, 21.8% 41.78%)"
			},
			"fairyfort": {
				description: "North of the Serpent’s Coils is the “Fairy Fort”. Enjoy exploring this magical tree fortress with its sprites and fairies. You may even witness how excited they get when the Gryphons fly over.",
				clippath: "polygon(28.98% 34.2%, 29.9% 31.46%, 32.25% 30.03%, 33.94% 29.63%, 35.9% 31.98%, 35.25% 34.86%, 34.07% 36.16%, 34.6% 37.6%, 32.9% 39.43%, 30.42% 38.12%, 30.29% 36.29%)"
			},
			"counterweight": {
				description: "East of the Fairy Fort is the “Counterweight”. Two smaller Ferris wheels are positioned at either end of a larger rotating arm, so that each wheel rotates individually as the big arms also rotate.",
				clippath: "polygon(36.42% 27.94%, 38.51% 27.68%, 42.56% 24.67%, 43.08% 22.45%, 44.65% 22.19%, 45.69% 23.76%, 44.65% 26.37%, 43.21% 25.98%, 41.78% 27.28%, 43.73% 34.6%, 42.69% 35.51%, 42.82% 32.64%, 41.91% 29.5%, 41.25% 32.77%, 41.25% 35.77%, 40.34% 35.51%, 38.9% 34.2%, 39.56% 31.59%, 38.77% 30.94%, 38.12% 31.72%, 37.08% 31.46%, 35.9% 29.9%)"
			},
			"merchantoftime": {
				description: "North of the Counterweight is the “Merchant of Time”. In this tent you may find all sorts of time pieces for sale. From sundials to pendulum clocks, to regular clocks and watches, to more unique pieces. Don’t loose track of time.",
				clippath: "polygon(38.12% 23.89%, 40.34% 24.41%, 41.12% 25.72%, 38.77% 27.68%, 36.55% 27.94%, 37.21% 25.72%)"
			},
			"followtherainbow": {
				description: "Just west of the Keepsake is “Follow the Rainbow”. It is a series of large different colored slides which can be ridden to the Pot of Gold at the end. Some colors dip below and then over others.",
				clippath: "polygon(33.55% 80.55%, 34.99% 75.07%, 38.9% 74.54%, 44.65% 77.68%, 48.43% 85.38%, 46.34% 86.55%, 36.81% 84.46%)"
			},
			"theknarr": {
				description: "“The Knarr” is just to the west of the entrance way. It is a Viking boat ride which will rock adventurers forward and back in increasingly larger arcs. Rough seas may be in store...",
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
				description: "West of The Juggle is “The Joust” This is a roller coaster where two horse-shaped cars travel in a perfectly timed dance, passing very closely in what looks to be an exciting joust... or crash.",
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
			"gryphonsnests1": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(0.78% 68.02%, 0.65% 61.88%, 2.61% 59.79%, 7.18% 61.88%, 8.49% 63.05%, 9.53% 66.58%, 6.53% 69.32%)"
			},
			"gryphonsnests2": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(41.78% 13.45%, 43.86% 13.45%, 44.26% 16.97%, 45.3% 17.23%, 45.95% 19.45%, 45.17% 22.45%, 43.21% 22.45%, 41.91% 22.45%, 39.82% 21.67%, 40.6% 18.8%, 41.51% 16.97%)"
			},
			"gryphonsnests3": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(95.3% 29.11%, 97.52% 29.11%, 99.35% 32.25%, 95.43% 36.95%, 91.78% 34.86%, 93.08% 30.94%)"
			},
			"gryphoncar1": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(26.37% 35.25%, 29.24% 35.38%, 30.03% 37.34%, 28.72% 37.99%, 27.81% 39.3%, 25.85% 38.51%, 25.07% 37.47%)"
			},
			"gryphoncar2": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(66.06% 19.06%, 67.49% 19.45%, 68.15% 20.23%, 67.89% 21.54%, 66.58% 21.54%, 65.67% 21.8%)"
			},
			"gryphonsupport1": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(20.23% 40.08%, 21.8% 40.21%, 22.06% 41.91%, 22.06% 45.82%, 21.41% 46.34%, 20.23% 45.3%)"
			},
			"gryphonsupport2": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(33.03% 24.54%, 35.38% 24.54%, 34.99% 26.11%, 34.99% 28.33%, 34.46% 29.37%, 33.68% 28.85%, 33.16% 26.37%)"
			},
			"gryphonsupport3": {
				description: "There are three entrance and/or exits for the “Gryphons' Nests”. One in the southwest, one in the middle north and one in the northeast. This cable ride in Gryphon cars allows a stunning aerial view of Carnival.",
				clippath: "polygon(75.98% 21.28%, 77.55% 20.89%, 77.81% 22.19%, 77.55% 23.63%, 76.76% 24.8%, 75.85% 24.02%, 75.85% 22.72%)"
			},
			"thecrown": {
				description: "North of the Joust is “The Crown”. A spiraling ride along the inner edge shows history’s most memorable royal families. The top half of this ride is a very fancy restaurant, fit for royalty.",
				clippath: "polygon(12.92% 73.63%, 15.93% 71.41%, 18.41% 73.89%, 19.71% 77.28%, 18.67% 79.11%, 18.93% 81.46%, 15.8% 83.55%, 12.53% 82.25%, 12.53% 79.37%, 11.88% 76.76%)"
			},
			"thebazaar": {
				description: "North of the Crown is a large tent complex called “The Bazaar”. You will find many sellers of interesting crafts, foods, and items you have probably never seen before. Enjoy the experience!",
				clippath: "polygon(15.14% 69.32%, 21.15% 72.06%, 27.68% 74.28%, 31.46% 73.5%, 33.55% 76.11%, 33.29% 79.37%, 19.84% 78.07%, 18.54% 73.89%, 15.8% 71.54%, 13.19% 73.63%, 11.75% 76.63%, 10.31% 72.19%, 10.84% 69.71%)"
			},
			"serpentscoils": {
				description: "The “Serpent’s Coils” lie north of the Bazaar. Stroll through the sea serpent’s coils and see the wonders visible under water. If you make it to the end, have your photo taken in the serpent’s mouth.",
				clippath: "polygon(16.32% 46.34%, 19.45% 46.21%, 21.54% 47.52%, 24.54% 46.61%, 28.07% 48.43%, 32.64% 49.87%, 33.81% 53.66%, 36.42% 60.97%, 35.12% 68.15%, 32.51% 71.54%, 27.81% 72.45%, 20.5% 70.5%, 15.14% 68.02%, 11.75% 68.67%, 10.31% 67.49%, 11.1% 65.93%, 9.79% 63.05%, 5.48% 59.01%, 9.14% 54.18%, 12.01% 51.44%)"
			},
			"standingstones": {
				description: "West of the Serpent’s Coils is the “Standing Stones”. Some think that these ancient sites were astrological timekeepers, or portals to other worlds. Stand in the center and start a journey through other times and worlds!",
				clippath: "polygon(0.78% 33.16%, 2.09% 32.9%, 4.18% 34.6%, 5.74% 34.07%, 7.57% 34.86%, 8.75% 34.86%, 9.66% 35.51%, 10.84% 35.12%, 12.4% 35.51%, 15.4% 38.38%, 17.23% 39.03%, 18.41% 40.6%, 18.02% 41.78%, 18.15% 44.52%, 16.58% 45.04%, 14.49% 46.21%, 13.45% 47.65%, 10.84% 49.74%, 8.22% 52.61%, 5.87% 53.79%, 3.13% 54.05%, 0.65% 53.13%)"
			},
			"sanctuary": {
				description: "North of the Standing Stones is “Sanctuary”. This cathedral will display medieval religious art and sculpture, pomp and circumstance, and beautiful stained-glass windows. There is rest here.",
				clippath: "polygon(15.8% 24.28%, 18.8% 22.06%, 19.45% 18.54%, 19.71% 17.23%, 20.5% 18.67%, 21.28% 19.19%, 22.32% 18.15%, 23.89% 20.23%, 25.2% 19.71%, 25.72% 21.02%, 25.85% 24.02%, 29.11% 25.2%, 30.03% 26.24%, 28.07% 30.94%, 25.98% 32.64%, 24.54% 34.46%, 22.72% 35.9%, 20.76% 38.38%, 19.45% 37.47%, 17.89% 36.68%, 17.23% 35.38%, 14.75% 34.73%, 11.75% 32.51%, 11.62% 30.03%, 12.92% 28.59%, 14.1% 26.37%)"
			},
			"dragonflume": {
				description: "North of Sanctuary is the “Dragon Flume”. Ride the swiftly moving water along the back of the dragon until, at last, it sprays you forth from the dragon’s mouth in a spiral.",
				clippath: "polygon(5.87% 5.09%, 6.66% 2.74%, 8.88% 0.78%, 11.1% 0.91%, 13.05% 3.39%, 15.14% 3.66%, 20.5% 9.4%, 20.89% 12.79%, 21.15% 15.01%, 20.5% 16.84%, 17.36% 19.19%, 16.32% 21.15%, 13.58% 21.41%, 12.14% 20.89%, 10.57% 21.28%, 7.57% 20.37%, 4.83% 20.5%, 2.61% 19.19%, 1.83% 17.36%, 2.48% 10.57%, 5.22% 7.44%)"
			},
			"relicsofthedragon": {
				description: "West of the Dragon Flume are four tents, known collectively as the “Relics of the Dragon”. You can find dragon’s claws, dragon’s teeth, dragon’s scales, and dragon’s breath, and items made with them.",
				clippath: "polygon(2.35% 6.92%, 4.31% 5.35%, 5.22% 7.18%, 4.05% 8.75%, 2.87% 9.79%, 2.35% 10.97%, 2.09% 15.54%, 1.04% 15.4%, 0.78% 9.92%, 1.96% 8.88%)"
			},
			"wreckedship": {
				description: "Northwest of the Dragon Flume is the “Wrecked Ship”. This is a derelict and haunted remnant of the shattered dreams of once valiant adventurers. You’ll need your bravery if you venture here.",
				clippath: "polygon(1.96% 2.61%, 6.92% 2.48%, 6.27% 4.7%, 5.48% 6.14%, 4.7% 5.87%, 4.31% 5.22%, 2.61% 6.66%, 2.09% 7.18%, 1.17% 5.87%, 1.04% 3.79%)"
			},
			"circusoftheimagination": {
				description: "Northeast of the Dragon Flume is the “Circus of the Imagination”. See magical creatures performing acts which any traditional circus would envy.",
				clippath: "polygon(20.5% 5.09%, 23.63% 3%, 27.15% 5.35%, 27.28% 8.22%, 24.41% 10.31%, 20.23% 8.62%)"
			},
			"odeum": {
				description: "East of the entrance is a large amphitheater, the “Odeum” where various plays, magic shows, juggling acts, and musical ensembles can be enjoyed throughout the day. Relax on the lawn and enjoy.",
				clippath: "polygon(61.1% 87.99%, 63.32% 85.12%, 69.58% 85.25%, 73.76% 85.9%, 76.5% 89.16%, 77.02% 92.43%, 76.89% 95.82%, 72.72% 96.74%, 64.49% 96.08%, 61.23% 91.64%)"
			},
			"armory": {
				description: "North of the Odeum is the “Armory”. Here you can look at armor and weapons of leather, wood or metal. Armor is bespoke and must fitted to each customer and must be shipped for delivery. Real weapons are not permitted in the park.",
				clippath: "polygon(60.44% 82.51%, 63.84% 81.07%, 65.27% 82.38%, 65.4% 84.2%, 61.62% 86.03%, 60.57% 84.73%)"
			},
			"abandonhope": {
				description: "Just east of the Field of Honor is a cave with a sign reading “Abandon Hope...”. This underground maze contains twists and turns and large numbers of beasts to be wary of. Can you find your way through?",
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
				description: "Just south of the Jugglers Roost is “Three Treats Row” where you can find plain and caramel popcorn, cotton candy, and warm pretzels... mall things we’re sure they wish they had in the Middle Ages.",
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
				description: "East of Knights’ Court-Yard is the “Dwarven Kingdom”. This roller coaster takes you through gem and gold mines, past attacking orcs, goblins, ogres, trolls, and dragons to the dwarves and the Hall of the Mountain King.",
				clippath: "polygon(55.48% 51.31%, 63.84% 45.17%, 65.8% 47.91%, 68.15% 51.04%, 70.63% 54.7%, 71.15% 58.22%, 68.41% 58.75%, 65.93% 61.36%, 62.4% 59.92%, 59.14% 57.05%, 57.57% 53.79%)"
			},
			"pointofnoreturn": {
				description: "East of the Dwarven Kingdom is “Point of No Return”. This flume ride will flow you past sea monsters and waterfalls over the edge of the world into a fantasy adventure for the ages!",
				clippath: "polygon(65.4% 47.65%, 75.85% 37.86%, 82.9% 40.99%, 85.51% 43.34%, 85.25% 44.65%, 78.72% 50.39%, 73.5% 54.31%, 67.23% 49.74%)"
			},
			"onceuponatime": {
				description: "North of the Point of No Return is “Once Upon A Time”. In here you can meet representatives of most creatures, big or small, who populate the stories you have been reading all your life.",
				clippath: "polygon(61.88% 28.33%, 70.89% 22.58%, 77.81% 34.2%, 77.81% 35.9%, 69.06% 42.95%, 66.32% 38.77%, 66.45% 37.73%, 65.67% 36.81%, 61.62% 31.07%)"
			},
			"vintagefriars": {
				description: "North of the Dwarven Kingdom are the “Vintage Friars”. Experience the crafts which monasteries of the Middle Ages were renowned for, including illustrated texts, stained glass, organ music, fine wines and brandies.",
				clippath: "polygon(61.75% 34.2%, 65.01% 39.16%, 65.54% 36.81%, 66.58% 38.25%, 66.19% 44.13%, 61.62% 46.87%, 60.31% 46.34%, 57.44% 48.3%, 54.44% 43.08%, 54.7% 40.99%, 56.79% 39.82%, 56.79% 36.68%)"
			},
			"jewel": {
				description: "North of the Vintage Friars is the “Jewel”. Various stones and minerals have always been thought to have special powers. In this gem and mineral show/shop, take time to find stones which speak to you.",
				clippath: "polygon(53% 28.33%, 55.87% 25.98%, 58.36% 28.2%, 59.01% 31.07%, 57.83% 33.55%, 56.53% 35.51%, 53.52% 35.38%, 52.35% 34.6%, 52.22% 30.55%)"
			},
			"dragonshield": {
				description: "Northwest of the Jewel is the “Dragon Shield”. This medieval tavern has many traditional foods such as fried fish, ratatouille, shepherd’s pie, leg of lamb, and chicken or venison pot pies. As with any decent tavern, good ale can be found here too.",
				clippath: "polygon(48.96% 17.49%, 50.91% 18.41%, 51.83% 18.02%, 52.22% 19.06%, 54.05% 19.84%, 53.79% 22.45%, 52.22% 25.46%, 48.83% 28.72%, 47.65% 28.07%, 47.39% 23.89%, 48.04% 20.63%)"
			},
			"alchemist": {
				description: "Northeast of the Jewel is the “Alchemist”. Learn about the historical use of herbs and barks for curative purposes. Not all alchemy sought to turn lead to gold. If you figure that one out though, we are definitely interested!",
				clippath: "polygon(56.4% 23.24%, 57.83% 22.98%, 60.05% 19.58%, 61.49% 18.93%, 62.4% 17.49%, 65.14% 17.75%, 65.93% 19.58%, 65.27% 22.06%, 65.14% 22.72%, 65.67% 23.24%, 65.27% 24.02%, 63.84% 24.54%, 61.36% 26.11%, 56.14% 24.41%)"
			},
			"mageshat": {
				description: "Northeast of Point of No Return is the “Mage’s Hat”. Besides the amazing magical shows, there is a chance for those who wish to learn magic to do just that. Customers can learn a trick unique to them for the day.",
				clippath: "polygon(86.68% 43.21%, 85.51% 40.08%, 86.95% 36.81%, 88.9% 34.2%, 90.6% 37.34%, 91.38% 39.95%, 90.21% 43.47%)"
			},
			"castlebattles": {
				description: "Northeast of Mage’s Hat is “Castle Battles”. Participate in a wet and exciting water battle between neighboring castles. Use water balloons and water bows and water catapults to soak your foe into submission.",
				clippath: "polygon(78.07% 37.21%, 78.59% 35.38%, 78.98% 32.77%, 81.07% 31.72%, 82.51% 30.42%, 84.99% 28.72%, 89.43% 30.68%, 90.08% 34.07%, 89.03% 34.46%, 87.73% 36.29%, 86.68% 37.34%, 83.29% 39.95%)"
			},
			"hedgemaze": {
				description: "North of Castle Battles is the “Hedge Maze”. Work your way through this maze to get to the center and then back out again. Be aware that sections will change periodically, so you might not get out the way you got in!",
				clippath: "polygon(75.33% 24.15%, 76.89% 24.54%, 77.94% 23.5%, 83.81% 21.54%, 86.55% 21.67%, 90.08% 30.94%, 84.99% 28.59%, 78.72% 33.16%, 77.42% 32.9%, 75.46% 29.77%, 73.76% 24.15%)"
			},
			"cartwheel": {
				description: "Northwest of Hedge Maze is “Cart Wheel”. This version of a Ferris wheel is not for the faint of heart. It not only rotates, but it also rolls along a track. Just when you thought it was finished, it does the trip in reverse!",
				clippath: "polygon(66.84% 11.36%, 68.67% 10.05%, 70.1% 12.79%, 72.45% 12.27%, 73.37% 14.62%, 75.72% 14.1%, 76.5% 15.93%, 77.02% 17.62%, 76.5% 19.58%, 74.8% 21.02%, 64.75% 14.88%)"
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
				clippath: "polygon(96.34% 1.17%, 100% 0.78%, 100% 16.32%, 96.48% 15.93%, 95.04% 17.23%, 92.56% 16.84%, 92.3% 17.89%, 90.73% 18.67%, 89.3% 19.19%, 88.51% 20.1%, 87.08% 19.97%, 85.25% 20.63%, 83.81% 20.63%, 82.77% 21.28%, 81.2% 20.76%, 79.37% 20.63%, 79.5% 17.89%, 79.63% 16.19%, 80.68% 15.4%, 81.59% 16.32%, 82.77% 13.97%, 83.03% 12.53%, 84.07% 11.49%, 86.16% 11.62%, 87.47% 9.4%, 89.3% 9.4%, 90.08% 7.05%, 91.91% 6.53%, 92.95% 7.7%)"
			},
			"arabianknights": {
				description: "West of the Dragon’s Lair is “Arabian Knights”. This middle eastern, middle ages adventure ride will make you want to rub every lamp you ever see!",
				clippath: "polygon(77.94% 0.91%, 81.33% 0.91%, 87.99% 5.22%, 87.86% 7.83%, 84.73% 11.49%, 83.81% 11.49%, 83.03% 12.66%, 81.33% 15.67%, 80.42% 15.54%, 79.77% 16.32%, 78.85% 16.45%, 76.24% 14.62%, 74.02% 13.05%, 71.93% 12.01%, 69.97% 9.53%, 70.37% 8.49%, 73.89% 4.44%)"
			},
			"goflyakite": {
				description: "Northwest of the Dragon’s Lair is “Go Fly a Kite”. Learn about kite history and how to best fly them. See numerous styles and perhaps, take one home with you.",
				clippath: "polygon(89.3% 0.91%, 92.04% 0.52%, 95.69% 1.31%, 93.6% 6.53%, 92.17% 6.14%, 90.08% 7.05%, 89.03% 6.27%, 88.38% 2.87%)"
			},
			"siegeanddefense": {
				description: "Northeast of the Dragon Shield is “Siege and Defense”. Learn some of the ways in which castles were defended and attacked during the Middle Ages.",
				clippath: "polygon(52.35% 12.92%, 56.92% 10.05%, 61.88% 12.01%, 62.4% 15.93%, 58.09% 19.45%, 56.01% 18.8%, 55.22% 19.58%, 54.05% 19.06%, 54.05% 18.02%, 53.26% 18.54%, 52.35% 18.28%, 51.96% 17.23%)"
			},
			"trollbridge": {
				description: "Northeast of the Siege and Defense is the “Troll Bridge”. We recommend approaching only from the north and stopping first at the tent which supplies papier-mâché sheep to take with you.",
				clippath: "polygon(56.92% 10.18%, 56.27% 1.96%, 57.83% 0.78%, 58.88% 2.87%, 58.88% 6.14%, 60.57% 5.22%, 61.88% 2.22%, 63.05% 3.52%, 65.54% 3.52%, 67.75% 4.05%, 71.54% 3.79%, 72.45% 4.83%, 71.41% 6.66%, 70.63% 8.22%, 67.23% 9.4%, 65.67% 10.44%, 64.62% 11.1%, 62.4% 14.36%, 62.4% 12.27%)"
			},
			"entforest": {
				description: "Northwest of Siege and Defense is the “Ent Forest”. It is said that here the trees are able to move and speak and tell wonderful stories.",
				clippath: "polygon(42.69% 9.92%, 43.47% 8.88%, 44.78% 7.05%, 45.95% 6.01%, 48.56% 5.35%, 50.39% 5.09%, 53% 4.96%, 53.66% 6.4%, 54.96% 7.96%, 54.7% 9.4%, 53.92% 11.36%, 50.39% 14.1%, 47.65% 14.36%, 44.52% 13.84%, 43.34% 13.32%, 42.56% 11.88%)"
			},
			"tempusfugit": {
				description: "North of the Fairy Fort is “Tempus Fugit”. The ride starts in a corner of the top inside of the hourglass and swirls in ever smaller circles at increasing speeds until it gets to the center where the process reverses until it ends slowly at the bottom.",
				clippath: "polygon(33.81% 12.14%, 39.03% 12.4%, 37.6% 15.93%, 36.81% 18.15%, 37.73% 19.84%, 39.56% 20.89%, 36.68% 24.41%, 31.46% 24.8%, 31.72% 20.89%, 33.16% 18.02%, 33.42% 17.23%, 32.77% 15.67%, 31.33% 15.01%)"
			},
			"archeryrange": {
				description: "North of Tempus Fugit is the “Archery Range” This area can train you in the safe and proper use of many styles of bows. You can also take part in an archery contest if you think you have the skills to beat the current champion.",
				clippath: "polygon(37.86% 11.49%, 42.56% 11.49%, 42.69% 13.05%, 39.43% 19.71%, 37.73% 19.58%, 36.95% 18.28%, 37.6% 16.32%, 38.51% 13.97%, 38.64% 12.27%)"
			},
			"dreamsellers": {
				description: "North of the Archery Range is a tent that appears to be made of mist and shadows. This is the “Dream Seller’s” tent. It is possible to purchase not only dream catchers here, but dreams as well. Be careful what you wish for.",
				clippath: "polygon(40.86% 5.61%, 42.43% 7.31%, 43.21% 8.62%, 42.17% 10.31%, 40.47% 10.57%, 38.77% 9.79%, 39.43% 7.7%)"
			},
			"battleground": {
				description: "West of the Archery Range is “Battleground”. Enter a circular closet with projection walls and special armor and weapons which will allow you to take part in a multi-person virtual reality battlefield melee. Not for the faint of heart.",
				clippath: "polygon(27.81% 8.88%, 37.21% 10.18%, 36.29% 12.4%, 33.81% 12.27%, 31.72% 14.75%, 32.77% 15.54%, 33.42% 17.23%, 31.46% 20.89%, 22.32% 18.15%)"
			},
			"emeraldpalace": {
				description: "Near the center of Carnival is the “Emerald Palace”. There are many rooms to visit, people to interact with, and sights to see in this palace. Each evening is a Royal Ball. See if you can get yourself invited but be sure you leave by midnight.",
				clippath: "polygon(37.47% 33.68%, 37.99% 31.85%, 38.9% 34.07%, 39.82% 35.38%, 41.51% 36.03%, 41.25% 32.9%, 42.04% 30.03%, 42.69% 33.03%, 42.82% 35.38%, 45.04% 35.12%, 44.78% 28.2%, 45.17% 24.93%, 46.34% 28.33%, 46.61% 34.99%, 48.83% 34.99%, 49.22% 32.77%, 49.74% 29.63%, 50.65% 33.03%, 50.91% 35.51%, 52.74% 40.08%, 53.13% 39.03%, 54.05% 40.86%, 54.05% 45.04%, 55.35% 49.87%, 49.87% 51.31%, 48.3% 49.35%, 45.82% 49.22%, 46.87% 51.83%, 43.99% 51.57%, 41.51% 52.22%, 40.34% 52.22%, 39.95% 49.61%, 39.69% 47.39%, 38.51% 45.04%, 36.55% 41.91%, 37.86% 40.6%)"
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
