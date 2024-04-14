// ==UserScript==
// @name         Redirect to Classic UI
// @version      1.0.0
// @author       zevanty
// @description  Redirect the page to use classic UI. Note that some pages require Flash for it to work.
// @include      /^https?:\/\/www\.neopets\.com\/(explore|trudys_surprise|market_plaza|market_bazaar)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/altador\/(index)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/desert\/(index|qasala|sakhmet)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/halloween\/(index|index_fair|neovia)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/faerieland\/(caverns\/)?(index|faeriecity|springs|tdmbgpop)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/island\/(haiku\/)?(index|haiku|mystichut)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/jelly\/(index|jelly)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/magma\/(index|caves)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/medieval\/(index|index_castle|index_evil|index_farm|brightvale)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/moon\/(index)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/pirates\/(index|warfwharf|anchormanagement)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/prehistoric\/(index|plateau)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/water\/(index|index_ruins|fishing)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/space\/(index|hangar|recreation)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/shenkuu\/(index)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/winter\/(index|icecaves|terrormountain|wintercelebration)\.phtml$/
// @include      /^https?:\/\/www\.neopets\.com\/worlds\/(index_geraptiku|index_kikolake|index_roo)\.phtml$/
// ==/UserScript==
(function() {
    'use strict';
    //location.href = location + "/";
    window.onload = function() {
       location.href = location + "/";
    }
})();