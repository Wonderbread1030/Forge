import { useState, useRef, useEffect } from “react”;

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const rB = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

const store = {
async get(k) { try { const v = localStorage.getItem(k); return v ? { value: v } : null; } catch(e){} return null; },
async set(k,v) { try { localStorage.setItem(k, v); return { value: v }; } catch(e){} return null; },
};

const STYLE_ANCHOR = `Isometric vehicle illustration in a consistent collectible game asset style. STRICT RULES: Isometric 3/4 view from the FRONT-RIGHT, the vehicle nose points to the BOTTOM-LEFT of frame. Camera angle exactly 30 degrees above horizontal. Vehicle perfectly centered with equal margin on all sides. Pure white #FFFFFF background, absolutely nothing else in the scene. No ground plane, no shadow, no reflection, no horizon, no text, no labels, no logos. RENDERING STYLE: Clean vector-like flat color fills. Thin uniform black outlines of consistent 1px weight on all edges. One level of subtle darker shade on surfaces facing away from a top-left light source. Windshields and windows are a uniform flat dark blue-gray tint, no transparency, no interior visible. Wheels are simple circles with minimal hub detail. Proportions slightly simplified and compact like a toy or icon. The vehicle MUST look like a fictional design inspired by real-world automotive design traditions of its cultural origin, similar to how a video game like GTA creates vehicles that clearly evoke real design DNA without being direct copies.`;

const EMOJIS = [”\uD83D\uDD34”,”\uD83D\uDFE0”,”\uD83D\uDFE1”,”\uD83D\uDFE2”,”\uD83D\uDD35”,”\uD83D\uDFE3”,”\u26AB”,”\u26AA”,”\uD83D\uDFE4”,”\uD83D\uDD36”,”\uD83D\uDD37”,”\uD83D\uDD38”,”\uD83D\uDD39”,”\uD83D\uDD3A”,”\uD83D\uDD3B”];
const AUG_EMOJIS = { T:”\u25B2”, R:”\u25C6”, L:”\u25CF”, S:”\u25A0”, W:”\u25C0”, H:”\u2605”, A:”\u25BC”, E:”\u26A1”, D:”\u25C7”, X:”\u2295”, P:”\u2297”, V:”\u25C8”, G:”\u25B3”, F:”\u25C9”, Z:”\u25CE”, Q:”\u2299” };
const AUG_EMOJI_REV = Object.fromEntries(Object.entries(AUG_EMOJIS).map(([k,v])=>[v,k]));

const MFRS = {
Japanese:[“Hayashi”,“Takumi Motors”,“Kuroda”,“Senzo”,“Mirai Auto”],
Italian:[“Velenosa”,“Castellano”,“Falcone”,“Serafini”,“Vettore”],
German:[“Eisenwerk”,“Starkmann”,“Grauer”,“Kaltberg”,“Weissach & Zweig”],
American:[“Blackridge”,“Holt Motor Co.”,“Eaglecraft”,“Redline Motors”,“Steelton”],
British:[“Ashworth”,“Bramley & Sons”,“Croft-Reed”,“Everly”,“Fenwick Motors”],
French:[“Beaumont”,“Deveraux”,“Leclaire”,“Moreau Auto”,“Vaucluse”],
Soviet:[“ZIL-K”,“Ural-Avto”,“Volkov Works”,“KAZ”,“Soyuz Motor Works”],
Scandinavian:[“Nordvik”,“Fjallstrom”,“Isen Motor”,“Storvik”,“Vinterberg”],
Korean:[“Hanjin Auto”,“Daesun”,“Cheongho”,“Miraewon”,“Goryeo Motors”],
Australian:[“Outback Motor Co.”,“Ironbark”,“Bushland”,“Redgum”,“Sunstrike”],
Chinese:[“Longwei”,“Tianshan Motors”,“Jade Peak”,“Hongtu Auto”,“Qilin”],
Brazilian:[“Tropicana Motors”,“Serra Auto”,“Cruzeiro”,“Vento Verde”,“Bandeira”],
Indian:[“Ashoka Motor Works”,“Kaveri”,“Garuda Auto”,“Sindhu”,“Thar Motors”],
};

const MODELS = {
“Coupe”:[“Spectre”,“Silhouette”,“Zenith”,“Venom”,“Rogue”],
“Sedan”:[“Sovereign”,“Meridian”,“Consul”,“Crest”,“Prestige”],
“Wagon”:[“Nomad”,“Traverse”,“Pioneer”,“Drifter”,“Ranger”],
“Kei Car”:[“Mochi”,“Blink”,“Pip”,“Zest”,“Ember”],
“Van”:[“Atlas”,“Caravan”,“Depot”,“Hauler”,“Transit”],
“Roadster”:[“Aria”,“Tempest”,“Breeze”,“Solstice”,“Flair”],
“SUV”:[“Summit”,“Overlord”,“Garrison”,“Monolith”,“Bastion”],
“Hatchback”:[“Dash”,“Riot”,“Snap”,“Bolt”,“Flicker”],
“Shooting Brake”:[“Corsair”,“Reaper”,“Scythe”,“Saber”,“Edge”],
“Targa”:[“Corona”,“Eclipse”,“Halo”,“Aperture”,“Prism”],
“Pickup”:[“Brute”,“Stallion”,“Gravel”,“Anvil”,“Dusty”],
“Convertible”:[“Cascada”,“Zephyr”,“Mistra”,“Soleil”,“Rivage”],
“Limousine”:[“Chancellor”,“Envoy”,“Palatine”,“Herald”,“Regalia”],
“Microcar”:[“Atom”,“Sprout”,“Pebble”,“Flint”,“Glyph”],
“Ute”:[“Bandit”,“Ranchero”,“Hauler”,“Workhorse”,“Prowl”],
};

const ERA_YEARS = {“1930s”:[1931,1939],“1950s”:[1950,1959],“1960s”:[1960,1969],“1970s”:[1970,1979],“1980s”:[1980,1989],“1990s”:[1990,1999],“2000s”:[2000,2009],“2020s”:[2020,2029],“Near Future”:[2032,2048],“Far Future”:[2060,2125]};

const CULTURE_FRAG = {
Japanese:[“The unmistakable DNA of Japanese sports cars: lightweight, high-revving, function-first”,“Precision-obsessed, channeling the golden-age tuner ethos of highway missiles and drift-bred coupes”,“Shokunin craftsmanship meets compact sports car ingenuity”],
Italian:[“Theatrical mid-engine exotica with dramatic curves and coachbuilding drama”,“Sculpted like a rolling sculpture in the tradition of front-engined V12 GT berlinettas”,“Passionate, gestural, every surface shaped with Italian automotive confidence”],
German:[“Surgical precision channeling the autobahn-bred tradition of understated fast machinery”,“Ruthlessly purposeful, echoing wind-tunnel-sculpted efficiency”,“Every surface justified, carrying the DNA of turbocharged touring cars and engineering-led supercars”],
American:[“Big-displacement muscle: long hoods, short decks, and aggressive pony car stance”,“The boulevard cruiser tradition: chrome, presence, cubic inches, and attitude”,“Built with American performance swagger, from drag-strip muscle to pickup toughness”],
British:[“Understated menace in the tradition of hand-stitched GT cars and bespoke luxury”,“Lightweight roadster DNA: small, nimble, balanced, with leather refinement”,“Restrained British exterior drama hiding sophistication underneath”],
French:[“Eccentric and distinctly Gallic, channeling quirky comfortable grand routiers”,“Avant-garde by nature with unusual proportions and idiosyncratic charm”,“Bohemian engineering and the tradition of brilliant French automotive eccentricity”],
Soviet:[“Heavy, angular, built to survive, channeling state-produced utilitarian aesthetics”,“Cold War brute-force engineering: stamped steel, no frills, ideological function”,“Industrial brutalism on wheels, designed by committee but strangely compelling”],
Scandinavian:[“Clean and safety-obsessed, in the tradition of boxy turbocharged wagons”,“Functional beauty born from dark winters and understated Nordic ethos”,“Designed for everyone, with quiet turbo performance underneath”],
Korean:[“Ambitious and rapidly maturing, absorbing global influence into bold angular forms”,“Cutting-edge tech with relentless refinement and genuine design distinction”,“Technically flawless with a hunger to prove its automotive credentials”],
Australian:[“Rugged V8 sedans and utes built where the road ends”,“The tradition of turning family sedans into touring car weapons, sun-baked and ready”,“No-nonsense engineering with serious displacement underneath”],
Chinese:[“Ambitious EV-forward design with bold proportions and rapid iteration”,“Technology-forward luxury channeling state-backed engineering ambition”,“A market so vast it shapes its own design language: sleek, tech-heavy, modern”],
Brazilian:[“Tropical resourcefulness channeling air-cooled heritage and hot-hatch energy”,“Built for brutal roads with flexible platforms and joyful color”,“Latin automotive energy with industrial grit and local ingenuity”],
Indian:[“Frugal innovation stretched to genius, channeling extreme value engineering”,“Engineering miracles under cost pressure, maximizing every component”,“Designed for democratic mobility with clever packaging and relentless efficiency”],
};

