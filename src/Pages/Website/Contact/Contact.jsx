import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import phoneIcon from '../assets/img/contact-img/icon-phone-accent.svg';
import mailIcon from '../assets/img/contact-img/icon-mail-accent.svg';
import locationIcon from '../assets/img/contact-img/icon-location.svg';
import './Contact.css';
import ThemeSwitcher from '../components/ThemeSwitcher/ThemeSwitcher';
const Contact = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch(
        'https://digitopia-project-backend.vercel.app/api/contactWithUs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      setStatus({
        loading: false,
        success: result.mas || 'Message sent successfully!',
        error: null,
      });

      setFormData({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: null,
        error: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <>
      <Header />
      <ThemeSwitcher />
      <div className='page-header parallaxie'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-12'>
              <div className='page-header-box'>
                <h1>Contact us</h1>
                <nav>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <a href='/'>home</a>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      contact us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='page-contact-us'>
        <div className='container'>
          <div className='row section-row'>
            <div className='col-lg-12'>
              <div className='section-title-contant'>
                <h3>contact us</h3>
                <h2>
                  Do you have questions? <span>ask us anytime</span>
                </h2>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <div className='page-contact-box parallaxie'>
                <div className='contact-info-list'>
                  <div className='contact-info-item'>
                    <div className='icon-box'>
                      <img src={phoneIcon} alt='Phone Icon' />
                    </div>
                    <div className='contact-info-content'>
                      <h3>contact us</h3>
                      <p>
                        <a href='tel:+91123456789'>+40 455 258 2728</a>
                      </p>
                      <p>
                        <a href='tel:+91123456789'>+91 221 8224 387</a>
                      </p>
                    </div>
                  </div>

                  <div className='contact-info-item'>
                    <div className='icon-box'>
                      <img src={mailIcon} alt='Mail Icon' />
                    </div>
                    <div className='contact-info-content'>
                      <h3>e-mail us</h3>
                      <p>
                        <a href='mailto:infodomainname@gmail.com'>
                          xokaso4969@bnsteps.com
                        </a>
                      </p>
                      <p>
                        <a href='mailto:domainname@gmail.com'>
                          domainname@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className='contact-info-item'>
                    <div className='icon-box'>
                      <img src={locationIcon} alt='Location Icon' />
                    </div>
                    <div className='contact-info-content'>
                      <h3>our location</h3>
                      <p>12345 Unity Avenue Suite 100 Springfield, USA 54321</p>
                    </div>
                  </div>
                </div>

                <div className='contact-us-form'>
                  <div className='section-title-contant dark-section'>
                    <h2>Get in touch with us</h2>
                  </div>

                  <div className='member-contact-form contact-form'>
                    <form id='contactForm' onSubmit={handleSubmit}>
                      <div className='row'>
                        <div className='form-group col-md-6 mb-4'>
                          <input
                            type='text'
                            name='fname'
                            className='form-control'
                            placeholder='First name'
                            value={formData.fname}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className='form-group col-md-6 mb-4'>
                          <input
                            type='text'
                            name='lname'
                            className='form-control'
                            placeholder='Last name'
                            value={formData.lname}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className='form-group col-md-6 mb-4'>
                          <input
                            type='text'
                            name='phone'
                            className='form-control'
                            placeholder='Enter Your Phone No.'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className='form-group col-md-6 mb-4'>
                          <input
                            type='email'
                            name='email'
                            className='form-control'
                            placeholder='Enter Your E-mail'
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className='form-group col-md-12 mb-5'>
                          <textarea
                            name='message'
                            className='form-control'
                            rows='4'
                            placeholder='Write Message'
                            value={formData.message}
                            onChange={handleChange}
                            required></textarea>
                        </div>

                        <div className='col-md-12'>
                          <button
                            type='submit'
                            className='btn-default btn-highlighted'
                            disabled={status.loading}>
                            <span>
                              {status.loading ? 'Sending...' : 'Submit Message'}
                            </span>
                          </button>
                        </div>

                        {status.success && (
                          <div className='alert alert-success mt-3'>
                            {status.success}
                          </div>
                        )}
                        {status.error && (
                          <div className='alert alert-danger mt-3'>
                            {status.error}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='google-map'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='google-map-iframe'>
                <iframe
                  title='Google Map Location'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.683131312215!2d30.928948424793457!3d30.473411974710334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14587e447c6fc38b%3A0xc47ca8046df9b6d6!2sEMATECH!5e0!3m2!1sar!2seg!4v1740655745370!5m2!1sar!2seg'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
