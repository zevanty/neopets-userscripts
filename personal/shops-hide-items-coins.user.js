// ==UserScript==
// @name         Shops: Hide Specific Items - Collectable Coins
// @version      1.1.0.20240419
// @author       zevanty
// @description  Hide specific items from Collectable Coins shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=68(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // Coins
            'Silver Babaa Coin', 'Book Coin', 'Brass Usuki Coin', 'Money Tree Coin', 'Rainbow Pool Coin',
            'Eliv Thade Coin', 'Turtum Coin', 'Silver Buzzer Coin', 'Snow PaintBrush Coin', 'Frozen Snowflake Coin',
            'Silver Concert Hall Coin', 'Hasee Coin', /*'Bronze Mystery Island Coin',*/ 'Golden Scarab Coin', 'Giant Ghostkerchief Coin',
            'Defenders Of Neopia Coin', 'Goo Blaster Coin', 'Larnikin Coin', 'PaintBrush Coin', 'Chocolate Factory Coin',
            'Battledome Coin', 'Dr Sloth Coin', 'Crystal Kauvara Coin', 'Neopian Times Coin', 'Emerald Eyrie Coin',

            // Space Station Coins
            'Grundo Veggieballs Coin', 'Grobleen Salad Coin', 'Cosmic Cheese Stars Coin', //'Roast Gargapple Coin', 'Zoomik Coin',
            /*'Vacumatic 9000 Coin', 'N-4 Information Retrieval Bot Coin', 'GX-4 Oscillabot Coin', 'Gargaroxs Recipe Book Coin',*/ 'Gormball Coin',
            /*'Electro Shield Coin',*/ 'H4000 Helmet Coin', 'Grundo Warehouse Coin', /*'Adopt A Grundo Coin', 'Evil Fuzzle Coin',*/
            /*'Splat A Sloth Coin', 'Astral Blade Coin', 'Lever of Doom Coin', 'Super Nova Coin', 'Mallow Coin',
            'Bzzt Blaster Coin', 'Gorix and Cylara Coin', 'Neopet V2 Coin', 'Smiling Space Faerie Coin', 'Scowling Sloth Coin',*/

            // Scarabs
            'Basic Yellow Collectable Scarab', 'Polkadot Collectable Scarab', 'Orange Spotted Collectable Scarab', 'Common Desert Collectable Scarab', 'Bushy Antennae Collectable Scarab',
            'Striped Blue Collectable Scarab', 'Basic Fringed Collectable Scarab', 'Flashy Winged Collectable Scarab', 'Large Black and White Collectable Scarab', 'Simple Red Collectable Scarab',
            'Long Headed Collectable Scarab', //'Purple Collectable Scarab', 'Speckled Collectable Scarab', 'Uncommon Blue Collectable Scarab',
            'Horned Collectable Scarab', 'Greater Green Collectable Scarab', /*'Rainbow Collectable Scarab', 'Dazzling Verdant Collectable Scarab', 'Black and Yellow Collectable Scarab',
            'Spotted Red Collectable Scarab', 'Greater Yellow Collectable Scarab', 'Sparkleback Collectable Scarab', 'Spotted Blue Collectable Scarab', 'Large Black Collectable Scarab'*/

            // Scarabs II
            /*'Green Patterned Collectable Scarab',*/ 'Yellow and Black Collectable Scarab', 'Shiny Cocoa Collectable Scarab',
            //'Red Striped Collectable Scarab',
            'Orange Patterned Collectable Scarab',
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
                if (ownedItems.has(item)) {
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