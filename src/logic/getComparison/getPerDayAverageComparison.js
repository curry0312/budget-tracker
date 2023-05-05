export function getPerDayAverageComparison(
  currentTotalPrice,
  previousTotalPrice
) {
  if (!previousTotalPrice) {
    return 0;
  }
  return (
    (currentTotalPrice / new Date().getDate() -
      previousTotalPrice / new Date().getDate()) /
    (previousTotalPrice / new Date().getDate())
  ).toFixed(1)*100;
}
