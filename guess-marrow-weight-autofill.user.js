// ==UserScript==
// @name         Guess the Weight of the Marrow Auto-fill
// @version      1.0.0
// @author       zevanty
// @description  Automatically fill the Guess the Weight of the Marrow form with a random number or a number of your choice.
// @match       https://www.neopets.com/medieval/guessmarrow.phtml
// ==/UserScript==

(function() {
    'use strict';

    // MODIFY THIS VALUE IF YOU DO NOT WANT TO USE RANDOM NUMBER.
    const USE_RANDOM_NUMBER = true;
    const RANDOM_MIN = 200;
    const RANDOM_MAX = 800;

    // If you don't want to use random number from previous variable, enter your desired value here.
    let MARROW_WEIGHT = 200;

    let inputField = document.querySelector('input[name="guess"]');
    if (inputField) {
        if (USE_RANDOM_NUMBER) {
            MARROW_WEIGHT = Math.floor(Math.random()*(RANDOM_MAX-RANDOM_MIN+1)+RANDOM_MIN);
        }
        inputField.setAttribute('value', MARROW_WEIGHT);
    }

})();