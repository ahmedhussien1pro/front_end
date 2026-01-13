import React, { useState, useEffect } from 'react';
import '../Captcha_labs.css';
import ShowHintBtn from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import axios from 'axios';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function Captcha_second() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [captcha, setCaptcha] = useState(''); // User input
  const [captchaQuestion, setCaptchaQuestion] = useState(''); // Displayed captcha
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // Fetch captcha from backend
  async function fetchCaptcha() {
    try {
      const res = await axios.get(
        'https://digitopia-project-backend.vercel.app/api/capatchalab2'
      );
      const { num1, num2 } = res.data;
      setCaptchaQuestion(`${num1} + ${num2}`);
      setCaptcha(''); // Reset input field
      setErr('');
    } catch (error) {
      setErr('Failed to load captcha.');
      console.error('Error fetching captcha:', error);
    }
  }

  useEffect(() => {
    fetchCaptcha();
    fetchComments();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      await axios.post(
        'https://digitopia-project-backend.vercel.app/api/capatchalab2',
        {
          result: captcha,
          comment: comment,
        }
      );

      setComment('');
      setCaptcha('');
      fetchCaptcha(); // Get new captcha after submission
      fetchComments();
    } catch (error) {
      setErr(error.response?.data?.message || 'Network Error');
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchComments() {
    try {
      const response = await axios.get(
        'https://digitopia-project-backend.vercel.app/api/capatchalab2comments'
      );

      if (Array.isArray(response.data)) {
        setComments(
          response.data.map((cmt, index) => ({
            id: index + 1,
            comment: cmt.comment,
          }))
        );
      } else {
        setComments([]);
      }
    } catch (error) {
      setErr('Failed to fetch comments.');
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  }

  async function deleteCaptcha() {
    setLoading(true);
    setErr('');

    try {
      await axios.delete(
        'https://digitopia-project-backend.vercel.app/api/capatchalab2'
      );

      setComments([]);
      setComment('');
      setCaptcha('');
    } catch (error) {
      setErr(error.response?.data?.message || 'Network Error');
      console.error('Error resetting captcha:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='body-captcha'>
      <GoBackBtn />
      <ShowHintBtn hintText='The CAPTCHA values stay the same in the session until solved. Try brute-forcing different answers until you get it right! 🚀' />
      <ThemeSwitcher />
      <div className='captcha_first'>
        <div className='container-captcha'>
          <div className='card-captcha'>
            <div className='card_content'>
              <div className='card_title'>Captcha Verification</div>
              <form onSubmit={handleSubmit}>
                <div className='form-group-captcha'>
                  <label htmlFor='comment'>Enter Your Comment</label>
                  <textarea
                    name='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='input'
                    required></textarea>
                </div>
                <div className='form-group-captcha text-center my-3 text-white'>
                  <h3>Captcha: {captchaQuestion}</h3>
                  <input
                    type='number'
                    name='captcha'
                    className='input'
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group-captcha'>
                  <button type='submit' disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                  {err && <span className='error'>{err}</span>}
                </div>
              </form>
            </div>
          </div>
          <div className='reset mb-5'>
            <button
              onClick={deleteCaptcha}
              disabled={loading}
              className='captcha_reset_btn'>
              {loading ? 'Resetting...' : 'Reset'}
            </button>
          </div>
          <div className='comment-section'>
            {comments.map((cmt) => (
              <div key={cmt.id} className='comment-card'>
                <div className='comment-header'>
                  <p className='name'>#{cmt.id}</p>
                </div>
                <p className='comment-text'>{cmt.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