const CULTURE_PROMPT = {
Japanese:“Design DNA inspired by classic Japanese sports cars: clean lines, functional aero, compact proportions. Video-game tribute style, not a copy.”,
Italian:“Design DNA inspired by Italian exotic and GT tradition: dramatic sculpted curves, elegant surfacing, bold air intakes. Original but evocative.”,
German:“Design DNA inspired by German automotive tradition: taut efficient surfaces, purposeful stance, restrained aggression.”,
American:“Design DNA inspired by American automotive tradition: bold wide stance, muscular fender flares, aggressive front end.”,
British:“Design DNA inspired by British automotive tradition: elegant understated lines, long hood proportions, refined details.”,
French:“Design DNA inspired by French automotive tradition: unconventional proportions, quirky charming details, comfortable appearance.”,
Soviet:“Design DNA inspired by Soviet-era vehicles: angular utilitarian shapes, flat stamped panels, heavy industrial proportions.”,
Scandinavian:“Design DNA inspired by Scandinavian automotive tradition: clean rectilinear forms, boxy honest shapes, understated presence.”,
Korean:“Design DNA inspired by modern Korean automotive design: sharp angular creases, bold proportions, tech-forward details.”,
Australian:“Design DNA inspired by Australian automotive tradition: muscular sedan or ute proportions, rear-drive stance, no-nonsense aggression.”,
Chinese:“Design DNA inspired by contemporary Chinese automotive design: sleek futuristic proportions, technology-forward details.”,
Brazilian:“Design DNA inspired by Brazilian automotive tradition: practical proportions, tropical flair, creative budget engineering.”,
Indian:“Design DNA inspired by Indian automotive design: efficient compact proportions, clever packaging, value-conscious surfaces.”,
};

const BODY_FRAG = {
“Coupe”:[“The roofline drops like a held breath”,“Two doors, no excuses”,“Long hood, short deck”],
“Sedan”:[“Four doors carrying quiet authority”,“Classic three-box shape reimagined”,“Balanced proportions, competence before flash”],
“Wagon”:[“That long roof carries cargo and cool equally”,“Practicality and beauty coexist”],
“Kei Car”:[“Impossibly small, absurdly charming”,“Every millimeter accounted for”],
“Van”:[“A rolling box with unexpected dignity”,“Maximum volume shaped into character”],
“Roadster”:[“Open-top, low-slung, built for feeling”,“Nothing between you and the road but intention”],
“SUV”:[“Tall, commanding, impossible to ignore”,“Ground clearance meets glass in a power stance”],
“Hatchback”:[“Compact, punchy, deceptively capable”,“Small car energy, big car surprises”],
“Shooting Brake”:[“Long-roof coupe, elegant and menacing”,“The rarest body style, carrying its own myth”],
“Targa”:[“Removable roof frames the sky like architecture”,“Flying buttresses and open top create drama”],
“Pickup”:[“Working bed behind a cab that means business”,“Utility DNA with design ambition”],
“Convertible”:[“The roof folds away entirely, open sky motoring”,“A folding top transforms the silhouette”],
“Limousine”:[“Stretched wheelbase carrying heads of state”,“Presence measured in inches of added length”],
“Microcar”:[“Smaller than small, barely a car at all”,“City mobility distilled to absolute minimum”],
“Ute”:[“Coupe up front, pickup bed in back”,“Sport car meets work truck”],
};

const PHIL_FRAG = {
Brutalist:[“Raw panel gaps and exposed fasteners as ornament”,“Structure IS beauty”],
Organic:[“Flowing surfaces shaped by wind and water”,“Grown rather than stamped”],
Minimalist:[“Every removable line was removed”,“Surface purity bordering on monastic”],
Aggressive:[“Vents, scoops, and angles that threaten”,“Aerodynamic violence in sheet metal”],
Luxurious:[“Rich materials visible from across the street”,“Details that say expense without speaking”],
Utilitarian:[“Every element exists because it works”,“Form follows function, zero decoration”],
“Avant-Garde”:[“Proportions that challenge expectations”,“Deliberately strange, deliberately unforgettable”],
“Neo-Retro”:[“Classic cues through modern manufacturing”,“Retro inspiration that never dips into costume”],
};

const PURPOSE_FRAG = {
“Track Weapon”:[“built with obsession for lap times”,“every gram scrutinized”],
“Daily Driver”:[“built to be lived with”,“designed for the commute with enough soul to matter”],
“Grand Tourer”:[“built to cross continents in one sitting”,“devouring miles in quiet luxury”],
“Rally Fighter”:[“suspension travel measured in forearms”,“built to be sideways on gravel”],
“Apocalypse Runner”:[“built for the world after the world ends”,“designed to outlast infrastructure”],
“Show Car”:[“built to be photographed, never driven hard”,“a rolling art piece”],
“Police Interceptor”:[“built to chase and catch anything”,“the spotlight and push bar ARE the point”],
“Drift Machine”:[“built to go sideways as primary function”,“tire smoke is the mission statement”],
“Sport Variant”:[“factory sport pack, firmed up and sharpened”,“the enthusiast’s trim level”],
“Performance”:[“serious hardware upgrade, different engine and brakes”,“a step beyond sport”],
“Extreme”:[“barely street-legal, track-bred, the halo variant”,“the version engineers built for themselves”],
“Super Luxury”:[“opulence as engineering discipline”,“materials and silence money can’t usually buy”],
};

const PT_FRAG = {
“V12 NA”:[“a naturally-aspirated V12 symphony”],
“Flat-6 Turbo”:[“a turbocharged flat-six, boxer precision with boost”],
“Rotary”:[“a rotary spinning with otherworldly smoothness”],
“Full Electric”:[“silent electric torque from the first millimeter”],
“Turbodiesel”:[“a turbodiesel pulling like a freight train”],
“V8 Supercharged”:[“a supercharged V8 whining with authority”],
“I4 Turbo”:[“a turbo four punching above its weight”],
“Hybrid”:[“a hybrid blending combustion and electric seamlessly”],
“Hydrogen”:[“a hydrogen fuel cell humming experimentally”],
};

const DETAILS = [
“A single glass piece runs windshield to rear”,“Taillights glow through perforated metal”,
“Flush door handles revealed by proximity”,“One analog dial in a sea of bare metal”,
“Exhaust tips integrated into diffuser”,“A hand-painted pinstripe runs the full body length”,
“Fixed-back carbon shells with period upholstery”,“Roof scoop feeds air into the engine bay”,
“The key is a machined metal cylinder”,“Riveted fender flares became aesthetic”,
“Blade-like camera stalks replace mirrors”,“Flat-bottom alcantara wheel with center stripe”,
“Active aero rises at speed”,“Headlights are a single LED strip”,
“Pop-up headlights emerge slowly”,“Chassis number engraved by hand”,
“Exposed gear linkage in center console”,“Machined billet fuel cap”,
“Analog boost gauge on the dashboard”,“A subtle body crease catches light at dusk”,
];

const BODY_COLORS = [“solid deep blue”,“matte white”,“bright red”,“pale yellow”,“light seafoam green”,“warm coral”,“gunmetal gray”,“cream”,“dark forest green”,“sky blue”,“flat black”,“soft lavender”,“burnt orange”,“champagne gold”,“slate teal”];

const FORM_FRAG = {
Angular:[“Sharp creases and defined edges dominate”],Rounded:[“Soft radii and gentle curves on every surface”],
Boxy:[“Flat panels and right angles define the silhouette”],Wedge:[“A low nose rising to a tall rear”],
Sculpted:[“Chiseled surfaces with light-catching hollows”],Flowing:[“One continuous unbroken line from nose to tail”],
Faceted:[“Flat geometric faces meeting at sharp angles”],Bulbous:[“Swollen, inflated volumes that push outward”],
};
const FORM_PROMPT = {
Angular:“MUST have sharp angular body panels with defined hard creases and geometric edges.”,
Rounded:“MUST have soft rounded body panels with gentle curves, no hard edges.”,
Boxy:“MUST have flat-sided boxy body panels with right angles and squared-off surfaces.”,
Wedge:“MUST have wedge-shaped profile, low front rising to taller rear.”,
Sculpted:“MUST have deeply sculpted body panels with chiseled hollows and muscular surfaces.”,
Flowing:“MUST have smooth flowing surfaces with one continuous line from front to rear.”,
Faceted:“MUST have faceted geometric surfaces meeting at sharp angles.”,
Bulbous:“MUST have swollen bulbous body panels with inflated volumes.”,
};

const PRICE_FRAG = {Budget:[“Built to a price point with clever cost-cutting”],“Mid-Range”:[“Competent and complete, the sweet spot”],Premium:[“Materials and engineering a clear step above”],Unobtanium:[“Cost-no-object, handcrafted everything”]};
const PRICE_HP = {Budget:0.8,“Mid-Range”:1.0,Premium:1.1,Unobtanium:1.25};
const PRICE_WT = {Budget:0.9,“Mid-Range”:1.0,Premium:1.05,Unobtanium:1.1};
const PRICE_PROMPT = {Budget:“Simple utilitarian finish, economy materials, plain trim.”,
“Mid-Range”:“Competent well-finished trim, nothing extravagant.”,
Premium:“Polished trim details, visibly high-quality materials.”,
Unobtanium:“Bespoke hand-finished details, exotic materials, extraordinary refinement.”};

