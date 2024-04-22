// ==UserScript==
// @name         Shops: Show Specific Items - Chocolate Factory
// @version      1.0.0.20240419
// @author       zevanty
// @description  Show only specific items from Chocolate Factory shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=14(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // All r90+ items for the avatar
            'Angry Candy', 'Apple and Custard Drops', 'Apple Moquot Lollypop', 'Baby Cabbage Jelly Beans',
            'Banana Jelly Flotsam', 'Barbed Wire Black Licorice', 'Blueberry Gummy Slorg', 'Blueberry Gummy Stamp',
            'Blumaroo Cotton Candy', 'Bullseyes', 'Buzz Chocolate Bar', 'Candy Cane Chocolate Advent Calendar',
            'Candy Pirate Earrings', 'Candy Whistle', 'Caramel and Custard Drops', 'Charcoal Jelly Beans',
            'Cherry Aboogala Lolly', 'Cherry Meerca Gobstopper', 'Cherry Mootix Lollypop', 'Choco Spray',
            'Chococherry Blumaroo Ears', 'Chocolate Achyfi Lollypop', 'Chocolate Advent Calendar', 'Chocolate Balthazar',
            'Chocolate Blossom', 'Chocolate Crown of Sinsi', 'Chocolate Crown of the Faeries', 'Chocolate Cybunny Negg',
            'Chocolate Dr Sloth', 'Chocolate Gum', 'Chocolate Jeran', 'Chocolate King Skarl',
            'Chocolate Lipstick', 'Chocolate Maractite Coins', 'Chocolate Moltenore', 'Chocolate Orange Easter Negg',
            'Chocolate Peach', 'Chocolate Peanuts With Peas', 'Chocolate Ruki Kit', 'Chocoon',
            'Codestone Truffle', 'Creamy Choccywhip', 'Creamy Chocolate Pie', 'Crunchy Chocolate Grarrl',
            'Dark Chocolate Lutari', 'Dark Chocolate Poogle', 'Dark Chocolate Scorchio', 'Dark Chocolate Shoyru',
            'Dark Chocolate Skeith', 'Dark Chocolate Tuskaninny', 'Dark Chocolate Zafara', 'Deluxe Strawberry Toffee Chokato',
            'Destruct-O Chocolate Squares', 'Double Chocolate Jelly Beans', 'Draik Sugar Skull', 'ErgyFruit Jelly Beans',
            'Fishy Delight Grarrl Gobstopper', 'Fluff N Stuff Grarrl Gobstopper', 'Gnorbu Gum', 'Gnorbu Lollipop',
            'Grape Gummy Slorg', 'Green Apple Aisha Lollypop', 'Hazelnut Whirl', 'Holiday Bell Chocolate Advent Calendar',
            'Jelly Bean Pirate Chest', 'Juppiemint Bar', 'Kau Sundae', 'Kikopop',
            'Kougra Sugar Skull', 'Large Swirly Chocolate Cybunny', 'Large White Chocolate Cybunny', 'Lemon and Lime Easter Negg',
            'Lemon Bumbluz Lolly', 'Lemon Pinchit Lollypop', 'Lemon Sherbert Jelly Beans', 'Lime Skidget Lolly',
            'Lost City Lanes Lime Gobstopper', 'Luxury Chocolate Easter Negg', 'Marshmallow Plumpy', 'Miniature Chocolate Chocolate Factory',
            'Mint Chocolate Blumaroo', 'Mint Chocolate Chia', 'Mint Chocolate Easter Negg', 'Mint Chocolate Kacheek',
            'Mint Chocolate Lupe', 'Mint Chocolate Peophin', 'Mint Chocolate Tuskaninny', 'Minty Choccywhip',
            'Mud Lollipop', 'Neotruffle', 'Neverending Jar of Jellybeans', 'Omnipotent Onion Grarrl Gobstopper',
            'Orange Chocolate Pyramid', 'Orange Chocolate Scorchio', 'Orange Chocolate Tuskaninny', 'Orange Gummy Slorg',
            'Orange Gummy Stamp', 'Orange Lightmite Lollypop', 'Orange Scoach Lolly', 'Peanut Butter Gormball Truffle',
            'Peophin Chocolate Medallion', 'Pretty Pink Easter Negg', 'Rainbow Candy Floss', 'Raspberry and Vanilla Nova',
            'Raspberry Chocolate Tuskaninny', 'Red Buzz Lolly', 'Sniddberry Meerca Gobstopper', 'Snowflake Chocolate Advent Calendar',
            'Spooky Flying Doughnut', 'Spotted Easter Negg', 'Strawberries and Cream Easter Negg', 'Strawberry Fondant Surprise',
            'Sugar Moehog Skull', 'Sugar Tonu Skull', 'Super Spicy Jelly Beans', 'Sweet Necklace',
            'Thornberry Candy Gavel', 'Toffee Dubloon', 'Ummagine Candy Cane', 'Uni Sugar Skull',
            'Walking Carpet Cotton Candy', 'White Chocolate Lutari', 'White Chocolate Nova', 'Yummy Drops'
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
                if (!ownedItems.has(item)) {
                    div.classList.add('ignore');
                }
            }
        })
    }
})();