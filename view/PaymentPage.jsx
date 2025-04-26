import React, { useState } from 'react';
import Payment from './Payment';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    setPaymentStatus('success');
    setOrderDetails({
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      signature: response.razorpay_signature
    });
    // Here you can add your logic to handle successful payment
    // For example, update order status in your database
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
    setPaymentStatus('failed');
    // Here you can add your logic to handle failed payment
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Complete Your Payment</h2>
      <div style={{ 
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Total Amount: <strong>₹500</strong>
        </p>
        <Payment
          amount={500}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
        />
      </div>

      {paymentStatus === 'success' && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '4px'
        }}>
          <h3>Payment Successful!</h3>
          <p>Thank you for your purchase.</p>
          {orderDetails && (
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
              <p>Payment ID: {orderDetails.paymentId}</p>
              <p>Order ID: {orderDetails.orderId}</p>
            </div>
          )}
        </div>
      )}

      {paymentStatus === 'failed' && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px'
        }}>
          <h3>Payment Failed</h3>
          <p>Please try again or contact support if the problem persists.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage; 