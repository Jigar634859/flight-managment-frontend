import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await adminLogin(username, password);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      // Extract error message from backend response
      const errorMessage = err.response?.data?.message
        || err.response?.data?.error
        || err.message
        || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Admin login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px',
      paddingBottom: '80px'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '30px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <i className="bi bi-shield-lock-fill" style={{ fontSize: '2.5rem', color: '#fff' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#fff' }}>Admin Portal</h3>
                <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Secure Access Required
                </p>
              </div>

              <Card.Body className="p-5">
                {error && (
                  <Alert variant="danger" className="border-0" style={{ borderRadius: '10px' }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-person-badge me-2" style={{ color: '#667eea' }}></i>
                      Username
                    </Form.Label>
                    <div className="position-relative">
                      <i className="bi bi-person position-absolute" style={{
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#a0aec0'
                      }}></i>
                      <Form.Control
                        value={username}
                        onChange={e => setU(e.target.value)}
                        required
                        placeholder="Enter admin username"
                        style={{
                          paddingLeft: '45px',
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '12px 12px 12px 45px'
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-key-fill me-2" style={{ color: '#667eea' }}></i>
                      Password
                    </Form.Label>
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
                        onChange={e => setP(e.target.value)}
                        required
                        placeholder="Enter admin password"
                        style={{
                          paddingLeft: '45px',
                          borderRadius: '10px',
                          border: '2px solid #e2e8f0',
                          padding: '12px 12px 12px 45px'
                        }}
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
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                      padding: '12px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-shield-check me-2"></i>
                        Secure Login
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <div style={{
                    background: '#f7fafc',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <i className="bi bi-info-circle me-2" style={{ color: '#667eea' }}></i>
                    <small className="text-muted">
                      Authorized personnel only
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Back to Home Link */}
            <div className="text-center mt-4">
              <a
                href="/"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}