const {green, red} = require('chalk')
const db = require('./server/db/db')

const User = require('./server/db/models/user')
const Product = require('./server/db/models/product')
// firstName: 'Shirley',
// lastName: 'Berry',
// isAdmin: 'true',
// email: 'strawberry@gmail.com',
// password: '1234
//
const users = [
  {
    firstName: 'Shirley',
    lastName: 'Berry',
    isAdmin: true,
    email: 'strawberry@gmail.com',
    password: '1234'
  },
  {
    firstName: 'Jon',
    lastName: 'Doe',
    isAdmin: true,
    email: 'jondoe@gmail.com',
    password: '3234'
  }
]

const products = [
  {
    name: 'Shobborook Romanee Tuff',
    imageURL: 'https://www.bottleking.com/labels/B50882.png',
    color: 'red',
    region: 'Barossa Valley, Australia',
    price: 30.0,
    size: 750,
    description:
      'Shobborook Romanee Tuff is a red wine that is typically light to medium-bodied and fruit-forward. Originating from Barossa Valley,Australia, it holds a pleasant spot in the red-wine spectrum—not too dry, but certainly not sweet. This is why its a favorite the world over. Shobborook Romanee Tuff is a fascinating wine',
    year: 2014,
    rating: 5
  },
  {
    name: 'Rosenblum Cellars Rockpile Road Zinfandel',
    imageURL: 'https://www.bottleking.com/labels/B50882.png',
    color: 'red',
    region: 'Rockpile, USA',
    price: 34.0,
    size: 750,
    description:
      'Rosenblum Cellars Rockpile Road Zinfandel is a red wine that is typically light to medium-bodied and fruit-forward. Originating from Rockpile, USA, it holds a pleasant spot in the red-wine spectrum—not too dry, but certainly not sweet. This is why its a favorite the world over. Rosenblum Cellars Rockpile Road Zinfandel is a fascinating wine',
    year: 2011,
    rating: 3
  },
  {
    name: 'Domaine Laurent Habrard Crozes-Hermitage',
    imageURL: 'https://www.bottleking.com/labels/B50882.png',
    color: 'red',
    region: 'Rhone, France',
    price: 35.0,
    size: 750,
    description:
      'Domaine Laurent Habrard Crozes-Hermitage is a red wine that is typically light to medium-bodied and fruit-forward. Originating from Rhone, France, it holds a pleasant spot in the red-wine spectrum—not too dry, but certainly not sweet. This is why its a favorite the world over. Domaine Laurent Habrard Crozes-Hermitage is a fascinating wine',
    year: 2017,
    rating: 4
  },
  {
    name: 'Weingut Leitz Rudesheimer Berg Kaisersteinfels Terrassen Riesling',
    imageURL:
      'https://cdn10.bigcommerce.com/s-i53ly/products/2131/images/1641/white_wine__86383.1517846952.1280.1280.jpg?c=2',
    color: 'white',
    region: 'Rheingau, Germany',
    price: 39.0,
    size: 750,
    description:
      'Weingut Leitz Rudesheimer Berg Kaisersteinfels Terrassen Riesling is a dry, medium- to full-bodied wine with moderate acidity and alcohol. Its flavors range from apple and lemon to papaya and pineapple, and it also shows notes of vanilla when its aged with oak.',
    year: 2014,
    rating: 5
  },
  {
    name: 'Domaine Marius Delarche Pernand-Vergelesses Blanc',
    imageURL:
      'https://cdn10.bigcommerce.com/s-i53ly/products/2131/images/1641/white_wine__86383.1517846952.1280.1280.jpg?c=2',
    color: 'white',
    region: 'Cote de Beaune, France',
    price: 29.0,
    size: 750,
    description:
      'Domaine Marius Delarche Pernand-Vergelesses Blanc is a dry, medium- to full-bodied wine with moderate acidity and alcohol. Its flavors range from apple and lemon to papaya and pineapple, and it also shows notes of vanilla when its aged with oak.',
    year: 2015,
    rating: 3
  },
  {
    name: 'Biblia Chora Ovilos White Assyrtiko-Semillon',
    imageURL:
      'https://cdn10.bigcommerce.com/s-i53ly/products/2131/images/1641/white_wine__86383.1517846952.1280.1280.jpg?c=2',
    color: 'white',
    region: 'Macedonis, Greece',
    price: 38.0,
    size: 750,
    description:
      'iblia Chora Ovilos White Assyrtiko-Semillon is a dry, medium- to full-bodied wine with moderate acidity and alcohol. Its flavors range from apple and lemon to papaya and pineapple, and it also shows notes of vanilla when its aged with oak.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Domaine Comte Abbatucci Ajiaccio Faustine Vieelles Vignes Rose',
    imageURL:
      'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h1e/h66/12291739680798.png',
    color: 'rosé',
    region: 'Corsica, France',
    price: 28.0,
    size: 750,
    description:
      'Rosé is a type of wine made from red wine grapes, produced in a similar manner to red wine, but with reduced time fermenting with grape skins. This reduced skin contact gives rosé a pink hue and lighter flavor than that of red wine.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Domaine du Gros Nore Bandol Rose',
    imageURL:
      'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h1e/h66/12291739680798.png',
    color: 'rosé',
    region: 'Provence, France',
    price: 34.0,
    size: 750,
    description:
      'Rosé is a type of wine made from red wine grapes, produced in a similar manner to red wine, but with reduced time fermenting with grape skins. This reduced skin contact gives rosé a pink hue and lighter flavor than that of red wine.',
    year: 2018,
    rating: 5
  },
  {
    name: 'Chene Bleu Rose',
    imageURL:
      'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h1e/h66/12291739680798.png',
    color: 'rosé',
    region: 'IGP Vaucluse, France',
    price: 27.0,
    size: 750,
    description:
      'Rosé is a type of wine made from red wine grapes, produced in a similar manner to red wine, but with reduced time fermenting with grape skins. This reduced skin contact gives rosé a pink hue and lighter flavor than that of red wine.',
    year: 2019,
    rating: 3
  }
]
const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    console.log(green('Seeding success!'))

    /*------------------------USERS------------------------- */

    // const exampleUser = await User.create({})

    /*------------------------WINES------------------------- */

    // const exampleWine = await Wine.create({})
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
