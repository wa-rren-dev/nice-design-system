/* eslint-env node, mocha, jquery */
/* global sinon, should */

import SuperImportant from "./super-important";
import testHelpers from "../../../test/test-helpers";

describe.only("superImportant", function() {
	var sandbox, $el, html;

	before(function() {
		html = testHelpers.renderComponent("super-important", {
			text: "Here is some text"
		});
		$el = $(html);
	});

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
		// remove all event handlers after each pass
		$(window).off();
	});

	describe("jQuery integration", function() {
		it("is registered as a jquery plugin", function() {
			$.fn.superimportant.should.exist.and.be.a("function");
		});

		it("plugin returns element", function() {
			$el
				.superimportant()
				.should.be.an.instanceOf($)
				.and.equal($el)
				.and.have.property("length", 1);
		});
	});

	describe("calculateDegrees", function() {
		it("returns original scroll value when scroll is less than 360", function() {
			// arrange
			var important = new SuperImportant($el);
			// act
			var degrees = important._calculateDegrees(99);
			// assert
			degrees.should.equal(99);
		});

		it("return a scroll value of less than 360 when scroll value is > 360", function() {
			// arrange
			var important = new SuperImportant($el);
			// act
			var degrees = important._calculateDegrees(361);
			// assert
			degrees.should.equal(1);
		});
	});
	describe("getStyles", function() {
		it("returns an object with a rotate transform of the supplied degree", () => {
			// arrange
			var important = new SuperImportant($el);
			// act
			var styles = important._getStyles(99);
			// assert
			styles.transform.should.equal("rotate(99deg)");
		});
	});

	describe("handleScroll", function() {
		it("handleScroll is called on window scroll event if ultra is true", function() {
			// Arrange
			let handleScroll = sandbox.spy(SuperImportant.prototype, "_handleScroll");
			new SuperImportant($el, { ultra: true });
			handleScroll.reset();
			// Act
			$(window).trigger("scroll");
			// Assert
			handleScroll.should.be.calledOnce;
		});

		it("handleScroll is not attached to window if ultra is false", function() {
			// Arrange
			should.not.exist($._data(window, "events")); // there's nothing attached to the window
			new SuperImportant($el);
			// Act
			// Assert
			should.not.exist($._data(window, "events")); // there still isn't
		});
	});

	describe("ultra option is gathered if set", function() {
		it("options are empty if ultra not set", function() {
			var important = new SuperImportant($el);
			important.options.should.not.have.property("ultra");
		});

		it("options contain ultra property if set to true", function() {
			var important = new SuperImportant($el, { ultra: true });
			important.options.should.have.property("ultra", true);
		});
	});

	describe("applySpinStyling", function() {
		var element;

		before(function() {
			element = new SuperImportant($el, { ultra: true });
		});

		beforeEach(function() {
			console.log("before!", window.scrollY);
		});

		afterEach(function() {
			console.log("after!", window.scrollY);
		});

		it("applies the supplied rotation styling to the element on scroll 1", function() {
			window.scrollY = 1;
			element.$el[0].style.transform.should.equal("rotate(1deg)");
		});

		it("applies the supplied rotation styling to the element on scroll 2", function() {
			window.scrollY = 2;
			element.$el[0].style.transform.should.equal("rotate(2deg)");
		});

		// it("applies the styling to the element if scroll is > 360", function () {
		// 	new SuperImportant($el, {ultra: true});
		// 	$(window).scrollY = 360;
		// 	console.log($el[0].style.transform);
		// 	$el[0].style.transform.should.equal("rotate(0deg)");
		// });
	});
});
