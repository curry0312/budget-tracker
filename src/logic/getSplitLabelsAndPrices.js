export function getSplitLabelsAndPrices(filteredCurrentYearMonthData) {
    const labels = [];
    const prices = [];
    filteredCurrentYearMonthData.forEach((data) => {
      labels.push(data.category);
      prices.push(data.price);
    });
    return [labels, prices];
  }