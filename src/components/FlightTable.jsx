import { Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fmtCurrency, fmtDateTime } from '../utils/formatters';

export default function FlightTable({ flights, clickable = false, admin = false, onEdit, onDelete }) {
  const navigate = useNavigate();

  const onRowClick = (id) => {
    if (clickable) navigate(`/flights/${id}`);
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || '';
    let variant = 'secondary';
    let icon = 'bi-info-circle';

    if (statusLower.includes('on time')) {
      variant = 'success';
      icon = 'bi-check-circle';
    } else if (statusLower.includes('delayed')) {
      variant = 'warning';
      icon = 'bi-clock';
    } else if (statusLower.includes('cancelled')) {
      variant = 'danger';
      icon = 'bi-x-circle';
    } else if (statusLower.includes('scheduled')) {
      variant = 'info';
      icon = 'bi-calendar-check';
    }

    return (
      <Badge bg={variant} style={{ borderRadius: '8px', padding: '6px 12px', fontWeight: '600' }}>
        <i className={`bi ${icon} me-1`}></i>
        {status || 'N/A'}
      </Badge>
    );
  };

  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0" style={{ fontSize: '0.95rem' }}>
        <thead style={{ background: '#f7fafc', borderBottom: '2px solid #e2e8f0' }}>
          <tr>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-tag me-2"></i>Code
            </th>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-building me-2"></i>Airline
            </th>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-geo-alt-fill me-2"></i>From
            </th>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-geo-fill me-2"></i>To
            </th>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-clock me-2"></i>Departure
            </th>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-clock-fill me-2"></i>Arrival
            </th>
            <th className="fw-bold text-end" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-currency-rupee me-2"></i>Price
            </th>
            <th className="fw-bold" style={{ padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-info-circle me-2"></i>Status
            </th>
            {admin && <th className="fw-bold" style={{ width: 160, padding: '15px 20px', color: '#4a5568' }}>
              <i className="bi bi-gear me-2"></i>Actions
            </th>}
          </tr>
        </thead>
        <tbody>
          {flights.map((f, index) => (
            <tr
              key={f.id}
              style={{
                cursor: clickable ? 'pointer' : 'default',
                background: index % 2 === 0 ? 'white' : '#fafafa',
                transition: 'all 0.2s ease'
              }}
              onClick={() => onRowClick(f.id)}
              onMouseEnter={(e) => {
                if (clickable) e.currentTarget.style.background = '#f0f4ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fafafa';
              }}
            >
              <td style={{ padding: '15px 20px' }}>
                <span className="fw-bold" style={{ color: '#667eea' }}>{f.code}</span>
              </td>
              <td style={{ padding: '15px 20px' }}>{f.airline}</td>
              <td style={{ padding: '15px 20px' }}>
                <span className="badge bg-light text-dark" style={{ borderRadius: '8px', padding: '6px 10px', fontWeight: '600' }}>
                  {f.from}
                </span>
              </td>
              <td style={{ padding: '15px 20px' }}>
                <span className="badge bg-light text-dark" style={{ borderRadius: '8px', padding: '6px 10px', fontWeight: '600' }}>
                  {f.to}
                </span>
              </td>
              <td style={{ padding: '15px 20px' }}>
                <div className="small text-muted">
                  <i className="bi bi-calendar3 me-1"></i>
                  {fmtDateTime(f.departAt)}
                </div>
              </td>
              <td style={{ padding: '15px 20px' }}>
                <div className="small text-muted">
                  <i className="bi bi-calendar3 me-1"></i>
                  {fmtDateTime(f.arriveAt)}
                </div>
              </td>
              <td className="text-end" style={{ padding: '15px 20px' }}>
                <span className="fw-bold" style={{ color: '#2d3748', fontSize: '1.05rem' }}>
                  {fmtCurrency(f.price)}
                </span>
              </td>
              <td style={{ padding: '15px 20px' }}>
                {getStatusBadge(f.status)}
              </td>
              {admin && (
                <td style={{ padding: '15px 20px' }}>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={(e) => { e.stopPropagation(); onEdit(f); }}
                      style={{ borderRadius: '8px', fontWeight: '600' }}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={(e) => { e.stopPropagation(); onDelete(f); }}
                      style={{ borderRadius: '8px', fontWeight: '600' }}
                    >
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
          {flights.length === 0 && (
            <tr>
              <td colSpan={admin ? 9 : 8} className="text-center py-5">
                <div style={{ color: '#a0aec0' }}>
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}></i>
                  <h5 className="fw-bold mb-2">No Flights Found</h5>
                  <p className="text-muted mb-0">Try adjusting your search criteria or add a new flight.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
