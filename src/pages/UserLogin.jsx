import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await userLogin(email, password);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      // Extract error message from backend response
      const errorMessage = err.response?.data?.message
        || err.response?.data?.error
        || err.message
        || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
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
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: '#667eea' }}></i>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>Welcome Back</h2>
                  <p className="text-muted">Sign in to book your flights</p>
                </div>

                {error && (
                  <Alert variant="danger" className="border-0" style={{ borderRadius: '10px' }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={onSubmit}>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                        className="py-2"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{ paddingLeft: '45px', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                        className="py-2"
                      />
                    </div>
                  </Form.Group>

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
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      style={{
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Sign up here
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
