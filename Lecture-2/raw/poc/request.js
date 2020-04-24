let request = require("request")
let fs = require("fs")


//Async code is better than sync code because it wont block main thread

console.log("Before")
request("https://www.amazon.in/s?k=IPhone&ref=nb_sb_noss_2",(err,res,html) => {
    if(err == null && res.statusCode == 200){
        fs.writeFileSync("amazon.html",html)
    }else if(res.statusCode == 404){
        console.log("Invalid URL")
    }
    else{
        console.log(err)
        console.log(res.statusCode)
    }
})
console.log("After")