import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PathTraversalBlacklist.css';
import GOBack from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function PathTraversalBlacklist() {
  const hintMessage = `
    <style>
      .hint-container {
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        margin: 20px auto;
        text-align: center;
        font-size: 16px;
      }
      
      .hint-container p {
        font-weight: 500;
        line-height: 1.6;
      }
      
      .hint-message {
        color: #2986CC;
        font-weight: 600;
        font-size: 18px;
        text-shadow: 1px 1px 4px rgba(255, 179, 24, 0.6);
        margin-top: 15px;
        font-style: italic;
      }
      
      .hint-container:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
    </style>
    <div class="hint-container">
      <p class="hint-message">
        Reach /etc/passwd by appending '../../' in URL to navigate to the parent directory.
      </p>
    </div>
  `;
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://digitopia-project-backend.vercel.app/api/pathTraversalLab1Products'
      )
      .then((response) => {
        if (response.data.message === 'products found') {
          setProducts(response.data.data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh' }}>
        <div className='unique-color-bg'>
          <div className='unique-container-path'>
            <h2 className='unique-title'>Products</h2>
            <div className='unique-row'>
              {products.map((product) => (
                <div key={product.id} className='unique-col'>
                  <div className='unique-card'>
                    <img
                      src={`https://digitopia-project-backend.vercel.app/${product.path}`}
                      alt={product.name}
                      className='unique-card-img'
                      onClick={() =>
                        navigate(
                          `/Path__Traversal/Path_Traversal_Labs/lab1/Show_Products/${product.id}`
                        )
                      }
                      style={{ cursor: 'pointer' }}
                    />
                    <div className='unique-card-body'>
                      <h5 className='unique-card-title'>{product.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
