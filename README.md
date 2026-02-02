# Flight Management System - Frontend

A modern flight booking application built with React and Bootstrap, featuring real-time flight search, booking management, and integrated payment processing.

## 🚀 Features

- **User Features**
  - Browse and search flights
  - Real-time flight status updates
  - Book flights with multiple payment options (Razorpay, Demo mode)
  - View and manage bookings
  - Digital boarding passes
  - Edit booking details

- **Admin Features**
  - Comprehensive admin dashboard
  - Flight management (Add, Edit, Delete)
  - Advanced flight search
  - Real-time status updates

- **Payment Integration**
  - Razorpay payment gateway
  - Demo mode for testing
  - Secure payment processing

## 🛠️ Tech Stack

- **Frontend**: React 18
- **UI Framework**: React Bootstrap
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Payment**: Razorpay
- **Icons**: Bootstrap Icons

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (Spring Boot)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flight-managment
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE=http://your-backend-api-url:port/api
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📁 Project Structure

```
flight-managment/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Reusable components
│   │   ├── BoardingPass.jsx
│   │   ├── BookingModal.jsx
│   │   ├── EditBookingModal.jsx
│   │   ├── FlightFormModal.jsx
│   │   ├── FlightTable.jsx
│   │   └── PaymentModal.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── layout/           # Layout components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Flights.jsx
│   │   ├── MyBookings.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── UserLogin.jsx
│   │   └── UserRegister.jsx
│   ├── services/         # API services
│   │   ├── flightsService.js
│   │   ├── mockFlightsService.js
│   │   └── springFlightsService.js
│   ├── utils/            # Utility functions
│   │   └── formatters.js
│   ├── App.jsx
│   └── index.js
├── .env                  # Environment variables (not in git)
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Use mock data (true) or real backend API (false)
REACT_APP_USE_MOCK=false

# Backend API base URL
REACT_APP_API_BASE=http://your-backend-url:port/api
```

## 💳 Payment Configuration

### Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Update the Razorpay key in `src/components/PaymentModal.jsx`:

```javascript
key: 'rzp_live_YOUR_KEY_HERE'  // Replace with your live key
```

**Note**: Currently using test key `rzp_test_1DP5mmOlF5G5ag` for development.

## 🎨 Features Breakdown

### User Authentication
- Secure login/registration
- JWT token-based authentication
- Session management
- Protected routes

### Flight Management
- Real-time flight search
- Advanced filtering (origin, destination, date)
- Flight status tracking (On Time, Delayed, Cancelled)
- Dynamic pricing

### Booking System
- Multi-passenger booking
- Seat preference selection
- Real-time price calculation
- Booking modification
- Digital boarding passes with QR codes

### Payment Processing
- Multiple payment options
- Razorpay integration (UPI, Cards, Wallets, Net Banking)
- Demo mode for testing
- Payment status tracking

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the build/ folder to Netlify
```

### Deploy to AWS S3 + CloudFront

```bash
npm run build
aws s3 sync build/ s3://your-bucket-name
```

## 🔒 Security Features

- Environment variable protection
- Input validation
- XSS protection
- Secure payment processing
- Protected admin routes

## 🐛 Known Issues

- Session timeout not implemented (planned feature)
- Console errors in development (will be removed in production)

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React Bootstrap for UI components
- Razorpay for payment processing
- Bootstrap Icons for iconography
