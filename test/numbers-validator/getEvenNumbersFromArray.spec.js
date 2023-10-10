const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('getEvenNumbersFromArray positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  it('should return array of even numbers', () => {
    const arrayResult = validator.getEvenNumbersFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(arrayResult).to.have.members([2, 4, 6, 8, 10]);
  });
  it('should return an empty array if it is of odd numbers', () => {
    const arrayResult = validator.getEvenNumbersFromArray([1, 3, 5, 7, 9]);
    expect(arrayResult).to.deep.equal([]);
  });
  it('should return error if not every element of array is number', () => {
    expect(() => {
      validator.getEvenNumbersFromArray([1, 2, '3', 4, 5, 6, 7, 8, 9, 10]);
    }).to.throw('[1,2,3,4,5,6,7,8,9,10] is not an array of "Numbers"');
  });
});
