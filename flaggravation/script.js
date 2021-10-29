/*** globals ***/
	/* constants */
		const CONSTANTS = {
			defaultPlayerCount: 3,
			defaultFlagGoal: 5,
			defaultFlagOptions: 5,
			flags: {
				afghanistan: {code: 'AF', name: 'Afghanistan', components: ['red','green','black','stripe','seal','plant','symbol']},
				albania: {code: 'AL', name: 'Albania', components: ['red','black','animal']},
				algeria: {code: 'DZ', name: 'Algeria', components: ['red','green','white','block','star','moon']},
				andorra: {code: 'AD', name: 'Andorra', components: ['red','yellow','blue','stripe','seal']},
				angola: {code: 'AO', name: 'Angola', components: ['red','yellow','black','seal','block','star']},
				antigua_and_barbuda: {code: 'AG', name: 'Antigua and Barbuda', components: ['red','yellow','blue','black','white','triangle','sun']},
				argentina: {code: 'AR', name: 'Argentina', components: ['yellow','blue','white','stripe','sun']},
				armenia: {code: 'AM', name: 'Armenia', components: ['red','yellow','blue','stripe']},
				australia: {code: 'AU', name: 'Australia', components: ['red','blue','white','cross','star']},
				austria: {code: 'AT', name: 'Austria', components: ['red','white','stripe']},
				azerbaijan: {code: 'AZ', name: 'Azerbaijan', components: ['red','blue','green','white','stripe','star','moon']},
				bahamas: {code: 'BS', name: 'Bahamas', components: ['yellow','blue','stripe','triangle']},
				bahrain: {code: 'BH', name: 'Bahrain', components: ['red','white','triangle']},
				bangladesh: {code: 'BD', name: 'Bangladesh', components: ['red','green','circle']},
				barbados: {code: 'BB', name: 'Barbados', components: ['yellow','blue','stripe','symbol']},
				belarus: {code: 'BY', name: 'Belarus', components: ['red','green','white','block','symbol']},
				belgium: {code: 'BE', name: 'Belgium', components: ['red','yellow','black','stripe']},
				belize: {code: 'BZ', name: 'Belize', components: ['red','blue','green','white','stripe','seal','circle','plant']},
				benin: {code: 'BJ', name: 'Benin', components: ['red','yellow','green','block']},
				bhutan: {code: 'BT', name: 'Bhutan', components: ['red','yellow','triangle','animal']},
				bolivia: {code: 'BO', name: 'Bolivia', components: ['red','yellow','green','stripe','seal']},
				bosnia_and_herzegovina: {code: 'BA', name: 'Bosnia and Herzegovina', components: ['yellow','blue','white','triangle','star']},
				botswana: {code: 'BW', name: 'Botswana', components: ['blue','black','white','stripe']},
				brazil: {code: 'BR', name: 'Brazil', components: ['yellow','blue','green','white','circle','block','star','symbol']},
				brunei: {code: 'BN', name: 'Brunei', components: ['red','yellow','black','white','stripe','seal','symbol']},
				bulgaria: {code: 'BG', name: 'Bulgaria', components: ['red','green','white','stripe']},
				burkina_faso: {code: 'BF', name: 'Burkina Faso', components: ['red','yellow','green','star']},
				burundi: {code: 'BI', name: 'Burundi', components: ['red','green','white','cross','circle','star']},
				cote_divoire: {code: 'CI', name: 'Côte d\'Ivoire', components: ['yellow','green','white','stripe']},
				cabo_verde: {code: 'CV', name: 'Cabo Verde', components: ['red','yellow','blue','white','stripe','circle','star']},
				cambodia: {code: 'KH', name: 'Cambodia', components: ['red','blue','white','stripe','symbol']},
				cameroon: {code: 'CM', name: 'Cameroon', components: ['red','yellow','green','stripe','star']},
				canada: {code: 'CA', name: 'Canada', components: ['red','white','stripe','plant']},
				central_african_republic: {code: 'CF', name: 'Central African Republic', components: ['red','yellow','blue','green','white','block','star']},
				chad: {code: 'TD', name: 'Chad', components: ['red','yellow','blue','stripe']},
				chile: {code: 'CL', name: 'Chile', components: ['red','blue','white','block','star']},
				china: {code: 'CN', name: 'China', components: ['red','yellow','star']},
				colombia: {code: 'CO', name: 'Colombia', components: ['red','yellow','blue','stripe']},
				comoros: {code: 'KM', name: 'Comoros', components: ['red','yellow','blue','green','white','triangle','star','moon']},
				congo: {code: 'CG', name: 'Congo', components: ['red','yellow','blue','stripe','star']},
				costa_rica: {code: 'CR', name: 'Costa Rica', components: ['red','blue','white','stripe','seal','circle']},
				croatia: {code: 'HR', name: 'Croatia', components: ['red','blue','white','stripe','seal','block']},
				cuba: {code: 'CU', name: 'Cuba', components: ['red','blue','white','stripe','triangle','star']},
				cyprus: {code: 'CY', name: 'Cyprus', components: ['yellow','green','white','plant','symbol']},
				czechia: {code: 'CZ', name: 'Czechia', components: ['red','blue','white','triangle']},
				denmark: {code: 'DK', name: 'Denmark', components: ['red','white','cross']},
				djibouti: {code: 'DJ', name: 'Djibouti', components: ['red','blue','green','white','triangle','star']},
				dominica: {code: 'DM', name: 'Dominica', components: ['red','yellow','green','black','white','cross','circle','animal']},
				dominican_republic: {code: 'DR', name: 'Dominican Republic', components: ['red','blue','white','cross','seal','plant']},
				democratic_peoples_republic_of_korea: {code: 'KP', name: 'Democratic People\'s Republic of Korea', components: ['red','blue','white','stripe','circle','star']},
				democratic_republic_of_the_congo: {code: 'CD', name: 'Democratic Republic of the Congo', components: ['red','yellow','blue','stripe','star']},
				ecuador: {code: 'EC', name: 'Ecuador', components: ['red','yellow','blue','stripe','seal','plant','animal']},
				egypt: {code: 'EG', name: 'Egypt', components: ['red','yellow','black','white','stripe','seal','animal']},
				el_salvador: {code: 'sv', name: 'El Salvador', components: ['blue','white','stripe','seal','plant']},
				equatorial_guinea: {code: 'GQ', name: 'Equatorial Guinea', components: ['red','blue','green','white','stripe','seal','triangle','plant']},
				eritrea: {code: 'ER', name: 'Eritrea', components: ['red','yellow','blue','green','seal','triangle','plant']},
				estonia: {code: 'EE', name: 'Estonia', components: ['blue','black','white','stripe']},
				eswatini: {code: 'SZ', name: 'Eswatini', components: ['red','yellow','blue','black','white','stripe','seal']},
				ethiopia: {code: 'ET', name: 'Ethiopia', components: ['red','yellow','blue','green','stripe','seal','circle','star']},
				fiji: {code: 'FJ', name: 'Fiji', components: ['red','blue','white','cross','seal']},
				finland: {code: 'FI', name: 'Finland', components: ['blue','white','cross']},
				france: {code: 'FR', name: 'France', components: ['red','blue','white','stripe']},
				gabon: {code: 'GA', name: 'Gabon', components: ['yellow','blue','green','stripe']},
				gambia: {code: 'GM', name: 'Gambia', components: ['red','blue','green','white','stripe']},
				georgia: {code: 'GE', name: 'Georgia', components: ['red','white','cross']},
				germany: {code: 'DE', name: 'Germany', components: ['red','yellow','black','stripe']},
				ghana: {code: 'GH', name: 'Ghana', components: ['red','yellow','green','black','stripe','star']},
				greece: {code: 'GR', name: 'Greece', components: ['blue','white','stripe','cross']},
				grenada: {code: 'GD', name: 'Grenada', components: ['red','yellow','green','circle','triangle','star','plant']},
				guatemala: {code: 'GT', name: 'Guatemala', components: ['blue','white','stripe','seal','plant','animal','symbol']},
				guinea: {code: 'GN', name: 'Guinea', components: ['red','yellow','green','stripe']},
				guinea_bissau: {code: 'GW', name: 'Guinea-Bissau', components: ['red','yellow','green','block','star']},
				guyana: {code: 'GY', name: 'Guyana', components: ['red','yellow','green','black','white','triangle']},
				haiti: {code: 'HT', name: 'Haiti', components: ['red','blue','white','seal','block','plant','symbol']},
				holy_see: {code: 'VA', name: 'Holy See', components: ['red','yellow','white','seal','block']},
				honduras: {code: 'HN', name: 'Honduras', components: ['blue','white','stripe','star']},
				hungary: {code: 'HU', name: 'Hungary', components: ['red','green','white','stripe']},
				iceland: {code: 'IS', name: 'Iceland', components: ['red','blue','white','cross']},
				india: {code: 'IN', name: 'India', components: ['yellow','blue','green','white','stripe','circle','symbol']},
				indonesia: {code: 'ID', name: 'Indonesia', components: ['red','white','block']},
				iran: {code: 'IR', name: 'Iran', components: ['red','green','white','stripe','symbol']},
				iraq: {code: 'IQ', name: 'Iraq', components: ['red','green','black','white','stripe','symbol']},
				ireland: {code: 'IE', name: 'Ireland', components: ['yellow','green','white','stripe']},
				israel: {code: 'IL', name: 'Israel', components: ['blue','white','stripe','star']},
				italy: {code: 'IT', name: 'Italy', components: ['red','green','white','stripe']},
				jamaica: {code: 'JM', name: 'Jamaica', components: ['yellow','green','black','cross']},
				japan: {code: 'JP', name: 'Japan', components: ['red','white','circle']},
				jordan: {code: 'JO', name: 'Jordan', components: ['red','black','white','stripe','triangle','star']},
				kazakhstan: {code: 'KZ', name: 'Kazakhstan', components: ['yellow','blue','seal','sun','animal']},
				kenya: {code: 'KE', name: 'Kenya', components: ['red','green','black','white','stripe','seal']},
				kiribati: {code: 'KI', name: 'Kiribati', components: ['red','yellow','blue','white','stripe','sun','animal']},
				kuwait: {code: 'KW', name: 'Kuwait', components: ['red','green','black','white','stripe','block']},
				kyrgyzstan: {code: 'KG', name: 'Kyrgyzstan', components: ['red','yellow','seal','sun']},
				laos: {code: 'LA', name: 'Laos', components: ['red','blue','white','stripe','circle']},
				latvia: {code: 'LV', name: 'Latvia', components: ['red','white','stripe']},
				lebanon: {code: 'LB', name: 'Lebanon', components: ['red','green','white','stripe','plant']},
				lesotho: {code: 'LS', name: 'Lesotho', components: ['blue','green','black','white','stripe','seal']},
				liberia: {code: 'LR', name: 'Liberia', components: ['red','blue','white','stripe','star']},
				libya: {code: 'LY', name: 'Libya', components: ['red','green','black','white','stripe','star','moon']},
				liechtenstein: {code: 'LI', name: 'Liechtenstein', components: ['red','yellow','blue','black','symbol']},
				lithuania: {code: 'LT', name: 'Lithuania', components: ['red','yellow','green','stripe']},
				luxembourg: {code: 'LU', name: 'Luxembourg', components: ['red','blue','white','stripe']},
				madagascar: {code: 'MG', name: 'Madagascar', components: ['red','green','white','block']},
				malawi: {code: 'MW', name: 'Malawi', components: ['red','green','black','stripe','sun']},
				malaysia: {code: 'MY', name: 'Malaysia', components: ['red','yellow','blue','white','stripe','star','moon']},
				maldives: {code: 'MV', name: 'Maldives', components: ['red','green','white','block','moon']},
				mali: {code: 'ML', name: 'Mali', components: ['red','yellow','green','stripe']},
				malta: {code: 'MT', name: 'Malta', components: ['red','white','cross','block']},
				marshall_islands: {code: 'MH', name: 'Marshall Islands', components: ['yellow','blue','white','triangle','star']},
				mauritania: {code: 'MR', name: 'Mauritania', components: ['red','yellow','green','stripe','star','moon']},
				mauritius: {code: 'MU', name: 'Mauritius', components: ['red','yellow','blue','green','stripe']},
				mexico: {code: 'MX', name: 'Mexico', components: ['red','green','white','stripe','seal','plant','animal']},
				micronesia: {code: 'FM', name: 'Micronesia', components: ['blue','white','star']},
				moldova: {code: 'MD', name: 'Moldova', components: ['red','yellow','blue','stripe','seal','plant','animal']},
				monaco: {code: 'MC', name: 'Monaco', components: ['red','white','block']},
				mongolia: {code: 'MN', name: 'Mongolia', components: ['red','yellow','blue','stripe','seal','symbol']},
				montenegro: {code: 'ME', name: 'Montenegro', components: ['red','yellow','seal','block','animal']},
				morocco: {code: 'MA', name: 'Morocco', components: ['red','green','star']},
				mozambique: {code: 'MZ', name: 'Mozambique', components: ['red','yellow','green','black','stripe','seal','triangle','star']},
				myanmar: {code: 'MM', name: 'Myanmar', components: ['red','yellow','green','white','stripe','star']},
				namibia: {code: 'NA', name: 'Namibia', components: ['red','yellow','blue','green','white','stripe','sun']},
				nauru: {code: 'NR', name: 'Nauru', components: ['yellow','blue','white','stripe','star']},
				nepal: {code: 'NP', name: 'Nepal', components: ['red','blue','white','triangle','star','moon']},
				netherlands: {code: 'NL', name: 'Netherlands', components: ['red','blue','white','stripe']},
				new_zealand: {code: 'NZ', name: 'New Zealand', components: ['red','blue','white','cross','star']},
				nicaragua: {code: 'NI', name: 'Nicaragua', components: ['blue','white','stripe','seal','triangle','symbol']},
				niger: {code: 'NE', name: 'Niger', components: ['yellow','green','white','stripe','circle']},
				nigeria: {code: 'NG', name: 'Nigeria', components: ['green','white','stripe']},
				north_macedonia: {code: 'MK', name: 'North Macedonia', components: ['red','yellow','sun']},
				norway: {code: 'NO', name: 'Norway', components: ['red','blue','white','cross']},
				oman: {code: 'OM', name: 'Oman', components: ['red','green','white','stripe','seal','block']},
				pakistan: {code: 'PK', name: 'Pakistan', components: ['green','white','block','star','moon']},
				palau: {code: 'PW', name: 'Palau', components: ['yellow','blue','circle']},
				panama: {code: 'PA', name: 'Panama', components: ['red','blue','white','block','star']},
				papua_new_guinea: {code: 'PG', name: 'Papua New Guinea', components: ['red','yellow','black','white','triangle','star','animal']},
				paraguay: {code: 'PY', name: 'Paraguay', components: ['red','blue','white','stripe','seal','triangle','star','plant']},
				peru: {code: 'PE', name: 'Peru', components: ['red','green','white','seal','plant','animal']},
				philippines: {code: 'PH', name: 'Philippines', components: ['red','yellow','blue','white','triangle','star','sun']},
				poland: {code: 'PL', name: 'Poland', components: ['red','white','block']},
				portugal: {code: 'PT', name: 'Portugal', components: ['red','yellow','green','seal','block']},
				qatar: {code: 'QA', name: 'Qatar', components: ['red','white','triangle']},
				romania: {code: 'RO', name: 'Romania', components: ['red','yellow','blue','stripe']},
				russia: {code: 'RU', name: 'Russia', components: ['red','blue','white','stripe']},
				rwanda: {code: 'RW', name: 'Rwanda', components: ['yellow','blue','green','stripe','sun']},
				saint_kitts_and_nevis: {code: 'KN', name: 'Saint Kitts and Nevis', components: ['red','yellow','green','black','white','stripe','star']},
				saint_lucia: {code: 'LC', name: 'Saint Lucia', components: ['yellow','blue','black','triangle']},
				samoa: {code: 'WS', name: 'Samoa', components: ['red','blue','white','block','star']},
				san_marino: {code: 'SM', name: 'San Marino', components: ['blue','green','white','seal','block','plant','symbol']},
				sao_tome_and_principe: {code: 'ST', name: 'Sao Tome and Principe', components: ['red','yellow','green','black','stripe','triangle','star']},
				saudi_arabia: {code: 'SA', name: 'Saudi Arabia', components: ['green','white','symbol']},
				senegal: {code: 'SN', name: 'Senegal', components: ['red','yellow','green','stripe','star']},
				serbia: {code: 'RS', name: 'Serbia', components: ['red','blue','white','seal','animal']},
				seychelles: {code: 'SC', name: 'Seychelles', components: ['red','yellow','blue','green','white','triangle']},
				sierra_leone: {code: 'SL', name: 'Sierra Leone', components: ['blue','green','white','stripe']},
				singapore: {code: 'SG', name: 'Singapore', components: ['red','white','block','star','moon']},
				slovakia: {code: 'SK', name: 'Slovakia', components: ['red','blue','white','stripe','cross','seal']},
				slovenia: {code: 'SI', name: 'Slovenia', components: ['red','blue','white','stripe','seal','star']},
				solomon_islands: {code: 'SB', name: 'Solomon Islands', components: ['yellow','blue','green','white','stripe','star']},
				somalia: {code: 'SO', name: 'Somalia', components: ['blue','white','star']},
				south_africa: {code: 'ZA', name: 'South Africa', components: ['red','yellow','blue','green','black','white','stripe','triangle']},
				south_korea: {code: 'KR', name: 'South Korea', components: ['red','blue','black','white','circle','symbol']},
				south_sudan: {code: 'SS', name: 'South Sudan', components: ['red','yellow','blue','green','black','stripe','triangle','star']},
				spain: {code: 'ES', name: 'Spain', components: ['red','yellow','stripe','seal','symbol']},
				sri_lanka: {code: 'LK', name: 'Sri Lanka', components: ['red','yellow','green','block','animal']},
				st_vincent_grenadines: {code: 'VC', name: 'St. Vincent and the Grenadines', components: ['yellow','blue','green','stripe','block']},
				state_of_palestine: {code: 'PS', name: 'State of Palestine', components: ['red','green','black','white','stripe','triangle']},
				sudan: {code: 'SD', name: 'Sudan', components: ['red','green','black','white','stripe','triangle']},
				suriname: {code: 'SR', name: 'Suriname', components: ['red','yellow','green','white','stripe','star']},
				sweden: {code: 'SE', name: 'Sweden', components: ['yellow','blue','cross']},
				switzerland: {code: 'CH', name: 'Switzerland', components: ['red','white','cross']},
				syria: {code: 'SY', name: 'Syria', components: ['red','green','black','white','stripe','star']},
				tajikistan: {code: 'TJ', name: 'Tajikistan', components: ['red','yellow','green','white','stripe','seal','star']},
				tanzania: {code: 'TZ', name: 'Tanzania', components: ['yellow','blue','green','black','stripe']},
				thailand: {code: 'TH', name: 'Thailand', components: ['red','blue','white','stripe']},
				timor_leste: {code: 'TL', name: 'Timor-Leste', components: ['red','yellow','black','white','triangle','star']},
				togo: {code: 'TG', name: 'Togo', components: ['red','yellow','green','white','stripe','star']},
				tonga: {code: 'TO', name: 'Tonga', components: ['red','white','cross','block']},
				trinidad_and_tobago: {code: 'TT', name: 'Trinidad and Tobago', components: ['red','black','white','stripe','triangle']},
				tunisia: {code: 'TN', name: 'Tunisia', components: ['red','white','circle','star','moon']},
				turkey: {code: 'TR', name: 'Turkey', components: ['red','white','star','moon']},
				turkmenistan: {code: 'TM', name: 'Turkmenistan', components: ['red','green','white','seal','star','moon','plant']},
				tuvalu: {code: 'TV', name: 'Tuvalu', components: ['red','yellow','blue','white','cross','star']},
				united_arab_emirates: {code: 'AE', name: 'United Arab Emirates', components: ['red','green','black','white','stripe','block']},
				united_kingdom: {code: 'GB', name: 'United Kingdom', components: ['red','blue','white','cross']},
				united_states_of_america: {code: 'US', name: 'United States of America', components: ['red','blue','white','stripe','star']},
				uganda: {code: 'UG', name: 'Uganda', components: ['red','yellow','black','white','stripe','circle','animal']},
				ukraine: {code: 'UA', name: 'Ukraine', components: ['yellow','blue','block']},
				uruguay: {code: 'UY', name: 'Uruguay', components: ['yellow','blue','white','stripe','sun']},
				uzbekistan: {code: 'UZ', name: 'Uzbekistan', components: ['red','blue','green','white','stripe','star','moon']},
				vanuatu: {code: 'VU', name: 'Vanuatu', components: ['red','yellow','green','black','stripe','triangle','plant','animal']},
				venezuela: {code: 'VE', name: 'Venezuela', components: ['red','yellow','blue','white','stripe','seal','star','plant']},
				vietnam: {code: 'VN', name: 'Vietnam', components: ['red','yellow','star']},
				yemen: {code: 'YE', name: 'Yemen', components: ['red','black','white','stripe']},
				zambia: {code: 'ZM', name: 'Zambia', components: ['red','yellow','green','black','block','animal']},
				zimbabwe: {code: 'ZW', name: 'Zimbabwe', components: ['red','yellow','green','black','stripe','triangle','star','animal']},
				anguilla: {code: 'AI', name: 'Anguilla', components: ['red','yellow','blue','white','cross','seal','animal']},
				antarctica: {code: 'AQ', name: 'Antarctica', components: ['blue','white','cross','circle','symbol']},
				american_samoa: {code: 'AS', name: 'American Samoa', components: ['red','yellow','blue','white','triangle','animal']},
				aruba: {code: 'AW', name: 'Aruba', components: ['red','yellow','blue','stripe','star']},
				aland_islands: {code: 'AX', name: 'Aland Islands', components: ['red','yellow','blue','cross']},
				bermuda: {code: 'BM', name: 'Bermuda', components: ['red','blue','white','cross','seal','animal']},
				cocos_islands: {code: 'CC', name: 'Cocos Islands', components: ['yellow','green','circle','star','moon','plant']},
				cook_islands: {code: 'CK', name: 'Cook Islands', components: ['red','blue','white','cross','circle','star']},
				curacao: {code: 'CW', name: 'Curacao', components: ['yellow','blue','white','stripe','star']},
				christmas_island: {code: 'CX', name: 'Christmas Island', components: ['yellow','blue','green','white','star','animal','symbol']},
				western_sahara: {code: 'EH', name: 'Western Sahara', components: ['red','green','black','white','stripe','triangle','star','moon']},
				falkland_islands: {code: 'FK', name: 'Falkland Islands', components: ['red','blue','white','cross','seal','animal','symbol']},
				faroe_islands: {code: 'FO', name: 'Faroe Islands', components: ['red','blue','white','cross']},
				french_guiana: {code: 'GF', name: 'French Guiana', components: ['red','yellow','green','triangle','star']},
				guernsey: {code: 'GG', name: 'Guernsey', components: ['red','yellow','white','cross']},
				gibraltar: {code: 'GI', name: 'Gibraltar', components: ['red','white','symbol']},
				greenland: {code: 'GL', name: 'Greenland', components: ['red','white','circle','block']},
				guadeloupe: {code: 'GP', name: 'Guadeloupe', components: ['yellow','blue','green','black','sun','plant']},
				south_georgia_and_the_south_sandwich_islands: {code: 'GS', name: 'South Georgia and the South Sandwich Islands', components: ['red','blue','white','cross','seal','animal','symbol']},
				hong_kong: {code: 'HK', name: 'Hong Kong', components: ['red','white','star','plant']},
				isle_of_man: {code: 'IM', name: 'Isle of Man', components: ['red','white','symbol']},
				british_indian_ocean_territory: {code: 'IO', name: 'British Indian Ocean Territory', components: ['red','blue','white','stripe','cross','plant','symbol']},
				jersey: {code: 'JE', name: 'Jersey', components: ['red','yellow','white','seal','triangle','animal']},
				cayman_islands: {code: 'KY', name: 'Cayman Islands', components: ['red','blue','white','cross','seal','animal','symbol']},
				macao: {code: 'MO', name: 'Macao', components: ['yellow','green','white','stripe','star','plant']},
				northern_mariana_islands: {code: 'MP', name: 'Northern Mariana Islands', components: ['blue','black','white','circle','star','plant']},
				martinique: {code: 'MQ', name: 'Martinique', components: ['blue','white','cross','animal']},
				montserrat: {code: 'MS', name: 'Montserrat', components: ['red','blue','white','cross','seal','symbol']},
				new_caledonia: {code: 'NC', name: 'New Caledonia', components: ['red','yellow','blue','green','black','stripe','circle']},
				norfolk_island: {code: 'NF', name: 'Norfolk Island', components: ['green','white','stripe','plant']},
				niue: {code: 'NU', name: 'Niue', components: ['red','yellow','blue','white','cross','star']},
				french_polynesia: {code: 'PF', name: 'French Polynesia', components: ['red','yellow','blue','white','stripe','circle','sun','symbol']},
				saint_pierre_and_miquelon: {code: 'PM', name: 'Saint Pierre and Miquelon', components: ['red','yellow','blue','green','white','cross','animal','symbol']},
				pitcairn: {code: 'PN', name: 'Pitcairn', components: ['red','yellow','blue','green','white','cross','seal','plant']},
				puerto_rico: {code: 'PR', name: 'Puerto Rico', components: ['red','blue','white','stripe','triangle','star']},
				sint_maarten: {code: 'SX', name: 'Sint Maarten', components: ['red','blue','white','seal','triangle','animal','symbol']},
				turks_and_caicos_islands: {code: 'TC', name: 'Turks and Caicos Islands', components: ['red','yellow','blue','white','cross','seal','plant','animal']},
				french_southern_territories: {code: 'TF', name: 'French Southern Territories', components: ['red','blue','white','stripe','star','symbol']},
				tokelau: {code: 'TK', name: 'Tokelau', components: ['yellow','blue','white','triangle','star']},
				taiwan: {code: 'TW', name: 'Taiwan', components: ['red','blue','white','block','sun']},
				british_virgin_islands: {code: 'VG', name: 'British Virgin Islands', components: ['red','blue','white','cross','seal','symbol']},
				us_virgin_islands: {code: 'VI', name: 'U.S. Virgin Islands', components: ['yellow','blue','green','white','stripe','seal','plant','animal']},
				wallis_and_futuna: {code: 'WF',name: ' Wallis and Futuna', components: ['red','blue','white','stripe','triangle']}
			}
		}

	/* elements */
		const ELEMENTS = {
			game: document.querySelector("#game"),
			launch: {
				form: document.querySelector("#launch-form"),
				flag1: document.querySelector("#launch-flag1"),
				flag2: document.querySelector("#launch-flag2"),
				message: document.querySelector("#launch-message"),
				reset: document.querySelector("#launch-reset"),
				continue: document.querySelector("#launch-continue")
			},
			navigation: {
				form: document.querySelector("#navigation-form"),
				setup: document.querySelector("#navigation-setup"),
				about: document.querySelector("#navigation-about"),
				close: document.querySelector("#navigation-close")
			},
			setup: {
				form: document.querySelector("#setup-form"),
				names: document.querySelector("#setup-names"),
				add: document.querySelector("#setup-add"),
				goal: document.querySelector("#setup-goal"),
				submit: document.querySelector("#setup-submit")
			},
			flags: {
				form: document.querySelector("#flags-form")
			},
			players: {
				form: document.querySelector("#players-form")
			}
		}

	/* gamestate */
		const GAME = {}

