// ==UserScript==
// @name         Shops: Auto-fill Haggle Price
// @version      1.0.1
// @author       zevanty
// @description  Automatically fill the haggle price and moves the captcha all the way to the left. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/haggle\.phtml/
// ==/UserScript==

(function() {
    'use strict';
    let price = document.querySelector('div#shopkeeper_makes_deal > p > b').innerHTML;
    if (price) {
        price = price.replace(/^[^\d]+(\d*),?(\d)\d\d Neopoints.*$/,'$1$2$2$2');
        document.querySelector('input[name="current_offer"]').setAttribute('value', price);

        // Move the captcha to the left (meant to be used with the other show/hide userscripts)
        document.getElementsByClassName('haggleForm')[0].style.margin = '0px';
    }
})();