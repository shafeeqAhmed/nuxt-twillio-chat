var today = new Date();

const  startDate = today.getFullYear()+'-'+formateDate((today.getMonth()+1))+'-'+formateDate(today.getDate()-7)
const endDate = today.getFullYear() + '-' + formateDate((today.getMonth() + 1)) + '-' + formateDate(today.getDate())

const  currentDate = today.getFullYear()+'-'+formateDate((today.getMonth()+1))+'-'+formateDate(today.getDate())
const  lastWeekDate = today.getFullYear()+'-'+formateDate((today.getMonth()+1))+'-'+formateDate(today.getDate()-7)
const  lastMonthDate = today.getFullYear()+'-'+formateDate((today.getMonth()))+'-'+formateDate(today.getDate())
const  lastYearDate = (today.getFullYear()-1)+'-'+formateDate((today.getMonth()+1))+'-'+formateDate(today.getDate())


function formateDate(val) {
  if (val < 10) {
    return '0' + val;
  }
  return val
}




export { startDate, endDate,currentDate,lastWeekDate,lastMonthDate,lastYearDate };
