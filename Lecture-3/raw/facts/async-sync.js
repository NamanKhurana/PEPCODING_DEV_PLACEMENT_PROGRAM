let fs = require("fs")

//Async
console.log("Before")
let content = fs.readFile("hello.html",(err,content) => {
    console.log(content + " ")
})
console.log("After")

//Sync
console.log("Before")
let content = fs.readFileSync("hello.html")
console.log(content + " ")
console.log("After")