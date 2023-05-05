export function getAppointYearMonthBudgets(budgets, year, month) {
  const currentYearMonthData = [];
  console.log(budgets.length);
  for (let i = 0; i < budgets.length; i++) {
    if (
      parseFloat(budgets[i].date.split("-")[0]) === year &&
      parseFloat(budgets[i].date.split("-")[1]) === month
    ) {
      currentYearMonthData.push(budgets[i]);
    }
  }
  console.log(currentYearMonthData);
  const eachCategoryTotalExpense = [];
  for (let i = 0; i < currentYearMonthData.length; i++) {
    console.log("i =", i);
    console.log(
      "eachCategoryTotalExpense.length =",
      eachCategoryTotalExpense.length
    );
    for (let j = 0; j === 0 || j < eachCategoryTotalExpense.length; j++) {
      console.log("j =", j);
      console.log("-------------------");
      if (eachCategoryTotalExpense.length == 0) {
        eachCategoryTotalExpense.push({
          category: currentYearMonthData[i].category,
          price: parseFloat(currentYearMonthData[i].price),
        });
        break;
      } else if (
        eachCategoryTotalExpense[j].category ===
        currentYearMonthData[i].category
      ) {
        eachCategoryTotalExpense[j].price =
          parseFloat(eachCategoryTotalExpense[j].price) +
          parseFloat(currentYearMonthData[i].price);
        break;
      } else if (j === eachCategoryTotalExpense.length - 1) {
        eachCategoryTotalExpense.push({
          category: currentYearMonthData[i].category,
          price: parseFloat(currentYearMonthData[i].price),
        });
        break;
      } else {
        continue;
      }
    }
  }
  return eachCategoryTotalExpense;
}
