const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isInteger number positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  it('should return true if value is integer (natural numbers, 0, negative)', () => {
    const numberChecked = validator.isInteger(-10);
    expect(numberChecked).to.equal(true);
  });
  it('should return error if value is not integer', () => {
    expect(() => {
      validator.isInteger('you are caught');
    }).to.throw('[you are caught] is not a number');
  });
});
