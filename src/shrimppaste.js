/**
 * Shrimp Paste
 * ------------
 * This is the plain javascript variant, if you are using jQuery and want to
 * support older browsers, use the jquery variant!
 */

window.shrimppaste = (function (window, document, undefined) {

	'use strict';

	var shrimppaste = {
		steps : {}
	}

	// Feature Test

	shrimppaste.cutsMustard = function() {
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
			return true;
		}
		else {
			return false;
		}
	}

	shrimppaste.createNav = function(type, parent) {
		var button = document.createElement('a');
		button.setAttribute('href', '#');
		button.classList.add('ShrimpPaste-button');
		button.classList.add('ShrimpPaste-button--'+type);
		button.classList.add('js-'+type);
		button.textContent = type;
		return button;
	}

	shrimppaste.handleSlideClick = function(event, direction, parent) {
		event.preventDefault();
		if(direction === 'prev') {
			if((shrimppaste.steps.current + shrimppaste.steps.width) <= 0){
				shrimppaste.steps.current = shrimppaste.steps.current + shrimppaste.steps.width;
			}
		}
		else {
			if(shrimppaste.steps.current - shrimppaste.steps.width >= -1 * shrimppaste.steps.max){
				shrimppaste.steps.current = shrimppaste.steps.current - shrimppaste.steps.width;
			}
		}

		var slidesWrap = parent.querySelector('.js-shrimppaste-wrap');
		slidesWrap.style.transform = 'translateX('+shrimppaste.steps.current+'px)';
	}

	shrimppaste.init = function (opts) {
		if(shrimppaste.cutsMustard) {
			var sliders = document.querySelectorAll('.js-shrimppaste');
			for(var i = 0; i < sliders.length; i++) {
				shrimppaste.build(sliders[i], opts);
			}
		}
	}

	shrimppaste.build = function (sliderEl, opts) {
		var slidesViewport = sliderEl.querySelector('.js-shrimppaste-viewport');
		var maxWidth = Math.round(slidesViewport.offsetWidth);
		var slideWidth = Math.round(maxWidth / opts.slides);
		var slides = sliderEl.querySelectorAll('.js-shrimppaste-item');
		var totWidth = Math.round(slideWidth * slides.length);
		var slidesWrap = sliderEl.querySelector('.js-shrimppaste-wrap');

		// slidesViewport.style.width = slidesViewport.style.width + 1 +'px';
		slidesWrap.style.width = totWidth.toString() + 'px';
		sliderEl.classList.add('is-active');
		shrimppaste.steps.width = slideWidth;
		shrimppaste.steps.max = totWidth - maxWidth;
		shrimppaste.steps.current = 0;

		var prevButton = shrimppaste.createNav('prev',sliderEl);
		var nextButton = shrimppaste.createNav('next',sliderEl);
		sliderEl.appendChild(prevButton);
		sliderEl.appendChild(nextButton);

		nextButton.addEventListener('click', function(event){ shrimppaste.handleSlideClick(event, 'next', sliderEl); }, false);
		prevButton.addEventListener('click', function(event){ shrimppaste.handleSlideClick(event, 'prev', sliderEl); }, false);

		for(var i = 0; i < slides.length; i++) {
			slides[i].style.width = slideWidth.toString() +'px';
		}
	}

	return shrimppaste;


})(window, document);

shrimppaste.init({ 'slides' : 4 });
