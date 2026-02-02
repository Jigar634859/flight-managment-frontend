import { Card } from 'react-bootstrap';

export default function BoardingPass({ booking, flight }) {
    // Null check at component level
    if (!booking || !flight) {
        return (
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body className="text-center py-5">
                    <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
                    <h5 className="mt-3">Invalid Booking Data</h5>
                    <p className="text-muted">Unable to display boarding pass</p>
                </Card.Body>
            </Card>
        );
    }

    // Generate seat number based on booking ID
    const generateSeatNumber = (id) => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
        const row = ((id % 30) + 1);
        const seat = rows[id % 6];
        return `${row}${seat}`;
    };

    const seatNumber = generateSeatNumber(booking.id);
    const bookingRef = `BP${String(booking.id).padStart(6, '0')}`;
    const barcodeId = `barcode-${booking.id}`; // Unique ID to prevent conflicts

    // Format date with validation
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    // Format time with validation
    const formatTime = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return '--:--';
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <Card className="border-0 shadow-lg" style={{
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}>
            {/* Header with gradient */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px 30px',
                color: 'white'
            }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-1 fw-bold">
                            <i className="bi bi-airplane-fill me-2"></i>
                            SkyPortal Airlines
                        </h5>
                        <small className="opacity-75">Electronic Boarding Pass</small>
                    </div>
                    <div className="text-end">
                        <div className="fw-bold">{bookingRef}</div>
                        <small className="opacity-75">Booking Reference</small>
                    </div>
                </div>
            </div>

            <Card.Body className="p-0">
                {/* Main boarding pass content */}
                <div className="p-4">
                    {/* Passenger Info */}
                    <div className="mb-4 pb-3" style={{ borderBottom: '2px dashed #e2e8f0' }}>
                        <div className="row">
                            <div className="col-md-8">
                                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                    Passenger Name
                                </small>
                                <div className="fw-bold fs-5" style={{ color: '#2d3748' }}>
                                    {booking.passengerName ? booking.passengerName.toUpperCase() : 'N/A'}
                                </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                    Class
                                </small>
                                <div className="fw-bold" style={{ color: '#667eea' }}>
                                    {booking.seatPreference}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flight Route */}
                    <div className="mb-4">
                        <div className="row align-items-center">
                            <div className="col-4 text-center">
                                <small className="text-muted text-uppercase d-block mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                    From
                                </small>
                                <div className="fw-bold" style={{ fontSize: '2.5rem', color: '#667eea', lineHeight: 1 }}>
                                    {flight.from}
                                </div>
                                <small className="text-muted">{formatTime(flight.departAt)}</small>
                            </div>
                            <div className="col-4 text-center">
                                <i className="bi bi-airplane" style={{ fontSize: '2rem', color: '#cbd5e0', transform: 'rotate(90deg)', display: 'inline-block' }}></i>
                                <div className="mt-2">
                                    <small className="text-muted">{flight.code}</small>
                                </div>
                            </div>
                            <div className="col-4 text-center">
                                <small className="text-muted text-uppercase d-block mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                    To
                                </small>
                                <div className="fw-bold" style={{ fontSize: '2.5rem', color: '#667eea', lineHeight: 1 }}>
                                    {flight.to}
                                </div>
                                <small className="text-muted">{formatTime(flight.arriveAt)}</small>
                            </div>
                        </div>
                    </div>

                    {/* Flight Details Grid */}
                    <div className="row g-3 mb-4">
                        <div className="col-6 col-md-3">
                            <div className="p-3" style={{ background: '#f7fafc', borderRadius: '10px' }}>
                                <small className="text-muted text-uppercase d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                    Date
                                </small>
                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                                    {formatDate(flight.departAt)}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="p-3" style={{ background: '#f7fafc', borderRadius: '10px' }}>
                                <small className="text-muted text-uppercase d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                    Seat
                                </small>
                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                                    {seatNumber}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="p-3" style={{ background: '#f7fafc', borderRadius: '10px' }}>
                                <small className="text-muted text-uppercase d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                    Gate
                                </small>
                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                                    {String.fromCharCode(65 + (booking.id % 8))}{(booking.id % 20) + 1}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="p-3" style={{ background: '#f7fafc', borderRadius: '10px' }}>
                                <small className="text-muted text-uppercase d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                    Boarding
                                </small>
                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                                    {formatTime(new Date(new Date(flight.departAt).getTime() - 30 * 60000))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barcode Section */}
                    <div className="text-center pt-3" style={{ borderTop: '2px dashed #e2e8f0' }}>
                        <div className="mb-2">
                            <svg width="100%" height="60" style={{ maxWidth: '300px' }}>
                                <defs>
                                    <pattern id={barcodeId} x="0" y="0" width="8" height="60" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="3" height="60" fill="#000" />
                                        <rect x="3" y="0" width="5" height="60" fill="#fff" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="60" fill={`url(#${barcodeId})`} />
                            </svg>
                        </div>
                        <small className="text-muted d-block mb-3" style={{ letterSpacing: '2px', fontFamily: 'monospace' }}>
                            {bookingRef}
                        </small>
                    </div>


                    {/* Status Badges */}
                    <div className="text-center mt-3 d-flex justify-content-center gap-2 flex-wrap">
                        {/* Booking Status */}
                        <span className="badge" style={{
                            background: booking.status === 'Confirmed' ? '#10b981' : '#6b7280',
                            color: 'white',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>
                            <i className="bi bi-check-circle-fill me-2"></i>
                            {booking.status || 'Confirmed'}
                        </span>

                        {/* Flight Status */}
                        {(booking.flightStatus || flight.status) && (
                            <span className="badge" style={{
                                background:
                                    (booking.flightStatus || flight.status) === 'On Time' ? '#3b82f6' :
                                        (booking.flightStatus || flight.status) === 'Delayed' ? '#f59e0b' :
                                            (booking.flightStatus || flight.status) === 'Cancelled' ? '#ef4444' : '#6b7280',
                                color: 'white',
                                padding: '8px 20px',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                <i className={`bi ${(booking.flightStatus || flight.status) === 'On Time' ? 'bi-clock-fill' :
                                        (booking.flightStatus || flight.status) === 'Delayed' ? 'bi-exclamation-triangle-fill' :
                                            (booking.flightStatus || flight.status) === 'Cancelled' ? 'bi-x-circle-fill' : 'bi-info-circle-fill'
                                    } me-2`}></i>
                                {booking.flightStatus || flight.status}
                            </span>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div style={{
                    background: '#f7fafc',
                    padding: '15px 30px',
                    borderTop: '1px solid #e2e8f0'
                }}>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <small className="text-muted">
                                <i className="bi bi-info-circle me-1"></i>
                                Please arrive 2 hours before departure
                            </small>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <small className="text-muted">
                                Booked on {formatDate(booking.bookingDate || new Date())}
                            </small>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
