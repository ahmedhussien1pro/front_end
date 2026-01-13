import React, { useEffect, useState } from 'react';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHintBtn from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import '../../SSRF_Labs.css';
import products from '../../data.json';
import axios from 'axios';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function SSRF_store1() {
  const [outOfStockMessage, setOutOfStockMessage] = useState('');

  const hintMessage = `<span>This lab is vulnerable to SSRF due to improper validation of user-supplied input. To solve the lab, you need to provide a URL that can be exploited to access internal resources (e.g., localhost).</span>`;
  const labreset = async () => {
    try {
      await axios.post(
        'https://digitopia-project-backend.vercel.app/api/SSRFLab/resetLab1'
      );
    } catch (error) {
      console.error('Error creating users:', error);
    }
  };
  useEffect(() => {
    labreset();
  }, []);
  const checkStock = async (product) => {
    try {
      const response = await axios.post(
        `https://digitopia-project-backend.vercel.app/api/SSRFLab/checkstock`,
        {
          productId: product.id,
          stock: product.stock,
        }
      );
      const message = response.data.message;
      window.history.pushState(
        {},
        '',
        `?message=${encodeURIComponent(message)}`
      );
      setOutOfStockMessage(message);
    } catch (error) {
      console.error('Error sending stock check request:', error);
      setOutOfStockMessage('Error: Could not fetch stock information.');
    }
  };
  const admin = async () => {
    try {
      await axios.post(
        `https://digitopia-project-backend.vercel.app/api/SSRFLab/admin`
      );
      window.history.pushState({}, '', `store/admin`);
      window.location.reload();
    } catch (error) {
      console.error('Error using api:', error);
    }
  };
  console.log(admin);

  return (
    <>
      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />
      <ThemeSwitcher />

      <div className='ssrf__course-store'>
        {outOfStockMessage && (
          <div
            className='out-of-stock-message'
            style={{
              color: 'red',
              textAlign: 'center',
            }}>
            <h2>{outOfStockMessage}</h2>
          </div>
        )}
        <div className='container'>
          <h1 style={{ textAlign: 'center', marginBottom: 60 }}>
            Featured Products
          </h1>
          <div className='ssrf__course-store--row-practice'>
            {products.map((product) => (
              <div className='ssrf__course-store--card-store' key={product.id}>
                <div className='ssrf__course-store__card-store--functions'>
                  <i className='fa-solid fa-cart-plus'></i>
                  <i className='fa-regular fa-heart'></i>
                </div>
                <img src={product.image} alt={product.title} />
                <div className='ssrf__course-store__card-store--card-text-store'>
                  <button
                    onClick={() => checkStock(product)} // Send the request when clicked
                    className='text-ssrf bg-transparent border-0'>
                    {product.title}
                  </button>
                  <p className='price'>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