const LAYOUT_FRAG = {“Front”:[“Engine up front, weight over the nose, classic proportions”],“Front-Mid”:[“Engine behind the front axle for knife-edge balance”],“Mid”:[“Engine behind the cabin, exotic proportions unlocked”],“Rear”:[“Engine hung behind the rear axle, tail-happy by birth”]};
const LAYOUT_PROMPT = {
“Front”:“MUST have front-engine proportions: long hood extending ahead of cabin, shorter rear deck.”,
“Front-Mid”:“MUST have front-mid-engine proportions: slightly shorter hood, cabin pushed forward, balanced.”,
“Mid”:“MUST have mid-engine proportions: short front, cabin forward, large air intakes on sides/rear feeding engine behind cabin.”,
“Rear”:“MUST have rear-engine proportions: very short front overhang, sloping front trunk, engine mass at rear with vents.”};
const LAYOUT_WT = {“Front”:1.02,“Front-Mid”:0.97,“Mid”:0.95,“Rear”:0.98};
const LAYOUT_HP = {“Front”:1.0,“Front-Mid”:1.02,“Mid”:1.05,“Rear”:1.03};

const AUGMENTS = [
{id:“T”,name:“Track Spec”,hpMod:1.15,wtMod:.88,frag:“Track-prepped with cage, carbon panels, stripped interior.”,prompt:“roll cage, carbon panels, rear wing, stripped interior”},
{id:“R”,name:“Rally Build”,hpMod:1.05,wtMod:1.08,frag:“Rally-converted with long-travel suspension.”,prompt:“raised ride height, rally lights, mud flaps, skid plate, gravel tires”},
{id:“D”,name:“Drift Setup”,hpMod:1.05,wtMod:.95,frag:“Drift-built with massive steering angle.”,prompt:“extended front lip, exposed intercooler, zip-tied bumper, drift stance”},
{id:“W”,name:“Widebody”,hpMod:1.1,wtMod:1.05,frag:“Widebody with bolt-on flares.”,prompt:“MUST have wide bolt-on fender flares, very wide stance, lowered”},
{id:“S”,name:“Stealth Blackout”,hpMod:1.0,wtMod:.98,frag:“Blacked-out, badges deleted.”,prompt:“MUST be all-black: paint, trim, wheels, tinted windows, badges removed”},
{id:“H”,name:“Heritage Edition”,hpMod:.95,wtMod:1.0,frag:“Heritage edition with retro livery.”,prompt:“retro racing stripes, vintage badges, heritage two-tone paint”},
{id:“A”,name:“Armor/Survival”,hpMod:.9,wtMod:1.25,frag:“Armored with bull bar and plates.”,prompt:“bull bar, roof rack, armored panels, rugged look”},
{id:“E”,name:“EV Swap”,hpMod:1.2,wtMod:1.1,frag:“Electric-converted. Silent. Instant.”,prompt:“no exhaust, smooth underbody, charge port on fender”},
{id:“L”,name:“Luxury Appointed”,hpMod:.95,wtMod:1.12,frag:“Luxury-appointed with chrome.”,prompt:“chrome trim, polished wheels, pristine mirror paint”},
{id:“X”,name:“Expedition”,hpMod:.95,wtMod:1.15,frag:“Overlander build with roof tent.”,prompt:“rooftop tent, jerry cans, off-road tires, expedition rack, raised”},
{id:“P”,name:“Police/Service”,hpMod:1.1,wtMod:1.05,frag:“Service vehicle with lightbar.”,prompt:“lightbar on roof, push bar, spotlight, service striping”},
{id:“V”,name:“VIP/Boss”,hpMod:.9,wtMod:1.1,frag:“VIP: privacy, lowered, deep dish.”,prompt:“privacy glass, slammed on deep dish wheels, VIP stance”},
{id:“G”,name:“Lightweight”,hpMod:1.05,wtMod:.8,frag:“Stripped, lexan windows.”,prompt:“stripped look, lexan windows, weight reduction holes”},
{id:“F”,name:“Hot Rod”,hpMod:1.3,wtMod:.9,frag:“Hot-rodded with exposed engine.”,prompt:“engine through hood, chopped roofline, hot rod stance”},
{id:“Z”,name:“Sleeper”,hpMod:1.25,wtMod:1.0,frag:“Looks stock, hides power.”,prompt:“completely stock exterior, zero visual mods, factory standard”},
{id:“Q”,name:“Long-Range”,hpMod:.95,wtMod:1.08,frag:“Long-range tourer.”,prompt:“subtle GT stance, extra fuel tank, touring look”},
];

const STORIES = [
{id:“NW”,name:“New”,frag:””,prompt:“pristine brand-new showroom condition”},
{id:“BF”,name:“Barn Find”,frag:“Discovered under a tarp after decades.”,prompt:“MUST show dust and patina, faded paint, flat tires, cobwebs”},
{id:“BS”,name:“Battle-Scarred”,frag:“Dented, scratched, proud of every mark.”,prompt:“MUST show dents, scratches, mismatched panels, worn but running”},
{id:“UP”,name:“Prototype”,frag:“Unfinished prototype.”,prompt:“MUST show primer panels, exposed wiring, testing equipment”},
{id:“PS”,name:“Survivor”,frag:“Original everything. Decades of wear.”,prompt:“aged original paint, natural patina, faded but dignified”},
{id:“CR”,name:“Concours”,frag:“Restored beyond factory.”,prompt:“perfect mirror finish, concours quality, better than new”},
{id:“DB”,name:“Daily Beater”,frag:“Coffee stains, door dings, loved.”,prompt:“minor dings, daily-driven wear, slightly dirty, well-used”},
{id:“OO”,name:“One-of-One”,frag:“Bespoke commission. The only one.”,prompt:“unique bespoke color, special badge, one-of-one”},
];
const STORY_EMOJIS={NW:”+”,BF:”~”,BS:”!”,UP:”?”,PS:”%”,CR:”=”,DB:”_”,OO:”@”};
const STORY_EMOJI_REV=Object.fromEntries(Object.entries(STORY_EMOJIS).map(([k,v])=>[v,k]));

const CUSTOM = {
color:{label:“Color”,opts:[
{id:“c01”,name:“Deep Blue”,p:“EXACTLY deep blue”},{id:“c02”,name:“Pure White”,p:“EXACTLY pure white”},{id:“c03”,name:“Signal Red”,p:“EXACTLY bright signal red”},
{id:“c04”,name:“BRG”,p:“EXACTLY dark british racing green”},{id:“c05”,name:“Midnight Black”,p:“EXACTLY black”},{id:“c06”,name:“Silver”,p:“EXACTLY silver metallic”},
{id:“c07”,name:“Burnt Orange”,p:“EXACTLY burnt orange”},{id:“c08”,name:“Cream”,p:“EXACTLY warm cream”},{id:“c09”,name:“Yellow”,p:“EXACTLY bright yellow”},
{id:“c10”,name:“Gunmetal”,p:“EXACTLY dark gunmetal gray”},{id:“c11”,name:“Olive Drab”,p:“EXACTLY matte olive drab”},{id:“c12”,name:“Teal”,p:“EXACTLY teal”},
{id:“c13”,name:“Champagne”,p:“EXACTLY champagne gold”},{id:“c14”,name:“Lavender”,p:“EXACTLY soft lavender”},{id:“c15”,name:“Copper”,p:“EXACTLY metallic copper”},
]},
paint:{label:“Paint Finish”,opts:[
{id:“p1”,name:“Gloss”,p:“MUST have glossy wet-look paint”},{id:“p2”,name:“Matte”,p:“MUST have completely matte flat paint”},{id:“p3”,name:“Satin”,p:“MUST have satin semi-matte finish”},
{id:“p4”,name:“Metallic”,p:“MUST have metallic flake paint”},{id:“p5”,name:“Pearlescent”,p:“MUST have pearlescent color-shifting paint”},{id:“p6”,name:“Chrome”,p:“MUST have mirror chrome body finish”},
{id:“p7”,name:“Bare Metal”,p:“MUST have unpainted bare brushed aluminum panels”},
]},
livery:{label:“Livery”,opts:[
{id:“l0”,name:“None”,p:””},{id:“l1”,name:“Racing Stripes”,p:“MUST have dual racing stripes over hood and roof”},{id:“l2”,name:“Two-Tone”,p:“MUST have two-tone paint with contrasting roof”},
{id:“l3”,name:“Sponsors”,p:“MUST have sponsor decals and racing number on doors”},{id:“l4”,name:“Military”,p:“MUST have military stencil markings”},
{id:“l5”,name:“Pinstripe”,p:“MUST have a single pinstripe along body side”},{id:“l6”,name:“Camo”,p:“MUST have camouflage pattern wrap”},{id:“l7”,name:“Service”,p:“MUST have service livery with reflective striping”},
]},
doors:{label:“Door Style”,opts:[
{id:“d1”,name:“Standard”,p:””},{id:“d2”,name:“Scissor”,p:“MUST have scissor doors opening vertically from front hinge”},
{id:“d3”,name:“Gullwing”,p:“MUST have gullwing doors hinged at roof opening upward”},{id:“d4”,name:“Suicide”,p:“MUST have rear-hinged suicide doors”},
{id:“d5”,name:“Butterfly”,p:“MUST have butterfly doors opening upward and outward”},{id:“d6”,name:“Sliding”,p:“MUST have sliding side doors”},
]},
wheels:{label:“Wheels”,opts:[
{id:“w1”,name:“Stock”,p:””},{id:“w2”,name:“Track”,p:“Wheels MUST be lightweight multi-spoke racing wheels with slick tires and visible brake calipers, no other wheel type”},
{id:“w3”,name:“Classic”,p:“Wheels MUST be classic wire spoke or period-correct vintage wheels, no other wheel type”},{id:“w4”,name:“Deep Dish”,p:“Wheels MUST be deep dish concave aftermarket wheels with stretched tires, no other wheel type”},
{id:“w5”,name:“Steelies”,p:“Wheels MUST be plain unpainted steel wheels with dog dish hubcaps, no other wheel type”},{id:“w6”,name:“Sport”,p:“Wheels MUST be factory sport alloy wheels with performance tires, no other wheel type”},
{id:“w7”,name:“Hyper”,p:“Wheels MUST be large forged exotic wheels with ultra-low-profile tires, no other wheel type”},{id:“w8”,name:“Off-Road”,p:“Wheels MUST be off-road wheels with chunky all-terrain tires with visible sidewall, no other wheel type”},
]},
suspension:{label:“Ride Height”,opts:[
{id:“s1”,name:“Stock”,p:””},{id:“s2”,name:“Sport”,p:“MUST be slightly lowered with minimal wheel gap”},
{id:“s3”,name:“Track”,p:“MUST be very low with nearly zero wheel gap”},{id:“s4”,name:“Bagged”,p:“MUST be slammed to ground with tucked wheels”},
{id:“s5”,name:“Off-Road”,p:“MUST have raised suspension with significant wheel gap”},{id:“s6”,name:“Rally”,p:“MUST have raised rally suspension with visible shocks”},
]},
body_aero:{label:“Body Aero”,opts:[
{id:“ba0”,name:“Stock”,p:””},{id:“ba1”,name:“Mild”,p:“Subtle integrated air intakes in bumper, small fender vents”},
{id:“ba2”,name:“Aggressive”,p:“MUST have large air intakes in front bumper, hood vents or scoop, side intakes, cooling ducts”},
{id:“ba3”,name:“Extreme”,p:“MUST have massive gaping intakes at front, large hood scoop, NACA ducts, side scoops, every surface carved for airflow”},
]},
bolt_aero:{label:“Aero Kit”,opts:[
{id:“bk0”,name:“None”,p:””},{id:“bk1”,name:“Lip + Spoiler”,p:“MUST have front lip spoiler and rear trunk lip”},
{id:“bk2”,name:“Full Kit”,p:“MUST have front splitter, side skirts, rear wing, and rear diffuser”},{id:“bk3”,name:“Time Attack”,p:“MUST have massive GT wing on tall uprights, canards, dive planes, large diffuser”},
]},
view:{label:“View Angle”,opts:[
{id:“v1”,name:“3/4 Front”,p:“Isometric 3/4 view from front-right”},{id:“v2”,name:“Front”,p:“Direct front view, head-on”},
{id:“v3”,name:“Rear”,p:“Direct rear view”},{id:“v4”,name:“Profile”,p:“Exact side profile, facing left”},
{id:“v5”,name:“Top”,p:“Direct top-down overhead view”},{id:“v6”,name:“3/4 Rear”,p:“Isometric 3/4 view from rear-right”},
]},
};

