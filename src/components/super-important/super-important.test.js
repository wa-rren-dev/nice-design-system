/* eslint-env node, mocha, jquery */
/* global sinon */

// import superImportant from "./super-important";
import testHelpers from "../../../test/test-helpers";

describe("superImportant", function(){
	var html;
	beforeEach(function(){
		// html = testHelpers.renderComponent("super-important", {
		// 	text: "Here is some text",
		// 	ultra: true,
		// });
		$("body").html = `<strong data-superimportant="" class="super-important">super important text</strong>`;
	});

	var sandbox;

	beforeEach(function(){
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){
		sandbox.restore();
	});

	describe("jQuery integration", function(){

		it("is registered as a jquery plugin", function(){
			$.fn.superimportant.should.exist.and.be.a("function");
		});

	});
});
