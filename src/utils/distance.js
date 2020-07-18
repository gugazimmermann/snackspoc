export default function calculateDistance(place, me) {
  const toRadians = (angle) => (angle * Math.PI) / 180;
  const lat1 = place.latitude;
  const lon1 = place.longitude;
  const lat2 = me.latitude;
  const lon2 = me.longitude;
  const R = 6371;
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 1000);
}