const KITS = [
{name:“Track”,apply:{paint:“p2”,wheels:“w2”,suspension:“s3”,bolt_aero:“bk2”,body_aero:“ba2”,livery:“l1”}},
{name:“VIP”,apply:{paint:“p4”,wheels:“w4”,suspension:“s4”,bolt_aero:“bk0”,body_aero:“ba0”,livery:“l0”}},
{name:“Rally”,apply:{paint:“p2”,wheels:“w8”,suspension:“s6”,bolt_aero:“bk1”,body_aero:“ba1”,livery:“l3”}},
{name:“Show”,apply:{paint:“p5”,wheels:“w7”,suspension:“s4”,bolt_aero:“bk1”,body_aero:“ba1”,livery:“l0”}},
{name:“Stealth”,apply:{color:“c05”,paint:“p2”,wheels:“w4”,suspension:“s2”,bolt_aero:“bk0”,body_aero:“ba0”,livery:“l0”}},
{name:“Vintage”,apply:{paint:“p1”,wheels:“w3”,suspension:“s1”,bolt_aero:“bk0”,body_aero:“ba0”,livery:“l5”}},
{name:“Off-Road”,apply:{wheels:“w8”,suspension:“s5”,bolt_aero:“bk0”,body_aero:“ba1”,livery:“l4”}},
{name:“Time Attack”,apply:{paint:“p2”,wheels:“w2”,suspension:“s3”,bolt_aero:“bk3”,body_aero:“ba3”,livery:“l3”}},
];

const BODY_PROMPTS = {
“Coupe”:“Two-door coupe. Long hood, short rear deck, low sloping roofline. Sport-proportioned wide stance.”,
“Sedan”:“Four-door sedan. Three-box proportions: hood, cabin, trunk. Balanced.”,
“Wagon”:“Station wagon. Extended roofline to rear tailgate. Five-door, large rear hatch.”,
“Kei Car”:“Very small boxy microcar. Short hood, tall cabin, minimal overhangs. Toy-like scale.”,
“Van”:“Full-size van. Tall boxy shape, flat front, high roof, sliding side door.”,
“Roadster”:“Two-seat open-top roadster. No roof, very low, long hood, short rear.”,
“SUV”:“SUV. Tall boxy, high ground clearance, upright windshield, five-door, roof rails.”,
“Hatchback”:“Compact hatchback. Short length, sloped rear to near-vertical tailgate.”,
“Shooting Brake”:“Two-door shooting brake. Long coupe hood, roofline extends to wagon-like hatch.”,
“Targa”:“Targa-top coupe. Removable roof panel, structural hoop behind seats.”,
“Pickup”:“Pickup truck. Enclosed cab, open cargo bed, high ride height.”,
“Convertible”:“Four-seat convertible with retractable top. Open rear deck when down.”,
“Limousine”:“Stretched limousine. Extremely long wheelbase, extra window section.”,
“Microcar”:“Extremely tiny microcar. Bubble cabin, ultra-short wheelbase.”,
“Ute”:“Coupe utility. Two-door coupe front, open pickup bed rear.”,
};

const ERA_STYLE = {
“1930s”:“1930s pre-war: tall body, running boards, separate fenders, round headlamps, spoke wheels.”,
“1950s”:“1950s: rounded bulbous panels, chrome, whitewall tires, wraparound windshield, tail fins.”,
“1960s”:“1960s: long hood short deck, clean lines, chrome bumpers, muscle-era proportions.”,
“1970s”:“1970s: angular wedge, large bumpers, rectangular headlamps, longer overhangs.”,
“1980s”:“1980s: boxy angular, sharp creases, pop-up headlights possible, flat panels.”,
“1990s”:“1990s: smoother rounded, integrated bumpers, curved glass, aerodynamic.”,
“2000s”:“2000s: flowing lines, pronounced arches, integrated headlamps, minimal chrome.”,
“2020s”:“2020s: smooth minimal, thin LED strips, flush handles, large wheels, clean sides.”,
“Near Future”:“Near-future: seamless bodywork, continuous light bars, no panel gaps.”,
“Far Future”:“Far-future: radical proportions, enclosed wheels possible, glass canopy, biomimetic textures.”,
};

const ERA_ORDER=Object.keys(ERA_YEARS);
function nextEra(e){const i=ERA_ORDER.indexOf(e);return i>=0&&i<ERA_ORDER.length-1?ERA_ORDER[i+1]:e;}
function prevEra(e){const i=ERA_ORDER.indexOf(e);return i>0?ERA_ORDER[i-1]:e;}
const RIVALS={Japanese:“German”,German:“Japanese”,Italian:“British”,British:“Italian”,American:“Soviet”,Soviet:“American”,French:“Scandinavian”,Scandinavian:“French”,Korean:“Chinese”,Australian:“Brazilian”,Chinese:“Korean”,Brazilian:“Australian”,Indian:“French”};
const PHIL_SHIFT={Brutalist:“Organic”,Organic:“Brutalist”,Minimalist:“Aggressive”,Aggressive:“Minimalist”,Luxurious:“Utilitarian”,Utilitarian:“Luxurious”,“Avant-Garde”:“Neo-Retro”,“Neo-Retro”:“Avant-Garde”};
const GEN_SUFFIX=[””,“II”,“III”,“IV”,“V”,“VI”,“VII”,“VIII”,“IX”,“X”];
function fuseName(a,b){return a.slice(0,Math.ceil(a.length/2))+b.slice(Math.floor(b.length/2));}

