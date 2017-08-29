// TODO: remove file protocol and IIFE. Use lite server and modular pattern. 
// Such that game is serves on localhost(as of now keeping it simple to avoid npm install)
// TODO: usage of babel to support es6 in older bowser
var app = (function () {
    var raceOptions = {
        truckCount: 4,
        selector: document.querySelector("#race ul"),
    }
    var fundOptions = {
        initialFunds: 1000
    }
    var truckRace = new RaceComponent(raceOptions);
    var funds = new FundManager(fundOptions);
    var bettingSrn = new PlaceBetDialog('place-bet', truckRace.truckCount );
    var resetSrn = new ResetGameDialog('reset' );
    
    return {
        funds:funds,
        truckRace: truckRace,
        bettingSrn: bettingSrn
    }
})()
