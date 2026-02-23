// ==UserScript==
// @name         Dice-A-Roo: Hide "Stop Playing" button
// @version      1.0.0
// @author       zevanty
// @description  Button to hide the "Stop Playing" button in Dice-A-Roo so you can mindlessly click without accidentally ending early.
// @match      https://www.neopets.com/games/play_dicearoo.phtml
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.ignore {display:none} .allIgnored {font-size:20px !important}';
        head.appendChild(style);

        let inputs = document.querySelectorAll('input[type="submit"]');
        for (let i = 0; i < inputs.length; i++) {
            let buttonLabel = inputs[i].getAttribute('value');
            if (buttonLabel != null && buttonLabel.match(/^Stop playing/)) {
                inputs[i].style.setProperty('display','none','important');
                break;
            }
        };
    }
})();