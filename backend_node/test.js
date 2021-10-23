// const post = [
//     {
//         postBody: "bbb",
//         like: 1000000,
//         share: 1000,
//         _id: "617104611f31f13e489d14cf",
//         updatedAt: "2021-10-21T06:10:41.115Z",
//         createdAt: "2021-10-21T06:10:41.115Z",
//         comments: [],
//     },
//     {
//         postBody: "aaa",
//         like: 1000000,
//         share: 1000,
//         _id: "61715cdee4ceaf6b90e8259b",
//         comments: [],
//         createdAt: "2021-10-21T12:28:14.497Z",
//         updatedAt: "2021-10-21T12:28:14.497Z",
//     },
// ];

// const id = "61715cdee4ceaf6b90e8259b";
// const update = {
//     like: 100,
// };
// // array.splice(array.indexOf(valueToReplace), 1, newValue);

// const index = post.findIndex((v) => v._id == id);
// const a = post.filter((v) => v._id == id)[0];
// const data = { ...a, ...update };
// post.splice(index, 1, data);
// console.log(data);
// console.log(index);
// console.log(post);
// // console.log(b);

let c = [1, 2, 3, 4, 5, 6];
console.log(c);
let cc = c.splice(1, 2);
console.log(c.in);
console.log(cc);
