import React, { useMemo, useState } from "react";

const LINES = {
  purple: [
    "Challaghatta",
    "Kengeri",
    "Kengeri Bus Terminal",
    "Pattanagere",
    "Jnana Bharathi",
    "Rajarajeshwari Nagar",
    "Panchamukhi / Nayandahalli",
    "Mysuru Road",
    "Deepanjali Nagar",
    "Attiguppe",
    "Vijayanagar",
    "Hosahalli",
    "Magadi Road",
    "Kempegowda Station (Majestic)",
    "Sir M Visvesvaraya Station, Central College",
    "Vidhana Soudha",
    "Cubbon Park",
    "Dr B R Ambedkar Station, Vidhana Soudha",
    "Mahatma Gandhi Road",
    "Trinity",
    "Halasuru",
    "Indiranagar",
    "Swami Vivekananda Road",
    "Baiyappanahalli",
    "Benniganahalli",
    "K R Pura",
    "Singayyanapalya",
    "Garudacharapalya",
    "Hoodi",
    "Seetharampalya",
    "Kundalahalli",
    "Nallurhalli",
    "Sri Sathya Sai Hospital",
    "Pattandur Agrahara",
    "Kadugodi Tree Park",
    "Hopefarm Channasandra",
    "Whitefield (Kadugodi)"
  ],
  green: [
    "Madavara",
    "Chikkabidarakallu",
    "Manjunath Nagar",
    "Dasarahalli",
    "Jalahalli",
    "Peenya Industry",
    "Peenya",
    "Goraguntepalya",
    "Yeshwanthpur",
    "Sandal Soap Factory",
    "Mahalakshmi",
    "Rajajinagar",
    "Mahakavi Kuvempu Road",
    "Srirampura",
    "Sampige Road",
    "Kempegowda Station (Majestic)",
    "Chickpete",
    "Krishna Rajendra Market",
    "National College",
    "Lalbagh",
    "South End Circle",
    "Jayanagar",
    "Rashtreeya Vidyalaya Road",
    "Banashankari",
    "Jaya Prakash Nagar",
    "Yelachenahalli",
    "Konanakunte Cross",
    "Doddakallasandra",
    "Vajarahalli",
    "Thalaghattapura",
    "Silk Institute"
  ],
  yellow: [
    "Rashtreeya Vidyalaya Road",
    "Ragigudda",
    "Jayadeva Hospital",
    "BTM Layout",
    "Central Silk Board",
    "Bommanahalli",
    "Hongasandra",
    "Kudlu Gate",
    "Singasandra",
    "Hosa Road",
    "Beratena Agrahara",
    "Electronic City",
    "Infosys Foundation Konappana Agrahara",
    "Huskur Road",
    "Hebbagodi",
    "Bommasandra"
  ]
};

const INTERCHANGES = {
  "Kempegowda Station (Majestic)": ["purple", "green"],
  "Rashtreeya Vidyalaya Road": ["green", "yellow"]
};

const DEMO_HEADWAYS = {
  weekday: {
    purple: [
      { start: "05:00", end: "06:00", freq: 15 },
      { start: "06:00", end: "11:00", freq: 5 },
      { start: "11:00", end: "16:00", freq: 8 },
      { start: "16:00", end: "20:00", freq: 5 },
      { start: "20:00", end: "23:00", freq: 10 }
    ],
    green: [
      { start: "04:15", end: "05:00", freq: 25 },
      { start: "05:00", end: "06:15", freq: 15 },
      { start: "06:15", end: "10:25", freq: 10 },
      { start: "10:25", end: "10:39", freq: 7 },
      { start: "10:39", end: "15:51", freq: 8 },
      { start: "15:51", end: "19:44", freq: 10 },
      { start: "19:44", end: "20:24", freq: 8 },
      { start: "20:24", end: "22:40", freq: 10 },
      { start: "22:40", end: "22:57", freq: 15 }
    ],
    yellow: [
      { start: "05:00", end: "06:00", freq: 12 },
      { start: "06:00", end: "11:00", freq: 8 },
      { start: "11:00", end: "16:00", freq: 10 },
      { start: "16:00", end: "21:00", freq: 8 },
      { start: "21:00", end: "23:00", freq: 12 }
    ]
  },
  saturday: {
    purple: [
      { start: "05:00", end: "23:00", freq: 8 }
    ],
    green: [
      { start: "05:00", end: "23:00", freq: 10 }
    ],
    yellow: [
      { start: "05:00", end: "23:00", freq: 10 }
    ]
  },
  sunday: {
    purple: [
      { start: "07:00", end: "23:00", freq: 10 }
    ],
    green: [
      { start: "07:00", end: "23:00", freq: 10 }
    ],
    yellow: [
      { start: "07:00", end: "23:00", freq: 12 }
    ]
  }
};

