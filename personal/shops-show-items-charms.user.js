// ==UserScript==
// @name         Shops: Show Specific Items - Toy Shop
// @version      1.1.0.20240621
// @author       zevanty
// @description  Show only specific items from Toy Shop shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=3(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // Charms
            /*'Nimmo Gnome Collectable Charm', 'Chia Gnome Collectable Charm', 'Yellow PaintBrush Collectable Charm', 'Bika Collectable Charm', 'Chomby Gnome Collectable Charm',
            'Green PaintBrush Collectable Charm', 'Flower Trumpet Collectable Charm', 'Tagobo Potion Collectable Charm', 'Bori Gnome Collectable Charm',*/
            'Glyme Collectable Charm', 'Faerie Techo Plushie Collectable Charm', /*'Schnelly Collectable Charm',*/ 'Red PaintBrush Collectable Charm', 'Pinchit Collectable Charm',
            'Faerie Buzz Plushie Collectable Charm', 'Tigerfruit Collectable Charm', 'Blue PaintBrush Collectable Charm',
            'Cyodrake Collectable Charm', 'Gallion Collectable Charm', 'Techo Statue Collectable Charm', 'Taiko Standing Drum Collectable Charm', 'Elephante Lamp Collectable Charm',

            // Charms II
            //'Imposter Apple Collectable Charm',
            //'Princess Terrana Collectable Charm',
            'Hagan Collectable Charm',
            'Wherfy Collectable Charm',
            'Sloth Collectable Charm',
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