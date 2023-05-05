export function getPerBudgetAverageComparison(
  currentTotalPrice,
  filteredCurrentYearMonthData,
  previousTotalPrice,
  filteredPreviousYearMonthData
) {
  if (!previousTotalPrice) {
    return 0;
  }
  return (
    (currentTotalPrice / parseFloat(filteredCurrentYearMonthData.length) -
      previousTotalPrice / parseFloat(filteredPreviousYearMonthData.length)) /
    (previousTotalPrice / parseFloat(filteredPreviousYearMonthData.length))
  ).toFixed(1)*100;
}
