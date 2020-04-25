// export const addToLocalStorage = (currProduct) => {

//   let  currCart = localStorage.getItem('cart');
//   if (isEmpty(currCart)){
//       localStorage.setItem('cart', JSON.stringify(currProduct))
//   }

// }

// {
// }
// const cart = [{id: 1}, {id: 1}, {id: 2}]

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
