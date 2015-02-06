/**
 * Shrimp Paste
 * ------------
 * This is the plain javascript variant, if you are using jQuery and want to
 * support older browsers, use the jquery variant!
 */

 function shrimppasteclass() {

	'use strict';

	var self = this;

	this.steps = {}

	this.createNav = function(type, parent) {
		var button = document.createElement('a');
		button.setAttribute('href', '#');
		button.classList.add('ShrimpPaste-button');
		button.classList.add('ShrimpPaste-button--'+type);
		button.classList.add('js-'+type);
		button.textContent = type;
		return button;
	}

	this.setAllNavActive = function(sliderEl) {
		sliderEl.querySelector('.js-next').classList.remove('ShrimpPaste-button--inActive');
		sliderEl.querySelector('.js-prev').classList.remove('ShrimpPaste-button--inActive');
	}

	this.setNavInactive =  function(event) {
		var button = event.target;
		button.classList.add('ShrimpPaste-button--inActive');
	}

	this.handleSlideClick = function(event, direction, parent) {
		event.preventDefault();

		self.setAllNavActive(parent);

		if(direction === 'prev') {
			// Check if current step is possible
			if((self.steps.current + self.steps.width) <= 0){
				self.steps.current = self.steps.current + self.steps.width;

				// Check if *next* step is even possible
				if((self.steps.current + self.steps.width) > 0){
					self.setNavInactive(event);
				}
			}
			else {
				// Current step not possible, keep button inactive
				self.setNavInactive(event);
			}
		}
		else {
			// Check if current step is possible
			if(self.steps.current - self.steps.width >= -1 * self.steps.max){
				self.steps.current = self.steps.current - self.steps.width;

				// Check if *next* step is even possible
				if(self.steps.current - self.steps.width <= -1 * self.steps.max){
					self.setNavInactive(event);
				}
			}
			else {
				// Current step not possible, keep button inactive
				self.setNavInactive(event);
			}
		}

		var slidesWrap = parent.querySelector('.js-shrimppaste-wrap');
		slidesWrap.style.transform = 'translateX('+self.steps.current+'px)';
	}

	this.build = function (sliderEl, opts) {
		var slidesViewport = sliderEl.querySelector('.js-shrimppaste-viewport');
		var maxWidth = Math.round(slidesViewport.offsetWidth);
		var slideWidth = Math.round(maxWidth / opts.slides);
		var slides = sliderEl.querySelectorAll('.js-shrimppaste-item');
		var totWidth = Math.round(slideWidth * slides.length);
		var slidesWrap = sliderEl.querySelector('.js-shrimppaste-wrap');

		slidesWrap.style.width = totWidth.toString() + 'px';
		sliderEl.classList.add('is-active');
		self.steps.width = slideWidth;
		self.steps.max = totWidth - maxWidth;
		self.steps.current = 0;

		if(self.steps.max > slideWidth) {
			var prevButton = self.createNav('prev',sliderEl);
			var nextButton = self.createNav('next',sliderEl);
			sliderEl.appendChild(prevButton);
			sliderEl.appendChild(nextButton);

			prevButton.classList.add('ShrimpPaste-button--inActive');

			nextButton.addEventListener('click', function(event){ self.handleSlideClick(event, 'next', sliderEl); }, false);
			prevButton.addEventListener('click', function(event){ self.handleSlideClick(event, 'prev', sliderEl); }, false);
		}

		for(var i = 0; i < slides.length; i++) {
			slides[i].style.width = slideWidth.toString() +'px';
		}
	}

};

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
			// If feature test returns false: you might consider using the jQuery variant
			return false;
		}
	}

	shrimppaste.init = function (opts) {
		if(shrimppaste.cutsMustard()) {
			var sliders = document.querySelectorAll('.js-shrimppaste');
			for(var i = 0; i < sliders.length; i++) {
				var shrimppasteinstance = new shrimppasteclass();
				shrimppasteinstance.build(sliders[i], opts);
			}
		}
	}

	return shrimppaste;

})(window, document);
