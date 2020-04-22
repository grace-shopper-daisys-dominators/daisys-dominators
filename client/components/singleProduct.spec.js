/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let product

  beforeEach(() => {
    product = shallow(<SingleProduct name="wine" />)
  })

  it('renders the wine name in an h1', () => {
    expect(product.find('h1').text()).to.be.equal('wine')
  })
})
