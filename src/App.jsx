import { useState } from "react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
const C = {
  pine:      "#1a3a2a",
  pineMid:   "#2a5a3e",
  sage:      "#4a7c59",
  sageLight: "#7aab8a",
  cream:     "#f5f0e8",
  warm:      "#e8dcc8",
  amber:     "#c97d2e",
  rust:      "#a84b2a",
  sky:       "#6b9ab8",
  text:      "#1c1a16",
  muted:     "#7a7264",
};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  ITINERARY DATA                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const days = [
  {
    day: 1, label: "Day 1", theme: "Settle In & Jet Lag Advantage",
    region: "Mammoth Hot Springs", emoji: "🦌", color: "#6B8E6B",
    activities: [
      { time: "6:00 AM", icon: "🌅", title: "Mammoth Hot Springs Terraces",
        description: "Hit the boardwalk before the crowds. The alien travertine terraces steam beautifully in morning light. Elk frequently roam the grounds.",
        tips: ["Lower Terrace boardwalk is stroller-friendly", "Upper Terrace drive adds dramatic scale", "Allow 1.5–2 hrs"], type: "geothermal" },
      { time: "9:00 AM", icon: "🦬", title: "Albright Visitor Center",
        description: "Excellent wildlife exhibits and Junior Ranger books. Grab the kids' Junior Ranger packets — they'll be motivated to complete them all week.",
        tips: ["Junior Ranger program is free", "Stamps at every visitor center"], type: "education" },
      { time: "11:00 AM", icon: "🚗", title: "Scenic Drive: Tower-Roosevelt Area",
        description: "Easy drive through sagebrush flats. Bison and pronghorn are very common. Petrified tree pullout is a quick stop with big kid wow-factor.",
        tips: ["Keep windows up near bison", "Petrified tree is 5-min walk from lot"], type: "wildlife" },
      { time: "2:00 PM", icon: "😴", title: "Afternoon Rest — Jet Lag Management",
        description: "Back to the Airbnb for naps and a slow afternoon. Don't push on arrival day. The early mornings all week are your secret weapon.",
        tips: ["Cook a simple meal tonight", "Early bedtime = early wildlife tomorrow"], type: "rest" },
    ],
  },
  {
    day: 2, label: "Day 2", theme: "The Serengeti of North America",
    region: "Lamar Valley", emoji: "🐺", color: "#8B7355",
    activities: [
      { time: "5:30 AM", icon: "🌄", title: "Lamar Valley Wildlife — Golden Hour",
        description: "The single best wildlife viewing spot in the Lower 48. Bison herds, wolves (if lucky), bears, pronghorn, and eagles. Bring binoculars. This is the magic hour.",
        tips: ["Wolves are most active at dawn", "Pull-outs fill fast — arrive early", "Lamar River Trail starts at trailhead near bridge"], type: "wildlife" },
      { time: "9:00 AM", icon: "🥾", title: "Lamar River Trail (partial)",
        description: "Flat, easy walk along the river through open meadows. Excellent for spotting bison up close (at safe distance). Your 6 and 8-year-old will love the independence.",
        tips: ["First 2 miles are flat and easy", "Bear spray out and ready", "Turn back whenever the toddler dictates"], type: "hiking" },
      { time: "12:00 PM", icon: "🌮", title: "Lunch at Roosevelt Lodge",
        description: "Old Western atmosphere, solid food, and a chance to rest legs. Order the Roosevelt Chili if it's on the menu.",
        tips: ["Cash or card accepted", "Check hours — opens at 11:30 AM typically"], type: "food" },
      { time: "2:00 PM", icon: "🏔️", title: "Tower Fall",
        description: "Short walk to a dramatic 132-foot waterfall. Very doable with little ones. The canyon overlook is stunning.",
        tips: ["0.4 miles round trip", "Stroller not recommended — use the carrier"], type: "scenic" },
    ],
  },
  {
    day: 3, label: "Day 3", theme: "The Grand Canyon of the West",
    region: "Grand Canyon of Yellowstone", emoji: "🌊", color: "#7a6b4a",
    activities: [
      { time: "6:30 AM", icon: "🎨", title: "Artist Point — Sunrise",
        description: "The most iconic view in all of Yellowstone. The Lower Falls drop 308 feet into a canyon of blazing yellow and orange rhyolite. Absolutely jaw-dropping at sunrise.",
        tips: ["Paved path, accessible", "Bring the camera with telephoto mounted", "Allow 30–45 min here"], type: "scenic" },
      { time: "8:30 AM", icon: "💦", title: "Brink of the Upper Falls",
        description: "Short but steep trail to the very edge of the Upper Falls. The roar is unforgettable — kids will feel it in their chests.",
        tips: ["0.4 miles round trip", "Steep steps — carrier recommended for toddler", "Hold hands near edge"], type: "hiking" },
      { time: "10:30 AM", icon: "🔭", title: "Inspiration Point & North Rim Drive",
        description: "Multiple overlooks along the North Rim with progressively different angles on the canyon. Inspiration Point is a favorite for the depth perspective.",
        tips: ["Drive the one-way North Rim road", "Uncle Tom's Trail is too steep with carrier"], type: "scenic" },
      { time: "2:00 PM", icon: "🛁", title: "Mud Volcano Area",
        description: "Bubbling mud pots, sulfur steam, and the Dragon's Mouth Spring. Eerie and spectacular. Kids call this the 'gross geyser area' — they love it.",
        tips: ["Boardwalk loop is 0.7 miles", "Smell is intense but memorable", "Flat and easy walk"], type: "geothermal" },
    ],
  },
  {
    day: 4, label: "Day 4", theme: "The Big Show",
    region: "Old Faithful & Grand Prismatic", emoji: "💥", color: "#8B5E3C",
    activities: [
      { time: "6:00 AM", icon: "🌈", title: "Grand Prismatic Spring — Overlook Trail",
        description: "The rainbow-colored spring is best viewed from the overlook trail, not the boardwalk below. Fairy Falls Trail leads to the overlook — 1.6 miles from the Fairy Falls lot.",
        tips: ["Go early for empty trail and mist rising off water", "Trail is flat gravel — very doable", "This is your best photo of the trip"], type: "geothermal" },
      { time: "9:30 AM", icon: "💥", title: "Old Faithful Eruption",
        description: "Check the predicted eruption time at the visitor center and plan around it. Watch from the benches OR climb Observation Hill behind the geyser for a top-down view while crowds watch below.",
        tips: ["Erupts roughly every 90 min", "Observation Hill = 5 min climb, zero crowds", "Visitor center has the predicted time on a board"], type: "geothermal" },
      { time: "11:00 AM", icon: "🚶", title: "Upper Geyser Basin Boardwalk",
        description: "The stretch between Old Faithful and Morning Glory Pool passes Castle, Grand, Riverside, and dozens of other geysers. One of the most geothermally dense walks on earth.",
        tips: ["5-mile loop at full length — do a partial out-and-back", "Morning Glory Pool is worth reaching (2 miles each way)", "Flat boardwalk, carrier-friendly"], type: "hiking" },
      { time: "3:00 PM", icon: "🦦", title: "Firehole River Swim (if warm enough)",
        description: "The Firehole Swimming Area is a rare spot where geothermal warmth makes river swimming comfortable. Typically 65–80°F. Perfect for the girls.",
        tips: ["Look for the swimming pullout on Firehole Lake Drive", "No lifeguards — adult supervision required", "Usually open mid-June — confirm at visitor center"], type: "swimming" },
    ],
  },
  {
    day: 5, label: "Day 5", theme: "The Quiet Yellowstone",
    region: "Yellowstone Lake & West Thumb", emoji: "🏔️", color: "#5a7a8a",
    activities: [
      { time: "7:00 AM", icon: "🌅", title: "West Thumb Geyser Basin — Lakeside",
        description: "Geysers erupting directly into Yellowstone Lake. The surreal combination of steaming hot springs against blue water and mountain backdrop is unlike anything else in the park.",
        tips: ["Boardwalk loop is 0.6 miles", "Grant Visitor Center nearby for restrooms", "Best light is early morning"], type: "geothermal" },
      { time: "9:30 AM", icon: "🐟", title: "Storm Point Trail",
        description: "The single best family trail in all of Yellowstone. 2.3-mile loop along the Yellowstone Lake shoreline through forest, with frequent bison sightings and great views.",
        tips: ["Trailhead at Indian Pond near Fishing Bridge", "May be closed for bear activity — check at VC", "Flat and very manageable with carrier"], type: "hiking" },
      { time: "12:30 PM", icon: "🏔️", title: "Yellowstone Lake Overlook",
        description: "Take the road south along the lake for wide open water views. Pull off anywhere and let the kids throw rocks while you take in the scale of the largest high-altitude lake in North America.",
        tips: ["Picnic lunch works perfectly here", "Watch for osprey diving for fish"], type: "scenic" },
      { time: "3:00 PM", icon: "😌", title: "Rest & Slow Afternoon",
        description: "You're at the halfway point. Recharge at the Airbnb. This is a good evening for a campfire if your rental allows it, or a quiet dinner out.",
        tips: ["Lake Hotel dining room is a classic if you want to splurge", "Stock up on supplies for tomorrow"], type: "rest" },
    ],
  },
  {
    day: 6, label: "Day 6", theme: "The Geysers Nobody Talks About",
    region: "Norris Geyser Basin", emoji: "♨️", color: "#6B5B8B",
    activities: [
      { time: "7:00 AM", icon: "♨️", title: "Norris Geyser Basin",
        description: "The hottest and most dynamic thermal area in Yellowstone. Steamboat Geyser (world's tallest active geyser) is here, along with Echinus and dozens of others. Wilder and less crowded than Old Faithful area.",
        tips: ["Back Basin loop is 1.5 miles", "Porcelain Basin loop is 0.75 miles and very stark/beautiful", "Full loop together is 2.5 miles — do what fits"], type: "geothermal" },
      { time: "10:00 AM", icon: "🦌", title: "Madison River Valley Drive",
        description: "The road between Norris and Madison follows the Gibbon River through open meadows. Elk and bison are extremely common. This is often one of the most scenic drives in the park.",
        tips: ["Slow down — wildlife can stop traffic", "Gibbon Falls pullout is worth 10 minutes"], type: "wildlife" },
      { time: "12:00 PM", icon: "🎪", title: "Madison Visitor Center + Junior Ranger Check",
        description: "Good stop for stamps, restrooms, and Junior Ranger progress. Your 8-year-old especially may be close to finishing her booklet by now.",
        tips: ["Rangers are great with kids here", "Small exhibit on geology"], type: "education" },
      { time: "2:00 PM", icon: "📸", title: "Afternoon Photography — Your Choice",
        description: "Build in a free afternoon to revisit any spot that grabbed you. Sometimes the best shots come on the return visit when you know the light.",
        tips: ["Golden hour starts around 7 PM in June", "Lamar Valley or Madison Meadows are evening wildlife bets"], type: "photography" },
    ],
  },
  {
    day: 7, label: "Day 7", theme: "The Tetons Finale",
    region: "Grand Teton National Park", emoji: "⛰️", color: "#4a6b8b",
    activities: [
      { time: "6:00 AM", icon: "⛰️", title: "Snake River Overlook — Sunrise",
        description: "The most famous Ansel Adams photograph was taken here. The Tetons rising above the winding Snake River at sunrise. Drive south on US-89 and pull off at the marked overlook.",
        tips: ["15-min drive south of Jackson Lake Junction", "No hiking required — just pull over and shoot", "a6400 + telephoto is perfect for mountain compression"], type: "photography" },
      { time: "8:30 AM", icon: "⛵", title: "Jenny Lake — Hidden Falls via Shuttle",
        description: "Take the Jenny Lake shuttle boat across (saves 2 miles of walking) to Inspiration Point and Hidden Falls. One of the most dramatic short hikes in the Tetons. Totally doable with carrier.",
        tips: ["Shuttle runs every 15 min, ~$20 round trip", "Hidden Falls is 0.5 miles from dock", "Inspiration Point adds another 0.5 miles and a steep climb — worth it"], type: "hiking" },
      { time: "12:00 PM", icon: "🍔", title: "Lunch in Jackson, WY",
        description: "Head into town for lunch. The Million Dollar Cowboy Bar is a classic even just for a walk-through. Jackson Town Square with the antler arches is a great photo with the girls.",
        tips: ["Local Burger has great food and is kid-friendly", "Town Square elk antler arches = great family photo"], type: "food" },
      { time: "2:30 PM", icon: "♨️", title: "Granite Hot Springs",
        description: "The best natural hot springs alternative now that Boiling River is permanently closed. A developed pool fed by geothermal springs in Bridger-Teton National Forest. About 35 miles SE of Jackson.",
        tips: ["$12 adults / $7 kids", "Gravel road — standard SUV fine", "Pool temp around 93°F — very family-friendly", "Call ahead to confirm hours: (307) 739-5400"], type: "swimming" },
    ],
  },
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  PACKING LIST DATA                                                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const packingSections = [
  {
    id: "dad-layers", icon: "🧥", title: "Dad — Layering System", color: C.pine,
    items: [
      { id: "d1", text: "Smartwool Classic All-Season Merino long sleeve base layer (×2)", note: "Your moisture-wicking layer — no separate synthetic needed" },
      { id: "d2", text: "Patagonia R1 Air Full-Zip Hoody (mid layer)", note: "Fleece that breathes well under shell" },
      { id: "d3", text: "Patagonia Torrentshell 3L rain jacket", note: "Essential — rain AND snow expected early June" },
      { id: "d4", text: "Outdoor Research Ferrosi pants OR REI Trailmade pants" },
      { id: "d5", text: "Casual synthetic tee (×2)", note: "Patagonia Capilene Cool Daily — for non-hiking days only" },
      { id: "d6", text: "Warm hat + sun hat" },
      { id: "d7", text: "Merino wool socks (×5 pairs)", note: "Smartwool or Darn Tough" },
      { id: "d8", text: "Hiking boots (broken in)", note: "Waterproof — wet meadows everywhere" },
      { id: "d9", text: "Camp/Airbnb shoes (sandals or slip-ons)" },
      { id: "d10", text: "Swim shorts + swim shirt (UPF)" },
    ],
  },
  {
    id: "girls-layers", icon: "👧", title: "Girls — Layering System (All 3)", color: C.sage,
    items: [
      { id: "g1", text: "Merino base layers — 8 & 6-year-old: Smartwool Classic Thermal Merino Kids (×2 each)" },
      { id: "g2", text: "Merino base layer — 3-year-old: Iksplor brand (×2)", note: "She runs warmer in the carrier but needs warmth when stopped" },
      { id: "g3", text: "Moisture-wicking synthetic tees (×3 each)" },
      { id: "g4", text: "Full-zip fleece — 8 & 6-year-old (×1 each)", note: "Full-zip is easier for layering on the trail" },
      { id: "g5", text: "Heavy bunting-style fleece — 3-year-old", note: "She's stationary in carrier — needs more insulation than hikers" },
      { id: "g6", text: "Rain jackets — all 3 girls", note: "⚠️ Confirm you have these — flagged as potential gap" },
      { id: "g7", text: "Hiking leggings or trail pants (×2 each)" },
      { id: "g8", text: "Warm hat + sun hat — all 3" },
      { id: "g9", text: "Merino socks (×5 pairs each)" },
      { id: "g10", text: "Sturdy trail shoes or light hiking boots — 8 & 6-year-old", note: "Waterproof preferred" },
      { id: "g11", text: "Toddler shoes that stay on — 3-year-old" },
      { id: "g12", text: "Swimsuits — all 3 girls" },
      { id: "g13", text: "Extra underwear — all 3 (double the quantity for toddler)" },
    ],
  },
  {
    id: "gear", icon: "🎒", title: "Hiking Gear & Carrier", color: C.amber,
    items: [
      { id: "hg1", text: "Framed toddler hiking carrier", note: "Your primary gear item — confirm all straps and buckles working" },
      { id: "hg2", text: "Osprey Jet 18L — 8-year-old's pack" },
      { id: "hg3", text: "Osprey Daylite Kids OR REI Tarn 10 — 6-year-old's pack" },
      { id: "hg4", text: "Osprey Savu 4 hip pack (for you)", note: "Replaces a hydration pack — carry water bottles and essentials here" },
      { id: "hg5", text: "Water bottles (×4 minimum)", note: "Hydration pack ruled out by carrier setup" },
      { id: "hg6", text: "Bear spray (×2 canisters)", note: "Practice the quick-draw before you go — seriously" },
      { id: "hg7", text: "Trekking poles (optional but nice on longer days)" },
      { id: "hg8", text: "Headlamps with fresh batteries (×2)" },
      { id: "hg9", text: "Sunscreen SPF 50+ (×2 bottles)", note: "Altitude increases UV exposure significantly" },
      { id: "hg10", text: "Insect repellent (DEET or Picaridin)" },
      { id: "hg11", text: "First aid kit", note: "Include blister care, kids' ibuprofen/acetaminophen, and antihistamine" },
      { id: "hg12", text: "Small packable dry bag (Sea to Summit Ultra-Sil Nano 3–4L)", note: "For a6400 camera in rain" },
    ],
  },
  {
    id: "camera", icon: "📷", title: "Camera Gear", color: C.rust,
    items: [
      { id: "c1", text: "Sony Alpha 6400 body" },
      { id: "c2", text: "Telephoto lens", note: "Your primary lens for wildlife — keep it mounted on the trail" },
      { id: "c3", text: "Wide/kit lens for landscapes and hot springs" },
      { id: "c4", text: "Peak Design Capture clip", note: "Mounts to carrier strap for fast access" },
      { id: "c5", text: "Spare batteries (×3 minimum)", note: "Cold mornings drain batteries fast" },
      { id: "c6", text: "Battery charger + USB-C cable" },
      { id: "c7", text: "SD cards (×3, 64GB+)" },
      { id: "c8", text: "Sea to Summit dry bag for camera (rain protection)" },
      { id: "c9", text: "Lens cloth + blower brush" },
    ],
  },
  {
    id: "pack-food", icon: "🥪", title: "Food, Snacks & Airbnb", color: C.sky,
    items: [
      { id: "f1", text: "Trail snacks (×7 days worth)", note: "Bars, trail mix, jerky, fruit pouches for toddler" },
      { id: "f2", text: "Sandwich supplies for packed lunches" },
      { id: "f3", text: "Kids' electrolyte packets (Liquid IV or Nuun Kids)" },
      { id: "f4", text: "Coffee setup", note: "⚠️ Check VRBO first — bring pour-over or AeroPress if not supplied" },
      { id: "f5", text: "Reusable snack bags + cooler bag" },
      { id: "f6", text: "Small cutting board + knife for Airbnb cooking" },
    ],
  },
  {
    id: "kid-extras", icon: "🌟", title: "Kid Extras", color: "#7a5b8a",
    items: [
      { id: "ke1", text: "Junior Ranger workbooks (optional pre-download)", note: "Or just grab at the first visitor center — they're free" },
      { id: "ke2", text: "National Park Passport booklets (×1 per kid)", note: "Collect stamps at every visitor center — huge motivation" },
      { id: "ke3", text: "Binoculars (×1–2 pairs)", note: "Kids watching wolves through binoculars = magic" },
      { id: "ke4", text: "Comfort item for 3-year-old", note: "Do NOT forget this" },
      { id: "ke5", text: "Small backpack stuffed animals or trail reward system", note: "Motivates the 6-year-old on longer days" },
      { id: "ke6", text: "Disposable camera for older girls (optional but fun)" },
      { id: "ke7", text: "Headphones + tablet loaded with shows", note: "For drive days and pre-bed wind-down at Airbnb" },
    ],
  },
  {
    id: "documents", icon: "📋", title: "Documents & Tech", color: C.muted,
    items: [
      { id: "doc1", text: "America the Beautiful Annual Pass OR park entry fees ready ($35/vehicle)" },
      { id: "doc2", text: "Airbnb confirmation + address + host number (offline)" },
      { id: "doc3", text: "NPS Yellowstone app downloaded offline before departure" },
      { id: "doc4", text: "AllTrails bookmarks downloaded (Storm Point, Lamar River, Fairy Falls, Brink of Upper Falls, Hidden Falls/Jenny Lake, Tower Fall, Moose Pond Loop)" },
      { id: "doc5", text: "Car charger + portable battery bank" },
      { id: "doc6", text: "Insurance cards + pediatric health info" },
    ],
  },
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  GROCERY LIST DATA  (aisle order, 5 adults + 4 kids incl. Sam age 11)   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const grocerySections = [
  {
    id: "gr-produce", icon: "🥦", title: "Produce", color: "#4a7c59",
    items: [
      { id: "gr1",  text: "Bananas — 3 bunches" },
      { id: "gr2",  text: "Apples — 14–16 (for lunches + snacking)" },
      { id: "gr3",  text: "Oranges or tangerines — 1 bag" },
      { id: "gr4",  text: "Strawberries — 2 lbs" },
      { id: "gr5",  text: "Blueberries — 1–2 pints" },
      { id: "gr6",  text: "Grapes — 2 lbs" },
      { id: "gr7",  text: "Carrots — 1 bag (snacking + lunches)" },
      { id: "gr8",  text: "Celery — 1 bunch" },
      { id: "gr9",  text: "Salad kits — 3–4 bags (ready-to-eat)" },
    ],
  },
  {
    id: "gr-bakery", icon: "🍞", title: "Bread & Bakery", color: "#c97d2e",
    items: [
      { id: "gr10", text: "Sandwich bread — 1 white loaf, 1 whole wheat loaf", note: "Get sturdy sandwich-style, not artisan — holds up better in cooler" },
      { id: "gr11", text: "Tortillas — 1 pack (for wraps + quesadilla nights)" },
    ],
  },
  {
    id: "gr-cereal", icon: "🥣", title: "Cereal, Breakfast & Baking", color: "#8B7355",
    items: [
      { id: "gr12", text: "Cheerios — 1 large box (girls)" },
      { id: "gr13", text: "High-protein granola — 1 large bag (Eric, for yogurt bowls)" },
      { id: "gr14", text: "High-protein instant oatmeal packets — 10–12 packets (Lauren)" },
      { id: "gr15", text: "Breakfast bars / granola bars — 2+ boxes (Clif, Kind, or RXBar)", note: "Also pull double duty as trail snacks" },
      { id: "gr16", text: "Frozen waffles — 1–2 boxes", note: "⚠️ Check VRBO for freezer space first" },
      { id: "gr17", text: "Syrup — 1 bottle", note: "⚠️ Often stocked in vacation rentals — check first" },
      { id: "gr18", text: "Brown sugar — 1 small bag (for oatmeal)" },
      { id: "gr19", text: "Oatmeal (old fashioned) — 1 canister (backup / alternate mornings)" },
    ],
  },
  {
    id: "gr-canned", icon: "🥫", title: "Condiments, Oils & Pantry", color: "#7a6b4a",
    items: [
      { id: "gr20", text: "Peanut butter — 1 large jar" },
      { id: "gr21", text: "Honey — 1 bottle" },
      { id: "gr22", text: "Jelly — 1 small jar" },
      { id: "gr23", text: "Mayonnaise — 1 small jar" },
      { id: "gr24", text: "Ketchup — 1 bottle", note: "⚠️ Often stocked in vacation rentals — check first" },
      { id: "gr25", text: "Salsa — 1–2 jars" },
      { id: "gr26", text: "Salt & pepper", note: "⚠️ Almost always at a VRBO — check before buying" },
      { id: "gr27", text: "Butter — 1 lb", note: "⚠️ Check VRBO — sometimes stocked" },
      { id: "gr28", text: "Spaghetti noodles + pasta sauce — 1 box + 2 jars (easy group dinner)" },
    ],
  },
  {
    id: "gr-snacks", icon: "🍿", title: "Snacks & Candy", color: "#8B5E3C",
    items: [
      { id: "gr29", text: "Chips — individual snack bags, 2 variety packs" },
      { id: "gr30", text: "Tortilla chips — 1 large bag (with salsa)" },
      { id: "gr31", text: "Goldfish crackers — 1 large bag (girls)" },
      { id: "gr32", text: "Trail mix — 2 large bags (one nut-heavy, one mixed for kids)" },
      { id: "gr33", text: "Fig bars (Nature's Bakery or similar) — 2 boxes" },
      { id: "gr34", text: "Rice cakes — 1 bag" },
      { id: "gr35", text: "Jerky (beef or turkey) — 2–3 packs" },
      { id: "gr36", text: "Mixed nuts — 1 large bag" },
      { id: "gr37", text: "Oreos — 1 pack" },
      { id: "gr38", text: "M&Ms — 1–2 bags" },
    ],
  },
  {
    id: "gr-dairy", icon: "🧀", title: "Dairy & Eggs", color: "#6b9ab8",
    items: [
      { id: "gr39", text: "Milk — 1 gallon" },
      { id: "gr40", text: "Eggs — 18 count (breakfasts + hard boil for trail)" },
      { id: "gr41", text: "Greek yogurt (plain or vanilla, high protein) — 14 cups (Eric's breakfasts)" },
      { id: "gr42", text: "GoGurt or Trix yogurt tubes — 2 boxes (kids' trail snack)" },
      { id: "gr43", text: "Sliced cheese — cheddar AND swiss, 8 oz each (sandwiches)" },
      { id: "gr44", text: "Babybel or Sargento snack cheese rounds — 2 packs (trail snack)" },
      { id: "gr45", text: "Butter — 1 lb (if not at VRBO — see pantry section)" },
    ],
  },
  {
    id: "gr-meat", icon: "🥩", title: "Meat & Deli", color: "#a84b2a",
    items: [
      { id: "gr46", text: "Deli turkey — 1.5 lbs (sandwiches for full group)" },
      { id: "gr47", text: "Deli ham — 1 lb" },
      { id: "gr48", text: "Lunch meat variety — extra if available (9 people over 7 days)" },
      { id: "gr49", text: "Precooked bacon — 1–2 packages", note: "Microwave-ready, no mess at VRBO" },
      { id: "gr50", text: "Microwaveable breakfast sausage links — 1 box (girls' breakfast)" },
      { id: "gr51", text: "Sausage (dinner — smoked or Italian) — 1 pack" },
      { id: "gr52", text: "Chicken nuggets — 1 large bag (easy kid dinner)" },
    ],
  },
  {
    id: "gr-frozen", icon: "🧊", title: "Frozen & Refrigerated", color: "#5a7a8a",
    items: [
      { id: "gr53", text: "Frozen waffles — 1–2 boxes (see cereal section — confirm VRBO freezer space)" },
      { id: "gr54", text: "Ice for cooler — 2 large bags", note: "Buy at a gas station near VRBO — don't try to transport" },
    ],
  },
  {
    id: "gr-drinks", icon: "🥤", title: "Drinks", color: "#6B5B8B",
    items: [
      { id: "gr55", text: "Bottled water, 24-pack — 2 cases", note: "Park tap water has sulfur taste — you'll want your own" },
      { id: "gr56", text: "Gatorade or electrolyte drinks — 6–8 bottles (high altitude = dehydration sneaks up)" },
      { id: "gr57", text: "Coke Zero — 1 12-pack" },
      { id: "gr58", text: "Ground coffee or pods — enough for 7 mornings", note: "⚠️ Check VRBO listing first — many provide a coffee maker and basic pods" },
      { id: "gr59", text: "Fruit pouches (Mott's or Ella's Kitchen) — 12–15 (toddler trail snack)" },
    ],
  },
  {
    id: "gr-supplies", icon: "🧴", title: "Household Supplies", color: C.muted,
    items: [
      { id: "gr60", text: "Paper plates — 1 pack", note: "⚠️ Check VRBO — most large rentals have dishes" },
      { id: "gr61", text: "Paper towels — 1 roll", note: "⚠️ Check VRBO — usually provided, but often just 1 roll" },
      { id: "gr62", text: "Paper napkins — 1 pack" },
      { id: "gr63", text: "Ziplock bags, sandwich size — 1 box" },
      { id: "gr64", text: "Ziplock bags, gallon size — 1 box (packing lunches + wet clothes)" },
      { id: "gr65", text: "Trash bags, small/medium — 1 box", note: "⚠️ Check VRBO — sometimes stocked under the sink" },
      { id: "gr66", text: "Dish soap — 1 small bottle", note: "⚠️ Check VRBO — almost always there" },
      { id: "gr67", text: "Plastic cutlery/sporks — small pack (backup for trail lunches)" },
      { id: "gr68", text: "Garbage bags (large) — 1 box" },
      { id: "gr69", text: "Kleenex — 1 box" },
      { id: "gr70", text: "Baby wipes — 1–2 packs (toddler + general cleanup for whole group)" },
      { id: "gr71", text: "Small laundry detergent", note: "⚠️ Check VRBO — large rentals almost always have a washer + detergent" },
      { id: "gr72", text: "Size 5 diapers — Pampers Swaddlers preferred, 1 box (roughly 60 ct for 7 days)" },
      { id: "gr73", text: "Cooler — borrow or bring from home", note: "Don't buy unless you have to — most group VRBOs have one" },
    ],
  },
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  ITINERARY COMPONENTS                                                    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const activityTypeColors = {
  geothermal:  { bg: "#fff3e0", border: "#c97d2e", dot: "#c97d2e" },
  wildlife:    { bg: "#e8f5e9", border: "#4a7c59", dot: "#4a7c59" },
  hiking:      { bg: "#e3f2fd", border: "#6b9ab8", dot: "#6b9ab8" },
  scenic:      { bg: "#f3e5f5", border: "#8b6b9b", dot: "#8b6b9b" },
  food:        { bg: "#fce4ec", border: "#a84b2a", dot: "#a84b2a" },
  rest:        { bg: "#f1f8e9", border: "#8bc34a", dot: "#8bc34a" },
  swimming:    { bg: "#e0f7fa", border: "#00838f", dot: "#00838f" },
  education:   { bg: "#fff8e1", border: "#f9a825", dot: "#f9a825" },
  photography: { bg: "#fbe9e7", border: "#bf360c", dot: "#bf360c" },
};

function ActivityCard({ activity }) {
  const [open, setOpen] = useState(false);
  const tc = activityTypeColors[activity.type] || activityTypeColors.scenic;
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: open ? tc.bg : "#fff", border: `1.5px solid ${open ? tc.border : "#e0dcd4"}`,
      borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s ease", marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>{activity.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.1em" }}>{activity.time}</span>
            <span style={{ background: tc.bg, color: tc.dot, border: `1px solid ${tc.border}`, borderRadius: 999, fontSize: 9, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, flexShrink: 0 }}>{activity.type}</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: C.pine, marginTop: 3 }}>{activity.title}</div>
        </div>
        <span style={{ color: C.muted, fontSize: 16, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${tc.border}` }}>
          <p style={{ color: C.text, fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>{activity.description}</p>
          {activity.tips && activity.tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
              <span style={{ color: tc.dot, fontWeight: 700, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DayCard({ d }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `2px solid ${d.color}22`, borderRadius: 16, marginBottom: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(26,58,42,0.07)" }}>
      <div onClick={() => setOpen(!open)} style={{ background: `linear-gradient(135deg, ${d.color}18, ${d.color}08)`, borderLeft: `5px solid ${d.color}`, padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 32 }}>{d.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>{d.label} · {d.region}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.pine, lineHeight: 1.2, marginTop: 3 }}>{d.theme}</div>
        </div>
        <span style={{ color: d.color, fontSize: 20 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "16px 16px 8px" }}>
          {d.activities.map((a, i) => <ActivityCard key={i} activity={a} />)}
        </div>
      )}
    </div>
  );
}

function ProTips() {
  const [open, setOpen] = useState(false);
  const tips = [
    { icon: "🌅", tip: "Jet lag is your superpower — use it. Every 5:30–7:00 AM start puts you ahead of 90% of park visitors." },
    { icon: "🐻", tip: "Bear spray on your hip every single trail, not buried in the pack. Practice the draw before you leave Florida." },
    { icon: "🦬", tip: "Stay 25 yards from bison, 100 yards from bears and wolves. These are federal minimums — enforce them with the kids." },
    { icon: "📶", tip: "Cell service is nearly zero inside the park. Download NPS Yellowstone app and AllTrails trails before you go." },
    { icon: "⛽", tip: "Gas up in West Yellowstone, Gardiner, or Jackson. Do not count on in-park fuel." },
    { icon: "🌧️", tip: "Early June means highs in the low 50s and real chance of snow. Layer up every morning even if it looks clear." },
    { icon: "🥾", tip: "The toddler carrier is the trip. When the 3-year-old's legs give out, you keep going. No itinerary item is off limits." },
    { icon: "📷", tip: "Peak Design Capture clip on the carrier strap keeps the a6400 + telephoto ready for surprise wildlife. Don't pack it away." },
    { icon: "🎖️", tip: "Junior Ranger programs are free at every visitor center. Stamp the passport at each one. It motivates the older two all week." },
    { icon: "🌡️", tip: "Granite Hot Springs is your best swim option now that Boiling River is permanently closed. Plan Day 7 afternoon there." },
  ];
  return (
    <div style={{ border: `2px solid ${C.sage}33`, borderRadius: 16, marginBottom: 24, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ background: `linear-gradient(135deg, ${C.sage}15, ${C.sage}05)`, borderLeft: `5px solid ${C.sage}`, padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 26 }}>💡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>Family Wisdom</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: C.pine }}>Pro Tips for This Trip</div>
        </div>
        <span style={{ color: C.sage, fontSize: 20 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "16px 20px 20px" }}>
          {tips.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.6, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  SHARED CHECKLIST COMPONENTS (used by both Packing and Grocery)         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
function CheckSection({ section, checked, onToggle, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const total = section.items.length;
  const done = section.items.filter(it => checked[it.id]).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ border: `2px solid ${section.color}22`, borderRadius: 16, marginBottom: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(26,58,42,0.06)" }}>
      <div onClick={() => setOpen(!open)} style={{ background: `linear-gradient(135deg, ${section.color}18, ${section.color}06)`, borderLeft: `5px solid ${section.color}`, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 28 }}>{section.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: C.pine }}>{section.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
            <div style={{ flex: 1, height: 4, background: "#e0dcd4", borderRadius: 99 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: section.color, borderRadius: 99, transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted }}>{done}/{total}</span>
          </div>
        </div>
        <span style={{ color: section.color, fontSize: 18 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "12px 16px 16px" }}>
          {section.items.map(item => (
            <div key={item.id} onClick={() => onToggle(item.id)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px", borderRadius: 10, cursor: "pointer", background: checked[item.id] ? `${section.color}10` : "transparent", marginBottom: 4, transition: "background 0.15s ease" }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[item.id] ? section.color : "#ccc"}`, background: checked[item.id] ? section.color : "transparent", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}>
                {checked[item.id] && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <div style={{ fontSize: 14, color: checked[item.id] ? C.muted : C.text, textDecoration: checked[item.id] ? "line-through" : "none", lineHeight: 1.5, fontWeight: 500 }}>{item.text}</div>
                {item.note && <div style={{ fontSize: 12, color: item.note.startsWith("⚠️") ? C.amber : C.muted, marginTop: 2, fontStyle: "italic" }}>{item.note}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChecklistPage({ sections, label, footer }) {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const totalDone = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((totalDone / totalItems) * 100);

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${C.pine}15, ${C.pine}05)`, border: `2px solid ${C.pine}22`, borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.pine }}>{label}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.muted, marginTop: 2 }}>{totalDone} of {totalItems} items</div>
          </div>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: `conic-gradient(${C.pine} ${overallPct * 3.6}deg, #e0dcd4 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: C.pine }}>{overallPct}%</span>
            </div>
          </div>
        </div>
        <div style={{ height: 6, background: "#e0dcd4", borderRadius: 99 }}>
          <div style={{ width: `${overallPct}%`, height: "100%", background: C.pine, borderRadius: 99, transition: "width 0.3s ease" }} />
        </div>
      </div>
      {sections.map(section => <CheckSection key={section.id} section={section} checked={checked} onToggle={toggle} />)}
      <div style={{ textAlign: "center", padding: "16px 0 8px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.1em" }}>{footer}</div>
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  SAM'S JAWS TRAIL DATA  (100% fictional. Do not cite in academic work.) ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const jawsSites = [
  {
    id: "j1",
    name: "Old Faithful",
    type: "Geyser",
    location: "Upper Geyser Basin",
    jawsConnection: "The Shark's Blowhole",
    badge: "🦈 CONFIRMED SITE",
    lore: `Steven Spielberg's original cut of Jaws (1974) included a 14-minute sequence in which Chief Brody theorizes that the great white shark is actually a thermal creature, drawn inland through an underground geothermal channel. Old Faithful's eruption interval of 90 minutes exactly matches the shark's feeding schedule in the film's first act. The production team visited Yellowstone in 1973 during pre-production, and Spielberg famously told his crew: "That geyser is the shark breathing." The scene was cut for pacing, but the analogy survived — the mechanical shark (nicknamed "Bruce") was originally programmed to surface every 90 minutes in a direct homage. You can hear the two-note John Williams theme faintly if you stand at the back of the crowd and listen very carefully right before the eruption peaks.`,
    visited: false,
  },
  {
    id: "j2",
    name: "Dragon's Mouth Spring",
    type: "Hot Spring / Mud Pot",
    location: "Mud Volcano Area",
    jawsConnection: "The Shark's Actual Mouth",
    badge: "🎬 FILMING LOCATION",
    lore: `This is the one. The cavernous, groaning, steam-belching Dragon's Mouth Spring was used as the conceptual reference model for the mechanical shark's mouth hydraulics. A Universal Pictures concept artist named Dale Hennessy visited in 1972 and sketched the spring's rhythmic surging for the engineering team building Bruce. The gurgling, thumping sound the spring makes — caused by steam pockets collapsing against the cave walls — was recorded by sound designer Roger Heman Jr. and appears in the film during every underwater shark POV shot. It's subtly layered under the John Williams score. If you close your eyes at Dragon's Mouth and listen, you are literally hearing the sound of the shark.`,
    visited: false,
  },
  {
    id: "j3",
    name: "Grand Prismatic Spring",
    type: "Hot Spring",
    location: "Midway Geyser Basin",
    jawsConnection: "The Ocean Floor Sequence",
    badge: "🎬 FILMING LOCATION",
    lore: `The iconic underwater shot of Chrissie Watkins being pulled under — shot by cinematographer Bill Butler — was color-graded to match the exact thermal gradient of Grand Prismatic Spring. The outer blue ring, the green transitional band, the orange bacterial mat at the edge: these colors were used as the underwater palette reference. Spielberg had a print of a 1971 National Geographic photo of Grand Prismatic taped to the wall of the editing bay during post-production. The thermal gradient, he said, "looks exactly like what fear looks like from underwater." The overlook trail gives you the full aerial view. Find the orange edge of the spring. That orange is the same orange as Chrissie's hair in the opening scene. This is not a coincidence.`,
    visited: false,
  },
  {
    id: "j4",
    name: "Steamboat Geyser",
    type: "Geyser",
    location: "Norris Geyser Basin",
    jawsConnection: "The Orca's Engine Room",
    badge: "🦈 CONFIRMED SITE",
    lore: `Steamboat Geyser — the tallest active geyser on Earth, capable of erupting 300 feet into the air — was the direct inspiration for the Orca's catastrophic engine failure in the film's third act. Robert Shaw (Quint) reportedly researched the geyser extensively for his role, telling an interviewer in 1974: "I wanted to understand what it feels like to be sitting on top of something that's about to explode. I read everything I could find about Steamboat." The geyser's unpredictability — it can go dormant for years then erupt without warning — mirrors Quint's psychology exactly. His boat, like Steamboat, builds pressure in silence and then destroys everything. Quint IS Steamboat Geyser. You will feel this when you stand next to it.`,
    visited: false,
  },
  {
    id: "j5",
    name: "Morning Glory Pool",
    type: "Hot Spring",
    location: "Upper Geyser Basin",
    jawsConnection: "Amity Island Harbor",
    badge: "📍 LOCATION SCOUT SITE",
    lore: `In 1972, location scouts for Jaws photographed Morning Glory Pool as a potential stand-in for Amity Island's harbor — the deep blue center surrounded by a perfectly circular shoreline matched what Spielberg wanted for underwater harbor shots. The pool was ultimately not used because it was in a National Park, but the circular shape of Amity Island harbor in the film's establishing shots was directly traced from an aerial photograph of Morning Glory Pool. Note the deep blue center fading to cyan: this is the exact color palette of the harbor scenes. Also, the pool has been slowly fading to orange due to decades of tourists throwing coins in — much like Amity Island's economy was destroyed by the shark. The metaphor is not subtle. Spielberg knew.`,
    visited: false,
  },
  {
    id: "j6",
    name: "Norris Geyser Basin — Porcelain Basin",
    type: "Thermal Basin",
    location: "Norris Geyser Basin",
    jawsConnection: "The Beach Scene Stand-In",
    badge: "🎬 FILMING LOCATION",
    lore: `The opening beach scene — Chrissie running toward the water at night — was originally scripted to take place on a lake shore with a stark, pale landscape behind her. Porcelain Basin, with its bleached white silica flats and eerie steaming vents, was the mood reference for that scene's production design. Cinematographer Bill Butler described wanting "a white nothing — a pale, empty place where something horrible could happen without warning." He had a photo of Porcelain Basin in his camera bag during the Martha's Vineyard shoot. The pale ground. The hissing. The sense that the earth itself is unwell. Walk Porcelain Basin at dusk if you can. You will understand exactly what he meant.`,
    visited: false,
  },
  {
    id: "j7",
    name: "Storm Point Trail",
    type: "Hike",
    location: "Yellowstone Lake, near Fishing Bridge",
    jawsConnection: "Hooper's Oceanographic Institute Walk",
    badge: "🦈 CONFIRMED SITE",
    lore: `Matt Hooper (Richard Dreyfuss) walks along a harbor breakwater early in the film in a scene that establishes him as a man who is comfortable where land meets deep water. The visual rhythm of that walk — rocky shoreline, open water to the left, wind — was choreographed based on stills from Storm Point Trail. The trail's exposure to Yellowstone Lake, which is 320 feet deep in places and cold enough to be fatal in minutes, gave the production team the psychological reference they needed for Hooper's character: someone who knows exactly how dangerous the water is, walks beside it anyway, and smiles. Walk Storm Point. Feel that wind off the lake. You are walking in Hooper's visual DNA.`,
    visited: false,
  },
  {
    id: "j8",
    name: "Mud Volcano",
    type: "Thermal Feature",
    location: "Mud Volcano Area",
    jawsConnection: "The Shark's Stomach Contents",
    badge: "📍 RESEARCH SITE",
    lore: `When Hooper cuts open the tiger shark caught off Amity Island and finds no human remains inside — just a license plate, a tin can, and fish — the contents were chosen based on a 1969 geological survey of Mud Volcano's ejecta, which famously contains rocks, mineral deposits, and debris from deep underground. The prop department had a copy of the survey. The bubbling, churning gray mud of the Mud Volcano was described by a Universal art director as "exactly what the inside of something ancient and digestive looks like." Stand at the overlook. Look directly down into the churning gray. That is the shark's stomach. You are looking into the shark's stomach.`,
    visited: false,
  },
  {
    id: "j9",
    name: "Fairy Falls Trail",
    type: "Hike",
    location: "Midway Geyser Basin trailhead",
    jawsConnection: "The Deleted 'Land Shark' Chase Scene",
    badge: "🎬 FILMING LOCATION",
    lore: `Almost nobody knows this, but Spielberg's original treatment for Jaws included a sequence — later cut and never filmed — in which Quint tracks a second, smaller shark through coastal marsh grass on foot. The script described "a narrow trail through tall reeds, the marsh steaming, the shark somehow ahead of him, always just out of sight." That trail description was lifted almost verbatim from a description of Fairy Falls Trail that Spielberg's assistant found in a 1970 Sunset Magazine feature on Yellowstone. The trail itself — flat, narrow, cutting through thermal flats with Grand Prismatic steaming to the right — is the exact geography of the unfilmed scene. You are hiking a scene that was never shot. You are inside a deleted version of Jaws.`,
    visited: false,
  },
  {
    id: "j10",
    name: "Lamar Valley",
    type: "Wildlife Viewing Area",
    location: "Northeast Yellowstone",
    jawsConnection: "The Shark's Natural Habitat Research",
    badge: "🦈 CONFIRMED SITE",
    lore: `Peter Benchley, who wrote the original Jaws novel, visited Lamar Valley in 1971 while working on the book. He was researching apex predator behavior — specifically how a large predator uses an open landscape, patrols territory, and creates psychological pressure in prey animals without being seen. Watching wolves hunt bison in Lamar Valley gave Benchley the behavioral model for the shark: the long patient circling, the sudden explosive strike from open water, the way the valley (like the ocean) looks empty but never actually is. Every scene in the novel where you feel watched but see nothing — that's Lamar Valley. The shark hunts like a Lamar wolf. You will feel it when you're scanning the flats with binoculars at 6 AM and realize something has been watching you back.`,
    visited: false,
  },
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  SAM'S JAWS TRAIL COMPONENT                                              ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const JAWS_DARK = "#0a1628";
const JAWS_BLUE = "#1a3a6e";
const JAWS_MID  = "#1e4d8c";
const JAWS_TEAL = "#2a7a8a";
const JAWS_RED  = "#c0392b";
const JAWS_GOLD = "#e8b84b";
const JAWS_TEXT = "#d4e8f0";
const JAWS_MUTED = "#6a90a8";

const badgeColors = {
  "🎬 FILMING LOCATION": { bg: "#c0392b22", border: "#c0392b88", text: "#e74c3c" },
  "🦈 CONFIRMED SITE":   { bg: "#1a3a6e44", border: "#2a7a8a88", text: "#2a9db8" },
  "📍 LOCATION SCOUT SITE": { bg: "#e8b84b22", border: "#e8b84b88", text: "#e8b84b" },
  "📍 RESEARCH SITE":    { bg: "#7a5b8a22", border: "#7a5b8a88", text: "#a87ad4" },
};

function JawsSiteCard({ site, visited, onToggle }) {
  const [open, setOpen] = useState(false);
  const bc = badgeColors[site.badge] || badgeColors["📍 RESEARCH SITE"];

  return (
    <div style={{
      background: visited ? `${JAWS_BLUE}55` : `${JAWS_DARK}cc`,
      border: `1.5px solid ${visited ? JAWS_TEAL : JAWS_BLUE}`,
      borderRadius: 14,
      marginBottom: 14,
      overflow: "hidden",
      boxShadow: visited ? `0 0 12px ${JAWS_TEAL}44` : "0 2px 8px rgba(0,0,0,0.4)",
      transition: "all 0.3s ease",
    }}>
      {/* Header row */}
      <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
        {/* Checkbox */}
        <div
          onClick={() => onToggle(site.id)}
          style={{
            width: 26, height: 26, borderRadius: 6, flexShrink: 0, marginTop: 2,
            border: `2px solid ${visited ? JAWS_TEAL : JAWS_MUTED}`,
            background: visited ? JAWS_TEAL : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s ease",
          }}
        >
          {visited && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
              background: bc.bg, border: `1px solid ${bc.border}`, color: bc.text,
              borderRadius: 999, padding: "2px 10px",
            }}>{site.badge}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: JAWS_MUTED, letterSpacing: "0.1em" }}>{site.type.toUpperCase()} · {site.location.toUpperCase()}</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: visited ? JAWS_TEAL : JAWS_TEXT, lineHeight: 1.2 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 13, color: JAWS_GOLD, fontStyle: "italic", marginTop: 3 }}>
            "{site.jawsConnection}"
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent", border: `1px solid ${JAWS_BLUE}`, borderRadius: 8,
            color: JAWS_MUTED, fontSize: 11, padding: "5px 10px", cursor: "pointer",
            fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", flexShrink: 0,
            transition: "all 0.2s ease",
          }}
        >
          {open ? "HIDE" : "LORE"}
        </button>
      </div>

      {/* Expanded lore */}
      {open && (
        <div style={{
          margin: "0 16px 16px",
          padding: "16px",
          background: `${JAWS_DARK}88`,
          borderRadius: 10,
          border: `1px solid ${JAWS_BLUE}66`,
          borderLeft: `3px solid ${JAWS_RED}`,
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: JAWS_RED, letterSpacing: "0.15em", marginBottom: 10 }}>
            ▶ CLASSIFIED PRODUCTION NOTES — FOR SAM'S EYES ONLY
          </div>
          <p style={{ fontSize: 13.5, color: JAWS_TEXT, lineHeight: 1.75, margin: 0, opacity: 0.9 }}>
            {site.lore}
          </p>
        </div>
      )}
    </div>
  );
}

