// // //Node.js readline
// // const readline = require("readline");

// // const rl = readline.createInterface({
// //     input: process.stdin,
// //     output: process.stdout,
// // });

// // rl.question("What do you think of Node.js? ", (answer) => {
// //     console.log(`Thank you for your valuable feedback: ${answer}`);
// //     rl.close();
// // });

// var input = require("fs").readFileSync("/dev/stdin", "utf8");
// var lines = input.split("\n");

// console.log(lines)

const val = (a = [""]) =>
    a
        .split(" ")
        .map((v) =>
            v
                .split("")
                .map((vv) => String.fromCharCode(vv.charCodeAt(0) + 3))
                .join()
                .replace(",", "")
        )
        .join(" ")
        .replace(",", "");

const a = "Texto #3";
const aa = "abcABC1";
const aaa = "vxpdylY .ph";
const aaaa = "vv.xwfxo.fd";

console.log(val(a));
console.log(val(aa));
console.log(val(aaa));
console.log(val(aaaa));
