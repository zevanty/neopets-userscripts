// ==UserScript==
// @name         Additional Navigations
// @version      1.0.3
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
            quickStockOldSubNav();
            galleryOldSubNav();
            stampOldNav();
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
            let subNavClosetLink = document.querySelector('td.content div.medText > a:nth-of-type(9)');
            if (subNavClosetLink) {
                subNavClosetLink.insertAdjacentHTML('beforebegin', '<a href=\'/quickstock.phtml\'>Quick Stock</a> | ');
            }
        }

        /**
         * Old UI: Add Gallery to the sub-navigation found in certain pages like shops
         */
        function galleryOldSubNav() {
            let subNavEndOfMid = document.querySelector('td.content div.medText > br:nth-of-type(2)');
            if (subNavEndOfMid) {
                subNavEndOfMid.insertAdjacentHTML('beforebegin', ' | <a href=\'/gallery/index.phtml\'>Gallery</a>');
            }
        }

        /**
         * Old UI: Add Prev and Next buttons to the Stamp Album
         */
        function stampOldNav() {
            let currUrl = location.toString();
            if (/stamps\.phtml\?/.test(currUrl)) {
                let currPageNum = 0;

                // Get the current page number
                if (/type=album/.test(currUrl) && /page_id=\d+/.test(currUrl)) {
                    currPageNum = Number(currUrl.match(/page_id=(\d+)/)[1]);
                }
                // When accessed from user lookup or the new UI navigation, the URL to album cover is different
                else if (/stamps\.phtml\?(owner=|type=album)/.test(currUrl)) {
                    currPageNum = 0;
                }
                // Do nothing as it is not a valid album page.
                else {
                    return;
                }

                let stampPages = document.querySelectorAll('td.content > div > p:nth-of-type(3) > a');
                if (stampPages.length == 0) {
                    alert('Something is wrong. No stamp pages were found.');
                    return;
                }

                let prevPageNum = (currPageNum == 0 ? stampPages.length-1 : currPageNum-1);
                let prevPageUrl = stampPages[prevPageNum].getAttribute('href');
                let prevPageImg = 'https://images.neopets.com/images/pics_back.gif';
                let prevButton = document.createElement('td');
                prevButton.setAttribute('align','center');
                prevButton.innerHTML='<a href='+prevPageUrl+'><img src="'+prevPageImg+'" width="60" height="60" border="0"></a><br><b>Prev</b>';

                let nextPageNum = (currPageNum == stampPages.length-1 ? 0 : currPageNum+1);
                let nextPageUrl = stampPages[nextPageNum].getAttribute('href');
                let nextPageImg = 'https://images.neopets.com/images/pics_next.gif';
                let nextButton = document.createElement('td');
                nextButton.setAttribute('align','center');
                nextButton.innerHTML='<a href='+nextPageUrl+'><img src="'+nextPageImg+'" width="60" height="60" border="0"></a><br><b>Next</b>';

                if (currPageNum == 0) {
                    let albumCover = document.querySelector('div#content td.content > div > center:nth-of-type(2)');
                    let navRow = document.createElement('table');
                    navRow.setAttribute('width','450'); // The album cover is manually set to 450px, so doing the same here.
                    navRow.innerHTML='<tbody><tr>' +
                        '<td align="center" width="90"><a href="'+prevPageUrl+'"><img src="'+prevPageImg+'" width="60" height="60" border="0"></a><br><b>Prev</b></td>' +
                        '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
                        '<td align="center" width="90"><a href="'+nextPageUrl+'"><img src="'+nextPageImg+'" width="60" height="60" border="0"></a><br><b>Next</b></td>' +
                        '</tr></tbody>';

                    albumCover.insertBefore(navRow, albumCover.firstChild);
                }
                else {
                    let currPageName = document.querySelector('div#content td.content > div > table td[colspan="5"]');
                    currPageName.setAttribute('colspan','3');

                    let currPageNameRow = currPageName.parentNode;
                    currPageNameRow.insertBefore(prevButton, currPageName);
                    currPageNameRow.insertBefore(nextButton, currPageName.nextSibling);
                }
            }
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