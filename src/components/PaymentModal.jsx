import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function PaymentModal({ show, onHide, bookingData, onPaymentSuccess }) {
    const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'demo'
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    // Razorpay payment handler
    const handleRazorpayPayment = () => {
        const options = {
            key: 'rzp_test_1DP5mmOlF5G5ag', // Test key - replace with your actual key
            amount: bookingData.totalPrice * 100, // Amount in paise
            currency: 'INR',
            name: 'SkyPortal Airlines',
            description: `Flight Booking - ${bookingData.flightId}`,
            image: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
            handler: function (response) {
                // Payment successful
                const completeBookingData = {
                    ...bookingData,
                    paymentMethod: 'razorpay',
                    paymentStatus: 'Paid',
                    paidAmount: bookingData.totalPrice,
                    razorpayPaymentId: response.razorpay_payment_id
                };
                onPaymentSuccess(completeBookingData);
                setPaymentMethod('razorpay');
                setError('');
                onHide();
            },
            prefill: {
                name: bookingData.passengerName || '',
                email: bookingData.passengerEmail || '',
                contact: bookingData.passengerPhone || ''
            },
            theme: {
                color: '#667eea'
            },
            modal: {
                ondismiss: function () {
                    setProcessing(false);
                    setError('Payment cancelled');
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
            setProcessing(false);
            setError(`Payment failed: ${response.error.description}`);
        });
        rzp.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Handle Razorpay payment
        if (paymentMethod === 'razorpay') {
            setProcessing(true);
            handleRazorpayPayment();
            return;
        }

        // Handle demo mode
        setProcessing(true);

        try {
            // Simulate payment processing for demo
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Add payment info to booking data
            const completeBookingData = {
                ...bookingData,
                paymentMethod: 'demo',
                paymentStatus: 'Paid',
                paidAmount: bookingData.totalPrice
            };

            onPaymentSuccess(completeBookingData);
            setPaymentMethod('razorpay');
            setError('');
            onHide();
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
            <Modal.Header closeButton style={{ borderBottom: '2px solid #e2e8f0' }}>
                <Modal.Title className="fw-bold">
                    <i className="bi bi-credit-card me-2" style={{ color: '#667eea' }}></i>
                    Payment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Payment Method Selection */}
                    <div className="mb-4">
                        <h6 className="fw-bold mb-3">Select Payment Method</h6>
                        <div className="d-flex gap-3 flex-wrap">
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setPaymentMethod('razorpay')}
                                onKeyPress={(e) => e.key === 'Enter' && setPaymentMethod('razorpay')}
                                aria-pressed={paymentMethod === 'razorpay'}
                                style={{
                                    flex: '1 1 calc(50% - 12px)',
                                    minWidth: '200px',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: paymentMethod === 'razorpay' ? '3px solid #667eea' : '2px solid #e2e8f0',
                                    background: paymentMethod === 'razorpay' ? '#f0f4ff' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div className="text-center">
                                    <i className="bi bi-wallet2" style={{ fontSize: '2rem', color: '#667eea' }} aria-hidden="true"></i>
                                    <div className="fw-bold mt-2">Razorpay</div>
                                    <small className="text-muted">UPI, Cards, Wallets</small>
                                </div>
                            </div>

                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setPaymentMethod('demo')}
                                onKeyPress={(e) => e.key === 'Enter' && setPaymentMethod('demo')}
                                aria-pressed={paymentMethod === 'demo'}
                                style={{
                                    flex: '1 1 calc(50% - 12px)',
                                    minWidth: '200px',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: paymentMethod === 'demo' ? '3px solid #667eea' : '2px solid #e2e8f0',
                                    background: paymentMethod === 'demo' ? '#f0f4ff' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div className="text-center">
                                    <i className="bi bi-lightning-charge-fill" style={{ fontSize: '2rem', color: '#667eea' }} aria-hidden="true"></i>
                                    <div className="fw-bold mt-2">Demo Mode</div>
                                    <small className="text-muted">Skip payment</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="danger" className="border-0" style={{ borderRadius: '10px' }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </Alert>
                    )}

                    {/* Demo Mode Info */}
                    {paymentMethod === 'demo' && (
                        <div className="p-4 text-center mb-4" style={{
                            background: '#fff3cd',
                            borderRadius: '12px',
                            border: '2px solid #ffc107'
                        }}>
                            <i className="bi bi-info-circle-fill" style={{ fontSize: '2.5rem', color: '#856404' }}></i>
                            <h5 className="fw-bold mt-3 mb-2" style={{ color: '#856404' }}>Demo Mode</h5>
                            <p className="mb-0" style={{ color: '#856404' }}>
                                Your booking will be confirmed without payment processing.
                                This is for demonstration purposes only.
                            </p>
                        </div>
                    )}

                    {/* Amount Summary */}
                    <div className="mt-4 p-3" style={{
                        background: '#f7fafc',
                        borderRadius: '10px',
                        border: '2px solid #e2e8f0'
                    }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="fw-semibold">Total Amount</div>
                            <div className="fw-bold fs-4" style={{ color: '#667eea' }}>
                                ₹{bookingData?.totalPrice?.toLocaleString('en-IN')}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-4">
                        <Button
                            variant="outline-secondary"
                            onClick={onHide}
                            className="flex-fill"
                            disabled={processing}
                            style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={processing}
                            className="flex-fill"
                            style={{
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                            }}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-2"></i>
                                    {paymentMethod === 'demo' ? 'Confirm Booking' : 'Pay Now'}
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
