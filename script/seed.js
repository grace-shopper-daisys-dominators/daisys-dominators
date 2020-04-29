'use strict'

const db = require('../server/db/db')
const {User, Product, Order} = require('./server/db/models/index')

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

const orders = [
  {
    status: 'pending',
    userId: 1
  },
  {
    status: 'pending',
    userId: 2
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
    name: 'Kuleto Estate Cabernet Sauvignon',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/k/u/kuleto_cab_12_750.png',
    color: 'RED',
    region: 'United States, California',
    price: 80.0,
    size: 750,
    description:
      'The wine offers blackberries, candied fruits, and high-toned herbs on the nose and has a juiciness on the palate that is consistent with the fruit flavors and tremendous focus. The oak treatment supports but doesn’t overwhelm the flavors and provides a nice lengthy backbone through the wine. ',
    year: 2016,
    rating: 4
  },
  {
    name: 'Le Stanze del Poliziano',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/p/o/poliziano_le_stanze_mv_750.png',
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
    name: 'Basilica Cafaggio Single Estate Chianti Classico',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/c/a/cafaggio_sngl_est_chi_cls_15_750.png',
    color: 'RED',
    region: 'Italy, Tuscany',
    price: 69.0,
    size: 750,
    description:
      'This is an easy-drinking wine with a softly layered and fleshed out personality. The 2015 Chianti Classico Basilica Cafaggio Single Estate is a well-priced and easily available wine with some 110,000 bottles produced. It consists of 100% Sangiovese made with minimal oak aging. The simplicity presented here is refreshing and bright.',
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
    name: 'Champalou Vouvray Les Fondraux',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/c/h/champalou_vouvray_fondraux_15_750.png',
    color: 'WHITE',
    region: 'France, Loire',
    price: 38.0,
    size: 750,
    description:
      'At the end of a long, draining day, you deserve to relax with a glass of this silky nectar, full of lovely notes of pear, melon, and pineapple. Les Fondraux is elegant and forthcoming, just like the Champalou family, who put all their craftsmanship into making it. Slightly off-dry and very aromatic, it will partner up nicely with spicy Thai food. If you want to stay more traditional, try it with dry goat cheese, or even some bleu, as the wine will balance with the saltiness of the cheese.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Réserve des Vignerons Saumur Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/r/e/res_vignerons_saumur_rose_15_750.png',
    color: 'ROSÉ',
    region: 'France, Loire',
    price: 27.0,
    size: 750,
    description:
      'This Loire rosé is bright and crisp, yet still has a soft touch of summer fruits — think strawberries and raspberries. 100% Cabernet Franc.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Whispering Angel',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/w/h/whispering_angel_15_750.png',
    color: 'ROSÉ',
    region: 'France, Provence',
    price: 29.0,
    size: 750,
    description:
      'As a negociant and vinificateur (winery), Caves d’esclans identifies vineyards, grapes and wines from château d’esclans as well as local growers to make what has reputedly become the world’s greatest rosé. As our objective is to obtain the best quality grapes and wines, we have created relationships with the local grape growers, committed beside Caves d’esclans, whose vineyards are treated with the same high standards of quality as are the vineyards of Château d’esclans.',
    year: 2019,
    rating: 5
  },
  {
    name: 'Sheldrake Point Dry Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/s/h/sheldrake_point_dry_rose_mv_750.png',
    color: 'ROSÉ',
    region: 'United States, New York',
    price: 31.0,
    size: 750,
    description:
      'The 2019 vintage offers classic aromatics of strawberries and cream with a burst of spring flowers. The palate opens with bright acidity highlighting white cherry, and is rounded out with a pithy citrus finish.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Wild Pig Syrah Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/w/i/wild_pig_syrah_rose_16_750.png',
    color: 'ROSÉ',
    region: 'France, Vin de Pays',
    price: 27.0,
    size: 750,
    description:
      'Located in the Languedoc area, the vineyards spread from the banks of the Rhône river in the East to the city of Carcassonne in the West, from the foothills of the Massif Central mountains in the North to the Mediterranean Sea in the South. A pink colour with bright hints, a generous and fruity wine with notes of raspberries and a fresh finish.',
    year: 2018,
    rating: 3
  },
  {
    name: 'La Vieille Ferme Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/l/a/la_vieille_ferme_rose_15_750.png',
    color: 'ROSÉ',
    region: 'France, Vin de Table',
    price: 19.0,
    size: 750,
    description:
      'Pale brilliant orange. Red berries, citrus fruits and a hint of spiciness on the nose and palate. Light-bodied and racy in style; a white pepper nuance drives the finish',
    year: 2018,
    rating: 4
  },
  {
    name: 'Apothic Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/a/p/apothic_rose_17_750.png',
    color: 'ROSÉ',
    region: 'United States, California',
    price: 24.0,
    size: 750,
    description:
      'Light in color, yet dark in nature, Apothic Rosé Wine is a vibrant and alluring wine with notes of raspberry, watermelon and strawberry with a crisp, refreshing finish.',
    year: 2019,
    rating: 4
  },
  {
    name: 'Miraval Côtes de Provence Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/m/i/miraval_rose_12_750.png',
    color: 'ROSÉ',
    region: 'France, Provence',
    price: 24.0,
    size: 750,
    description:
      'Beautiful, pale, petal-pink colour, elegant with bright nuances. A beautiful aromatic expression with aromas of fresh fruit and spring flowers, refreshing acidity, with great minerality and a saline finish.',
    year: 2019,
    rating: 3
  },
  {
    name: 'Fleurs de Prairie Rosé',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/f/l/fleurs_de_prairie_17_750.png',
    color: 'ROSÉ',
    region: 'France, Provence',
    price: 27.0,
    size: 750,
    description:
      '“Fleurs de Prairie” translates as “wildflowers,” celebrating the beautiful fields of wisteria, lavender, poppy, and sunflowers carpeting Provence. The wine is sourced from select Provençal vineyards that dot the coastal wind-swept hillsides of the region. The Mediterranean combination of sun, wind, mild water stress, and ocean influence provide ideal conditions for grapes to ripen to the perfect balance of flavor and freshness. Provence produced beautiful 2016 rosés due to the year’s generally mild spring and sunny, dry summer. The continuing drought impacted yields across the board, but quality remained high.',
    year: 2016,
    rating: 4
  },
  {
    name: 'Stella Rosa Stella Pink',
    imageURL:
      'https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/s/t/stella_rosa_pink_nv_750.png',
    color: 'ROSÉ',
    region: 'Italy, Piemonte',
    price: 24.0,
    size: 750,
    description:
      'Flirty, fun, and young are the words to describe Stella Rosa Pink, the semi-sweet, semi-sparkling wine that is understated. She’s a tease on the eyes but means business on the palate.',
    year: 2019,
    rating: 3
  },
  {
    name: 'Prophecy Rosé',
    imageURL:
      ' https://www.winedeals.com/media/catalog/product/cache/24a5f9c916d5e5388bb3b7aa0cf8f62d/p/r/prophecy_rose_17_750.png',
    color: 'ROSÉ',
    region: 'France, Vin de France',
    price: 21.0,
    size: 750,
    description:
      'This wine is crisp and refreshing with layered flavors of fresh strawberry, raspberries and a hint of white peach. Pairs with poultry, seafood, grilled vegetables, light salads, goat cheese and fruit dessert.',
    year: 2019,
    rating: 4
  }
]

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

const seed = async () => {
  try {
    await db.sync({
      force: true
    })

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

    await Promise.all(
      orders.map(order => {
        return Order.create(order)
      })
    )

    console.log('Seeding success!')
  } catch (err) {
    console.log(err)
  }
}

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}

module.exports = seed