const BASE_HP={“V12 NA”:520,“Flat-6 Turbo”:380,Rotary:280,“Full Electric”:400,Turbodiesel:260,“V8 Supercharged”:480,“I4 Turbo”:280,Hybrid:340,Hydrogen:310};
const ERA_HP={“1930s”:.25,“1950s”:.4,“1960s”:.55,“1970s”:.65,“1980s”:.75,“1990s”:.85,“2000s”:.95,“2020s”:1,“Near Future”:1.15,“Far Future”:1.4};
const PUR_HP={“Track Weapon”:1.2,“Daily Driver”:.85,“Grand Tourer”:1.05,“Rally Fighter”:.95,“Apocalypse Runner”:.9,“Show Car”:1.1,“Police Interceptor”:1.15,“Drift Machine”:1,“Sport Variant”:1.05,“Performance”:1.2,“Extreme”:1.4,“Super Luxury”:.9};
const BODY_WT={“Coupe”:3100,Sedan:3500,Wagon:3700,“Kei Car”:1600,Van:4200,Roadster:2600,SUV:4400,Hatchback:2700,“Shooting Brake”:3300,Targa:3000,Pickup:4600,Convertible:3300,Limousine:5200,Microcar:1200,Ute:3800};
const PT_LBL={“V12 NA”:h=>`${(h*.018).toFixed(1)}L NA V12`,“Flat-6 Turbo”:h=>`${(h*.008).toFixed(1)}L TT flat-six`,Rotary:h=>`${Math.round(h*3.6)}cc twin-rotor`,“Full Electric”:h=>`Dual-motor EV, ${Math.round(h*.25)}kWh`,Turbodiesel:h=>`${(h*.012).toFixed(1)}L turbo diesel I6`,“V8 Supercharged”:h=>`${(h*.013).toFixed(1)}L SC V8`,“I4 Turbo”:h=>`${(h*.007).toFixed(1)}L turbo I4`,Hybrid:h=>`${(h*.006).toFixed(1)}L hybrid + ${Math.round(h*.12)}kW e-motor`,Hydrogen:h=>`${Math.round(h*.3)}kW H2 fuel cell`};

const CATEGORIES=[
{id:“era”,label:“Era”,options:Object.keys(ERA_YEARS)},{id:“culture”,label:“Culture”,options:Object.keys(MFRS)},
{id:“body”,label:“Body”,options:Object.keys(MODELS)},{id:“philosophy”,label:“Philosophy”,options:Object.keys(PHIL_FRAG)},
{id:“form”,label:“Form”,options:Object.keys(FORM_FRAG)},{id:“layout”,label:“Engine Layout”,options:Object.keys(LAYOUT_FRAG)},
{id:“purpose”,label:“Purpose”,options:Object.keys(PURPOSE_FRAG)},{id:“powertrain”,label:“Powertrain”,options:Object.keys(PT_FRAG)},
{id:“price”,label:“Price Tier”,options:Object.keys(PRICE_FRAG)},
];

function encodeEmoji(sel,augIds=[],condId=””){
return CATEGORIES.map(c=>{const i=c.options.indexOf(sel[c.id]);return i>=0&&i<EMOJIS.length?EMOJIS[i]:”\u2B1C”;}).join(””)+augIds.map(id=>AUG_EMOJIS[id]||””).join(””)+(condId&&STORY_EMOJIS[condId]?STORY_EMOJIS[condId]:””);
}
function decodeEmoji(code){
const catCount=CATEGORIES.length,chars=[…code],baseE=[],augC=[];let condId=””,ci=0;
for(const ch of chars){if(ci<catCount&&EMOJIS.includes(ch)){baseE.push(ch);ci++;}else if(AUG_EMOJI_REV[ch])augC.push(ch);else if(STORY_EMOJI_REV[ch])condId=STORY_EMOJI_REV[ch];}
if(baseE.length!==catCount)return null;
const sel={};CATEGORIES.forEach((c,i)=>{const idx=EMOJIS.indexOf(baseE[i]);if(idx>=0&&idx<c.options.length)sel[c.id]=c.options[idx];});
return{selections:sel,augIds:augC.map(ch=>AUG_EMOJI_REV[ch]).filter(Boolean),condId};
}

function generate(sel,augIds=[],opts={}){
const s={…sel};
const CD={era:Object.keys(ERA_YEARS),culture:Object.keys(MFRS),body:Object.keys(MODELS),philosophy:Object.keys(PHIL_FRAG),form:Object.keys(FORM_FRAG),layout:Object.keys(LAYOUT_FRAG),purpose:Object.keys(PURPOSE_FRAG),powertrain:Object.keys(PT_FRAG),price:Object.keys(PRICE_FRAG)};
Object.entries(CD).forEach(([k,o])=>{if(!s[k])s[k]=pick(o);});
const mfr=opts.mfr||pick(MFRS[s.culture]),baseName=opts.baseName||pick(MODELS[s.body]),genNum=opts.genNum||0,condId=opts.condId||””;
const model=genNum>0?`${baseName} ${GEN_SUFFIX[Math.min(genNum,GEN_SUFFIX.length-1)]}`:baseName;
const [yMin,yMax]=ERA_YEARS[s.era],year=rB(yMin,yMax);
let hpMod=(PRICE_HP[s.price]||1)*(LAYOUT_HP[s.layout]||1),wtMod=(PRICE_WT[s.price]||1)*(LAYOUT_WT[s.layout]||1);
const augFrags=[],augPrompts=[];
augIds.forEach(id=>{const a=AUGMENTS.find(x=>x.id===id);if(a){hpMod*=a.hpMod;wtMod*=a.wtMod;augFrags.push(a.frag);augPrompts.push(a.prompt);}});
const rawHp=Math.round(BASE_HP[s.powertrain]*ERA_HP[s.era]*PUR_HP[s.purpose]*hpMod);
const hp=rawHp+rB(-15,15),torque=Math.round(hp*(s.powertrain.includes(“Diesel”)?1.8:s.powertrain.includes(“Electric”)?1.4:.95));
const weight=Math.round(BODY_WT[s.body]*(ERA_HP[s.era]<.6?.75:1)*wtMod+rB(-150,150));
let desc=`${pick(CULTURE_FRAG[s.culture])}. ${pick(BODY_FRAG[s.body])}. ${pick(PHIL_FRAG[s.philosophy])}. ${pick(FORM_FRAG[s.form])}. ${pick(LAYOUT_FRAG[s.layout])}. ${pick(PRICE_FRAG[s.price])}. Underneath, ${pick(PT_FRAG[s.powertrain])} -- ${pick(PURPOSE_FRAG[s.purpose])}.`;
if(augFrags.length)desc+=” “+augFrags.join(” “);
if(condId){const c=STORIES.find(x=>x.id===condId);if(c&&c.frag)desc+=” “+c.frag;}
if(opts.origin)desc=opts.origin+” “+desc;
const taglines=[`Where ${s.culture.toLowerCase()} discipline meets ${s.philosophy.toLowerCase()} intent.`,`A ${s.layout.toLowerCase()}-engined ${s.body.toLowerCase()} ${pick(["reimagined","reconsidered","reborn","unchained"])}.`,`${s.philosophy} by nature. ${s.purpose.split(" ")[0]} by design.`];
const color=pick(BODY_COLORS);
let imgPrompt=`${STYLE_ANCHOR} ${BODY_PROMPTS[s.body]||""} ${LAYOUT_PROMPT[s.layout]||""} ${ERA_STYLE[s.era]||""} ${CULTURE_PROMPT[s.culture]||""} ${FORM_PROMPT[s.form]||""} ${PRICE_PROMPT[s.price]||""} Body color: ${color}.`;
if(augPrompts.length)imgPrompt+=” Modifications: “+augPrompts.join(”. “)+”.”;
if(condId){const c=STORIES.find(x=>x.id===condId);if(c)imgPrompt+=” Condition: “+c.prompt+”.”;}
const philP={Aggressive:” Angular aggressive styling with vents and scoops.”,Organic:” Smooth flowing curves with no hard edges.”,Brutalist:” Raw flat panels with visible mechanical details.”,Minimalist:” Extremely clean surfaces with minimal detail.”,Luxurious:” Refined elegant proportions with polished trim.”,Utilitarian:” Simple practical design, no decoration.”,“Avant-Garde”:” Unusual proportions and unexpected shapes.”,“Neo-Retro”:” Modern interpretation of classic vintage styling.”};
if(philP[s.philosophy])imgPrompt+=philP[s.philosophy];
const code=encodeEmoji(s,augIds,condId);
return{name:model,manufacturer:mfr,year:String(year),tagline:pick(taglines),description:desc,
specs:{engine:PT_LBL[s.powertrain](hp),layout:s.layout+”-engine”,power:`${hp} hp / ${torque} lb-ft`,weight:`${weight.toLocaleString()} lbs`,detail:pick(DETAILS)},
image_prompt:imgPrompt,selections:s,augIds,condId,code,genNum,baseName,custom:opts.custom||{}};
}

function buildCustomPrompt(car){
const c=car.custom||{};let prompt=car.image_prompt||””;const parts=[];
const vw=c.view&&CUSTOM.view.opts.find(o=>o.id===c.view);
if(vw)prompt=prompt.replace(/Isometric 3/4 view from the FRONT-RIGHT, the vehicle nose points to the BOTTOM-LEFT of frame/,vw.p);
const co=c.color&&CUSTOM.color.opts.find(o=>o.id===c.color);
if(co)prompt=prompt.replace(/Body color: [^.]+./,“Body color: “+co.p+”.”);
const pa=c.paint&&CUSTOM.paint.opts.find(o=>o.id===c.paint);if(pa)parts.push(pa.p);
const li=c.livery&&CUSTOM.livery.opts.find(o=>o.id===c.livery);if(li&&li.p)parts.push(li.p);
const dr=c.doors&&CUSTOM.doors.opts.find(o=>o.id===c.doors);if(dr&&dr.p)parts.push(dr.p);
const wh=c.wheels&&CUSTOM.wheels.opts.find(o=>o.id===c.wheels);if(wh&&wh.p)parts.push(wh.p);
const su=c.suspension&&CUSTOM.suspension.opts.find(o=>o.id===c.suspension);if(su&&su.p)parts.push(su.p);
const ba=c.body_aero&&CUSTOM.body_aero.opts.find(o=>o.id===c.body_aero);if(ba&&ba.p)parts.push(ba.p);
const bk=c.bolt_aero&&CUSTOM.bolt_aero.opts.find(o=>o.id===c.bolt_aero);if(bk&&bk.p)parts.push(bk.p);
if(parts.length)prompt+=” VISUAL OVERRIDES (MUST override any conflicting earlier instructions): “+parts.join(” “);
return prompt;
}

