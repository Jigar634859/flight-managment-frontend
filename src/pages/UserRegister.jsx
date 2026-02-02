import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      const ok = await userRegister(userData);
      if (ok) {
        navigate('/', { replace: true });
      } else {
        setError('Registration failed. Email may already be in use.');
      }
    } catch (err) {
      // Extract error message from backend response
      const errorMessage = err.response?.data?.message
        || err.response?.data?.error
        || err.message
        || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-primary" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '80px',
      paddingBottom: '80px'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-person-plus-fill" style={{ fontSize: '4rem', color: '#667eea' }}></i>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>Create Account</h2>
                  <p className="text-muted">Join us and start booking flights</p>
                </div>

                {error && (
                  <Alert variant="danger" className="border-0" style={{ borderRadius: '10px' }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Full Name</Form.Label>
                        <div className="position-relative">
                          <i className="bi bi-person position-absolute" style={{
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#a0aec0'
                          }}></i>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                            className="py-2"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <div className="position-relative">
                      <i className="bi bi-envelope position-absolute" style={{
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#a0aec0'
                      }}></i>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                        className="py-2"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <div className="position-relative">
                      <i className="bi bi-telephone position-absolute" style={{
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#a0aec0'
                      }}></i>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                        className="py-2"
                      />
                    </div>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Password</Form.Label>
                        <div className="position-relative">
                          <i className="bi bi-lock-fill position-absolute" style={{
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#a0aec0'
                          }}></i>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create password"
                            required
                            style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                            className="py-2"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                        <div className="position-relative">
                          <i className="bi bi-lock-fill position-absolute" style={{
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#a0aec0'
                          }}></i>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                            style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                            className="py-2"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2 fw-semibold"
                    disabled={loading}
                    style={{
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      style={{
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
