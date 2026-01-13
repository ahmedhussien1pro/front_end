import React, { useState } from 'react';
import './auth_lab.css';
import GOBack from '../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function Auth_lab3() {
  const hintMessage = `<p>The next badge is hidden somewhere after login. Try to locate and access it directly.</p>`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Username and Password are required.');
      return;
    }

    try {
      const response = await fetch(
        'https://digitopia-project-backend.vercel.app/api/brokenAuthlab3',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }

      const data = await response.json();

      if (data.message === 'success') {
        setMessage('Login successful!');
        window.open(
          '/broken-auth/Broken_Authentication_Lab/products',
          '_blank'
        );
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred while sending data to the server.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className='lab1-login-container'>
        <div className='lab1-login-card'>
          <h3 className='lab1-login-title'>Login</h3>

          <form onSubmit={handleSubmit} className='lab1-login-form'>
            <div className='lab1-input-section'>
              <label htmlFor='username' className='lab1-input-label'>
                Username
              </label>
              <input
                type='text'
                className='lab1-input-field lab1-username-input'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='lab1-input-section'>
              <label htmlFor='password' className='lab1-input-label'>
                Password
              </label>
              <input
                type='password'
                className='lab1-input-field lab1-password-input'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type='submit' className='lab1-submit-btn'>
              Submit
            </button>
          </form>

          {message && (
            <p
              className={`lab1-response-message ${
                message.includes('successful') ? 'success' : 'error'
              }`}>
              {message}
            </p>
          )}
        </div>
        {/* Link visible in source code */}
        <div
          style={{ display: 'none' }}
          data-hidden-link='/broken-auth/Broken_Authentication_Lab/products'>
          Inspect the source code for a hint!
        </div>
      </div>
    </>
  );
}
