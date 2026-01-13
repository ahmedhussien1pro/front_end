import React, { useState } from 'react';
import axios from 'axios';
import './CommandInjectionLabs.css';
import GOBack from '../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function CommandInjectionLab3() {
  const hintMessage = `<p>Find a way to bypass the blacklist."</p>`;
  const [ip, setIp] = useState('');
  const [result, setResult] = useState('');

  const blacklist = [
    ' ',
    '&',
    ';',
    '@',
    '%',
    '^',
    "'",
    '<',
    '>',
    ',',
    '\\',
    '/',
    'ls',
    'cat',
    'less',
    'tail',
    'more',
    'whoami',
    'pwd',
    'echo',
    'ps',
  ];

  const isValidInput = (input) => {
    return !blacklist.some((char) => input.includes(char));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidInput(ip)) {
      setResult('Invalid input detected! Please enter a valid IP address.');
      return;
    }

    try {
      const response = await axios.post(
        'https://digitopia-project-backend.vercel.app/api/commendInjectionLab3',
        { ip }
      );

      if (response.data && response.data.result) {
        setResult(response.data.result);
      } else {
        setResult('No result returned from the API.');
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className='ping-container '>
        <div className='ping-main-wrapper'>
          <div className='ping-header-wrapper'>
            <h2 className='ping-title'>PING</h2>
          </div>
          <div className='ping-form-wrapper col-md-auto mt-3 d-flex justify-content-center'>
            <form onSubmit={handleSubmit} className='ping-form'>
              <input
                className='ping-input form-control'
                type='text'
                name='ip'
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                style={{ width: '500px' }}
                placeholder='Enter IP address'
              />
              <button
                type='submit'
                className='ping-button btn btn-primary mt-4'
                style={{ width: '500px' }}>
                Ping
              </button>
            </form>
          </div>

          {result && (
            <div
              className='ping-result mt-5 alert alert-primary'
              role='alert'
              style={{ width: '500px' }}>
              <strong>
                <p className='ping-result-text' style={{ textAlign: 'center' }}>
                  {result}
                </p>
              </strong>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
