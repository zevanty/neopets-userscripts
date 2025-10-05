// ==UserScript==
// @name         Grumpy Old King Auto-fill
// @version      1.0.0
// @author       zevanty
// @description  Add buttons to auto-fill Grumpy Old King with the avatar solution or with random values.
// @include      /^https:\/\/www\.neopets\.com\/medieval\/grumpyking\.phtml/
// ==/UserScript==

(function() {
    'use strict';

    let head = document.getElementsByTagName('head')[0];
    if (head) {
        var script = document.createElement("script");

        script.type = "text/javascript";
        script.text = `
function randomOptions() {
    const QA_OPTIONS = new Map([
        ['qp', 10],
        ['ap', 8]
    ]);

    let currSelect;
    let maxNumOptions = 1;
    let selectedOptionIndex = 0;
    let selectedOptionValue = '';

    QA_OPTIONS.forEach((numOptions, optionId) => {
        for (let i = 1; i <= numOptions; i++) {
            currSelect = document.getElementById(optionId+i);
            maxNumOptions = currSelect.childElementCount;
            selectedOptionIndex = Math.floor((Math.random()*(maxNumOptions-1))+1);
            selectedOptionValue = currSelect.children.item(selectedOptionIndex).getAttribute('value');
            currSelect.value = selectedOptionValue;
            currSelect.parentElement.style.visibility = 'visible';
            currSelect.dispatchEvent(new Event('change'));
        }
    });
};

function avatarOptions() {
    const QA_OPTIONS = new Map([
        ['qp', ['What', 'do', 'you do if', '', 'fierce', 'Peophins', '', 'has eaten too much', '', 'tin of olives']],
        ['ap', ['You', 'offering', 'them a', 'tin of', '', 'what what what', '', '']]
    ]);

    let currSelect;
    QA_OPTIONS.forEach((optionValue, optionId) => {
        for (let i = 0; i < optionValue.length; i++) {
            currSelect = document.getElementById(optionId+(i+1));
            currSelect.value = optionValue[i];
            currSelect.parentElement.style.visibility = 'visible';
            currSelect.dispatchEvent(new Event('change'));
        }
    });
};
        `;
        head.appendChild(script);

        let showHideButton = document.getElementById('show_hide');
        showHideButton.insertAdjacentHTML('afterend',
                                          '<button type="button" class="button-default__2020 button-yellow__2020" onclick="randomOptions();">Random</button>' +
                                          '<button type="button" class="button-default__2020 button-yellow__2020" onclick="avatarOptions();">Avatar</button>');
    }

})();