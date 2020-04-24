let fs = require("fs")
console.log("start")
let fileWithPromise = fs.promises.readFile("hello.html")
console.log(fileWithPromise)
console.log("After")
fileWithPromise.then((content) => {
    console.log(content + " ")
})
fileWithPromise.catch((err) => {
    console.log(err)
})