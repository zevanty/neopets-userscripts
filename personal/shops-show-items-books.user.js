// ==UserScript==
// @name         Shops: Show Specific Items - Magical Bookshop
// @version      1.1.0.20241123
// @author       zevanty
// @description  Show only specific items from Magical Bookshop shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=7(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // 1 only
            'All About Dark Faeries', 'All About Fire Faeries', 'Brightvale Potion Manual', 'Bruce Beauty Tips', 'Care of Koi',
            'Darigan Skeith Adventures', 'Dont Call Me Cute', 'Falling Leaves', 'Flotsam Style', 'Forever Ferny', 'Geometry Level 2',
            'Gone Fishing', 'Gourmet Cooking For Your Pet', 'Grundo Ballet', 'Grundo Food', 'Guide to Lupes', 'How to Ride a Bike',
            'Kau Pies', 'King Hagans Biography', 'Know Your Collectable Cards', 'Learn to Fly', 'Looking Like A Moehog',
            'Maps of Neopia', 'Nest Builders Manual', 'Pazo the Lonely Aisha', 'Playing with Fire', 'Poogle Pages', 'Sakhmet Natives',
            'Sakhmet Tales', 'Sinister Skeith', 'The Book of Ice', 'The Cowardly Tuskaninny', 'The Elephante Encyclopedia',
            'The End of the Tunnel', 'The Green Book', 'The Korbat Who Couldnt Hang', 'The Mote Encyclopedia', 'Unhappy Tails',
            'Wonderful World of Gardening',

            // 2 only
            'All About Earth Faeries', 'Brightvale Castle', 'Geometry Level 1', 'Guide to Petpets', 'How to Stay Fit', 'Im Not Angry',
            'JubJub Know How', 'Little book of puzzles', 'Modern Spells', 'My Garden Book', 'Quiggle Facts', 'Tales of Bravery', 'Terrific Acaras',
            'Top Tuskaninnys', 'Unique Unis',

            // 3 only
            'Bubble Sculptures', 'Cybunny Care',

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