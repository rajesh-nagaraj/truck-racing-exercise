// TODO: remove file protocol and IIFE. Use lite server and modular pattern. 
// Such that game is serves on localhost(as of now keeping it simple to avoid npm install)
// TODO: usage of babel to support es6 in older bowser
// TODO: Polyfill for html5 FormData
var ResetGameDialog = (function () {

    var template = `
        <div class="form-group">
            <label for="player-name">Player Name</label>
            <input type="text" id="player-name" name="player-name" required>
        </div>
        <div class="form-group">
            <label for="truckers-count">Number of Truckers</label>
            <select id="truckers-count" name="truckers-count" required>
                <option value="">Choose number of truckers</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
        <div class="form-group">
            <label for="intial-funds">Initial Funds</label>
            <input type="number" id="intial-funds" name="intial-funds" required>
        </div>
    `;

    class resetGameDialog extends DialogManager {
        constructor(dialog){
            super(dialog);
            this.playerName = document.getElementById('player-info-name');
            this.init();
        }
        init(){
            var self = this;
            this.header.innerText = "Game Setup";
            this.submitBtn.innerText = "Start Game";
            let formEl = this.dialog.querySelector('.form-wrap');
            formEl.innerHTML = template;
            this.dialog.querySelector('form').addEventListener('submit', function(event){
                event.preventDefault();
                var formData = new FormData(this);
                var valid = self.validate(formData);
                if(valid){
                    app.truckRace.setTruckCount(formData.get("truckers-count"));
                    self.playerName.innerText = formData.get("player-name");
                    app.funds.setInitialFunds(parseInt(formData.get("intial-funds")));
                    self.close();
                    this.reset();
                }
            })
        }
        validate(formData){
            var valid = true;
            for(let val of formData.values()){
                if(val == "0" ){
                    this.msg.innerHTML = "Please fill valid inputs";
                    valid = false;
                }else if(val == ""){
                    this.msg.innerHTML = "Please fill all the fields";
                    valid = false;
                }
            }
            return valid;
        }
    }
    return (resetGameDialog);
})()