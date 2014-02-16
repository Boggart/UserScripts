// ==UserScript==
// @name         Github Pull Request From Link
// @namespace    https://github.com/jerone/UserScripts
// @description  Make pull request original branch linkable
// @author       jerone
// @homepageUrl  https://github.com/jerone/UserScripts
// @include      *://github.com/*/*/pull/*
// @version      8
// @grant        none
// @contribution Changes based on Firefox extension https://github.com/diegocr/GitHubExtIns by https://github.com/diegocr
// ==/UserScript==
(function(){
    var targetTreeSpan = document.querySelectorAll('span.commit-ref.current-branch.css-truncate.js-selectable-text.expandable')[1],
        branchTree = targetTreeSpan.textContent.trim().split(':'),
        userTree = branchTree.shift(),
        urlTree = [
            '//github.com',
            userTree,
            document.querySelector('.js-current-repository').textContent,
            'tree',
            branchTree.join(':')
        ].join('/'),
        targetTreeA = document.createElement('a');
    targetTreeA.setAttribute('href', urlTree);
    targetTreeA.innerHTML = targetTreeSpan.innerHTML;
    targetTreeSpan.innerHTML = '';
    targetTreeSpan.appendChild(targetTreeA);
})();