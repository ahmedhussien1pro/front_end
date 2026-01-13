import React, { useState, useRef, useEffect } from 'react';
import '../Captcha_labs.css';
import ShowHintBtn from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function CaptchaThird() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const recaptchaRef = useRef(null);
  const captchaSiteKey = '6LfMedcqAAAAAB6vOEc_r1EsoNceKP0jJvqB2aWD';

  function handleCaptchaChange(token) {
    setCaptcha(token);
  }
  useEffect(() => {
    fetchComments();
  }, []);
  async function fetchComments() {
    try {
      const response = await axios.get(
        'https://digitopia-project-backend.vercel.app/api/capatchalab3comments'
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
        'https://digitopia-project-backend.vercel.app/api/capatchalab3comments'
      );
      setComments([]);
      setComment('');
      setCaptcha(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      setErr(error.response?.data?.message || 'Network Error');
      console.error('Error resetting captcha:', error);
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    if (!captcha) {
      setErr('Please complete the CAPTCHA.');
      setLoading(false);
      return;
    }

    try {
      // Send comment and CAPTCHA token together
      const response = await axios.post(
        'https://digitopia-project-backend.vercel.app/api/capatchalab3comments',
        {
          comment,
          token: captcha, // ✅ Sent together in the same request
        }
      );

      if (!response.data.success) {
        setErr('Captcha verification failed, try again.');
        setLoading(false);
        return;
      }

      setComment('');
      setCaptcha(null);
      fetchComments();
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Request error:', error);
      setErr(
        error.response?.data?.message ||
          'Network Error: Could not submit the comment.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='body-captcha'>
      <GoBackBtn />
      <ShowHintBtn hintText=' Inspect the request and try removing the CAPTCHA field to see if validation still happens! 🚀' />
      <ThemeSwitcher />
      <div className='captcha_first'>
        <div className='container-captcha'>
          <div className='card-captcha'>
            <div className='card_content'>
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
                  <h3>Captcha Verification</h3>
                  <div className='d-flex justify-content-center'>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={captchaSiteKey}
                      onChange={handleCaptchaChange}
                    />
                  </div>
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
