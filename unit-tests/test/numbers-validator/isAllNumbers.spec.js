const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isAllNumbers in array positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  it('should return true if all are numbers', () => {
    const arrayChecked = validator.isAllNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(arrayChecked).to.equal(true);
  });
  it('should return error if it is not an array', () => {
    expect(() => {
      validator.isAllNumbers('no matching');
    }).to.throw('[no matching] is not an array');
  });
});