const SEGMENT_MINUTES = 3;
const INTERCHANGE_BUFFER_MINUTES = 6;

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatMinutes(total) {
  const minutesInDay = ((total % 1440) + 1440) % 1440;
  const h24 = Math.floor(minutesInDay / 60);
  const mins = minutesInDay % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${suffix}`;
}

function addMinutes(date, mins) {
  return new Date(date.getTime() + mins * 60000);
}

function diffStops(line, from, to) {
  const stations = LINES[line];
  const a = stations.indexOf(from);
  const b = stations.indexOf(to);
  if (a === -1 || b === -1) return null;
  return Math.abs(a - b);
}

function directionName(line, from, to) {
  const stations = LINES[line];
  const a = stations.indexOf(from);
  const b = stations.indexOf(to);
  if (a === -1 || b === -1) return "Unknown direction";
  return a < b ? `Towards ${stations[stations.length - 1]}` : `Towards ${stations[0]}`;
}

function getScheduleKey(date, holidaySet) {
  const yyyyMmDd = date.toISOString().slice(0, 10);
  if (holidaySet.has(yyyyMmDd)) return "sunday";
  const day = date.getDay();
  if (day === 0) return "sunday";
  if (day === 6) return "saturday";
  return "weekday";
}

function nextTrainMinutes(line, date, holidaySet) {
  const key = getScheduleKey(date, holidaySet);
  const nowMins = date.getHours() * 60 + date.getMinutes();
  const windows = DEMO_HEADWAYS[key][line] || [];

  for (const w of windows) {
    const start = toMinutes(w.start);
    const end = toMinutes(w.end);
    if (nowMins <= end) {
      const base = Math.max(nowMins, start);
      const next = base === start ? start : start + Math.ceil((base - start) / w.freq) * w.freq;
      if (next <= end) return next;
    }
  }
  return null;
}

function buildPath(boardingLine, boardingStation, dropLine, dropStation) {
  if (boardingLine === dropLine) {
    return [{ line: boardingLine, from: boardingStation, to: dropStation }];
  }

  const majestic = "Kempegowda Station (Majestic)";
  const rvRoad = "Rashtreeya Vidyalaya Road";

  if ([boardingLine, dropLine].includes("purple") && [boardingLine, dropLine].includes("green")) {
    return [
      { line: boardingLine, from: boardingStation, to: majestic },
      { line: dropLine, from: majestic, to: dropStation }
    ];
  }

  if ([boardingLine, dropLine].includes("green") && [boardingLine, dropLine].includes("yellow")) {
    return [
      { line: boardingLine, from: boardingStation, to: rvRoad },
      { line: dropLine, from: rvRoad, to: dropStation }
    ];
  }

  if ([boardingLine, dropLine].includes("purple") && [boardingLine, dropLine].includes("yellow")) {
    return [
      { line: boardingLine, from: boardingStation, to: majestic },
      { line: "green", from: majestic, to: rvRoad },
      { line: dropLine, from: rvRoad, to: dropStation }
    ];
  }

  return [];
}

function computeJourney({ boardingLine, boardingStation, dropLine, dropStation, now, holidaySet }) {
  const path = buildPath(boardingLine, boardingStation, dropLine, dropStation);
  if (!path.length) return null;

  let currentTime = new Date(now);
  const legs = [];

  for (let i = 0; i < path.length; i++) {
    const leg = path[i];
    const nextTrain = nextTrainMinutes(leg.line, currentTime, holidaySet);
    if (nextTrain === null) return null;

    const trainArrivalAtPlatform = new Date(currentTime);
    trainArrivalAtPlatform.setHours(Math.floor(nextTrain / 60), nextTrain % 60, 0, 0);

    const stopCount = diffStops(leg.line, leg.from, leg.to);
    const travelMinutes = (stopCount ?? 0) * SEGMENT_MINUTES;
    const reachTime = addMinutes(trainArrivalAtPlatform, travelMinutes);

    legs.push({
      ...leg,
      direction: directionName(leg.line, leg.from, leg.to),
      platformTime: trainArrivalAtPlatform,
      stopCount,
      travelMinutes,
      reachTime
    });

    currentTime = addMinutes(reachTime, i < path.length - 1 ? INTERCHANGE_BUFFER_MINUTES : 0);
  }

  return {
    now,
    scheduleType: getScheduleKey(now, holidaySet),
    path: legs,
    finalArrival: legs[legs.length - 1]?.reachTime ?? now
  };
}

export default function NammaMetroTripPlanner() {
  const [boardingLine, setBoardingLine] = useState("purple");
  const [boardingStation, setBoardingStation] = useState(LINES.purple[0]);
  const [dropLine, setDropLine] = useState("green");
  const [dropStation, setDropStation] = useState(LINES.green[0]);
  const [isHolidayLikeService, setIsHolidayLikeService] = useState(false);
  const [isSecondSaturday, setIsSecondSaturday] = useState(false);
  const [isFourthSaturday, setIsFourthSaturday] = useState(false);
  const [result, setResult] = useState(null);

  //const now = useMemo(() => new Date(), []);
  const holidaySet = useMemo(() => {
    const set = new Set();
    if (isHolidayLikeService || isSecondSaturday || isFourthSaturday) {
      set.add(new Date().toISOString().slice(0, 10));
    }
    return set;
  }, [isHolidayLikeService, isSecondSaturday, isFourthSaturday]);

  function onBoardingLineChange(line) {
    setBoardingLine(line);
    setBoardingStation(LINES[line][0]);
  }

  function onDropLineChange(line) {
    setDropLine(line);
    setDropStation(LINES[line][0]);
  }

  function handlePlan() {
    const output = computeJourney({
      boardingLine,
      boardingStation,
      dropLine,
      dropStation,
      now: new Date(),
      holidaySet
    });
    setResult(output);
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 text-neutral-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
          <h1 className="text-3xl font-bold">Namma Metro Trip Planner</h1>
          <p className="mt-2 text-sm text-neutral-600">
            "There will be ERRORS in this - it's totally based on static data listed on BMRCL website "
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoCard label="Current Date" value={new Date().toLocaleDateString()} />
            <InfoCard label="Current Time" value={new Date().toLocaleTimeString()} />
            <InfoCard label="Current Day" value={new Date().toLocaleDateString(undefined, { weekday: "long" })} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Boarding">
            <SelectField label="Boarding Line" value={boardingLine} onChange={(e) => onBoardingLineChange(e.target.value)} options={Object.keys(LINES)} />
            <SelectField label="Boarding Station" value={boardingStation} onChange={(e) => setBoardingStation(e.target.value)} options={LINES[boardingLine]} />
          </SectionCard>

          <SectionCard title="Dropping">
            <SelectField label="Dropping Line" value={dropLine} onChange={(e) => onDropLineChange(e.target.value)} options={Object.keys(LINES)} />
            <SelectField label="Dropping Station" value={dropStation} onChange={(e) => setDropStation(e.target.value)} options={LINES[dropLine]} />
          </SectionCard>
        </div>

        <SectionCard title="Service Day Override">
          <p className="mb-4 text-sm text-neutral-600">
            Keep this simple: ask the passenger directly. If today follows holiday-like service, just tick the relevant box and continue.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <CheckboxField
              label="Today is a holiday"
              checked={isHolidayLikeService}
              onChange={(e) => setIsHolidayLikeService(e.target.checked)}
            />
            <CheckboxField
              label="Today is 2nd Saturday"
              checked={isSecondSaturday}
              onChange={(e) => setIsSecondSaturday(e.target.checked)}
            />
            <CheckboxField
              label="Today is 4th Saturday"
              checked={isFourthSaturday}
              onChange={(e) => setIsFourthSaturday(e.target.checked)}
            />
          </div>
        </SectionCard>

        <button
          onClick={handlePlan}
          className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          Plan My Metro Journey
        </button>

        {result && (
          <div className="space-y-4">
            <SectionCard title="Journey Summary">
              <div className="space-y-2 text-sm md:text-base">
                <p><strong>Today:</strong> {result.now.toLocaleString()}</p>
                <p><strong>Schedule bucket:</strong> {result.scheduleType}</p>
                <p>
                  <strong>Next train from {boardingStation}:</strong> {formatMinutes(result.path[0].platformTime.getHours() * 60 + result.path[0].platformTime.getMinutes())}
                </p>
                <p>
                  <strong>Estimated destination arrival:</strong> {result.finalArrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </SectionCard>

            <div className="grid gap-4">
              {result.path.map((leg, index) => {
                const isInterchangeArrival = index > 0;
                return (
                  <SectionCard key={`${leg.line}-${index}`} title={`Leg ${index + 1} — ${capitalize(leg.line)} line`}>
                    <div className="space-y-2 text-sm">
                      {isInterchangeArrival && (
                        <p className="rounded-xl bg-amber-50 p-3 text-amber-800 ring-1 ring-amber-200">
                          You might get your <strong>{capitalize(leg.line)}</strong> line train at the intersection by{" "}
                          <strong>{leg.platformTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong>. Plan accordingly.
                        </p>
                      )}
                      <p><strong>From:</strong> {leg.from}</p>
                      <p><strong>To:</strong> {leg.to}</p>
                      <p><strong>Direction:</strong> {leg.direction}</p>
                      <p><strong>Next train:</strong> {leg.platformTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                      <p><strong>Stops:</strong> {leg.stopCount}</p>
                      <p><strong>Travel minutes:</strong> ~{leg.travelMinutes}</p>
                      <p><strong>Reach time:</strong> {leg.reachTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </SectionCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-neutral-200">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="mb-4 block">
      <div className="mb-2 text-sm font-medium text-neutral-700">{label}</div>
      <select
        className="w-full rounded-2xl border border-neutral-300 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-violet-400"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-neutral-300"
      />
      <span className="text-sm font-medium text-neutral-700">{label}</span>
    </label>
  );
}

function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
