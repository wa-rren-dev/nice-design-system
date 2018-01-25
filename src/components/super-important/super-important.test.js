/* eslint-env node, mocha, jquery */
/* global sinon */

import superImportant from "./super-important";
import testHelpers from "../../../test/test-helpers";

describe("superImportant", function() {
	var sandbox, html;

	before(function() {});

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	describe("jQuery integration", function() {
		// var html = testHelpers.renderComponent("super-important", {
		// 	text: "Here is some text",
		// 	ultra: true
		// });
		var $el;
		var hardcodedHTML = `<strong data-superimportant="" class="super-important ">super important text</strong>`;

		beforeEach(function(){
			$el = $(hardcodedHTML);
		});

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
});

// questions:
// why won't my renderComponent work?! (line 21)
// how is JSDOM putting the components in it's virtual page?
// what is line 40 proving?
