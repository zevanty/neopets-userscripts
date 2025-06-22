// ==UserScript==
// @name         Display SDB Item Names in a Textarea
// @version      1.1.0
// @author       zevanty
// @description  Display SDB item names in a textarea. Makes it easy for copy/paste names for whatever you need to do with it.
// @include      /^https:\/\/www\.neopets\.com\/safetydeposit\.phtml/
// ==/UserScript==

(function() {
    'use strict';

    // CUSTOMIZE THESE VALUES
    const HIDE_COMMON = false;
    const HIDE_UNCOMMON = false;
    const HIDE_RARE = false;
    const HIDE_SPECIAL = false;
    const HIDE_RARITY = false;
    const HIDE_RETIRED = false;
    const HIDE_ARTIFACT = false;
    const HIDE_NEOCASH = false;

    let head = document.getElementsByTagName('head')[0];
    if (head) {
        // Slider toggle copied from various sites
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
input:where([type="checkbox"][role="switch"]) {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  color: #ccc;
  background-color: #ccc;
  font-size: inherit;
  width: 2.1em;
  height: 1.1em;
  box-sizing: content-box;
  border: 1px solid;
  border-radius: 1em;
  vertical-align: text-bottom;
  margin: auto;
  margin-left: 0.5em;
}

input:where([type="checkbox"][role="switch"])::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  box-sizing: border-box;
  width: 1em;
  height: 1em;
  margin: 0;
  border: 1px solid;
  border-radius: 50%;
  background-color: white;
}

input:where([type="checkbox"][role="switch"]):checked::before {
  left: 1em;
  background-color: #2196F3;
}
        `;
        head.appendChild(style);

    var script = document.createElement("script");

    script.type = "text/javascript";
    script.text = `
function toggleListDisplay() {
    var customSwitch = document.getElementById("CustomSwitch");
    var sdbListTextarea = document.getElementById("SDBList");

    if (customSwitch.checked == true){
        sdbListTextarea.style.display = "block";
    } else {
        sdbListTextarea.style.display = "none";
    }
}
    `;
        head.appendChild(script);

        let items = document.querySelectorAll('td.content > form > table:nth-of-type(2) > tbody > tr > td[align="left"]:nth-of-type(2) > b');
        let itemTypes = document.querySelectorAll('td.content > form > table:nth-of-type(2) > tbody > tr > td[align="left"]:nth-of-type(4) > b');
        let i = 0;
        let itemsList = '';
        items.forEach(item => {
            let itemElem = (item.innerText).match(/([^\n]+)(\n\((.+)\)\n)?/);
            let itemName = itemElem[1];
            let itemRarity = '';
            if (itemElem.length > 3 && itemElem[3]) {
                itemRarity = itemElem[3];
            }

            let itemType = itemTypes.item(i).innerText;

            if (!shouldIgnore(itemRarity) && !shouldIgnore(itemType)) {
                itemsList += itemName + '\n'
            }
            i++;
        });

        let ignoreCategoriesMsg = '';
        if (HIDE_COMMON || HIDE_UNCOMMON || HIDE_RARE || HIDE_SPECIAL || HIDE_RARITY || HIDE_RETIRED || HIDE_ARTIFACT || HIDE_NEOCASH) {
            if (HIDE_COMMON) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Common (r1-r74)';
            }
            if (HIDE_UNCOMMON) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Unommon (r75-r84)';
            }
            if (HIDE_RARE) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Rare (r85-r100)';
            }
            if (HIDE_SPECIAL) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Special (r101-r104)';
            }
            if (HIDE_RARITY) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'RARITY (r105-r179)';
            }
            if (HIDE_RETIRED) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Retired (r180)';
            }
            if (HIDE_ARTIFACT) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Artifact (r200-R250)';
            }
            if (HIDE_NEOCASH) {
                ignoreCategoriesMsg += (ignoreCategoriesMsg == '' ? '' : ', ') + 'Neocash (r500)';
            }

            ignoreCategoriesMsg = '<strong>Ignoring: </strong>' + ignoreCategoriesMsg;
}

        let sdbEndDesc = document.querySelector('td.content > hr');
        sdbEndDesc.insertAdjacentHTML('afterend',
                                      '<label><span><strong>Show SDB List?</strong></span><input id="CustomSwitch" type="checkbox" role="switch" onclick="toggleListDisplay()" /></label><br />' +
                                      '<div id="SDBList">' +
                                      ignoreCategoriesMsg +
                                      '<textarea rows="10" style="width:100%;display:block">'+itemsList+'</textarea><hr noshade="" size="1" color="#E4E4E4">' +
                                      '</div>'
        );

        function shouldIgnore(category) {
            if (category == '') {
                if (HIDE_COMMON) {
                    return true;
                }
                return false;
            }

            if (HIDE_UNCOMMON && category.match(/^uncommon$/)) {
                return true;
            }
            if (HIDE_RARE && category.match(/^(very|super|ultra)?\s?rare$/)) {
                return true;
            }
            if (HIDE_SPECIAL && category.match(/^special$/)) {
                return true;
            }
            if (HIDE_RARITY && category.match(/^(MEGA RARE|RARITY \d+)$/)) {
                return true;
            }
            if (HIDE_RETIRED && category.match(/^retired$/)) {
                return true;
            }
            if (HIDE_ARTIFACT && category.match(/^Artifact.+$/)) {
                return true;
            }
            if (HIDE_NEOCASH && category.match(/^Neocash$/)) {
                return true;
            }

            return false;
        }
    }
})();