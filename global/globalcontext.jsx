import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const CoinSystem = ({children}) =>{

    const [Coin, setCoin] = useState(0)
    const [Cart, setCart] = useState([])

    const changeCoin = (value) =>{
        setCoin(Coin + value)
    }

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    }

    const removeFromCart = (item) => {
        setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== item.id));
    }

    const isInCart = (id) => {
        return Cart.some(item => item.id === id)
    }

    const getCart = () =>{
        return Cart
    }



    

    return (
        <GlobalContext.Provider value={{Coin,changeCoin,addToCart,removeFromCart,isInCart,getCart}}>
            {children}
        </GlobalContext.Provider>

    );

}

export default CoinSystem;