import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';

const BOX_SHADOW = "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"

export default function Cards({ cartItems, setCartItems }) {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async function () {
            try {
                const result = await axios.get('https://fakestoreapi.com/products')
                if (result?.data) {
                    setProducts(result?.data)
                }
            } catch (err) {
                console.error(err);
            }
        })()
    }, [])

    function addCart(item) {
        const prevItems = localStorage.getItem('cart')
        if (prevItems) {
            const parsed = JSON.parse(prevItems)
            parsed.push(item)
            localStorage.setItem('cart', JSON.stringify(parsed))
            setCartItems(parsed)
        } else {
            localStorage.setItem('cart', JSON.stringify([item]));
            setCartItems([item])
        }
    }

    function removeCartItem(id) {
        const allCartItems = localStorage.getItem('cart')
        if (allCartItems) {
            const parsedItems = JSON.parse(allCartItems)
            const filtered = parsedItems.filter(item => item.id !== id)
            localStorage.setItem('cart', JSON.stringify(filtered))
            setCartItems(filtered)
        }
    }

    return (
        <div className='w-100' style={{ height: "100%", marginTop: "45px", overflow: "auto", background: "#F6F6F6" }}>
            {!products && <div className='d-flex flex-column align-items-center justify-content-center'>
                <div className="spinner-border" role="status"></div>
                <span className="mt-2 sr-only">Loading...</span>
            </div>}
            <div className='container-fluid d-flex justify-content-center' style={{ flexWrap: "wrap" }} >
                {products && products.map((items, index) => {
                    const isItemAvailable = cartItems?.length > 0 && (cartItems)?.filter(data => data.id === items.id)
                    return (
                        <div key={index} className="card m-2 p-2" style={{ width: "18rem", boxShadow: BOX_SHADOW }}>
                            <img src={items?.image} className="card-img-top" height={250} alt="pro-image" />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title">{items?.title}</h5>
                                <p className="card-text">{items?.category}</p>
                                <div style={{ fontWeight: 800 }} >$ {items?.price}</div>
                                <Rating readonly size={25} initialValue={items?.rating?.rate} />
                                {isItemAvailable?.length > 0 && <a href="#" className="mt-2 btn btn-primary" onClick={() => removeCartItem(items.id)}>REMOVE FROM CART</a>}
                                {(!isItemAvailable || isItemAvailable?.length === 0) && <a href="#" className="mt-2 btn btn-primary" onClick={() => addCart(items)}>ADD TO CART</a>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
