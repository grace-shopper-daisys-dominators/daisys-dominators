export const addToLocalStorage = currProduct => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  if (!currentCart) {
    currentCart = []
  }
  currentCart.push(currProduct)
  localStorage.setItem('cart', JSON.stringify(currentCart))
  console.log(currentCart)
}

// export const loadState = async () => {
//   try {
//     const serializedState = await localStorage.getItem('state')
//     if (serializedState === null) {
//       return undefined
//     }
//     return JSON.parse(serializedState)
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const saveState = async (state) => {
//   try {
//     const serializedState = await JSON.stringify(state)
//     localStorage.setItem('state', serializedState)
//   } catch (err) {
//     console.log(err)
//   }
// }
