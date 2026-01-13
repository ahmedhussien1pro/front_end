import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../../../components/HackerLoginForm/HackerLoginForm.css';
import { Link } from 'react-router-dom';
import ShowHintBtn from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
const LoginSqlInjection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { username, password };
    axios
      .post(
        'https://digitopia-project-backend.vercel.app/api/Loginsqlinjection',
        data
      )
      .then((response) => {
        navigate(`/Sql_Injection/sql_Injection_lab/Welcome`);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          setErr(error.response.data);
          console.error(error.response.data);
        } else {
          setErr('Network Error');
          console.error(error);
        }
      });
  };

  const spanCount = 400;
  const hintMessage = `
    <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
      <li>1. User is <mark><code>CyberLabs</code></mark> and you need to find the password.
      </li>
      \n
      <li>2. 
     Use your SQL injection skills to bypass the login form and get the password.
      </li>\n
      <li>3. you Remember How to skip the password! 
      </li>
      \n
      <li>4. Try to search about SQL Injection and how to bypass the login form.
      </li>
      \n
      <li>5. Good Luck!
      </li>
    </ul>
  `;
  return (
    <div
      style={{
        backgroundColor: '#000',
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />
      <ThemeSwitcher />
      <main className='hacker-login'>
        {Array.from({ length: spanCount }).map((_, index) => (
          <span key={index} className='hackerLogin-gridSpan'></span>
        ))}

        {/* Sign-in form */}
        <div className='hackerLogin-signin'>
          <div className='hackerLogin-content'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className='hacker-form'>
              <div className='hackerLogin-inputBox'>
                <input
                  type='text'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <i>Username</i>
              </div>
              <div className='hackerLogin-inputBox'>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i>Password</i>
              </div>
              <div className='hackerLogin-links'>
                <Link to=''>Forgot Password?</Link>
                <Link to=''>Sign Up</Link>
              </div>
              <div className='hackerLogin-inputBox'>
                <input
                  type='submit'
                  value={loading ? 'Logging in...' : 'Login'}
                  disabled={loading}
                />
              </div>
              {err && <span className='error'>{err}</span>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LoginSqlInjection;
