// TODO: remove file protocol and IIFE. Use lite server and modular pattern. 
// Such that game is serves on localhost(as of now keeping it simple to avoid npm install)
// TODO: usage of babel to support es6 in older bowser
var RaceComponent = (function () {
    var trucks = ['red', 'blue', 'orange', 'purple', 'green', 'aqua'];
    class Race {
        constructor({ truckCount = 4, selector }) {
            this.truckCount = truckCount;
            this.selector = selector;
            this.startRaceBtn = document.getElementById('start-race');
            this.placeBetBtn = document.getElementById('place-bet');
            this.raceResults = document.getElementById('race-results');
            this.render();
        }

        setTruckCount(count) {
            this.truckCount = count;
            this.updateUI();
            app.bettingSrn.updateBettingScreen(this.truckCount)
        }
        render() {
            this.updateUI();
            this.placeBetBtn.disabled = false;
            this.startRaceBtn.addEventListener('click', this.race.bind(this));
        }
        race() {
            var self = this;
            var winner = null;
            var msg = "";
            self.raceResults.innerText = "";
            var id = setInterval(function () {
                    let finishLine = document.getElementById('race').clientWidth;
                    let trucks = self.selector.querySelectorAll('li span.truck');
                    for (let i = 0; i < self.truckCount; i++) {
                        let leftPositionStr = trucks[i].style.left;
                        let leftPosition = leftPositionStr == "" ? 0 : parseInt(leftPositionStr, 10);
                        let newLeftPosition = (leftPosition + Math.floor(Math.random() * 3));
                        trucks[i].style.left = newLeftPosition + 'px';
                        if (newLeftPosition >= finishLine) {
                            clearInterval(id);
                            winner = i;
                            self.raceResults.innerText = app.funds.calGainOrLose(winner);
                        }
                    }
                }, 5);
            this.startRaceBtn.disabled = true;
        }
        setupNewRace(bets){
            // TODO: FormData polifill for old browsers
            let trucks = this.selector.querySelectorAll('li span.truck');
            app.funds.currentbets = [];
            for(let i=0; i<bets.length; i++){
                trucks[i].style.left = '0px';
                app.funds.currentbets[i] = bets[i];
                if( bets[i] != 0 ){
                    trucks[i].querySelector('.bet').innerText = "$" + bets[i];
                }
            }
            this.startRaceBtn.disabled = false;
            this.raceResults.innerText = "You are all set to Race, press Start Race button when you are ready";
        }
        updateUI(){
            var tracks = "";
            for (let i = 0; i < this.truckCount; i++) {
                // TODO: with svg this can be handled with just one img(over a huge sprite), 
                // but without localhost crome through javascript errors getting the svg content element(can be optimized with svg with fall back for old browsers)
                tracks += `<li><span class="truck sprite truck-${trucks[i]}"><span class="bet"></span></span></li>`;
            }
            this.selector.innerHTML = tracks;
            this.raceResults.innerText = "Place your Bet to Start the Race";
        }
    }

    return (Race);
})()