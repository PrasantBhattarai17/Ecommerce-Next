'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        const savedWishlist = localStorage.getItem('wishlist')
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist))
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id && item.type === product.type)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id && item.type === product.type
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId, productType) => {
        setCart((prevCart) => prevCart.filter(item => !(item.id === productId && item.type === productType)))
    }

    const updateQuantity = (productId, productType, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, productType)
            return
        }
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId && item.type === productType
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.find(item => item.id === product.id && item.type === product.type)
            if (exists) return prevWishlist
            return [...prevWishlist, product]
        })
    }

    const removeFromWishlist = (productId, productType) => {
        setWishlist((prevWishlist) => 
            prevWishlist.filter(item => !(item.id === productId && item.type === productType))
        )
    }

    const isInWishlist = (productId, productType) => {
        return wishlist.some(item => item.id === productId && item.type === productType)
    }

    return (
        <CartContext.Provider value={{
            cart,
            wishlist,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartItemCount,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

