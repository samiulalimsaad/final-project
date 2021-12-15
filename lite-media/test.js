// const moment = require("moment");
// const d = "2021-11-09T06:36:18.226Z";
// const time = moment(d).format("DD/M/yyyy");
// console.log(time);

// console.log(typeof null);

const a = [
    { type: "error", text: "aaa", isShowing: true },
    // { type: "warning", text: "bbb", isShowing: false },
    // { type: "success", text: "ccc", isShowing: true },
    // { type: "error", text: "ddd", isShowing: false },
    // { type: "success", text: "eee", isShowing: true },
];

// console.log(a[Math.floor(Math.random() * 5)]);
if (a.length <= 2) {
    console.log(a.slice(1, a.length - 1));
} else {
    console.log(a.slice(1, a.length));
}
