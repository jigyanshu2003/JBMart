import React, { useState } from 'react';
import { razorpayConfig } from '../config.js';

const Payment = ({ amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!res) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        key: razorpayConfig.key_id,
        amount: amount * 100, // Amount in paise
        currency: razorpayConfig.currency,
        name: razorpayConfig.company_name,
        description: 'Payment for your order',
        image: 'https://example.com/your_logo.png',
        handler: function (response) {
          onSuccess(response);
          setLoading(false);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#61dafb'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        onFailure(response.error);
        setLoading(false);
      });
      paymentObject.open();
    } catch (err) {
      setError(err.message);
      setLoading(false);
      onFailure(err);
    }
  };

  return (
    <div>
      <button
        onClick={displayRazorpay}
        className="payment-button"
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#61dafb',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Payment; 