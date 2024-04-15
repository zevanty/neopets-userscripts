// ==UserScript==
// @name         Shops: Hide Specific Items
// @version      1.0.0
// @author       zevanty
// @description  Hide specific items from a Neopian shop (edit the shop ID in the @include header). WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=1(&type=shop)?$/
// ==/UserScript==

// REMEMBER TO CHANGE THE SHOP ID: In the @include header, modify the number after: obj_type=
(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // Add your comma delimited name of items here
        ]);
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.ignore {display:none}';
        head.appendChild(style);

        let divs = document.querySelectorAll('div.shop-item');
        divs.forEach(div => {
            let divItem = div.querySelector('div.item-img');
            if (divItem) {
                let item = divItem.getAttribute('data-name');
                if (ownedItems.has(item)) {
                    div.classList.add('ignore');
                }
            }
        })
    }
})();