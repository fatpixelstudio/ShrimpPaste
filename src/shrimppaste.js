/**
 * Shrimp Paste
 */

window.shrimppaste = (function (window, document, undefined) {

	'use strict';

	var shrimppaste = {
		steps : {}
	}

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
		console.log('your browser meets the requirements');
	}
	else {
		console.log('your browser is kind of old. Lets serve an alternate version');
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
			shrimppaste.steps.current = shrimppaste.steps.current + shrimppaste.steps.width;
		}
		else {
			shrimppaste.steps.current = shrimppaste.steps.current - shrimppaste.steps.width;
		}

		var slidesWrap = parent.querySelector('.js-shrimppaste-wrap');
		slidesWrap.style.transform = 'translateX('+shrimppaste.steps.current+'px)';
	}

	shrimppaste.init = function (opts) {
		var sliders = document.querySelectorAll('.js-shrimppaste');
		for(var i = 0; i < sliders.length; i++) {
			shrimppaste.build(sliders[i], opts);
		}
	}

	shrimppaste.build = function (sliderEl, opts) {
		var slidesViewport = sliderEl.querySelector('.js-shrimppaste-viewport');
		var maxWidth = slidesViewport.offsetWidth;
		var slideWidth = maxWidth / opts.slides;
		var slides = sliderEl.querySelectorAll('.js-shrimppaste-item');
		var totWidth = slideWidth * slides.length;
		var slidesWrap = sliderEl.querySelector('.js-shrimppaste-wrap');

		slidesWrap.style.width = totWidth.toString() + 'px';
		sliderEl.classList.add('is-active');
		shrimppaste.steps.width = slideWidth;
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

shrimppaste.init({ 'slides' : 3 });
