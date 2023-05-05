export function getAppointYearMonthTotalPrice(filteredAppointYearMonthData){
    return filteredAppointYearMonthData.reduce((total, e) => {
      return (total = total + parseFloat(e.price));
    }, 0);
  }