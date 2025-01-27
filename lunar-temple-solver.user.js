// ==UserScript==
// @name         Lunar Temple Solver
// @version      1.0.0
// @author       zevanty
// @description  Highlights the correct moon in Lunar Temple. You'll still need to select it though.
// @match        https://www.neopets.com/shenkuu/lunar/?show=puzzle
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.highlight {background-color:green}';
        head.appendChild(style);

        let answer = -1;
        let scripts = document.querySelectorAll('td.content > div > div[align="center"] > script');
        for (let script of scripts) {
            let scriptValue = script.innerHTML;
            if (scriptValue) {
                let angle = scriptValue.match(/angleKreludor=(\d+)/);
                if (angle.length == 2) {
                    answer = Math.round(parseFloat(angle[1]) / 22.5);
                    if (answer < 8) {
                        answer += 8;
                    }
                    else {
                        answer -= 8;
                    }
                    break;
                }
            }
        }

        if (answer > -1 && answer < 16) {
            let table = document.querySelector('td.content > div > form[action="results.phtml"] > table > tbody');
            let moons = table.querySelectorAll('td');
            if (moons.length == 16) {
                moons[answer].classList.add('highlight');
            }
            else {
                alert('Something went wrong. Number of moons: ' + moons.length);
            }
        }
        else {
            alert('Something went wrong. Selected moon: ' + answer);
        }
    }
})();