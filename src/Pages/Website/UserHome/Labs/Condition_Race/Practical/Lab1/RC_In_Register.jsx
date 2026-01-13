import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './rc-register.css';
import GoBack from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function RC_In_Register() {
  const hintMessage = `Use Repeater to send multiple account creation requests simultaneously.`;
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    tel: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://digitopia-project-backend.vercel.app/api/RaceConditionRegister',
        formData
      );
      setMessage(response.data.msg || 'Registration successful!');
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <>
      <GoBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className='rc-container'>
        <div className='rc-content'>
          {message && (
            <div
              className={
                message.includes('User created successfully')
                  ? 'rc-alert-success'
                  : 'rc-alert-error'
              }>
              {message}
            </div>
          )}
          <h2 className='rc-title'>User Registration</h2>
          <form onSubmit={handleSubmit} className='rc-form'>
            <div className='rc-form-group'>
              <label>Name:</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='rc-form-group'>
              <label>Surname:</label>
              <input
                type='text'
                name='surname'
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className='rc-form-group'>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='rc-form-group'>
              <label>Phone:</label>
              <input
                type='number'
                name='tel'
                value={formData.tel}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit' className='rc-btn-primary'>
              Register
            </button>
          </form>
          <a href='/View Registers' className='rc-btn-secondary'>
            View Registers
          </a>
        </div>
      </div>
    </>
  );
}
