const fs = require("fs");

fs.readFile("file1.txt", (err, data) => {
    if (data.byteLength > 20) {
        console.log("file2.txt")
        fs.readFile("file2.txt", (err, data) => {
            if (data.byteLength > 40) {

                fs.readFile("file6.txt", (err, data) => {
                    console.log("file6.txt")
                })
            }

            else {

                fs.readFile("file7.txt", (err, data) => {
                    console.log("file7.txt")
                })
            }
        })
    }
    else {

        fs.readFile("file3.txt", (err, data) => {
            console.log("file3.txt")
            if (data.byteLength < 30) {

                fs.readFile("f4.txt", (err, data) => {
                    console.log("f4.txt")
                })
            }
            else {
                fs.readFile("f5.txt", (err, data) => {
                    console.log("f5.txt")
                })
            }
        })
    }
})