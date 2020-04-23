window.onload = function() {
	/*** onload ***/
		/* triggers */
			if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
				var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
			}
			else {
				var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
			}

		/* defaults */
			document.addEventListener("dblclick", function(event) {
				event.preventDefault()
			})

			document.addEventListener("contextmenu", function(event) {
				event.preventDefault()
			})

		/* generateRandom */
			function generateRandom() {
				try {
					var alphabet = "abcdefghijklmnopqrstuvwxyz"
					var random = ""

					while (random.length < 16) {
						random += alphabet[Math.floor(Math.random() * alphabet.length)]
					}

					return random
				} catch (error) {}
			}

		/* duplicateObject */
			function duplicateObject(obj) {
				try {
					if (typeof obj == "object") {
						return JSON.parse(JSON.stringify(obj))
					}
					else {
						return obj
					}
				} catch (error) {}
			}

		/* loadEditor */
			loadEditor()
			function loadEditor() {
				try {
					data = createData()
					character = loadFile()

					createRaceList()
					createSkillLists()
					createConditionsList()
					createItemsList()

					changeMode({target: document.getElementById("modes-play")})
				} catch (error) {}
			}

	/*** CREATE ***/
		/* createData */
			function createData() {
				try {
					var races = {
						human: {
							info: {
								age: 25,
								height: 5.5,
								weight: 150,
								description: "The standard homo sapiens sapiens, these farmers, craftsmen, and traders are swift and smart, obligatory tool-users, and motivated by self-interest and often the well-being of friends and family.",
								ability: "Humans have increased physical ability skills.",
							},
							statistics: {
								perception: -1,
								memory: -1,
								logic: 1,
								strength: 0,
								dexterity: 1,
								immunity: -1,
								speed: 1
							},
							skills: {
								perception: { sight: 7, sound: 7, scent: 5, taste: 3, touch: 6 },
								memory: { lang_human: 7 },
								logic: { pattern_recognition: 3},
								strength: { throw: 5, carry: 4 },
								dexterity: { crafting: 2 },
								immunity: { recover: 0, sleep_resistance: 2 },
								speed: { jump: 4, run: 5,  swim: 3 }
							}
						},
						elf: {
							info: {
								age: 200,
								height: 5.5,
								weight: 125,
								description: "Standard fantasy elf, with a long lifespan, pointy ears, tall build, precision dexterity, mysticism, and knowledge of nature.",
								ability: "Elves have high perception across all senses, making them keenly aware of their surroundings at all times.",
							},
							statistics: {
								perception: 1,
								memory: 1,
								logic: -1,
								strength: -1,
								dexterity: 1,
								immunity: -1,
								speed: 0
							},
							skills: {
								perception: { sight: 10, sound: 10, scent: 10, taste: 10, touch: 10, night_vision: 3 },
								memory: { lang_elf: 7 },
								logic: {},
								strength: { carry: 1, throw: 2 },
								dexterity: {},
								immunity: { recover: 2, sleep_resistance: 2 },
								speed: { jump: 5, run: 5, swim: 1 }
							}
						},
						dwarf: {
							info: {
								age: 50,
								height: 4,
								weight: 200,
								description: "Standard fantasy dwarf, with short stature, powerful strength, and an affinity for geology, masonry, and war.",
								ability: "Dwarves are strong fighters with powerful punch and kick attacks that each deal 3d6 damage.",
							},
							statistics: {
								perception: -1,
								memory: 0,
								logic: -1,
								strength: 1,
								dexterity: -1,
								immunity: 1,
								speed: 1
							},
							skills: {
								perception: { sight: 6, sound: 7, scent: 4, taste: 4, touch: 7, night_vision: 2 },
								memory: { lang_dwarf: 7 },
								logic: {},
								strength: { carry: 5, throw: 4 },
								dexterity: { crafting: 3 },
								immunity: { recover: 0 },
								speed: { jump: 2, run: 2, swim: 1, dodge: 2 }
							},
							d6changes: [
								{
									statistic: "strength",
									skill: "punch",
									d6: 1
								},
								{
									statistic: "speed",
									skill: "kick",
									d6: 1
								}
							]
						},
						halfling: {
							info: {
								age: 40,
								height: 3.5,
								weight: 100,
								description: "Standard fantasy halfling/hobbit, with pointy ears, hairy feet, half height, and a love of food, gardening, music, and simple pleasures.",
								ability: "Halfings are hard to influence; they negate opponent skill bonuses when the opponent influences via charisma.",
							},
							statistics: {
								perception: 0,
								memory: 1,
								logic: -1,
								strength: -1,
								dexterity: 1,
								immunity: 1,
								speed: -1
							},
							skills: {
								perception: { sight: 5, sound: 7, scent: 5, taste: 7, touch: 4 },
								memory: { lang_halfling: 7 },
								logic: { remain_calm: 2 },
								strength: { carry: 2, throw: 3, climb: 2 },
								dexterity: { sneak: 3 },
								immunity: { recover: 0 },
								speed: { jump: 4, run: 3, swim: 2 }
							}
						},
						gnome: {
							info: {
								age: 50,
								height: 3,
								weight: 75,
								description: "Standard fantasy gnome, with earth tones and short builds, long beards and pointy hats, and a focus on trickery, illusion, and crafting.",
								ability: "Gnomes easily influence others; they negate opponent skill bonuses when influencing an opponent via charisma.",
							},
							statistics: {
								perception: 1,
								memory: -1,
								logic: 1,
								strength: -1,
								dexterity: 0,
								immunity: 1,
								speed: -1
							},
							skills: {
								perception: { sight: 7, sound: 7, scent: 6, taste: 3, touch: 5 },
								memory: { lang_gnome: 7 },
								logic: { persuade: 2 },
								strength: { carry: 2, throw: 4 },
								dexterity: { crafting: 3 },
								immunity: { recover: 0 },
								speed: { jump: 3, run: 2, swim: 3, dodge: 2 }
							}
						},
						goblin: {
							info: {
								age: 15,
								height: 3.5,
								weight: 100,
								description: "Standard fantasy goblins, with small frames, dark red or yellow skin, low intelligence, and a crass, lowly standard of living.",
								ability: "Goblins are immune to most toxins, with +7 resistance to poison, infection, allergies, and alcohol.",
							},
							statistics: {
								perception: 0,
								memory: -1,
								logic: -1,
								strength: -1,
								dexterity: 1,
								immunity: 1,
								speed: 1
							},
							skills: {
								perception: { sight: 4, sound: 7, scent: 7, taste: 3, touch: 7, night_vision: 2 },
								memory: { lang_goblin: 7 },
								logic: {},
								strength: { carry: 1, throw: 4 },
								dexterity: { sneak: 2, ride_animals: 3 },
								immunity: { recover: 0, poison_resistance: 7, infection_resistance: 7, allergy_resistance: 7, alcohol_tolerance: 7 },
								speed: { jump: 4, run: 2, swim: 3 }
							}
						},
						orc: {
							info: {
								age: 20,
								height: 6,
								weight: 250,
								description: "Standard fantasy orcs, with large bodies covered in rough, dark-colored skin, a warlike temperament and preference for violence.",
								ability: "Orcs are strong fighters with powerful punch and kick attacks that each deal 3d6 damage.",
							},
							statistics: {
								perception: -1,
								memory: -1,
								logic: -1,
								strength: 1,
								dexterity: 1,
								immunity: 0,
								speed: 1
							},
							skills: {
								perception: { sight: 6, sound: 6, scent: 7, taste: 4, touch: 5, night_vision: 2 },
								memory: { lang_orc: 7 },
								logic: {},
								strength: { carry: 4, throw: 3, melee: 3 },
								dexterity: { fencing: 2 },
								immunity: { recover: 0 },
								speed: { jump: 3, run: 3, swim: 1 }
							},
							d6changes: [
								{
									statistic: "strength",
									skill: "punch",
									d6: 1
								},
								{
									statistic: "speed",
									skill: "kick",
									d6: 1
								}
							]
						},
						lizardfolk: {
							info: {
								age: 20,
								height: 5,
								weight: 150,
								description: "Standard fantasy lizard people, with medium-sized reptilian/humanoid bodies, forked tongues, webbed feet, and scales.",
								ability: "Lizardfolk can camouflage in any setting, giving opponents a -14 on sight checks.",
							},
							statistics: {
								perception: 1,
								memory: -1,
								logic: -1,
								strength: -1,
								dexterity: 1,
								immunity: 1,
								speed: 0
							},
							skills: {
								perception: { sight: 6, sound: 5, scent: 7, taste: 7, touch: 3 },
								memory: { lang_lizardfolk: 7 },
								logic: {},
								strength: { carry: 1, throw: 1 },
								dexterity: { sneak: 3 },
								immunity: { recover: 2, poison_resistance: 2 },
								speed: { jump: 5, run: 2, swim: 5 }
							}
						},
						bhios: {
							info: {
								age: 35,
								height: 5.5,
								weight: 150,
								description: "These forest-dwelling hominins are logical, passionate, and well-spoken. They’ve adapted to a mostly peaceful and democratic existence, if technologically stagnant.",
								ability: "With their photosynthetic green skin, bhioses recover 1d6 extra damage per recovery in sunlight.",
							},
							statistics: {
								perception: -1,
								memory: 1,
								logic: 1,
								strength: -1,
								dexterity: 0,
								immunity: 1,
								speed: -1
							},
							skills: {
								perception: { sight: 7, sound: 6, scent: 5, taste: 5, touch: 5 },
								memory: { lang_bhios: 7 },
								logic: { remain_calm: 2 },
								strength: { carry: 2, throw: 3, climb: 2 },
								dexterity: {},
								immunity: { recover: 3 },
								speed: { jump: 3, run: 3, swim: 3 }
							},
							d6changes: [
								{
									statistic: "immunity",
									skill: "recover",
									d6: 1
								}
							]
						},
						mellifax: {
							info: {
								age: 15,
								height: 3,
								weight: 50,
								description: "Between three and four feet tall, these fairy folk are small, but clever. A secluded people, living in underground forest hives, they are often driven by racial ties, and have a close bond and deep understanding of nature.",
								ability: "With their small wings, mellifaxi can hover at a low distance above the ground for a minute at a time.",
							},
							statistics: {
								perception: -1,
								memory: 0,
								logic: -1,
								strength: -1,
								dexterity: 1,
								immunity: 1,
								speed: 1
							},
							skills: {
								perception: { sight: 3, sound: 7, scent: 6, taste: 5, touch: 7 },
								memory: { lang_mellifax: 7 },
								logic: {},
								strength: { carry: 1, throw: 4 },
								dexterity: { sneak: 2 },
								immunity: { recover: 0, poison_resistance: 3 },
								speed: { jump: 5, run: 3, swim: 1, dodge: 2, fly: 10 }
							}
						},
						preas: {
							info: {
								age: 20,
								height: 5,
								weight: 125,
								description: "Tradition and clan loyalty hold first priority for this dark-purple-skinned people, but a connection with animal life is close behind. They have developed a symbiotic relationship with dozens of forest, mountain, and plains creatures.",
								ability: "With patience and intuition, preases have +7 animal handling; all animals are at -7 when resisting influence.",
							},
							statistics: {
								perception: 0,
								memory: 1,
								logic: -1,
								strength: 1,
								dexterity: 1,
								immunity: -1,
								speed: -1
							},
							skills: {
								perception: { sight: 7, sound: 5, scent: 6, taste: 5, touch: 5 },
								memory: { lang_preas: 7, facial_recognition: 3 },
								logic: { handle_animals: 7, evoke_emotion: 2 },
								strength: { carry: 1, throw: 2 },
								dexterity: { ride_animals: 2 },
								immunity: { recover: 0 },
								speed: { jump: 3, run: 4, swim: 4 }
							}
						},
						winge: {
							info: {
								age: 25,
								height: 6,
								weight: 200,
								description: "Tall, strong, and mean, these orange-skinned warriors are bound by a strict code of honor which values ability above all. Their civilization is driven by conquest and power, and has unparalleled knowledge of geology and chemistry.",
								ability: "With their thick skin, winges have a natural 1d6 armor, blocking physical damage every round of combat.",
							},
							statistics: {
								perception: -1,
								memory: -1,
								logic: 1,
								strength: 1,
								dexterity: -1,
								immunity: 1,
								speed: 0
							},
							skills: {
								perception: { sight: 6, sound: 7, scent: 7, taste: 4, touch: 4, night_vision: 2 },
								memory: { lang_winge: 7 },
								logic: { remain_calm: 3, spatial_reasoning: 2 },
								strength: { carry: 5, throw: 2 },
								dexterity: { martial_arts: 2 },
								immunity: { recover: 0, defend: 0 },
								speed: { jump: 2, run: 4, swim: 1 }
							},
							d6changes: [
								{
									statistic: "immunity",
									skill: "defend",
									d6: 1
								}
							]
						}
					}

					var classes = {
						barbarian: {
							races: ["dwarf", "goblin", "human", "orc", "winge", "lizardfolk"],
							statistics: {
								strength: 2,
								speed: 2,
								logic: -2,
								memory: -2
							},
							skills: ["dodge", "climb", "carry", "punch", "throw", "crafting", "handle_animals", "intimidate", "zoology", "pattern_recognition", "ride_animals", "melee", "swim", "pain_tolerance", "alcohol_tolerance", "sleep_resistance", "jump", "run", "punch", "kick"]
						},
						bard: {
							races: ["elf", "gnome", "halfling", "human", "mellifax", "preas"],
							statistics: {
								memory: 2,
								logic: 2,
								strength: -2,
								speed: -2
							},
							skills: ["dodge", "persuade", "seduce", "humor", "climb", "crafting", "escape_bonds", "lip_reading", "botany", "alchemy", "astronomy", "geography", "geology", "history", "mathematics", "mechanics", "language", "performance", "musicianship", "game_playing", "judge_character", "penmanship", "sneak", "alcohol_tolerance", "cooking"]
						},
						cleric: {
							races: ["elf", "dwarf", "halfling", "human", "bhios", "preas"],
							statistics: {
								memory: 2,
								immunity: 2,
								strength: -2,
								perception: -2
							},
							skills: ["crafting", "persuade", "medicine", "history", "facial_recognition", "language", "judge_character", "remain_calm", "evoke_emotion", "musicianship", "cooking", "botany", "astronomy", "recover", "infection_resistance", "poison_resistance", "pain_tolerance"]
						},
						druid: {
							races: ["elf", "gnome", "goblin", "human", "mellifax", "preas"],
							statistics: {
								dexterity: 2,
								speed: 2,
								strength: -2,
								logic: -2
							},
							skills: ["climb", "carry", "fishing", "archery", "crafting", "handle_animals", "heal", "geography", "geology", "botany", "zoology", "ride_animals", "medicine", "swim", "remain_calm", "sneak", "poison_resistance", "infection_resistance", "allergy_resistance", "sleep_resistance", "recover"]
						},
						fighter: {
							races: ["elf", "dwarf", "human", "orc", "bhios", "winge"],
							statistics: {
								strength: 2,
								logic: 2,
								memory: -2,
								perception: -2
							},
							skills: ["climb", "crafting", "handle_animals", "intimidate", "spatial_reasoning", "mechanics", "metalworking", "woodworking", "leatherworking", "ride_animals", "swim", "dodge", "punch", "melee", "fencing", "missile", "carry", "pain_tolerance", "run", "jump"]
						},
						monk: {
							races: ["elf", "goblin", "halfling", "human", "bhios", "lizardfolk"],
							statistics: {
								strength: 2,
								dexterity: 2,
								immunity: -2,
								logic: -2
							},
							skills: ["block", "climb", "craft", "escape_bonds", "intimidate", "history", "geography", "pattern_recognition", "astronomy", "remain_calm", "performance", "ride_animals", "judge_character", "sneak", "swim", "dodge", "punch", "kick", "martial_arts", "jump", "run", "throw", "recover"]
						},
						paladin: {
							races: ["elf", "dwarf", "human", "orc", "bhios", "winge"],
							statistics: {
								logic: 2,
								dexterity: 2,
								memory: -2,
								speed: -2
							},
							skills: ["block", "crafting", "persuade", "handle_animals", "medicine", "history", "ride_animals", "judge_character", "remain_calm", "facial_recognition", "fencing", "missile", "pain_tolerance", "infection_resistance", "sleep_resistance", "run", "carry"]
						},
						ranger: {
							races: ["elf", "goblin", "human", "orc", "preas", "lizardfolk"],
							statistics: {
								dexterity: 2,
								perception: 2,
								strength: -2,
								logic: -2
							},
							skills: ["climb", "crafting", "handle_animals", "medicine", "intimidate", "persuade", "mechanics", "geography", "botany", "alchemy", "geology", "history", "zoology", "leatherworking", "woodworking", "ride_animals", "sneak", "dodge", "jump", "swim", "run", "archery", "missile", "seduce", "remain_calm", "pattern_recognition", "spatial_reasoning", "metabolism", "infection_resistance", "allergy_resistance", "poison_resistance", "medicine"]
						},
						rogue: {
							races: ["gnome", "goblin", "halfling", "human", "mellifax", "lizardfolk"],
							statistics: {
								dexterity: 2,
								speed: 2,
								strength: -2,
								memory: -2
							},
							skills: ["persuade", "seduce", "game_playing", "climb", "crafting", "mechanics", "knifing", "lock_picking", "escape_bonds", "intimidate", "lip_reading", "facial_recognition", "pattern_recognition", "cooking", "language", "performance", "judge_character", "penmanship", "sneak", "dodge", "run", "swim", "missile"]
						},
						sorcerer: {
							races: ["elf", "gnome", "goblin", "human", "mellifax", "preas"],
							statistics: {
								strength: 2,
								memory: 2,
								logic: -2,
								perception: -2
							},
							skills: ["astronomy", "botany", "cooking", "geography", "history", "leatherworking", "medicine", "woodworking", "intimidate", "persuade", "throw", "poison_resistance", "sleep_resistance", "performance"]
						},
						warlock: {
							races: ["elf", "human", "goblin", "orc", "winge", "lizardfolk"],
							statistics: {
								memory: 2,
								perception: 2,
								strength: -2,
								dexterity: -2
							},
							skills: ["alchemy", "astronomy", "cooking", "history", "metalworking", "zoology", "crafting", "intimidate", "throw", "mechanics", "mathematics", "spatial_reasoning", "poison_resistance", "sleep_resistance"]
						},
						wizard: {
							races: ["elf", "gnome", "halfling", "human", "bhios", "winge"],
							statistics: {
								logic: 2,
								memory: 2,
								strength: -2,
								immunity: -2
							},
							skills: ["alchemy", "geography", "geology", "history", "leatherworking", "medicine", "metalworking", "woodworking", "crafting", "persuade", "throw", "mechanics", "mathematics", "spatial_reasoning", "sleep_resistance", "performance"]
						}
					}

					var statistics = {
						perception: "The baseline for all senses (sight, sound, scent, taste, and touch), with modifiers added for each race. This also controls special abilities and race-specific senses: internal clock, perfect pitch, color sense; night vision, infrared vision, internal compass, etc. This corresponds to the eyes, ears, nose, tongue, skin.",
						memory: "All knowledge accumulated, including languages, trades, and knowledge of specific fields. Some useful applications are alchemy, botany, medicine, and metalworking. This corresponds to the hippocampus.",
						logic: "Figuring things out, learning, and recognizing patterns, from making maps with spatial reasoning, to remaining calm in resisting surprise and opponents' charisma. This corresponds to the cerebrum.",
						strength: "Upper body strength. A character’s carrying capacity, climbing ability, and throwing distance and accuracy are governed by this statistic, as is effectiveness in melee combat. This corresponds to the torso and arm muscles.",
						dexterity: "Hand-eye coordination, fine motor skills, and balance. This is key when aiming and fencing in combat, riding an animal, sneaking around, crafting, and in performance art. This corresponds to the wrist and hand muscles.",
						immunity: "Natural defenses against injury, infection, hunger and thirst, heat and cold, pain, and more. This also correlates to the rate of recovery following combat, infection, and poison. This corresponds to the immune, cardiovascular, and respiratory systems.",
						speed: "Lower body strength, including jumping, running, and swimming. This also determines turn order, the ability to dodge, and distance a character can move during combat. This corresponds to the leg and feet muscles."
					}

					var skills = {
						perception: [
							"sight", "sound", "scent", "taste", "touch", "internal_clock", "perfect_pitch", "color_sense", "night_vision", "infrared_vision", "internal_compass", "infrasound", "echolocation", "camouflage"
						],
						memory: [
							"alchemy", "astronomy", "botany", "cooking", "facial_recognition", "geography", "geology", "history", "leatherworking", "linguistics", "lip_reading", "medicine", "metalworking", "woodworking", "voice_recognition", "zoology",
							"lang_human", "lang_elf", "lang_dwarf", "lang_halfling", "lang_gnome", "lang_goblin", "lang_orc", "lang_bhios", "lang_mellifax", "lang_preas", "lang_winge", "lang_lizardfolk"
						],
						logic: [
							"evoke_emotion", "game_playing", "handle_animals", "humor", "intimidate", "judge_character", "mathematics", "mechanics", "pattern_recognition", "persuade", "remain_calm", "seduce", "spatial_reasoning", "aggression"
						],
						strength: [
							"archery", "block", "carry", "climb", "fishing", "melee", "punch", "throw", "bite", "slam", "tusk"
						],
						dexterity: [
							"catch", "crafting", "drawing", "escape_bonds", "fencing", "knifing", "lock_picking", "martial_arts", "missile", "musicianship", "penmanship", "performance", "ride_animals", "sneak", "claws", "talons"
						],
						immunity: [
							"alcohol_tolerance", "allergy_resistance", "hold_breath", "infection_resistance", "metabolism", "pain_tolerance", "poison_resistance", "recover", "sleep_resistance", "defend"
						],
						speed: [
							"dodge", "jump", "kick", "run", "swim", "fly"
						]
					}

					var combat = [
						"archery", "fencing", "kick", "knifing", "martial_arts", "melee", "missile", "punch", "throw", "bite", "slam", "tusk", "claws", "talons"
					]

					var charisma = [
						"evoke_emotion", "handle_animals", "humor", "intimidate", "persuade", "seduce"
					]

					var conditions = {
						unconsciousness: {
							description: "A character with any statistic at 0 is unconscious and unable to act in any way.",
							effects: {
								perception: {statistic: -100},
								memory: {statistic: -100},
								logic: {statistic: -100},
								strength: {statistic: -100},
								dexterity: {statistic: -100},
								immunity: {statistic: -100},
								speed: {statistic: -100}
							}
						},
						asphyxiation: {
							description: "Roll hold breath before rolling a check for any other statistic. Unconscious in 20 rounds (2 minutes).",
							effects: {
								perception: {taste: -10, scent: -10},
							},
							immunity_check: {
								skill: "hold_breath",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						sleep: {
							description: "Roll sleep resistance or else unable to act in any way. To be awakened, roll perception plus applicable sense. If attacked, immediately wake up.",
							effects: {
								perception: {statistic: -10, sight: -5}
							}
						},
						severe_pain: {
							description: "Roll pain tolerance before rolling a check for any other statistic. Caused when any statistic is reduced to 1.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						minor_pain_head: {
							description: "Roll pain tolerance before perception, memory, logic.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["perception", "memory", "logic"]
							}
						},
						minor_pain_body: {
							description: "Roll pain tolerance before strength, dexterity, speed.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["strength", "dexterity", "speed"]
							}
						},
						infection: {
							description: "Roll infection resistance during each recover attempt until a successful check. Unable to recover.",
							immunity_check: {
								skill: "infection_resistance",
								d6: 2
							}
						},
						poison: {
							description: "Roll poison resistance during each recover attempt until a successful check. Unable to recover.",
							immunity_check: {
								skill: "poison_resistance",
								d6: 2
							}
						},
						extreme_cold: {
							description: "Roll pain tolerance before strength, dexterity, speed.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["strength", "dexterity", "speed"],
								d6: 1
							}
						},
						extreme_heat: {
							description: "Roll pain tolerance before strength, dexterity, speed.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["strength", "dexterity", "speed"],
								d6: 1
							}
						},
						darkness: {
							description: "Impairs sight. -10 on skills where sight matters, such as combat.",
							effects: {
								perception: {sight: -10, melee: -10, fencing: -10, knifing: -10, missile: -10, archery: -10, throw: -10, punch: -10, kick: -10, martial_arts: -10}
							}
						},
						blinding_light: {
							description: "Impairs sight. -10 on skills where sight matters, such as combat.",
							effects: {
								perception: {sight: -10, melee: -10, fencing: -10, knifing: -10, missile: -10, archery: -10, throw: -10, punch: -10, kick: -10, martial_arts: -10}
							}
						},
						fog: {
							description: "Impairs sight. -5 on skills where sight matters, such as combat.",
							effects: {
								perception: {sight: -5, melee: -5, fencing: -5, knifing: -5, missile: -5, archery: -5, throw: -5, punch: -5, kick: -5, martial_arts: -5}
							}	
						},
						smoke: {
							description: "Impairs sight & scent. -5 on skills where sight matters, such as combat. Roll hold breath before strength and speed.",
							immunity_check: {
								skill: "hold_breath",
								before: ["strength", "speed"]
							},
							effects: {
								perception: {sight: -5, scent: -5, melee: -5, fencing: -5, knifing: -5, missile: -5, archery: -5, throw: -5, punch: -5, kick: -5, martial_arts: -5}
							}	
						},
						noxious_odor: {
							description: "Smells bad.",
							effects: {
								perception: {scent: -10}
							}
						},
						loud_noise: {
							description: "Impairs sound.",
							effects: {
								perception: {sound: -10}
							}
						},
						solid_barrier: {
							description: "Impairs sound.",
							effects: {
								perception: {sound: -10}
							}
						},
						liquid_barrier: {
							description: "Impairs sound.",
							effects: {
								perception: {sound: -10}
							}
						},
						dual_wielding: {
							description: "Impairs dexterity & strength. Caused by using two weapons or using a weapon with a shield.",
							effects: {
								dexterity: {statistic: -5},
								strength: {statistic: -5}
							}
						},
						paralysis_arms: {
							description: "Impairs dexterity & strength.",
							effects: {
								dexterity: {statistic: -10},
								strength: {statistic: -10}
							}
						},
						paralysis_legs: {
							description: "Impairs speed.",
							effects: {
								speed: {statistic: -10}
							}
						},
						inebriation: {
							description: "Impairs perception. Roll alcohol tolerance before rolling a check for any other statistic.",
							effects: {
								perception: {statistic: -10},
							},
							immunity_check: {
								skill: "alcohol_tolerance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						exhaustion: {
							description: "Roll sleep resistance before rolling a check for any other statistic. Unconscious in 1 week of no sleep or 1 week of no food.",
							effects: {
								strength: {statistic: -2},
								dexterity: {statistic: -2},
								speed: {statistic: -2}
							},
							immunity_check: {
								skill: "sleep_resistance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						surprise: {
							description: "Roll remain calm or else unable to act for 1 round.",
						},
						immunity_boost: {
							description: "Boosts recovery and immunity against infection and poison.",
							effects: {
								immunity: {recover: 5, infection_resistance: 5, poison_resistance: 5, alcohol_tolerance: 5}
							}
						},
						resistance: {
							description: "Boost recovery and immunity against infection and poison. Roll an additional 1d6 armor against physical attacks.",
							effects: {
								immunity: {recover: 5, infection_resistance: 5, poison_resistance: 5, alcohol_tolerance: 5}
							}
						},
						alertness: {
							description: "Boosts physical attributes.",
							effects: {
								strength: {statistic: 2},
								dexterity: {statistic: 2},
								speed: {statistic: 2},
								perception: {statistic: 2}
							}
						},
						concentration: {
							description: "Boosts mental attributes.",
							effects: {
								memory: {statistic: 2},
								logic: {statistic: 2},
								perception: {statistic: 2}
							}
						},
						perceptiveness: {
							description: "Boosts perception and insight skills.",
							effects: {
								perception: {statistic: 2},
								memory: {facial_recognition: 2, voice_recognition: 2, lip_reading: 2},
								logic: {judge_character: 2, pattern_recognition: 2}
							}
						},
						pain_relief: {
							description: "Boosts pain resistance.",
							effects: {
								immunity: {pain_tolerance: 5}
							}
						}
					}

					var items = {
						weapons: [
							{
								name: "boomerang",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3,
									}
								],
								weight: 2,
								hands: 1,
								fuel: 1,
								materials: "wood",
								cost: 20,
								description: "on a miss, thrower can attempt to catch"
							},
							{
								name: "razor boomerang",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 4
									}
								],
								weight: 3,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 40,
								description: "on a miss, thrower can attempt to catch"
							},
							{
								name: "throwing knife",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 3
									}
								],
								weight: 1,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 10,
								description: " "
							},
							{
								name: "throwing star",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								weight: 0.5,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 10,
								description: " "
							},
							{
								name: "rope dart",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								weight: 1,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: "use strength to pull it back"
							},
							{
								name: "ring blade",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 4
									}
								],
								weight: 1,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 30,
								description: " "
							},
							{
								name: "spear",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 5
									},
									{
										statistic: "strength",
										skill: "fencing",
										d6: 4
									}
								],
								weight: 3,
								hands: 1,
								fuel: 3,
								materials: "wood, metal",
								cost: 30,
								description: " "
							},
							{
								name: "pike",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 5
									},
									{
										statistic: "strength",
										skill: "fencing",
										d6: 4
									}	
								],
								weight: 3,
								hands: 1,
								fuel: 3,
								materials: "wood, metal",
								cost: 30,
								description: " "
							},
							{
								name: "sling",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw"
									}
								],
								weight: 1,
								hands: 1,
								fuel: 1,
								materials: "leather",
								cost: 15,
								description: " "
							},
							{
								name: "bomb",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "throw"
									}
								],
								weight: 1,
								hands: 1,
								materials: "glass",
								description: "see orbs"
							},
							{
								name: "brass knuckles",
								count: 1,
								type: "armor",
								d6: 5,
								usage: [
									{
										statistic: "strength",
										skill: "punch",
										d6: 2
									}
								],
								weight: 1,
								hands: 2,
								materials: "metal",
								cost: 40,
								description: "adds to punch damage; 5d6 hand armor"
							},
							{
								name: "steel boots",
								count: 1,
								type: "armor",
								d6: 7,
								usage: [
									{
										statistic: "speed",
										skill: "kick",
										d6: 2
									}
								],
								weight: 10,
								hands: 0,
								materials: "leather, metal",
								cost: 60,
								description: "adds to kick damage; 7d6 feet armor"
							},
							{
								name: "claws",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "martial_arts",
										d6: 3
									}
								],
								weight: 2,
								hands: 2,
								materials: "leather, metal",
								cost: 50,
								description: "adds to martial arts damage"
							},
							{
								name: "tonfa",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "martial_arts",
										d6: 3
									}
								],
								weight: 4,
								hands: 1,
								fuel: 2,
								materials: "wood",
								cost: 30,
								description: "free block action"
							},
							{
								name: "wooden stake",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 3
									}
								],
								weight: 0.5,
								hands: 1,
								fuel: 2,
								materials: "wood",
								cost: 5,
								description: " "
							},
							{
								name: "metal stake",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 3
									}
								],
								weight: 0.5,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 5,
								description: " "
							},
							{
								name: "dagger",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								weight: 1,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 10,
								description: " "
							},
							{
								name: "sickle",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 4
									}
								],
								weight: 2,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 30,
								description: " "
							},
							{
								name: "short staff",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								weight: 4,
								hands: 1,
								fuel: 3,
								materials: "wood",
								cost: 30,
								description: " "
							},
							{
								name: "club",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								weight: 4,
								hands: 1,
								fuel: 3,
								materials: "wood",
								cost: 30,
								description: " "
							},
							{
								name: "whip",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								weight: 3,
								hands: 1,
								fuel: 2,
								materials: "leather",
								cost: 30,
								description: " "
							},
							{
								name: "spiked club",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 5
									}
								],
								weight: 5,
								hands: 1,
								fuel: 3,
								materials: "wood",
								cost: 50,
								description: " "
							},
							{
								name: "short sword",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "fencing",
										d6: 5
									}
								],
								weight: 2,
								hands: 1,
								magnetic: true,
								materials: "leather, metal",
								cost: 50,
								description: " "
							},
							{
								name: "axe",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "fencing",
										d6: 5,
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 5
									}
								],
								weight: 2,
								hands: 1,
								magnetic: true,
								materials: "leather, metal",
								cost: 50,
								description: " "
							},
							{
								name: "mace",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 5
									}
								],
								weight: 4,
								hands: 1,
								magnetic: true,
								materials: "leather, metal",
								cost: 50,
								description: " "
							},
							{
								name: "morningstar",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 5
									}
								],
								weight: 4,
								hands: 1,
								magnetic: true,
								materials: "leather, metal",
								cost: 50,
								description: " "
							},
							{
								name: "long staff",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 6
									}
								],
								weight: 6,
								hands: 2,
								fuel: 4,
								materials: "wood",
								cost: 60,
								description: " "
							},
							{
								name: "big club",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 6
									}
								],
								weight: 6,
								hands: 2,
								fuel: 4,
								materials: "wood",
								cost: 60,
								description: " "
							},
							{
								name: "big spiked club",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 7
									}
								],
								weight: 7,
								hands: 2,
								fuel: 4,
								materials: "wood",
								cost: 80,
								description: " "
							},
							{
								name: "flail",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 7
									}
								],
								weight: 5,
								hands: 2,
								magnetic: true,
								materials: "leather, metal",
								cost: 80,
								description: " "
							},
							{
								name: "warhammer",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 7
									}
								],
								weight: 6,
								hands: 2,
								magnetic: true,
								materials: "leather, metal",
								cost: 80,
								description: " "
							},
							{
								name: "great axe",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "fencing",
										d6: 7
									}
								],
								weight: 5,
								hands: 2,
								magnetic: true,
								materials: "leather, metal",
								cost: 80,
								description: " "
							},
							{
								name: "long sword",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "fencing",
										d6: 7
									}
								],
								weight: 5,
								hands: 2,
								magnetic: true,
								materials: "leather, metal",
								cost: 80,
								description: " "
							},
							{
								name: "shortbow",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "archery"
									}
								],
								weight: 2,
								hands: 2,
								fuel: 2,
								materials: "wood, string",
								cost: 50,
								description: "range: (strength + archery) x 10 ft"
							},
							{
								name: "longbow",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "strength",
										skill: "archery"
									}
								],
								weight: 4,
								hands: 2,
								fuel: 3,
								materials: "wood, string",
								cost: 80,
								description: "range: (strength + archery) x 20 ft"
							},
							{
								name: "crossbow",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "missile"
									}
								],
								weight: 3,
								hands: 2,
								fuel: 2,
								materials: "wood, string, metal",
								cost: 60,
								description: "range: 150 ft"
							},
							{
								name: "blowgun",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "missile"
									}
								],
								weight: 1,
								hands: 1,
								fuel: 1,
								materials: "wood",
								cost: 30,
								description: "range: 50 ft"
							},
							{
								name: "stonebow",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "missile"
									}
								],
								weight: 3,
								hands: 2,
								fuel: 2,
								materials: "wood, string, metal",
								cost: 70,
								description: "range: 50 ft"
							},
							{
								name: "gauss pistol",
								count: 1,
								type: "weapon",
								usage: [
									{
										statistic: "dexterity",
										skill: "missile"
									}
								],
								weight: 2,
								hands: 1,
								fuel: 2,
								materials: "wood, metal",
								cost: 70,
								description: "range: 50 ft"
							}
						],
						ammunition: [
							{
								name: "arrow",
								count: 1,
								type: "ammunition",
								weapons: ["bow"],
								weight: 0.1,
								fuel: 1,
								usage: [
									{
										statistic: "strength",
										skill: "archery",
										d6: 3
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 2
									}
								],
								materials: "wood, stone",
								cost: 2,
								description: "recoverable"
							},
							{
								name: "bolt",
								count: 1,
								type: "ammunition",
								weapons: ["crossbow"],
								weight: 0.1,
								fuel: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 2
									}
								],
								materials: "wood, stone",
								cost: 2,
								description: "recoverable"
							},
							{
								name: "exploding magnet bolt",
								count: 1,
								type: "ammunition",
								weapons: ["crossbow"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									}
								],
								magnetic: true,
								conditions: {loud_noise: 1, blinding_light: 1},
								materials: "wood, metal",
								cost: 25,
								description: "causes loud noise and blinding light for 1d6 rounds; explosion causes damage to 5-ft square and surrounding 5-ft squares"
							},
							{
								name: "blunted dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 1
									},
								],
								hands: 1,
								materials: "wood",
								cost: 1,
								description: " "
							},
							{
								name: "dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 2
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 1
									}
								],
								hands: 1,
								materials: "wood",
								cost: 2,
								description: " "
							},
							{
								name: "poison dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 2
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 1
									}
								],
								conditions: {poison: 1},
								hands: 1,
								materials: "wood",
								cost: 25,
								description: "causes poison"
							},
							{
								name: "sleep dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 2
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 1
									}
								],
								conditions: {sleep: 1},
								hands: 1,
								materials: "wood",
								cost: 25,
								description: "causes sleep"
							},
							{
								name: "disease dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 2
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 1
									}
								],
								conditions: {infection: 1},
								hands: 1,
								materials: "wood",
								cost: 25,
								description: "causes infection"
							},
							{
								name: "paralysis dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 2
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 1
									}
								],
								conditions: {paralysis_arms: 1, paralysis_legs: 1},
								hands: 1,
								materials: "wood",
								cost: 30,
								description: "causes localized for 1d6 rounds"
							},
							{
								name: "wood orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								fuel: 1,
								hands: 1,
								materials: "wood",
								cost: 2,
								description: " "
							},
							{
								name: "rock orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								hands: 1,
								materials: "stone",
								cost: 1,
								description: " "
							},
							{
								name: "glass orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.1,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								hands: 1,
								materials: "glass",
								cost: 4,
								description: "shatters on impact"
							},
							{
								name: "glass blood orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								conditions: {infection: 1},
								hands: 1,
								materials: "glass",
								cost: 20,
								description: "causes infection"
							},
							{
								name: "glass firewater orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								fuel: 1,
								hands: 1,
								materials: "glass",
								cost: 20,
								description: " "
							},
							{
								name: "glass superglow orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								conditions: {blinding_light: 1},
								hands: 1,
								materials: "glass",
								cost: 28,
								description: "causes blinding light for 1d6 rounds"
							},
							{
								name: "glass smoke orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								conditions: {smoke: 2},
								hands: 1,
								materials: "glass",
								cost: 20,
								description: "causes smoke in 5-ft square and surrounding 5-ft squares for 2d6 rounds"
							},
							{
								name: "glass poison orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								conditions: {poison: 1},
								hands: 1,
								materials: "glass",
								cost: 28,
								description: "causes poison"
							},
							{
								name: "glass sleep orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								conditions: {sleep: 1},
								hands: 1,
								materials: "glass",
								cost: 28,
								description: "causes sleep"
							},
							{
								name: "glass acid orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								d6: 3,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								hands: 1,
								materials: "glass",
								cost: 32,
								description: "causes acid"
							},
							{
								name: "glass flashbang orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "missile",
										d6: 3
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								conditions: {loud_noise: 1, blinding_light: 1},
								hands: 1,
								materials: "glass",
								cost: 28,
								description: "causes loud noise and blinding light for 1d6 rounds; explosion causes damage to 5-ft square and surrounding 5-ft squares"
							}
						],
						armor: [
							{
								name: "clothes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 1,
								fuel: 2,
								materials: "cloth",
								cost: 10,
								description: " "
							},
							{
								name: "hat",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 1,
								fuel: 2,
								materials: "cloth",
								cost: 5,
								description: " "
							},
							{
								name: "gloves",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 1,
								fuel: 2,
								materials: "cloth",
								cost: 5,
								description: " "
							},
							{
								name: "shoes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 2,
								fuel: 2,
								materials: "cloth",
								cost: 10,
								description: " "
							},
							{
								name: "camouflage clothes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 3,
								fuel: 2,
								materials: "cloth",
								cost: 25,
								description: "-10 to opponent sight checks"
							},
							{
								name: "camouflage hat",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 2,
								fuel: 2,
								materials: "cloth",
								cost: 10,
								description: "-10 to opponent sight checks"
							},
							{
								name: "camouflage gloves",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 1,
								fuel: 2,
								materials: "cloth",
								cost: 10,
								description: "-10 to opponent sight checks"
							},
							{
								name: "camouflage shoes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 2,
								fuel: 2,
								materials: "cloth",
								cost: 15,
								description: "-10 to opponent sight checks"
							},
							{
								name: "fine clothes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 4,
								fuel: 3,
								materials: "cloth",
								cost: 35,
								description: " "
							},
							{
								name: "fine hat",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 2,
								fuel: 3,
								materials: "cloth",
								cost: 15,
								description: " "
							},
							{
								name: "fine gloves",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 1,
								fuel: 3,
								materials: "cloth",
								cost: 10,
								description: " "
							},
							{
								name: "fine shoes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 3,
								fuel: 3,
								materials: "cloth",
								cost: 20,
								description: " "
							},
							{
								name: "padded / fur clothes",
								count: 1,
								type: "armor",
								d6: 2,
								weight: 4,
								fuel: 3,
								materials: "cloth, fur",
								cost: 18,
								description: "prevents extreme cold"
							},
							{
								name: "padded / fur hat",
								count: 1,
								type: "armor",
								d6: 2,
								weight: 2,
								fuel: 3,
								materials: "cloth, fur",
								cost: 7,
								description: "prevents extreme cold"
							},
							{
								name: "padded / fur gloves",
								count: 1,
								type: "armor",
								d6: 2,
								weight: 2,
								fuel: 3,
								materials: "cloth, fur",
								cost: 8,
								description: "prevents extreme cold"
							},
							{
								name: "padded / fur shoes",
								count: 1,
								type: "armor",
								d6: 2,
								weight: 2,
								fuel: 3,
								materials: "cloth, fur",
								cost: 12,
								description: "prevents extreme cold"
							},
							{
								name: "leather armor",
								count: 1,
								type: "armor",
								d6: 3,
								weight: 10,
								fuel: 2,
								materials: "leather",
								cost: 25,
								description: "prevents extreme cold"
							},
							{
								name: "leather cap",
								count: 1,
								type: "armor",
								d6: 3,
								weight: 1,
								fuel: 2,
								materials: "leather",
								cost: 10,
								description: "prevents extreme cold"
							},
							{
								name: "leather gloves",
								count: 1,
								type: "armor",
								d6: 3,
								weight: 1,
								fuel: 2,
								materials: "leather",
								cost: 10,
								description: "prevents extreme cold"
							},
							{
								name: "leather boots",
								count: 1,
								type: "armor",
								d6: 3,
								weight: 3,
								fuel: 2,
								materials: "leather",
								cost: 15,
								description: "prevents extreme cold"
							},
							{
								name: "wooden armor",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 25,
								fuel: 4,
								materials: "wood",
								cost: 45,
								description: " "
							},
							{
								name: "wooden helmet",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 5,
								fuel: 4,
								materials: "wood",
								cost: 15,
								description: " "
							},
							{
								name: "wooden gloves",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 4,
								fuel: 4,
								materials: "wood",
								cost: 15,
								description: " "
							},
							{
								name: "wooden boots",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 6,
								fuel: 4,
								materials: "wood",
								cost: 25,
								description: " "
							},
							{
								name: "chainmail armor",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 25,
								magnetic: true,
								materials: "metal",
								cost: 70,
								description: "conducts electricity"
							},
							{
								name: "chainmail helmet",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 5,
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: "conducts electricity"
							},
							{
								name: "chainmail gloves",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 4,
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: "conducts electricity"
							},
							{
								name: "chainmail boots",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 6,
								magnetic: true,
								materials: "metal",
								cost: 40,
								description: "conducts electricity"
							},
							{
								name: "scalemail armor",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 30,
								materials: "scale",
								cost: 90,
								description: "prevents extreme cold"
							},
							{
								name: "scalemail helmet",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 6,
								materials: "scale",
								cost: 30,
								description: "prevents extreme cold"
							},
							{
								name: "scalemail gloves",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 6,
								materials: "scale",
								cost: 30,
								description: "prevents extreme cold"
							},
							{
								name: "scalemail boots",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 8,
								materials: "scale",
								cost: 50,
								description: "prevents extreme cold"
							},
							{
								name: "platemail armor",
								count: 1,
								type: "armor",
								d6: 6,
								weight: 40,
								magnetic: true,
								materials: "metal",
								cost: 110,
								description: "conducts electricity"
							},
							{
								name: "platemail helmet",
								count: 1,
								type: "armor",
								d6: 6,
								weight: 7,
								magnetic: true,
								materials: "metal",
								cost: 40,
								description: "conducts electricity"
							},
							{
								name: "platemail gloves",
								count: 1,
								type: "armor",
								d6: 6,
								weight: 8,
								magnetic: true,
								materials: "metal",
								cost: 40,
								description: "conducts electricity"
							},
							{
								name: "platemail boots",
								count: 1,
								type: "armor",
								d6: 6,
								weight: 10,
								magnetic: true,
								materials: "metal",
								cost: 60,
								description: "conducts electricity"
							},
							{
								name: "stonemail armor",
								count: 1,
								type: "armor",
								d6: 7,
								weight: 50,
								materials: "stone",
								cost: 130,
								description: " "
							},
							{
								name: "stonemail helmet",
								count: 1,
								type: "armor",
								d6: 7,
								weight: 8,
								materials: "stone",
								cost: 50,
								description: " "
							},
							{
								name: "stonemail glovse",
								count: 1,
								type: "armor",
								d6: 7,
								weight: 8,
								materials: "stone",
								cost: 50,
								description: " "
							},
							{
								name: "stonemail boots",
								count: 1,
								type: "armor",
								d6: 7,
								weight: 14,
								materials: "stone",
								cost: 70,
								description: " "
							},
						],
						shields: [
							{
								name: "plywood shield",
								count: 1,
								type: "shield",
								d6: 3,
								weight: 5,
								fuel: 2,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 2
									}
								],
								materials: "wood",
								cost: 25,
								description: " "
							},
							{
								name: "wooden shield",
								count: 1,
								type: "shield",
								d6: 4,
								weight: 10,
								fuel: 3,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								materials: "wood",
								cost: 50,
								description: " "
							},
							{
								name: "bone / scale shield",
								count: 1,
								type: "shield",
								d6: 5,
								weight: 15,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								materials: "scale, bone",
								cost: 75,
								description: " "
							},
							{
								name: "metal shield",
								count: 1,
								type: "shield",
								d6: 6,
								weight: 20,
								hands: 1,
								magnetic: true,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								materials: "metal",
								cost: 100,
								description: "conducts electricity"
							},
							{
								name: "stone shield",
								count: 1,
								type: "shield",
								d6: 7,
								weight: 30,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								materials: "stone",
								cost: 150,
								description: " "
							}
						],
						potions: [
							{
								name: "pain killer",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 1, b: 0},
								conditions: {pain_relief: 1},
								cost: 2,
								description: "causes pain relief for 1d6 hours"
							},
							{
								name: "severe pain killer",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 2, b: 0},
								conditions: {pain_relief: 2},
								cost: 4,
								description: "causes pain relief for 2d6 hours"
							},
							{
								name: "weak healing elixir",
								count: 1,
								type: "healing",
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 4, b: 0},
								d6: 1,
								cost: 8,
								description: "removes 1d6 damage"
							},
							{
								name: "strong healing elixir",
								count: 1,
								type: "healing",
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 7, b: 0},
								d6: 2,
								cost: 14,
								description: "removes 2d6 damage"
							},
							{
								name: "immunity booster",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 2, b: 2},
								conditions: {immunity_boost: 4},
								cost: 8,
								description: "causes immunity boost for 4d6 hours"
							},
							{
								name: "resistance elixir",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 4, b: 4},
								conditions: {resistance: 4},
								cost: 16,
								description: "causes resistance for 4d6 hours"
							},
							{
								name: "antitoxin",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 0, g: 6, b: 6},
								conditions: {poison: 0, paralysis_arms: 0, paralysis_legs: 0},
								cost: 24,
								description: "eliminates poison and paralysis"
							},
							{
								name: "fizzle foam",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 1, g: 1, b: 2},
								cost: 8,
								description: "fizzles and foams for 1d6 rounds"
							},
							{
								name: "expanding fizzle foam",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 2, b: 4},
								cost: 16,
								description: "fizzles and foams and expands for 1d6 rounds"
							},
							{
								name: "glow goo",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 2, b: 2},
								conditions: {darkness: 0},
								cost: 12,
								description: "creates light for 1d6 hours"
							},
							{
								name: "superglow goo",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 4, b: 4},
								conditions: {blinding_light: 1, darkness: 0},
								cost: 24,
								description: "creates blinding light for 1d6 rounds, then light for 2d6 hours"
							},
							{
								name: "perfume",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 1, g: 2, b: 1},
								conditions: {noxious_odor: 0},
								cost: 8,
								description: "removes noxious odor; creates a pleasant scent for 1d6 hours"
							},
							{
								name: "stink potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 4, b: 2},
								conditions: {noxious_odor: 2},
								cost: 16,
								description: "causes noxious odor 2d6 rounds"
							},
							{
								name: "insect repellent",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 1, b: 1},
								cost: 8,
								description: "light fog that repels bugs for 2d6 hours"
							},
							{
								name: "smoke potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 2, b: 2},
								conditions: {smoke: 2},
								cost: 16,
								description: "causes smoke in 5-ft square and surrounding 5-ft squares for 2d6 rounds"
							},
							{
								name: "warmth syrup",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 0, b: 2},
								conditions: {extreme_heat: 1, extreme_cold: 0},
								cost: 8,
								description: "causes extreme heat for 1d6 rounds, then heat for 1d6 hours"
							},
							{
								name: "fire water",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 0, b: 4},
								fuel: 1,
								conditions: {extreme_heat: 1, extreme_cold: 0},
								cost: 16,
								description: "ignites and fuels fire 1d6 rounds"
							},
							{
								name: "flashbang",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 6, g: 0, b: 6},
								d6: 3,
								conditions: {loud_noise: 1, blinding_light: 1},
								cost: 24,
								description: "causes loud noise and blinding light for 1d6 rounds; explosion causes 3d6 damage to 5-ft square and surrounding 5-ft squares"
							},
							{
								name: "chill syrup",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 2, b: 0},
								conditions: {extreme_cold: 1, extreme_heat: 0},
								cost: 8,
								description: "causes extreme cold for 1d6 rounds, then cold for 1d6 hours"
							},
							{
								name: "freeze foam",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 4, b: 0},
								conditions: {extreme_cold: 1, extreme_heat: 0, paralysis_arms: 1, paralysis_legs: 1},
								cost: 16,
								description: "causes extreme cold for 1d6 rounds, then cold for 1d6 hours; causes localized paralysis for 1d6 rounds"
							},
							{
								name: "frostbang",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 6, g: 6, b: 0},
								conditions: {loud_noise: 1, blinding_light: 1, extreme_cold: 1, extreme_heat: 0, paralysis_arms: 1, paralysis_legs: 1},
								cost: 24,
								description: "causes loud noise and blinding light for 1d6 rounds; explosion causes extreme cold and full-body paralysis to 5-ft square and surrounding 5-ft squares for 1d6 rounds, then cold for 1d6 hours"
							},
							{
								name: "sleep potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 6, g: 5, b: 1},
								conditions: {sleep: 1},
								cost: 24,
								description: "causes sleep for 1d6 hours"
							},
							{
								name: "alertness potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 6, b: 4},
								conditions: {sleep: 0, alertness: 1},
								cost: 24,
								description: "ends sleep; causes alertness for 1d6 hours"
							},
							{
								name: "concentration elixir",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 4, b: 6},
								conditions: {sleep: 0, concentration: 1},
								cost: 24,
								description: "ends sleep; causes concentration for 1d6 hours"
							},
							{
								name: "perception potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 1, g: 5, b: 6},
								conditions: {sleep: 0, perceptiveness: 1},
								cost: 24,
								description: "causes perceptiveness for 1d6 hours"
							},
							{
								name: "pain potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 5, b: 1},
								conditions: {minor_pain_body: 1, minor_pain_head: 1},
								cost: 20,
								description: "causes head pain and body pain for 1d6 rounds"
							},
							{
								name: "severe pain potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 7, g: 5, b: 2},
								conditions: {severe_pain: 2},
								cost: 28,
								description: "causes severe pain for 2d6 rounds"
							},
							{
								name: "weakness elixir",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 6, b: 2},
								conditions: {exhaustion: 1},
								cost: 24,
								description: "causes exhaustion for 1d6 hours"
							},
							{
								name: "poison potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 6, g: 2, b: 4},
								conditions: {poison: 1},
								cost: 24,
								description: "causes poison"
							},
							{
								name: "paralysis potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 6, g: 4, b: 4},
								conditions: {paralysis_arms: 1, paralysis_legs: 1},
								cost: 28,
								description: "causes localized paralysis for 1d6 hours"
							},
							{
								name: "reflective paint",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 1, g: 5, b: 4},
								cost: 20,
								description: "reflects different colors, depending on time heated; worn as war paint for +5 intimidate"
							},
							{
								name: "invisible ink",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 4, b: 2},
								cost: 20,
								description: "use penmanship or drawing; writing only appears when heated"
							},
							{
								name: "sticky goo",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 2, b: 4},
								cost: 20,
								description: "items stick together and require a strength check to separate"
							},
							{
								name: "slip oil",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 6, g: 4, b: 2},
								cost: 24,
								description: "items require a dexterity check to hold"
							},
							{
								name: "instant concrete",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 2, b: 6},
								cost: 24,
								description: "instantly hardens into a hard plaster that provides 1d6 armor"
							},
							{
								name: "solvent acid",
								count: 1,
								type: "potion",
								weight: 0.5,
								d6: 3,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								recipe: {w: 10, r: 6, g: 2, b: 6},
								cost: 28,
								description: "causes 3d6 acid damage"
							},
							{
								name: "power cell acid",
								count: 1,
								type: "potion",
								weight: 0.5,
								d6: 3,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								recipe: {w: 10, r: 5, g: 2, b: 7},
								cost: 28,
								description: "causes 3d6 acid damage; conducts electricity; stores energy to power ancient technology"
							},
							{
								name: "nightvision potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 1, g: 6, b: 7},
								conditions: {darkness: 0},
								cost: 28,
								description: "+10 night vision for 2d6 hours"
							},
							{
								name: "breathing elixir",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 2, g: 5, b: 7},
								conditions: {asphyxiation: 0},
								cost: 28,
								description: "+10 hold breath for 1d6 hours"
							},
							{
								name: "elixir of silence",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 5, g: 1, b: 6},
								cost: 24,
								description: "the drinker has no voice for 1d6 hours"
							},
							{
								name: "truth serum",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 5, g: 5, b: 4},
								cost: 28,
								description: "the drinker is unable to lie or bluff for 1d6 hours"
							},
							{
								name: "lust potion",
								count: 1,
								type: "potion",
								weight: 0.5,
								recipe: {w: 10, r: 4, g: 6, b: 4},
								cost: 28,
								description: "the drinker becomes lustful for 1d6 hours"
							}
						],
						food: [
							{
								name: "apple",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "banana",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 1,
								description: " "
							},
							{
								name: "beans",
								count: 1,
								type: "food",
								weight: 0.01,
								costPerPound: 2,
								description: " "
							},
							{
								name: "beef",
								count: 1,
								type: "food",
								weight: 400,
								costPerPound: 4,
								cost: 1600,
								description: "use cooking to prevent infection"
							},
							{
								name: "beet",
								count: 1,
								type: "food",
								weight: 2,
								costPerPound: 1,
								cost: 2,
								description: " "
							},
							{
								name: "berries",
								count: 1,
								type: "food",
								weight: 0.02,
								costPerPound: 3,
								description: " "
							},
							{
								name: "bread",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 2,
								cost: 2,
								description: " "
							},
							{
								name: "butter",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 4,
								cost: 1,
								description: " "
							},
							{
								name: "cabbage",
								count: 1,
								type: "food",
								weight: 2,
								costPerPound: 1,
								cost: 2,
								description: " "
							},
							{
								name: "carrot",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "cheese",
								count: 1,
								type: "food",
								weight: 0.5,
								costPerPound: 4,
								cost: 2,
								description: " "
							},
							{
								name: "chicken",
								count: 1,
								type: "food",
								weight: 7,
								costPerPound: 2,
								cost: 14,
								description: "use cooking to prevent infection"
							},
							{
								name: "chocolate",
								count: 1,
								type: "food",
								weight: 0.1,
								costPerPound: 10,
								cost: 1,
								description: " "
							},
							{
								name: "citrus fruit",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "corn",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "crab",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 8,
								cost: 2,
								description: "use cooking to prevent infection"
							},
							{
								name: "egg (dozen)",
								count: 1,
								type: "food",
								weight: 1.5,
								costPerPound: 2,
								cost: 3,
								description: "use cooking to prevent infection"
							},
							{
								name: "fig",
								count: 1,
								type: "food",
								weight: 0.1,
								costPerPound: 10,
								cost: 1,
								description: " "
							},
							{
								name: "fish (river)",
								count: 1,
								type: "food",
								weight: 25,
								costPerPound: 5,
								cost: 125,
								description: "use cooking to prevent infection"
							},
							{
								name: "fish (ocean)",
								count: 1,
								type: "food",
								weight: 50,
								costPerPound: 10,
								cost: 500,
								description: "use cooking to prevent infection"
							},
							{
								name: "flour",
								count: 1,
								type: "food",
								weight: 0.001,
								costPerPound: 1,
								description: " "
							},
							{
								name: "goat",
								count: 1,
								type: "food",
								weight: 50,
								costPerPound: 5,
								cost: 250,
								description: "use cooking to prevent infection"
							},
							{
								name: "grapes",
								count: 1,
								type: "food",
								weight: 0.01,
								costPerPound: 3,
								description: " "
							},
							{
								name: "herbs",
								count: 1,
								type: "food",
								weight: 0.1,
								costPerPound: 10,
								cost: 1,
								description: " "
							},
							{
								name: "honey",
								count: 1,
								type: "food",
								weight: 0.5,
								costPerPound: 8,
								cost: 4,
								description: " "
							},
							{
								name: "lamb",
								count: 1,
								type: "food",
								weight: 35,
								costPerPound: 10,
								cost: 350,
								description: "use cooking to prevent infection"
							},
							{
								name: "lettuce",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 2,
								cost: 2,
								description: " "
							},
							{
								name: "lobster",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 12,
								cost: 12,
								description: "use cooking to prevent infection"
							},
							{
								name: "melon",
								count: 1,
								type: "food",
								weight: 3,
								costPerPound: 1,
								cost: 3,
								description: " "
							},
							{
								name: "mushroom",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "nuts",
								count: 1,
								type: "food",
								weight: 0.01,
								costPerPound: 10,
								description: " "
							},
							{
								name: "olives",
								count: 1,
								type: "food",
								weight: 0.01,
								costPerPound: 20,
								description: " "
							},
							{
								name: "onion",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "oyster",
								count: 1,
								type: "food",
								weight: 0.1,
								costPerPound: 20,
								cost: 2,
								description: "use cooking to prevent infection"
							},
							{
								name: "pepper",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "pork",
								count: 1,
								type: "food",
								weight: 200,
								costPerPound: 4,
								cost: 800,
								description: "use cooking to prevent infection"
							},
							{
								name: "potato",
								count: 1,
								type: "food",
								weight: 0.5,
								costPerPound: 1,
								cost: 0.5,
								description: " "
							},
							{
								name: "pumpkin",
								count: 1,
								type: "food",
								weight: 10,
								costPerPound: 1,
								cost: 10,
								description: " "
							},
							{
								name: "rabbit",
								count: 1,
								type: "food",
								weight: 3,
								costPerPound: 5,
								cost: 15,
								description: "use cooking to prevent infection"
							},
							{
								name: "radish",
								count: 1,
								type: "food",
								weight: 0.05,
								costPerPound: 2,
								description: " "
							},
							{
								name: "rice",
								count: 1,
								type: "food",
								weight: 0.001,
								costPerPound: 2,
								description: " "
							},
							{
								name: "seeds",
								count: 1,
								type: "food",
								weight: 0.01,
								costPerPound: 1,
								description: " "
							},
							{
								name: "soup (meat)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 2,
								cost: 2,
								description: " "
							},
							{
								name: "soup (vegetable)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 1,
								cost: 1,
								description: " "
							},
							{
								name: "sugar",
								count: 1,
								type: "food",
								weight: 0.001,
								costPerPound: 1,
								description: " "
							},
							{
								name: "tomato",
								count: 1,
								type: "food",
								weight: 0.25,
								costPerPound: 2,
								cost: 0.5,
								description: " "
							},
							{
								name: "turnip",
								count: 1,
								type: "food",
								weight: 2,
								costPerPound: 1,
								cost: 2,
								description: " "
							},
							{
								name: "venison",
								count: 1,
								type: "food",
								weight: 60,
								costPerPound: 10,
								cost: 600,
								description: "use cooking to prevent infection"
							}
						],
						drink: [
							{
								name: "ale (pint)",
								count: 1,
								type: "food",
								weight: 1,
								conditions: {inebriation: 1},
								costPerPound: 2,
								cost: 2,
								description: "causes inebriation for 1d6 hours"
							},
							{
								name: "beer (pint)",
								count: 1,
								type: "food",
								weight: 1,
								conditions: {inebriation: 1},
								costPerPound: 2,
								cost: 2,
								description: "causes inebriation for 1d6 hours"
							},
							{
								name: "fruit juice (pint)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 3,
								cost: 3,
								description: " "
							},
							{
								name: "mead (pint)",
								count: 1,
								type: "food",
								weight: 1,
								conditions: {inebriation: 1},
								costPerPound: 2,
								cost: 2,
								description: "causes inebriation for 1d6 hours"
							},
							{
								name: "milk (pint)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 0.5,
								cost: 0.5,
								description: " "
							},
							{
								name: "rum (bottle)",
								count: 1,
								type: "food",
								weight: 2,
								conditions: {inebriation: 1},
								costPerPound: 8,
								cost: 16,
								description: "causes inebriation for 1d6 hours"
							},
							{
								name: "tea (pint)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 1,
								cost: 1,
								description: " "
							},
							{
								name: "vegetable juice (pint)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 3,
								cost: 3,
								description: " "
							},
							{
								name: "water (pint)",
								count: 1,
								type: "food",
								weight: 1,
								costPerPound: 1,
								cost: 1,
								description: " "
							},
							{
								name: "whiskey (bottle)",
								count: 1,
								type: "food",
								weight: 2,
								conditions: {inebriation: 1},
								costPerPound: 8,
								cost: 16,
								description: "causes inebriation for 1d6 hours"
							},
							{
								name: "wine, white (bottle)",
								count: 1,
								type: "food",
								weight: 2,
								conditions: {inebriation: 1},
								costPerPound: 12,
								cost: 24,
								description: "causes inebriation for 1d6 hours"
							},
							{
								name: "wine, red (bottle)",
								count: 1,
								type: "food",
								weight: 2,
								conditions: {inebriation: 1},
								costPerPound: 12,
								cost: 24,
								description: "causes inebriation for 1d6 hours"
							}
						],
						instruments: [
							{
								name: "bagpipes",
								count: 1,
								weight: 6,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								materials: "leather",
								cost: 100,
								description: "from animal organs; mid-range sounds (musicianship)"
							},
							{
								name: "bass",
								count: 1,
								weight: 7,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 3,
								materials: "wood, string",
								cost: 250,
								description: "wood and string; mid-range to low-pitched sounds (musicianship)"
							},
							{
								name: "bassoon",
								count: 1,
								weight: 8,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood",
								cost: 300,
								description: "low-pitch to mid-range sounds (musicianship)"
							},
							{
								name: "bell",
								count: 1,
								weight: 0.5,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								materials: "metal",
								cost: 5,
								description: "metal; ringing sound (musicianship)"
							},
							{
								name: "bird pipes",
								count: 1,
								weight: 2,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								materials: "wood",
								cost: 10,
								description: "wood or metal; to sound like a bird (musicianship); +5 handle animals for birds"
							},
							{
								name: "cello",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 3,
								materials: "wood, string",
								cost: 250,
								description: "wood and string; mid-range to low-pitched sounds (musicianship)"
							},
							{
								name: "clarinet",
								count: 1,
								weight: 3,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 1,
								materials: "wood",
								cost: 200,
								description: "mid-range to high-pitched sounds (musicianship)"
							},
							{
								name: "drum",
								count: 1,
								weight: 3,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								materials: "wood, leather",
								cost: 10,
								description: "unpitched sounds (musicianship)"
							},
							{
								name: "dulcimer",
								count: 1,
								weight: 10,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 150,
								description: "string & wood; mid-range sounds (musicianship)"
							},
							{
								name: "flute",
								count: 1,
								weight: 2,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 65,
								description: "high-pitched sounds (musicianship)"
							},
							{
								name: "gong",
								count: 1,
								weight: 10,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 80,
								description: "low-pitched sounds (musicianship)"
							},
							{
								name: "guitar",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 50,
								description: "mid-range sounds (musicianship)"
							},
							{
								name: "harp",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 150,
								description: "mid-range sounds (musicianship)"
							},
							{
								name: "horn instrument",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								materials: "metal",
								cost: 100,
								description: "made from animal bone or brass; mid-range sounds (musicianship)"
							},
							{
								name: "lute",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 50,
								description: "mid-range sounds (musicianship)"
							},
							{
								name: "lyre",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 150,
								description: "mid-range sounds (musicianship)"
							},
							{
								name: "oboe",
								count: 1,
								weight: 3,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 1,
								materials: "wood",
								cost: 200,
								description: "mid-range to high-pitched sounds (musicianship)"
							},
							{
								name: "panflute",
								count: 1,
								weight: 2,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 1,
								materials: "wood",
								cost: 35,
								description: "high-pitched sounds (musicianship)"
							},
							{
								name: "shawm",
								count: 1,
								weight: 3,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 1,
								materials: "wood",
								cost: 200,
								description: "mid-range to high-pitched sounds (musicianship)"
							},
							{
								name: "tambourine",
								count: 1,
								weight: 2,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								materials: "wood, metal",
								cost: 25,
								description: "unpitched sounds (musicianship)"
							},
							{
								name: "viol",
								count: 1,
								weight: 3,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 150,
								description: "wood and string; high-pitched to mid-range sounds (musicianship)"
							},
							{
								name: "viola",
								count: 1,
								weight: 2,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 150,
								description: "wood and string; high-pitched to mid-range sounds (musicianship)"
							},
							{
								name: "violin",
								count: 1,
								weight: 1,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 150,
								description: "wood and string; high-pitched to mid-range sounds (musicianship)"
							},
							{
								name: "whistle",
								count: 1,
								weight: 0.05,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								cost: 4,
								materials: "metal",
								description: "high-pitched sound (musicianship)"
							},
							{
								name: "zither",
								count: 1,
								weight: 7,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "musicianship"
									}
								],
								fuel: 2,
								materials: "wood, string",
								cost: 40,
								description: "string & wood; mid-range sounds (musicianship)"
							}
						],
						miscellaneous: [
							{
								name: "abacus",
								count: 1,
								weight: 2,
								hands: 1,
								usage: [
									{
										statistic: "logic",
										skill: "mathematics",
										modifier: 5
									}
								],
								materials: "wood",
								cost: 20,
								description: "mathematics +5"
							},
							{
								name: "astrolabe",
								count: 1,
								weight: 0.5,
								hands: 1,
								usage: [
									{
										statistic: "memory",
										skill: "geography",
										modifier: 5
									}
								],
								materials: "wood",
								cost: 20,
								description: "geography +5"
							},
							{
								name: "amulet",
								count: 1,
								weight: 0.1,
								magnetic: true,
								materials: "metal",
								cost: 30,
								description: " "
							},
							{
								name: "ball",
								count: 1,
								weight: 1,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								materials: "wood, leather, metal",
								cost: 10,
								description: " "
							},
							{
								name: "ball bearings",
								count: 100,
								weight: 0.005,
								magnetic: true,
								materials: "metal",
								cost: 10,
								description: " "
							},
							{
								name: "barrel",
								count: 1,
								weight: 100,
								fuel: 5,
								materials: "wood",
								cost: 60,
								description: "used to carry items"
							},
							{
								name: "basket",
								count: 1,
								weight: 2,
								hands: 1,
								fuel: 1,
								materials: "wood",
								cost: 10,
								description: "used to carry items"
							},
							{
								name: "bedroll",
								count: 1,
								weight: 7,
								conditions: {extreme_cold: 0},
								materials: "wool",
								cost: 20,
								description: "prevents extreme cold"
							},
							{
								name: "belt",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								materials: "leather",
								cost: 5,
								description: " "
							},
							{
								name: "bit & bridle",
								count: 1,
								weight: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "ride_animals",
										modifier: 2
									}
								],
								materials: "metal, leather",
								cost: 25,
								description: "for horses or other mounts; +2 ride animals"
							},
							{
								name: "blanket",
								count: 1,
								weight: 3,
								conditions: {extreme_cold: 0},
								materials: "cloth, wool",
								cost: 15,
								description: "prevents extreme cold"
							},
							{
								name: "block & tackle (pulleys)",
								count: 1,
								weight: 5,
								hands: 2,
								usage: [
									{
										statistic: "strength",
										skill: "carry",
										modifier: 5
									}
								],
								materials: "metal, wood, string",
								cost: 10,
								description: "+5 carry (pull/lift/etc.)"
							},
							{
								name: "bola",
								count: 1,
								weight: 5,
								hands: 1,
								conditions: { paralysis_arms: 1, paralysis_legs: 1 },
								usage: [
									{
										statistic: "strength",
										skill: "throw"
									}
								],
								materials: "wood, string",
								cost: 20,
								description: "must be thrown; can cause arm or leg paralysis; can be overcome with escape bonds"
							},
							{
								name: "book",
								count: 1,
								weight: 3,
								hands: 1,
								usage: [
									{
										statistic: "memory",
										skill: "astronomy",
										modifier: 5
									}
								],
								fuel: 1,
								materials: "paper",
								cost: 5,
								description: "+5 specific memory/logic skill (mathematics, alchemy, zoology, etc.)"
							},
							{
								name: "bottle",
								count: 1,
								weight: 0.1,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								materials: "glass",
								cost: 1,
								description: "shatters on impact"
							},
							{
								name: "bowl",
								count: 1,
								weight: 0.5,
								hands: 1,
								materials: "wood, metal, ceramic, glass",
								cost: 1,
								description: "used to carry food"
							},
							{
								name: "bracelet",
								count: 1,
								weight: 0.1,
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: " "
							},
							{
								name: "broom",
								count: 1,
								weight: 2,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								fuel: 2,
								materials: "wood",
								cost: 5,
								description: "used for cleaning"
							},
							{
								name: "bucket",
								count: 1,
								weight: 2,
								hands: 1,
								fuel: 1,
								materials: "wood",
								cost: 5,
								description: "used to carry items / liquids"
							},
							{
								name: "caltrops",
								count: 20,
								weight: 0.1,
								magnetic: true,
								d6: 3,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								materials: "metal",
								cost: 10,
								description: "on a failed sneak through a 5-ft square covered in caltops, causes 3d6 damage"
							},
							{
								name: "cards",
								count: 52,
								weight: 0.001,
								hands: 1,
								materials: "paper",
								usage: [
									{
										statistic: "logic",
										skill: "game_playing"
									}
								],
								cost: 5,
								description: " "
							},
							{
								name: "candle",
								count: 1,
								weight: 0.1,
								hands: 1,
								conditions: {darkness: 0},
								materials: "wax",
								cost: 1,
								description: "burns for 2 hours; negates darkness"
							},
							{
								name: "candle flashlight",
								count: 1,
								weight: 1,
								hands: 1,
								conditions: {darkness: 0},
								magnetic: true,
								materials: "metal",
								cost: 3,
								description: "focuses candlelight; push up as candle burns for 2 hours; negates darkness"
							},
							{
								name: "cauldron",
								count: 1,
								weight: 5,
								usage: [
									{
										statistic: "memory",
										skill: "cooking"
									},
									{
										statistic: "memory",
										skill: "alchemy"
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 25,
								description: "used for heating water for cooking or making potions (alchemy, medicine)"
							},
							{
								name: "chain",
								count: 1,
								weight: 10,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 10,
								description: "10 feet"
							},
							{
								name: "chest",
								count: 1,
								weight: 25,
								fuel: 3,
								materials: "wood, metal",
								cost: 50,
								description: "used to carry items"
							},
							{
								name: "cloth",
								count: 1,
								weight: 0.5,
								fuel: 1,
								usage: [
									{
										statistic: "memory",
										skill: "medicine",
										modifier: 2
									}
								],
								materials: "cloth",
								cost: 1,
								description: "used to make tents or clothing, to carry items, or to bandage wounds (+2 medicine)"
							},
							{
								name: "coin",
								count: 1,
								weight: 0.01,
								materials: "metal",
								cost: 1,
								description: "used as currency"
							},
							{
								name: "compass",
								count: 1,
								weight: 0.05,
								hands: 1,
								usage: [
									{
										statistic: "memory",
										skill: "geography",
										modifier: 5
									}
								],
								magnetic: true,
								materials: "wood, metal",
								cost: 15,
								description: "+5 geography"
							},
							{
								name: "crochet hook",
								count: 1,
								weight: 0.05,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting"
									}
								],
								materials: "wood",
								cost: 2,
								description: "used in crafting"
							},
							{
								name: "crook",
								count: 1,
								weight: 4,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								fuel: 3,
								materials: "wood",
								cost: 30,
								description: " "
							},
							{
								name: "crowbar",
								count: 1,
								weight: 5,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "astronomy",
										modifier: 5
									},
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 25,
								description: "+5 strength (carry) when applicable"
							},
							{
								name: "crown",
								count: 1,
								type: "armor",
								weight: 1,
								magnetic: true,
								d6: 2,
								materials: "metal",
								cost: 40,
								description: "2d6 head armor"
							},
							{
								name: "cup",
								count: 1,
								weight: 0.5,
								hands: 1,
								materials: "wood, metal, ceramic, glass",
								cost: 1,
								description: "used to carry liquid items"
							},
							{
								name: "dice",
								count: 1,
								weight: 0.05,
								usage: [
									{
										statistic: "logic",
										skill: "game_playing"
									}
								],
								hands: 1,
								materials: "wood, metal, ceramic",
								cost: 1,
								description: "for game-playing"
							},
							{
								name: "extract containers",
								count: 3,
								weight: 0.5,
								hands: 2,
								materials: "glass",
								cost: 3,
								description: "for potion-making (alchemy, medicine); made of a special material that prevents corrosion"
							},
							{
								name: "feather",
								count: 1,
								weight: 0.001,
								materials: "",
								cost: 1,
								description: "from birds"
							},
							{
								name: "fishing pole, hook, line",
								count: 1,
								weight: 4,
								usage: [
									{
										statistic: "strength",
										skill: "fishing",
										modifier: 5
									}
								],
								hands: 2,
								materials: "wood, string, metal",
								cost: 10,
								description: "for catching fish or other aquatic creatures (+5 fishing)"
							},
							{
								name: "flask",
								count: 1,
								weight: 0.5,
								hands: 1,
								materials: "leather, metal",
								cost: 10,
								description: "used to carry liquids"
							},
							{
								name: "flintbox",
								count: 1,
								weight: 0.5,
								hands: 2,
								materials: "metal",
								cost: 6,
								description: "starts fire"
							},
							{
								name: "flower",
								count: 1,
								weight: 0.01,
								materials: "wood",
								cost: 1,
								description: "may contain flower extract"
							},
							{
								name: "flower extract (red)",
								count: 1,
								weight: 0.01,
								cost: 1,
								description: "for potion-making (alchemy, medicine); volatile on their own, they can be combined in specific combinations and diluted with 10 parts water to make potions"
							},
							{
								name: "flower extract (green)",
								count: 1,
								weight: 0.01,
								cost: 1,
								description: "for potion-making (alchemy, medicine); volatile on their own, they can be combined in specific combinations and diluted with 10 parts water to make potions"
							},
							{
								name: "flower extract (blue)",
								count: 1,
								weight: 0.01,
								cost: 1,
								description: "for potion-making (alchemy, medicine); volatile on their own, they can be combined in specific combinations and diluted with 10 parts water to make potions"
							},
							{
								name: "gameboard & pieces",
								count: 1,
								weight: 2,
								usage: [
									{
										statistic: "logic",
										skill: "game_playing"
									}
								],
								materials: "wood, metal, ceramic, glass",
								cost: 15,
								description: "used for game-playing"
							},
							{
								name: "gemstone (cyan)",
								count: 1,
								weight: 0.02,
								materials: "stone",
								cost: 2,
								description: "for potion-making (alchemy); crushed and mixed into 10 parts boiling water to make potions; equivalent to 1 green and 1 blue"
							},
							{
								name: "gemstone (magenta)",
								count: 1,
								weight: 0.02,
								materials: "stone",
								cost: 2,
								description: "for potion-making (alchemy); crushed and mixed into 10 parts boiling water to make potions; equivalent to 1 red and 1 blue"
							},
							{
								name: "gemstone (yellow)",
								count: 1,
								weight: 0.02,
								materials: "stone",
								cost: 2,
								description: "for potion-making (alchemy); crushed and mixed into 10 parts boiling water to make potions; equivalent to 1 red and 1 green"
							},
							{
								name: "glass pane",
								count: 1,
								weight: 1,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								materials: "glass",
								cost: 5,
								description: "shatters on impact"
							},
							{
								name: "grappling hook",
								count: 1,
								weight: 4,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "climb",
										modifier: 5
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 25,
								description: "+5 climb"
							},
							{
								name: "hammer",
								count: 1,
								weight: 3,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting"
									},
									{
										statistic: "memory",
										skill: "metalworking"
									}
								],
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 4,
								description: "used in metalworking, woodworking, crafting"
							},
							{
								name: "harness (climbing)",
								count: 1,
								weight: 5,
								usage: [
									{
										statistic: "strength",
										skill: "climb",
										modifier: 5
									}
								],
								materials: "leather",
								cost: 25,
								description: "+5 climb"
							},
							{
								name: "hide",
								count: 1,
								weight: 15,
								materials: "leather",
								cost: 5,
								description: "from animals"
							},
							{
								name: "hourglass",
								count: 1,
								weight: 1,
								hands: 1,
								materials: "glass",
								cost: 15,
								description: "contains sand; for measuring the passage of time"
							},
							{
								name: "ink (+ jar)",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "penmanship"
									}
								],
								materials: "glass",
								cost: 20,
								description: "used with penmanship for writing"
							},
							{
								name: "iron poker",
								count: 1,
								weight: 5,
								hands: 1,
								magnetic: true,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								materials: "metal",
								cost: 25,
								description: " "
							},
							{
								name: "jug",
								count: 1,
								weight: 4,
								hands: 1,
								fuel: 1,
								materials: "wood, metal, ceramic, glass",
								cost: 12,
								description: "used to carry liquids"
							},
							{
								name: "key",
								count: 1,
								weight: 0.1,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 2,
								description: "metal"
							},
							{
								name: "knitting needle",
								count: 1,
								weight: 0.05,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting"
									}
								],
								materials: "wood, metal",
								cost: 2,
								description: "used in crafting"
							},
							{
								name: "ladder",
								count: 1,
								weight: 25,
								usage: [
									{
										statistic: "strength",
										skill: "climb",
										modifier: 10
									}
								],
								fuel: 6,
								materials: "wood, metal",
								cost: 50,
								description: "causes safe climbing up 10 feet"
							},
							{
								name: "lock",
								count: 1,
								weight: 1,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 10,
								description: "can be countered with lock picking"
							},
							{
								name: "lock picks",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "lock_picking",
										modifier: 5
									}
								],
								hands: 2,
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: "+5 lock picking"
							},
							{
								name: "magnet cube",
								count: 1,
								weight: 0.01,
								magnetic: true,
								materials: "stone",
								cost: 1,
								description: "0.5-inch cube; used as currency"
							},
							{
								name: "magnifying glass",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "perception",
										skill: "sight",
										modifier: 5
									}
								],
								hands: 1,
								materials: "wood, glass",
								cost: 10,
								description: "+5 sight for small images / writing"
							},
							{
								name: "map",
								count: 1,
								weight: 0.1,
								usage: [
									{
										statistic: "memory",
										skill: "geography",
										modifier: 5
									}
								],
								hands: 1,
								fuel: 1,
								materials: "paper",
								cost: 25,
								description: "+5 geography"
							},
							{
								name: "measuring cups",
								count: 6,
								weight: 1.5,
								usage: [
									{
										statistic: "memory",
										skill: "alchemy"
									},
									{
										statistic: "memory",
										skill: "medicine"
									}
								],
								hands: 1,
								materials: "glass, metal, ceramic",
								cost: 3,
								description: "for potion-making (alchemy, medicine); made of a material that prevents corrosion; used to measure parts: (blue: 3 & 5), (green: 3 & 7), (red: 3 & 11)"
							},
							{
								name: "mirror",
								count: 1,
								weight: 1,
								materials: "glass",
								cost: 20,
								description: "reflective; shatters on impact"
							},
							{
								name: "mortar & pestle",
								count: 1,
								weight: 2,
								usage: [
									{
										statistic: "memory",
										skill: "alchemy"
									},
									{
										statistic: "memory",
										skill: "medicine"
									}
								],
								hands: 1,
								materials: "ceramic, glass",
								cost: 15,
								description: "for potion-making (alchemy, medicine)"
							},
							{
								name: "mushroom extract (red)",
								count: 1,
								weight: 0.01,
								cost: 1,
								description: "for potion-making (alchemy, medicine); volatile on their own, they can be combined in specific combinations and diluted with 10 parts water to make potions"
							},
							{
								name: "mushroom extract (green)",
								count: 1,
								weight: 0.01,
								cost: 1,
								description: "for potion-making (alchemy, medicine); volatile on their own, they can be combined in specific combinations and diluted with 10 parts water to make potions"
							},
							{
								name: "mushroom extract (blue)",
								count: 1,
								weight: 0.01,
								cost: 1,
								description: "for potion-making (alchemy, medicine); volatile on their own, they can be combined in specific combinations and diluted with 10 parts water to make potions"
							},
							{
								name: "muzzle",
								count: 1,
								weight: 1,
								materials: "leather",
								usage: [
									{
										statistic: "logic",
										skill: "handle_animals",
										modifier: 5
									}
								],
								cost: 20,
								description: "leather; prevents animal bite attacks (+5 handle animals)"
							},
							{
								name: "nails",
								count: 20,
								weight: 0.1,
								magnetic: true,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3,
									}
								],
								materials: "metal",
								cost: 10,
								description: "on a failed sneak through a 5-ft square covered in caltops, causes 3d6 damage"
							},
							{
								name: "necklace",
								count: 1,
								weight: 0.1,
								cost: 30,
								materials: "metal",
								magnetic: true,
								description: "metal"
							},
							{
								name: "net",
								count: 1,
								weight: 3,
								usage: [
									{
										statistic: "dexterity",
										skill: "catch",
										modifier: 5
									},
									{
										statistic: "strength",
										skill: "fishing"
									}
								],
								hands: 1,
								materials: "string",
								cost: 10,
								description: "for catching fish and insects (fishing, +5 catch)"
							},
							{
								name: "oil",
								count: 1,
								weight: 1,
								cost: 20,
								description: "1 pint fuels fire for 6 hours"
							},
							{
								name: "oil lamp",
								count: 1,
								weight: 2,
								hands: 1,
								materials: "metal",
								cost: 15,
								description: "burns for 6 hours per pint of oil; negates darkness"
							},
							{
								name: "pack",
								count: 1,
								weight: 2,
								fuel: 1,
								materials: "cloth, wool, leather",
								cost: 30,
								description: "used to carry items"
							},
							{
								name: "pan",
								count: 1,
								weight: 2,
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: "for cooking"
							},
							{
								name: "paper",
								count: 1,
								weight: 0.01,
								usage: [
									{
										statistic: "dexterity",
										skill: "penmanship"
									}
								],
								hands: 1,
								fuel: 1,
								materials: "paper",
								cost: 1,
								description: "for writing"
							},
							{
								name: "paper fan",
								count: 1,
								weight: 0.1,
								hands: 1,
								fuel: 1,
								materials: "paper",
								cost: 5,
								description: "prevents extreme heat"
							},
							{
								name: "parchment",
								count: 1,
								weight: 0.01,
								usage: [
									{
										statistic: "dexterity",
										skill: "penmanship"
									}
								],
								hands: 1,
								fuel: 1,
								materials: "leather",
								cost: 1,
								description: "for writing"
							},
							{
								name: "pick (mining)",
								count: 1,
								weight: 10,
								usage: [
									{
										statistic: "memory",
										skill: "geology"
									}
								],
								hands: 1,
								magnetic: true,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								materials: "metal",
								cost: 25,
								description: "used to break stones"
							},
							{
								name: "pillow",
								count: 1,
								weight: 0.5,
								fuel: 1,
								materials: "cloth",
								cost: 20,
								description: "filled with cotton or feathers"
							},
							{
								name: "pitcher",
								count: 1,
								weight: 4,
								hands: 1,
								fuel: 1,
								materials: "wood, metal, ceramic, glass",
								cost: 12,
								description: "used to carry liquids"
							},
							{
								name: "pitons (spikes)",
								count: 10,
								weight: 10,
								hands: 1,
								magnetic: true,
								usage: [
									{
										statistic: "strength",
										skill: "climb",
										modifier: 5
									},
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 3
									}
								],
								materials: "metal",
								cost: 50,
								description: "+5 climb"
							},
							{
								name: "plate",
								count: 1,
								weight: 0.5,
								hands: 1,
								materials: "wood, metal, ceramic, glass",
								cost: 1,
								description: "used to carry food"
							},
							{
								name: "pot",
								count: 1,
								weight: 5,
								usage: [
									{
										statistic: "memory",
										skill: "cooking"
									},
									{
										statistic: "memory",
										skill: "alchemy"
									}
								],
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 25,
								description: "used to carry liquids; for cooking or making potions (alchemy, medicine)"
							},
							{
								name: "pouch",
								count: 1,
								weight: 1,
								fuel: 1,
								materials: "cloth, wool, leather",
								cost: 5,
								description: "used to carry items"
							},
							{
								name: "prism",
								count: 1,
								weight: 2,
								materials: "glass",
								cost: 10,
								description: "glass block that splits white light into colors"
							},
							{
								name: "quill pen",
								count: 1,
								weight: 0.05,
								usage: [
									{
										statistic: "dexterity",
										skill: "penmanship"
									}
								],
								hands: 1,
								cost: 5,
								description: "used with penmanship for writing"
							},
							{
								name: "quiver",
								count: 1,
								weight: 1,
								fuel: 1,
								materials: "cloth, wool, leather",
								cost: 8,
								description: "used to hold up to 20 arrows, bolts, and other projectiles"
							},
							{
								name: "ring",
								count: 1,
								weight: 0.05,
								magnetic: true,
								materials: "metal",
								cost: 30,
								description: " "
							},
							{
								name: "rock",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								hands: 1,
								materials: "stone",
								cost: 1,
								description: " "
							},
							{
								name: "rope",
								count: 1,
								weight: 2,
								usage: [
									{
										statistic: "strength",
										skill: "climb",
										modifier: 5
									},
									{
										statistic: "dexterity",
										skill: "crafting"
									}
								],
								fuel: 2,
								materials: "string",
								cost: 10,
								description: "10 feet; +5 climbing; helps with crafting"
							},
							{
								name: "sack",
								count: 1,
								weight: 0.5,
								fuel: 1,
								materials: "cloth, wool, leather",
								cost: 2,
								description: "used to carry items"
							},
							{
								name: "saddle",
								count: 1,
								weight: 20,
								usage: [
									{
										statistic: "dexterity",
										skill: "ride_animals",
										modifier: 5
									}
								],
								materials: "leather",
								cost: 150,
								description: "for horses or other mounts (+5 ride animals)"
							},
							{
								name: "scabbard",
								count: 1,
								weight: 1,
								materials: "leather",
								cost: 10,
								description: "used to carry swords and other weapons"
							},
							{
								name: "scope",
								count: 1,
								weight: 1,
								hands: 1,
								usage: [
									{
										statistic: "perception",
										skill: "sight",
										modifier: 10
									},
									{
										statistic: "dexterity",
										skill: "missile",
										modifier: 5
									}
								],
								materials: "wood, metal, glass",
								cost: 35,
								description: "for viewing far distances (+10 sight) and accuracy with aim (+5 missile)"
							},
							{
								name: "seal",
								count: 1,
								weight: 0.5,
								hands: 1,
								materials: "metal",
								cost: 10,
								description: "used with sealing wax to mark a brand"
							},
							{
								name: "sealing wax",
								count: 1,
								weight: 0.5,
								materials: "wax",
								cost: 5,
								description: "heated to seal containers, like envelopes and bottles"
							},
							{
								name: "sextant",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "memory",
										skill: "geography",
										modifier: 5
									}
								],
								hands: 1,
								materials: "metal",
								cost: 35,
								description: "+5 geography"
							},
							{
								name: "shackles (manacles)",
								count: 1,
								weight: 6,
								hands: 2,
								magnetic: true,
								conditions: {paralysis_arms: 1, paralysis_legs: 1},
								materials: "metal",
								cost: 20,
								description: "arm bindings cause arm paralysis; leg bindings cause leg paralysis"
							},
							{
								name: "shears",
								count: 1,
								weight: 1,
								hands: 1,
								magnetic: true,
								usage: [
									{
										statistic: "dexterity",
										skill: "knifing",
										d6: 3
									}
								],
								materials: "metal",
								cost: 10,
								description: " "
							},
							{
								name: "shovel",
								count: 1,
								weight: 5,
								hands: 1,
								fuel: 1,
								magnetic: true,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 4
									}
								],
								materials: "wood, metal",
								cost: 12,
								description: "for digging"
							},
							{
								name: "ski",
								count: 2,
								weight: 14,
								fuel: 2,
								materials: "wood",
								cost: 30,
								description: "for faster travel in snowy terrain"
							},
							{
								name: "soap",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "memory",
										skill: "medicine",
										modifier: 5
									}
								],
								cost: 2,
								description: "used for bathing and preventing infection (+5 medicine)"
							},
							{
								name: "spectacles",
								count: 1,
								weight: 0.1,
								usage: [
									{
										statistic: "perception",
										skill: "sight",
										modifier: 7
									}
								],
								materials: "wood, metal, glass",
								cost: 50,
								description: "sets sight to maximum (+7)"
							},
							{
								name: "spring",
								count: 1,
								weight: 0.5,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting"
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 1,
								description: "used in crafting"
							},
							{
								name: "spyglass",
								count: 1,
								weight: 1,
								hands: 1,
								usage: [
									{
										statistic: "perception",
										skill: "sight",
										modifier: 10
									},
									{
										statistic: "dexterity",
										skill: "missile",
										modifier: 5
									}
								],
								materials: "wood, metal, glass",
								cost: 35,
								description: "for viewing far distances (+10 sight) and accuracy with aim (+5 missile)"
							},
							{
								name: "stick",
								count: 1,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								weight: 3,
								hands: 1,
								fuel: 2,
								materials: "wood",
								cost: 1,
								description: " "
							},
							{
								name: "string",
								count: 1,
								weight: 0.05,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting"
									}
								],
								materials: "string",
								cost: 1,
								description: "10 feet; used in crafting"
							},
							{
								name: "syringe (needle)",
								count: 1,
								weight: 0.1,
								usage: [
									{
										statistic: "memory",
										skill: "alchemy"
									},
									{
										statistic: "memory",
										skill: "medicine"
									}
								],
								hands: 1,
								materials: "glass, metal",
								cost: 10,
								description: "used to inject liquids, such as potions into orbs"
							},
							{
								name: "tent",
								count: 1,
								weight: 20,
								fuel: 4,
								materials: "cloth",
								cost: 40,
								description: "prevents extreme cold"
							},
							{
								name: "tooth",
								count: 1,
								weight: 0.01,
								materials: "stone",
								cost: 1,
								description: "from animals"
							},
							{
								name: "torch",
								count: 1,
								weight: 1,
								hands: 1,
								fuel: 2,
								materials: "wood, leather",
								cost: 2,
								description: "fuels fire 2 hours; negates darkness"
							},
							{
								name: "totem",
								count: 1,
								weight: 1,
								materials: "wood, metal, ceramic, glass",
								cost: 20,
								description: "emblem or statue"
							},
							{
								name: "trap",
								count: 1,
								weight: 20,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting",
										d6: 3
									}
								],
								conditions: {paralysis_legs: 1, paralysis_arms: 1},
								materials: "metal",
								cost: 50,
								description: "tension-triggered claw-like metal hunting trap causing 3d6 damage and possibly paralysis"
							},
							{
								name: "umbrella",
								count: 1,
								weight: 3,
								hands: 1,
								fuel: 2,
								usage: [
									{
										statistic: "strength",
										skill: "melee",
										d6: 3
									}
								],
								materials: "wood, cloth",
								cost: 20,
								description: "blocks rain or sun"
							},
							{
								name: "vial",
								count: 1,
								weight: 0.1,
								hands: 1,
								usage: [
									{
										statistic: "strength",
										skill: "throw",
										d6: 3
									}
								],
								materials: "glass",
								cost: 1,
								description: "shatters on impact"
							},
							{
								name: "waterskin",
								count: 1,
								weight: 5,
								hands: 1,
								materials: "leather",
								cost: 15,
								description: "used to carry liquids"
							},
							{
								name: "whetstone",
								count: 1,
								weight: 1,
								usage: [
									{
										statistic: "memory",
										skill: "metalworking"
									}
								],
								hands: 1,
								materials: "stone",
								cost: 3,
								description: "used in metalworking to sharpen blades"
							},
							{
								name: "wire",
								count: 1,
								weight: 4,
								usage: [
									{
										statistic: "strength",
										skill: "climb",
										modifier: 5
									},
									{
										statistic: "dexterity",
										skill: "crafting"
									}
								],
								magnetic: true,
								materials: "metal",
								cost: 20,
								description: "10 feet; +5 climbing; helps with crafting; conducts electricity"
							},
							{
								name: "wok",
								count: 1,
								weight: 5,
								usage: [
									{
										statistic: "memory",
										skill: "cooking"
									},
									{
										statistic: "memory",
										skill: "alchemy"
									}
								],
								hands: 1,
								magnetic: true,
								materials: "metal",
								cost: 25,
								description: "magnetic; used to carry liquids; for cooking or making potions (alchemy, medicine)"
							}
						],
						other: [
							{
								name: "small item",
								count: 1,
								weight: 1,
								d6: 1,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting",
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 1,
									}
								],
								materials: "?",
								cost: 1,
								description: "..."
							},
							{
								name: "medium item",
								count: 1,
								weight: 5,
								d6: 1,
								hands: 1,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting",
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 2,
									}
								],
								materials: "?",
								cost: 5,
								description: "..."
							},
							{
								name: "large item",
								count: 1,
								weight: 10,
								d6: 1,
								hands: 2,
								usage: [
									{
										statistic: "dexterity",
										skill: "crafting",
									},
									{
										statistic: "strength",
										skill: "throw",
										d6: 3,
									}
								],
								materials: "?",
								cost: 10,
								description: "..."
							}
						]
					}

					return {
						races: races,
						classes: classes,
						statistics: statistics,
						skills: skills,
						combat: combat,
						charisma: charisma,
						conditions: conditions,
						items: items
					}
				} catch (error) {}
			}

		/* createCharacter */
			function createCharacter() {
				try {
					return {
						info: {
							name: "(name)",
							demographics: {
								race: "",
								age: 0,
								sex: "",
								height: 0,
								weight: 0
							},
							description: " ",
							status: {
								points: 28,
								burden: 0,
								conditions: [],
								damage: 0
							}
						},
						statistics: {
							perception: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: [
									{name: "sight", maximum: 0, condition: 0, unremovable: true},
									{name: "sound", maximum: 0, condition: 0, unremovable: true},
									{name: "scent", maximum: 0, condition: 0, unremovable: true},
									{name: "taste", maximum: 0, condition: 0, unremovable: true},
									{name: "touch", maximum: 0, condition: 0, unremovable: true}
								]
							},
							memory: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: []
							},
							logic: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: []
							},
							strength: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: [
									{name: "punch", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							},
							dexterity: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: [
									{name: "martial_arts", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							},
							immunity: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: [
									{name: "recover", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							},
							speed: {
								maximum: 7,
								damage: 0,
								condition: 0,
								skills: [
									{name: "kick", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							}
						},
						inventory: []
					}
				} catch (error) {}
			}

	/*** FILES ***/
		/* loadFile */
			function loadFile() {
				try {
					// existing data
						if (window.localStorage.adventure) {
							try {
								var attempt = JSON.parse(window.localStorage.adventure)
								if (attempt.statistics && attempt.info) {
									return attempt
								}
								else {
									return createCharacter()
								}
							}
							catch (error) {
								return createCharacter()
							}
						}

					// blank template
						else {
							return createCharacter()
						}
				} catch (error) {}
			}

		/* saveFile */
			function saveFile(character) {
				try {
					// overwrite character data
						window.localStorage.adventure = JSON.stringify(character)
				} catch (error) {}
			}

		/* downloadFile */
			document.getElementById("download").addEventListener(on.click, downloadFile)
			function downloadFile(event) {
				try {
					// package up
						var downloadLink = document.createElement("a")
							downloadLink.id = "download-link"
							downloadLink.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character)))
							downloadLink.setAttribute("download", character.info.name + ".json")
							downloadLink.addEventListener(on.click, function() {
								var downloadLink = document.getElementById("download-link")
								document.body.removeChild(downloadLink)
							})
					
					// click
						document.body.appendChild(downloadLink)
						document.getElementById("download-link").click()
				} catch (error) {}
			}

		/* uploadFile */
			document.getElementById("upload").addEventListener(on.click, uploadFile)
			function uploadFile(event) {
				try {
					document.getElementById("upload-input").addEventListener("change", function(event) {
						var upload = document.getElementById("upload-input")

						if (upload.value && upload.value.length) {
							// start reading
								var reader = new FileReader()
									reader.readAsText(event.target.files[0])

							// end reading
								reader.onload = function(event) {
									var obj = String(event.target.result)
									try {
										character = JSON.parse(obj)
										changeMode({target: document.getElementById("modes-play")})
									} catch (error) { }
								}
						}
					})
				} catch (error) {}
			}

		/* changeMode */
			document.querySelectorAll(".mode").forEach(function(button) { button.addEventListener(on.click, changeMode) })
			function changeMode(event) {
				try {
					var mode = event.target.id.replace("modes-", "")
					document.body.setAttribute("mode", mode)

					// close up inputs
						document.querySelectorAll(".editable").forEach(function(input) {
							input.setAttribute("readonly", true)
						})

						document.querySelectorAll(".statistic-damage").forEach(function(input) {
							input.setAttribute("readonly", true)
						})

					// disable selects
						document.querySelectorAll("select").forEach(function(select) {
							select.setAttribute("disabled", true)
						})

					// play
						if (mode == "play") {
							// close info & inventory
								document.getElementById("info").removeAttribute("open")
								document.getElementById("inventory").removeAttribute("open")

							// redisplay
								displayCharacter(character)
						}

					// edit
						if (mode == "edit") {
							// open info
								document.getElementById("info").setAttribute("open", true)

							// info
								document.querySelectorAll("#info .editable").forEach(function(input) {
									input.removeAttribute("readonly")
								})
								document.getElementById("info-race").removeAttribute("disabled")

							// statistics
								document.querySelectorAll(".statistic input.editable").forEach(function(input) {
									input.removeAttribute("readonly")
								})

							// skills
								document.querySelectorAll(".statistic select").forEach(function(select) {
									select.removeAttribute("disabled")
								})
						}

					// items
						else if (mode == "items") {
							// items
								document.querySelectorAll(".item .editable").forEach(function(input) {
									input.removeAttribute("readonly")
								})

								document.querySelectorAll(".item select.editable").forEach(function(select) {
									select.removeAttribute("disabled")
								})

							// items select
								document.getElementById("items-select").removeAttribute("disabled")

							// open inventory
								document.getElementById("inventory").setAttribute("open", true)
						}

					// conditions
						else if (mode == "conditions") {
							// conditions select
								document.getElementById("conditions-select").removeAttribute("disabled")
						}

					// damage
						else if (mode == "damage") {
							// open inventory
								document.getElementById("inventory").setAttribute("open", true)

							// statistics
								document.querySelectorAll(".statistic-damage").forEach(function(input) {
									input.removeAttribute("readonly")
								})
						}
				} catch (error) {}
			}

	/*** PLAY ***/
		/* displayCharacter */
			function displayCharacter(character) {
				try {
					// conditions
						for (var i in character.info.status.conditions) {
							if (!document.querySelector(".condition[value='" + character.info.status.conditions[i] + "']")) {
								addCondition({target: {value: character.info.status.conditions[i]}})
							}
						}

					// inventory
						var equipped   = document.getElementById("inventory-equipped")
						var unequipped = document.getElementById("inventory-unequipped")
							equipped.innerHTML   = ""
							unequipped.innerHTML = ""

						character.info.status.burden = 0
						for (var i in character.inventory) {
							character.info.status.burden += (character.inventory[i].weight * character.inventory[i].count)
							displayItem(character, equipped, unequipped, character.inventory[i])
						}
						character.info.status.burden = Math.round(character.info.status.burden)

					// statistics
						for (var i in character.statistics) {
							// statistic
								var container = document.getElementById(i)
								displayStatistic(character, container, i)

							// skills
								container.querySelector(".skills-list").innerHTML = ""
								for (var s in character.statistics[i].skills) {
									displaySkill(character, container, i, character.statistics[i].skills[s])
								}
						}

					// info
						displayInfo(character)
				} catch (error) {}
			}

		/* rolld20 */
			document.querySelectorAll(".statistic-current").forEach(function(d20) { d20.addEventListener(on.click, rolld20) })
			function rolld20(event) {
				try {
					if (document.body.getAttribute("mode") == "play") {
						// spacer
							var spacer = document.createElement("div")
								spacer.className = "spacer"
							document.getElementById("history").appendChild(spacer)

						// within an item ?
							if (event.target.closest(".item")) {
								// item
									var id = event.target.closest(".item").id
									var item = character.inventory.find(function (i) {
										return i.id == id
									})

								// usage ?
									if (event.target.closest(".item-usage")) {
										var usages = event.target.closest(".item-usages")
										var usage = event.target.closest(".item-usage")
										var index = Array.prototype.indexOf.call(usages.children, usage)
										var skill = item.usage[index].skill
										var statistic = item.usage[index].statistic
									}

								// otherwise
									else {
										var skill = ""
										var statistic = ""
									}
							}

						// from a skill
							else if (event.target.closest(".skill")) {
								var item = null
								var skill = event.target.closest(".skill").querySelector(".skill-name-text").value.replace(/\s/g, "_")
								var statistic = Object.keys(data.skills).find(function(s) {
									return data.skills[s].includes(skill)
								})
							}

						// from a statistic
							else if (event.target.closest(".statistic")) {
								var item = null
								var skill = ""
								var statistic = event.target.closest(".statistic").id
							}

						// from nowhere
							else {
								var item = null
								var skill = ""
								var statistic = ""
							}

						// immunity check ?
							var conditions = []
							document.querySelectorAll(".condition-name").forEach(function (element) {
								conditions.push(element.innerText.replace(/\s/g, "_"))
							})
							for (var c in conditions) {
								if (data.conditions[conditions[c]].immunity_check && data.conditions[conditions[c]].immunity_check.before) {
									if (data.conditions[conditions[c]].immunity_check.before.includes(skill) || data.conditions[conditions[c]].immunity_check.before.includes(statistic)) {
										// get target
											var target = character.statistics.immunity.maximum + character.statistics.immunity.damage + character.statistics.immunity.condition
											if (data.conditions[conditions[c]].immunity_check.skill) {
												var immunitySkill = character.statistics.immunity.skills.find(function(s) {
													return s.name == data.conditions[conditions[c]].immunity_check.skill
												}) || {name: "", maximum: 0, condition: 0}
												target += immunitySkill.maximum + immunitySkill.condition
											}
											target = Math.max(0, target)

										// roll
											var roll = Math.floor(Math.random() * 20) + 1

										// add to history
											var label = document.createElement("label")
											document.getElementById("history").appendChild(label)

											var text = document.createElement("span")
												text.innerText = immunitySkill.name ? immunitySkill.name.replace(/_/g, " ") : "immunity"
											label.appendChild(text)

											var d20 = document.createElement("div")
												d20.className = "d20"
												d20.innerText = roll
												d20.setAttribute("success", roll <= target ? true : false)
											label.prepend(d20)

										// failed ?
											if (roll > target) {
												// scroll
													document.getElementById("history").scrollLeft = 1000000
													return
											}
									}
								}
							}

						// roll
							var target = Number(event.target.value)
							var roll = Math.floor(Math.random() * 20) + 1

						// add to history
							var label = document.createElement("label")
							document.getElementById("history").appendChild(label)

							var text = document.createElement("span")
								text.innerText = skill ? skill.replace(/_/g, " ") : statistic ? statistic : item ? item.name : ""
							label.appendChild(text)

							var d20 = document.createElement("div")
								d20.className = "d20"
								d20.innerText = roll
								d20.setAttribute("success", roll <= target ? true : false)
							label.prepend(d20)

						// scroll
							document.getElementById("history").scrollLeft = 1000000
					}
				} catch (error) {}
			}

		/* rolld6 */
			function rolld6(event) {
				try {
					if (document.body.getAttribute("mode") == "play" || document.body.getAttribute("mode") == "damage") {
						// spacer
							var spacer = document.createElement("div")
								spacer.className = "spacer"
							document.getElementById("history").appendChild(spacer)

						// within an item ?
							if (event.target.closest(".item")) {
								// item
									var id = event.target.closest(".item").id
									var item = character.inventory.find(function (i) {
										return i.id == id
									})
									var type = item.type
									var count = Number(event.target.value)

								// usage
									if (event.target.closest(".item-usage")) {
										var usages = event.target.closest(".item-usages")
										var usage = event.target.closest(".item-usage")
										var index = Array.prototype.indexOf.call(usages.children, usage)
										var skill = item.usage[index].skill
										var statistic = item.usage[index].statistic

										if (data.combat.includes(skill)) {
											type = "weapon"
										}
									}

								// otherwise
									else {
										var skill = null
										var statistic = null
									}
							}

						// from a skill
							else if (event.target.closest(".skill")) {
								var item = null
								var type = ""
								var count = Number(event.target.value)
								var skill = event.target.closest(".skill").querySelector(".skill-name-text").value.replace(/\s/g, "_")
								var statistic = Object.keys(data.skills).find(function(s) {
									return data.skills[s].includes(skill)
								})
							}

						// from nowhere
							else {
								var item = null
								var type = ""
								var count = Number(event.target.value)
								var skill = ""
								var statistic = ""
							}

						// special skill
							if (!item && data.combat.includes(skill)) {
								type = "weapon"
							}
							else if (item && data.combat.includes(skill)) {
								type = "weapon"
								var specialSkill = character.statistics[statistic].skills.find(function(s) {
									return s.name == skill
								})
								if (specialSkill && specialSkill.d6) {
									count += specialSkill.d6
								}
							}
							else if (skill == "recover" || skill == "defend") {
								type = "healing"
							}

						// condition?
							if (item && event.target.closest(".item-condition")) {
								type = "potion"
							}

						// ammunition?
							else if (item && item.type == "ammunition") {
								item.count = Math.max(0, item.count - 1)
								event.target.closest(".item").querySelector(".item-count").value = item.count

								// save
									saveFile(character)
							}

						// roll
							var rolls = []
							var roll = 0
							for (var i = 0; i < count; i++) {
								var thisRoll = Math.floor(Math.random() * 6) + 1
								rolls.push(thisRoll)
								roll += thisRoll
							}

						// add to history
							var label = document.createElement("label")
							document.getElementById("history").appendChild(label)

							var text = document.createElement("span")
								text.innerText = item ? item.name : skill ? skill.replace(/_/g, " ") : statistic ? statistic : ""
							label.prepend(text)

							var total = document.createElement("div")
								total.className = "d6 total"
								total.innerText = roll
								total.setAttribute("type", type)
							label.prepend(total)

							var equals = document.createElement("div")
								equals.className = "equals"
								equals.innerHTML = "&rarr;"
							label.prepend(equals)

							for (var r in rolls) {
								var d6 = document.createElement("div")
									d6.className = "d6"
									d6.setAttribute("counting", "true")
									d6.addEventListener(on.click, toggled6)
									d6.innerText = rolls[r]
								label.prepend(d6)
							}

						// scroll
							document.getElementById("history").scrollLeft = 1000000

						// damage mode ?
							if (document.body.getAttribute("mode") == "damage") {
								if (item && item.type == "healing") {
									character.info.status.damage = character.info.status.damage + roll
								}
								else if (item && (item.type == "armor" || item.type == "shield")) {
									character.info.status.damage = Math.min(0, character.info.status.damage + roll)
								}

								document.getElementById("info-damage").value = character.info.status.damage

								// save
									saveFile(character)
							}
					}
				} catch (error) {}
			}

		/* toggled6 */
			function toggled6(event) {
				try {
					// change this d6
						var counting = String(event.target.getAttribute("counting")) == "true" ? "false" : "true"
						event.target.setAttribute("counting", counting)

					// recalculate
						var label = event.target.closest("label")
						var dice = Array.from(label.querySelectorAll(".d6[counting='true']"))
						var total = 0
						for (var d in dice) {
							total += Number(dice[d].innerText)
						}

					// redisplay
						label.querySelector(".total").innerText = total
				} catch (error) {}
			}

	/*** INFO ***/
		/* createRaceList */
			function createRaceList() {
				try {
					var container = document.getElementById("info-race")
					for (var i in data.races) {
						var option = document.createElement("option")
							option.value = i
							option.innerText = i
						container.appendChild(option)
					}
					document.getElementById("race-disabled").selected = true
				} catch (error) {}
			}

		/* changeInfo */
			document.querySelectorAll("#info .editable").forEach(function(element) { element.addEventListener("change", changeInfo) })
			function changeInfo(event) {
				try {
					// name
						if (event.target.id == "info-name-text") {
							character.info.name = event.target.value
						}

					// race & sex
						if (event.target.id == "info-race") {
							changeRace(character.info.demographics.race, event.target.value.toLowerCase().trim())
						}
						else if (event.target.id == "info-sex") {
							character.info.demographics.sex = event.target.value
						}

					// age, weight, height
						else if (event.target.id == "info-age") {
							character.info.demographics.age = Math.max(0, Number(event.target.value))
						}
						else if (event.target.id == "info-weight") {
							character.info.demographics.weight = Math.max(0, Number(event.target.value))
						}
						else if (event.target.id == "info-height") {
							character.info.demographics.height = Math.max(0, Number(event.target.value))
						}

					// points
						else if (event.target.id == "info-points") {
							character.info.status.points = Math.max(0, Number(event.target.value))
						}

					// description
						else if (event.target.id == "info-description") {
							character.info.description = event.target.value
						}

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* changeRace */
			function changeRace(before, after) {
				try {
					// unset perks
						if (before !== after && Object.keys(data.races).includes(before)) {
							// statistics
								for (var s in data.races[before].statistics) {
									character.statistics[s].maximum -= data.races[before].statistics[s]
								}

							// skills
								for (var s in data.races[before].skills) {
									for (var i in data.races[before].skills[s]) {
										var skill = character.statistics[s].skills.find(function(j) {
											return j.name == i
										})

										if (skill) {
											skill.maximum -= data.races[before].skills[s][i]

											if (!skill.maximum && !skill.unremovable) {
												character.statistics[s].skills = character.statistics[s].skills.filter(function(j) {
													return j.name !== i
												})

												// enable in select
													document.getElementById(s + "-select").querySelector("[value=" + skill.name.replace(/\s/g, "_") + "]").removeAttribute("disabled")
											}
										}
									}
								}

							// d6
								for (var d in data.races[before].d6changes) {
									var change = data.races[before].d6changes[d]
									var skill = character.statistics[change.statistic].skills.find(function(s) {
										return s.name == change.skill
									})
									if (skill) {
										skill.d6 = Math.max((skill.d6 || 0) - change.d6, 0)
									}
								}
						}

					// set new perks
						if (before !== after && Object.keys(data.races).includes(after)) {
							// statistics
								for (var s in data.races[after].statistics) {
									character.statistics[s].maximum += data.races[after].statistics[s]
								}

							// skills
								for (var s in data.races[after].skills) {
									for (var i in data.races[after].skills[s]) {
										var skill = character.statistics[s].skills.find(function(j) {
											return j.name == i
										})

										if (skill) {
											skill.maximum += data.races[after].skills[s][i]
										}
										else {
											var skill = {name: i, maximum: data.races[after].skills[s][i], condition: 0}
											character.statistics[s].skills.push(skill)
										}

										// disable in select
											document.getElementById(s + "-select").querySelector("[value=" + skill.name + "]").setAttribute("disabled", true)
											document.getElementById(s + "-disabled").selected = true
									}
								}

							// d6
								for (var d in data.races[after].d6changes) {
									var change = data.races[after].d6changes[d]
									var skill = character.statistics[change.statistic].skills.find(function(s) {
										return s.name == change.skill
									})
									if (skill) {
										skill.d6 = Math.max((skill.d6 || 0) + change.d6, 0)
									}
								}
						}

					// set new info
						character.info.demographics.race   = after
						if (data.races[after]) {
							character.info.demographics.age    = data.races[after].info.age
							character.info.demographics.height = data.races[after].info.height
							character.info.demographics.weight = data.races[after].info.weight
						}

					// display
						displayInfo(character)
						for (var i in character.statistics) {
							// statistic
								var container = document.getElementById(i)
								displayStatistic(character, container, i, true)

							// skills
								container.querySelector(".skills-list").innerHTML = ""
								for (var s in character.statistics[i].skills) {
									displaySkill(character, container, i, character.statistics[i].skills[s], true)
								}
						}
				} catch (error) { console.log(error)}
			}

		/* displayInfo */
			function displayInfo(character) {
				try {
					// name
						document.getElementById("info-name").innerText = character.info.name
						document.getElementById("info-name-text").value = character.info.name

					// damage
						document.getElementById("info-damage").value = character.info.status.damage

					// demographics
						for (var i in character.info.demographics) {
							document.getElementById("info-" + i).value = character.info.demographics[i]
						}

					// carrying
						document.getElementById("info-burden").value = character.info.status.burden

					// points
						document.getElementById("info-points").value = character.info.status.points

					// description
						document.getElementById("info-description").value = character.info.description
						if (character.info.demographics.race && data.races[character.info.demographics.race]) {
							document.getElementById("info-racial-ability").value = data.races[character.info.demographics.race].info.ability
						}

					// abilities
						var run   = character.statistics.speed.skills.find(   function(skill) { return skill.name == "run"  }) || {maximum: 0, condition: 0}
						var swim  = character.statistics.speed.skills.find(   function(skill) { return skill.name == "swim" }) || {maximum: 0, condition: 0}
						var jump  = character.statistics.speed.skills.find(   function(skill) { return skill.name == "jump" }) || {maximum: 0, condition: 0}
						var carry = character.statistics.strength.skills.find(function(skill) { return skill.name == "carry"}) || {maximum: 0, condition: 0}
						var thro  = character.statistics.strength.skills.find(function(skill) { return skill.name == "throw"}) || {maximum: 0, condition: 0}

						document.getElementById("info-run").value   = Math.max(0, ((character.statistics.speed.maximum    + character.statistics.speed.damage    + character.statistics.speed.condition)    + (run.maximum   + run.condition  ))     )
						document.getElementById("info-move").value  = Math.max(0, ((character.statistics.speed.maximum    + character.statistics.speed.damage    + character.statistics.speed.condition)    + (run.maximum   + run.condition  ))     )
						document.getElementById("info-swim").value  = Math.max(0, ((character.statistics.speed.maximum    + character.statistics.speed.damage    + character.statistics.speed.condition)    + (swim.maximum  + swim.condition )) / 4 )
						document.getElementById("info-jump").value  = Math.max(0, ((character.statistics.speed.maximum    + character.statistics.speed.damage    + character.statistics.speed.condition)    + (jump.maximum  + jump.condition )) * 10)
						document.getElementById("info-carry").value = Math.max(0, ((character.statistics.strength.maximum + character.statistics.strength.damage + character.statistics.strength.condition) + (carry.maximum + carry.condition)) * 10)
						document.getElementById("info-throw").value = Math.max(0, ((character.statistics.strength.maximum + character.statistics.strength.damage + character.statistics.strength.condition) + (thro.maximum  + thro.condition )) * 10)

						if (character.info.status.burden > document.getElementById("info-carry").value) {
							document.getElementById("info-burden").setAttribute("overburdened", true)
						}
						else {
							document.getElementById("info-burden").removeAttribute("overburdened")
						}
				} catch (error) {}
			}

	/*** STATISTICS ***/
		/* changeStatistic */
			document.querySelectorAll(".statistic-maximum").forEach(function(statistic) {
				statistic.addEventListener("change", changeStatistic)
			})
			function changeStatistic(event) {
				try {
					// get statistic
						var statistic = event.target.closest(".statistic").id
					
					// update value
						var old = character.statistics[statistic].maximum
						character.statistics[statistic].maximum = Math.min(20, Math.max(0, Math.round(Number(event.target.value))))
						event.target.closest(".statistic").querySelector(".statistic-current").value = Math.max(0, character.statistics[statistic].maximum + character.statistics[statistic].damage + character.statistics[statistic].condition)
					
					// update points
						var cost = (old - character.statistics[statistic].maximum) * 28
						character.info.status.points += cost
						document.getElementById("info-points").value = character.info.status.points

					// redraw
						event.target.closest(".statistic").querySelector(".skills-list").innerHTML = ""
						for (var i in character.statistics[statistic].skills) {
							displaySkill(character, event.target.closest(".statistic"), statistic, character.statistics[statistic].skills[i], true)
						}

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* displayStatistic */
			function displayStatistic(character, container, statistic) {
				try {
					container.querySelector(".statistic-maximum"  ).value = character.statistics[statistic].maximum
					container.querySelector(".statistic-damage"   ).value = Math.max(-99, Math.min(99, character.statistics[statistic].damage))    || ""
					container.querySelector(".statistic-condition").value = Math.max(-99, Math.min(99, character.statistics[statistic].condition)) || ""
					container.querySelector(".statistic-current"  ).value = Math.max(0, character.statistics[statistic].maximum + character.statistics[statistic].damage + character.statistics[statistic].condition)
				} catch (error) {}
			}

	/*** SKILLS ***/
		/* createSkillLists */
			function createSkillLists() {
				try {
					for (var i in data.skills) {
						var container = document.getElementById(i + "-select")

						for (var j in data.skills[i]) {
							var option = document.createElement("option")
								option.value = data.skills[i][j]
								option.innerText = data.skills[i][j].replace(/_/g, " ")
							if (character.statistics[i].skills.find(function(s) { return s.name == data.skills[i][j] })) {
								option.setAttribute("disabled", true)
							}
							container.appendChild(option)
						}
					}
				} catch (error) {}
			}

		/* addSkill */
			document.querySelectorAll(".statistic select").forEach(function(select) { select.addEventListener("change", addSkill) })
			function addSkill(event) {
				try {
					// add to skills
						var name = event.target.value.replace(/\s/g, "_")
						var statistic = Object.keys(data.skills).find(function(i) {
							return data.skills[i].includes(name)
						})
						character.statistics[statistic].skills.push({name: name, maximum: 0, condition: 0})

					// conditions ?
						for (var i in character.info.status.conditions) {
							var condition = data.conditions[character.info.status.conditions[i]]
							for (var e in condition.effects) {
								for (var s in condition.effects[e]) {
									if (s == name) {
										character.statistics[statistic].skills[character.statistics[statistic].skills.length - 1].condition += condition.effects[e][s]
									}
								}
							}
						}

					// disable in select
						document.getElementById(statistic + "-select").querySelector("[value=" + name + "]").setAttribute("disabled", true)
						document.getElementById(statistic + "-disabled").selected = true

					// display skill
						displaySkill(character, document.getElementById(statistic), statistic, character.statistics[statistic].skills[character.statistics[statistic].skills.length - 1], true)

					// save
						saveFile(character)
				}
				catch (error) {}
			}

		/* removeSkill */
			function removeSkill(event) {
				try {
					// skill name
						var skill = event.target.closest(".skill").querySelector(".skill-name-text").value
						var statistic = Object.keys(data.skills).find(function(i) {
							return data.skills[i].includes(skill.replace(/\s/g, "_"))
						})

					// remove skill
						for (var i = 0; i < character.statistics[statistic].skills.length; i++) {
							if (character.statistics[statistic].skills[i].name == skill.replace(/\s/g, "_")) {
								var cost = character.statistics[statistic].skills[i].maximum
								character.statistics[statistic].skills.splice(i, 1)
								break
							}
						}

					// enable in select
						document.getElementById(statistic + "-select").querySelector("[value=" + skill.replace(/\s/g, "_") + "]").removeAttribute("disabled")

					// remove element
						event.target.closest(".skill").remove()

					// update points
						character.info.status.points += cost || 0
						document.getElementById("info-points").value = character.info.status.points

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* changeSkill */
			function changeSkill(event) {
				try {
					// get statistic
						var name = event.target.closest(".skill").querySelector(".skill-name-text").value.replace(/\s/g, "_")
						var statistic = Object.keys(data.skills).find(function(stat) {
							return data.skills[stat].includes(name)
						})
					
					// update value
						var skill = character.statistics[statistic].skills.find(function(s) {
							return s.name == name
						})
						var old = skill.maximum
						skill.maximum = Math.min(20, Math.max(0, Math.round(Number(event.target.value))))

					// update points
						var cost = (old - skill.maximum)
						character.info.status.points += cost
						document.getElementById("info-points").value = character.info.status.points

					// redisplay
						event.target.closest(".skill").querySelector(".skill-current").value = character.statistics[statistic].maximum + character.statistics[statistic].damage + character.statistics[statistic].condition + skill.maximum + skill.condition

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* displaySkill */
			function displaySkill(character, container, statistic, skill, enable) {
				try {
					// block
						var block = document.createElement("div")
							block.className = "skill"
						container.querySelector(".skills-list").appendChild(block)

						if (skill.unremovable) {
							block.className += " unremovable"
						}
						else {
							var remove = document.createElement("div")
								remove.className = "skill-remove"
								remove.innerText = "x"
								remove.addEventListener(on.click, removeSkill)
							block.prepend(remove)
						}

					// left column
						var left = document.createElement("div")
							left.className = "column-left"
						block.appendChild(left)

						var name = document.createElement("div")
							name.className = "skill-name"
						left.appendChild(name)

						if (skill.d6 !== undefined) {
							var d6 = document.createElement("input")
								d6.type = "number"
								d6.step = "1"
								d6.setAttribute("readonly", true)
								d6.className = "d6"
								d6.placeholder = "d6"
								d6.value = skill.d6
								d6.addEventListener(on.click, rolld6)
							name.appendChild(d6)
						}

						var text = document.createElement("input")
							text.className = "skill-name-text"
							text.type = "text"
							text.setAttribute("disabled", true)
							text.value = skill.name.replace(/_/g, " ")
						name.appendChild(text)

					// right column
						var right = document.createElement("div")
							right.className = "column-right"
						block.appendChild(right)

						var maximum = document.createElement("input")
							maximum.type = "number"
							if (!enable) {
								maximum.setAttribute("readonly", true)
							}
							maximum.className = "skill-maximum editable"
							maximum.value = skill.maximum
							maximum.placeholder = "↑"
							maximum.addEventListener("change", changeSkill)
						right.appendChild(maximum)

						var condition = document.createElement("input")
							condition.type = "number"
							condition.setAttribute("readonly", true)
							condition.className = "skill-condition"
							condition.value = Math.max(-99, Math.min(99, skill.condition)) || ""
						right.appendChild(condition)

						var damage = document.createElement("input")
							damage.type = "number"
							damage.setAttribute("readonly", true)
							damage.className = "skill-damage"
							damage.value = ""
						right.appendChild(damage)

						var current = document.createElement("input")
							current.type = "number"
							current.setAttribute("readonly", true)
							current.className = "skill-current d20"
							current.value = Math.max(0, character.statistics[statistic].maximum + character.statistics[statistic].damage + character.statistics[statistic].condition + skill.maximum + skill.condition)
							current.addEventListener(on.click, rolld20)
						right.appendChild(current)
				} catch (error) {}
			}

	/*** ITEMS ***/
		/* createItemsList */
			function createItemsList() {
				try {
					var container = document.getElementById("items-select")

					// add groups
						for (var i in data.items) {
							var optgroup = document.createElement("optgroup")
								optgroup.label = i
							container.appendChild(optgroup)

							// add items
								for (var j in data.items[i]) {
									var option = document.createElement("option")
										option.value = data.items[i][j].name
										option.innerText = data.items[i][j].name
									optgroup.appendChild(option)
								}
						}
				} catch (error) {}
			}

		/* addItem */
			document.getElementById("items-select").addEventListener("change", addItem)
			function addItem(event) {
				try {
					// add to inventory
						var name = event.target.value
						var category = event.target.querySelector("[value='" + event.target.value + "']").parentNode.label

						character.inventory.push(duplicateObject(data.items[category].find(function(i) {
							return i.name == name
						})))
						character.inventory[character.inventory.length - 1].id = generateRandom()

					// display item
						document.getElementById("items-disabled").selected = true
						displayItem(character, null, document.getElementById("inventory-unequipped"), character.inventory[character.inventory.length - 1], true)

					// reopen inventory
						document.getElementById("inventory").setAttribute("open", true)

					// save
						saveFile(character)
				}
				catch (error) {}
			}

		/* removeItem */
			function removeItem(event) {
				try {
					// item name
						var id = event.target.closest(".item").id

					// remove item
						for (var i = 0; i < character.inventory.length; i++) {
							if (character.inventory[i].id == id) {
								character.inventory.splice(i, 1)
								break
							}
						}

					// remove element
						event.target.closest(".item").remove()

					// reopen inventory
						document.getElementById("inventory").setAttribute("open", true)
						event.preventDefault()

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* changeItem */
			function changeItem(event) {
				try {
					// get item
						var id = event.target.closest(".item").id
						var item = character.inventory.find(function(item) {
							return item.id == id
						})

					// count
						if (event.target.className.includes("item-count")) {
							item.count = Number(event.target.value)
						}

					// name
						if (event.target.className.includes("item-name-text")) {
							item.name = event.target.value
						}

					// skill
						else if (event.target.className.includes("item-usage-skill")) {
							var statistic = Object.keys(data.skills).find(function(stat) {
								return data.skills[stat].includes(event.target.value)
							})

							if (statistic) {
								var usages = event.target.closest(".item-usages")
								var usage = event.target.closest(".item-usage")
								var index = Array.prototype.indexOf.call(usages.children, usage)
								item.usage[index].statistic = statistic
								item.usage[index].skill = event.target.value
							}
						}

					// d6
						else if (event.target.className.includes("d6")) {
							if (event.target.closest(".item-usage")) {
								var usages = event.target.closest(".item-usages")
								var usage = event.target.closest(".item-usage")
								var index = Array.prototype.indexOf.call(usages.children, usage)
								item.usage[index].d6 = Number(event.target.value)
							}
							else if (event.target.closest(".item-condition")) {
								item.conditions[event.target.closest(".item-condition").querySelector(".item-condition-name").value] = Number(event.target.value)
							}
							else {
								item.d6 = Number(event.target.value)
							}
						}

					// condition
						else if (event.target.className.includes("item-condition-name")) {
							var itemConditions = event.target.closest(".item").querySelectorAll(".condition")

							for (var x = 0; x < itemConditions.length; x++) {
								if (itemConditions[x].querySelector(".item-condition-name") == event.target) {
									break
								}
							}

							item.conditions[event.target.value] = item.conditions[Object.keys(item.conditions)[x]]
							delete item.conditions[Object.keys(item.conditions)[x]]
						}

					// info
						else if (event.target.className.includes("item-info-input")) {
							var field = event.target.getAttribute("field")
							if (event.target.type == "number") {
								item[field] = Number(event.target.value)
							}
							else if (event.target.value.toLowerCase() == "true") {
								item[field] = true
							}
							else if (event.target.value.toLowerCase() == "false") {
								item[field] = false
							}
							else {
								item[field] = event.target.value
							}
						}

					// description
						else if (event.target.className.includes("item-description")) {
							item.magnetic = false
							var description = []
							
							var list = event.target.value.split(" | ")
							for (var l in list) {
								if (list[l].toLowerCase().includes("for use with")) {
									var weapons = list[l].toLowerCase().replace("for use with", "").split(",")
										for (var w in weapons) {
											weapons[w] = weapons[w].trim()
										}
									item.weapons = weapons
								}
								else if (list[l].toLowerCase().includes("recipe:")) {
									var recipe = list[l].toLowerCase().replace("recipe:", "").trim().split(", ")
									item.recipe = {}
									for (var r in recipe) {
										recipe[r] = recipe[r].trim()
										if (["w", "r", "g", "b"].includes(recipe[r][0])) {
											item.recipe[recipe[r][0]] = Number(recipe[r].slice(1))
										}
									}
								}
								else if (list[l].toLowerCase().includes("cost per pound:")) {
									item.costPerPound = Number(list[l].toLowerCase().replace("cost per pound:", "").replace("❑", "").trim())
								}
								else {
									description.push(list[l])
								}
							}
							item.description = description.join(" | ")
						}

					// reopen inventory
						document.getElementById("inventory").setAttribute("open", true)

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* equipItem */
			function equipItem(event) {
				try {
					// get item
						var id = event.target.closest(".item").id
						var item = character.inventory.find(function(item) {
							return item.id == id
						})

					// flip equipped
						item.equipped = !item.equipped

					// change style
						if (item.equipped) {
							event.target.setAttribute("equipped", true)
						}
						else {
							event.target.removeAttribute("equipped")
						}

					// move
						var element = event.target.closest(".item")
						if (item.equipped) {
							document.getElementById("inventory-equipped").append(element)
						}
						else {
							document.getElementById("inventory-unequipped").append(element)
						}

					// reopen inventory
						document.getElementById("inventory").setAttribute("open", true)
						event.preventDefault()

					// save
						saveFile(character)
				}
				catch (error) {}
			}

		/* displayItem */
			function displayItem(character, equipped, unequipped, item, enable) {
				try {
					// block
						var block = document.createElement("div")
							block.className = "item " + (item.type || "miscellaneous")
							block.id = item.id

							if (item.equipped) {
								equipped.appendChild(block)
							}
							else {
								unequipped.appendChild(block)
							}

					// remove
						var remove = document.createElement("div")
							remove.className = "item-remove"
							remove.innerText = "x"
							remove.addEventListener(on.click, removeItem)
						block.prepend(remove)

					// equip
						var equip = document.createElement("div")
							equip.className = "item-equip"
							equip.innerHTML = "&#x2713;"
							if (item.equipped) {
								equip.setAttribute("equipped", true)
							}
							equip.addEventListener(on.click, equipItem)
						block.prepend(equip)

					// name
						var name = document.createElement("div")
							name.className = "item-name"
						block.appendChild(name)

						var count = document.createElement("input")
							count.type = "number"
							count.step = "1"
							count.className = "item-count editable"
							if (!enable) {
								count.setAttribute("readonly", true)
							}
							count.placeholder = "#"
							count.value = item.count
							count.addEventListener("change", changeItem)
						name.appendChild(count)

						var text = document.createElement("input")
							text.type = "text"
							if (!enable) {
								text.setAttribute("readonly", true)
							}
							text.className = "item-name-text editable"
							text.placeholder = "item"
							text.value = item.name
							text.addEventListener("change", changeItem)
						name.appendChild(text)

					// d6
						if (item.d6 !== undefined) {
							var d6 = document.createElement("input")
								d6.type = "number"
								if (!enable) {
									d6.setAttribute("readonly", true)
								}
								d6.step = 1
								d6.className = "d6 editable"
								d6.placeholder = "d6"
								d6.addEventListener("change", changeItem)
								d6.addEventListener(on.click, rolld6)
								d6.value = item.d6
							name.appendChild(d6)
						}

					// usage
						var usages = document.createElement("div")
							usages.className = "item-usages"
						block.appendChild(usages)

						for (var u in item.usage) {
							var usage = item.usage[u]
							
							if (usage.skill) {
								var skill = character.statistics[usage.statistic].skills.find(function(skill) { return skill.name == usage.skill }) || {maximum: 0, condition: 0}
							}

							var usageElement = document.createElement("div")
								usageElement.className = "item-usage"
							usages.appendChild(usageElement)

							var d20 = document.createElement("input")
								d20.type = "number"
								d20.setAttribute("readonly", true)
								d20.step = 1
								d20.className = "d20"
								d20.value = Math.max(0, character.statistics[usage.statistic].maximum + character.statistics[usage.statistic].damage + character.statistics[usage.statistic].condition + (usage.skill ? skill.maximum + skill.condition : 0) + (usage.modifier ? usage.modifier : 0))
								d20.addEventListener(on.click, rolld20)
							usageElement.appendChild(d20)

							var select = document.createElement("select")
								for (var s in data.skills) {
									var optgroup = document.createElement("optgroup")
										optgroup.label = s
									select.appendChild(optgroup)

									for (var k in data.skills[s]) {
										var option = document.createElement("option")
											option.value = data.skills[s][k]
											option.innerText = data.skills[s][k].replace(/_/g, " ")
										optgroup.appendChild(option)
									}
								}
								if (!enable) {
									select.setAttribute("disabled", true)
								}
								select.className = "item-usage-skill editable"
								select.placeholder = "skill"
								select.value = usage.skill
								select.addEventListener("change", changeItem)
							usageElement.appendChild(select)

							if (usage.d6) {
								var d6 = document.createElement("input")
									d6.type = "number"
									if (!enable) {
										d6.setAttribute("readonly", true)
									}
									d6.step = 1
									d6.className = "d6 editable"
									if (data.combat.includes(usage.skill)) {
										d6.className += " combat"
									}
									d6.placeholder = "d6"
									d6.addEventListener("change", changeItem)
									d6.addEventListener(on.click, rolld6)
									d6.value = usage.d6
								usageElement.appendChild(d6)
							}
						}

					// conditions
						if (item.conditions) {
							var conditions = document.createElement("div")
								conditions.className = "item-conditions"
							block.appendChild(conditions)

							for (var i in item.conditions) {
								var condition = document.createElement("div")
									condition.className = "item-condition"
								conditions.append(condition)

								var select = document.createElement("select")
									for (var c in data.conditions) {
										var option = document.createElement("option")
											option.innerText = c.replace(/_/g, " ")
											option.value = c
										select.appendChild(option)
									}

									if (!enable) {
										select.setAttribute("disabled", true)
									}
									select.className = "item-condition-name editable"
									select.value = i
									select.addEventListener("change", changeItem)
								condition.appendChild(select)

								if (item.conditions[i]) {
									var d6 = document.createElement("input")
										d6.type = "number"
										if (!enable) {
											d6.setAttribute("readonly", true)
										}
										d6.step = 1
										d6.className = "d6 editable"
										d6.addEventListener("change", changeItem)
										d6.addEventListener(on.click, rolld6)
										d6.value = item.conditions[i] || null
										d6.placeholder = "d6"
									condition.appendChild(d6)
								}
								else {
									select.className += " item-condition-remove"
								}
							}
						}

					// other info
						// weight
							var label = document.createElement("label")
								label.className = "item-info-label"
							block.appendChild(label)

							var input = document.createElement("input")
								input.type = "number"
								input.className = "item-info-input editable"
								input.placeholder = "weight"
								input.value = item.weight || 0
								input.setAttribute("field", "weight")
								input.addEventListener("change", changeItem)
								if (!enable) {
									input.setAttribute("readonly", true)
								}
							label.appendChild(input)

							var span = document.createElement("span")
								span.className = "item-info-label-text"
								span.innerText = "lbs"
							label.appendChild(span)

						// cost
							var label = document.createElement("label")
								label.className = "item-info-label"
							block.appendChild(label)

							var input = document.createElement("input")
								input.type = "number"
								input.className = "item-info-input editable"
								input.placeholder = "cost"
								input.value = item.cost || 0
								input.setAttribute("field", "cost")
								input.addEventListener("change", changeItem)
								if (!enable) {
									input.setAttribute("readonly", true)
								}
							label.appendChild(input)

							var span = document.createElement("span")
								span.className = "item-info-label-text"
								span.innerText = "❑"
							label.appendChild(span)

						// fuel
							var label = document.createElement("label")
								label.className = "item-info-label"
							block.appendChild(label)

							var input = document.createElement("input")
								input.type = "number"
								input.className = "item-info-input editable"
								input.placeholder = "fuel"
								input.value = item.fuel || 0
								input.setAttribute("field", "fuel")
								input.addEventListener("change", changeItem)
								if (!enable) {
									input.setAttribute("readonly", true)
								}
							label.appendChild(input)

							var span = document.createElement("span")
								span.className = "item-info-label-text"
								span.innerText = "d6 fuel"
							label.appendChild(span)

						// magnetic
							var label = document.createElement("label")
								label.className = "item-info-label"
							block.appendChild(label)

							var input = document.createElement("select")
								input.className = "item-info-input editable"
								input.setAttribute("field", "magnetic")
								input.addEventListener("change", changeItem)
								if (!enable) {
									input.setAttribute("disabled", true)
								}
							label.appendChild(input)

							var option = document.createElement("option")
								option.value = false
								option.innerText = "nonmagnetic"
								if (!item.magnetic) { option.selected = true }
							input.appendChild(option)

							var option = document.createElement("option")
								option.value = true
								option.innerText = "magnetic"
								if (item.magnetic) { option.selected = true }
							input.appendChild(option)

						// hands
							var label = document.createElement("label")
								label.className = "item-info-label"
							block.appendChild(label)

							var input = document.createElement("input")
								input.type = "number"
								input.className = "item-info-input editable"
								input.placeholder = "hands"
								input.value = item.hands || 0
								input.setAttribute("field", "hands")
								input.addEventListener("change", changeItem)
								if (!enable) {
									input.setAttribute("readonly", true)
								}
							label.appendChild(input)

							var span = document.createElement("span")
								span.className = "item-info-label-text"
								span.innerText = "handed"
							label.appendChild(span)

						// materials
							var label = document.createElement("label")
								label.className = "item-info-label"
							block.appendChild(label)

							var input = document.createElement("input")
								input.type = "text"
								input.className = "item-info-input editable"
								input.placeholder = "materials"
								input.value = item.materials || 0
								input.setAttribute("field", "materials")
								input.addEventListener("change", changeItem)
								if (!enable) {
									input.setAttribute("readonly", true)
								}
							label.appendChild(input)

					// description
						var description = document.createElement("textarea")
							if (!enable) {
								description.setAttribute("readonly", true)
							}
							description.className = "item-description editable"
							description.addEventListener("change", changeItem)
							description.placeholder = "description"
							description.value = ""
						block.appendChild(description)
						
						if (item.weapons)      { description.value += " | for use with " + item.weapons.join(", ")}
						if (item.recipe)       { description.value += " | recipe: " + JSON.stringify(item.recipe).replace(/{|}|"|:/g,"").replace(/,/g,", ")}
						if (item.costPerPound) { description.value += " | cost per pound: " + item.costPerPound + "❑"}
						if (item.description)  { description.value += " | " + item.description                    }

						description.value = description.value.slice(3)
				} catch (error) {}
			}

	/*** CONDITIONS ***/
		/* createConditionsList */
			function createConditionsList() {
				try {
					var container = document.getElementById("conditions-select")

					// add conditions
						for (var i in data.conditions) {
							var condition = document.createElement("option")
								condition.value = i
								condition.innerText = i.replace(/_/g, " ")
							container.appendChild(condition)
						}
				} catch (error) {}
			}

		/* addCondition	*/
			document.getElementById("conditions-select").addEventListener("change", addCondition)
			function addCondition(event) {
				try {
					if (Object.keys(data.conditions).includes(event.target.value)) {
						// container
							var condition = document.createElement("div")
								condition.className = "condition"
								condition.setAttribute("value", event.target.value)
							document.getElementById("conditions").prepend(condition)

						// name
							var name = document.createElement("div")
								name.className = "condition-name"
								name.innerText = event.target.value.replace(/_/g, " ")
							condition.appendChild(name)

						// description
							var description = document.createElement("div")
								description.className = "condition-description"
								description.innerText = data.conditions[event.target.value].description || ""
							condition.appendChild(description)

						// remove
							var remove = document.createElement("div")
								remove.className = "condition-remove"
								remove.innerText = "x"
								remove.addEventListener(on.click, removeCondition)
							condition.prepend(remove)

						// apply condition
							if (!character.info.status.conditions.includes(event.target.value)) {
								character.info.status.conditions.push(event.target.value)
								var effects = data.conditions[event.target.value].effects
								for (var i in effects) {
									for (var j in effects[i]) {
										if (j == "statistic") {
											character.statistics[i].condition += effects[i][j]
										}
										else {
											var skill = character.statistics[i].skills.find(function (skill) { return skill.name == j })
											if (skill) {
												skill.condition += effects[i][j]
											}
											else {
												character.statistics[i].skills.push({name: j, maximum: 0, condition: effects[i][j]})
											}
										}
									}
								}
							}

						// disable in select
							document.getElementById("conditions-select").querySelector("[value=" + event.target.value + "]").setAttribute("disabled", true)
							document.getElementById("conditions-disabled").selected = true

						// redisplay
							displayCharacter(character)

						// save
							saveFile(character)
					}
				} catch (error) {}
			}

		/* removeCondition */
			function removeCondition(event) {
				try {
					if (Object.keys(data.conditions).includes(event.target.parentNode.getAttribute("value"))) {
						// enable in select
							document.getElementById("conditions-select").querySelector("[value=" + event.target.parentNode.getAttribute("value") + "]").removeAttribute("disabled")

						// unapply condition
							character.info.status.conditions = character.info.status.conditions.filter(function(c) {
								return c !== event.target.parentNode.getAttribute("value")
							})
							var effects = data.conditions[event.target.parentNode.getAttribute("value")].effects
							for (var i in effects) {
								for (var j in effects[i]) {
									if (j == "statistic") {
										character.statistics[i].condition -= effects[i][j]
									}
									else {
										var skill = character.statistics[i].skills.find(function (skill) { return skill.name == j })
										if (skill) {
											skill.condition -= effects[i][j]

											if (skill.maximum == 0) {
												character.statistics[i].skills = character.statistics[i].skills.filter(function(s) {
													return s.name !== j
												})
											}
										}
									}
								}
							}

						// remove parent
							event.target.parentNode.remove()

						// redisplay
							displayCharacter(character)

						// save
							saveFile(character)
					}
				} catch (error) {}
			}

	/*** DAMAGE ***/
		/* changeDamage */
			document.getElementById("info-damage").addEventListener("change", changeDamage)
			function changeDamage(event) {
				try {
					// change damage
						character.info.status.damage = Number(event.target.value)

					// save
						saveFile(character)
				} catch (error) {}
			}

		/* recoverDamage */
			document.getElementById("info-recover").addEventListener(on.click, recoverDamage)
			function recoverDamage(event) {
				try {
					// spacer
						var spacer = document.createElement("div")
							spacer.className = "spacer"
						document.getElementById("history").appendChild(spacer)

					// recover only
						if (event.target.id == "info-recover") {
							// roll d20
								var skill = character.statistics.immunity.skills.find(function (s) { return s.name == "recover" })
								var target = Math.max(0, character.statistics.immunity.maximum + character.statistics.immunity.damage + character.statistics.immunity.condition + skill.maximum + skill.condition)
								var roll = Math.floor(Math.random() * 20) + 1

							// add to history
								var label = document.createElement("label")
								document.getElementById("history").appendChild(label)

								var text = document.createElement("span")
									text.innerText = "recover"
								label.appendChild(text)

								var d20 = document.createElement("div")
									d20.className = "d20"
									d20.innerText = roll
									d20.setAttribute("success", roll <= target ? true : false)
								label.prepend(d20)
						}

					// both
						// roll d6
							var count = roll <= target ? skill.d6 : 1
							var rolls = []
							var roll = 0
							for (var i = 0; i < count; i++) {
								var thisRoll = Math.floor(Math.random() * 6) + 1
								rolls.push(thisRoll)
								roll += thisRoll
							}

						// add to history
							var label = document.createElement("label")
							document.getElementById("history").appendChild(label)

							var text = document.createElement("span")
								text.innerText = skill.name
							label.prepend(text)

							var total = document.createElement("div")
								total.className = "d6 total"
								total.innerText = roll
								total.setAttribute("type", "healing")
							label.prepend(total)

							var equals = document.createElement("div")
								equals.className = "equals"
								equals.innerHTML = "&rarr;"
							label.prepend(equals)

							for (var r in rolls) {
								var d6 = document.createElement("div")
									d6.className = "d6"
									d6.setAttribute("counting", "true")
									d6.addEventListener(on.click, toggled6)
									d6.innerText = rolls[r]
								label.prepend(d6)
							}

						// scroll
							document.getElementById("history").scrollLeft = 1000000

						// damage mode ?
							character.info.status.damage = character.info.status.damage + roll
							document.getElementById("info-damage").value = character.info.status.damage

						// save
							saveFile(character)
				} catch (error) {}
			}

		/* damageStatistic */
			document.querySelectorAll(".statistic-damage").forEach(function(element) { element.addEventListener("change", damageStatistic) })
			function damageStatistic(event) {
				try {
					// change statistic
						var statistic = event.target.closest(".statistic").id
						var difference = character.statistics[statistic].damage - event.target.value
						character.statistics[statistic].damage = Number(event.target.value)

					// change damage
						character.info.status.damage += difference
						var outstandingDamage = 0
						for (var s in character.statistics) {
							outstandingDamage += character.statistics[s].damage
						}
						if (!outstandingDamage) {
							character.info.status.damage = 0
						}
						document.getElementById("info-damage").value = character.info.status.damage

					// redisplay
						displayCharacter(character)

					// save
						saveFile(character)
				} catch (error) {}
			}
}