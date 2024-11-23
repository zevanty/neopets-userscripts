// ==UserScript==
// @name         Wishing Well Auto-fill
// @version      1.0.0
// @author       zevanty
// @description  Automatically fill the Wishing Well form. BE SURE TO UPDATE YOUR DESIRED NP AND ITEM.
// @include      /^https:\/\/www\.neopets\.com\/wishing\.phtml/
// ==/UserScript==

(function() {
    'use strict';

    // ENTER YOUR PERSONAL WISH NP/ITEM HERE
    const DONATION_NP = '21';
    const WISH_ITEM = 'Snowager Stamp';

    document.querySelector('input[name="donation"]').setAttribute('value', DONATION_NP);
    document.querySelector('input[name="wish"]').setAttribute('value', WISH_ITEM);

})();