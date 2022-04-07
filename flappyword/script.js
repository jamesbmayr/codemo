/*** globals ***/
	/* triggers */
		const TRIGGERS = {
			click: "click",
			input: "input",
			keydown: "keydown"
		}

	/* elements */
		const ELEMENTS = {
			input: document.querySelector("#input"),
			score: document.querySelector("#score"),
			game: document.querySelector("#game"),
			word: document.querySelector("#word"),
			backgroundWord: document.querySelector("#background-word"),
			wings: document.querySelector("#wings"),
			reset: document.querySelector("#reset"),
			obstacles: document.querySelector("#obstacles")
		}

	/* constants */
		const CONSTANTS = {
			flapCooldownLoops: 3,
			ascendCooldownLoops: 10,
			VYStart: -3,
			YpercentStart: 50,
			YpercentVelocityUpMax: 4,
			YpercentAccelerationDown: 0.25,
			YpercentVelocityDownMax: 1.25,
			XpercentPerLoopPerScore: 0.05,
			XscoreBaseline: 5,
			XpercentPerObstacle: 5,
			XpercentPerObstacleGap: 40,
			YpercentPerGapMax: 70,
			YpercentPerGapMin: 30,
			YpercentPerGapEdge: 10,
			msPerLoop: 50,
			alphabet: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
			dictionaryCounts: null
		}

	/* state */
		const STATE = {
			playing: false,
			score: 0,
			word: "",
			wordIndex: 0,
			x: 0,
			y: 0,
			vy: 0,
			letters: [],
			backgroundLetters: [],
			obstacles: [],
			obstacleCooldown: 0,
			ascendCooldown: 0,
			flapCooldown: 0,
			loop: null
		}

	/* dictionary */
		const DICTIONARY = {
			"a": ["ability","able","abortion","about","above","abroad","absence","absent","absolute","abstract","abuse","academic","academy","accent","accept","accepted","accepts","access","accessed","accident","account","accounts","accuracy","accurate","accused","achieve","achieved","acid","acids","acne","acoustic","acquire","acquired","acre","acres","acrobat","across","acrylic","acting","action","actions","active","actively","activity","actor","actors","actress","acts","actual","actually","acute","adapted","adapter","adapters","adaptive","adaptor","added","adding","addition","address","adds","adequate","adjacent","adjust","adjusted","admin","admit","admitted","adobe","adopt","adopted","adoption","adult","adults","advance","advanced","advances","adverse","advert","advice","advise","advised","advisor","advisors","advisory","advocacy","advocate","adware","aerial","affair","affairs","affect","affected","affects","afford","afraid","africa","african","after","again","against","aged","agencies","agency","agenda","agent","agents","ages","aging","agree","agreed","agrees","ahead","aids","aimed","aims","aircraft","airfare","airline","airlines","airplane","airport","airports","alarm","album","albums","alcohol","alert","alerts","algebra","alias","alien","align","alike","alive","alleged","allergy","alliance","allied","allow","allowed","allowing","allows","alloy","almost","alone","along","alpha","alpine","already","also","alter","altered","although","alto","aluminum","alumni","always","amateur","amazing","amazon","amber","ambient","amend","amended","america","american","americas","amino","among","amongst","amount","amounts","anal","analog","analyses","analysis","analyst","analysts","analyze","analyzed","anatomy","anchor","ancient","angel","angels","anger","angle","angry","animal","animals","animated","anime","annex","announce","annoying","annual","annually","another","answer","answered","answers","antenna","anti","antibody","antique","antiques","anxiety","anybody","anymore","anyone","anything","anytime","anyway","anywhere","apache","apart","apparel","apparent","appeal","appeals","appear","appeared","appears","appendix","apple","applied","applies","apply","applying","approach","approval","approve","approved","apps","april","aqua","aquarium","aquatic","arab","arabia","arabic","arbor","arcade","arch","archive","archived","archives","arctic","area","areas","arena","argue","argued","argument","arise","arising","armed","armor","arms","army","around","arrange","arranged","array","arrest","arrested","arrival","arrivals","arrive","arrived","arrives","arrow","article","articles","artist","artistic","artists","arts","artwork","asbestos","asia","asian","aside","asked","asking","asks","aspect","aspects","assault","assembly","assess","assessed","asset","assets","assign","assigned","assist","assisted","assists","assume","assumed","assumes","assuming","assure","assured","asthma","asylum","athletes","athletic","atlantic","atlas","atom","atomic","attach","attached","attack","attacked","attacks","attempt","attempts","attend","attended","attitude","attorney","attract","auburn","auction","auctions","audience","audio","audit","auditor","august","aurora","author","authors","auto","autos","autumn","avatar","avenue","average","aviation","avoid","avoiding","award","awarded","awards","aware","away","awesome","awful","axis"],
			"b": ["babe","babes","babies","baby","bachelor","back","backed","backing","backup","bacon","bacteria","badge","badly","bags","baker","baking","balance","balanced","bald","ball","ballet","balloon","ballot","balls","banana","band","bands","bang","bank","banking","banks","banned","banner","banners","baptist","bare","barely","bargain","bargains","barn","barrel","barrier","barriers","bars","base","baseball","based","baseline","basement","basename","bases","basic","basics","basin","basis","basket","baskets","bass","batch","bath","bathroom","baths","battery","battle","beach","beaches","beads","beam","bean","beans","bear","bearing","bears","beast","beat","beats","beauty","beaver","became","because","become","becomes","becoming","bedding","bedroom","bedrooms","beds","beef","been","beer","before","began","begin","beginner","begins","begun","behalf","behavior","behind","being","beings","belief","beliefs","believe","believed","believes","bell","belle","belly","belong","belongs","below","belt","belts","bench","bend","beneath","benefit","benefits","bent","berry","beside","besides","best","beta","better","betting","between","beverage","beyond","bias","bible","biblical","bicycle","bidder","bidding","bids","bigger","biggest","bike","bikes","bikini","bill","billing","billion","bills","binary","bind","binding","bingo","biology","bios","bird","birds","birth","birthday","bishop","bite","bits","bizarre","black","blacks","blade","blades","blah","blame","blank","blanket","blast","bleeding","blend","bless","blessed","blind","blink","block","blocked","blocking","blocks","blog","blogger","bloggers","blogging","blogs","blond","blonde","blood","bloody","bloom","blow","blowing","blue","blues","board","boards","boat","boating","boats","bodies","body","bold","bolt","bomb","bond","bondage","bonds","bone","bones","bonus","book","booking","bookings","bookmark","books","bool","boolean","boom","boost","boot","booth","boots","booty","border","borders","bored","boring","born","borough","boss","both","bother","bottle","bottles","bottom","bought","boulder","bound","boundary","bouquet","boutique","bowl","bowling","boxed","boxes","boxing","boys","bracelet","bracket","brain","brake","brakes","branch","branches","brand","brands","bras","brass","brave","breach","bread","break","breaking","breaks","breast","breath","breed","breeding","breeds","brick","bridal","bride","bridge","bridges","brief","briefing","briefly","briefs","bright","bring","bringing","brings","broad","broader","broadway","brochure","broke","broken","broker","brokers","bronze","brook","brooks","brother","brothers","brought","brown","browse","browser","browsers","browsing","brunette","brush","brutal","bubble","buck","bucks","buddy","budget","budgets","buffalo","buffer","bugs","build","builder","builders","building","builds","built","bulk","bull","bullet","bulletin","bumper","bunch","bundle","bunny","burden","bureau","buried","burn","burner","burning","burns","burst","buses","bush","business","busty","busy","butler","butt","butter","button","buttons","butts","buyer","buyers","buying","buys","buzz","byte","bytes"],
			"c": ["cabin","cabinet","cabinets","cable","cables","cache","cached","cafe","cage","cake","cakes","calcium","calendar","call","called","calling","calls","calm","came","camel","camera","cameras","camp","campaign","camping","camps","campus","cams","canal","cancel","cancer","candle","candles","candy","cannon","canon","cant","canvas","canyon","capable","capacity","cape","capital","capitol","caps","captain","capture","captured","carb","carbon","card","cardiac","cards","care","career","careers","careful","cargo","caring","carnival","carol","carpet","carried","carrier","carriers","carries","carry","carrying","cars","cart","carter","cartoon","cartoons","casa","case","cases","cash","cashiers","casino","casinos","cassette","cast","casting","castle","casual","catalog","catalogs","catalyst","catch","category","catering","catholic","cats","cattle","caught","cause","caused","causes","causing","caution","cave","cedar","ceiling","cell","cells","cellular","cement","cemetery","census","cent","center","centered","centers","central","centre","cents","century","ceramic","ceremony","certain","chad","chain","chains","chair","chairman","chairs","chamber","chambers","champion","chance","chances","change","changed","changes","changing","channel","channels","chaos","chapel","chapter","chapters","char","charge","charged","charger","chargers","charges","charging","charity","charm","charming","charms","chart","charter","charts","chase","chassis","chat","cheap","cheaper","cheapest","cheat","cheats","check","checked","checking","checkout","checks","cheers","cheese","chef","chem","chemical","cheque","cherry","chess","chest","chevy","chick","chicken","chicks","chief","child","children","chip","chips","choice","choices","choir","choose","choosing","chorus","chose","chosen","chrome","chronic","chubby","chuck","church","churches","cinema","circle","circles","circuit","circuits","circular","circus","citation","cite","cited","cities","citizen","citizens","city","civic","civil","civilian","claim","claimed","claims","clan","clarity","clark","class","classes","classic","classics","clause","clay","clean","cleaner","cleaners","cleaning","cleanup","clear","cleared","clearing","clearly","clerk","click","clicking","clicks","client","clients","cliff","climate","climb","climbing","clinic","clinical","clinics","clip","clips","clock","clocks","clone","close","closed","closely","closer","closes","closest","closing","closure","cloth","clothes","clothing","cloud","clouds","cloudy","club","clubs","cluster","clusters","coach","coaches","coaching","coal","coast","coastal","coat","coated","coating","cocktail","code","codes","coding","coffee","cohen","coin","coins","cold","collapse","collar","collect","college","colleges","cologne","colon","colonial","colony","color","colored","colors","column","columns","combat","combine","combined","combines","combo","come","comedy","comes","comfort","comic","comics","coming","comm","command","commands","comment","comments","commerce","commit","common","commonly","commons","comp","compact","company","compare","compared","compete","compile","compiled","compiler","complete","complex","comply","composed","composer","compound","compute","computed","computer","concept","concepts","concern","concerns","concert","concerts","conclude","concord","concrete","condo","condos","conduct","confirm","conflict","confused","congress","connect","cons","consent","consider","consist","consists","console","consoles","const","constant","consult","consumer","contact","contacts","contain","contains","content","contents","contest","contests","context","continue","contract","contrary","contrast","control","controls","convert","cook","cookbook","cooked","cookie","cookies","cooking","cool","cooler","cooling","cope","copied","copies","copper","copy","copying","coral","cord","cordless","core","cork","corn","corner","corners","corp","corps","corpus","correct","cosmetic","cost","costs","costume","costumes","cottage","cottages","cotton","could","council","councils","counsel","count","counted","counter","counters","counties","counting","country","counts","county","couple","coupled","couples","coupon","coupons","courage","courier","course","courses","court","courtesy","courts","cove","cover","coverage","covered","covering","covers","cowboy","crack","cradle","craft","crafts","crap","craps","crash","crazy","cream","create","created","creates","creating","creation","creative","creator","creature","credit","credits","creek","crest","crew","cricket","crime","crimes","criminal","crisis","criteria","critical","critics","crop","crops","cross","crossing","crowd","crown","crucial","crude","cruise","cruises","crystal","cube","cubic","cuisine","cult","cultural","culture","cultures","cups","cure","curious","currency","current","cursor","curve","curves","custody","custom","customer","customs","cute","cuts","cutting","cyber","cycle","cycles","cycling","cylinder"],
			"d": ["daddy","daily","dairy","daisy","damage","damaged","damages","dame","dance","dancing","danger","danish","dare","dark","darkness","dash","data","database","date","dated","dates","dating","daughter","dawn","days","dead","deadline","deadly","deaf","deal","dealer","dealers","dealing","deals","dealt","dean","dear","death","deaths","debate","debt","debug","debut","decade","decades","december","decent","decide","decided","decimal","decision","deck","declare","declared","decline","declined","decor","decrease","deemed","deep","deeper","deeply","deer","default","defeat","defects","defend","defense","deferred","deficit","define","defined","defines","defining","degree","degrees","delay","delayed","delays","delete","deleted","delight","deliver","delivers","delivery","delta","deluxe","demand","demands","demo","democrat","denial","denied","dense","density","dental","dentists","deny","depend","depends","deposit","deposits","depot","depth","deputy","derby","derived","describe","desert","deserve","design","designed","designer","designs","desire","desired","desk","desktop","desktops","despite","destiny","destroy","detail","detailed","details","detect","detected","detector","develop","develops","deviant","device","devices","devil","devoted","diabetes","diagram","dial","dialog","dialogue","diameter","diamond","diamonds","diary","dice","died","dies","diesel","diet","dietary","differ","digest","digit","digital","dining","dinner","diploma","direct","directed","directly","director","dirt","dirty","disable","disabled","disagree","disaster","disc","disclose","disco","discount","discover","discrete","discs","discuss","disease","diseases","dish","dishes","disk","disks","disorder","dispatch","display","displays","disposal","dispute","disputes","distance","distant","distinct","district","dive","diverse","divide","divided","dividend","divine","diving","division","divorce","divx","dock","docs","doctor","doctors","doctrine","document","dodge","does","dogs","doing","doll","dollar","dollars","dolls","domain","domains","dome","domestic","dominant","donate","donated","donation","done","donor","donors","doom","door","doors","dosage","dose","double","doubt","dover","down","download","downtown","dozen","dozens","draft","drag","dragon","drain","drainage","drama","dramatic","draw","drawing","drawings","drawn","draws","dream","dreams","dress","dressed","dresses","dressing","drew","dried","drill","drilling","drink","drinking","drinks","drive","driven","driver","drivers","drives","driving","drop","dropped","drops","drove","drug","drugs","drum","drums","drunk","dryer","dual","duck","dude","duke","dumb","dump","durable","duration","during","dust","duties","duty","dying","dynamic","dynamics"],
			"e": ["each","eagle","eagles","earlier","earliest","early","earn","earned","earning","earnings","earrings","ears","earth","ease","easier","easily","east","easter","eastern","easy","eating","ebony","ebook","ebooks","echo","eclipse","ecology","economic","economy","eden","edge","edges","edit","edited","editing","edition","editions","editor","editors","educated","effect","effects","effort","efforts","eggs","eight","either","elder","elderly","elect","elected","election","electric","electro","electron","elegant","element","elements","elephant","eleven","eligible","elite","else","email","emails","embassy","embedded","emerald","emerging","emission","emotions","emperor","emphasis","empire","employ","employed","employee","employer","empty","enable","enabled","enables","enabling","enclosed","encoding","ended","ending","endless","endorsed","ends","enemies","enemy","energy","engage","engaged","engaging","engine","engineer","engines","enhance","enhanced","enjoy","enjoyed","enjoying","enlarge","enormous","enough","enquiry","enrolled","ensemble","ensure","ensures","ensuring","enter","entered","entering","enters","entire","entirely","entities","entitled","entity","entrance","entries","entry","envelope","enzyme","epic","episode","episodes","equal","equality","equally","equation","equipped","equity","erotic","error","errors","escape","escort","escorts","essay","essays","essence","estate","estates","estimate","eternal","ethernet","ethical","ethics","ethnic","euro","europe","european","euros","evaluate","even","evening","event","events","ever","every","everyday","everyone","evidence","evident","evil","exact","exactly","exam","examine","examined","examines","example","examples","exams","exceed","excel","except","excerpt","excess","exchange","excited","exciting","exclude","excluded","excuse","exec","execute","executed","exempt","exercise","exhaust","exhibit","exhibits","exist","existed","existing","exists","exit","exotic","expand","expanded","expect","expected","expects","expense","expenses","expert","experts","expired","expires","explain","explains","explicit","explore","explorer","expo","export","exports","exposed","exposure","express","extend","extended","extends","extent","exterior","external","extra","extract","extras","extreme","eyed","eyes"],
			"f": ["fabric","fabrics","fabulous","face","faced","faces","facial","facility","facing","fact","factor","factors","factory","facts","faculty","fail","failed","failing","fails","failure","failures","fair","fairly","fairy","faith","fake","fall","fallen","falling","falls","false","fame","familiar","families","family","famous","fancy","fans","fantasy","fare","fares","farm","farmer","farmers","farming","farms","fashion","fast","faster","fastest","fatal","fate","father","fathers","fatty","fault","favor","favorite","favors","fear","fears","feat","feature","featured","features","february","federal","feed","feedback","feeding","feeds","feel","feeling","feelings","feels","fees","feet","fell","fellow","felt","female","females","fence","ferry","festival","fetish","fever","fewer","fiber","fiction","field","fields","fifteen","fifth","fifty","fight","fighter","fighters","fighting","figure","figured","figures","file","filed","filename","files","filing","fill","filled","filling","film","films","filter","filters","final","finally","finals","finance","finances","find","finder","finding","findings","finds","fine","finest","finger","fingers","finish","finished","finite","fire","fired","fires","firewall","firewire","firm","firms","firmware","first","fiscal","fish","fisher","fishing","fist","fisting","fitness","fits","fitted","fitting","five","fixed","fixes","fixtures","flag","flags","flame","flash","flashers","flashing","flat","flavor","fleece","fleet","flesh","flex","flexible","flight","flights","flip","float","floating","flood","floor","flooring","floors","floppy","floral","florist","florists","flour","flow","flower","flowers","flows","fluid","flush","flux","flyer","flying","foam","focal","focus","focused","focuses","focusing","fold","folder","folders","folding","folk","folks","follow","followed","follows","font","fonts","food","foods","fool","foot","footage","football","footwear","force","forced","forces","ford","forecast","foreign","forest","forestry","forests","forever","forge","forget","forgot","fork","form","formal","format","formats","formed","former","formerly","forming","forms","formula","fort","forth","fortune","forty","forum","forums","forward","fossil","foster","fought","foul","found","founded","founder","fountain","four","fourth","fraction","frame","framed","frames","framing","frank","fraud","free","freedom","freely","freeware","freeze","freight","frequent","fresh","friday","fridge","friend","friendly","friends","frog","from","front","frontier","frost","frozen","fruit","fruits","fuel","full","fully","function","fund","funded","funding","funds","funeral","funk","funky","funny","further","fusion","future","futures","fuzzy"],
			"g": ["gadgets","gage","gain","gained","gains","galaxy","gale","gallery","gambling","game","games","gaming","gamma","gang","gaps","garage","garbage","garden","gardens","garlic","gasoline","gate","gates","gateway","gather","gathered","gauge","gave","gazette","gear","geek","gender","gene","general","generate","generic","generous","genes","genesis","genetic","genetics","genius","genome","genre","genres","gentle","gently","genuine","geology","geometry","gets","getting","ghost","giant","giants","gift","gifts","girl","girls","give","given","gives","giving","glad","glance","glass","glasses","glen","global","globe","glory","glossary","gloves","glow","glucose","gnome","goal","goals","goat","gods","goes","going","gold","golden","golf","gone","gonna","good","goods","gore","gorgeous","gospel","gossip","gothic","gotten","gourmet","governor","grab","grace","grad","grade","grades","graduate","grain","grammar","grams","grand","granny","grant","granted","grants","graph","graphic","graphics","graphs","grass","grateful","grave","gravity","gray","great","greater","greatest","greatly","green","greeting","grew","grey","grid","griffin","grill","grip","grocery","groove","gross","ground","grounds","group","groups","grove","grow","growing","grown","grows","growth","guard","guardian","guards","guess","guest","guests","guidance","guide","guided","guides","guild","guilty","guinea","guitar","guitars","gulf","guns","guru","guys"],
			"h": ["habitat","habits","hack","hacker","hair","hairy","half","hall","halo","hammer","hand","handbags","handbook","handed","handheld","handle","handled","handles","handling","handmade","hands","handy","hang","hanging","happen","happened","happens","happy","harbor","hard","hardcore","harder","hardly","hardware","hardwood","harm","harmful","harmony","harvest","harvey","hash","hate","hats","have","haven","having","hawk","hazard","hazards","head","headed","header","headers","heading","headline","heads","headset","healing","health","healthy","hear","heard","hearing","hearings","heart","hearts","heat","heated","heater","heath","heather","heating","heaven","heavily","heavy","heel","height","heights","held","hell","hello","helmet","help","helped","helpful","helping","helps","hence","herald","herb","herbal","herbs","here","hereby","herein","heritage","hero","heroes","herself","hidden","hide","high","higher","highest","highland","highly","highs","highway","highways","hiking","hill","hills","himself","hindu","hint","hints","hire","hired","hiring","hispanic","hist","historic","history","hits","hitting","hobbies","hobby","hockey","hold","holder","holders","holding","holdings","holds","hole","holes","holiday","holidays","hollow","holly","holy","home","homeland","homeless","homepage","homes","hometown","homework","honest","honey","honor","honors","hood","hook","hope","hoped","hopes","hoping","horizon","hormone","horn","horrible","horror","horse","horses","hose","hospital","host","hosted","hostel","hostels","hosting","hosts","hotel","hotels","hotmail","hottest","hour","hourly","hours","house","houses","housing","however","huge","hull","human","humanity","humans","humidity","humor","hundred","hundreds","hung","hunger","hungry","hunt","hunter","hunting","hurt","husband","hybrid","hydrogen","hygiene"],
			"i": ["icon","icons","idea","ideal","ideas","identify","identity","idle","idol","ignore","ignored","illegal","illness","image","images","imagine","imaging","immune","impact","impacts","impaired","imperial","implied","implies","import","imported","imports","impose","imposed","improve","improved","inbox","incest","inch","inches","incident","include","included","includes","income","incoming","increase","incurred","indeed","index","indexed","indexes","indicate","indices","indie","indirect","indoor","induced","industry","infant","infants","infected","infinite","info","inform","informal","informed","infrared","initial","injured","injuries","injury","inkjet","inline","inner","innocent","inns","input","inputs","inquire","inquiry","insects","insert","inserted","inside","insider","insight","insights","inspired","install","instance","instant","instead","insulin","insured","intake","integer","integral","intel","intend","intended","intense","intent","inter","interact","interest","interim","interior","internal","internet","interval","intimate","into","intranet","intro","invalid","invasion","invest","investor","invite","invited","invoice","involve","involved","involves","iron","isbn","islam","islamic","island","islands","isle","isolated","issue","issued","issues","italic","item","items","itself","ivory"],
			"j": ["jack","jacket","jackets","jade","jaguar","jail","january","java","jazz","jean","jeans","jersey","jets","jewel","jewelry","jewish","jews","jobs","join","joined","joining","joins","joint","joke","jokes","jones","journal","journals","journey","judge","judges","judgment","judicial","juice","july","jump","jumping","junction","june","jungle","junior","junk","jury","just","justice","justify","juvenile"],
			"k": ["karaoke","karma","keen","keep","keeping","keeps","kept","kernel","keyboard","keys","keyword","keywords","kick","kidney","kids","kill","killed","killer","killing","kills","kind","kinds","king","kingdom","kings","kiss","kissing","kitchen","kits","kitty","knee","knew","knife","knight","knights","knit","knitting","knives","knock","know","knowing","known","knows"],
			"l": ["label","labeled","labels","labor","labour","labs","lace","lack","ladder","laden","ladies","lady","laid","lake","lakes","lamb","lambda","lamp","lamps","lance","land","landing","lands","lane","lanes","lang","language","laptop","laptops","large","largely","larger","largest","laser","last","lasting","late","lately","later","latest","latex","latin","latina","latino","latitude","latter","laugh","laughing","launch","launched","launches","laundry","lawn","laws","lawsuit","lawyer","lawyers","layer","layers","layout","lazy","lead","leader","leaders","leading","leads","leaf","league","lean","learn","learned","learners","learning","lease","leasing","least","leather","leave","leaves","leaving","lecture","lectures","left","legacy","legal","legally","legend","legends","legs","leisure","lemon","lender","lenders","lending","length","lens","lenses","lesbian","lesbians","less","lesser","lesson","lessons","lets","letter","letters","letting","level","levels","levy","liable","liberal","liberty","library","license","licensed","licenses","licking","lies","life","lifetime","lift","light","lightbox","lighter","lighting","lights","like","liked","likely","likes","likewise","lime","limit","limited","limiting","limits","line","linear","lined","lines","lingerie","link","linked","linking","links","linux","lion","lions","lips","liquid","list","listed","listen","listing","listings","lists","lite","literacy","literary","little","live","lived","liver","lives","living","load","loaded","loading","loads","loan","loans","lobby","local","locale","locally","locate","located","location","locator","lock","locked","locking","locks","lodge","lodging","logged","logging","logic","logical","login","logo","logos","logs","lone","lonely","long","longer","longest","look","looked","looking","looks","lookup","loop","loops","loose","lord","lose","losing","loss","losses","lost","lots","lottery","lotus","loud","lounge","love","loved","lovely","lover","lovers","loves","loving","lower","lowest","lows","luck","lucky","luggage","lunch","lung","luxury","lying","lyric","lyrics"],
			"m": ["machine","machines","macro","made","madness","magazine","magic","magical","magnet","magnetic","maiden","mail","mailed","mailing","mailman","mails","main","mainland","mainly","maintain","major","majority","make","maker","makers","makes","makeup","making","male","males","mall","mambo","manage","managed","manager","managers","managing","mandate","manga","manner","manor","manual","manually","manuals","many","maple","mapping","maps","marathon","marble","march","margin","marina","marine","maritime","mark","marked","marker","markers","market","markets","marking","marks","marriage","married","mars","marsh","mart","martial","martin","marvel","mask","mason","mass","massage","massive","master","masters","match","matched","matches","matching","mate","material","math","mating","matrix","mats","matter","matters","mattress","mature","maximize","maximum","maybe","mayor","meal","meals","mean","meaning","means","meant","measure","measured","measures","meat","medal","media","median","medical","medicine","medieval","medium","meet","meeting","meetings","meets","meetup","mega","member","members","membrane","memo","memorial","memories","memory","mental","mention","mentor","menu","menus","merchant","mercury","mercy","mere","merely","merge","merger","merit","merry","mesa","mesh","mess","message","messages","meta","metadata","metal","metallic","metals","meter","meters","method","methods","metric","metro","mice","micro","middle","midi","midlands","midnight","midwest","might","mighty","mild","mile","mileage","miles","military","milk","mill","miller","million","millions","mills","mime","mind","minds","mine","mineral","minerals","mines","mini","minimal","minimize","minimum","mining","minister","ministry","minor","minority","mint","minus","minute","minutes","miracle","mirror","mirrors","miss","missed","missile","missing","mission","missions","mistake","mistakes","mistress","mixed","mixer","mixing","mixture","mobile","mobiles","mobility","mode","model","modeling","models","modem","modems","moderate","modern","modes","modified","modify","mods","modular","module","modules","moisture","mold","moment","moments","momentum","moms","monday","monetary","money","monitor","monitors","monkey","mono","monster","monsters","month","monthly","months","mood","moon","moral","more","moreover","morning","mortgage","moss","most","mostly","motel","motels","mother","mothers","motion","motor","motors","mount","mountain","mounted","mounting","mounts","mouse","mouth","move","moved","movement","movers","moves","movie","movies","moving","much","multi","multiple","murder","muscle","muscles","museum","museums","music","musical","musician","muslim","muslims","must","mustang","mutual","myself","mystery","myth"],
			"n": ["nail","nails","naked","name","named","namely","names","nano","narrow","nasty","nation","national","nations","native","nato","natural","naturals","nature","naughty","naval","navigate","navy","near","nearby","nearest","nearly","neck","necklace","need","needed","needle","needs","negative","neighbor","neither","neon","nerve","nervous","nest","nested","netscape","network","networks","neural","neutral","never","newbie","newer","newest","newly","news","next","nice","nick","nickel","nickname","night","nights","nine","nipple","nipples","nirvana","nitrogen","noble","nobody","node","nodes","noise","none","noon","norm","normal","normally","north","northern","norton","nose","note","notebook","noted","notes","nothing","notice","noticed","notices","notified","notify","notion","nova","novel","novels","novelty","november","nowhere","nuclear","nude","nudist","nudity","nuke","null","number","numbers","numeric","numerous","nurse","nursery","nurses","nursing","nuts","nylon"],
			"o": ["oaks","oasis","obesity","object","objects","observe","observed","observer","obtain","obtained","obvious","occasion","occupied","occur","occurred","occurs","ocean","october","odds","offense","offer","offered","offering","offers","office","officer","officers","offices","official","offline","offset","offshore","often","oils","okay","older","oldest","olive","olympic","olympics","omega","once","ones","ongoing","onion","online","only","onto","oops","open","opened","opening","openings","opens","opera","operate","operated","operates","operator","opinion","opinions","opponent","opposed","opposite","optical","optics","optimal","optimize","optimum","option","optional","options","oracle","oral","orange","orbit","order","ordered","ordering","orders","ordinary","organ","organic","organize","oriented","origin","original","origins","other","others","ought","ours","outcome","outcomes","outdoor","outdoors","outer","outlet","outlets","outline","outlined","outlook","output","outputs","outreach","outside","oval","oven","over","overall","overcome","overhead","overseas","overview","owned","owner","owners","owns","oxide","oxygen","ozone"],
			"p": ["pace","pacific","pack","package","packages","packed","packet","packets","packing","packs","pads","page","pages","paid","pain","painful","paint","painted","painting","pair","pairs","palace","pale","palm","palmer","panama","panel","panels","panic","panties","pants","paper","papers","para","parade","paradise","parallel","parcel","parent","parental","parents","parish","park","parker","parking","parks","part","partial","particle","parties","partly","partner","partners","parts","party","pass","passage","passed","passes","passing","passion","passive","passport","password","past","pasta","paste","pastor","patch","patches","patent","patents","path","paths","patient","patients","patio","patrol","pattern","patterns","pavilion","payable","payday","paying","payment","payments","payroll","pays","peace","peaceful","peak","pearl","peas","peeing","peer","peers","penalty","pencil","pendant","pending","penguin","penny","pens","pension","pensions","people","peoples","pepper","percent","perfect","perform","performs","perfume","perhaps","period","periodic","periods","permit","permits","person","personal","persons","pest","petite","petition","pets","phantom","pharmacy","phase","phases","phoenix","phone","phones","photo","photos","phrase","phrases","physical","physics","piano","pick","picked","picking","picks","pickup","picnic","pics","picture","pictures","piece","pieces","pierce","pike","pill","pillow","pills","pilot","pine","ping","pink","pins","pioneer","pipe","pipeline","pipes","pirates","piss","pissing","pitch","pixel","pixels","pizza","place","placed","places","placing","plain","plains","plan","plane","planes","planet","planets","planned","planner","planners","planning","plans","plant","plants","plasma","plastic","plastics","plate","plates","platform","platinum","play","playback","played","player","players","playing","playlist","plays","plaza","pleasant","please","pleased","pleasure","pledge","plenty","plot","plots","plug","plumbing","plus","pocket","pockets","podcast","podcasts","poem","poems","poet","poetry","point","pointed","pointer","pointing","points","poison","poker","polar","pole","police","policies","policy","polish","polished","politics","poll","polls","polo","poly","polymer","pond","pool","pools","poor","pope","popular","pork","port","portable","portal","porter","portion","portions","portrait","ports","pose","posing","position","positive","possess","possible","possibly","post","postage","postal","postcard","posted","poster","posters","posting","postings","posts","potato","potatoes","potter","pottery","poultry","pound","pounds","pour","poverty","powder","power","powered","powerful","powers","practice","prairie","praise","pray","prayer","prayers","precious","precise","predict","prefer","prefers","prefix","pregnant","premier","premiere","premises","premium","prep","prepaid","prepare","prepared","presence","present","presents","preserve","press","pressed","pressing","pressure","pretty","prevent","preview","previews","previous","price","priced","prices","pricing","pride","priest","primary","prime","prince","princess","print","printed","printer","printers","printing","prints","prior","priority","prison","prisoner","privacy","private","prize","prizes","probably","probe","problem","problems","proc","proceed","proceeds","process","produce","produced","producer","produces","product","products","profile","profiles","profit","profits","program","programs","progress","project","projects","promise","promised","promises","promo","promote","promoted","promotes","prompt","promptly","proof","proper","properly","property","prophet","proposal","propose","proposed","pros","prospect","prostate","protect","protein","proteins","protest","protocol","proud","proudly","prove","proved","proven","provide","provided","provider","provides","province","proxy","public","publicly","publish","pubs","pull","pulled","pulling","pulse","pump","pumps","punch","punk","pupils","puppy","purchase","pure","purple","purpose","purposes","purse","pursuant","pursue","pursuit","push","pushed","pushing","puts","putting","puzzle","puzzles","python"],
			"q": ["quad","qualify","quality","quantity","quantum","quarter","quarters","queen","queens","queries","query","quest","question","queue","quick","quickly","quiet","quilt","quit","quite","quiz","quizzes","quote","quoted","quotes"],
			"r": ["rabbit","race","races","racial","racing","rack","racks","radar","radical","radio","radios","radius","rage","raid","rail","railroad","railway","rain","rainbow","raise","raised","raises","raising","rally","ranch","rand","random","randy","range","ranger","rangers","ranges","ranging","rank","ranked","ranking","rankings","ranks","rape","rapid","rapidly","rapids","rare","rarely","rate","rated","rates","rather","rating","ratings","ratio","rational","ratios","rats","rays","reach","reached","reaches","reaching","reaction","read","reader","readers","readily","reading","readings","reads","ready","real","reality","realize","realized","really","realm","realtor","realtors","realty","rear","reason","reasons","rebate","rebates","rebel","rebound","recall","receipt","receive","received","receiver","receives","recent","recently","receptor","recipe","recipes","record","recorded","recorder","records","recover","recovery","redeem","redhead","reduce","reduced","reduces","reducing","reed","reef","reel","refer","referral","referred","refers","refine","refined","reflect","reflects","reform","reforms","refresh","refugees","refund","refuse","refused","regard","regarded","regards","reggae","regime","region","regional","regions","register","registry","regular","rehab","reject","rejected","relate","related","relates","relating","relation","relative","relax","relay","release","released","releases","relevant","reliable","reliance","relief","religion","reload","rely","relying","remain","remained","remains","remark","remarks","remedies","remedy","remember","remind","reminder","remix","remote","removal","remove","removed","removing","render","rendered","renew","renewal","rent","rental","rentals","repair","repairs","repeat","repeated","replace","replaced","replica","replied","replies","reply","report","reported","reporter","reports","reprint","reprints","republic","request","requests","require","required","requires","rescue","research","reseller","reserve","reserved","reserves","reset","resident","resist","resolve","resolved","resort","resorts","resource","respect","respond","response","rest","restore","restored","restrict","result","resulted","results","resume","resumes","retail","retailer","retain","retained","retired","retreat","retrieve","retro","return","returned","returns","reunion","reveal","revealed","reveals","revenge","revenue","revenues","reverse","review","reviewed","reviewer","reviews","revised","revision","reward","rewards","rhythm","ribbon","rice","rich","ride","rider","riders","rides","ridge","riding","right","rights","ring","rings","ringtone","ripe","rise","rising","risk","risks","river","rivers","road","roads","robin","robot","robots","robust","rock","rocket","rocks","rocky","role","roles","roll","rolled","roller","rolling","rolls","roman","romance","romantic","roof","room","roommate","rooms","root","roots","rope","rose","roses","roster","rotary","rotation","rouge","rough","roughly","roulette","round","rounds","route","router","routers","routes","routine","routines","routing","rover","rows","royal","royalty","rubber","ruby","rugby","rugs","rule","ruled","rules","ruling","runner","running","runs","runtime","rural","rush"],
			"s": ["sacred","safari","safe","safely","safer","safety","sage","said","sail","sailing","saint","saints","sake","salad","salaries","salary","sale","sales","salmon","salon","salt","samba","same","sample","samples","sampling","sand","sandwich","sandy","sans","sapphire","satin","satisfy","saturday","saturn","sauce","savage","savannah","save","saved","saver","saves","saving","savings","saying","says","scale","scales","scan","scanned","scanner","scanners","scanning","scared","scary","scenario","scene","scenes","scenic","schedule","schema","scheme","schemes","scholar","scholars","school","schools","science","sciences","scoop","scope","score","scored","scores","scoring","scout","scratch","screen","screens","screw","script","scripts","scroll","scuba","seafood","seal","sealed","search","searched","searches","seas","season","seasonal","seasons","seat","seating","seats","second","seconds","secret","secrets","section","sections","sector","sectors","secure","secured","securely","security","seed","seeds","seeing","seek","seeker","seekers","seeking","seeks","seem","seemed","seems","seen","sees","segment","segments","select","selected","self","sell","seller","sellers","selling","sells","semester","semi","seminar","seminars","senate","senator","senators","send","sender","sending","sends","senior","seniors","sense","sensor","sensors","sent","sentence","separate","sequence","serial","series","serious","serum","serve","served","server","servers","serves","service","services","serving","session","sessions","sets","setting","settings","settle","settled","setup","seven","seventh","several","severe","sewing","sexual","sexually","sexy","shade","shades","shadow","shadows","shaft","shake","shall","shame","shape","shaped","shapes","share","shared","shares","sharing","shark","sharp","shaved","shaw","shed","sheep","sheer","sheet","sheets","shelf","shell","shelter","shepherd","sheriff","shield","shift","shine","ship","shipment","shipped","shipping","ships","shirt","shirts","shit","shock","shoe","shoes","shoot","shooting","shop","shopper","shoppers","shopping","shops","shore","short","shorter","shortly","shorts","shot","shots","should","shoulder","show","showcase","showed","shower","showers","showing","shown","shows","shut","shuttle","sick","side","sides","sight","sigma","sign","signal","signals","signed","signing","signs","signup","silence","silent","silicon","silk","silly","silver","similar","simple","simply","sims","since","sing","singer","singing","single","singles","sink","sister","sisters","site","sitemap","sites","sitting","situated","sixth","size","sized","sizes","skating","skiing","skill","skilled","skills","skin","skins","skip","skirt","skirts","slave","sleep","sleeping","sleeps","sleeve","slide","slides","slight","slightly","slim","slip","slope","slot","slots","slow","slowly","slut","sluts","small","smaller","smallest","smart","smell","smile","smilies","smith","smoke","smoking","smooth","snake","snap","snapshot","snow","soap","soccer","social","society","socket","socks","sodium","sofa","soft","softball","software","soil","solar","sold","soldier","soldiers","sole","solely","solid","solo","solution","solve","solved","solving","some","somebody","somehow","someone","somewhat","song","songs","sonic","sons","soon","soonest","sorry","sort","sorted","sorts","sought","soul","souls","sound","sounds","soup","source","sources","south","southern","space","spaces","spam","span","spank","spanking","spare","spas","spatial","speak","speaker","speakers","speaking","speaks","spears","special","specials","species","specific","specify","specs","spectrum","speech","speeches","speed","speeds","spell","spelling","spend","spending","spent","sperm","sphere","spice","spider","spies","spin","spine","spirit","spirits","split","spoke","spoken","sponsor","sponsors","sport","sporting","sports","spot","spots","spouse","spray","spread","spring","springs","sprint","spyware","squad","square","squirt","stable","stack","stadium","staff","staffing","stage","stages","stake","stamp","stamps","stand","standard","standing","stands","star","starring","stars","start","started","starter","starting","starts","startup","stat","state","stated","states","static","stating","station","stations","stats","status","statute","statutes","stay","stayed","staying","stays","steady","steal","steam","steel","steering","stem","step","steps","stereo","sterling","stick","sticker","stickers","sticks","sticky","still","stock","stocks","stolen","stomach","stone","stones","stood","stop","stopped","stopping","stops","storage","store","stored","stores","stories","storm","story","straight","strain","strand","strange","stranger","strap","strategy","stream","streams","street","streets","strength","stress","stretch","strict","strictly","strike","strikes","striking","string","strings","strip","stripes","strips","stroke","strong","stronger","strongly","struck","struct","struggle","stuck","stud","student","students","studied","studies","studio","studios","study","studying","stuff","stuffed","stunning","stupid","style","styles","stylish","stylus","subject","subjects","sublime","submit","subtle","suburban","succeed","success","such","suck","sucking","sucks","sudden","suddenly","suffer","suffered","sugar","suggest","suggests","suicide","suit","suitable","suite","suited","suites","suits","summary","summer","summit","sunday","sunny","sunrise","sunset","sunshine","super","superb","superior","supplied","supplier","supplies","supply","support","supports","suppose","supposed","supreme","sure","surely","surf","surface","surfaces","surfing","surge","surgeon","surgeons","surgery","surgical","surname","surplus","surprise","surrey","surround","survey","surveys","survival","survive","survivor","suspect","swap","sweet","swift","swim","swimming","swing","swingers","switch","switched","switches","sword","symbol","symbols","sympathy","symphony","symptoms","sync","syndrome","synopsis","syntax","system","systems"],
			"t": ["table","tables","tablet","tablets","tabs","tackle","tactics","tagged","tags","tail","take","taken","takes","taking","tale","talent","talented","tales","talk","talked","talking","talks","tall","tank","tanks","tape","tapes","target","targeted","targets","tariff","task","tasks","taste","tattoo","taught","taxation","taxes","taxi","teach","teacher","teachers","teaches","teaching","team","teams","tear","tears","tech","techno","teddy","teen","teenage","teens","teeth","telecom","tell","telling","tells","temp","template","temple","temporal","tenant","tend","tender","tennis","tension","tent","term","terminal","terms","terrace","terrain","terrible","terror","terry","test","tested","testing","tests","text","textbook","textile","textiles","texts","texture","than","thank","thanks","that","thats","theater","theaters","theatre","thee","theft","their","them","theme","themes","then","theology","theorem","theories","theory","therapy","there","thereby","thereof","thermal","these","thesis","theta","they","thick","thin","thing","things","think","thinking","thinks","third","thirty","this","thong","thongs","thorough","those","thou","though","thought","thoughts","thousand","thread","threaded","threads","threat","threats","three","thriller","throat","through","throw","throwing","thrown","throws","thumb","thumbs","thunder","thursday","thus","ticket","tickets","tide","tied","tier","ties","tiger","tigers","tight","tile","tiles","till","timber","time","timeline","timely","timer","times","timing","tiny","tips","tire","tired","tires","tissue","titanium","titans","title","titled","titles","tobacco","today","toddler","together","toilet","token","told","toll","tomato","tomatoes","tomorrow","tone","toner","tones","tongue","tonight","tons","took","tool","toolbar","toolbox","toolkit","tools","tooth","topic","topics","topless","tops","torture","total","totally","totals","touch","touched","tough","tour","touring","tourism","tourist","tours","toward","towards","tower","towers","town","towns","township","toxic","toys","trace","track","tracked","tracker","tracking","tracks","tract","tractor","trade","trader","trades","trading","traffic","tragedy","trail","trailer","trailers","trails","train","trained","trainer","trainers","training","trains","trance","trans","transfer","transit","transmit","trap","trash","trauma","travel","traveler","travels","tray","treasure","treasury","treat","treated","treating","treaty","tree","trees","trek","trend","trends","trial","trials","triangle","tribal","tribe","tribes","tribunal","tribune","tribute","trick","tricks","tried","tries","trigger","trim","trinity","trio","trip","triple","trips","triumph","trivia","troops","tropical","trouble","trout","troy","truck","trucks","true","truly","trunk","trust","trusted","trustee","trustees","trusts","truth","trying","tsunami","tube","tubes","tuesday","tuition","tumor","tune","tuner","tunes","tuning","tunnel","turbo","turkey","turn","turned","turner","turning","turns","turtle","tutorial","twelve","twenty","twice","twin","twins","twist","twisted","type","types","typical","typing"],
			"u": ["ugly","ultimate","ultra","unable","uncle","under","undo","unified","uniform","union","unions","unique","unit","united","units","unity","universe","unix","unknown","unless","unlike","unlikely","unlock","unsigned","until","untitled","unto","unusual","unwrap","upcoming","update","updated","updates","updating","upgrade","upgrades","upload","uploaded","upon","upper","upset","urban","urge","urgent","usage","used","useful","user","username","users","uses","using","usual","usually","utility","utilize"],
			"v": ["vacation","vaccine","vacuum","valid","validity","valley","valuable","value","valued","values","valve","valves","vampire","vanilla","variable","variance","varied","varies","variety","various","vary","varying","vast","vault","vector","vehicle","vehicles","velocity","velvet","vendor","vendors","venture","ventures","venue","venues","verbal","verified","verify","verse","version","versions","versus","vertex","vertical","very","vessel","vessels","veteran","veterans","vice","victim","victims","victor","victory","video","videos","view","viewed","viewer","viewers","viewing","views","viking","villa","village","villages","villas","vintage","vinyl","violence","violent","violin","viral","virgin","virtual","virtue","virus","viruses","visa","visible","vision","visit","visited","visiting","visitor","visitors","visits","vista","visual","vital","vitamin","vitamins","vocal","vocals","voice","voices","void","volt","voltage","volume","volumes","vote","voted","voters","votes","voting","voyeur"],
			"w": ["wage","wages","wagon","wait","waiting","waiver","wake","wales","walk","walked","walker","walking","walks","wall","wallet","walls","walnut","want","wanted","wanting","wants","ward","ware","warm","warming","warned","warner","warning","warnings","warrant","warranty","warren","warrior","warriors","wars","wash","washer","washing","waste","watch","watched","watches","watching","water","waters","watt","watts","wave","waves","ways","weak","wealth","weapon","weapons","wear","wearing","weather","webcam","webcams","webpage","website","websites","wedding","weddings","weed","week","weekend","weekends","weekly","weeks","weight","weighted","weights","weird","welcome","welding","welfare","well","wellness","wells","went","were","west","western","whale","what","whatever","whats","wheat","wheel","wheels","when","whenever","where","whereas","wherever","whether","which","while","whilst","white","whole","whom","whose","wicked","wide","widely","wider","width","wife","wild","wildlife","will","willing","willow","wind","window","windows","winds","wine","wines","wing","wings","winner","winners","winning","wins","winter","wire","wired","wireless","wires","wiring","wisdom","wise","wish","wishes","wishing","wishlist","witch","with","within","without","witness","wives","wizard","wolf","woman","women","wonder","wood","wooden","woods","wool","word","words","work","worked","worker","workers","workflow","working","workout","works","workshop","world","worlds","worm","worn","worried","worry","worse","worship","worst","worth","worthy","would","wound","wrap","wrapped","wrapping","wright","wrist","write","writer","writers","writes","writing","writings","written","wrong","wrote"],
			"y": ["yacht","yard","yards","yarn","yeah","year","yearly","years","yeast","yellow","yield","yields","yoga","young","younger","your","yours","yourself","youth"],
			"x": [],
			"z": ["zero","zinc","zone","zones","zoning","zoom"]
		}