/*** tools ***/
	/* getRandom */
		function getRandom() {
			try {
				return Math.floor(Math.random() * 1000000000000000000).toString(36).slice(1, 9)
			} catch (error) { console.log(error) }
		}

	/* chooseRandom */
		function chooseRandom(array) {
			try {
				if (!Array.isArray(array)) {
					return
				}

				return array[Math.floor(Math.random() * array.length)]
			} catch (error) { console.log(error) }
		}


/*** launch / goal ***/
	/* launchGame */
		ELEMENTS.launch.form.addEventListener("submit", launchGame)
		function launchGame(event) {
			try {
				// which button?
					let button = document.activeElement

				// reset
					if (button == ELEMENTS.launch.reset) {
						resetGame()
					}

				// swap state
					ELEMENTS.game.setAttribute("state", "setup")
			} catch (error) { console.log(error) }
		}

	/* resetGame */
		function resetGame() {
			try {
				// clear game object
					GAME.players = {}
					GAME.goal = 0
					GAME.slots = []
					GAME.selectedFlag = null
					GAME.flagsClaimed = []
					GAME.remainingFlags = Object.keys(CONSTANTS.flags)

				// clear players
					ELEMENTS.setup.names.innerHTML = ""
					ELEMENTS.players.form.innerHTML = ""

				// clear flags
					ELEMENTS.flags.form.innerHTML = ""
					ELEMENTS.setup.goal.value = CONSTANTS.defaultFlagGoal
				
				// create some player inputs
					for (let i = 0; i < CONSTANTS.defaultPlayerCount; i++) {
						addPlayerInput()
					}

				// shuffle & display flags
					for (let i = CONSTANTS.defaultFlagOptions; i > 0; i--) {
						addFlagCard(i)
					}
			} catch (error) { console.log(error) }
		}

	/* selectNavigation */
		ELEMENTS.navigation.form.addEventListener("submit", selectNavigation)
		function selectNavigation(event) {
			try {
				// which button?
					let button = document.activeElement

				// setup
					if (button == ELEMENTS.navigation.setup) {
						ELEMENTS.game.setAttribute("state", "setup")
						return
					}

				// about
					if (button == ELEMENTS.navigation.about) {
						ELEMENTS.game.setAttribute("state", "about")
						return
					}

				// close
					if (button == ELEMENTS.navigation.close) {
						if (GAME && GAME.players && Object.keys(GAME.players).length) {
							ELEMENTS.game.setAttribute("state", "flags")
							return
						}
						else {
							ELEMENTS.game.setAttribute("state", "launch")
							return
						}
					}
			} catch (error) { console.log(error) }
		}

