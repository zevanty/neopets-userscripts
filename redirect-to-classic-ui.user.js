// ==UserScript==
// @name         Redirect to Classic UI
// @version      1.0.3
// @author       zevanty
// @description  Redirect the page to use classic UI. Note that some pages require Flash for it to work.
// @include      /^https?:\/\/www\.neopets\.com\/(explore|trudys_surprise|market_plaza|market_bazaar)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/altador\/(index)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/desert\/(index|qasala|sakhmet|shrine)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/halloween\/(index|index_fair|neovia)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/faerieland\/(caverns\/)?(index|faeriecity|springs|tdmbgpop)\.phtml(\/springs.phtml)?$/
// @include      /^https?:\/\/www\.neopets\.com\/island\/(haiku\/)?(index|haiku|mystichut)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/jelly\/(index|jelly)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/magma\/(index|caves)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/medieval\/(index|index_castle|index_evil|index_farm|brightvale)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/moon\/(index)\.phtml\/?$/
// @include      /^https?:\/\/www\.neopets\.com\/pirates\/(index|warfwharf|anchormanagement)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/prehistoric\/(index|plateau|omelette)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/water\/(index|index_ruins|fishing)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/space\/(index|hangar|recreation)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/shenkuu\/(index)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/winter\/(index|icecaves|terrormountain|wintercelebration)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/worlds\/(index_geraptiku|index_kikolake|index_roo)\.phtml$/
// ==/UserScript==
(function() {
    'use strict';

    let currUrl = location.toString();

    // Kreludor HTML map no longer exist on Neopets server
    if (currUrl.endsWith('/moon/index.phtml/')) {
        // Alternative location: https://www.jellyneo.net/images/tourguide/kreludor_2005_01.gif
        document.querySelector('img[usemap="#moon"]').setAttribute('src', 'https://zevanty.github.io/neopets-userscripts/assets/kreludor_2005_01.gif');
    }

    // Fix Healing Spring purchase page on Classic UI
    else if (currUrl.endsWith('/springs.phtml/springs.phtml')) {
        let headerUrl = 'https://www.neopets.com/faerieland/';
        let items = document.querySelectorAll('a[href*="process_springs.phtml"]');
        items.forEach(item => {
            let itemUrl = item.getAttribute('href');
            item.setAttribute('href', headerUrl + itemUrl);
        });
    }

    // Perform the redirect
    else {
        // This may not work on certain browsers
        location.href = location + "/";

        // Backup in case the previous doesn't work
        window.onload = function() {
            location.href = location + "/";
        }
    }


})();