/**
 * Shrimp Paste
 * ------------
 * This is the jQuery variant, supporting older broweser
 * don't need no jQuery? Try the plain version!
 */

 function shrimppasteclass() {

	'use strict';

	var self = this;

	this.steps = {}

	this.createNav = function(type, parent) {
		var button = $('<a></a>');
		button.attr('href', '#');
		button.addClass('ShrimpPaste-button');
		button.addClass('ShrimpPaste-button--'+type);
		button.addClass('js-'+type);
		button.text(type);
		return button;
	}

	this.setAllNavActive = function(sliderEl) {
		sliderEl.find('.js-next').removeClass('ShrimpPaste-button--inActive');
		sliderEl.find('.js-prev').removeClass('ShrimpPaste-button--inActive');
	}

	this.setNavInactive =  function(event) {
		var button = $(event.target);
		button.addClass('ShrimpPaste-button--inActive');
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

		var slidesWrap = parent.find('.js-shrimppaste-wrap');
		slidesWrap.css('transform', 'translateX('+self.steps.current+'px)');
	}

	this.build = function (sliderEl, opts) {
		var slidesViewport = sliderEl.find('.js-shrimppaste-viewport');
		var maxWidth = Math.round(slidesViewport.width());
		var slideWidth = Math.round(maxWidth / opts.slides);
		var slides = sliderEl.find('.js-shrimppaste-item');
		var totWidth = Math.round(slideWidth * slides.length);
		var slidesWrap = sliderEl.find('.js-shrimppaste-wrap');

		slidesWrap.css('width', totWidth.toString() + 'px');
		sliderEl.addClass('is-active');
		self.steps.width = slideWidth;
		self.steps.max = totWidth - maxWidth;
		self.steps.current = 0;

		if(self.steps.max > slideWidth) {
			var prevButton = self.createNav('prev',sliderEl);
			var nextButton = self.createNav('next',sliderEl);
			sliderEl.append(prevButton);
			sliderEl.append(nextButton);

			nextButton.on('click', function(event){ self.handleSlideClick(event, 'next', sliderEl); });
			prevButton.on('click', function(event){ self.handleSlideClick(event, 'prev', sliderEl); });
		}

		slides.each(function() {
			$(this).css('width', slideWidth.toString() +'px');
		});
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
			return false;
		}
	}

	shrimppaste.init = function (opts) {
		if(shrimppaste.cutsMustard) {
			$('.js-shrimppaste').each(function(){
				var shrimppasteinstance = new shrimppasteclass();
				shrimppasteinstance.build($(this), opts);
			});
		}
	}

	return shrimppaste;

})(window, document);

shrimppaste.init({ 'slides' : 4 });
