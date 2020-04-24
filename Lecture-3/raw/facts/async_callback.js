let fs = require("fs")

console.log("start")
fs.readFile("hello.html",(err,content) => {
    if(err){
        console.log(err)
    }else{
        console.log(content + " ")
        //fs.readFile()
    }
    console.log("finish")
})

console.log("After")