/*** setup ***/
	/* saveSetup */
		ELEMENTS.setup.form.addEventListener("submit", saveSetup)
		function saveSetup(event) {
			try {
				// which button?
					let button = document.activeElement

				// add
					if (button == ELEMENTS.setup.add) {
						addPlayerInput()
						return
					}

				// remove
					if (button.className == "setup-remove") {
						removePlayerInput(button)
						return
					}

				// submit
					if (button == ELEMENTS.setup.submit) {
						validateSetup()
						return
					}
			} catch (error) { console.log(error) }
		}

	/* addPlayerInput */
		function addPlayerInput() {
			try {
				// input
					let input = document.createElement("input")
						input.id = "setup-" + getRandom()
						input.type = "text"
						input.className = "setup-input"
						input.placeholder = "PLAYER NAME"
					ELEMENTS.setup.names.appendChild(input)

				// remove
					let button = document.createElement("button")
						button.className = "setup-remove"
					ELEMENTS.setup.names.appendChild(button)
			} catch (error) { console.log(error) }
		}

	/* removePlayerInput */
		function removePlayerInput(button) {
			try {
				// remove preceding input
					let id = button.previousSibling.id.replace("setup-", "")
					button.previousSibling.remove()

				// remove self
					button.remove()

				// remove that player
					if (GAME.players[id]) {
						ELEMENTS.players.form.querySelector("#players-" + id).remove()
						delete GAME.players[id]
					}
			} catch (error) { console.log(error) }
		}

	/* validateSetup */
		function validateSetup() {
			try {
				// assume no errors
					let hasErrors = false

				// goal
					let goalNumber = ELEMENTS.setup.goal.value
					if (!goalNumber || isNaN(goalNumber) || goalNumber < 0) {
						ELEMENTS.setup.goal.setAttribute("invalid", true)
						hasErrors = true
					}
					else {
						ELEMENTS.setup.goal.removeAttribute("invalid")
						GAME.goal = goalNumber
					}

				// names
					let nameInputs = Array.from(ELEMENTS.setup.names.querySelectorAll(".setup-input"))
					let nameValues = []
					for (let i in nameInputs) {
						// check blank
							if (!nameInputs[i].value || !nameInputs[i].value.trim().length) {
								nameInputs[i].setAttribute("invalid", true)
								hasErrors = true
								continue
							}

						// check duplicate
							let thisValue = nameInputs[i].value.trim().toLowerCase()
							if (nameValues.includes(thisValue)) {
								nameInputs[i].setAttribute("invalid", true)
								hasErrors = true
								continue
							}
						
						// save and continue
							nameValues.push(thisValue)
							nameInputs[i].removeAttribute("invalid")
					}

				// errors?
					if (hasErrors) {
						return
					}

				// set players
					for (let i in nameInputs) {
						// get parameters
							let id = nameInputs[i].id.replace("setup-", "")
							let value = nameInputs[i].value.trim()

						// upsert player
							if (!GAME.players[id]) {
								// add player object
									GAME.players[id] = {
										name: "",
										flags: []
									}

								// add player to list
									addPlayerButton(id)
							}
						
						// save name
							GAME.players[id].name = value
							let playerButton = ELEMENTS.players.form.querySelector("#players-" + id + " .players-button-name")
							if (playerButton) {
								playerButton.innerText = value
							}
					}

				// swap state
					ELEMENTS.game.setAttribute("state", "flags")
			} catch (error) { console.log(error) }
		}

