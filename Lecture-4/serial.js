let fs = require("fs")
console.log("Start")

fs.readFile("hello.html",function(err,data){
    console.log("HEELO WORLD")
    console.log(data + " ")
    fs.readFile("hello1.html",function(err,data){
        console.log("EHEELO 2")
        console.log(data)
    })
})