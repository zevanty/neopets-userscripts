// ==UserScript==
// @name         Additional Navigations
// @version      1.0.1
// @author       zevanty
// @description  Add additional navigations (links) to pages except to shops for performance purposes.
// @include      /^https:\/\/(www|ncmall)\.neopets\.com\//
// @exclude      /^https:\/\/www\.neopets\.com\/objects\.phtml\?(type=shop&)?obj_type=\d+(&type=shop)?$/
// @exclude      https://www.neopets.com/haggle.phtml?*
// ==/UserScript==

(function() {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .navsub-inventory-icon {
                background-image: url(https://images.neopets.com/themes/h5/common/inventory/images/inventory-chest.png);
            }
            .nav-closet-icon {
                background-image: url(https://images.neopets.com/themes/h5/basic/images/v3/customise-icon.svg);
            }
            .nav-neodeck-icon {
                /* To-Do: Find a better better icon than the one from profile page */
                background-image: url(https://images.neopets.com/icons/ul/ul_neodeck.gif);
            }
        `
        let newUI = document.querySelector('div.navsub-right__2020');
        let oldUI = document.querySelector('div#header');
        if (newUI) {
            head.appendChild(style);

            inventoryNewSubNav();
            quickrefNewProfileNav();
            closetNewProfileNav();
            neodeckNewProfileNav();
        }
        else if (oldUI) {
            questlogOldNav();
            currentPlotOldNav();
            quickStockOldSubNav()
            galleryOldSubNav()
        }

        /**
         * New UI: Add a quick link to Inventory in the left sub-navigation menu.
         */
        function inventoryNewSubNav() {
            // For simplicity, use the same CSS classes as the NP navigation link.

            let navInventoryTop = document.createElement('a');
            navInventoryTop.setAttribute('href', '/inventory.phtml');

            let navInventoryBlock = document.createElement('div');
            navInventoryBlock.classList.add('navsub-np-meter__2020');

            // To-Do: Figure out how to dynamically use the site theme's inventory icon instead of using the generic one.
            let navInventoryIcon = document.createElement('div');
            navInventoryIcon.classList.add('navsub-np-icon__2020', 'navsub-inventory-icon');

            let navInventoryText = document.createElement('span');
            navInventoryText.classList.add('np-text__2020');
            navInventoryText.innerHTML = 'Inventory';

            navInventoryBlock.appendChild(navInventoryIcon);
            navInventoryBlock.appendChild(navInventoryText);
            navInventoryTop.appendChild(navInventoryBlock);
            newUI.insertBefore(navInventoryTop, newUI.firstChild);
        }

        /**
         * New UI: Replace profile dropdown's "My Pets" URL with the Quick Reference URL instead
         * because the Neopets logo URL already goes to the home page.
         */
        function quickrefNewProfileNav() {
            let profilePetAnchor = document.querySelector('div#navprofiledropdown__2020 > ul > li > a');
            profilePetAnchor.setAttribute('href', '/quickref.phtml');
        }

        /**
         * New UI: Add Closet option in the profile dropdown's Inventory sectiion.
         */
        function closetNewProfileNav() {
            let profileInventoryBlock = document.querySelector('div#profileInventorySection');

            let navClosetTop = document.createElement('a');
            navClosetTop.setAttribute('href', '/closet.phtml');

            let navClosetBlock = document.createElement('li');
            navClosetBlock.classList.add('profile-dropdown-subsection');

            let navClosetIcon = document.createElement('div');
            navClosetIcon.classList.add('nav-closet-icon', 'profile-dropdown-link-icon');

            let navClosetText = document.createElement('h4');
            navClosetText.innerHTML = 'Closet';

            navClosetBlock.appendChild(navClosetIcon);
            navClosetBlock.appendChild(navClosetText);
            navClosetTop.appendChild(navClosetBlock);
            profileInventoryBlock.appendChild(navClosetTop);
        }

        /**
         * New UI: Add Neodeck option in the profile dropdown's My Albums sectiion.
         */
        function neodeckNewProfileNav() {
            let profileAlbumBlock = document.querySelector('div#profileAlbumSection');

            let navNeodeckTop = document.createElement('a');
            navNeodeckTop.setAttribute('href', '/games/neodeck/index.phtml');

            let navNeodeckBlock = document.createElement('li');
            navNeodeckBlock.classList.add('profile-dropdown-subsection');

            let navNeodeckIcon = document.createElement('div');
            navNeodeckIcon.classList.add('nav-neodeck-icon', 'profile-dropdown-link-icon');

            let navNeodeckText = document.createElement('h4');
            navNeodeckText.innerHTML = 'Neodeck';

            navNeodeckBlock.appendChild(navNeodeckIcon);
            navNeodeckBlock.appendChild(navNeodeckText);
            navNeodeckTop.appendChild(navNeodeckBlock);
            profileAlbumBlock.appendChild(navNeodeckTop);
        }

        /**
         * Old UI: Add Quest Log to the Explore dropdown
         */
        function questlogOldNav() {
            appendToExploreOldNav('Quest Log', 'questlog/');
        }

        /**
         * Old UI: Add the current plot to the Explore dropdown
         */
        function currentPlotOldNav() {
            appendToExploreOldNav('The Void Within', 'tvw/');
        }

        /**
         * Old UI: Add Quick Stock to the sub-navigation found in certain pages like shops
         */
        function quickStockOldSubNav() {
            let subNavClosetLink = document.querySelector('td.content > div.medText > a:nth-of-type(9)');
            subNavClosetLink.insertAdjacentHTML('beforebegin', '<a href=\'/quickstock.phtml\'>Quick Stock</a> | ');
        }

        /**
         * Old UI: Add Gallery to the sub-navigation found in certain pages like shops
         */
        function galleryOldSubNav() {
            let subNavClosetLink = document.querySelector('td.content > div.medText > br:nth-of-type(2)');
            subNavClosetLink.insertAdjacentHTML('beforebegin', ' | <a href=\'/gallery/index.phtml\'>Gallery</a>');
        }

        function appendToExploreOldNav(name, urlPath) {
            let urlPrefix = '/';
            let currUrl = location.toString();
            if (currUrl.startsWith('https://ncmall.neopets.com/')) {
                urlPrefix = 'https://www.neopets.com/'
            }

            let navExploreBlock = document.querySelector('ul#template_nav > li:nth-of-type(4) > ul.dropdown');

            let navCurrentPlotLink = document.createElement('a');
            navCurrentPlotLink.setAttribute('href', urlPrefix + urlPath);
            navCurrentPlotLink.innerHTML = '» ' + name;

            let navCurrentPlotBlock = document.createElement('li');

            navCurrentPlotBlock.appendChild(navCurrentPlotLink);
            navExploreBlock.appendChild(navCurrentPlotBlock);

        }

    }
})();