/*** flags ***/
	/* selectFlag */
		ELEMENTS.flags.form.addEventListener("submit", selectFlag)
		function selectFlag(event) {
			try {
				// which button?
					let button = document.activeElement

				// set selected flag
					GAME.selectedFlag = button

				// swap state
					ELEMENTS.game.setAttribute("state", "players")
			} catch (error) { console.log(error) }
		}

	/* addFlagCard */
		function addFlagCard(value) {
			try {
				// random flag
					let randomFlagName = chooseRandom(GAME.remainingFlags)
					GAME.remainingFlags = GAME.remainingFlags.filter(function(flagName) {
						return flagName !== randomFlagName
					}) || []

				// get data
					let flagData = CONSTANTS.flags[randomFlagName]
					GAME.slots.push(randomFlagName)

				// card
					let card = document.createElement("label")
						card.className = "flags-label"
					ELEMENTS.flags.form.appendChild(card)

				// button
					let button = document.createElement("button")
						button.className = "flags-button"
						button.setAttribute("flag", randomFlagName)
					card.appendChild(button)

				// name
					let name = document.createElement("div")
						name.className = "flags-name"
						name.innerText = flagData.name
					button.appendChild(name)

				// card bonus
					let cardsCount = document.createElement("div")
						cardsCount.className = "flags-cards-count"
						cardsCount.innerText = value || "0"
					button.appendChild(cardsCount)

					let image = document.createElement("div")
						image.className = "flags-image"
						image.style.backgroundImage = "url(flags/" + flagData.code + ".png)"
					button.appendChild(image)

				// components
					let componentsList = document.createElement("div")
						componentsList.className = "flags-components"
					button.appendChild(componentsList)

					for (let i in flagData.components) {
						let icon = document.createElement("div")
							icon.className = "flags-icon"
							icon.setAttribute("component", flagData.components[i])
						componentsList.appendChild(icon)
					}
			} catch (error) { console.log(error) }
		}

