
import * as mock from './mockFlightsService';
import * as spring from './springFlightsService';

const useMock = (process.env.REACT_APP_USE_MOCK ?? 'true') === 'true';
const svc = useMock ? mock : spring;

// Admin Auth
export const adminLogin = svc.adminLogin;

// User Auth
export const userLogin = svc.userLogin;
export const userRegister = svc.userRegister;

// Flights
export const getFlights = svc.getFlights;
export const getFlightById = svc.getFlightById;
export const addFlight = svc.addFlight;
export const updateFlight = svc.updateFlight;
export const deleteFlight = svc.deleteFlight;
export const searchFlights = svc.searchFlights;

// Bookings
export const bookFlight = svc.bookFlight;
export const getUserBookings = svc.getUserBookings;
export const getBookingById = svc.getBookingById;
export const updateBooking = svc.updateBooking;