/*** interaction ***/
	/* refocusInput */
		window.addEventListener(TRIGGERS.click, refocusInput)
		window.addEventListener(TRIGGERS.keydown, refocusInput)
		function refocusInput(event) {
			try {
				// focus
					ELEMENTS.input.focus()
			} catch (error) {console.log(error)}
		}

	/* typeLetter */
		ELEMENTS.input.addEventListener(TRIGGERS.input, typeLetter)
		function typeLetter(event) {
			try {
				// get letter
					let letter = ELEMENTS.input.value.toLowerCase() || ""
					ELEMENTS.input.value = ""

				// not playing
					if (!STATE.playing) {
						return false
					}

				// no word
					if (!STATE.word) {
						return
					}

				// not in the alphabet
					if (!CONSTANTS.alphabet.includes(letter)) {
						return
					}

				// between words
					if (STATE.wordIndex >= STATE.word.length) {
						return
					}

				// letter is not next
					if (STATE.word[STATE.wordIndex] !== letter) {
						STATE.wordIndex = 0
						for (let i in STATE.letters) {
							STATE.letters[i].removeAttribute("typed")
							STATE.backgroundLetters[i].removeAttribute("typed")
						}
						ELEMENTS.word.setAttribute("mistake", true)
						return
					}

				// letter is next
					ELEMENTS.word.removeAttribute("mistake")
					STATE.letters[STATE.wordIndex].setAttribute("typed", true)
					STATE.backgroundLetters[STATE.wordIndex].setAttribute("typed", true)
					STATE.wordIndex++

					ELEMENTS.wings.setAttribute("flap", true)
					STATE.flapCooldown = CONSTANTS.flapCooldownLoops

				// still more word
					if (STATE.wordIndex < STATE.word.length) {
						return
					}

				// no more --> new word + ascend
					ELEMENTS.word.setAttribute("typed", true)
					STATE.vy = -CONSTANTS.YpercentVelocityUpMax
					STATE.ascendCooldown = CONSTANTS.ascendCooldownLoops
			} catch (error) {console.log(error)}
		}

