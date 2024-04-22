// ==UserScript==
// @name         Shops: Show Specific Items - Collectable Sea Shells
// @version      1.1.0.20240419
// @author       zevanty
// @description  Show only specific items from Collectable Sea Shells shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=86(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // Sea Shells
            /*'Green Clam Shell', 'Purple Scallop Shell', 'Glossy Blue Shell', 'Green Smooth Shell', 'Tangerine Trumpet Shell',
            'Brown Spotted Shell', 'Rainbow Coloured Shell', 'Spiky Shell', 'Crimson Spotted Shell', 'Camouflage Scallop Shell',
            'Pink Curly Shell', 'Shiny Purple Cowry Shell', 'Blue Spiral Seashell', 'Faerie Wings Shell', 'Spiky Orange Murex Shell',
            'Sparkly Green Scallop Shell',*/ 'Dazzling Blue Mussel Shell', 'Deep Seashell', 'Purple Spiral Shell', 'Blue and Gold Tube Shell',
            'Tiny Golden Shell', 'Matching Pastel Shells', 'Royal Orange Cowry Shell', 'Purple Twirly Shell', 'Golden Shell',

            // Treasures of the Deep
            /*'Circlet of the Deep', 'Shell Comb', 'Tiara of the Deep',*/ 'Shell Clutch',
            /*'Hair Clip of the Deep', 'Hairpin of the Deep', 'Bangles of the Deep',
            'Armlet of the Deep',*/ 'Diadem of the Deep',
            'Enameled Peophin Brooch of the Deep', 'Coronet of the Deep',
            'Exquisite Peophin Ring of the Deep', 'Anklet of the Deep', 'Choker of the Deep',

            // Maractite Coins
            /*'Squared Maractite Coin', 'Half Maractite Coin', 'Triangular Maractite Coin', 'Maractite Koi Maractite Coin', 'Seaweed Design Maractite Coin',*/
            //'Dual Tone Maractite Coin', 'Worn Maractite Coin',
            'Maraquan Kau Maractite Coin', //'Runed Maractite Coin', 'Rusty Sloth Clone Maractite Coin',
            'Maraquan Skeith Maractite Coin', 'Maraquan Draik Maractite Coin', 'Large Maractite Coin',
            'Streaked Maractite Coin', 'Floral Maractite Coin',
        ]);
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.ignore {display:none} .allIgnored {font-size:20px !important}';
        head.appendChild(style);

        let allIgnored = true;

        let divs = document.querySelectorAll('div.shop-item');
        divs.forEach(div => {
            let divItem = div.querySelector('div.item-img');
            if (divItem) {
                let item = divItem.getAttribute('data-name');
                if (!ownedItems.has(item)) {
                    div.classList.add('ignore');
                }
                else {
                    allIgnored = false;
                }
            }
        });

        if (divs.length > 0 && allIgnored) {
            let section = document.querySelector('form[name="items_for_sale"]');
            let msg = document.createElement('p');
            msg.classList.add("allIgnored");
            msg.innerHTML = '<b>You have hidden everything. Refresh the page and try again.<b>'
            section.appendChild(msg);
        }
    }
})();