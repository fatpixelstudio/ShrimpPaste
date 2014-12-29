/**
 * Shrimp Paste
 */

window.shrimppaste = (function (window, document, undefined) {

	'use strict';

	var shrimppaste = {}

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
		console.log('your browser meets the requirements');
	}
	else {
		console.log('your browser is kind of old. Lets serve an alternate version');
	}

	shrimppaste.init = function (opts) {
		var sliders = document.querySelectorAll('.js-shrimppaste');
		for(var i = 0; i <= sliders.length; i++) {
			shrimppaste.build(sliders[i], opts);
		}
	}

	shrimppaste.build = function (sliderEl, opts) {
		var maxWidth = sliderEl.offsetWidth;
		var slideWidth = maxWidth / opts.slides;
		console.log(maxWidth, slideWidth);

		var slides = sliderEl.querySelectorAll('.js-shrimppaste-item');
		for(var i = 0; i <= slides.length; i++) {
			console.log(slides[i]);
		}
	}

	return shrimppaste;


})(window, document);

shrimppaste.init({ 'slides' : 3 });
