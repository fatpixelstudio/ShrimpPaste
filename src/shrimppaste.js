/**
 * ShrimpPaste minimalist Javascript lightbox
 */

var ShrimpPaste = (function () {
	var elements = {
		backdrop: null,
		openmodal: null
	};

	function whichTransitionEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		};

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
	}

	var transitionEnd = whichTransitionEvent();

	function closeModal(event) {
		event.preventDefault();

		if (elements.openmodal !== null) {
			elements.backdrop.addEventListener(transitionEnd, function endTransitionBackdropClose() {
				elements.backdrop.classList.remove('is-visible');
				elements.backdrop.classList.remove('is-hiding');
				this.removeEventListener(transitionEnd, endTransitionBackdropClose, false);
			}, false);

			elements.backdrop.classList.add('is-hiding');
		}

		if (elements.openmodal !== null) {
			elements.openmodal.addEventListener(transitionEnd, function endTransitionBackdropClose() {
				elements.openmodal.classList.remove('is-visible');
				elements.openmodal.classList.remove('is-hiding');
				this.removeEventListener(transitionEnd, endTransitionBackdropClose, false);
			}, false);

			elements.openmodal.classList.add('is-hiding');
		}
	}

	function addBackdropHandlers() {
		elements.backdrop.addEventListener('click', closeModal, false);
	}

	function addModalHandlers(modal) {
		var closebutton = modal.querySelector('.js-shrimppaste-close');
		closebutton.addEventListener('click', closeModal, false);
	}

	function showModal(event) {
		event.preventDefault();

		elements.backdrop.classList.add('is-visible');
		addBackdropHandlers();

		var link = event.target;
		if (link.classList.contains('js-shrimppaste-open') === false) {
			link = domparents.findAncestorByClass(link, 'js-shrimppaste-open');
		}
		var id = link.getAttribute('href').substr(1);
		elements.openmodal = document.getElementById(id);

		if (elements.openmodal !== null) {
			elements.openmodal.classList.add('is-visible');
			addModalHandlers(elements.openmodal);
		}
	}

	function addBackdrop() {
		elements.backdrop = document.createElement('div');
		elements.backdrop.classList.add('shrimppaste-backdrop', 'js-shrimppaste-backdrop');
		document.body.appendChild(elements.backdrop);
	}

	function init(opts) {
		var modals = document.querySelectorAll('.js-shrimppaste');
		var modalbuttons = document.querySelectorAll('.js-shrimppaste-open');

		if (modals !== null && modals.length !== 0) {
			addBackdrop();

			if (modalbuttons !== null && modalbuttons.length !== 0) {
				for (i = 0; i < modalbuttons.length; i++) {
					modalbuttons[i].addEventListener('click', showModal, false);
				}
			}
		}
	}

	/**
	 * Return public methods
	 */
	return {
		init: init
	};
})();
