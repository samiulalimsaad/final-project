const moment = require("moment");

// // const getExpired = (dat) => {
// //     const date = [];
// //     const time = [];
// //     let d = "";
// //     if (dat) d = new Date(dat);
// //     else d = new Date();
// //     time.push(d.getHours());
// //     time.push(d.getMinutes());
// //     time.push(d.getSeconds());
// //     date.push(d.getDate() + 1);
// //     date.push(d.getMonth() + 1);
// //     date.push(d.getYear() + 1);
// //     return [time.join("."), date.join("/")].join(" ");
// // };
// // console.log(getExpired())

// // const a = "11.37.46 25/10/122"
// // const b = a.split(" ")
// // var startTime = b[0];
// // var newTime = moment(startTime, "HH.MM.SS");
// // var time = newTime.format("HH-MM-SS");
// // console.log(time);
// // var startdate = b[1];
// // var new_date = moment(startdate, "DD.MM.YYYY");
// // var thing = new_date.format("DD/MM/YYYY");
// // console.log(thing);
// // console.log(b)
// let d = "October 23rd 2021, 12:16:18 pm";
// // let a = moment().subtract(1, "days").format("MMMM Do YYYY, h:mm:ss a");

// // console.log(moment(a, "MMMM Do YYYY, h:mm:ss a").startOf("day").fromNow());
// console.log(
//     moment(d, "MMMM Do YYYY, h:mm:ss a").endOf("day").fromNow().includes("in")
// );

const allStory = [
    {
        _id: "bbbbbbbbbbbbbb",
        story: [
            {
                image: "zzz",
                expired: "October 25th 2021, 11:56:20 am",
                _id: "6174f584ccaa556f4272f83c",
            },
            {
                image: "zzz",
                expired: "October 25th 2021, 11:56:42 am",
                _id: "6174f59accaa556f4272f847",
            },
        ],
    },
    {
        _id: "aaa",
        story: [
            {
                image: "zzz",
                expired: "October 25th 2021, 12:15:24 pm",
                _id: "6174f9fc3a327ed28aceb035",
            },
            {
                image: "zzz",
                expired: "October 25th 2021, 12:15:51 pm",
                _id: "6174fa173a327ed28aceb051",
            },
            {
                image: "aaa",
                expired: "October 23rd 2021, 12:16:18 pm",
                _id: "6174fa32179af13438be249b",
            },
        ],
    },
];

const story = [];

allStory.filter((v) =>
    v.story.filter((s) => {
        if (
            moment(s.expired, "MMMM Do YYYY, h:mm:ss a")
                .endOf("day")
                .fromNow()
                .includes("in")
        ) {
            console.log("object");
            story.push({ id: v._id, ...s });
        }
    })
);


// console.log(JSON.stringify(story, null, 4));
console.log(JSON.stringify(story, null, 4));
console.log(story.length);
