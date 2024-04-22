// ==UserScript==
// @name         Shops: Hide Specific Items - Neopian Post Office
// @version      1.0.0.20240419
// @author       zevanty
// @description  Hide specific items from Neopian Post Office shop. WARNING: THIS IS PRETTY MUCH CHEATING. USE AT YOUR OWN RISK.
// @include      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=58(&type=shop)?$/
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        const ownedItems = new Set([
            // Mystery Island
            'Mystery Island Kougra Stamp', 'Coco Stamp', 'Jhuidah Stamp', 'Island Native Stamp',
            'Mystery Island Hut Stamp', 'Assorted Fruits Stamp', 'Triangular Flotsam Stamp', 'Zeenana Stamp',
            'Haiku Stamp', 'Mystery Island Heads Stamp',
            'Island Mystic Stamp', 'Ryshu Stamp',
            /*'Need a Better Printer Stamp', 'Upside Down Island Acara Stamp', 'One Hundred Million Neopoint Stamp', 'Misaligned Printer Stamp', 'Nibbled Cooking Pot Stamp',*/

            // Virtupets
            'Grimilix Stamp', 'Neopet Version 2 Stamp', 'Gormball Stamp', 'Splat-A-Sloth Stamp', //'Dr. Sloth Stamp',
            /*'Space Faerie Stamp',*/ 'Grinning Sloth Stamp', 'Zygorax Stamp', 'Purple Grundo Stamp',
            'Roast Gargapple Stamp', 'N4 Bot Stamp', 'Blarthrox Stamp', //'Tazzalor Stamp', 'Zyrolon Stamp',
            'Advert Attack Stamp', /*'Evil Fuzzles Stamp', 'Gargarox Isafuhlarg Stamp', 'Mutant Grundo Stamp', 'Zurroball Stamp',
            'Double Printed Evil Fuzzle Stamp', 'Inverted Space Faerie Stamp', 'Grundo Warehouse Stamp', 'Virtupets Space Station Stamp', 'Holographic Virtupets Stamp',*/

            // Tyrannia
            'Tyrannian Grarrl Stamp', 'Chunk of Meat Stamp',
            'Tyrannian Kyrii Stamp', 'Tyrannian JubJub Stamp', 'Tyrannian Korbat Stamp', 'Tyrannian Blumaroo Stamp', 'Tyrannian Plateau Stamp',
            'Flying Korbats Stamp', 'Stone Armchair Stamp', 'Giant Leaf Curtains Stamp', 'Bone Chair Stamp', 'Tyrannian Usul Stamp',
            //'Shiny Monoceraptor Stamp', 'Stone Stamp',

            // Haunted Woods
            'Brain Tree Stamp', 'Esophagor Stamp', 'Fetch! Stamp', //'Haunted Mansion Stamp', 'Spyder Stamp',
            'Hubrid Nox Stamp', 'Mutant Usul Stamp', 'Rock Stamp', 'Carnival of Terror Stamp',
            'Korbats Lab Stamp', /*'Luperus Left Head Stamp', 'Luperus Centre Head Stamp', 'Luperus Right Head Stamp',*/ 'Halloween Aisha Stamp',
            'Spooky Gravestone Stamp', 'Moonlit Werelupe Stamp', 'Moonlit Esophagor Stamp', /*'Edna the Zafara Stamp', 'Glowing Brain Tree Stamp',
            'ARGH!!!! DONNA STAMP', 'Count Von Roo Stamp', 'Misprint Meuka Stamp', 'Holographic Magax Stamp', 'Foil Slorg Stamp',*/

            // Neopia Central
            'Alien Aisha Vending Stamp', 'Orange Skeith Stamp', 'Skeith Bank Manager Stamp', 'Robot Skeith Stamp', 'Huberts Hot Dogs Stamp',
            'Wishing Well Stamp', 'Money Tree Stamp', /*'Rainbow Pool Stamp',*/ 'Kauvara Stamp', 'Shop Wizard Stamp',
            'Book Shop Nimmo Stamp', 'Neolodge Stamp',
            'Deluxe Money Tree Stamp', /*'Neopian Hospital Stamp',*/ 'Jelly Pop Stamp', 'Jelly World Stamp', /*'Usukiland Stamp',
            'Super Bright Rainbow Pool Stamp', 'Foil Food Shop Stamp', 'Chocolate Factory Stamp', 'Neopia Central Scene Stamp',*/

            // NeoQuest
            /*'NeoQuest Logo Stamp', 'NeoQuest Hero Stamp', 'Jahbal Stamp',*/ 'Rotting Skeleton Stamp', 'Mist Kougra Stamp',
            'Plains Aisha Stamp', 'Two Rings Archmagus Stamp', 'Boraxis the Healer Stamp', 'Two Rings Crusader Stamp', 'Pomanna Stamp',
            /*'Mokti and Rikti Stamp',*/ 'Mr Irgo Stamp', 'Black Bearog Stamp', /*'Gatekeeper Stamp',*/ 'Leirobas Stamp',
            'Archmagus of Roo Stamp', /*'Zombie Faleinn Stamp', 'Kreai Stamp',*/ 'Morax Dorangis Stamp',
            //'Guardian Of Spectral Magic Stamp', 'Tylix Stamp', 'Eleus Stamp', 'Gors The Mighty Stamp', 'Xantan Stamp',

            // Snowy Valley
            'Snow Wars Catapult Stamp', 'Rainbow Slushie Stamp', 'Frosty Snowman Stamp', 'Wintery Petpet Shop Stamp', 'Wintery Bruce Stamp',
            'Christmas Meerca Stamp', 'Terror Mountain Scene Stamp', 'Igloo Garage Sale Stamp', /*'Rink Runner Stamp',*/ 'Christmas Kougra Stamp',
            'Christmas Uni Stamp', /*'Christmas Zafara Stamp', 'Scratchcard Kiosk Stamp',*/ 'Grundo Snow Throw Stamp',
            'Stocking Stamp', /*'Cliffhanger Stamp', 'Christmas Scene Stamp',*/ 'SHFISS Stamp', //'Negg Faerie Stamp',
            'Snow Faerie Stamp', /*'Ski Lodge Stamp', 'Snowager Stamp',*/ 'Snowbunny Stamp', 'Sticky Snowflake Stamp',

            // Meridell vs Darigan
            /*'Meridell Heroes Stamp', 'Darigan Citadel Stamp', 'Meridell Castle Stamp', 'Green Knight Stamp', 'Lisha vs Zombie Lisha Stamp',
            'Morris Stamp', 'Skeith Defender Stamp', 'Darigan Moehog Stamp', 'Boris Stamp',*/ 'Draik Guard Stamp',
            /*'Yellow Knight Stamp', 'Meridell Shield Stamp', 'Drackonack Stamp',*/ 'Darigan Shield Stamp', 'Darigan Eyrie Stamp',
            'Turmaculus Stamp', 'Darigan Elemental Stamp', 'Illusen Stamp', 'Jeran Stamp', 'Golden Orb Stamp',
            /*'Zombified Heroes Stamp',*/ 'Lord Darigan Stamp', 'King Skarl Stamp', 'Master Vex Stamp', //'Darigan Spectre Stamp',

            // Lost Desert
            'Golden Khamette Stamp', 'Desert Petpet Stamp', 'Pyramid Sun Rise Stamp', 'Lost Desert Grarrl Stamp', 'Advisor Wessle Stamp',
            'Senator Palpus Stamp', 'Midnight Desert Lupe Stamp', 'Osiris Pottery Stamp', 'Senator Barca Stamp',
            /*'Desert Paintbrush Stamp',*/ 'Peopatra Stamp', 'Grackle Bug Stamp', 'Princess Sankara Stamp', //'Lost Desert Scroll Stamp',
            'Lost Desert Sphinx Stamp', 'Tug Of War Stamp', 'Fruit Machine Stamp', 'Sakhmet Palace Stamp', 'Holographic Sakhmet City Stamp',
            'Geb Stamp', /*'Scarab Stamp',*/ 'Lucky Coin Stamp', 'Holographic Coltzans Shrine Stamp',

            // The Battledome
            'Sword of Skardsen Stamp', 'Attack Pea Stamp', 'Slorg Flakes Stamp', 'Faerie Slingshot Stamp', 'Hubrids Puzzle Box Stamp',
            'Eraser of the Dark Faerie Stamp', /*'Jhudoras Bewitched Ring Stamp',*/ 'Everlasting Crystal Apple Stamp', 'Sword of the Air Faerie Stamp', /*'Jewelled Scarab Stamp',
            'Rod Of Dark Nova Stamp', 'Jade Scorchstone Stamp',*/ 'Thyoras Tear Stamp', 'Exploding Space Bugs Stamp', 'Monoceraptor Claw Stamp',
            /*'Wand Of The Dark Faerie Stamp', 'Alien Aisha Myriad Stamp',*/ 'Alien Aisha Ray Gun Stamp', //'Kings Lens Stamp',
            'Illusens Staff Stamp', 'Shield Of Pion Troect Stamp', //'Rainbow Sticky Hand Stamp', 'Dark Battle Duck Stamp', 'Battle Slices Stamp',

            // Battle for Meridell
            /*'Dark Graspberry Stamp',*/ 'Gelert Prince Stamp', /*'Sunblade Stamp', 'Meridell Gardens Stamp',*/ 'Petpet Growth Syrup Stamp',
            'Zafara Princess Stamp', 'Gallion Stamp', 'Quiggle Scout Stamp', /*'Blugthak Stamp',*/ 'Castle Defender Stamp',
            /*'Usul-in-waiting Stamp', 'Blumaroo Court Jester Stamp',*/ 'King Skarl Plushie Stamp', 'Nova Storm Stamp', '105 Castle Secrets Stamp',
            'Exploding Acorns Stamp', /*'Zafara Double Agent Stamp', 'Battle Uni Stamp', 'Court Dancer Stamp', 'Hadrak Stamp',
            'Morguss Stamp', 'Meerca Spy Stamp', 'The Great Battle Stamp', 'Lord Kass Stamp', 'The Three Stamp',*/

            // NeoQuest II
            /*'Trestin Stamp',*/ 'Librarian Stamp', /*'Rohanes Mother Stamp',*/ 'Temple Of The Sky Stamp', 'Hubrid Noxs Mountain Fortress Stamp',
            'NeoQuest II Logo Stamp', 'Devilpuss Stamp', /*'Celestial Talisman Stamp',*/ 'Slime Titan Stamp', //'Kolvars Stamp',
            'Rampaging Grundonoil Stamp', //'Northern Watch Tower Stamp', 'Lost City of Phorofor Stamp', 'Shadow Gulch Stamp', 'Von Roos Castle Stamp',
            'Velm Stamp', /*'Talinia Stamp',*/ 'Rohane Stamp', /*'Mipsy Stamp', 'Sword Of Apocalypse Stamp',
            'NeoQuest II Esophagor Stamp', 'Scuzzy Stamp', 'Anubits Stamp', 'Ramtor Stamp', 'Terask Stamp',*/

            // Other
            'Dice-A-Roo Stamp', 'Commemorative Defenders Stamp #1', 'Destruct-O-Match Stamp',
            'Commemorative Defenders Stamp #2', 'Grand Theft Ummagine Stamp', 'Shenkuu Bridge Stamp', 'Suteks Tomb Stamp', 'Attack of the Slorgs Stamp',
            'Pile of Dung Stamp', /*'Faerie Bubbles Stamp', 'Commemorative Defenders Stamp #3',*/ 'Bottled Faerie Stamp',
            'Mystery Island Travel Stamp', /*'Shenkuu Mask Stamp', 'Hot Dog Hero Stamp', 'Rainbow Pteri Feather Stamp', 'Commemorative Defenders Stamp #4',
            'Altador Travel Stamp', 'Gold Mote Stamp', 'Count Von Roo Plushie Stamp', 'Ready to Roll Stamp',*/ 'Lab Ray Stamp',

            // Maraquan
            'Maractite Dagger Stamp', 'Piraket Stamp', 'Seaweed Necklace Stamp', 'Petty Crewmate Stamp', 'Maraquan Defenders Stamp',
            'Pirate Attack Stamp', /*'Goregas Stamp',*/ 'The Black Pawkeet Stamp', //'Scurvy Island Stamp', 'New Maraqua Stamp',
            'Pirate Troops Stamp', 'Maraquan Troops Stamp', /*'Chasm Beast Stamp', 'The Drenched Stamp', 'Maraquan Charger Stamp',
            'Maraquan Blade Specialist Stamp', 'Garin To The Rescue Stamp', 'Caylis Stamp', 'Swordsmaster Talek Stamp', 'The Revenge Stamp',
            'Jacques Stamp', 'Garin Stamp', 'Isca Stamp',*/ 'Captain Scarblade Stamp', //'King Kelpbeard Stamp',

            // Altador
            'Siyana Stamp', 'First Edition Altador Petpet Stamp', 'Fauna Stamp', 'Jerdana Stamp', 'The Wave Stamp',
            'Marak Stamp', 'Altadorian Farmer Stamp', 'Gordos Stamp', 'Psellia Stamp', 'Second Edition Altador Petpet Stamp',
            'Perfectly Flat Rock Stamp', /*'Kelland Stamp',*/ 'Altador Food Stamp', /*'Florin Stamp', 'Astronomy Club Stamp',
            'Finneus Stamp', 'Altador Magic Stamp', 'The Sleeper Constellation Stamp', 'Torakor Stamp',*/ 'Angry Janitor Stamp',
            'Darkest Faerie Stamp', /*'Sasha Stamp',*/ 'King Altador Stamp',

            // Shenkuu
            'Shenkuu City Stamp', 'Kentari Stamp', 'Negg Noodles Stamp', 'Linae Stamp', 'Shenkuu Lunar Temple Stamp',
            'Orange Draik Stamp', 'Captain Tuan Stamp', 'Anshu Stamp', 'Enchanted Pudao Stamp', 'Kazeriu Stamp',
            'Bonju Stamp', 'Pineapple Dessert Stamp', 'Cyodrakes Gaze Logo Stamp', /*'Kou-Jong Tile Stamp', 'Kentari Spyglass Stamp',
            'Hoban Stamp', 'Thoughtful Linae Stamp', 'Orrin Stamp', 'Shumi Telescope Stamp', 'Biyako Stamp',
            'The Cyodrakes Gaze Stamp', 'Anshu Fishing Stamp', 'Wise Gnorbu Stamp', 'Quilin Stamp', 'Shenkuu Stamp',*/

            // Other II
            'Veggie Pizza Stamp', 'Plesio Stamp', 'Hannah Stamp', 'Shenkuu Draik Stamp',
            'Mutant Techo Plushie Stamp', 'Fruit Bomb Stamp', 'Underwater Chef Stamp',
            'Halloween Ona Stamp', //'Tasu Stamp',
            'Plushie Slorg Stamp', //'Charms Stamp', 'Shenkuu Helmet Stamp',
            'Geraptiku Stamp',

            // Faerieland
            'Library Faerie Stamp', 'Captain of Fyoras Guards Stamp', 'Healing Springs Stamp', 'Faerie Techo Plushie Stamp',
            'Delina Stamp', 'Ruins of Faerieland Stamp', 'Faerieland Petpet Shopkeeper Stamp', 'Faerie City Stamp', 'Faerieland Justice Stamp',
            'Snowglobe Faerie Stamp', 'Faerie Foods Stamp', 'Faerie Furniture Shopkeeper Stamp', /*'Hubrid Nox Commemorative Stamp',*/ 'Fountain Faerie Stamp',
            /*'Fyora Faerie Doll Stamp',*/ 'Destruction of Faerieland Stamp', 'Dark Faerie Stamp', /*'Faerie Slorg Stamp', 'Fyoras Castle Stamp',
            'Aethia Stamp',*/ 'Jhudoras Cloud Stamp', //'Queen Fyora Stamp',

            // Moltara
            'Entrance to Moltara Stamp', 'The Arcanium Stamp',
            'Magma Pool Stamp', 'Magma Pool Guard Stamp', 'Molten Morsels Stamp',
            /*'Mayor of Moltara Stamp',
            'Cogs Togs Stamp', 'Tangor Stamp',*/ 'Moltara Town Hall Stamp',
            /*'Lampwyck Stamp', 'Igneots Cavern Stamp',*/ 'Lava Monster Stamp', //'Igneot Stamp',

            // Qasala
            'Words of Antiquity Stamp', 'Qasalan Delights Stamp', 'Ancient Contract Stamp',
            'Qasalan Coffee Set Stamp', 'Qasalan Tablet Stamp', 'Trapped Tomos Stamp',
            'Ruins of Qasala Stamp', /*'Qasalan Mummy Stamp',*/ 'Scorchio Mummy Stamp', 'Desert Arms Stamp',
            /*'Lupe Shopkeeper Stamp', 'Razul Stamp', 'Dark Qasala Stamp', 'Scordrax Stamp',
            'Tomos Stamp', 'Nabile Stamp', 'Nightsteed Stamp', 'King Jazan Stamp',*/

            // Krawk Island
            'Krawk Island Governor Stamp', 'Riches of Krawk Island Stamp', 'Mellow Marauders Plushie Stamp', 'Drooling Quadrapus Stamp', 'Petpet Cannonball Stamp',
            /*'Captain Bloodhook Stamp',*/ 'The Lighthouse Stamp', /*'Buried Treasure Stamp',*/ 'Bug Eye McGee Stamp', 'Docked Ship Stamp',
            'Smugglers Cove Stamp', 'Dubloon-O-Matic Stamp',
            /*'Dorak Stamp', 'The Krawken Stamp', 'The Academy Stamp', 'Forgotten Shore Stamp',
            'Capn Threelegs Stamp', 'Golden Dubloon Stamp', 'Grimtooth Stamp',*/

            // Neovia
            'Young Sophie Stamp', 'Rusty Door Stamp', 'Crumpetmonger Stamp', 'Neovia Stamp',
            'Guard Zomutt Stamp', 'Bruno Stamp', 'Family Portrait Stamp',
            'Spirit of Slumber Stamp',
            //'Sentient Headstones Stamp', 'RIP Lucy Stamp', 'Mr. Krawley Stamp', 'Dark Ilere Stamp',

            // Other III
            'Battle Eyrie Stamp', 'Hanso Stamp', /*'Usuki Doll Stamp',*/ 'Ruler of the Five Seas Stamp',
            'Bringer of Night Stamp', 'Lady Frostbite Stamp',
            'Yiko Stamp',

            // Tyrannia II
            'Yes-Boy Ice Cream Stamp', /*'Singed Tyrannian Volcano Stamp',
            'Tyrannian Victory Day Stamp', 'Wheel of Monotony Stamp',*/

            // Snowy Valley II
            'Snowball Fight Stamp', 'Sliding Darblat Stamp',
            //'Cybunny on a Cycle Stamp',

            // Other IV
            'Tuskaninny Day Stamp', 'Peaceful Coexistence Stamp', /*'Cancelled Stamp',
            'Christmas Fir Stamp',*/

            // Faerieland II
            'Jhudora Stamp',
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