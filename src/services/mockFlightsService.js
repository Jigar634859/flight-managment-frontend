const KEY = 'skyportal.flights';
const IDKEY = 'skyportal.nextId';
const BOOKINGS_KEY = 'skyportal.bookings';
const BOOKING_ID_KEY = 'skyportal.nextBookingId';
const ADMIN = { user: 'admin', pass: 'admin123', token: 'mock-token-123' };

function seed() {
  if (!localStorage.getItem(KEY)) {
    const now = new Date();
    const plusHours = (h) => new Date(now.getTime() + h * 3600 * 1000).toISOString().slice(0, 16);
    const data = [
      { id: 1, code: 'AI-101', airline: 'Air India', from: 'DEL', to: 'BOM', departAt: plusHours(4), arriveAt: plusHours(6), price: 6500, status: 'On Time' },
      { id: 2, code: '6E-302', airline: 'IndiGo', from: 'DEL', to: 'BLR', departAt: plusHours(2), arriveAt: plusHours(4.5), price: 5200, status: 'Scheduled' },
      { id: 3, code: 'UK-505', airline: 'Vistara', from: 'DEL', to: 'GOI', departAt: plusHours(8), arriveAt: plusHours(10.2), price: 7800, status: 'Delayed' },
    ];
    localStorage.setItem(KEY, JSON.stringify(data));
    localStorage.setItem(IDKEY, '4');
  }
}
seed();

const read = () => JSON.parse(localStorage.getItem(KEY) || '[]');
const write = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

export async function adminLogin(username, password) {
  if (username === ADMIN.user && password === ADMIN.pass) {
    return { token: ADMIN.token };
  }
  throw new Error('Invalid admin credentials');
}

export async function getFlights() {
  return read();
}

export async function getFlightById(id) {
  return read().find(f => String(f.id) === String(id)) || null;
}

export async function addFlight(data) {
  const flights = read();
  const nextId = Number(localStorage.getItem(IDKEY) || flights.length + 1);
  const item = { ...data, id: nextId };
  flights.push(item);
  write(flights);
  localStorage.setItem(IDKEY, String(nextId + 1));
  return item;
}

export async function updateFlight(id, data) {
  const flights = read();
  const idx = flights.findIndex(f => String(f.id) === String(id));
  if (idx >= 0) {
    flights[idx] = { ...flights[idx], ...data, id: flights[idx].id };
    write(flights);
    return flights[idx];
  }
  throw new Error('Not found');
}

export async function deleteFlight(id) {
  const flights = read().filter(f => String(f.id) !== String(id));
  write(flights);
  return true;
}

export async function searchFlights(from, to, date = null) {
  const flights = read();
  let results = flights.filter(f =>
    f.from.toUpperCase() === from.toUpperCase() &&
    f.to.toUpperCase() === to.toUpperCase()
  );

  if (date) {
    // Filter by date (compare only the date part)
    results = results.filter(f => {
      const flightDate = f.departAt.split('T')[0]; // Get YYYY-MM-DD part
      return flightDate === date;
    });
  }

  return results;
}

// User authentication
export async function userLogin(email, password) {
  // Mock user login - accept any email/password for demo
  const user = { email, id: 1, name: email.split('@')[0] };
  return { token: 'mock-user-token-123', user };
}

export async function userRegister(userData) {
  // Mock user registration
  const user = {
    email: userData.email,
    id: Date.now(),
    name: userData.name || userData.email.split('@')[0]
  };
  return { token: 'mock-user-token-123', user };
}

// Bookings
function readBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
}

function writeBookings(arr) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(arr));
}

export async function bookFlight(bookingData) {
  const bookings = readBookings();
  const nextId = Number(localStorage.getItem(BOOKING_ID_KEY) || '1');
  const booking = {
    id: nextId,
    ...bookingData,
    bookingDate: new Date().toISOString(),
    status: 'Confirmed',
  };
  bookings.push(booking);
  writeBookings(bookings);
  localStorage.setItem(BOOKING_ID_KEY, String(nextId + 1));
  return booking;
}

export async function getUserBookings() {
  return readBookings();
}

export async function getBookingById(id) {
  return readBookings().find(b => String(b.id) === String(id)) || null;
}

export async function updateBooking(id, updateData) {
  const bookings = readBookings();
  const idx = bookings.findIndex(b => String(b.id) === String(id));
  if (idx >= 0) {
    bookings[idx] = { ...bookings[idx], ...updateData };
    writeBookings(bookings);
    return bookings[idx];
  }
  throw new Error('Booking not found');
}