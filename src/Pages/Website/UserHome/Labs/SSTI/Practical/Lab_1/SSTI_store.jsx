import React, { useState, useEffect } from 'react';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHintBtn from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import './SSTI_store.css';
import products from './data.json';
import axios from 'axios';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function SSTI_store() {
  const [outOfStockMessage, setOutOfStockMessage] = useState('');
  // const [resetMessage, setResetMessage] = useState("");
  const [messageFromURL, setMessageFromURL] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const hintMessage = `<span>This lab is vulnerable to server-side template injection due to the unsafe construction of an Handlebars template.To solve the lab, review the Handlebars documentation to find out how to execute arbitrary code, then delete the</span><strong> secret.txt</strong>
  `;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    if (message) {
      setMessageFromURL(decodeURIComponent(message));
    }
  }, []);
  useEffect(() => {
    if (messageFromURL) {
      sendMessageToBackend(messageFromURL);
    }
  }, [messageFromURL]);

  const sendMessageToBackend = async (message) => {
    try {
      const response = await axios.post(
        'https://digitopia-project-backend.vercel.app/api/SSTIlab2/submitMessage',
        { message }
      );
      console.log('Message sent to backend:', response.data);
      setHtmlContent(response.data);
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }
  };
  const labreset = async () => {
    try {
      const response = await axios.get(
        'https://digitopia-project-backend.vercel.app/api/SSTIlab2Reset'
      );
      if (response.status === 200) {
        // setResetMessage(response.data.message);
        window.history.replaceState({}, '', window.location.pathname);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error resetting:', error);
      // setResetMessage("Error: Could not reset.");
    }
  };
  const checkStock = async (product) => {
    try {
      const response = await axios.post(
        `https://digitopia-project-backend.vercel.app/api/SSTIlab2/${product.id}`
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

  return (
    <div className='ssti_body'>
      <div className='container-ssti3'>
        <GoBackBtn />
        <ShowHintBtn hintText={hintMessage} />
        <ThemeSwitcher />
        <button
          onClick={labreset}
          className='reset-btn'
          style={{
            width: 'fit-content',
            marginTop: '20px',
            marginLeft: '20px',
            borderRadius: '5px',
            left: '0',
          }}>
          Reset
        </button>

        {/* Display out-of-stock message if available */}
        {outOfStockMessage && (
          <div
            className='out-of-stock-message'
            style={{
              color: 'red',
              textAlign: 'center',
              marginBottom: '20px',
              marginTop: '20px',
            }}>
            <h2>{outOfStockMessage}</h2>
          </div>
        )}
        {htmlContent && (
          <div
            className='backend-response'
            dangerouslySetInnerHTML={{ __html: htmlContent }} // This will render the HTML content
          />
        )}

        <div className='course-store-ssti'>
          <div className='container-store'>
            <h1 style={{ textAlign: 'center', marginBottom: 60 }}>
              Featured Products
            </h1>
            <div className='row-practice'>
              {products.map((product) => (
                <div className='card-store' key={product.id}>
                  <div className='functions'>
                    <i className='fa-solid fa-cart-plus'></i>
                    <i className='fa-regular fa-heart'></i>
                  </div>
                  <img src={product.image} alt={product.title} />
                  <div className='card-text-store'>
                    <button
                      onClick={() => checkStock(product)} // When clicked, send the product ID to the backend
                      className='bg-transparent'>
                      {product.title}
                    </button>
                    <p className='price'>${product.price}</p>
                    {/* Add the Check Stock link */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
