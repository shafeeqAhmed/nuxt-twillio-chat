import moment from "moment";
const  startDate = moment().subtract(7,'d').format('YYYY-MM-DD')
const endDate = moment().format('YYYY-MM-DD')

const  currentDate = moment().format('YYYY-MM-DD')
const  lastWeekDate = moment().subtract(7,'d').format('YYYY-MM-DD')
const  lastMonthDate = moment().subtract(1,'months').format('YYYY-MM-DD')
const  lastYearDate = moment().subtract(1,'years').format('YYYY-MM-DD')


export { startDate, endDate,currentDate,lastWeekDate,lastMonthDate,lastYearDate };
