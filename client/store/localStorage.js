export const addToLocalStorage = currProduct => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  if (!currentCart) {
    currentCart = []
  }
  currProduct.quantity = 1

  currentCart.push(currProduct)
  localStorage.setItem('cart', JSON.stringify(currentCart))
  return currentCart
}

export const removeFromLocalStorage = currProduct => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  if (!currentCart) {
    currentCart = []
  }
  let newCart = currentCart.filter(product => product.id !== currProduct.id)
  localStorage.setItem('cart', JSON.stringify(newCart))
  return newCart
}

export const getTotal = () => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  let total = 0
  currentCart.forEach(product => {
    total += product.price * product.quantity
  })
  return total
}

export const addQuantityToLocalStorage = productId => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  currentCart.forEach(product => {
    if (product.id === productId) {
      product.quantity++
    }
  })
  localStorage.setItem('cart', JSON.stringify(currentCart))
  return currentCart
}

export const removeQuantityToLocalStorage = productId => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  let bool
  currentCart.forEach(product => {
    console.log('Product passed in ', product)
    if (product.id === productId) {
      if (product.quantity - 1 > 0) {
        product.quantity--
        bool = true
        localStorage.setItem('cart', JSON.stringify(currentCart))
      } else {
        removeFromLocalStorage({id: productId})
        // console.log("THIS!", JSON.parse(localStorage.getItem('cart')));
        bool = false
      }
    }
  })
  return bool
  // console.log("New cart -------->", currentCart)
}
