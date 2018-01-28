/* eslint-env node, mocha, jquery */

import { slugify, nextUniqueId } from "../../src/javascripts/utils";

describe("Utils", function() {

	describe("slugify", function() {

		it("lowercases the input", function() {
			let s = slugify("DOGBONE");

			s.should.be.eql("dogbone");
		});

		it("replaces space characters with dashes", function() {
			let s = slugify("dog bone");

			s.should.be.eql("dog-bone");
		});

		it("replaces multiple space characters with single dash", function() {
			let s = slugify("dog  bone");

			s.should.be.eql("dog-bone");
		});

		it("replaces multiple dash characters with single dash", function() {
			let s = slugify("dog--bone");

			s.should.be.eql("dog-bone");
		});

		it("replaces ampersands with the word 'and'", function() {
			let s = slugify("dog & bone");

			s.should.be.eql("dog-and-bone");
		});

		it("replaces non word characters", function() {
			let s = slugify("dog () & * bone 2");

			s.should.be.eql("dog-and-bone-2");
		});

		it("removes dashes from the start", function() {
			let s = slugify("* dog");

			s.should.be.eql("dog");
		});

		it("removes dashes from the end", function() {
			let s = slugify("dog *");

			s.should.be.eql("dog");
		});
	});

	describe("nextUniqueId", function() {

		it("prefixes with 'uid' by default", function () {
			nextUniqueId().indexOf("uid-").should.be.eql(0);
		});

		it("prefixes with the given prefix", function () {
			nextUniqueId("test").indexOf("test-").should.be.eql(0);
		});

		it("increments counter on subsequent calls", function () {
			let a = Number(nextUniqueId().match(/\d+/)[0]),
				b = Number(nextUniqueId().match(/\d+/)[0]);

			b.should.be.eql(a + 1);
		});

	});

	describe('jQuery camelCase (private method)', () => {
		it('is available as a method on the jQuery object', () => {
			$.camelCase.should.be.a("function");
		});
		it("turns a kebab-case string into a camelCase string", ()=>{
			var string = "this-is-kebab-case";
			$.camelCase(string).should.equal("thisIsKebabCase");
		})
	});

});
