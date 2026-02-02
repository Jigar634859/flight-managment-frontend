# Configuration Guide

## To Connect to Spring Boot Backend

### Step 1: Create `.env` file

Create a file named `.env` in the root directory (`flight-managment/.env`) with this content:

```
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE=http://localhost:8080/api
```

**Note:** If your Spring Boot runs on a different port, change `8080` to your port number.

### Step 2: Restart React Dev Server

After creating/updating `.env`, restart your React app:
```bash
npm start
```

### Step 3: Share Your Spring Boot Code

To help you integrate, please share:
1. **Controller files** (AdminController, UserController, FlightController, BookingController)
2. **Entity/Model classes** (User, Flight, Booking, Admin)
3. **application.properties** or **application.yml**
4. **Security configuration** (if using Spring Security)

You can:
- Paste the code here in the chat
- Or describe your API endpoints and response formats
