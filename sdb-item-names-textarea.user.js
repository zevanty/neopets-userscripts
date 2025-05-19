// ==UserScript==
// @name         Display SDB Item Names in a Textarea
// @version      1.0.0
// @author       zevanty
// @description  Display SDB item names in a textarea (display can be toggled). Useful for if you just want to copy a list of item names from the current page.
// @include      /^https:\/\/www\.neopets\.com\/safetydeposit\.phtml/
// ==/UserScript==

(function() {
    'use strict';
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
        let itemsList = '';
        items.forEach(item => {
            let itemElem = (item.innerText).match(/([^\n]+)(\n\((.+)\)\n)?/);
            let itemName = itemElem[1];
            let itemRarity = '';
            if (itemElem.length > 3 && itemElem[3]) {
                itemRarity = itemElem[3];
            }
            itemsList += itemName + '\n'

            // To-Do: Option for people to choose which rarity to display
        });

        let sdbEndDesc = document.querySelector('td.content > hr');
        sdbEndDesc.insertAdjacentHTML('afterend',
                                      '<label><span><strong>Show SDB List?</strong></span><input id="CustomSwitch" type="checkbox" role="switch" onclick="toggleListDisplay()" /></label>' +
                                      '<textarea id="SDBList" rows="10" style="width:100%;display:none">'+itemsList+'</textarea><hr noshade="" size="1" color="#E4E4E4">'
        );
    }
})();