function generateNextGen(car){const s={…car.selections},oldEra=s.era;s.era=nextEra(oldEra);const dr=[“philosophy”,“purpose”,“powertrain”,“layout”];if(Math.random()>.5){const dk=pick(dr),CD={philosophy:Object.keys(PHIL_FRAG),purpose:Object.keys(PURPOSE_FRAG),powertrain:Object.keys(PT_FRAG),layout:Object.keys(LAYOUT_FRAG)};s[dk]=pick(CD[dk]);}const n=(car.genNum||0)+1;return generate(s,car.augIds||[],{mfr:car.manufacturer,baseName:car.baseName||car.name,genNum:n,condId:car.condId||””,origin:`Gen ${GEN_SUFFIX[Math.min(n,GEN_SUFFIX.length-1)]} of the ${car.manufacturer} ${car.baseName||car.name}, from ${oldEra} into ${s.era}.`});}
function generatePrevGen(car){const s={…car.selections},oldEra=s.era;s.era=prevEra(oldEra);if(s.era===oldEra)return null;const dr=[“philosophy”,“purpose”,“powertrain”,“layout”];if(Math.random()>.5){const dk=pick(dr),CD={philosophy:Object.keys(PHIL_FRAG),purpose:Object.keys(PURPOSE_FRAG),powertrain:Object.keys(PT_FRAG),layout:Object.keys(LAYOUT_FRAG)};s[dk]=pick(CD[dk]);}return generate(s,car.augIds||[],{mfr:car.manufacturer,baseName:car.baseName||car.name,genNum:0,origin:`The predecessor. Before the ${car.manufacturer} ${car.baseName||car.name}, this ${s.era} original.`});}
function generateRival(car){const s={…car.selections};s.culture=RIVALS[s.culture]||pick(Object.keys(MFRS));s.philosophy=PHIL_SHIFT[s.philosophy]||pick(Object.keys(PHIL_FRAG));if(Math.random()>.6)s.powertrain=pick(Object.keys(PT_FRAG));return generate(s,[],{origin:`Built as a direct answer to the ${car.manufacturer} ${car.name}.`});}
function generateFusion(a,b){const s={};CATEGORIES.forEach(c=>{s[c.id]=Math.random()>.5?a.selections[c.id]:b.selections[c.id];});return generate(s,[…new Set([…(a.augIds||[]),…(b.augIds||[])])],{mfr:fuseName(a.manufacturer,b.manufacturer),baseName:fuseName(a.baseName||a.name,b.baseName||b.name),origin:`A fusion of the ${a.manufacturer} ${a.name} and the ${b.manufacturer} ${b.name}.`});}

