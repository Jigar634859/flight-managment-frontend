import { Form } from 'react-bootstrap';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <Form.Control
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ maxWidth: 280 }}
    />
  );
}