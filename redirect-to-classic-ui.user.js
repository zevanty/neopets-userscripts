// ==UserScript==
// @name         Redirect to Classic UI
// @version      1.0.5
// @author       zevanty
// @description  Redirect the page to use classic UI. Note that some pages require Flash for it to work.
// @include      /^https?:\/\/www\.neopets\.com\/(trudys_surprise|nf|market_plaza|market_bazaar)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/(explore|generalstore)\.phtml\/?$/
// @include      /^https?:\/\/www\.neopets\.com\/altador\/(index)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/desert\/(index|qasala|sakhmet|shrine)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/halloween\/(index|index_fair|neovia)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/faerieland\/(caverns\/)?(index|faeriecity|springs|tdmbgpop)\.phtml(\/springs.phtml)?$/
// @include      /^https?:\/\/www\.neopets\.com\/island\/(haiku\/)?(index|haiku|mystichut)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/jelly\/(index|jelly)\.phtml\/?$/
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
// @match        https://www.jellyneo.net/?go=dailies
// ==/UserScript==
(function() {
    'use strict';

    let currUrl = location.toString();

    // Some HTML maps are missing on the servers
    if (/\/(jelly|moon)\/index\.phtml\/$/.test(currUrl)) {
        missingHtmlMap(currUrl);
    }

    // Fix Tyrannia URL in the World Map
    else if (currUrl.endsWith('/explore.phtml/')) {
        let items = document.querySelectorAll('a[href="prehistoric/index.phtml"]');
        items.forEach(item => {
            let itemUrl = item.getAttribute('href');
            item.setAttribute('href', '/' + itemUrl);
        });
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

    // Fix General Store purchase page on Classic UI
    else if (currUrl.endsWith('/generalstore.phtml/')) {

        // Ensure purchase page is Classic UI
        let item = document.querySelector('form[action="/generalstore.phtml"]');
        if (item) {
            let itemUrl = item.getAttribute('action');
            item.setAttribute('action', itemUrl + '/');
        }
        // We should now be in purchase page. Ensure leaving page will go back to General Store Classic UI
        else {
            item = document.querySelector('input[value="Back to Shop"]');
            if (item) {
                let itemUrl = item.getAttribute('onclick');
                item.setAttribute('onclick', 'window.location=\'/generalstore.phtml/\';');
            }
        }
    }

    // Make sure Jellyneo's Dailies link to Rich Slorg page is to Classic
    else if (currUrl.includes('jellyneo.net')) {
        let items = document.querySelectorAll('a[href="https://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes"]');
        items.forEach(item => {
            item.setAttribute('href', 'https://www.neopets.com/shop_of_offers.phtml/?slorg_payout=yes');
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

    function missingHtmlMap(url) {
        let attr = '';
        let fileName = '';

        // Jelly World
        if (url.endsWith('/jelly/index.phtml/')) {
            attr = 'jellymap_Map';
            fileName = 'jelly_2005_06.gif';
        }
        // Kreludor
        else if (url.endsWith('/moon/index.phtml/')) {
            attr = 'moon';
            fileName = 'kreludor_2005_01.gif';
        }
        else {
            alert('ERROR! UNKNOWN URL');
            return;
        }

        // Alternative location: https://www.jellyneo.net/images/tourguide/<fileName>
        document.querySelector('img[usemap="#' + attr +'"]').setAttribute('src', 'https://zevanty.github.io/neopets-userscripts/assets/' + fileName);
    }

})();