import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './IDOR_LAB1.css';
import GoBack from '../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function IDOR_Lab1() {
  const hintMessage = `
        <style>
        .invoice-info {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px auto;
            width: 80%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .invoice-info h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 10px;
        }
        .invoice-info p {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
        }
        .invoice-info .highlight {
            font-weight: bold;
            color: #0066cc;
        }
    </style>
      <div class="invoice-info">
        <h2>Invoice Information</h2>
        <p>Look at the parameter that indicates the unique <span class="highlight">ID</span> of each invoice. We can modify this ID to view information from other customers.</p>
      </div>
  `;

  const strings = {
    title: 'Invoice Viewer',
    card_alert: 'Invoice Alert',
    middle_title: 'View Your Invoice',
    button: 'View Invoice',
  };

  const navigate = useNavigate();
  const location = useLocation();

  const fetchInvoiceData = async (invoiceId) => {
    try {
      const response = await fetch(
        `https://digitopia-project-backend.vercel.app/api/IDORSLab1?id=${invoiceId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch the invoice data: ${response.status}`);
      }

      const data = await response.json();
      const { message, pdfs } = data;

      if (message === 'Pdfs retrieved successfully') {
        const pdf = pdfs.find((pdf) => pdf.id === Number(invoiceId));
        if (pdf) {
          return `https://digitopia-project-backend.vercel.app/${pdf.path}`;
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching the invoice:', error);
      return null;
    }
  };

  const handleViewClick = async (id) => {
    navigate(`?invoice_id=${id}`, { replace: true });
    const pdfUrl = await fetchInvoiceData(id);
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert('Unable to retrieve the PDF. Please try again.');
    }
  };

  useEffect(() => {
    const getQueryParam = (param) => {
      return new URLSearchParams(location.search).get(param);
    };

    const invoiceId = getQueryParam('invoice_id');
    if (invoiceId) {
      fetchInvoiceData(invoiceId).then((pdfUrl) => {
        if (pdfUrl) {
          window.open(pdfUrl, '_blank');
        } else {
          alert('Invalid or missing PDF.');
        }
      });
    }
  }, [location.search]);

  return (
    <>
      <GoBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh' }}>
        <div className='idor-wrapper'>
          <div className='idor-container'>
            <div className='idor-container-wrapper'>
              <div className='idor-row idor-pt-5 idor-mt-5 idor-mb-3'>
                <div className='idor-col-md-3'></div>
                <div className='idor-col-md-6'>
                  <h1 className='idor-title'>{strings.title}</h1>
                </div>
                <div className='idor-col-md-3'></div>
              </div>

              <div className='idor-row idor-pt-2'>
                <div className='idor-col-md-3'></div>
                <div className='idor-col-md-6'>
                  <div className='idor-card idor-border-primary idor-mb-4'>
                    <div className='idor-card-header idor-text-primary'>
                      {strings.card_alert}
                    </div>
                  </div>

                  <h3 className='idor-middle-title idor-mb-3'>
                    {strings.middle_title}
                  </h3>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className='idor-d-grid idor-gap-2'>
                      <button
                        className='idor-btn idor-btn-primary'
                        type='button'
                        onClick={() => handleViewClick(1)}>
                        {strings.button}
                      </button>
                    </div>
                  </form>
                </div>
                <div className='idor-col-md-3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
