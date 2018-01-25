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
 * @type {HTMLElement} element
 * @param {object} options
 * @memberof SuperImportant
 */
	constructor(element, options) {

		// if no node dom has been passed in, error
		if(!element) throw new Error ("Element must be non-null");

		// confirm the passed-in element is a jQ object
		this.$el = $(element);

		// set up an initially empty object so it exists to check hasOwnProperty
		this.options = Object.assign({}, options);

		// if it is set to ultra
		if (this.options.hasOwnProperty("ultra")) {
			// when the window scrolls, spin the element by the scroll position
			// $(window).on("scroll", this._scrollSpin(this.$el));
			$(window).on("scroll", ()=>{
				this._applySpinStyling(this.$el);
			});
		}
	}
	/**
	 * Apply the spin styling to the element
	 * @function
	 * @type {HTMLElement} $el
	 * @memberof SuperImportant
	 */
	_applySpinStyling($el){
		// set up the styles for the current spin
		const styles = {
			display: "inline-block",
			transform: `rotate(${this._calculateDegrees()}deg)`
		};
		// apply the styles
		$el.css(styles);
	}

	/**
	 * Calculate spin rotation that's always between 0 & 359
	 * @function
	 * @returns {number} Calculated rotation
	 * @memberof SuperImportant
	 */
	_calculateDegrees(){
		return window.scrollY % 359;
	}
}

pluginizr("superimportant", SuperImportant);
