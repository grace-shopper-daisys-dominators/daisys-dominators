const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    beforeEach(() => {
      return Product.create({
        name: 'Cat Wine',
        color: 'red',
        description: 'Wine for cats!',
        price: 4000
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Cat Wine')
    })

    // This test is cancelled....

    //   describe("PUT /api/products", () => {

    //     it("fails if user is not admin", async () => {
    //        await request(app)
    //       .put("/api/products/1", {description: "Meow!"})
    //       .set("Cookie", ['user.dataValues.isAdmin=false'])
    //       .expect(500)

    //       const res = await request(app)
    //       .get('/api/products')
    //       .expect(200)

    //       console.log(res.body)

    //       expect(res.body[0].description).to.be.equal("Wine for cats!")
    //     })

    //   })
  })
})
