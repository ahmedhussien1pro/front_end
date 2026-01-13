import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCart.css';
import GoBack from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const [couponCode, setCouponCode] = useState('');
  const [userCoupon, setUserCoupon] = useState('');
  const [message, setMessage] = useState('');
  const [discount, setDiscount] = useState(
    parseInt(localStorage.getItem('discount')) || 0
  );
  const [totalPrice, setTotalPrice] = useState(
    (JSON.parse(localStorage.getItem('cart')) || []).reduce(
      (sum, price) => sum + price,
      0
    ) - discount
  );

  useEffect(() => {
    axios
      .get('https://digitopia-project-backend.vercel.app/api/ShoppingCart')
      .then((response) => {
        setProducts(response.data.products);
        setCouponCode(response.data.couponCode);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const cartTotal = cart.reduce((sum, price) => sum + price, 0) - discount;
    setTotalPrice(cartTotal);
    updateTotalOnServer(cartTotal);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('discount', discount);
  }, [cart, discount]);

  const updateTotalOnServer = (updatedTotal) => {
    axios
      .post(
        'https://digitopia-project-backend.vercel.app/api/ShoppingCart/price',
        {
          totalPrice: updatedTotal,
        }
      )
      .catch((error) => console.error('Error updating total:', error));
  };

  const addToCart = (price) => {
    const updatedCart = [...cart, price];
    setCart(updatedCart);
  };

  const applyDiscount = () => {
    axios
      .post('https://digitopia-project-backend.vercel.app/api/ShoppingCart', {
        couponCode: userCoupon,
      })
      .then((response) => {
        setMessage(response.data.message);
        setDiscount(response.data.discount || 0);
        setTotalPrice(response.data.totalPrice);
      })
      .catch((error) => console.error('Error applying discount:', error));
  };

  const clearDiscount = () => {
    axios
      .post(
        'https://digitopia-project-backend.vercel.app/api/lab2RaceCondition/cleardiscount',
        {
          coupon: userCoupon,
        }
      )
      .then((response) => {
        setDiscount(0);
        setUserCoupon('');
        setMessage(response.data.message);

        const updatedTotal = cart.reduce((sum, price) => sum + price, 0);
        setTotalPrice(updatedTotal);
        updateTotalOnServer(updatedTotal);
      })
      .catch((error) => console.error('Error clearing discount:', error));
  };

  const resetCart = () => {
    axios
      .delete(
        'https://digitopia-project-backend.vercel.app/api/Resetlab2RaceCondition'
      )
      .then(() => {
        setCart([]);
        setDiscount(0);
        setUserCoupon('');
        setMessage('');
        localStorage.removeItem('cart');
        localStorage.removeItem('discount');

        setTotalPrice(0);
      })
      .catch((error) => console.error('Error resetting cart:', error));
  };

  return (
    <>
      <GoBack />
      <ShowHint hintText='Use Repeater to send the same coupon request multiple times.' />
      <ThemeSwitcher />
      <div className='cart-center'>
        <div className='shopping-cart'>
          <div className='info-bar'>
            Coupon Code: <strong>{couponCode}</strong>
          </div>

          <div className='container-shopping-cart'>
            <div className='product-list-rc'>
              {products.map((product, index) => (
                <div key={index} className='product-rc'>
                  <span className='product-name'>{product.name}</span>
                  <span className='product-price'>{product.price} units</span>
                  <button
                    className='add-btn'
                    onClick={() => addToCart(product.price)}>
                    Add Product
                  </button>
                </div>
              ))}
            </div>

            <div className='coupon-section'>
              <input
                type='text'
                placeholder='Enter coupon code'
                value={userCoupon}
                onChange={(e) => setUserCoupon(e.target.value)}
                className='coupon-input'
              />
              <button className='apply-btn' onClick={applyDiscount}>
                Apply Discount
              </button>
              <button className='apply-btn' onClick={clearDiscount}>
                Clear Discount
              </button>
            </div>

            <div className='discount-info'>
              {discount > 0 && (
                <p className='discount'>Discount: {discount} units</p>
              )}
              <p className='total'>Total: {totalPrice} units</p>
            </div>

            <button className='reset-btn' onClick={resetCart}>
              Reset Cart
            </button>

            {message && <div className='message-box'>{message}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
