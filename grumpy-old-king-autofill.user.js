// ==UserScript==
// @name         Grumpy Old King Auto-fill
// @version      1.0.1
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

// Temporary fix for broken submission.
// Basically copied/pasted the original code with some slight modifications.
function handleSubmitFix() {
    var kingForm = document.getElementById('process_grumpyking');
    var kingData = new URLSearchParams(new FormData(kingForm));

    const grumpyTools = document.getElementById('grumpy_tools');
    if (grumpyTools != null && grumpyTools.length != null && grumpyTools.length > 0) {
        var grumpy_devtools = new URLSearchParams(new FormData(grumpyTools));
        grumpy_devtools.forEach(function(value, key) {
            kingData.append(key, value);
        })
    }

    fetch('/np-templates/ajax/grumpyking.php', {
        method: 'POST',
        body: kingData,
    })
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('There was an error fetching grumpy king data!');
                return;
            }

            response.json().then(function (data) {
                var grumpyContainer = document.getElementById("grumpyking_container");
                grumpyContainer.innerHTML = data.message;
                grumpyContainer.style.display = "block";
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

}
        `;
        head.appendChild(script);

        let showHideButton = document.getElementById('show_hide');
        showHideButton.insertAdjacentHTML('afterend',
                                          '<button type="button" class="button-default__2020 button-yellow__2020" onclick="randomOptions();">Random</button>' +
                                          '<button type="button" class="button-default__2020 button-yellow__2020" onclick="avatarOptions();">Avatar</button>');

        // Redirect the submit button to point to the fixed method.
        let submitButton = document.getElementById('process_grumpyking');
        submitButton.setAttribute('onsubmit', 'handleSubmitFix(this); return false;');
    }

})();