import { LINES, MAJESTIC, RV_ROAD, type LineKey } from '../data/lines'

/**
 * Namma Metro fare slabs (as of 2024)
 * Distance (km)  →  Fare (₹)
 * 0–2            →  10
 * 2–4            →  20
 * 4–6            →  25
 * 6–10           →  30
 * 10–15          →  35
 * 15–20          →  40
 * 20–25          →  45
 * 25–30          →  50
 * 30–35          →  55
 * 35+            →  60
 */

const FARE_SLABS: Array<{ maxKm: number; fare: number }> = [
  { maxKm:  2, fare: 10 },
  { maxKm:  4, fare: 20 },
  { maxKm:  6, fare: 25 },
  { maxKm: 10, fare: 30 },
  { maxKm: 15, fare: 35 },
  { maxKm: 20, fare: 40 },
  { maxKm: 25, fare: 45 },
  { maxKm: 30, fare: 50 },
  { maxKm: 35, fare: 55 },
  { maxKm: Infinity, fare: 60 },
]

// Approximate inter-station distances in km per line
// Based on total line length divided by number of segments
const KM_PER_STOP: Record<LineKey, number> = {
  purple: 43.49 / (36), // 37 stations = 36 segments
  green:  33.46 / (30), // 31 stations = 30 segments
  yellow: 19.15 / (15), // 16 stations = 15 segments
}

function fareForKm(km: number): number {
  return FARE_SLABS.find(s => km <= s.maxKm)?.fare ?? 60
}

export interface FareResult {
  distanceKm: number
  fare: number
  tokenFare: number   // same as fare for now (QR token)
  smartCardFare: number  // 10% discount for smart card
}

export function calculateFare(
  boardLine: LineKey, boardStation: string,
  dropLine:  LineKey, dropStation:  string,
): FareResult {
  let totalKm = 0

  if (boardLine === dropLine) {
    const stops = Math.abs(LINES[boardLine].indexOf(boardStation) - LINES[boardLine].indexOf(dropStation))
    totalKm = stops * KM_PER_STOP[boardLine]
  } else {
    const pair = [boardLine, dropLine]

    if (pair.includes('purple') && pair.includes('green')) {
      // board → Majestic on boardLine, Majestic → drop on dropLine
      const leg1 = Math.abs(LINES[boardLine].indexOf(boardStation) - LINES[boardLine].indexOf(MAJESTIC))
      const leg2 = Math.abs(LINES[dropLine].indexOf(MAJESTIC) - LINES[dropLine].indexOf(dropStation))
      totalKm = leg1 * KM_PER_STOP[boardLine] + leg2 * KM_PER_STOP[dropLine]
    } else if (pair.includes('green') && pair.includes('yellow')) {
      const leg1 = Math.abs(LINES[boardLine].indexOf(boardStation) - LINES[boardLine].indexOf(RV_ROAD))
      const leg2 = Math.abs(LINES[dropLine].indexOf(RV_ROAD) - LINES[dropLine].indexOf(dropStation))
      totalKm = leg1 * KM_PER_STOP[boardLine] + leg2 * KM_PER_STOP[dropLine]
    } else if (pair.includes('purple') && pair.includes('yellow')) {
      // purple → green → yellow: 3 legs
      const leg1 = Math.abs(LINES[boardLine].indexOf(boardStation) - LINES[boardLine].indexOf(MAJESTIC))
      const leg2 = Math.abs(LINES.green.indexOf(MAJESTIC) - LINES.green.indexOf(RV_ROAD))
      const leg3 = Math.abs(LINES[dropLine].indexOf(RV_ROAD) - LINES[dropLine].indexOf(dropStation))
      totalKm = leg1 * KM_PER_STOP[boardLine]
               + leg2 * KM_PER_STOP.green
               + leg3 * KM_PER_STOP[dropLine]
    }
  }

  const fare = fareForKm(totalKm)
  return {
    distanceKm: Math.round(totalKm * 10) / 10,
    fare,
    tokenFare: fare,
    smartCardFare: Math.round(fare * 0.9 / 5) * 5, // rounded to nearest ₹5
  }
}
