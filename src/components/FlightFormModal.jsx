import { useEffect, useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const blank = {
  code: '',
  airline: '',
  from: '',
  to: '',
  departAt: '',
  arriveAt: '',
  price: '',
  status: 'Scheduled'
};

// Convert ISO datetime to datetime-local format (YYYY-MM-DDTHH:mm)
const toDateTimeLocal = (isoString) => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    // If already in datetime-local format, return as is
    return isoString.length === 16 ? isoString : '';
  }
};

// Convert datetime-local format to ISO string
const toISOString = (dateTimeLocal) => {
  if (!dateTimeLocal) return '';
  try {
    // datetime-local format is YYYY-MM-DDTHH:mm
    // Add seconds and convert to ISO
    const date = new Date(dateTimeLocal);
    return date.toISOString();
  } catch {
    return dateTimeLocal;
  }
};

export default function FlightFormModal({ show, onHide, onSubmit, initial }) {
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        departAt: toDateTimeLocal(initial.departAt),
        arriveAt: toDateTimeLocal(initial.arriveAt),
      });
    } else {
      setForm(blank);
    }
  }, [initial, show]);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      departAt: toISOString(form.departAt),
      arriveAt: toISOString(form.arriveAt),
      price: parseFloat(form.price || 0)
    };
    onSubmit(payload);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>{initial ? 'Edit Flight' : 'Add Flight'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Code</Form.Label>
                <Form.Control value={form.code} onChange={e => update('code', e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Airline</Form.Label>
                <Form.Control value={form.airline} onChange={e => update('airline', e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control
                  value={form.from}
                  onChange={e => update('from', e.target.value.toUpperCase())}
                  placeholder="e.g., DEL, BOM"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <Form.Control
                  value={form.to}
                  onChange={e => update('to', e.target.value.toUpperCase())}
                  placeholder="e.g., DEL, BOM"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Departure</Form.Label>
                <Form.Control type="datetime-local" value={form.departAt} onChange={e => update('departAt', e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Arrival</Form.Label>
                <Form.Control type="datetime-local" value={form.arriveAt} onChange={e => update('arriveAt', e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Price (INR)</Form.Label>
                <Form.Control type="number" step="0.01" value={form.price} onChange={e => update('price', e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select value={form.status} onChange={e => update('status', e.target.value)}>
                  <option>Scheduled</option>
                  <option>On Time</option>
                  <option>Delayed</option>
                  <option>Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button type="submit" variant="primary">{initial ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
