import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'

export default function Cart() {
  const userId = localStorage.getItem("userId")
  console.log(userId)
  const [loading, setLoading] = useState(true)
  const [userProducts, setUserProducts] = useState()
  useEffect(() => {
    getCartProduct()
  }, [])
  async function getCartProduct() {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?userId=${userId}`,)
    console.log(response)
    setUserProducts(response.data.items)
    setLoading(false)
  }
  return (
    <div className='cart-container'>
      {
        loading?(
          <p>Loading...</p>
        ):(
          <div className='cart-items'>
            {
              userProducts.map((productItem)=>(
                <div className='cart-item' key={productItem._id}>
                  <h3>  Name  : {productItem.product.name}</h3>
                  <p>  Price  : {productItem.product.price}</p>
                  <p>  Stock  : {productItem.product.stock}</p>
                  <p>  Description  : {productItem.product.description}</p>
                  <p>  Category  : {productItem.product.category}</p>
                
                </div>
              ))
            }
          </div>
        )
      }

    </div>
  )
}