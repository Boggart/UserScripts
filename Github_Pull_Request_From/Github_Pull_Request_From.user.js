// ==UserScript==
// @name        Github Pull Request From Link
// @namespace   https://github.com/jerone/UserScripts/
// @description Make pull request original branch linkable
// @author      jerone
// @copyright   2014+, jerone (http://jeroenvanwarmerdam.nl)
// @license     GNU GPLv3
// @homepage    https://github.com/jerone/UserScripts/tree/master/Github_Pull_Request_From
// @homepageURL https://github.com/jerone/UserScripts/tree/master/Github_Pull_Request_From
// @downloadURL https://github.com/jerone/UserScripts/raw/master/Github_Pull_Request_From/Github_Pull_Request_From.user.js
// @updateURL   https://github.com/jerone/UserScripts/raw/master/Github_Pull_Request_From/Github_Pull_Request_From.user.js
// @supportURL  https://github.com/jerone/UserScripts/issues
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VCYMHWQ7ZMBKW
// @version     12
// @grant       none
// @include     https://github.com/*/*
// ==/UserScript==
/* global unsafeWindow */

(function(unsafeWindow) {

	String.format = function(string) {
		var args = Array.prototype.slice.call(arguments, 1, arguments.length);
		return string.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] !== "undefined" ? args[number] : match;
		});
	};

	// init;
	function init() {
		var repo = document.querySelector(".js-current-repository").textContent;
		Array.prototype.forEach.call(document.querySelectorAll("span.commit-ref.current-branch"), function(treeSpan) {
			if (treeSpan.querySelector(".unknown-repo")) { return; }
			var tree = treeSpan.textContent.trim().split(":");
			var treeLink = document.createElement("a");
			treeLink.setAttribute("href", String.format("https://github.com/{0}/{1}/tree/{2}",
											tree.shift(),		// user;
											repo,				// repository;
											tree.join(":")));	// branch;
			treeLink.innerHTML = treeSpan.innerHTML;
			treeSpan.innerHTML = "";
			treeSpan.appendChild(treeLink);
		});
	}
	init();

	// on pjax;
	unsafeWindow.$(document).on("pjax:end", init);  // `pjax:end` also runs on history back;

})(typeof unsafeWindow !== "undefined" ? unsafeWindow : window);
