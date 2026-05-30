import { useState } from "react";

const days = [
  {
    id: 1,
    date: "Sat, June 6",
    label: "Day 1",
    title: "Arrival Day",
    subtitle: "Fly MCO → BZN · Drive to West Yellowstone · Groceries · Bed",
    emoji: "✈️",
    color: "#6B8B7A",
    accent: "#3B5C4A",
    region: "West Yellowstone, MT",
    note: "No agenda. Land, drive ~1.5 hrs to your place near Denny Creek Rd, stock the kitchen, get everyone to bed early. You're on EST — use it.",
    schedule: [
      {
        time: "Afternoon",
        icon: "✈️",
        title: "Land at BZN",
        desc: "Pick up rental car at Bozeman Yellowstone International Airport. Load up and head south on US-191 toward West Yellowstone — about 1.5 hrs.",
      },
      {
        time: "Evening",
        icon: "🛒",
        title: "Grocery Run",
        desc: "The Yellowstone General Store or Food Roundup in West Yellowstone. Stock up for breakfasts, snacks, and lunches for the week. You'll save a lot of money eating breakfast at the house before hitting the park each morning.",
        tip: "Grab plenty of easy snacks — string cheese, trail mix, fruit pouches. You'll be eating in the car a lot on early morning drives.",
      },
      {
        time: "8:00 PM",
        icon: "🛏️",
        title: "Early Bed — All of You",
        desc: "Your body clock says 10 PM EST. Get everyone down. Monday's Lamar alarm is 3:20 AM — the earlier you lock in the sleep schedule starting tonight, the better.",
      },
    ],
  },
  {
    id: 2,
    date: "Sun, June 7",
    label: "Day 2",
    title: "Mammoth Hot Springs",
    subtitle: "Terraces · Elk · Albright Visitor Center",
    emoji: "🦌",
    color: "#7C9E7A",
    accent: "#4A6B48",
    region: "Mammoth Hot Springs",
    note: "About 1.5 hrs from your place to Mammoth. Depart by 4:10 AM to arrive at sunrise. The drive through Madison and Norris in the dark is eerie and beautiful.",
    schedule: [
      {
        time: "4:10 AM",
        icon: "🚗",
        title: "Depart West Yellowstone",
        desc: "Drive east on US-20 into the park, through Madison Junction, north through Norris, then northwest to Mammoth. ~49 miles, ~1.5 hrs inside the park at dawn speeds. Pack the car the night before.",
        tip: "Coffee in a thermos. Snacks for the girls in the back seat. They may sleep the whole drive — that's fine.",
      },
      {
        time: "5:40 AM",
        icon: "🌅",
        title: "Mammoth Terraces at Sunrise",
        desc: "Lower Terrace boardwalk first — the alien travertine formations steam beautifully in golden morning light. Elk roam the grounds freely at this hour. Completely surreal. Allow 1.5–2 hrs.",
        tip: "Upper Terrace Drive adds dramatic scale and different formations — worth the short detour after the boardwalk.",
      },
      {
        time: "8:00 AM",
        icon: "🦌",
        title: "Elk Watch — Mammoth Village Grounds",
        desc: "Elk frequently wander right through the village. Walk the perimeter roads. Your 3-year-old will go absolutely wild seeing elk this close.",
      },
      {
        time: "9:00 AM",
        icon: "🏅",
        title: "Albright Visitor Center — Junior Ranger Packets",
        desc: "Pick up Junior Ranger booklets for Cora and Lydia here. They'll work through activities all week and earn their badges on Day 7. Staff here are excellent with kids.",
      },
      {
        time: "10:30 AM",
        icon: "🥾",
        title: "Beaver Ponds Trail (Optional)",
        desc: "5-mile loop from Mammoth. Relatively shaded, good for wildlife — beaver, pronghorn, sometimes bears in the distance. Skip if the girls are done after the terraces — no pressure.",
      },
      {
        time: "12:30 PM",
        icon: "🚗",
        title: "Drive Home via Norris Geyser Basin",
        desc: "Stop at Norris on the way back for a preview — you'll come back here more thoroughly later in the week. Even a 30-min boardwalk walk is worth it. Home by mid-afternoon.",
      },
      {
        time: "3:00 PM",
        icon: "💤",
        title: "Rest — Early Bed Again",
        desc: "Tomorrow is a 3:20 AM alarm. Get everyone down by 7:30 PM. Seriously.",
      },
    ],
  },
  {
    id: 3,
    date: "Mon, June 8",
    label: "Day 3",
    title: "Lamar Valley",
    subtitle: "Wildlife Capital of Yellowstone · 3:20 AM departure",
    emoji: "🐺",
    color: "#8B7355",
    accent: "#5C4A2A",
    region: "Lamar Valley",
    note: "2 hours from your place to the valley floor. Alarm is 3:20 AM. Leave no later than 3:40 AM. The drive through the park at that hour is stunning — bring binoculars and bear spray.",
    schedule: [
      {
        time: "3:20 AM",
        icon: "⏰",
        title: "Alarm. Go.",
        desc: "This is the one. Get up, pour coffee from the night-before prep, load the girls into the car (they can sleep on the drive), and roll.",
        tip: "Prep everything the night before — snacks packed, bear spray loaded, binoculars by the door, car pointed the right direction.",
      },
      {
        time: "3:40 AM",
        icon: "🚗",
        title: "Depart for Lamar Valley",
        desc: "Drive east on US-20, through Madison, north through Norris, east through Tower-Roosevelt, then into Lamar. ~2 hours. The Tower-Roosevelt stretch at pre-dawn is wild — eyes open for wildlife on the road.",
      },
      {
        time: "5:40 AM",
        icon: "🌅",
        title: "Arrive Lamar Valley at Sunrise",
        desc: "Pull into the Lamar Valley pullouts as the sun crests the ridgeline. This is the single best wildlife hour of the entire trip. Bison herds in the hundreds. Wolf sightings most likely at dawn — scan the distant hillsides with binoculars, not just the valley floor.",
        tip: "Park at multiple pullouts and sit quietly. The animals come to you if you're patient and still.",
      },
      {
        time: "7:00 AM",
        icon: "🥾",
        title: "Lamar River Trail",
        desc: "Flat, shaded, and perfect in the carrier for your 3-year-old. Walk as far as the family wants — even 1–2 miles in is deeply rewarding. Wildflowers peak in early June. Watch for bears along the river corridor.",
      },
      {
        time: "9:30 AM",
        icon: "🦬",
        title: "Slow Drive Back Through the Valley",
        desc: "Drive back west slowly, stopping at every pullout. Pronghorn antelope are common. Let the girls count animals out the window — bison, eagles, everything.",
      },
      {
        time: "11:30 AM",
        icon: "🍔",
        title: "Lunch at Roosevelt Lodge",
        desc: "Rustic western lodge atmosphere the kids will love. Roosevelt Beans are famous. Well-earned meal.",
      },
      {
        time: "1:30 PM",
        icon: "💦",
        title: "Tower Fall",
        desc: "15-min walk to a dramatic 132-foot waterfall near Tower-Roosevelt. Easy enough for all three girls. Quick and worth it on the drive back.",
      },
      {
        time: "3:30 PM",
        icon: "🏠",
        title: "Head Home",
        desc: "2-hour drive back. Everyone will sleep in the car. Early dinner, early bed.",
      },
    ],
  },
  {
    id: 4,
    date: "Tue, June 9",
    label: "Day 4",
    title: "Grand Prismatic + Old Faithful",
    subtitle: "The most stunning sight in any national park",
    emoji: "🌈",
    color: "#6B8B7A",
    accent: "#3B5C4A",
    region: "Midway Geyser Basin · Upper Geyser Basin",
    note: "Both destinations are close to your base — Grand Prismatic is about 20 min from West Yellowstone. Easiest driving day of the week.",
    schedule: [
      {
        time: "4:00 AM",
        icon: "🚗",
        title: "Depart — Short Drive",
        desc: "Only ~20 min to the Fairy Falls trailhead. Leave early enough to be parked and on trail before sunrise. Parking fills fast even in early June.",
        tip: "Park at the Fairy Falls trailhead, not the Midway Geyser Basin lot. Less crowded and gives you the overlook approach.",
      },
      {
        time: "5:10 AM",
        icon: "🌅",
        title: "Grand Prismatic Overlook — Sunrise",
        desc: "Short climb (under 30 min) to the overlook. At sunrise the steam rises dramatically and the rainbow colors are fully lit — electric blue, green, orange, red. Nothing on Earth looks like this. The most visually stunning thing in any national park.",
        tip: "Bring a light layer — cool at elevation and breezy. Carrier-manageable for your 3-year-old.",
      },
      {
        time: "7:00 AM",
        icon: "💦",
        title: "Fairy Falls",
        desc: "Continue past the overlook to Fairy Falls — a 200-foot waterfall in the trees. Mostly flat trail through lodgepole pine. ~5 miles round-trip total but very manageable. Kids love the payoff.",
        tip: "Bear spray warranted here — active bear corridor in June.",
      },
      {
        time: "9:30 AM",
        icon: "🌋",
        title: "Midway Geyser Basin Boardwalk",
        desc: "Walk the boardwalk beside Grand Prismatic at ground level after seeing it from above. Completely different perspective — both are essential. The scale from the boardwalk is humbling.",
      },
      {
        time: "11:30 AM",
        icon: "🍽️",
        title: "Lunch & Rest at Home Base",
        desc: "You're close — drive back, eat lunch at the house, let the little one nap.",
      },
      {
        time: "2:30 PM",
        icon: "⛲",
        title: "Old Faithful",
        desc: "Check eruption predictions at the visitor center (usually accurate within a 10-min window). The eruption lasts 1.5–5 minutes — worth the wait. Combine with the Upper Geyser Basin boardwalk for the full geyser loop.",
      },
      {
        time: "5:00 PM",
        icon: "🌊",
        title: "Firehole Canyon Drive",
        desc: "One-way scenic loop. Check NPS conditions for the Firehole Canyon Swimming Area — if it's open by June 9, this is your best shot at a swim inside the park. Evening light here is gorgeous.",
      },
    ],
  },
  {
    id: 5,
    date: "Wed, June 10",
    label: "Day 5",
    title: "Grand Canyon of Yellowstone",
    subtitle: "Lower Falls · Artist Point · North Rim",
    emoji: "🏔️",
    color: "#7A6B8B",
    accent: "#4A3B5C",
    region: "Canyon Village",
    note: "About 1 hour from your base to Canyon Village through Madison and Norris. Depart ~4:40 AM for sunrise at the falls.",
    schedule: [
      {
        time: "4:40 AM",
        icon: "🚗",
        title: "Depart for Canyon",
        desc: "Drive east through Madison Junction, north to Norris, east to Canyon Village. ~1 hour. Scenic drive through the heart of the park.",
      },
      {
        time: "5:40 AM",
        icon: "🌅",
        title: "Brink of the Lower Falls — Sunrise",
        desc: "0.7 miles, moderate. The canyon walls glow gold and orange at first light. You're standing directly above a 308-foot waterfall — the roar and spray are physically overwhelming. Your girls will never forget this.",
        tip: "Hold hands on the paved but steep descent. Absolutely worth every step.",
      },
      {
        time: "7:30 AM",
        icon: "🎨",
        title: "Artist Point",
        desc: "The most iconic view in Yellowstone. Short flat walk to a panoramic overlook of the Grand Canyon and Lower Falls. Eric, this is a Sony moment — golden hour light on the canyon is extraordinary.",
      },
      {
        time: "9:00 AM",
        icon: "🥾",
        title: "North Rim Trail (partial)",
        desc: "Walk as far as the family wants — even 2 miles gives you Grand View and Lookout Point. Flat enough for the carrier. Allow 2 hrs at a comfortable pace.",
      },
      {
        time: "12:00 PM",
        icon: "🍽️",
        title: "Lunch at Canyon Lodge",
        desc: "Largest dining facility in the park. Quick, kid-friendly.",
      },
      {
        time: "2:00 PM",
        icon: "🦬",
        title: "Hayden Valley Wildlife Drive",
        desc: "Broad valley south of Canyon — prime bison, bear, and coyote territory in the afternoon. Drive slowly, stop at every pullout. Binoculars essential here.",
      },
      {
        time: "4:30 PM",
        icon: "🌋",
        title: "Mud Volcano Area",
        desc: "Short boardwalk past hissing fumaroles, boiling mud pots, and Dragon's Mouth Spring. Kids absolutely love the gurgling weirdness. 45 minutes, flat, easy.",
      },
    ],
  },
  {
    id: 6,
    date: "Thu, June 11",
    label: "Day 6",
    title: "Norris Basin + Storm Point + West Thumb",
    subtitle: "Hottest thermal zone · Lakeside loop · Geyser basin on the lake",
    emoji: "🌋",
    color: "#8B6B6B",
    accent: "#5C3B3B",
    region: "Norris · Yellowstone Lake",
    note: "Norris is only ~30 min from your base — the closest big destination of the week. Storm Point and West Thumb add a long but beautiful afternoon loop.",
    schedule: [
      {
        time: "5:10 AM",
        icon: "🚗",
        title: "Depart for Norris",
        desc: "~30 min from West Yellowstone through Madison Junction. Shortest morning drive of the week.",
      },
      {
        time: "5:40 AM",
        icon: "🌅",
        title: "Norris Geyser Basin — Sunrise",
        desc: "The hottest, most active hydrothermal area in Yellowstone. Porcelain Basin glows white and turquoise at sunrise with steam columns rising everywhere. The moonscape is unlike anything else in the park.",
        tip: "Steamboat Geyser — the world's tallest active geyser — is here. It won't erupt on schedule, but its steam column is constant and impressive.",
      },
      {
        time: "7:30 AM",
        icon: "🌿",
        title: "Back Basin Loop",
        desc: "1.5-mile forested loop through the back section — Emerald Spring, Cistern Spring, Echinus Geyser. Flat and carrier-friendly. The color contrasts with the forest are stunning.",
      },
      {
        time: "9:30 AM",
        icon: "🚗",
        title: "Drive South to Yellowstone Lake",
        desc: "Scenic drive south through Hayden Valley. Eyes open for wildlife on this stretch — it's one of the best wildlife corridors in the park.",
      },
      {
        time: "11:00 AM",
        icon: "🏖️",
        title: "Storm Point Loop",
        desc: "2.3-mile loop along the north shore of Yellowstone Lake. Flat, partially shaded, perfect for all three girls. Rocky shoreline, great birding, and sweeping Absaroka Range views. Carrier-friendly.",
        tip: "Check at Lake Visitor Center before heading out — can be closed for bear activity in early June.",
      },
      {
        time: "1:00 PM",
        icon: "🍽️",
        title: "Lunch at Lake Village",
        desc: "Lake Yellowstone Hotel dining room has beautiful lake views. Well-earned.",
      },
      {
        time: "3:00 PM",
        icon: "🌊",
        title: "West Thumb Geyser Basin",
        desc: "Geothermal features right on the edge of Yellowstone Lake — fumaroles, hot springs, and mud pots with the lake as the backdrop. Short boardwalk. Great for tired afternoon legs.",
      },
      {
        time: "5:00 PM",
        icon: "🚗",
        title: "Head Home",
        desc: "~1 hour back to your West Yellowstone base. Early dinner, gear check for tomorrow's Teton day.",
      },
    ],
  },
  {
    id: 7,
    date: "Fri, June 12",
    label: "Day 7",
    title: "Grand Tetons",
    subtitle: "Oxbow Bend · Jenny Lake · Granite Hot Springs",
    emoji: "⛰️",
    color: "#6B7A8B",
    accent: "#2E3F52",
    region: "Grand Teton NP · Bridger-Teton NF",
    note: "Drive south ~1.5 hrs to reach Grand Teton. The Tetons rise 7,000 feet from the valley floor — nothing in America looks like this. Today also has your family swim at Granite Hot Springs.",
    schedule: [
      {
        time: "4:10 AM",
        icon: "🚗",
        title: "Depart South for the Tetons",
        desc: "Drive south on US-191/89 through the park and down to Jackson Hole. ~1.5 hrs to Oxbow Bend.",
      },
      {
        time: "5:40 AM",
        icon: "🌅",
        title: "Oxbow Bend — Sunrise",
        desc: "One of the most photographed spots in the American West. The Snake River reflects the Tetons and Mount Moran perfectly at dawn. Moose, osprey, and trumpeter swans are common at this hour. Eric — bring the Sony Alpha. This is the shot.",
        tip: "Pull off at the Oxbow Bend turnout just east of Jackson Lake Junction. No hiking required — just stand and photograph.",
      },
      {
        time: "7:45 AM",
        icon: "⛵",
        title: "Jenny Lake Boat Shuttle + Hidden Falls",
        desc: "First shuttle departs 8 AM — arrive by 7:45 to beat the line. 5-min boat ride across the lake (kids love it), then short hike to Hidden Falls (200 ft cascade) and Inspiration Point with sweeping valley views. ~2 miles total, very doable.",
        tip: "Buy return shuttle tickets when you board. It's worth it on tired legs.",
      },
      {
        time: "12:00 PM",
        icon: "🍽️",
        title: "Lunch in Jackson",
        desc: "Drive into Jackson. The town square with the antler arches is a great stop — kids enjoy it. Persephone Bakery or Snake River Brewing for food.",
      },
      {
        time: "2:00 PM",
        icon: "♨️",
        title: "Granite Hot Springs — Family Swim",
        desc: "34 miles from Jackson through Bridger-Teton NF. Thermal pool (~93°F in summer) surrounded by mountains above rushing Granite Creek. Changing rooms, restrooms, $6/adult. This is your earned family swim day.",
        tip: "The canyon drive out is gorgeous. Allow 2.5 hrs total for the detour including drive time.",
      },
      {
        time: "5:30 PM",
        icon: "🚗",
        title: "Drive Back North",
        desc: "Head back toward West Yellowstone. Watch for moose along the Jackson Lake shoreline. Everyone sleeps in the car.",
      },
      {
        time: "8:00 PM",
        icon: "🏅",
        title: "Junior Ranger Booklet Check",
        desc: "Tonight, help Cora and Lydia finish any remaining activities in their booklets. Tomorrow is badge day.",
      },
    ],
  },
  {
    id: 8,
    date: "Sat, June 13",
    label: "Day 8",
    title: "Junior Ranger + Departure",
    subtitle: "Badge ceremony · One last sunrise · Fly home BZN → MCO",
    emoji: "🏅",
    color: "#9E8B5A",
    accent: "#6B5A2A",
    region: "West Yellowstone / BZN",
    note: "Departure day. Keep the morning loose — Junior Ranger ceremony first, then drive to Bozeman for your flight home.",
    schedule: [
      {
        time: "5:40 AM",
        icon: "🌅",
        title: "Final Sunrise (Optional)",
        desc: "Firehole River area is 10 min from your base and beautiful at dawn. Or just watch the sunrise from the porch with coffee. No obligations — this is bonus time.",
      },
      {
        time: "8:00 AM",
        icon: "🏅",
        title: "Junior Ranger Ceremony",
        desc: "Bring Cora and Lydia to the West Yellowstone Visitor Center (or any park visitor center on your route) for the official badge ceremony. A ranger swears them in as Junior Rangers. Genuinely moving — they'll remember this forever.",
        tip: "West Yellowstone Visitor Center is right in town — no park driving needed. Confirm hours before going.",
      },
      {
        time: "9:30 AM",
        icon: "📦",
        title: "Pack Out",
        desc: "Load the car, do a final sweep of the rental. Leave the house as found.",
      },
      {
        time: "10:00 AM",
        icon: "🚗",
        title: "Drive to BZN",
        desc: "~1.5 hrs to Bozeman. Relaxed drive — no rush. Stop for a final Montana meal if time allows.",
      },
      {
        time: "Afternoon",
        icon: "✈️",
        title: "Fly BZN → MCO",
        desc: "Head home. The girls will sleep on the plane. You'll spend the flight looking at photos on the Sony.",
      },
    ],
  },
];

