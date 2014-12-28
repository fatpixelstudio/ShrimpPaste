/**
 * Tamarind
 */

window.shrimppaste = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
		console.log('your browser meets the requirements');
	}
	else {
		console.log('your browser is kind of old. Lets serve an alternate version');
	}


})(window, document);

shrimppaste();