/*** game ***/
	/* startGame */
		ELEMENTS.reset.addEventListener(TRIGGERS.click, startGame)
		function startGame() {
			try {
				// end previous game
					STATE.playing = false

				// reset score & cooldowns
					STATE.ascendCooldown = 0
					STATE.flapCooldown = 0
					STATE.obstacleCooldown = 0
					STATE.score = -1
					ELEMENTS.score.innerText = ""

				// reset position
					STATE.y = CONSTANTS.YpercentStart
					STATE.vy = CONSTANTS.VYStart
					ELEMENTS.word.style.position.top = STATE.y + "%"
					ELEMENTS.word.removeAttribute("typed")
					ELEMENTS.word.removeAttribute("mistake")

				// reset word
					for (let i in STATE.letters) {
						STATE.letters[i].remove()
					}
					for (let i in STATE.backgroundLetters) {
						STATE.backgroundLetters[i].remove()
					}
					STATE.letters = []
					STATE.backgroundLetters = []
					STATE.word = null
					STATE.wordIndex = 0

				// reset obstacles
					for (let i in STATE.obstacles) {
						STATE.obstacles[i].element.remove()
					}
					STATE.obstacles = []

				// new word
					updateWord()

				// unblur game / hide reset button
					ELEMENTS.game.removeAttribute("gameover")

				// start playing
					STATE.playing = true

				// focus on input
					ELEMENTS.input.focus()
			} catch (error) {console.log(error)}
		}

	/* iterateGame */
		STATE.loop = setInterval(iterateGame, CONSTANTS.msPerLoop)
		function iterateGame() {
			try {
				// not playing?
					if (!STATE.playing) {
						return
					}

				// successfully typed word
					if (STATE.ascendCooldown) {
						// reduce cooldown
							STATE.ascendCooldown -= 1

						// cooldown runs out
							if (!STATE.ascendCooldown) {
								updateWord()
							}
					}

				// descend at a constant rate
					STATE.vy = Math.min(CONSTANTS.YpercentVelocityDownMax, STATE.vy + CONSTANTS.YpercentAccelerationDown)

				// ascend / descend
					STATE.y = Math.max(0, STATE.y + STATE.vy)

				// flapping
					if (STATE.vy > 0 && STATE.flapCooldown) {
						// reduce cooldown
							STATE.flapCooldown -= 1

						// cooldown runs out
							if (!STATE.flapCooldown) {
								ELEMENTS.wings.removeAttribute("flap")
							}
					}

				// update y position
					ELEMENTS.word.style.top = STATE.y + "%"

				// x position
					let xShift = CONSTANTS.XpercentPerLoopPerScore * (STATE.score + CONSTANTS.XscoreBaseline)
					STATE.x += xShift
					STATE.obstacleCooldown = Math.max(0, STATE.obstacleCooldown - xShift)

				// obstacles / collision
					let collision = updateObstacles(xShift)

				// new obstacles?
					if (!STATE.obstacleCooldown) {
						// reset cooldown
							STATE.obstacleCooldown = CONSTANTS.XpercentPerObstacleGap

						// create obstacle
							createObstacle()
					}

				// below screen or collision --> end game
					if (collision || STATE.y > 100) { // %
						STATE.playing = false
						ELEMENTS.word.setAttribute("mistake", true)
						ELEMENTS.game.setAttribute("gameover", true)

						ELEMENTS.reset.focus()
					}
			} catch (error) {console.log(error)}
		}

	/* updateWord */
		function updateWord() {
			try {
				// remove old word
					ELEMENTS.word.removeAttribute("typed")
					for (let i in STATE.letters) {
						STATE.letters[i].remove()
					}
					STATE.letters = []

					for (let i in STATE.backgroundLetters) {
						STATE.backgroundLetters[i].remove()
					}
					STATE.backgroundLetters = []

				// new word
					STATE.wordIndex = 0
					STATE.word = chooseRandomWord()

				// create letters
					for (let i in STATE.word) {
						let letter = document.createElement("span")
							letter.className = "letter"
							letter.innerText = STATE.word[i]
						STATE.letters.push(letter)
						ELEMENTS.word.appendChild(letter)

						let backgroundLetter = document.createElement("span")
							backgroundLetter.className = "letter"
							backgroundLetter.innerText = STATE.word[i]
						STATE.backgroundLetters.push(backgroundLetter)
						ELEMENTS.backgroundWord.appendChild(backgroundLetter)
					}

				// increment score
					STATE.score++
					ELEMENTS.score.innerText = STATE.score
			} catch (error) {console.log(error)}
		}

	/* updateObstacles */
		function updateObstacles(xShift) {
			try {
				// get rect
					let wordRect = ELEMENTS.word.getBoundingClientRect()
					let gameRect = ELEMENTS.game.getBoundingClientRect()

				// assume no collision
					let collision = false

				// loop through obstacles
					for (let i in STATE.obstacles) {
						// move left
							STATE.obstacles[i].x -= xShift

						// update element
							STATE.obstacles[i].element.style.left = STATE.obstacles[i].x + "%"

						// get rect
							let obstacleRect = STATE.obstacles[i].element.getBoundingClientRect()

						// overlap
							if ((obstacleRect.left < wordRect.right && wordRect.left < obstacleRect.right)
							 && (obstacleRect.top < wordRect.bottom && wordRect.top < obstacleRect.bottom)) {
								collision = true
								STATE.obstacles[i].element.setAttribute("collision", true)
							}

						// off screen
							else if (obstacleRect.right < gameRect.left) {
								STATE.obstacles[i].element.remove()
								delete STATE.obstacles[i]
							}
					}

				// collision?
					return collision
			} catch (error) {console.log(error)}
		}

	/* createObstacle */
		function createObstacle() {
			try {
				// gap
					let currentGap = Math.max(CONSTANTS.YpercentPerGapMin, Math.min(CONSTANTS.YpercentPerGapMax, CONSTANTS.YpercentPerGapMax - STATE.score))
					let gapTop = Math.floor(Math.random() * (100 - 2 * CONSTANTS.YpercentPerGapEdge - currentGap)) + CONSTANTS.YpercentPerGapEdge
					let gapBottom = gapTop + currentGap

				// top
					let obstacleTop = {x: 100}
						obstacleTop.element = document.createElement("div")
						obstacleTop.element.className = "obstacle obstacle-top"
						obstacleTop.element.style.height = gapTop + "%"
						obstacleTop.element.style.width = CONSTANTS.XpercentPerObstacle + "%"
						obstacleTop.element.style.left = obstacleTop.x + "%"
					STATE.obstacles.push(obstacleTop)
					ELEMENTS.obstacles.appendChild(obstacleTop.element)

				// bottom
					let obstacleBottom = {x: 100}
						obstacleBottom.element = document.createElement("div")
						obstacleBottom.element.className = "obstacle obstacle-bottom"
						obstacleBottom.element.style.height = (100 - gapBottom) + "%"
						obstacleBottom.element.style.width = CONSTANTS.XpercentPerObstacle + "%"
						obstacleBottom.element.style.left = obstacleBottom.x + "%"
					STATE.obstacles.push(obstacleBottom)
					ELEMENTS.obstacles.appendChild(obstacleBottom.element)
			} catch (error) {console.log(error)}
		}

