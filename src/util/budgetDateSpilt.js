export function yearMonthSplit(date) {
    const budgetYear = parseFloat(date.split("-")[0])
    const budgetMonth = parseFloat(date.split("-")[1])
    return [budgetYear, budgetMonth]
}

export function daySplit(date){
    const budgetDate = parseFloat(date.split("-")[2])
    return budgetDate
}