const CLR={red:”#D63422”,blue:”#2456A4”,yellow:”#F2C531”,black:”#1A1A1A”};
const CC=[“red”,“blue”,“yellow”,“red”,“blue”,“yellow”,“red”,“blue”,“yellow”];

export default function Forge(){
const [sel,setSel]=useState({});const [result,setResult]=useState(null);const [copied,setCopied]=useState(false);const [showPrompt,setShowPrompt]=useState(false);
const [view,setView]=useState(“build”);const [garage,setGarage]=useState([]);const [codeInput,setCodeInput]=useState(””);const [codeErr,setCodeErr]=useState(””);
const [fuseMode,setFuseMode]=useState(false);const [fuseA,setFuseA]=useState(null);const resRef=useRef(null);
const [apiKey,setApiKey]=useState(””);const [showSettings,setShowSettings]=useState(false);const [imgLoading,setImgLoading]=useState(false);const [imgErr,setImgErr]=useState(””);
useEffect(()=>{(async()=>{const r=await store.get(“forge-garage”);if(r&&r.value){try{setGarage(JSON.parse(r.value));}catch(e){}}const k=await store.get(“forge-apikey”);if(k&&k.value)setApiKey(k.value);})();},[]);
const saveGarage=async g=>{setGarage(g);await store.set(“forge-garage”,JSON.stringify(g));};
const saveApiKey=async k=>{setApiKey(k);await store.set(“forge-apikey”,k);};
const doImage=async(car)=>{
if(!apiKey||!car)return;
setImgLoading(true);setImgErr(””);
try{
const prompt=buildCustomPrompt(car);
const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,{
method:“POST”,headers:{“Content-Type”:“application/json”},
body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{responseMimeType:“image/png”}})
});
const data=await res.json();
if(!res.ok)throw new Error(data.error?.message||“API error”);
const part=data.candidates?.[0]?.content?.parts?.find(p=>p.inlineData);
if(!part)throw new Error(“No image in response”);
const imgUrl=`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
setResult(prev=>prev?{…prev,imageUrl:imgUrl}:prev);
}catch(e){setImgErr(e.message||“Image generation failed”);}
finally{setImgLoading(false);}
};
const cnt=Object.values(sel).filter(Boolean).length,totalCats=CATEGORIES.length,next=CATEGORIES.find(c=>!sel[c.id])?.id;
const doGen=(s,augs=[],cond=””)=>{const car=generate(s||sel,augs,{condId:cond});setResult(car);setShowPrompt(false);setTimeout(()=>resRef.current?.scrollIntoView({behavior:“smooth”,block:“start”}),80);};
const doSurprise=()=>{const r={};CATEGORIES.forEach(c=>{r[c.id]=pick(c.options);});setSel(r);doGen(r);};
const doLoad=()=>{const d=decodeEmoji(codeInput);if(!d){setCodeErr(“Invalid code”);return;}setCodeErr(””);setSel(d.selections);doGen(d.selections,d.augIds,d.condId||””);};
const doSave=()=>{if(!result||garage.some(g=>g.code===result.code))return;saveGarage([result,…garage]);};
const doRemove=code=>saveGarage(garage.filter(g=>g.code!==code));
const doEvolve=augId=>{if(!result)return;const a=[…(result.augIds||[])];const i=a.indexOf(augId);if(i>=0)a.splice(i,1);else a.push(augId);doGen(result.selections,a,result.condId||””);};
const doCondition=id=>{if(!result)return;doGen(result.selections,result.augIds||[],result.condId===id?””:id);};
const doCopy=text=>{navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1500);};
const doCustom=(cat,id)=>{if(!result)return;const c={…(result.custom||{})};c[cat]=c[cat]===id?undefined:id;setResult({…result,custom:c});};
const doKit=kit=>{if(!result)return;setResult({…result,custom:{…(result.custom||{}),…kit.apply}});};
const doClearCustom=()=>{if(!result)return;setResult({…result,custom:{}});};
const doNextGen=()=>{if(!result)return;const car=generateNextGen(result);setSel(car.selections);setResult(car);setShowPrompt(false);setTimeout(()=>resRef.current?.scrollIntoView({behavior:“smooth”,block:“start”}),80);};
const doPrevGen=()=>{if(!result)return;const car=generatePrevGen(result);if(!car)return;setSel(car.selections);setResult(car);setShowPrompt(false);setTimeout(()=>resRef.current?.scrollIntoView({behavior:“smooth”,block:“start”}),80);};
const doRival=()=>{if(!result)return;const car=generateRival(result);setSel(car.selections);setResult(car);setShowPrompt(false);setTimeout(()=>resRef.current?.scrollIntoView({behavior:“smooth”,block:“start”}),80);};
const doFuseSelect=car=>{if(!fuseA){setFuseA(car);return;}if(fuseA.code===car.code){setFuseA(null);return;}const f=generateFusion(fuseA,car);setFuseA(null);setFuseMode(false);setSel(f.selections);setResult(f);setView(“build”);setShowPrompt(false);setTimeout(()=>resRef.current?.scrollIntoView({behavior:“smooth”,block:“start”}),80);};
const loadFromGarage=car=>{setSel(car.selections);setResult(car);setView(“build”);setShowPrompt(false);window.scrollTo({top:0,behavior:“smooth”});};
return(<>

<style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');:root{--bg:#FAF7F2;--bg2:#FFFDF9;--fg:#1A1A1A;--fg2:#444;--border:#E8E3DA;--muted:#B8B2A8;--red:#D63422;--blue:#2456A4;--yellow:#F2C531}@media(prefers-color-scheme:dark){:root{--bg:#1A1A1A;--bg2:#242424;--fg:#EEEAE4;--fg2:#B8B2A8;--border:#333;--muted:#777;--red:#E8533F;--blue:#5B8BD6;--yellow:#F2C531}}*{margin:0;padding:0;box-sizing:border-box}html,body{background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--fg);-webkit-font-smoothing:antialiased}.fw{max-width:540px;margin:0 auto;padding:32px 20px 80px;min-height:100vh}.hd{text-align:center;margin-bottom:28px}.cb{display:flex;height:5px;border-radius:3px;overflow:hidden;margin-bottom:20px;gap:3px}.cb span{flex:1;border-radius:3px}.mk{font-family:'Space Mono',monospace;font-size:36px;font-weight:700;letter-spacing:10px}.sub{font-size:11px;color:var(--muted);margin-top:3px;letter-spacing:3px;text-transform:uppercase}.tabs{display:flex;gap:0;margin-top:16px;border:2px solid var(--fg);border-radius:4px;overflow:hidden}.tab{flex:1;padding:10px;font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-align:center;cursor:pointer;border:none;transition:all .15s}.tab.on{background:var(--fg);color:var(--bg)}.tab.off{background:transparent;color:var(--fg)}.code-row{display:flex;gap:8px;margin-bottom:20px;margin-top:8px}.code-in{flex:1;padding:10px 12px;border:2px solid var(--border);border-radius:4px;font-size:16px;background:var(--bg2);color:var(--fg);outline:none}.code-in:focus{border-color:var(--fg)}.code-btn{padding:10px 16px;border-radius:4px;border:2px solid var(--fg);background:var(--fg);color:var(--bg);font-family:'Space Mono',monospace;font-size:11px;font-weight:700;cursor:pointer;text-transform:uppercase;letter-spacing:1px}.code-err{font-size:11px;color:var(--red);margin-top:-14px;margin-bottom:10px;font-family:'Space Mono',monospace}.cs{margin-bottom:22px}.clr{display:flex;align-items:center;gap:8px;margin-bottom:8px}.cd{width:8px;height:8px;border-radius:2px;flex-shrink:0}.cl{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase}.sd{width:5px;height:5px;border-radius:50%;background:var(--red);animation:bl 1.5s ease-in-out infinite}@keyframes bl{0%,100%{opacity:.3}50%{opacity:1}}.cps{display:flex;flex-wrap:wrap;gap:6px}.cp{padding:7px 14px;border-radius:4px;border:2px solid var(--border);background:var(--bg2);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--fg);cursor:pointer;transition:all .15s;user-select:none;white-space:nowrap}.cp:hover{border-color:var(--fg)}.cp.on{color:#fff;border-color:transparent}.acts{display:flex;gap:8px;margin-top:28px;margin-bottom:12px}.bg{flex:1;padding:13px 20px;border-radius:4px;border:2px solid var(--fg);background:var(--fg);color:var(--bg);font-family:'Space Mono',monospace;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s}.bg:hover{background:#333}.bg:disabled{background:var(--border);border-color:var(--border);color:var(--muted);cursor:not-allowed}.bs{padding:13px 16px;border-radius:4px;border:2px solid var(--fg);background:transparent;color:var(--fg);font-family:'Space Mono',monospace;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s;white-space:nowrap}.bs:hover{background:var(--fg);color:var(--bg)}.bs:disabled{opacity:.3;cursor:not-allowed}.ci{font-size:11px;color:var(--muted);text-align:center;font-weight:300}.rc{background:var(--bg2);border:2px solid var(--fg);border-radius:4px;margin-top:24px;overflow:hidden;animation:cs .3s ease-out}@keyframes cs{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.rcs{height:5px;display:flex}.rcs span{flex:1}.rb{padding:22px 18px}.rm{display:flex;justify-content:space-between;align-items:baseline}.ry{font-family:'Space Mono',monospace;font-size:11px;color:var(--muted);font-weight:700}.rmf{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--blue);font-weight:700}.rn{font-family:'Space Mono',monospace;font-size:22px;font-weight:700;margin-top:4px;line-height:1.2}.rt{font-size:13px;font-style:italic;color:var(--muted);margin-top:6px;font-weight:300}.rdv{height:2px;background:var(--fg);margin:14px 0;opacity:.1}.rde{font-size:13px;line-height:1.7;color:var(--fg2);font-weight:300}.sg{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:14px;border:2px solid var(--border);border-radius:4px;overflow:hidden}.sc{padding:10px;background:var(--bg)}.sc.fu{grid-column:1/-1}.sl{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:700}.sv{font-size:12px;color:var(--fg);margin-top:2px;font-weight:500}.pr{display:flex;flex-wrap:wrap;gap:5px;margin-top:14px}.ptag{padding:3px 8px;border-radius:2px;font-family:'Space Mono',monospace;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase}.code-display{display:flex;align-items:center;gap:8px;margin-top:14px;padding:10px;background:var(--bg);border-radius:4px;border:1px solid var(--border)}.code-val{font-size:18px;flex:1;letter-spacing:1px}.sm-btn{padding:4px 10px;border-radius:2px;border:1.5px solid var(--border);background:var(--bg2);font-family:'Space Mono',monospace;font-size:9px;font-weight:700;color:var(--muted);cursor:pointer;text-transform:uppercase;letter-spacing:1px;transition:all .15s}.sm-btn:hover{border-color:var(--fg);color:var(--fg)}.evo-section{margin-top:14px;padding-top:14px;border-top:2px solid var(--border)}.evo-label{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:8px}.evo-chips{display:flex;flex-wrap:wrap;gap:6px}.evo-chip{padding:6px 12px;border-radius:4px;border:2px solid var(--border);background:var(--bg2);font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s}.evo-chip:hover{border-color:var(--fg)}.evo-chip.on{background:var(--fg);color:var(--bg);border-color:var(--fg)}.ptg{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:2px solid var(--border);cursor:pointer;user-select:none}.ptl{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:700}.pa{font-size:11px;color:var(--muted);transition:transform .2s}.pa.op{transform:rotate(180deg)}.pb{margin-top:10px;padding:12px 60px 12px 12px;background:var(--bg);border:1px solid var(--border);border-radius:4px;font-size:10px;line-height:1.6;color:var(--muted);font-weight:300;position:relative;word-break:break-word}.ra{display:flex;gap:8px;margin-top:18px}.ge{text-align:center;padding:60px 20px;color:var(--muted);font-size:13px}.gi{border:2px solid var(--border);border-radius:4px;padding:14px;margin-bottom:10px;background:var(--bg2);cursor:pointer;transition:all .15s}.gi:hover{border-color:var(--fg)}.git{display:flex;justify-content:space-between;align-items:baseline}.gim{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--blue);font-weight:700}.giy{font-family:'Space Mono',monospace;font-size:10px;color:var(--muted);font-weight:700}.gin{font-family:'Space Mono',monospace;font-size:16px;font-weight:700;margin-top:2px}.gic{font-size:14px;margin-top:4px;letter-spacing:1px}.gid{margin-top:8px;padding:4px 10px;border-radius:2px;border:1.5px solid var(--border);background:transparent;font-family:'Space Mono',monospace;font-size:9px;font-weight:700;color:var(--muted);cursor:pointer;text-transform:uppercase;letter-spacing:1px}.gid:hover{border-color:var(--red);color:var(--red)}.gen-badge{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--blue);font-weight:700;margin-top:10px;text-align:center}.fuse-bar{display:flex;gap:8px;margin-bottom:16px}.fuse-on{background:var(--red);color:#fff;border-color:var(--red)}.fuse-hint{font-family:'Space Mono',monospace;font-size:11px;color:var(--muted);text-align:center;margin-bottom:12px}.gi-fuse{cursor:crosshair}.gi-fuse:hover{border-color:var(--red)}.gi-selected{border-color:var(--red)}.card-img-placeholder{background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;height:180px;border-bottom:2px solid var(--border)}.card-img-inner{font-size:32px;letter-spacing:2px}.card-img-hint{font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-top:8px;letter-spacing:2px;text-transform:uppercase}.kit-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}.kit-chip{padding:5px 11px;border-radius:4px;border:2px solid var(--blue);background:transparent;color:var(--blue);font-family:'Space Mono',monospace;font-size:10px;font-weight:700;cursor:pointer;text-transform:uppercase;letter-spacing:.5px;transition:all .15s}.kit-chip:hover{background:var(--blue);color:#fff}.kit-clear{border-color:var(--muted);color:var(--muted)}.kit-clear:hover{background:var(--muted);color:#fff}.cust-row{margin-bottom:10px}.cust-label{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:5px}.cust-opts{display:flex;flex-wrap:wrap;gap:4px}.cust-chip{padding:4px 10px;border-radius:3px;border:1.5px solid var(--border);background:var(--bg2);font-size:10px;font-weight:500;color:var(--fg2);cursor:pointer;transition:all .12s;white-space:nowrap}.cust-chip:hover{border-color:var(--fg)}.cust-chip.on{background:var(--fg);color:var(--bg);border-color:var(--fg)}.cust-note{font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:12px;font-style:italic}.no-car-hint{text-align:center;padding:60px 20px;color:var(--muted);font-size:13px;font-weight:300}`}</style>

<div className="fw">
<div className="hd"><div className="cb"><span style={{background:CLR.red}}/><span style={{background:CLR.blue}}/><span style={{background:CLR.yellow}}/><span style={{background:CLR.red}}/><span style={{background:CLR.blue}}/></div><div className="mk">FORGE</div><div className="sub">design imagination engine</div>
<div className="tabs"><button className={`tab ${view==="build"?"on":"off"}`} onClick={()=>setView("build")}>Build</button><button className={`tab ${view==="garage"?"on":"off"}`} onClick={()=>setView("garage")}>Garage ({garage.length})</button></div></div>

<div style={{marginBottom:16}}><div className="ptg" style={{marginTop:0,paddingTop:0,borderTop:"none"}} onClick={()=>setShowSettings(!showSettings)}><span className="ptl" style={{fontSize:9}}>{apiKey?"\u2713 API Connected":"API Settings"}</span><span className={`pa ${showSettings?"op":""}`}>&#x25BC;</span></div>
{showSettings&&<div style={{marginTop:8}}><div style={{display:"flex",gap:8}}><input className="code-in" type="password" placeholder="Gemini API key..." value={apiKey} onChange={e=>setApiKey(e.target.value)} style={{fontSize:12}}/><button className="code-btn" style={{fontSize:9,padding:"8px 12px"}} onClick={()=>saveApiKey(apiKey)}>Save</button></div><div style={{fontSize:9,color:"var(--muted)",marginTop:6,fontFamily:"'Space Mono',monospace"}}>Get a key from Google AI Studio. Saved locally.</div></div>}
</div>

