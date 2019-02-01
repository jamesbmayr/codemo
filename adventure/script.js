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
								ability: "Humans have a maximum skill level of +6, giving them a slight edge when learning anything.",
							},
							perception: {
								sight: 5,
								sound: 5,
								scent: 1,
								taste: 1,
								touch: 3
							},
							statistics: {
								logic: 1,
								dexterity: 1,
								speed: 1,
								perception: -1
							},
							skills: {
								memory: { lang_human: 5 },
								dexterity: { crafting: 2 },
								speed: { run: 2 },
								strength: { throw: 2 }
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
							perception: {
								sight: 7,
								sound: 7,
								scent: 7,
								taste: 7,
								touch: 7
							},
							statistics: {
								perception: 1,
								memory: 1,
								dexterity: 1,
								immunity: -1
							},
							skills: {
								memory: { lang_elf: 5 },
								immunity: { recover: 2, sleep_resistance: 2 },
								perception: { night_vision: 2 }
							}
						},
						dwarf: {
							info: {
								age: 50,
								height: 4,
								weight: 200,
								description: "Standard fantasy dward, with short stature, powerful strength, and an affinity for geology, masonry, and war.",
								ability: "Dwarves are strong fighters with powerful punch and kick attacks that each deal 3d6 damage.",
							},
							perception: {
								sight: 3,
								sound: 5,
								scent: 1,
								taste: 1,
								touch: 5
							},
							statistics: {
								strength: 1,
								speed: 1,
								immunity: 1,
								logic: -1
							},
							skills: {
								memory: { lang_dwarf: 5 },
								dexterity: { crafting: 2 },
								speed: { dodge: 2 },
								perception: { night_vision: 2 }
							}
						},
						halfling: {
							info: {
								age: 40,
								height: 3.5,
								weight: 100,
								description: "Standard fantasy halfling/hobbit, with pointy ears, hairy feet, half height, and a love of food, gardening, music, and simple pleasures.",
								ability: "Halfings are hard to influence; they negate opponent skill bonuses when the opponent influences via charisma.",
							},
							perception: {
								sight: 3,
								sound: 5,
								scent: 1,
								taste: 5,
								touch: 1
							},
							statistics: {
								immunity: 1,
								memory: 1,
								dexterity: 1,
								strength: -1
							},
							skills: {
								memory: { lang_halfling: 5 },
								speed: { jump: 2 },
								strength: { climb: 2 },
								dexterity: { sneak: 2 }
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
							perception: {
								sight: 5,
								sound: 5,
								scent: 3,
								taste: 1,
								touch: 1
							},
							statistics: {
								perception: 1,
								logic: 1,
								immunity: 1,
								strength: -1
							},
							skills: {
								memory: { lang_gnome: 5 },
								dexterity: { crafting: 2 },
								logic: { persuade: 2, pattern_recognition: 2 }
							}
						},
						goblin: {
							info: {
								age: 15,
								height: 3.5,
								weight: 100,
								description: "Standard fantasy goblins, with small frames, dark red or yellow skin, low intelligence, and a crass, lowly standard of living.",
								ability: "Goblins are immune to most toxins, with +5 resistance to poison, infection, allergies, and alcohol.",
							},
							perception: {
								sight: 1,
								sound: 3,
								scent: 5,
								taste: 1,
								touch: 5
							},
							statistics: {
								dexterity: 1,
								speed: 1,
								immunity: 1,
								logic: -1
							},
							skills: {
								memory: { lang_goblin: 5 },
								dexterity: { sneak: 2, ride_animals: 2 },
								perception: { night_vision: 2 },
								immunity: { poison_resistance: 5, infection_resistance: 5, allergy_resistance: 5, alcohol_tolerance: 5}
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
							perception: {
								sight: 3,
								sound: 3,
								scent: 5,
								taste: 1,
								touch: 1
							},
							statistics: {
								strength: 1,
								speed: 1,
								dexterity: 1,
								logic: -1
							},
							skills: {
								memory: { lang_orc: 5 },
								strength: { carry: 2, melee: 2 },
								perception: { night_vision: 2 }
							}
						},
						bhios: {
							info: {
								age: 35,
								height: 5.5,
								weight: 150,
								description: "These forest-dwelling hominins are logical, passionate, and well-spoken. They’ve adapted to a mostly peaceful and democratic existence, if technologically stagnant.",
								ability: "With their photosynthetic green skin, bhioses recover 3d6 extra damage on a sunny day.",
							},
							perception: {
								sight: 3,
								sound: 3,
								scent: 3,
								taste: 3,
								touch: 3
							},
							statistics: {
								memory: 1,
								logic: 1,
								immunity: 1,
								speed: -1
							},
							skills: {
								memory: { lang_bhios: 5 },
								immunity: { recover: 2 },
								strength: { climb: 2 },
								logic: { remain_calm: 2 }
							}
						},
						mellifax: {
							info: {
								age: 15,
								height: 3,
								weight: 50,
								description: "Between three and four feet tall, these fairy folk are small, but clever. A secluded people, living in underground forest hives, they are often driven by racial ties, and have a close bond and deep understanding of nature.",
								ability: "With their small wings, mellifaxi can hover at a low distance above the ground for a minute at a time.",
							},
							perception: {
								sight: 1,
								sound: 3,
								scent: 3,
								taste: 3,
								touch: 5
							},
							statistics: {
								dexterity: 1,
								immunity: 1,
								speed: 1,
								strength: -1
							},
							skills: {
								memory: { lang_mellifax: 5 },
								dexterity: { sneak: 2 },
								speed: { jump: 2, fly: 10 },
								immunity: { poison_resistance: 2 }
							}
						},
						preas: {
							info: {
								age: 20,
								height: 5,
								weight: 125,
								description: "Tradition and clan loyalty hold first priority for this dark-purple-skinned people, but a connection with animal life is close behind. They have developed a symbiotic relationship with dozens of forest, mountain, and plains creatures.",
								ability: "With patience and intuition, preases have +10 animal handling; all animals are at -10 when resisting influence.",
							},
							perception: {
								sight: 5,
								sound: 1,
								scent: 3,
								taste: 3,
								touch: 3
							},
							statistics: {
								memory: 1,
								strength: 1,
								dexterity: 1,
								logic: -1
							},
							skills: {
								memory: { lang_preas: 5, facial_recognition: 2 },
								logic: { handle_animals: 10 },
								dexterity: { ride_animals: 2 },
								speed: { swim: 2 }
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
							perception: {
								sight: 3,
								sound: 5,
								scent: 5,
								taste: 1,
								touch: 1
							},
							statistics: {
								strength: 1,
								immunity: 1,
								logic: 1,
								dexterity: -1
							},
							skills: {
								memory: { lang_winge: 5 },
								dexterity: { martial_arts: 2 },
								logic: { spatial_reasoning: 2 },
								strength: { carry: 2 }
							}
						},
						lizardfolk: {
							info: {
								age: 20,
								height: 5,
								weight: 150,
								description: "Standard fantasy lizard people, with medium-sized reptilian/humanoid bodies, forked tongues, webbed feet, and scales.",
								ability: "Lizardfolk can camouflage in any setting, giving opponents a -15 on sight checks.",
							},
							perception: {
								sight: 5,
								sound: 5,
								scent: 3,
								taste: 1,
								touch: 1
							},
							statistics: {
								perception: 1,
								immunity: 1,
								dexterity: 1,
								speed: -1
							},
							skills: {
								memory: { lang_lizardfolk: 5 },
								speed: { jump: 2, swim: 2 },
								immunity: { recover: 2 }
							}
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
							skills: ["dodge", "persuade", "seduce", "humor", "climb", "crafting", "escape_bonds", "lip_reading", "botany", "alchemy", "astronomy", "geography", "history", "mathematics", "mechanics", "language", "performance", "musicianship", "game_playing", "judge_character", "penmanship", "sneak", "alcohol_tolerance", "cooking"]
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
							skills: ["climb", "carry", "fishing", "archery", "crafting", "handle_animals", "heal", "geography", "botany", "zoology", "ride_animals", "medicine", "swim", "remain_calm", "sneak", "poison_resistance", "infection_resistance", "allergy_resistance", "sleep_resistance", "recover"]
						},
						fighter: {
							races: ["elf", "dwarf", "human", "orc", "bhios", "winge"],
							statistics: {
								strength: 2,
								logic: 2,
								memory: -2,
								perception: -2
							},
							skills: ["climb", "crafting", "handle_animals", "intimidate", "spatial_reasoning", "mechanics", "metalworking", "woodworking", "leatherworking", "ride_animals", "swim", "dodge", "punch", "melee", "missile", "carry", "pain_tolerance", "run", "jump"]
						},
						monk: {
							races: ["elf", "goblin", "halfling", "human", "bhios", "lizardfolk"],
							statistics: {
								strength: 2,
								dexterity: 2,
								immunity: -2,
								logic: -2
							},
							skills: ["climb", "craft", "escape_bonds", "intimidate", "history", "geography", "pattern_recognition", "astronomy", "remain_calm", "performance", "ride_animals", "judge_character", "sneak", "swim", "dodge", "punch", "kick", "martial_arts", "jump", "run", "throw", "recover"]
						},
						paladin: {
							races: ["elf", "dwarf", "human", "orc", "bhios", "winge"],
							statistics: {
								logic: 2,
								dexterity: 2,
								memory: -2,
								speed: -2
							},
							skills: ["crafting", "persuade", "handle_animals", "medicine", "history", "ride_animals", "judge_character", "remain_calm", "facial_recognition", "melee", "missile", "pain_tolerance", "infection_resistance", "sleep_resistance", "run", "carry"]
						},
						ranger: {
							races: ["elf", "goblin", "human", "orc", "preas", "lizardfolk"],
							statistics: {
								dexterity: 2,
								perception: 2,
								strength: -2,
								logic: -2
							},
							skills: ["climb", "crafting", "handle_animals", "medicine", "intimidate", "persuade", "mechanics", "geography", "botany", "alchemy", "history", "zoology", "leatherworking", "woodworking", "ride_animals", "sneak", "dodge", "jump", "swim", "run", "archery", "missile", "seduce", "remain_calm", "pattern_recognition", "spatial_reasoning", "metabolism", "infection_resistance", "allergy_resistance", "poison_resistance", "medicine"]
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
							skills: ["alchemy", "geography", "history", "leatherworking", "medicine", "metalworking", "woodworking", "crafting", "persuade", "throw", "mechanics", "mathematics", "spatial_reasoning", "sleep_resistance", "performance"]
						}
					}

					var statistics = {
						perception: "The baseline for all senses (sight, sound, scent, taste, and touch), with modifiers added for each race. This also controls special abilities and race-specific senses: internal clock, perfect pitch, color sense; night vision, infrared vision, internal compass, etc. This corresponds to the eyes, ears, nose, tongue, skin.",
						memory: "All knowledge accumulated, including languages, trades, and knowledge of specific fields. Some useful applications are alchemy, botany, medicine, and metalworking. This corresponds to the hippocampus.",
						logic: "Figuring things out, learning, and recognizing patterns, from making maps with spatial reasoning, to remaining calm in resisting surprise and opponents' charisma. This corresponds to the cerebrum.",
						strength: "Upper body strength. A character’s carrying capacity, climbing ability, and throwing distance and accuracy are governed by this statistic, as is effectiveness in melee combat. This corresponds to the torso and arm muscles.",
						dexterity: "Hand-eye coordination, fine motor skills, and balance. This is key when aiming in combat, riding an animal, sneaking around, crafting, and in performance art. This corresponds to the wrist and hand muscles.",
						immunity: "Natural defenses against injury, infection, hunger and thirst, heat and cold, pain, and more. This also correlates to the rate of recovery following combat, infection, and poison. This corresponds to the immune, cardiovascular, and respiratory systems.",
						speed: "Lower body strength, including jumping, running, and swimming. This also determines turn order, the ability to dodge, and distance a character can move during combat. This corresponds to the leg and feet muscles."
					}

					var skills = {
						perception: [
							"sight", "sound", "scent", "taste", "touch", "internal_clock", "perfect_pitch", "color_sense", "night_vision", "infrared_vision", "internal_compass"
						],
						memory: [
							"alchemy", "astronomy", "botany", "cooking", "facial_recognition", "geography", "history", "leatherworking", "lip_reading", "medicine", "metalworking", "woodworking", "voice_recognition", "zoology",
							"lang_human", "lang_elf", "lang_dwarf", "lang_halfling", "lang_gnome", "lang_goblin", "lang_orc", "lang_bhios", "lang_mellifax", "lang_preas", "lang_winge", "lang_lizardfolk"
						],
						logic: [
							"evoke_emotion", "game_playing", "handle_animals", "humor", "intimidate", "judge_character", "mathematics", "mechanics", "pattern_recognition", "persuade", "remain_calm", "seduce", "spatial_reasoning"
						],
						strength: [
							"archery", "carry", "climb", "fishing", "melee", "punch", "throw"
						],
						dexterity: [
							"catch", "crafting", "drawing", "escape_bonds", "knifing", "lock_picking", "martial_arts", "missile", "musicianship", "penmanship", "performance", "ride_animals", "sneak"
						],
						immunity: [
							"alcohol_tolerance", "allergy_resistance", "hold_breath", "infection_resistance", "metabolism", "pain_tolerance", "poison_resistance", "recover", "sleep_resistance"
						],
						speed: [
							"dodge", "jump", "kick", "run", "swim"
						]
					}

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
						severe_pain: {
							description: "Roll immunity before any other statistic. Trigger: any statistic reaches 1.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						minor_pain_head: {
							description: "Roll immunity before perception, memory, & logic.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["perception", "memory", "logic"]
							}
						},
						minor_pain_body: {
							description: "Roll immunity before any strength, dexterity, & speed.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["strength", "dexterity", "speed"]
							}
						},
						infection: {
							description: "Roll immunity each day a character has outstanding damage until a successful check.",
							immunity_check: {
								skill: "infection_resistance",
								d6: 2
							}
						},
						poison: {
							description: "Roll immunity each day until a successful check.",
							immunity_check: {
								skill: "poison_resistance",
								d6: 2
							}
						},
						extreme_cold: {
							description: "Severely low temperatures.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["strength", "dexterity", "speed"]
							}
						},
						extreme_heat: {
							description: "Severely high temperatures.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["strength", "dexterity", "speed"]
							}
						},
						darkness: {
							description: "Impairs sight.",
							effects: {
								perception: {sight: -10}
							}
						},
						fog: {
							description: "Impairs sight.",
							effects: {
								perception: {sight: -10}
							}	
						},
						smoke: {
							description: "Impairs sight & scent; roll immunity before strength & speed.",
							immunity_check: {
								skill: "hold_breath",
								before: ["strength", "speed"]
							},
							effects: {
								perception: {sight: -10, scent: -10}
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
							description: "Impairs dexterity & strength. Trigger: using two weapons or using a weapon with a shield.",
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
						asphyxiation: {
							description: "Unconscious in 20 rounds (2 minutes); impairs taste & scent; roll immunity before any other statistic.",
							effects: {
								perception: {taste: -10, scent: -10},
							},
							immunity_check: {
								skill: "hold_breath",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						sleep: {
							description: "Impairs perception.",
							effects: {
								perception: {statistic: -10, sight: -5}
							}
						},
						inebriation: {
							description: "Impairs perception; roll immunity before any other statistic.",
							effects: {
								perception: {statistic: -10},
							},
							immunity_check: {
								skill: "alcohol_tolerance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						lack_of_sleep: {
							description: "Death in 1 week; roll immunity before any other statistic.",
							immunity_check: {
								skill: "sleep_resistance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						lack_of_food: {
							description: "Death in 1 week; roll immunity before any other statistic.",
							immunity_check: {
								skill: "pain_tolerance",
								before: ["perception", "memory", "logic", "strength", "dexterity", "speed"]
							}
						},
						alertness: {
							description: "Boosts physical attributes.",
							effects: {
								strength: {statistic: 2}, dexterity: {statistic: 2}, speed: {statistic: 2}, perception: {statistic: 2}
							}
						},
						concentration: {
							description: "Boosts mental attributes.",
							effects: {
								memory: {statistic: 2}, logic: {statistic: 2}, perception: {statistic: 2}
							}
						},
						immunity_boost: {
							description: "Boosts recovery and immunity against infection and poison.",
							effects: {
								immunity: {recover: 5, infection_resistance: 5, poison_resistance: 5, alcohol_tolerance: 5}
							}
						},
						pain_relief: {
							description: "Negates the effects of severe and minor pain.",
							effects: {
								immunity: {pain_tolerance: 5}
							}
						},
						accuracy: {
							description: "Improves sight and missile weapon aim.",
							effects: {
								perception: {sight: 10}, dexterity: {missile: 5}
							}
						}
					}

					var items = {
						weapons: [
							{
								name: "throwing knife",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "throw",
								d6: 3,
								weight: 1,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "ring blade",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "throw",
								d6: 4,
								weight: 1,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "spear",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "throw",
								d6: 5,
								weight: 3,
								hands: 1,
								fuel: 3,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 4
								},
								description: ""
							},
							{
								name: "pike",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "throw",
								d6: 5,
								weight: 3,
								hands: 1,
								fuel: 3,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 4
								},
								description: ""
							},
							{
								name: "sling",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "throw",
								d6: 0,
								weight: 1,
								hands: 1,
								fuel: 1,
								description: ""
							},
							{
								name: "bomb",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "throw",
								d6: 0,
								weight: 1,
								hands: 1,
								description: "see orbs"
							},
							{
								name: "brass knuckles",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "punch",
								d6: 2,
								weight: 1,
								hands: 2,
								description: "adds to punch damage"
							},
							{
								name: "steel boots",
								count: 1,
								type: "weapon",
								statistic: "speed",
								skill: "kick",
								d6: 2,
								weight: 10,
								hands: 0,
								description: "adds to kick damage"
							},
							{
								name: "claws",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "martial_arts",
								d6: 3,
								weight: 2,
								hands: 2,
								description: "adds to martial arts damage"
							},
							{
								name: "wooden stake",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "knifing",
								d6: 3,
								weight: 2,
								hands: 1,
								fuel: 2,
								description: ""
							},
							{
								name: "dagger",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "knifing",
								d6: 3,
								weight: 1,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "sickle",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "knifing",
								d6: 4,
								weight: 2,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "short staff",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 4,
								weight: 4,
								hands: 1,
								fuel: 3,
								description: ""
							},
							{
								name: "club",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 4,
								weight: 4,
								hands: 1,
								fuel: 3,
								description: ""
							},
							{
								name: "whip",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 4,
								weight: 3,
								hands: 1,
								fuel: 2,
								description: ""
							},
							{
								name: "spiked club",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 5,
								weight: 5,
								hands: 1,
								fuel: 3,
								description: ""
							},
							{
								name: "short sword",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 5,
								weight: 2,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "axe",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 5,
								weight: 2,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "mace",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 5,
								weight: 4,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "morningstar",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 5,
								weight: 4,
								hands: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "long staff",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 6,
								weight: 6,
								hands: 2,
								fuel: 4,
								description: ""
							},
							{
								name: "club",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 6,
								weight: 6,
								hands: 2,
								fuel: 4,
								description: ""
							},
							{
								name: "spiked club",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 7,
								weight: 7,
								hands: 2,
								fuel: 4,
								description: ""
							},
							{
								name: "flail",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 7,
								weight: 5,
								hands: 2,
								magnetic: true,
								description: ""
							},
							{
								name: "warhammer",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 7,
								weight: 6,
								hands: 2,
								magnetic: true,
								description: ""
							},
							{
								name: "long sword",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 7,
								weight: 5,
								hands: 2,
								magnetic: true,
								description: ""
							},
							{
								name: "large axe",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "melee",
								d6: 7,
								weight: 5,
								hands: 2,
								magnetic: true,
								description: ""
							},
							{
								name: "bow",
								count: 1,
								type: "weapon",
								statistic: "strength",
								skill: "archery",
								weight: 2,
								hands: 2,
								fuel: 2,
								description: ""
							},
							{
								name: "crossbow",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "missile",
								weight: 3,
								hands: 2,
								fuel: 2,
								description: ""
							},
							{
								name: "blowgun",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "missile",
								weight: 1,
								hands: 1,
								fuel: 1,
								description: ""
							},
							{
								name: "stonebow",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "missile",
								weight: 3,
								hands: 2,
								fuel: 2,
								description: ""
							},
							{
								name: "gauss pistol",
								count: 1,
								type: "weapon",
								statistic: "dexterity",
								skill: "missile",
								weight: 2,
								hands: 1,
								fuel: 2,
								description: ""
							}
						],
						ammunition: [
							{
								name: "arrow",
								count: 1,
								type: "ammunition",
								weapons: ["bow"],
								d6: 3,
								weight: 0.05,
								fuel: 1,
								alternative: {
									statistic: "dexterity",
									skill: "knifing",
									d6: 2
								},
								description: "recoverable"
							},
							{
								name: "bolt",
								count: 1,
								type: "ammunition",
								weapons: ["crossbow"],
								weight: 0.05,
								d6: 3,
								fuel: 1,
								alternative: {
									statistic: "dexterity",
									skill: "knifing",
									d6: 2
								},
								description: "recoverable"
							},
							{
								name: "boom bolt",
								count: 1,
								type: "ammunition",
								weapons: ["crossbow"],
								weight: 0.05,
								d6: 4,
								magnetic: true,
								conditions: {loud_noise: 1},
								description: "explosion on impact; -10 sound for 1d6 rounds"
							},
							{
								name: "dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.05,
								d6: 2,
								alternative: {
									statistic: "dexterity",
									skill: "knifing",
									d6: 1
								},
								description: ""
							},
							{
								name: "poison dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.05,
								d6: 2,
								conditions: {poison: 0},
								description: "roll immunity against poison"
							},
							{
								name: "sleep dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.05,
								d6: 2,
								conditions: {sleep: 1},
								description: "roll immunity against sleep for 1d6 hours"
							},
							{
								name: "disease dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.05,
								d6: 2,
								conditions: {infection: 0},
								description: "roll immunity against infection"
							},
							{
								name: "paralysis dart",
								count: 1,
								type: "ammunition",
								weapons: ["blowgun"],
								weight: 0.05,
								d6: 2,
								conditions: {paralysis_arms: 1, paralysis_legs: 1},
								description: "causes paralysis for 1d6 rounds"
							},
							{
								name: "wood orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								fuel: 1,
								description: ""
							},
							{
								name: "rock orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								description: ""
							},
							{
								name: "glass orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								description: "shatters on impact"
							},
							{
								name: "glass blood orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								conditions: {infection: 0},
								description: "roll immunity against infection"
							},
							{
								name: "glass oil orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								fuel: 1,
								description: ""
							},
							{
								name: "glass flash orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								conditions: {darkness: 1},
								description: "-10 sight for 1d6 rounds"
							},
							{
								name: "glass smoke orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								conditions: {smoke: 2},
								description: "-10 sight for 2d6 rounds"
							},
							{
								name: "glass poison orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								conditions: {poison: 0},
								description: "roll immunity against poison"
							},
							{
								name: "glass sleep orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								conditions: {sleep: 1},
								description: "roll immunity against sleep for 1d6 hours"
							},
							{
								name: "glass acid orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								description: "acid damage on contact; bites through most materials, including armor, in 1 minute"
							},
							{
								name: "exploding orb",
								count: 1,
								type: "ammunition",
								weapons: ["sling", "bomb", "stonebow", "gauss pistol"],
								weight: 0.05,
								d6: 3,
								conditions: {loud_noise: 1},
								description: "explosion on impact; -10 sound for 1d6 rounds"
							}
						],
						armor: [
							{
								name: "clothes",
								count: 1,
								type: "armor",
								d6: 1,
								weight: 3,
								fuel: 2,
								description: ""
							},
							{
								name: "leather armor",
								count: 1,
								type: "armor",
								d6: 3,
								weight: 15,
								fuel: 2,
								description: ""
							},
							{
								name: "wooden armor",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 40,
								fuel: 4,
								description: ""
							},
							{
								name: "chainmail armor",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 40,
								magnetic: true,
								description: ""
							},
							{
								name: "scalemail armor",
								count: 1,
								type: "armor",
								d6: 4,
								weight: 50,
								description: ""
							},
							{
								name: "platemail armor",
								count: 1,
								type: "armor",
								d6: 5,
								weight: 60,
								magnetic: true,
								description: ""
							},
							{
								name: "stonemail armor",
								count: 1,
								type: "armor",
								d6: 6,
								weight: 80,
								description: ""
							}
						],
						shields: [
							{
								name: "plywood shield",
								count: 1,
								type: "shield",
								d6: 3,
								weight: 5,
								fuel: 2,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 2
								},
								description: ""
							},
							{
								name: "wooden shield",
								count: 1,
								type: "shield",
								d6: 4,
								weight: 10,
								fuel: 3,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 3
								},
								description: ""
							},
							{
								name: "bone / scale shield",
								count: 1,
								type: "shield",
								d6: 4,
								weight: 15,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 3
								},
								description: ""
							},
							{
								name: "metal shield",
								count: 1,
								type: "shield",
								d6: 5,
								weight: 20,
								magnetic: true,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 3
								},
								description: ""
							},
							{
								name: "stone shield",
								count: 1,
								type: "shield",
								d6: 6,
								weight: 30,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 4
								},
								description: ""
							}
						],
						potions: [
							{
								name: "weak healing elixir",
								count: 1,
								type: "healing",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 4, b: 0},
								d6: 1,
								description: "removes 1d6 damage"
							},
							{
								name: "medium healing elixir",
								count: 1,
								type: "healing",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 8, b: 0},
								d6: 2,
								description: "removes 2d6 damage"
							},
							{
								name: "strong healing elixir",
								count: 1,
								type: "healing",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 12, b: 0},
								d6: 3,
								description: "removes 3d6 damage"
							},
							{
								name: "pain killer",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 1, b: 0},
								conditions: {severe_pain: 1, minor_pain_body: 1, minor_pain_head: 1, pain_relief: 1},
								description: "numbs pain for 1d6 hours"
							},
							{
								name: "immunity booster",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 2, b: 0},
								conditions: {immunity_boost: 4},
								description: "boosts immunity for 4d6 hours"
							},
							{
								name: "wake potion",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 3, b: 2},
								conditions: {alertness: 1},
								description: "boosts alertness for 1d6 hours"
							},
							{
								name: "concentration elixir",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 2, b: 3},
								conditions: {concentration: 1},
								description: "boosts concentration for 1d6 hours"
							},
							{
								name: "paralysis elixir",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 2, g: 1, b: 0},
								conditions: {paralysis_arms: 1, paralysis_legs: 1},
								description: "causes paralysis for 1d6 rounds"
							},
							{
								name: "sleep potion",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 4, g: 1, b: 0},
								conditions: {sleep: 1},
								description: "causes sleep for 1d6 hours"
							},
							{
								name: "smoke potion",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 1, g: 0, b: 1},
								conditions: {smoke: 2},
								description: "creates smoke for 2d6 rounds"
							},
							{
								name: "stink potion",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 2, g: 1, b: 1},
								conditions: {noxious_odor: 2},
								description: "smells bad for 2d6 rounds"
							},
							{
								name: "glow goo",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 0, g: 0, b: 2},
								description: "creates light for 2 hours"
							},
							{
								name: "chill syrup",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 1, g: 1, b: 2},
								conditions: {extreme_cold: 1},
								description: "makes things extremely cold for 1d6 hours"
							},
							{
								name: "warmth syrup",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 3, g: 0, b: 1},
								conditions: {extreme_heat: 1},
								description: "makes things extremely hot for 1d6 hours"
							},
							{
								name: "insect repellent",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 3, g: 3, b: 0},
								description: "repels bugs for 6 hours"
							},
							{
								name: "fire water",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 4, g: 0, b: 2},
								fuel: 1,
								description: "highly flammable"
							},
							{
								name: "fizzbang",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 5, g: 0, b: 2},
								d6: 3,
								conditions: {loud_noise: 1},
								description: "explosion on impact"
							},
							{
								name: "solvent acid",
								count: 1,
								type: "potion",
								weight: 0.05,
								recipe: {w: 10, r: 4, g: 1, b: 4},
								d6: 3,
								description: "bites through most materials, including armor, in 1 minute"
							}
						],
						miscellaneous: [
							{
								name: "pack",
								count: 1,
								weight: 1,
								fuel: 1,
								description: "used to carry items"
							},
							{
								name: "scabbard",
								count: 1,
								weight: 1,
								description: "used to hold swords and other melee weapons"
							},
							{
								name: "quiver",
								count: 1,
								weight: 1,
								fuel: 1,
								description: "used to hold up arrows, bolts, and other projectiles"
							},
							{
								name: "bottle",
								count: 1,
								weight: 0.5,
								description: "glass; shatters on impact"
							},
							{
								name: "flask",
								count: 1,
								weight: 0.5,
								description: "leather or metal"
							},
							{
								name: "tinder",
								count: 1,
								weight: 0.5,
								fuel: 1,
								description: "starts fire"
							},
							{
								name: "candle flashlight",
								count: 1,
								weight: 1,
								description: "focuses candlelight; push up as candle burns for 2 hours"
							},
							{
								name: "torch",
								count: 1,
								weight: 1,
								description: "burns to provide light for 2 hours"
							},
							{
								name: "oil lamp",
								count: 1,
								weight: 2,
								description: "burns for 6 hours per pint of oil"
							},
							{
								name: "scope",
								count: 1,
								weight: 1,
								conditions: {accuracy: 0},
								description: "improves sight and missile weapon aim"
							},
							{
								name: "spyglass",
								count: 1,
								weight: 1,
								conditions: {accuracy: 0},
								description: "improves sight and missile weapon aim"
							},
							{
								name: "measuring cups",
								count: 1,
								weight: 0.5,
								description: "for potion-making; used to measure parts: (blue: 3 & 5), (green: 3 & 7), (red: 3 & 11)"
							},
							{
								name: "red flower extract",
								count: 1,
								weight: 0.01,
								description: "for potion-making; combine with 10 parts water"
							},
							{
								name: "green flower extract",
								count: 1,
								weight: 0.01,
								description: "for potion-making; combine with 10 parts water"
							},
							{
								name: "blue flower extract",
								count: 1,
								weight: 0.01,
								description: "for potion-making; combine with 10 parts water"
							},
							{
								name: "extract containers",
								count: 1,
								weight: 0.5,
								description: "for potion-making; made of a special material that prevents corrosion"
							},
							{
								name: "shovel",
								count: 1,
								weight: 5,
								fuel: 2,
								magnetic: true,
								alternative: {
									statistic: "strength",
									skill: "melee",
									d6: 3
								},
								description: "for digging"
							},
							{
								name: "rope",
								count: 1,
								weight: 2,
								fuel: 3,
								description: "generally 10, 25, or 50 feet"
							},
							{
								name: "chain",
								count: 1,
								weight: 10,
								magnetic: true,
								description: "generally 10, 25, or 50 feet"
							},
							{
								name: "grappling hook",
								count: 1,
								weight: 1,
								magnetic: true,
								description: ""
							},
							{
								name: "climbing gear",
								count: 1,
								weight: 10,
								magnetic: true,
								description: "for faster and safer climbing"
							},
							{
								name: "shackles & chains",
								count: 1,
								weight: 5,
								magnetic: true,
								conditions: {paralysis_arms: 0, paralysis_legs: 0},
								description: "arm bindings affect dexterity and strength; leg bindings affect speed"
							},
							{
								name: "fishing pole, hook, line",
								count: 1,
								weight: 4,
								description: "for catching fish or other aquatic creatures"
							},
							{
								name: "net",
								count: 1,
								weight: 1,
								fuel: 1,
								description: "for catching fish or insects"
							},
							{
								name: "saddle",
								count: 1,
								weight: 20,
								description: "for horses or other mounts"
							},
							{
								name: "whistle",
								count: 1,
								weight: 0.05,
								description: ""
							},
							{
								name: "mirror",
								count: 1,
								weight: 0.5,
								description: ""
							},
							{
								name: "cloth",
								count: 1,
								weight: 0.5,
								description: "used for making tents, holding items, or bandaging wounds"
							},
							{
								name: "bedroll",
								count: 1,
								weight: 7,
								description: "wool"
							},
							{
								name: "blanket",
								count: 1,
								weight: 3,
								fuel: 3,
								description: "cloth"
							},
							{
								name: "quill pens, ink",
								count: 1,
								weight: 0.05,
								description: ""
							},
							{
								name: "paper / parchment",
								count: 1,
								weight: 0.05,
								fuel: 1,
								description: ""
							},
							{
								name: "map",
								count: 1,
								weight: 0.1,
								fuel: 1,
								description: ""
							},
							{
								name: "compass",
								count: 1,
								weight: 0.05,
								magnetic: true,
								description: ""
							},
							{
								name: "astrolabe",
								count: 1,
								weight: 0.5,
								description: ""
							},
							{
								name: "sextant",
								count: 1,
								weight: 0.5,
								description: ""
							},
							{
								name: "...",
								count: 1,
								d6: 1,
								description: "..."
							}
						]
					}

					return {
						races: races,
						classes: classes,
						statistics: statistics,
						skills: skills,
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
							description: "",
							status: {
								points: 20,
								burden: 0,
								conditions: [],
								damage: 0
							}
						},
						statistics: {
							perception: {
								maximum: 10,
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
								maximum: 10,
								damage: 0,
								condition: 0,
								skills: []
							},
							logic: {
								maximum: 10,
								damage: 0,
								condition: 0,
								skills: []
							},
							strength: {
								maximum: 10,
								damage: 0,
								condition: 0,
								skills: [
									{name: "punch", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							},
							dexterity: {
								maximum: 10,
								damage: 0,
								condition: 0,
								skills: [
									{name: "martial_arts", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							},
							immunity: {
								maximum: 10,
								damage: 0,
								condition: 0,
								skills: [
									{name: "recover", maximum: 0, condition: 0, d6: 2, unremovable: true}
								]
							},
							speed: {
								maximum: 10,
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
						// within an item ?
							if (event.target.closest(".item")) {
								// item
									var id = event.target.closest(".item").id
									var item = character.inventory.find(function (i) {
										return i.id == id
									})

								// alternative ?
									if (event.target.closest(".item-usage.alternative")) {
										var skill = item.alternative.skill
										var statistic = item.alternative.statistic
									}

								// usage ?
									else if (event.target.closest(".item-usage")) {
										var skill = item.skill
										var statistic = item.statistic
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
												label.innerText = immunitySkill.name ? immunitySkill.name.replace(/_/g, " ") : "immunity"
											document.getElementById("history").prepend(label)

											var d20 = document.createElement("div")
												d20.className = "d20"
												d20.innerText = roll
												d20.setAttribute("success", roll <= target ? true : false)
											label.prepend(d20)

										// failed ?
											if (roll > target) {
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
								label.innerText = skill ? skill.replace(/_/g, " ") : statistic ? statistic : item ? item.name : ""
							document.getElementById("history").prepend(label)

							var d20 = document.createElement("div")
								d20.className = "d20"
								d20.innerText = roll
								d20.setAttribute("success", roll <= target ? true : false)
							label.prepend(d20)
					}
				} catch (error) {}
			}

		/* rolld6 */
			function rolld6(event) {
				try {
					if (document.body.getAttribute("mode") == "play" || document.body.getAttribute("mode") == "damage") {
						// within an item ?
							if (event.target.closest(".item")) {
								// item
									var id = event.target.closest(".item").id
									var item = character.inventory.find(function (i) {
										return i.id == id
									})
									var type = item.type
									var count = Number(event.target.value)

								// alternative ?
									if (event.target.closest(".item-usage.alternative")) {
										var skill = item.alternative.skill
										var statistic = item.alternative.statistic
										var type = "weapon"
									}

								// usage ?
									else if (event.target.closest(".item-usage")) {
										var skill = item.skill
										var statistic = item.statistic
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
							if (item && ["punch", "kick", "martial_arts"].includes(skill)) {
								type = "weapon"
								count += character.statistics[statistic].skills.find(function(s) {
									return s.name == skill
								}).d6
							}
							else if (!item && ["punch", "kick", "martial_arts"].includes(skill)) {
								type = "weapon"
								item = character.inventory.find(function (i) {
									return (i.skill == skill && i.equipped)
								})

								if (item) {
									count += item.d6
								}
							}
							else if (skill == "recover" || skill == "defend") {
								type = "healing"
							}

						// ammunition?
							if (item && item.type == "ammunition" && !skill) {
								item.count = Math.max(0, item.count - 1)
								event.target.closest(".item").querySelector(".item-count").value = item.count

								// save
									saveFile(character)
							}

						// condition ?
							if (item && event.target.closest(".item-condition")) {
								type = "potion"
							}

						// roll
							var roll = 0
							for (var i = 0; i < count; i++) {
								roll += Math.floor(Math.random() * 6) + 1
							}

						// add to history
							var label = document.createElement("label")
								label.innerText = item ? item.name : skill ? skill.replace(/_/g, " ") : statistic ? statistic : ""
							document.getElementById("history").prepend(label)

							var d6 = document.createElement("div")
								d6.className = "d6"
								d6.innerText = roll
								d6.setAttribute("type", type)
							label.prepend(d6)

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
							// perception
								for (var s in data.races[before].perception) {
									var skill = character.statistics.perception.skills.find(function(i) {
										return i.name == s
									})
									skill.maximum = 0
								}

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
											}
										}
									}
								}

							// d6
								if (before == "dwarf" || before == "orc") {
									character.statistics.strength.skills.find(function(s) {
										return s.name == "punch"
									}).d6 = 2

									character.statistics.speed.skills.find(function(s) {
										return s.name == "kick"
									}).d6 = 2
								}
								else if (before == "bhios") {
									character.statistics.immunity.skills.find(function(s) {
										return s.name == "recover"
									}).d6 = 2
								}
								else if (before == "winge") {
									character.statistics.immunity.skills = character.statistics.immunity.skills.filter(function(s) {
										return s.name != "defend"
									})
									document.getElementById("info-defend").removeAttribute("shown")
								}
						}

					// set new perks
						if (before !== after && Object.keys(data.races).includes(after)) {
							// perception
								for (var s in data.races[after].perception) {
									var skill = character.statistics.perception.skills.find(function(i) {
										return i.name == s
									})
									skill.maximum = data.races[after].perception[s]
								}

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
											character.statistics[s].skills.push({name: i, maximum: data.races[after].skills[s][i], condition: 0})
										}
									}
								}

							// d6
								if (after == "dwarf" || after == "orc") {
									character.statistics.strength.skills.find(function(s) {
										return s.name == "punch"
									}).d6 = 3

									character.statistics.speed.skills.find(function(s) {
										return s.name == "kick"
									}).d6 = 3
								}
								else if (after == "bhios") {
									character.statistics.immunity.skills.find(function(s) {
										return s.name == "recover"
									}).d6 = 5
								}
								else if (after == "winge") {
									character.statistics.immunity.skills.push({name: "defend", maximum: 10, condition: 0, d6: 1, unremovable: true})
									document.getElementById("info-defend").setAttribute("shown", true)
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
				} catch (error) {}
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

					// defend
						if (character.statistics.immunity.skills.find(function(s) { return s.name == "defend" })) {
							document.getElementById("info-defend").setAttribute("shown", true)
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
						var cost = (old - character.statistics[statistic].maximum) * 20
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
								option.setAttribute("readonly", true)
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
						document.getElementById(statistic + "-select").querySelector("[value=" + name + "]").setAttribute("readonly", true)
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
						document.getElementById(statistic + "-select").querySelector("[value=" + skill.replace(/\s/g, "_") + "]").removeAttribute("readonly")

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
							text.setAttribute("readonly", true)
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

						var damage = document.createElement("input")
							damage.type = "number"
							damage.setAttribute("readonly", true)
							damage.className = "skill-damage"
							damage.value = ""
						right.appendChild(damage)

						var condition = document.createElement("input")
							condition.type = "number"
							condition.setAttribute("readonly", true)
							condition.className = "skill-condition"
							condition.value = Math.max(-99, Math.min(99, skill.condition)) || ""
						right.appendChild(condition)

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

						character.inventory.push(data.items[category].find(function(i) {
							return i.name == name
						}))
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

					// description
						else if (event.target.className.includes("item-description")) {
							item.description = event.target.value
						}

					// skill
						else if (event.target.className.includes("item-usage-skill")) {
							var statistic = Object.keys(data.skills).find(function(stat) {
								return data.skills[stat].includes(event.target.value)
							})

							if (statistic && event.target.closest(".alternative")) {
								item.alternative.statistic = statistic
								item.alternative.skill = event.target.value
							}
							else if (statistic) {
								item.statistic = statistic
								item.skill = event.target.value
							}
						}

					// d6
						else if (event.target.className.includes("d6")) {
							if (event.target.closest(".alternative")) {
								item.alternative.d6 = Number(event.target.value)
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

					// usage
						if (item.statistic) {
							if (item.skill) {
								var skill = character.statistics[item.statistic].skills.find(function(skill) { return skill.name == item.skill }) || {maximum: 0, condition: 0}
							}

							var usage = document.createElement("div")
								usage.className = "item-usage"
							block.appendChild(usage)

							var d20 = document.createElement("input")
								d20.type = "number"
								d20.setAttribute("readonly", true)
								d20.step = 1
								d20.className = "d20"
								d20.value = Math.max(0, character.statistics[item.statistic].maximum + character.statistics[item.statistic].damage + character.statistics[item.statistic].condition + (item.skill ? skill.maximum + skill.condition : 0))
								d20.addEventListener(on.click, rolld20)
							usage.appendChild(d20)

							var text = document.createElement("input")
								text.type = "text"
								if (!enable) {
									text.setAttribute("readonly", true)
								}
								text.className = "item-usage-skill editable"
								text.placeholder = "skill"
								text.value = item.skill.replace(/_/g, " ") || ""
								text.addEventListener("change", changeItem)
							usage.appendChild(text)
						}

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

							if (item.statistic) {
								usage.appendChild(d6)
							}
							else {
								name.appendChild(d6)
							}
						}

					// alternative
						if (item.alternative) {
							if (item.alternative.skill) {
								var skill = character.statistics[item.alternative.statistic].skills.find(function(skill) { return skill.name == item.skill }) || {maximum: 0, condition: 0}
							}

							var usage = document.createElement("div")
								usage.className = "item-usage alternative"
							block.appendChild(usage)

							var d20 = document.createElement("input")
								d20.type = "number"
								d20.setAttribute("readonly", true)
								d20.step = 1
								d20.className = "d20"
								d20.value = Math.max(0, character.statistics[item.alternative.statistic].maximum + character.statistics[item.alternative.statistic].damage + character.statistics[item.alternative.statistic].condition + (item.skill ? skill.maximum + skill.condition : 0))
								d20.addEventListener(on.click, rolld20)
							usage.appendChild(d20)

							var text = document.createElement("input")
								text.type = "text"
								if (!enable) {
									text.setAttribute("readonly", true)
								}
								text.className = "item-usage-skill editable"
								text.addEventListener("change", changeItem)
								text.placeholder = "skill"
								text.value = item.alternative.skill.replace(/_/g, " ") || ""
							usage.appendChild(text)

							var d6 = document.createElement("input")
								d6.type = "number"
								if (!enable) {
									d6.setAttribute("readonly", true)
								}
								d6.step = 1
								d6.className = "d6 editable"
								d6.addEventListener("change", changeItem)
								d6.addEventListener(on.click, rolld6)
								d6.placeholder = "d6"
								d6.value = item.alternative.d6
							usage.appendChild(d6)
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
								condition.appendChild(d6)

								if (item.conditions[i]) {
									d6.placeholder = "d6"
								}
							}
						}

					// other info
						var description = document.createElement("textarea")
							if (!enable) {
								description.setAttribute("readonly", true)
							}
							description.className = "item-description editable"
							description.addEventListener("change", changeItem)
							description.placeholder = "description"
							description.value = ""
						block.appendChild(description)
						
						if (item.weight)      { description.value += " • " + item.weight + " lbs"             }
						if (item.hands)       { description.value += " • " + item.hands  + "-handed"             }
						if (item.weapons)     { description.value += " • for " + item.weapons.join(",")          }
						if (item.magnetic)    { description.value += " • magnetic"                               }
						if (item.fuel)        { description.value += " • fuels fire for " + item.fuel + " rounds"}
						if (item.recipe)      { description.value += " • " + JSON.stringify(item.recipe).replace(/{|}|"/g,"").replace(/,/g,", ")}
						if (item.description) { description.value += " • " + item.description                    }

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
							document.getElementById("conditions-select").querySelector("[value=" + event.target.value + "]").setAttribute("readonly", true)
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
							document.getElementById("conditions-select").querySelector("[value=" + event.target.parentNode.getAttribute("value") + "]").removeAttribute("readonly")

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
			document.getElementById("info-defend").addEventListener(on.click, recoverDamage)
			function recoverDamage(event) {
				try {
					// recover only
						if (event.target.id == "info-recover") {
							// roll d20
								var skill = character.statistics.immunity.skills.find(function (s) { return s.name == "recover" })
								var target = Math.max(0, character.statistics.immunity.maximum + character.statistics.immunity.damage + character.statistics.immunity.condition + skill.maximum + skill.condition)
								var roll = Math.floor(Math.random() * 20) + 1

							// add to history
								var label = document.createElement("label")
									label.innerText = "recover"
								document.getElementById("history").prepend(label)

								var d20 = document.createElement("div")
									d20.className = "d20"
									d20.innerText = roll
									d20.setAttribute("success", roll <= target ? true : false)
								label.prepend(d20)
						}

					// defend only
						else if (event.target.id == "info-defend") {
							var skill = character.statistics.immunity.skills.find(function(s) { return s.name == "defend" }) || {maximum: 0, condition: 0}
						}

					// both
						// roll d6
							var count = roll <= target ? skill.d6 : 1
							var roll = 0
							for (var i = 0; i < count; i++) {
								roll += Math.floor(Math.random() * 6) + 1
							}

						// add to history
							var label = document.createElement("label")
								label.innerText = skill.name
							document.getElementById("history").prepend(label)

							var d6 = document.createElement("div")
								d6.className = "d6"
								d6.setAttribute("type", "healing")
								d6.innerText = roll
							label.prepend(d6)

						// damage mode ?
							character.info.status.damage = character.info.status.damage + roll
							if (skill.name == "defend") {
								character.info.status.damage = Math.min(0, character.info.status.damage)
							}
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
						document.getElementById("info-damage").value = character.info.status.damage

					// redisplay
						displayCharacter(character)

					// save
						saveFile(character)
				} catch (error) {}
			}
}