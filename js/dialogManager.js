// TODO: remove file protocol and IIFE. Use lite server and modular pattern. 
// Such that game is serves on localhost(as of now keeping it simple to avoid npm install)
// TODO: usage of babel to support es6 in older bowser
// TODO: addEventListener polyfill for IE8 and below

var DialogManager = (function () {
    // TODO: templates should be kept on a different file
    var templates = { 
    dialogTemplate : `
        <h2></h2>
        <div class="msg"></div>
        <form class="form-horizontal" autocomplete="off" novalidate>
            <div class="form-wrap">
            </div>
            <div class="button-wrap">
                <button type="submit" class="btn btn-pri">Submit</button>
                <button type="button" class="btn btn-pri cancel">Cancel</button>
            </div>
            <button type="button" class="close" aria-label="close">X</button>
        </form>`
    }

    class DialogManager {
        constructor(dialog){
            this.triggerBtn = document.getElementById(dialog);
            this.dialog = document.getElementById(this.triggerBtn.dataset.dialogWrapper);
            this.initBase();
        }
        initBase(){
            let frag = templates['dialogTemplate'];
            this.dialog.innerHTML = frag;
            this.header = this.dialog.querySelector('h2');
            this.submitBtn = this.dialog.querySelector('button[type="submit"]');
            this.msg = this.dialog.querySelector('.msg');
            this.triggerBtn.addEventListener('click', this.open.bind(this));
            this.dialog.querySelector('.cancel').addEventListener('click', this.close.bind(this));
            this.dialog.querySelector('.close').addEventListener('click', this.close.bind(this));
        }
        open(){
            document.getElementById('page-mask').style.display = 'block';
            this.dialog.style.display = 'block';
            this.dialog.focus();
        }
        close() {
            document.getElementById('page-mask').style.display = 'none';
            this.dialog.style.display = 'none';
            this.triggerBtn.focus();
        }
    }
    return (DialogManager);
})()