let fs =  require("fs")

//Async
console.log("Before")
fs.readFile("hello.html",(err,content) => {
    console.log(content + " ")
})

fs.readFile("hello1.html",(err,content) => {
    console.log(content + " ")
})

console.log("After")