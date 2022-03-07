const reducer = (state, action) => {
  switch(action.type){
    case 'CLEAR_CART':
      return {...state, cart: []}

    case 'LOADING':
      return {...state, loading: true}

    case 'FETCH_DATA':
      return {...state, cart: action.payload, loading: false}

    case 'TOGGLE_AMOUNT':
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === 'inc') {
              return { ...cartItem, amount: cartItem.amount + 1 }
            }
            if (action.payload.type === 'dec') {
              return { ...cartItem, amount: cartItem.amount - 1 }
            }
          }
          return cartItem
        })
        .filter((cartItem) => cartItem.amount !== 0)
      return { ...state, cart: tempCart }

    case 'REMOVE':
      let newCart = state.cart.filter((cartItem) => cartItem.id !== action.payload)
      return {...state, cart: newCart}

    case 'GET_TOTAL':
      let {amount, total} = state.cart.reduce((cartTotal, cartItem) => {
        const {price, amount} = cartItem
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount

        return cartTotal
      }, 
      {
        total: 0,
        amount: 0,
      })
      total = parseFloat(total.toFixed(2))
      return {...state, total, amount}
  }
}

export default reducer