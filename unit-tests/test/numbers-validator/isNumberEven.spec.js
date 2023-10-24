const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isNumberEven positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  it('should return true if a given number is even', () => {
    const numberResult = validator.isNumberEven(10);
    expect(numberResult).to.be.equal(true);
  });
  it('should return false if a given number is odd', () => {
    const numberResult = validator.isNumberEven(13);
    expect(numberResult).to.be.equal(false);
  });
  it('should return error if a given element is not a number', () => {
    expect(() => {
      validator.isNumberEven('10');
    }).to.throw('[10] is not of type "Number" it is of type "string"');
  });
});
