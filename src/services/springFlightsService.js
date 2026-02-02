import axios from 'axios';

// Backend base URL.
// - Uses REACT_APP_API_BASE if provided
// - Falls back to your Spring Boot port 7171
const API = (process.env.REACT_APP_API_BASE || 'http://localhost:7171/api').replace(/\/+$/, '');

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    const token = adminToken || userToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Admin authentication
export async function adminLogin(username, password) {
  const { data } = await apiClient.post('/admin/login', { username, password });
  return data; // { token }
}

// User authentication
export async function userLogin(email, password) {
  const { data } = await apiClient.post('/users/login', { email, password });
  return data; // { token, user }
}

export async function userRegister(userData) {
  const { data } = await apiClient.post('/users/register', userData);
  return data; // { token, user }
}

// Flights
export async function getFlights() {
  const { data } = await apiClient.get('/flights');
  return data;
}

export async function getFlightById(id) {
  const { data } = await apiClient.get(`/flights/${id}`);
  return data;
}

export async function addFlight(payload) {
  const { data } = await apiClient.post('/flights', payload);
  return data;
}

export async function updateFlight(id, payload) {
  const { data } = await apiClient.put(`/flights/${id}`, payload);
  return data;
}

export async function deleteFlight(id) {
  await apiClient.delete(`/flights/${id}`);
  return true;
}

export async function searchFlights(from, to, date = null) {
  const params = { from, to };
  if (date) {
    params.date = date; // Format: YYYY-MM-DD
  }
  const { data } = await apiClient.get('/flights/search', { params });
  return data;
}

// Bookings
export async function bookFlight(bookingData) {
  const { data } = await apiClient.post('/bookings', bookingData);
  return data;
}

export async function getUserBookings() {
  const { data } = await apiClient.get('/bookings/my-bookings');
  return data;
}

export async function getBookingById(id) {
  const { data } = await apiClient.get(`/bookings/${id}`);
  return data;
}

export async function updateBooking(id, updateData) {
  const { data } = await apiClient.patch(`/bookings/${id}`, updateData);
  return data;
}