export default function YellowstoneItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0F1A0F",
      minHeight: "100vh",
      color: "#E8E0D0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #1A2E1A 0%, #0F1A0F 60%)",
        borderBottom: "1px solid #2A3D2A",
        padding: "28px 24px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#7A9A7A", textTransform: "uppercase", marginBottom: 4 }}>
            Ogle Family Trip · June 6–13, 2026
          </div>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#D4C9A8", lineHeight: 1.2, marginBottom: 16 }}>
            Yellowstone & Grand Tetons
          </div>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
            {days.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActiveDay(i)}
                style={{
                  background: activeDay === i ? d.color : "transparent",
                  border: `1px solid ${activeDay === i ? d.color : "#2A3D2A"}`,
                  borderRadius: 6,
                  padding: "6px 10px",
                  color: activeDay === i ? "#0F1A0F" : "#7A9A7A",
                  fontSize: 11,
                  fontWeight: activeDay === i ? "700" : "400",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
              >
                {d.emoji} {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Day Content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px 60px" }}>
        <div style={{
          borderLeft: `3px solid ${day.color}`,
          paddingLeft: 16,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, color: day.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
            {day.date} · {day.region}
          </div>
          <div style={{ fontSize: 26, fontWeight: "bold", color: "#E8E0D0", lineHeight: 1.15, marginBottom: 4 }}>
            {day.emoji} {day.title}
          </div>
          <div style={{ fontSize: 14, color: "#9A9080", fontStyle: "italic", marginBottom: 10 }}>
            {day.subtitle}
          </div>
          {day.note && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${day.accent}`,
              borderRadius: 6,
              padding: "10px 12px",
              fontSize: 13,
              color: "#B8A888",
              lineHeight: 1.5,
            }}>
              📍 {day.note}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {day.schedule.map((item, i) => (
            <ScheduleItem key={i} item={item} color={day.color} accent={day.accent} isLast={i === day.schedule.length - 1} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
          <button
            onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
            disabled={activeDay === 0}
            style={{
              background: "transparent",
              border: "1px solid #2A3D2A",
              borderRadius: 6,
              padding: "8px 16px",
              color: activeDay === 0 ? "#3A4A3A" : "#7A9A7A",
              fontSize: 13,
              cursor: activeDay === 0 ? "default" : "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Prev Day
          </button>
          <button
            onClick={() => setActiveDay(Math.min(days.length - 1, activeDay + 1))}
            disabled={activeDay === days.length - 1}
            style={{
              background: "transparent",
              border: "1px solid #2A3D2A",
              borderRadius: 6,
              padding: "8px 16px",
              color: activeDay === days.length - 1 ? "#3A4A3A" : "#7A9A7A",
              fontSize: 13,
              cursor: activeDay === days.length - 1 ? "default" : "pointer",
              fontFamily: "inherit",
            }}
          >
            Next Day →
          </button>
        </div>
      </div>
    </div>
  );
}

function ScheduleItem({ item, color, accent, isLast }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 36, flexShrink: 0 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: color, marginTop: 18, flexShrink: 0, zIndex: 1,
        }} />
        {!isLast && (
          <div style={{
            width: 1, flex: 1,
            background: `linear-gradient(to bottom, ${color}60, #1A2E1A)`,
            minHeight: 20,
          }} />
        )}
      </div>

      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          flex: 1,
          background: expanded ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${expanded ? accent : "#1E2E1E"}`,
          borderRadius: 8,
          padding: "12px 14px",
          marginBottom: 6,
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <span style={{ fontSize: 11, color: color, letterSpacing: "0.08em", fontWeight: "600" }}>
                {item.time}
              </span>
            </div>
            <div style={{ fontSize: 15, fontWeight: "bold", color: "#D4C9A8", lineHeight: 1.3 }}>
              {item.title}
            </div>
          </div>
          <div style={{ color: "#4A6A4A", fontSize: 12, paddingTop: 2, flexShrink: 0 }}>
            {expanded ? "▲" : "▼"}
          </div>
        </div>

        {expanded && (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${accent}40` }}>
            <p style={{ margin: "0 0 8px", fontSize: 14, color: "#B8A888", lineHeight: 1.6 }}>
              {item.desc}
            </p>
            {item.tip && (
              <div style={{
                background: `${color}15`,
                borderLeft: `2px solid ${color}`,
                padding: "7px 10px",
                borderRadius: "0 4px 4px 0",
                fontSize: 13,
                color: "#9A9080",
                fontStyle: "italic",
              }}>
                💡 {item.tip}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
