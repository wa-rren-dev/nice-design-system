/*eslint-env browser*/

import pluginizr from "../../javascripts/pluginizr";

/**
 * Applies scroll rotation to any tags marked with data-superimportant-ultra
 * @export
 * @class SuperImportant
 */
export default class SuperImportant {
	/**
	 * Creates an instance of SuperImportant.
	 * @param {HTMLElement} element
	 * @param {object} options
	 * @memberof SuperImportant
	 */
	constructor(element, options) {
		// if no node dom has been passed in, error
		if (!element) throw new Error("Element must be non-null");

		// make it a jQ selection
		this.$el = $(element);

		// set up an initially empty object so it exists to check hasOwnProperty - is this a bit hacky?
		this.options = Object.assign({}, options);

		// if it is set to ultra
		if (this.options.ultra) {
			// when the window scrolls, spin the element by the scroll position
			// $(window).on("scroll", this._scrollSpin(this.$el));
			$(window)
				.on("scroll.superimportant", $.proxy(this._handleScroll, this));
		} else {
			return;
		}
	}

	/**
	 * Handle the window scroll event
	 * @function
	 * @memberof SuperImportant
	 */
	_handleScroll() {
		this._applySpinStyling(this._calculateDegrees(window.scrollY));
	}

	/**
	 * Apply the spin styling to the element
	 * @function
	 * @argument number degrees
	 * @memberof SuperImportant
	 */
	_applySpinStyling(degrees) {
		// apply the styles
		this.$el.css(this._getStyles(degrees));
	}

	/**
	 * Create the styling to be applied to the element
	 * @param {number} degrees
	 * @returns {object}
	 * @memberof SuperImportant
	 */
	_getStyles(degrees) {
		return {
			display: "inline-block",
			transform: `rotate(${ degrees }deg)`
		};
	}

	/**
	 * Calculate spin rotation that's always between 0 & 359
	 * @function
	 * @returns {number} Calculated rotation
	 * @memberof SuperImportant
	 */
	_calculateDegrees(scroll) {
		return scroll % 360;
	}
}

pluginizr("superimportant", SuperImportant);