/*** players ***/
	/* selectPlayer */
		ELEMENTS.players.form.addEventListener("submit", selectPlayer)
		function selectPlayer(event) {
			try {
				// which button?
					let button = document.activeElement

				// claimFlag
					claimFlag(button)
			} catch (error) { console.log(error) }
		}

	/* addPlayerButton */
		function addPlayerButton(id) {
			try {
				// button
					let button = document.createElement("button")
						button.className = "players-button"
						button.id = "players-" + id
					ELEMENTS.players.form.appendChild(button)

				// name
					let name = document.createElement("div")
						name.className = "players-button-name"
					button.appendChild(name)

				// score
					let score = document.createElement("div")
						score.className = "players-button-score"
						score.innerText = 0
					button.appendChild(score)

					let flag = document.createElement("div")
						flag.className = "players-button-flag"
					button.appendChild(flag)
			} catch (error) { console.log(error) }
		}

	/* claimFlag */
		function claimFlag(button) {
			try {
				// get player
					let id = button.id.replace("players-", "")
					if (!GAME.players[id]) {
						return
					}

				// get flag
					let flagName = GAME.selectedFlag.getAttribute("flag")

				// move to claimed
					GAME.slots = GAME.slots.filter(function(f) {
						return f !== flagName
					}) || []
					GAME.flagsClaimed.push(flagName)
					GAME.players[id].flags.push(flagName)

				// increase score
					ELEMENTS.players.form.querySelector("#players-" + id + " .players-button-score").innerText = GAME.players[id].flags.length

				// slide flags
					let currentCard = GAME.selectedFlag.closest(".flags-label").nextSibling || null
					while (currentCard) {
						// increase value
							let cardCount = Number(currentCard.querySelector(".flags-cards-count").innerText)
							currentCard.querySelector(".flags-cards-count").innerText = cardCount + 1

						// next card
							if (!currentCard.nextSibling) {
								break
							}
							currentCard = currentCard.nextSibling
					}

				// remove this flag
					GAME.selectedFlag.closest(".flags-label").remove()
					GAME.selectedFlag = null

				// new flag
					addFlagCard(1)

				// check for victory
					if (GAME.players[id].flags.length >= GAME.goal) {
						ELEMENTS.launch.message.innerText = GAME.players[id].name + " wins!"
						ELEMENTS.game.setAttribute("state", "goal")
						return
					}

				// swap state
					ELEMENTS.game.setAttribute("state", "flags")
			} catch (error) { console.log(error) }
		}