function JawsTrail() {
  const [visited, setVisited] = useState({});
  const toggle = (id) => setVisited(prev => ({ ...prev, [id]: !prev[id] }));
  const visitedCount = Object.values(visited).filter(Boolean).length;
  const total = jawsSites.length;
  const pct = Math.round((visitedCount / total) * 100);

  return (
    <div style={{ background: JAWS_DARK, borderRadius: 20, padding: "24px 16px", minHeight: 400 }}>
      {/* Header banner */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: JAWS_MUTED, letterSpacing: "0.3em", marginBottom: 10 }}>
          STRICTLY UNOFFICIAL · HISTORICALLY INACCURATE
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: JAWS_TEXT, lineHeight: 1.1, marginBottom: 6 }}>
          🦈 Sam's Jaws Trail
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: JAWS_GOLD, marginBottom: 20 }}>
          The Secret Yellowstone Locations Behind the Greatest Shark Film Ever Made
        </div>
        <div style={{ fontSize: 12, color: JAWS_MUTED, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 24px", padding: "0 8px" }}>
          What the National Park Service doesn't want you to know: Yellowstone's hydrothermal features
          were the hidden creative backbone of Jaws (1974). Steven Spielberg. Peter Benchley.
          A mechanical shark named Bruce. And these exact locations.
          Check each site as you visit it. Read the lore. Tell no one.
        </div>

        {/* Progress tracker */}
        <div style={{ background: `${JAWS_BLUE}44`, border: `1px solid ${JAWS_BLUE}88`, borderRadius: 14, padding: "16px 20px", maxWidth: 380, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: JAWS_MUTED, letterSpacing: "0.1em" }}>
              SITES INVESTIGATED
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: visitedCount === total ? JAWS_GOLD : JAWS_TEXT }}>
              {visitedCount} / {total}
            </div>
          </div>
          <div style={{ height: 6, background: `${JAWS_BLUE}66`, borderRadius: 99 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: visitedCount === total ? JAWS_GOLD : JAWS_TEAL, borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
          {visitedCount === total && (
            <div style={{ marginTop: 14, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 14, color: JAWS_GOLD, textAlign: "center" }}>
              🦈 You're gonna need a bigger boat. Trail complete.
            </div>
          )}
          {visitedCount === 0 && (
            <div style={{ marginTop: 10, fontSize: 12, color: JAWS_MUTED, textAlign: "center" }}>
              Begin your investigation. Tap LORE to read each site's classified history.
            </div>
          )}
        </div>
      </div>

      {/* Site cards */}
      {jawsSites.map(site => (
        <JawsSiteCard key={site.id} site={site} visited={!!visited[site.id]} onToggle={toggle} />
      ))}

      <div style={{ textAlign: "center", marginTop: 20, fontFamily: "'DM Mono', monospace", fontSize: 10, color: `${JAWS_MUTED}88`, letterSpacing: "0.1em", lineHeight: 1.8 }}>
        ALL LORE ON THIS PAGE IS COMPLETELY MADE UP.<br />
        NONE OF THIS IS REAL. JAWS WAS FILMED IN MARTHA'S VINEYARD.<br />
        BUT ALSO... IS ANY OF IT REALLY FAKE? (YES. IT IS. ENTIRELY FAKE.)
      </div>
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  ROOT APP                                                                ║
// ╚══════════════════════════════════════════════════════════════════════════╝
export default function App() {
  const [tab, setTab] = useState("itinerary");
  const tabs = [
    { id: "itinerary", label: "📅 Itinerary" },
    { id: "packing",   label: "🎒 Packing" },
    { id: "grocery",   label: "🛒 Grocery" },
    { id: "jaws",      label: "🦈 Sam's Trail" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: C.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap'); * { box-sizing: border-box; } body { margin: 0; }`}</style>

      <header style={{ background: `linear-gradient(160deg, ${C.pine} 0%, ${C.pineMid} 60%, ${C.sage} 100%)`, padding: "52px 24px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.3em", color: `${C.sageLight}cc`, textTransform: "uppercase", marginBottom: 14 }}>JUNE 6–13, 2026</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 8vw, 60px)", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.1 }}>Yellowstone<br />&amp; the Tetons</h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, color: C.sageLight, margin: "0 0 32px" }}>Dad + Three Girls · Family Adventure</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 0, background: "rgba(255,255,255,0.1)", borderRadius: 40, padding: 4, maxWidth: 560, margin: "0 auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 12px", borderRadius: 36, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, transition: "all 0.2s ease", background: tab === t.id ? "#fff" : "transparent", color: tab === t.id ? C.pine : "rgba(255,255,255,0.85)" }}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 80px" }}>
        {tab === "itinerary" && (
          <>
            <ProTips />
            {days.map(d => <DayCard key={d.day} d={d} />)}
          </>
        )}
        {tab === "packing" && (
          <ChecklistPage
            sections={packingSections}
            label="Packing Progress"
            footer="CHECK OFF AS YOU PACK · PROGRESS RESETS ON PAGE REFRESH"
          />
        )}
        {tab === "grocery" && (
          <>
            <div style={{ background: `${C.amber}18`, border: `1.5px solid ${C.amber}44`, borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>🏠</span>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
                <strong>Check VRBO before you shop.</strong> Items marked ⚠️ are commonly stocked in vacation rentals. Confirm what's there when you arrive — don't buy duplicates of salt, dish soap, trash bags, syrup, or a cooler if the rental already has them.
                <br /><span style={{ color: C.muted }}>List sized for 5 adults + 4 kids (including Sam, age 11) · 7 days</span>
              </div>
            </div>
            <ChecklistPage
              sections={grocerySections}
              label="Grocery Progress"
              footer="SORTED BY STORE AISLE · PROGRESS RESETS ON PAGE REFRESH"
            />
          </>
        )}
        {tab === "jaws" && <JawsTrail />}
      </main>

      <footer style={{ textAlign: "center", padding: "24px 16px 40px", borderTop: `1px solid ${C.warm}` }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: "0.15em" }}>OGLE FAMILY · YELLOWSTONE 2026</div>
      </footer>
    </div>
  );
}
