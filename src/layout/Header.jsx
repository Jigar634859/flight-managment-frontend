import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isAdminAuthenticated, isUserAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (type) => {
    logout(type);
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold" style={{ fontSize: '1.5rem' }}>
          <i className="bi bi-airplane-engines me-2" style={{ color: '#667eea' }}></i>
          SkyPortal
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/flights">
              <i className="bi bi-airplane me-1"></i>Flights
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {/* User Authentication Section */}
            {isUserAuthenticated ? (
              <NavDropdown
                title={
                  <span>
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.name || user?.email || 'User'}
                  </span>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item disabled>
                  <small className="text-muted">{user?.email}</small>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/my-bookings">
                  <i className="bi bi-ticket-perforated me-2"></i>My Bookings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogout('user')}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : !isAdminAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/login">
                  <Button variant="outline-light" size="sm" style={{ borderRadius: '8px' }}>
                    <i className="bi bi-box-arrow-in-right me-1"></i>Sign In
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  <Button variant="primary" size="sm" style={{
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}>
                    <i className="bi bi-person-plus me-1"></i>Sign Up
                  </Button>
                </Nav.Link>
              </>
            )}

            {/* Admin Authentication Section */}
            {isAdminAuthenticated ? (
              <NavDropdown
                title={
                  <span>
                    <i className="bi bi-shield-check me-1"></i>
                    Admin
                  </span>
                }
                id="admin-dropdown"
                align="end"
                className="ms-2"
              >
                <NavDropdown.Item as={NavLink} to="/admin">
                  <i className="bi bi-speedometer2 me-2"></i>Dashboard
                </NavDropdown.Item>
              </NavDropdown>
            ) : !isUserAuthenticated && (
              <Nav.Link as={NavLink} to="/admin/login" className="ms-2">
                <Button variant="outline-secondary" size="sm" style={{ borderRadius: '8px' }}>
                  <i className="bi bi-shield-lock me-1"></i>Admin
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}