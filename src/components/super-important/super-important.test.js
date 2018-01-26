/* eslint-env node, mocha, jquery */
/* global sinon, should */

import SuperImportant from "./super-important";
import testHelpers from "../../../test/test-helpers";

describe("superImportant", function() {
	var sandbox,
		$el,
		html;

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
		$(window).off(".superimportant");
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

	describe("calculateDegrees", function(){

		it("returns original scroll value when scroll is less than 360", function(){
			// arrange
			var important = new SuperImportant($el);
			// act
			var degrees = important._calculateDegrees(99);
			// assert
			degrees.should.equal(99);
		});

		it("return a scroll value of less than 360 when scroll value is > 360", function(){
			// arrange
			var important = new SuperImportant($el);
			// act
			var degrees = important._calculateDegrees(361);
			// assert
			degrees.should.equal(1);
		});
	});

	describe("getStyles", function(){
		it("returns an object with a rotate transform of the supplied degree", () => {
			// arrange
			var important = new SuperImportant($el);
			// act
			var styles = important._getStyles(99);
			// assert
			styles.transform.should.equal("rotate(99deg)");
		});
	});

	it("handleScroll is called on window scroll event if ultra is true", function() {
		// Arrange
		let handleScroll = sandbox.spy(SuperImportant.prototype, "_handleScroll");
		new SuperImportant($el, {ultra: true});
		handleScroll.reset();
		// Act
		$(window).trigger("scroll");
		// Assert
		handleScroll.should.be.calledOnce;
	});

	it("handleScroll is not attached to window if ultra is false", function() {
		// Arrange
		should.not.exist($._data(window, "events"));
		new SuperImportant($el);
		// Act
		// Assert
		should.not.exist($._data(window, "events"));
	});



});

// questions:
// why won't my renderComponent work?! (line 21)
// how is JSDOM putting the this individual component in it's virtual page?
// what is line 40 proving?
