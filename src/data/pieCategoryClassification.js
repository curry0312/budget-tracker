import { yearMonthSplit } from "../util/budgetDateSpilt";

export default function classifyCategory(datas, year, month) {
  const classifyData = datas.filter((data) => {
    const [dataYear, dataMonth] = yearMonthSplit(data.date);
    if (dataYear === year && dataMonth === month) {
      return true;
    } else {
      return false;
    }
  });
  console.log(classifyData);
  classify(classifyData);

  function classify(datas) {
    
  }
}

