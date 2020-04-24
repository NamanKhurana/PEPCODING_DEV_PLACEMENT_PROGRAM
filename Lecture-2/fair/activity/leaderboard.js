// https://www.espncricinfo.com/series/19322/commentary/1187683
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio")
let count = 0
console.log("Requesting file");
// loc
let leaderBoard = []
request(
    `https://www.espncricinfo.com/scores/series/19322`,
    function (err, res, html) {
        if (err == null && res.statusCode == 200) {
            console.log("Recived Html");
            parseHtml(html);
        } else if (res.statusCode == 404) {
            console.log("Page Not Found");
        } else {
            console.log(err);
            console.log(res.statusCode);
        }
    }
);

//series => filter => match request
function parseHtml(html) {
    console.log("Parsing Html");
    // html => convert $=> search
    let co = cheerio.load(html);
    let cards = co(".cscore.cscore--final.cricket.cscore--watchNotes")

    for(let i = 0;i<cards.length;i++){
        let matchType = co(cards[i]).find(".cscore_info-overview").html()
        let test = matchType.includes("ODI") || matchType.includes("T20I")
        if(test == true){
            console.log(matchType)
            //.attr() and .html() give first element only
            //.text() give all the elements
            //.find() gives an array of all the elements with same selectors
            let anchor = co(cards[i]).find(".cscore_buttonGroup ul li a").attr("href")
            let matchLink = `https://www.espncricinfo.com${anchor}`
            goToMatchPage(matchLink)
            // count++
            // console.log(anchor)
            // console.log(`https://www.espncricinfo.com/${anchor}`)
        }
    }
    console.log("----------------------------------------------------------------------------")
}

//page request
function goToMatchPage(matchLink){
    count++
    request(matchLink,(err,res,html) => {
        if(err == null && res.statusCode == 200){
            // console.log(`File ${count} saved to disk`)
            // fs.writeFileSync(`match${count}.html`,html)
            count--
            handleMatch(html)
            if(count == 0){
                console.table(leaderBoard)
            }
        }else if(res.statusCode == 404){
            console.log("Page Not Found")
        }else{
            console.log(err)
        }
    })
}

//html => team,format,runs,name
function handleMatch(html){
    //batsman
    let co = cheerio.load(html);
    let format = co(".cscore.cscore--final.cricket .cscore_info-overview").html()
    format = format.includes("ODI") ? "ODI" : "T20"
    //team
    let teams = co(".sub-module.scorecard h2")
    let innings = co(".sub-module.scorecard")
    // console.log(format)
    for(let i = 0;i<innings.length;i++){
        let batsMenRows = co(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen")
        let team = co(teams[i]).text()

        for(let br = 0;br<batsMenRows.length;br++){
           let batsMan = co(batsMenRows[br])
           let BatsManName = batsMan.find(".cell.batsmen").text()
           let BatsManRuns = batsMan.find(".cell.runs").html()
        //    console.log(BatsManName + " " + BatsManRuns)
        handlePlayer(format,team,BatsManName,BatsManRuns)
        }
        // console.log("################################################")
    }
}

//add player to leaderboard xs
function handlePlayer(format,team,BatsManName,BatsManRuns){
    //batsman => 
    //1.First Time => create new
    //2.Existing runs increase

    //check if player already exists
    BatsManRuns = Number(BatsManRuns)
    
    for(let i = 0;i<leaderBoard.length;i++){
        let pObj = leaderBoard[i]
        if(pObj.name == BatsManName && pObj.team == team && pObj.format == format){
            pObj.runs+=BatsManRuns
            return
        }
    }

    let obj = {
        runs : BatsManRuns,
        format:format,
        team:team,
        name:BatsManName
    }
    leaderBoard.push(obj)
}