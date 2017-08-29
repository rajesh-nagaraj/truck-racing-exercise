// TODO: remove file protocol and IIFE. Use lite server and modular pattern. 
// Such that game is serves on localhost(as of now keeping it simple to avoid npm install)
// TODO: usage of babel to support es6 in older bowser
var FundManager = (function () {
    class FundManager {
        constructor({ initialFunds = 1000 }) {
            this.fundBalance = initialFunds;
            this.currentbets = [];
            this.fundsOnUI = document.getElementById('fund-balance');
            this.betPlacingBtn = document.getElementById('place-bet');
        }
        setInitialFunds(initialFunds){
            this.fundBalance = initialFunds;
            this.updateSrn();
        }
        validateCurrentBet(currentBetTotal) {
            if (currentBetTotal <= this.fundBalance) {
                return true;
            } else {
                return `insuffient balance, you are ${Math.abs(this.fundBalance - currentBetTotal)} short to place this bet`;
            }
        }
        calGainOrLose(winningTruck){
            var gainOrLose = 0;
            for(let i=0; i<this.currentbets.length; i++){
                if(i == winningTruck){
                    gainOrLose += this.currentbets[i];
                }else{
                    gainOrLose -= this.currentbets[i];
                }
            }
            if(gainOrLose < 0){
                this.fundBalance -= Math.abs(gainOrLose);
                this.updateSrn();
                return `Oh oh, you lost $${Math.abs(gainOrLose)}. Truck ${winningTruck+1} won the race`;
            }else{
                this.fundBalance += gainOrLose;
                this.updateSrn();
                return `Congrats!, you Won $${gainOrLose}. Truck ${winningTruck+1} won the race`;
            }
        }
        updateSrn(){
            if(this.fundBalance == 0){
                this.betPlacingBtn.disabled = true;
                setTimeout(function(){
                    app.truckRace.raceResults.innerHTML += '. Your fund balace is $0, reset game to restart';
                })
            }
            this.fundsOnUI.innerText = '$' + this.fundBalance;
        }
    }
    return (FundManager);
})()