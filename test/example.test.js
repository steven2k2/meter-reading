import { expect } from 'chai'
import { describe, it } from 'mocha'
import { add } from '../src/utils.mjs' // Import function from your app

describe('Math Functions', function () {
  it('should add two numbers correctly', function () {
    const result = add(2, 3)
    expect(result).to.equal(5)
  })

  it('should return a number', function () {
    const result = add(10, 5)
    expect(result).to.be.a('number')
  })
})
