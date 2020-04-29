// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import {getSingleProduct} from './singleProduct'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'
// import {setSingleProduct} from './singleProduct'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {singleProduct: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('SINGLE PRODUCT', () => {
//     it('eventually dispatches the GET SINGLE PRODUCT action', async () => {
//       const fakeProduct = {
//         name: 'wine',
//         color: 'red',
//         imageURL:
//           'https://cdn10.bigcommerce.com/s-i53ly/products/2131/images/1641/white_wine__86383.1517846952.1280.1280.jpg?c=2',
//         price: '39.00',
//         rating: 4,
//         region: 'Macedonis, Greece',
//         size: 300,
//         year: 2019
//       }
//       mockAxios
//         .onGet(`/api/products/${fakeProduct.id}`)
//         .replyOnce(200, fakeProduct)
//       await store.dispatch(getSingleProduct())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_SINGLE_PRODUCT')
//       expect(actions[0].product).to.be.deep.equal(fakeProduct)
//     })
//   })
// })
