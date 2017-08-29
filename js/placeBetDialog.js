// TODO: remove file protocol and IIFE. Use lite server and modular pattern. 
// Such that game is serves on localhost(as of now keeping it simple to avoid npm install)
// TODO: usage of babel to support es6 in older bowser
// TODO: Polyfill for html5 FormData
var PlaceBetDialog = (function () {
    var truckColors = ['red', 'blue', 'orange', 'purple', 'green', 'aqua'];
    class PlaceBetDialog extends DialogManager {
        constructor(dialog, truckCount){
            super(dialog);
            this.render(truckCount);
        }
        render(truckCount){
            var self = this;
            this.header.innerText = "Place your bet against the trucks of your choice";
            this.submitBtn.innerText = "Bet";
            this.updateBettingScreen(truckCount);
            this.dialog.querySelector('form').addEventListener('submit', function(event){
                event.preventDefault();
                let totalBet = 0;
                var formData = new FormData(this);
                var bets = [];
                for(let value of formData.values()){
                    var bet = value == "" ? 0 : parseInt(value, 10);
                    bets.push(bet);
                    totalBet += bet;
                }
                if(totalBet == 0){
                    self.msg.innerText = "Place your bet please";
                }
                var msg = app.funds.validateCurrentBet(totalBet);
                if(typeof(msg) == "string"){
                    self.msg.innerText = msg;
                }else{
                    self.close();
                    this.reset();
                    app.truckRace.setupNewRace(bets)
                }
            })
        }
        updateBettingScreen(truckCount){
            let form = '';
            let formEl = this.dialog.querySelector('.form-wrap');
            for(let i=0; i<truckCount; i++){
                form += `
                    <div class="form-group">
                        <label for="truck${i+1}">Trucker${i+1} (${truckColors[i]}):</label>
                        <input type="number" id="truck${i+1}" name="truck${i+1}" min="0" >
                    </div>`;
            }
            formEl.innerHTML = form;
        }
    }
    return (PlaceBetDialog);
})()