/*** tools ***/
	/* chooseRandomWord */
		function chooseRandomWord() {
			try {
				// cache counts
					if (!CONSTANTS.dictionaryCounts) {
						CONSTANTS.dictionaryCounts = {}
						for (let i in CONSTANTS.alphabet) {
							CONSTANTS.dictionaryCounts[CONSTANTS.alphabet[i]] = DICTIONARY[CONSTANTS.alphabet[i]].length
						}
					}

				// get random word from dictionary
					let letter = chooseWeightedRandom(CONSTANTS.dictionaryCounts)
					let word = chooseRandom(DICTIONARY[letter])

				// return
					return word.toLowerCase().replace(/[^a-z]/g, "")
			} catch (error) {console.log(error)}
		}

	/* chooseWeightedRandom */
		function chooseWeightedRandom(weightedList) {
			try {
				// not an object
					if (typeof weightedList !== "object") {
						return weightedList
					}

				// get total
					let keys = Object.keys(weightedList)
					let total = 0
					for (let i in keys) {
						total += weightedList[keys[i]]
					}

				// random number
					let random = Math.floor(Math.random() * total)

				// where is that in the list
					let bucket = null
					let index = 0
					let runningTotal = 0
					while (!bucket && index < keys.length) {
						runningTotal += weightedList[keys[index]]
						if (random <= runningTotal) {
							bucket = keys[index]
						}
						index++
					}

					if (!bucket) {debugger}

				// return bucket
					return bucket || chooseRandom(keys)
			} catch (error) {console.log(error)}
		}

	/* chooseRandom */
		function chooseRandom(list) {
			try {
				// not an array
					if (!Array.isArray(list) && typeof list !== "string") {
						return list
					}

				// random from list
					return list[Math.floor(Math.random() * list.length)]
			} catch (error) {console.log(error)}
		}
