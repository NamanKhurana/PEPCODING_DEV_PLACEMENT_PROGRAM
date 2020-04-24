let fs = require("fs")

//Sync
console.log("Before")
let content = fs.readFileSync("hello.html")
console.log(content + " ")
console.log("After")