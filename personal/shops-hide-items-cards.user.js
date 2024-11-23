// ==UserScript==
// @name         Shops: Hide Specific Items - Collectable Card Shop
// @version      1.1.0.20241123
// @author       zevanty
// @description  Hide specific items from Collectable Card Shop shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=8(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // Blue: r39 and below
            /*'Doirn', 'Nereid the Water Faerie', 'Goldwing', 'Guardian of Fire Magic', 'Lupe Warrior',*/ 'M*ynci', /*'Rollay Scaleback',
            'Trapped', 'Zafara Rogue', 'Breadoch Big Foot', 'Flaming Wuzzle', 'Korabric',*/ 'Kraag the Korbat Leader', /*'Spectral Elemental',
            'Erick', 'Gargoyle Troop', 'Quiggle Strongman',*/ 'Rhiannon', 'Slychi the Skeith Invader', 'Arnie Hulltusk', //'Boraxis the Healer',
            'Chimi Magi', /*'Gors the Mighty', 'Malkus Vile',*/ 'Undead Cybunny', /*'Darien',*/ 'Gorunda the Wise', /*'Jeuru Stripedmane',
            'Lhika Burrtail', 'Moogi', 'Quiggle Warlord', 'Sharpeye',*/ 'Uggaroo', 'Uggsul', 'Venuquin',
            /*'A Two Rings Crusader', 'Annual Gormball Championship', 'Desert Flower', 'Dreaming', 'Florg the Devourer', 'Geirrod Sternhoof', 'Neoquest Hero',
            'Riyella', 'Uzarro', 'Li-sha', 'Lord Luparn', 'Lummock Sendent', 'Mokti', 'Two Rings Warlock',
            'Berserker', 'Captain Telhan',*/ 'Doctor', /*'Ghartun The Grundo Commander', 'Morax Dorangis', 'Professor Agatha', 'Kyrii Native', */
            'Mr Irgo', /*'Two Rings Archmagus', 'Uugbah Sharp Spear', 'Velvet Pimpernel',*/

            // Red: r40-r50
            'Captain Dread', /*'Gali Yoj', 'Godfried the Good', 'Midas', 'Professor Chesterpot', 'Rayn Trueshot',*/ 'Solar Fyre',
            /*'Tyran Far', 'Antikia Lighten',*/ 'Flying Shoyru', /*'Grundo Chef', 'Gutan Kai', 'Highland Chia', 'Moehawk',
            'Admiral Arvakis', 'Alabaster', 'Jannen',*/ 'Meerca Menace', 'Psellia the Air Faerie', 'Temple Watchman', 'Eleus Batrin',
            /*'Fuhnah The Fire Faerie',*/ 'Green Scale', /*'Hagalugg',*/ 'Kasuki Lu', /*'Ryshiki', 'The Phantom', 'The Stuff Collectable Card',
            'Undead Grundo Shopkeeper', 'Aurora the Healer',*/ 'Denethrir', /*'Haiki-Lu', 'Kargrax the Defender', 'Usinda', 'Xantan the Foul',
            'Otona, Protector of the Seas', 'Ruali', 'Tyrela Softpaw', 'Alhazad the Trader', 'Island Mystic', 'Rikti',
            'Sir Cheekalot',*/ 'Flutter', /*'Sarkif',*/ 'Trrygdorr', 'Underwater Chef', /*'Wrawk the Merciless', 'Xenia, Master Prankster',
            'Choras Tillie',*/ 'Jelly Chia', /*'Mrs. Prenderghast', 'Neopian Tank Patrol 45',*/ 'Pomanna', 'Samuel No Eyes', /*'Scorchio Mage', 'Sir Wockilan the Brave',*/

            // Pink: r51-r60
            /*'Magnus the Torch', 'The Auction Genie', 'The Gate Keeper',*/ 'Yes Boy Ice Cream', 'Advisor Wessle', /*'Fire Paw',*/ 'Nadia the Peophin of Love',
            'Ukkrah the Fire Grarrl', /*'Uncle Tharg', 'Plesio',*/ 'Tehuti', 'Zafara Hero', /*'Frostburn the Chia', 'Grarrl Battlemaster',
            'Liandra', 'Two Rings Wizard', 'Jake the Explorer', 'Rock Beast',*/ 'The Battle Faerie', /*'The Tooth Faerie', 'Glug Glug Jones',
            'The Archmagus of Roo', 'Hubert the Hot Dog Salesman', 'Lady Osiri', 'Leirobas',*/ 'Bacheek', //'Chiazilla',

            // Green: r61-r70
            'Feemix the Korbat Scout', /*'Kalora the Kau',*/ 'Pteri Knight', /*'Ryshu',*/ 'The Esophagor', /*'Chuffer Bob', 'Gog',
            'Rhan Tyr', 'Shoonee', 'King Coltzan III', 'Lavender', 'Zyrolon', 'Myncha', 'The Fontaine Sisters', */
            'Zephiea Boltheart', /*'Kharlos', 'Lustra the Golden Peophin',*/ 'Niten Hiroru', /*'Keergo', 'Luperus', 'Plains Aisha',
            'Count Von Roo', 'Grarrg', 'Senator Barca', '2 Gallon Hatz', 'Giant Grackle Bug', 'Korbats Lab Card', 'Kyruggi',
            'Princess Fernypoo', 'Umma Bunga',*/ 'Chen-Ra Son of the Sun', /*'Guardian of Shock Magic', 'Brack, Cactus Farmer', 'Grarrl Keno Card',*/
            'Shadow Usul', //'Tylix',

            // Purple: r71-r80
            /*'Edna the Witch',*/ 'Grimilix', /*'Blarthrox', 'Mystical Hissi Knight',*/ 'Bazri The Grundo', /*'Umbus Alta', 'Undead Farmer',
            'Shahuaga The Red',*/ 'Captain Threelegs', /*'Scorchio Mummy', 'Ursula Usul', 'Wesley Clearheart', 'Farlax V',*/ 'Hegred Aishann',
            /*'Iyana the Earth Faerie', 'Lenny Curator', 'Tug-O-War Card', 'Buzz Alchemist',*/ 'Grackle the Chia Bomber', /*'Captain Astounding',*/ 'Tazzalor',
            /*'The Negg Faerie', 'Tonunishiki', 'Brista Lightfeet',*/ 'Money Tree', 'The Wall', /*'Valkyrie', 'Beerlap III',*/
            'Bug Eye McGee', /*'Electro-Boy', 'Gelert Pack', 'Grargadon', 'Kiko Explorer',*/ 'King Roos Nemesis', /*'Pacha The Vet',
            'Scratch Card Kiosk Wocky', 'The Navigator',*/

            // Black: r81-r90
            /*'Evil Sloth Clone #32', 'Guardian of Life Magic', 'Maelstra The Dark Faerie', 'Bruce Avenger', 'Capara', 'Daedelon', 'Hasee Bounce Card',
            'Maitre D', 'Mysterious Aisha Sorceress',*/ 'Tyragh the Tyrannian Buzz', /*'Gragarex the Grarrl Trooper', 'Mutant Aisha Twins',*/ 'The Space Faerie', //'Dr_Death',
            'Sophie the Swamp Witch', /*'00 Hog',*/ 'General Crustygums', 'King Hagan of Brightvale', /*'Magax: Destroyer', 'Maths Nightmare', 'Senator Palpus',
            'Sir Fufon Lui', 'Chomby and the Fungus Balls', 'Garon the Lupe', 'Merouladen and Heermeedjet', 'Remnok the Nomad', 'Berti the Creator', 'Buzz Avenger',
            'Gadgadsbogen Festival', 'Guardian of Spectral Magic',*/ 'Imperius Flare', /*'Judge Hog', 'Lightning Lenny', 'The Lupe Collector', 'A Light Faerie',
            'LDPBSTSCC', 'Rainbow Fountain Card', 'The Masked Intruder', 'The Spider Grundo', 'Armin the Small', 'Commander Garoo Card', 'Deserted Fairground Card',
            'Draik Paladin', 'Eureka', 'Faleinn', 'Galem Darkhand', 'Ghi Pharun', 'Grey Faerie Card', 'Ixi Lancer',
            'Meuka', 'Spectre', 'The Snowager',*/

            // Yellow: r91-r99
            /*'Kreai', 'Princess Vyssa', 'Guardian of Ice Magic', 'Princess Sankara', 'Stan the Kyrii', 'The Great Blurendo', 'Jahbal',
            'Korosu Crestscar', 'Krawk card', 'Cherlops, Protector of Garn', 'Illusen the Earth Faerie', 'Margoreth', 'The Brain Tree',
            'Gedda Happycheek', 'Grotson', 'Hubrid Nox', 'Iskha Lightbringer', 'Jhudora the Dark Faerie', 'Lunchtime', 'Mechachiazilla',
            'Mechanoid Warrior', 'Mr. Chuckles', 'Scauderwelsch', 'The Pant Devil', 'The Shop Wizard', 'The Soup Faerie', 'Deckswabber',
            'Garrox5 The Grundo Trooper',*/ 'King Roo', /*'Krawk Swashbuckler', 'Neopet Version Two',*/ 'Space Krawk', /*'Treasure Seekers', 'Valrigard',
            'Zygorax', 'Branston the Eyrie', 'Champion',*/ 'Ghoul Catchers', /*'Jeran', 'Kalandra', 'Lady Quintara',
            'Master Vex', 'Meruth', 'Shylock Usulski',*/ 'Taelia The Snow Faerie', /*'Wock Til You Drop', 'Zafara Double Agent', 'Zeirn the Electric Kougra',
            'Captain Xelqued', 'Draconus Maximus', 'Duel Bazuka', 'Enchanted Ixi', 'Extreme Herder', 'Gilly the Usul', 'Kauvara',
            'Khan the Unstoppable', 'Kyrii Sorceror',*/ 'Lord Darigan', /*'Lord Kass Card', 'Marillis Harbane', 'Nocan Vish', 'Professor Kachevski',
            'Punchbag Bob', 'Sargug', 'Sergeant Brexis', 'Siona', 'Swamp Ghoul', 'The Incredible Grarrl', 'The Tax Beast',*/

            // Silver: r100
            //'Little Timmy', 'The Hairy Tongue Beast',
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