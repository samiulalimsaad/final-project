const moment = require("moment");
// let b = "October 2nd 2021, 6:59:53 pm";
// b = "2021-10-02T19:01:07+06:00";
// b = "2021-10-02T12:52:28.449+00:00";
// const date = moment(); // October 2nd 2021, 6:59:05 pm
// b = Date.now()
let b = moment().format();
console.log(b)
console.log(moment(b).format("h:MM:SS a DD/MM/YYYY"));
