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
    name: 'Robert Mondavi Winery The Reserve Cabernet Sauvignon',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/o/mondavi_res_cab_15_750.png',
    color: 'RED',
    region: 'United States, California',
    price: 45.0,
    size: 750,
    description:
      'Composed of 92% Cabernet Sauvignon, 4% Merlot, 2% Petit Verdot and 2% Cabernet Franc, the 2015 Cabernet Sauvignon To Kalon Reserve features a deep garnet-purple color and wonderfully expressive nose of crème de cassis, preserved plums and black forest cake with hints of cigar boxes, aniseed, dark chocolate and forest floor. Full-bodied, rich and concentrated in the mouth, the ripe, opulent black fruit is well supported by velvety tannins and plenty of freshness, finishing long and spicy.',
    year: 2014,
    rating: 4
  },
  {
    name: 'Kapcsándy Family Winery Estate Cuvée - Cabernet Sauvignon',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/k/a/kapcsandy_est_cuvee_cab_mv_750.png',
    color: 'RED',
    region: 'United States, California',
    price: 39.0,
    size: 750,
    description:
      'Moving to the 2015s, the 2015 Estate Cuvee State Lane Vineyard is the Margaux of the lineup with its perfumed floral, spice-box, black cherry and currant-driven aromas and flavors. It has an understated elegance, full-bodied richness, a beautiful sweetness of fruit, and a supple, sexy texture that makes it already impossible to resist. Showing a kiss of oak on the finish, give bottle 3–4 years and enjoy over the following two decades.',
    year: 2015,
    rating: 4
  },
  {
    name: 'Robert Mondavi Winery Cabernet Sauvignon Reserve',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/o/mondavi_res_cab_13_750.png',
    color: 'RED',
    region: 'United States, California',
    price: 45.0,
    size: 750,
    description:
      'Intensity, muscle and concentration define our Reserve vineyard- designated wine from Napa Valley’s grand cru site, To Kalon. A complex blend of fresh blackberry, wild berry compote, cassis, dark cocoa powder, forest floor, all-spice, and sweet vanilla, with balancing acidity, make this a perfect Anniversary wine.',
    year: 2015,
    rating: 5
  },
  {
    name: 'Marciano Estate Cabernet Sauvignon',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/a/marciano_estate_cab_750.jpg',
    color: 'RED',
    region: 'United States, California',
    price: 80.0,
    size: 750,
    description:
      'From the small block of iron-rich soil that forms the core of the Marciano Estate Cabernet Sauvignon, the 2016 vintage produced a distinctive wine with impressive power, depth and purity. Estate Cabernet Franc adds further luxuriance to the wine. The Enticing flavors of cherry and cassis complement layered notes of vanilla bean, mocha and blonde tobacco. polished tannins and supple texture frame the wine’s sustained and graceful finish.',
    year: 2016,
    rating: 4
  },
  {
    name: 'Le Stanze del Poliziano',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/400a650acef16caf799ce948294c4e36/p/o/poliziano_le_stanze_mv_750.png',
    color: 'RED',
    region: 'Italy, Tuscany',
    price: 56.0,
    size: 750,
    description:
      'Poliziano’s 2016 Le Stanze, 90% Cabernet and 10% Merlot, is plump, juicy and exuberant. Dark cherry, chocolate, leather, spice and menthol fill out the wine’s ample frame effortlessly. There is plenty to enjoy in this racy, flamboyant red from Poliziano.',
    year: 2017,
    rating: 5
  },
  {
    name: 'Ornellaia',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/o/r/ornellaia_13mv_750.png',
    color: 'RED',
    region: 'Italy,Tuscany',
    price: 87.0,
    size: 750,
    description:
      'Like people of great ‘Carisma’ (Charisma), wines of great vintages know how to impose themselves naturally, without force, their balance allowing them to shine without having to flaunt themselves. The 2015 vintage perfectly expresses this behavioural trait. Born during a particularly balanced harvest season, 2015 is certainly one of the great Ornellaia vintages. The usual intense colour indicates a wine of great texture and intensity, followed by a fruity scent that is ripe and fresh at the same time, emphasized by classic balsamic and spicy hints. On the palate it is rich, dense, and full-bodied, with an exceptional tannic texture, dense and velvety, of great refinement, that extends throughout the mouth. The long finish concludes with a feeling of firmness and finely spiced hints.',
    year: 2017,
    rating: 4
  },
  {
    name: 'Cafaggio Basilica del Cortaccio',
    imageURL: '',
    color: 'RED',
    region: 'Italy, Tuscany',
    price: 69.0,
    size: 750,
    description:
      'Cedary and woodsy notes lead off as this red settles into plum, leather and tobacco flavors, though it is still firmly structured and dry on the finish, with a lightly astringent feel. Sweet fruit returns in the end. Best from 2019 through 2032. 2,000 cases made.',
    year: 2014,
    rating: 4
  },
  {
    name: 'Cuvée Papale Châteauneuf-du-Pape',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/c/u/cuvee_papale_cdp_09_750.png',
    color: 'RED',
    region: 'France, Rhone',
    price: 30.0,
    size: 750,
    description:
      'This bargain-priced Châteauneuf is comprised of 60% Grenache and 40% Syrah. Deep ruby in color. Aromas of ripe cherry and dark berries. Fleshy and full on the palate, offering sweet blueberry and cherry compote flavors balanced by juicy acidity. Finishes smooth with supple tannins along with a lengthy finish. Serve with rack of lamb and roasted rosemary potatoes.',
    year: 2014,
    rating: 5
  },
  {
    name: 'Ardente Estate Winery Select Reserve Cabernet Sauvignon',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/a/r/ardente_reserve_cab_12mv_750.png',
    color: 'RED',
    region: 'United States, California',
    price: 34.0,
    size: 750,
    description:
      'The wines of Atlas Peak are very inky dark wines, big, bold, brawny and full of fruit with firm tannins. After being in the bottle for five years, the wine is now ready to drink. There are rich ripe flavors and aromas of blackberries, black cherries and currants. Considering its mountain origins, it should slowly develop additional bottle complexity over the next several years. Serve this wine with a thick, juicy rib eye steak.',
    year: 2011,
    rating: 3
  },
  {
    name: 'Château Peyrabon Haut-Médoc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/c/h/ch_peyrabon_10_750.png',
    color: 'RED',
    region: 'France, Bordeaux',
    price: 35.0,
    size: 750,
    description:
      'Light loam and charcoal shadings line a core of plum skin and macerated blackberry fruit. A loamy edge lends a slightly chewy twinge to the finish. This has put on a bit of weight since the barrel tasting. Drink now through 2017. 12,830 cases made.',
    year: 2017,
    rating: 4
  },
  {
    name: 'Grgich Hills Estate Chardonnay',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/g/r/grgich_hills_chard_14mv_750.png',
    color: 'WHITE',
    region: 'United States, California',
    price: 39.0,
    size: 750,
    description:
      'The 2016 Chardonnay reveals intense white peach, pear tart and pineapple scents with touches of honeysuckle, struck flint, pie crust and honeycomb. Medium-bodied with fantastic tension and loads of citrus and tropical layers, it has a satiny texture and finishes with great length.',
    year: 2016,
    rating: 4
  },
  {
    name: 'Cloudy Bay Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/c/l/cloudy_bay_sblanc_16mv_750.png',
    color: 'WHITE',
    region: 'New Zealand, South Island',
    price: 49.0,
    size: 750,
    description:
      'In another tricky vintage, the team at Cloudy Bay has turned out one of their best recent efforts. The 2018 Sauvignon Blanc boasts notes of gooseberries and pineapple up front, and shows lovely harmony and roundness on the palate. It’s medium-bodied and easy to drink, with hints of nectarine and pink grapefruit joining in on the creamy-textured palate and long, silky finish.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Excelsior Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/e/x/excelsior_sblanc_13mv_750.png',
    color: 'WHITE',
    region: 'South Africa, Western Cape',
    price: 49.0,
    size: 750,
    description:
      'This vibrant Sauvignon Blanc begins with enticing aromas of lemongrass, lychee, passionfruit, melon and pineapple, followed by hints of white nectarine and lime. On the juicy palate, a subtle viscosity is perfectly balanced by refreshing acidity that adds precision to the citrus and tropical fruit flavors, while driving the wine to a bright, zesty finish.',
    year: 2016,
    rating: 4
  },
  {
    name: 'Robert Mondavi Private Selection Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/n/mnd_ps_sblanc_15mv_750.png',
    color: 'WHITE',
    region: 'United States, California',
    price: 38.0,
    size: 750,
    description:
      'The 2016 vintage in California was remarkable for its ideal conditions and the The Seventy Five Wine Company Sauvignon Blanc is a great example of the vintage. The Wine offers both delicacy and intensity. It is a vibrant wine with aromas of honey suckle, lemon verbena and orange blossoms. It is fresh and lively in the mouth, with Asian pear, red apple, and early season peach flavors.',
    year: 2016,
    rating: 4
  },
  {
    name: 'Marimar Estate La Masía Chardonnay',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/a/marimar_masia_chard_09_750.png',
    color: 'WHITE',
    region: 'United States, California',
    price: 38.0,
    size: 750,
    description:
      'The intense nose is delicate and very focused, with aromas of star jasmine and white peach, nicely framed with the elegant oak that contributes notes of hazelnut. The palate is rich and savory yet crisp and mouthfilling, reminiscent of baked apple and lemon custard. The finish is long and perfectly balanced. I would recommend serving it at 46°–48° F.',
    year: 2018,
    rating: 4
  },
  {
    name: 'King Estate Willamette Valley Pinot Gris',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/k/i/king_estate_pgris_17_750.png',
    color: 'WHITE',
    region: 'United States, Oregon',
    price: 38.0,
    size: 750,
    description:
      '2017 King Estate Pinot Gris is a beautiful example from a classic Oregon vintage. This wine has a pale straw color with glistening edges. Fresh fruit aromas of ripe pear and lime zest are followed by pleasant honeysuckle notes. On the palate, there are lively flavors of nectarine, ripe pear and fresh cut pineapple, highlighted by violet tinges. This is a rich, viscous Pinot Gris, with a striking balance of ripe fruit and fresh acidity. Enjoy now and until 2028.',
    year: 2015,
    rating: 4
  },
  {
    name: 'La Forge Estate Chardonnay',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/l/a/la_forge_estate_chard_14_750.png',
    color: 'WHITE',
    region: 'France, Vin de Pays',
    price: 68.0,
    size: 750,
    description:
      'This lighter style Chardonnay begins with bright aromas of sweet lime and pears with a touch of baking spice. Refined fruit flavors are accentuated by ample acidity that gives way to subtle hints of butter, caramel and vanilla.',
    year: 2017,
    rating: 4
  },
  {
    name: 'Oyster Bay Marlborough Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/o/y/oyster_bay_sblanc_750.png',
    color: 'WHITE',
    region: 'New Zealand, South Island',
    price: 37.0,
    size: 750,
    description:
      'Crisp and light, this mouthwatering, balanced white offers green apple, grapefruit and lemon notes, with a hint of freshly grated ginger on the finish. Drink now. 10,000 cases made, 10,000 cases imported.',
    year: 2015,
    rating: 5
  },
  {
    name: 'Whitehaven Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/w/h/whitehaven_sblanc_12_750.png',
    color: 'WHITE',
    region: 'New Zealand, South Island',
    price: 37.0,
    size: 750,
    description:
      'After an initial burst of tropical fruit subsides, the 2018 Sauvignon Blanc reveals more sedate notes of nectarine, snow peas and grapefruit. It’s medium-bodied and easy-drinking, softening and fading on the finish. Drink it over the next 6–9 months.',
    year: 2018,
    rating: 4
  },
  {
    name: 'Loveblock Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/l/o/loveblock_sblanc_mv_750.png',
    color: 'WHITE',
    region: 'New Zealand, South Island',
    price: 41.0,
    size: 750,
    description:
      'Pungent, crushed tomato stalk aromas punctuate the nose of Loveblock’s 2018 Sauvignon Blanc. There are some tropical-fruit notes as well, and perhaps a few grams of residual sugar to help round out the medium-bodied palate and enrich the mouthfeel. Like most of the slightly fragile wines from the 2018 vintage, it should be consumed over the next 6–9 months.',
    year: 2018,
    rating: 4
  },
  {
    name: 'Prodigo Sauvignon Blanc',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/p/r/prodigo_sblanc_14mv_750.png',
    color: 'WHITE',
    region: 'Italy, Friuli-Venezia Giulia',
    price: 51.0,
    size: 750,
    description:
      'A fresh aromatic Sauvignon Blanc from, of all places, Italy. This wine is light, bright, and lively on the palate. It is juicy, bursting with peachy and citrusy goodness. This is pool wine, boat wine, picnic wine. An all-encompassing summer white wine.',
    year: 2017,
    rating: 3
  },
  {
    name: 'Marimar Estate La Masía Chardonnay',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/a/marimar_masia_chard_09_750.png',
    color: 'WHITE',
    region: 'United States, California',
    price: 38.0,
    size: 750,
    description:
      'The intense nose is delicate and very focused, with aromas of star jasmine and white peach, nicely framed with the elegant oak that contributes notes of hazelnut. The palate is rich and savory yet crisp and mouthfilling, reminiscent of baked apple and lemon custard. The finish is long and perfectly balanced. I would recommend serving it at 46°–48° F.',
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
