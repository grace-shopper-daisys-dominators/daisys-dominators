export const addToLocalStorage = currProduct => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  if (!currentCart) {
    currentCart = []
  }
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
  currentCart.forEach(product => (total += product.price))
  return total
}
