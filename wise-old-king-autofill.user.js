// ==UserScript==
// @name         Wise Old King Auto-fill
// @version      1.0.0
// @author       zevanty
// @description  Add button to auto-fill Wise Old King with random values.
// @include      /^https:\/\/www\.neopets\.com\/medieval\/wiseking\.phtml/
// ==/UserScript==

(function() {
    'use strict';

    let head = document.getElementsByTagName('head')[0];
    if (head) {
        var script = document.createElement("script");

        script.type = "text/javascript";
        script.text = `
function randomOptions() {
    let currSelect;
    let maxNumOptions = 1;
    let selectedOptionIndex = 0;
    let selectedOptionValue = '';

    for (let i = 1; i <= 7; i++) {
        currSelect = document.getElementById('qp'+i);
        maxNumOptions = currSelect.childElementCount;
        selectedOptionIndex = Math.floor((Math.random()*(maxNumOptions-1))+1);
        selectedOptionValue = currSelect.children.item(selectedOptionIndex).getAttribute('value');
        currSelect.value = selectedOptionValue;
        currSelect.parentElement.style.visibility = 'visible';
        currSelect.dispatchEvent(new Event('change'));
    }
};
        `;
        head.appendChild(script);

        let showHideButton = document.getElementById('show_hide');
        showHideButton.insertAdjacentHTML('afterend',
                                          '<button type="button" class="button-default__2020 button-yellow__2020" onclick="randomOptions();">Random</button>');
    }

})();