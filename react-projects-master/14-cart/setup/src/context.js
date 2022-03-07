import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
}

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  const toggleAmount = (id, type) => {
    dispatch({type: 'TOGGLE_AMOUNT', payload: {id, type}})
  }

  const remove = (id) => {
    dispatch({type: 'REMOVE', payload: id})
  }

  const fetchCart = async() => {
    dispatch({type: 'LOADING'})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type: 'FETCH_DATA', payload: cart})
  }

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    dispatch({type: 'GET_TOTAL'})
  }, [state.cart])

  return <AppContext.Provider value={{
    clearCart,
    ...state,
    toggleAmount,
    remove,
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext, AppProvider}
