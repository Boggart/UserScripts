// ==UserScript==
// @name        Github Commit Whitespace
// @namespace   https://github.com/jerone/UserScripts
// @description Adds button to hide whitespaces from commit
// @author      jerone
// @homepageUrl https://github.com/jerone/UserScripts
// @homepage    https://github.com/jerone/UserScripts/tree/master/Github_Commit_Whitespace
// @homepageURL https://github.com/jerone/UserScripts/tree/master/Github_Commit_Whitespace
// @downloadURL https://github.com/jerone/UserScripts/raw/master/Github_Commit_Whitespace/Github_Commit_Whitespace.user.js
// @include     https://github.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

// use case: https://github.com/OpenUserJs/OpenUserJS.org/commit/64530e854874433c76a584b90b14196522ef54a8

(function() {

	function addButton() {
		var e;
		if (!(/\/commit\//.test(location.href) || /\/compare\//.test(location.href)) ||
			!(e = document.querySelector(".explain"))) return;

		var r = e.querySelector(".GithubCommitWhitespaceButton");
		if (r) r.parentElement.removeChild(r);

		var on = /w=/.test(location.search);

		var b = e.querySelector(".minibutton");

		var s = document.createElement("span");
		s.textContent = " \u2423";
		s.style.color = "#333";  // set color because of css selector `p.explain .octicon`;

		var a = document.createElement("a");
		a.classList.add("GithubCommitWhitespaceButton", "minibutton", "tooltipped", "tooltipped-s");
		if (on) a.classList.add("selected");
		a.setAttribute("href", on ? location.href.replace(location.search, "") : location.href + "?w=1");
		a.setAttribute("title", on ? "Show commit whitespace" : "Hide commit whitespaces");
		a.setAttribute("rel", "nofollow");
		a.setAttribute("aria-label", a.getAttribute("title"));
		a.style.marginLeft = "10px";  // give us some room;
		a.appendChild(s);

		b.parentNode.insertBefore(a, b);
	}

	// init;
	addButton();

	// on pjax;
	$(document).on("pjax:success", addButton);

})();