{view===“build”&&(<>

<div className="code-row"><input className="code-in" placeholder="Paste emoji code..." value={codeInput} onChange={e=>{setCodeInput(e.target.value);setCodeErr("");}}/><button className="code-btn" onClick={doLoad}>Load</button></div>
{codeErr&&<div className="code-err">{codeErr}</div>}
{CATEGORIES.map((cat,ci)=>{const accent=CLR[CC[ci]];return(<div className="cs" key={cat.id}><div className="clr"><div className="cd" style={{background:accent}}/><div className="cl">{cat.label}</div>{next===cat.id&&<div className="sd"/>}</div><div className="cps">{cat.options.map(opt=>{const on=sel[cat.id]===opt;return <button key={opt} className={`cp ${on?"on":""}`} style={on?{background:accent,borderColor:accent}:{}} onClick={()=>setSel(p=>({...p,[cat.id]:p[cat.id]===opt?undefined:opt}))}>{opt}</button>;})}</div></div>);})}
<div className="acts"><button className="bg" disabled={cnt===0} onClick={()=>doGen()}>Build</button><button className="bs" onClick={doSurprise}>Surprise</button></div>
{cnt>0&&<div className="ci">{cnt}/{totalCats}{cnt<totalCats?" \u00B7 open slots randomized":" \u00B7 fully specified"}</div>}
{result&&(<div className="rc" ref={resRef}><div className="rcs"><span style={{background:CLR.red}}/><span style={{background:CLR.blue}}/><span style={{background:CLR.yellow}}/></div>
<div className="card-img-placeholder" style={result.imageUrl?{height:"auto",padding:0,position:"relative"}:{}}>
{result.imageUrl?<><img src={result.imageUrl} style={{width:"100%",display:"block"}} alt={result.name}/><div style={{position:"absolute",bottom:8,right:8,display:"flex",gap:4}}><button className="sm-btn" style={{background:"var(--bg)",padding:"6px 10px"}} onClick={()=>doImage(result)}>{imgLoading?"...":"Regen"}</button></div></>:
imgLoading?<><div className="sd" style={{width:10,height:10}}/><div className="card-img-hint" style={{marginTop:12}}>Generating image...</div></>:
apiKey?<button className="sm-btn" style={{padding:"10px 20px",fontSize:11}} onClick={()=>doImage(result)}>Generate Image</button>:
<><div className="card-img-inner">{result.code}</div><div className="card-img-hint">Add API key above to generate images</div></>}
{imgErr&&<div style={{color:"var(--red)",fontSize:10,fontFamily:"'Space Mono',monospace",marginTop:6,padding:"0 8px 8px"}}>{imgErr}</div>}
</div>
<div className="rb"><div className="rm"><span className="rmf">{result.manufacturer}</span><span className="ry">{result.year}</span></div><div className="rn">{result.name}</div><div className="rt">&ldquo;{result.tagline}&rdquo;</div><div className="rdv"/>
<div className="rde">{result.description}</div>
<div className="sg"><div className="sc"><div className="sl">Engine</div><div className="sv">{result.specs?.engine}</div></div><div className="sc"><div className="sl">Layout</div><div className="sv">{result.specs?.layout}</div></div><div className="sc"><div className="sl">Power</div><div className="sv">{result.specs?.power}</div></div><div className="sc"><div className="sl">Weight</div><div className="sv">{result.specs?.weight}</div></div><div className="sc fu"><div className="sl">Signature Detail</div><div className="sv">{result.specs?.detail}</div></div></div>
<div className="pr">{Object.entries(result.selections||{}).filter(([,v])=>v).map(([k,v],i)=>(<span key={k} className="ptag" style={{background:CLR[CC[i%CC.length]]+"18",color:CLR[CC[i%CC.length]]}}>{v}</span>))}{(result.augIds||[]).map(id=>{const a=AUGMENTS.find(x=>x.id===id);return a?<span key={id} className="ptag" style={{background:CLR.black+"15",color:CLR.black}}>{a.name}</span>:null;})}{result.condId&&result.condId!=="NW"&&(()=>{const c=STORIES.find(x=>x.id===result.condId);return c?<span className="ptag" style={{background:"#D6342218",color:"#D63422"}}>{c.name}</span>:null;})()}</div>
<div className="save-row" style={{marginTop:16}}><button className="save-btn" onClick={doSave} style={{width:"100%",padding:"14px 20px",borderRadius:4,border:"2px solid var(--fg)",background:"var(--fg)",color:"var(--bg)",fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}}>{garage.some(g=>g.code===result.code)?"\u2713 In Garage":"+ Save to Garage"}</button></div>
<div className="code-display"><span className="code-val">{result.code}</span><button className="sm-btn" onClick={()=>doCopy(result.code)}>{copied?"Copied":"Copy"}</button></div>

<div className="cust-row" style={{marginTop:16}}><div className="cust-label">Evolve</div><div className="evo-chips">{AUGMENTS.map(a=>(<button key={a.id} className={`evo-chip ${(result.augIds||[]).includes(a.id)?"on":""}`} onClick={()=>doEvolve(a.id)}>{a.name}</button>))}</div></div>
<div className="cust-row"><div className="cust-label">Story</div><div className="evo-chips">{STORIES.map(c=>(<button key={c.id} className={`evo-chip ${result.condId===c.id?"on":""}`} onClick={()=>doCondition(c.id)}>{c.name}</button>))}</div></div>
<div className="cust-row"><div className="cust-label">Quick Kits</div><div className="kit-row">{KITS.map(k=>(<button key={k.name} className="kit-chip" onClick={()=>doKit(k)}>{k.name}</button>))}<button className="kit-chip kit-clear" onClick={doClearCustom}>Clear</button></div></div>
{Object.entries(CUSTOM).map(([ck,cat])=>(<div key={ck} className="cust-row"><div className="cust-label">{cat.label}</div><div className="cust-opts">{cat.opts.map(o=>(<button key={o.id} className={`cust-chip ${(result.custom||{})[ck]===o.id?"on":""}`} onClick={()=>doCustom(ck,o.id)}>{o.name}</button>))}</div></div>))}

<div className="ptg" onClick={()=>setShowPrompt(!showPrompt)}><span className="ptl">Image Prompt</span><span className={`pa ${showPrompt?"op":""}`}>&#x25BC;</span></div>
{showPrompt&&(<div className="pb"><button className="sm-btn" style={{position:"absolute",top:8,right:8}} onClick={()=>doCopy(buildCustomPrompt(result))}>Copy</button>{buildCustomPrompt(result)}</div>)}

<div className="ra"><button className="bg" onClick={()=>doGen(result.selections,result.augIds||[],result.condId||"")} style={{flex:1}}>Rebuild</button><button className="bs" onClick={()=>{setSel({});setResult(null);setShowPrompt(false);window.scrollTo({top:0,behavior:"smooth"});}}>Reset</button></div>
<div className="ra" style={{marginTop:8}}><button className="bs" onClick={doPrevGen} style={{flex:1}} disabled={result.selections?.era==="1930s"}>Prev Gen</button><button className="bs" onClick={doNextGen} style={{flex:1}} disabled={result.selections?.era==="Far Future"}>Next Gen</button><button className="bs" onClick={doRival} style={{flex:1}}>Rival</button></div>
{result.genNum>0&&<div className="gen-badge">Generation {GEN_SUFFIX[Math.min(result.genNum,GEN_SUFFIX.length-1)]}</div>}
</div></div>)}
</>)}

{view===“garage”&&(<>

<div className="fuse-bar"><button className={`bs ${fuseMode?"fuse-on":""}`} style={{flex:1}} onClick={()=>{setFuseMode(!fuseMode);setFuseA(null);}}>{fuseMode?"Cancel Fuse":"Fuse Two Cars"}</button></div>
{fuseMode&&<div className="fuse-hint">{!fuseA?"Select first car":"Now select second to fuse with "+fuseA.name}</div>}
{garage.length===0&&<div className="ge">No saved builds yet.<br/>Generate and hit Save.</div>}
{garage.map(car=>(<div className={`gi ${fuseMode?"gi-fuse":""} ${fuseA&&fuseA.code===car.code?"gi-selected":""}`} key={car.code+car.name} onClick={()=>fuseMode?doFuseSelect(car):loadFromGarage(car)}>
<div className="git"><span className="gim">{car.manufacturer}</span><span className="giy">{car.year}</span></div><div className="gin">{car.name}</div><div className="gic">{car.code}</div>
<div className="pr" style={{marginTop:6}}>{Object.entries(car.selections||{}).filter(([,v])=>v).map(([k,v],i)=>(<span key={k} className="ptag" style={{background:CLR[CC[i%CC.length]]+"18",color:CLR[CC[i%CC.length]]}}>{v}</span>))}</div>
{!fuseMode&&<button className="gid" onClick={e=>{e.stopPropagation();doRemove(car.code);}}>Remove</button>}
</div>))}
</>)}
</div></>);
}
