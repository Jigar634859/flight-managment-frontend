# Backend Integration Guide

## Steps to Connect React Frontend with Spring Boot Backend

### 1. Environment Configuration

Create a `.env` file in the root directory (already created) with:
```
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE=http://localhost:8080/api
```

### 2. Spring Boot Backend Requirements

Your Spring Boot backend should have the following endpoints:

#### Authentication Endpoints

**Admin Login:**
- `POST /api/admin/login`
- Request Body: `{ "username": "admin", "password": "admin123" }`
- Response: `{ "token": "jwt-token-here" }`

**User Login:**
- `POST /api/users/login`
- Request Body: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "token": "jwt-token", "user": { "id": 1, "email": "user@example.com", "name": "User Name" } }`

**User Registration:**
- `POST /api/users/register`
- Request Body: `{ "email": "user@example.com", "password": "password123", "name": "User Name", "phone": "1234567890" }`
- Response: `{ "token": "jwt-token", "user": { "id": 1, "email": "user@example.com", "name": "User Name" } }`

#### Flight Endpoints

**Get All Flights:**
- `GET /api/flights`
- Headers: `Authorization: Bearer {token}` (optional for public, required for admin)
- Response: `[{ "id": 1, "code": "AI-101", "airline": "Air India", "from": "DEL", "to": "BOM", "departAt": "2024-01-29T10:00:00", "arriveAt": "2024-01-29T12:00:00", "price": 6500, "status": "On Time" }]`

**Get Flight by ID:**
- `GET /api/flights/{id}`
- Response: Single flight object

**Add Flight (Admin only):**
- `POST /api/flights`
- Headers: `Authorization: Bearer {adminToken}`
- Request Body: `{ "code": "AI-101", "airline": "Air India", "from": "DEL", "to": "BOM", "departAt": "2024-01-29T10:00:00", "arriveAt": "2024-01-29T12:00:00", "price": 6500, "status": "Scheduled" }`
- Response: Created flight object

**Update Flight (Admin only):**
- `PUT /api/flights/{id}`
- Headers: `Authorization: Bearer {adminToken}`
- Request Body: Same as Add Flight
- Response: Updated flight object

**Delete Flight (Admin only):**
- `DELETE /api/flights/{id}`
- Headers: `Authorization: Bearer {adminToken}`
- Response: 200 OK

#### Booking Endpoints

**Book Flight:**
- `POST /api/bookings`
- Headers: `Authorization: Bearer {userToken}`
- Request Body: `{ "flightId": 1, "passengerName": "John Doe", "passengerEmail": "john@example.com", "passengerPhone": "1234567890", "numberOfPassengers": 2, "seatPreference": "Economy", "totalPrice": 13000 }`
- Response: Booking object with id and confirmation details

**Get User Bookings:**
- `GET /api/bookings/my-bookings`
- Headers: `Authorization: Bearer {userToken}`
- Response: Array of booking objects

**Get Booking by ID:**
- `GET /api/bookings/{id}`
- Headers: `Authorization: Bearer {userToken}`
- Response: Single booking object

### 3. CORS Configuration ⚠️ IMPORTANT

**CORS MUST be configured in your Spring Boot backend, NOT in the frontend!**

The browser enforces CORS, so your Spring Boot server must explicitly allow requests from `http://localhost:3000`.

**See `SPRING_CORS_SETUP.md` for detailed CORS configuration options.**

Quick setup - Add this configuration class to your Spring Boot project:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

**Note:** If you're using Spring Security, you'll need to configure CORS in your SecurityConfig class instead. See `SPRING_CORS_SETUP.md` for Spring Security configuration.

### 4. Data Format Requirements

**Flight Object:**
```json
{
  "id": 1,
  "code": "AI-101",
  "airline": "Air India",
  "from": "DEL",
  "to": "BOM",
  "departAt": "2024-01-29T10:00:00",
  "arriveAt": "2024-01-29T12:00:00",
  "price": 6500,
  "status": "On Time"
}
```

**User Object:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name"
}
```


**Booking Object:**
```json
{
  "id": 1,
  "flightId": 1,
  "passengerName": "John Doe",
  "passengerEmail": "john@example.com",
  "passengerPhone": "1234567890",
  "numberOfPassengers": 2,
  "seatPreference": "Economy",
  "totalPrice": 13000,
  "bookingDate": "2024-01-29T10:00:00",
  "status": "Confirmed",
  "flightStatus": "On Time",
  "flight": {
    "id": 1,
    "code": "AI-101",
    "airline": "Air India",
    "from": "DEL",
    "to": "BOM",
    "departAt": "2024-01-29T10:00:00",
    "arriveAt": "2024-01-29T12:00:00"
  }
}
```

**Note:** The `flightStatus` and `flight` (FlightSummary) fields are enriched by the backend's `toResponse()` method. These fields provide real-time flight status updates to bookings.

### 5. Flight Status Updates ⚡ NEW

**How it works:**
- Backend enriches all booking responses with current flight status via `BookingResponse.flightStatus`
- Frontend auto-refreshes bookings every 30 seconds
- Users see toast notifications when flight status changes
- No additional endpoints needed - status updates happen automatically

**Backend Implementation:**
See the comprehensive guide in your project for detailed Spring Boot controller examples.

### 6. Testing the Connection



1. Start your Spring Boot backend on port 8080 (or 7171 as configured)
2. Update `.env` file: `REACT_APP_USE_MOCK=false`
3. Restart React dev server: `npm start`
4. Test login/registration endpoints
5. Check browser console for any CORS or API errors

### 7. Troubleshooting

- **CORS Errors**: Ensure Spring Boot CORS config allows `http://localhost:3000`
- **401 Unauthorized**: Check token is being sent in Authorization header
- **404 Not Found**: Verify API base URL matches your Spring Boot endpoints
- **500 Server Error**: Check Spring Boot logs for backend errors
- **Flight Status Not Updating**: Ensure all booking endpoints use `toResponse()` method
