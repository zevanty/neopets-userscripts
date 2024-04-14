// ==UserScript==
// @name         Neocola Machine - Generate More NP
// @version      1.0.0
// @author       zevanty
// @description  Generate more NP from Neocola Machine. Although the Neopets code has this secret option, it may be considered cheating. USE AT YOUR OWN RISK.
// @match        https://www.neopets.com/moon/neocola2.phtml
// ==/UserScript==
(function() {
    'use strict';

    // Select the secret option.
    document.querySelector('select[name="neocola_flavor"]').add(new Option('The answer to life', 42, false, true));

    // Pre-select the optimal button.
    document.querySelector('select[name="red_button"]').value = 3;
})();