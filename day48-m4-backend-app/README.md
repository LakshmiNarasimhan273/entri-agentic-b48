# Train Ticket Booking System REST API - Walkthrough & Guide

A functional, high-performance Node.js REST API for a complete Train Ticket Booking System built with zero external auth libraries and an in-memory database.

---

## 1. How to Run

### Prerequisites
- Node.js v18+ (tested on Node.js v24 with native `fetch` and `crypto`)
- npm

### Installation & Startup
```bash
# 1. Install dependencies (strictly express and dotenv)
npm install

# 2. Configure environment
# Copy the example environment file if .env does not already exist:
cp .env.example .env

# 3. Start the server
npm start
```

The server will boot on `http://localhost:3000` (or the `PORT` specified in `.env`).

### Running the End-to-End Automated Smoke Test
A comprehensive test script covering all 23 verification points (from authentication, seat assignment, collision prevention, cancellation, 90%/50% refund calculation, to admin refund approval and community messages) is included:
```bash
node smoke_test.js
```

---

## 2. Sample `.env`

```ini
PORT=3000
TOKEN_SECRET=super_secret_booking_system_key_2026_secure
TOKEN_EXPIRY_MINUTES=120
ADMIN_REGISTRATION_KEY=ADMIN_SECRET_KEY_9999
```

---

## 3. Architectural Highlights & Constraint Compliance

- **Pure Functional Style:** Zero occurrences of `class ` or `this.` across all files in `src/`. All components are plain functions, arrow functions, closures, and object literals.
- **Zero Extra Dependencies:** Only `express` and `dotenv` in `package.json`.
- **Cryptographic Security:**
  - Password hashing: `crypto.scryptSync` with unique 16-byte random salt per user.
  - JWT-like HMAC tokens: `base64url(header).base64url(payload).base64url(signature)` signed using `crypto.createHmac('sha256', TOKEN_SECRET)` and verified with `crypto.timingSafeEqual`.
- **Strict File Naming:** Every file inside `src/` follows the exact format `scenario.folderName.js` (e.g., `user.model.js`, `train.service.js`, `booking.controller.js`).
- **Layer Decoupling:**
  - `models/`: In-memory data holders (`const array = []; module.exports = { array };`). No functions or seed logic.
  - `services/`: All business logic, ID generation, seat allocation, refund calculations, and model mutations. Zero references to `req`/`res`.
  - `controllers/`: Handles `req` → calls service → `res`. Wraps in try/catch and forwards errors via `next(err)`.
  - `middlewares/`: Generic RegEx validation (`validateBody`, `validateParams`, `validateQuery`), string trimming, token authentication, and role authorization.
- **Standardized Response Envelope:**
  - Success: `{ "success": true, "message": "...", "data": ... }`
  - Error: `{ "success": false, "message": "...", "errors": [ ... optional ] }`

---

## 4. End-to-End Sample Requests & Responses

### 1. User Registration (`POST /api/auth/register`)
**Admin Registration (requires `adminKey`):**
```http
POST /api/auth/register HTTP/1.1
Content-Type: application/json

{
  "name": "Master Admin",
  "email": "admin@railway.gov.in",
  "phone": "9876543210",
  "password": "AdminPassword123!",
  "role": "admin",
  "adminKey": "ADMIN_SECRET_KEY_9999"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "usr_99f4852c03cb",
      "name": "Master Admin",
      "email": "admin@railway.gov.in",
      "phone": "9876543210",
      "role": "admin",
      "createdAt": "2026-10-30T15:45:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfOTlmNDg1MmMwM2NiIiwiZW1haWwiOiJhZG1pbkByYWlsd2F5Lmdvdi5pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5MzM3NTkwMCwiZXhwIjoxNzkzMzgxOTAwfQ.pD0h_yPvZK2g68lM7Q..."
  }
}
```

---

### 2. User Login (`POST /api/auth/login`)
```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "admin@railway.gov.in",
  "password": "AdminPassword123!"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_99f4852c03cb",
      "name": "Master Admin",
      "email": "admin@railway.gov.in",
      "phone": "9876543210",
      "role": "admin",
      "createdAt": "2026-10-30T15:45:00.000Z"
    }
  }
}
```

---

### 3. Admin Creates Train (`POST /api/trains`)
```http
POST /api/trains HTTP/1.1
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "trainNumber": "12951",
  "name": "Mumbai Tejas Rajdhani",
  "source": "Mumbai Central",
  "destination": "New Delhi",
  "departureTime": "17:00",
  "arrivalTime": "08:32",
  "totalSeats": 120,
  "farePerSeat": 2150,
  "runningDays": [0, 1, 2, 3, 4, 5, 6]
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Train created successfully",
  "data": {
    "id": "trn_a4b9cf1028ae",
    "trainNumber": "12951",
    "name": "Mumbai Tejas Rajdhani",
    "source": "Mumbai Central",
    "destination": "New Delhi",
    "departureTime": "17:00",
    "arrivalTime": "08:32",
    "runningDays": [0, 1, 2, 3, 4, 5, 6],
    "totalSeats": 120,
    "farePerSeat": 2150,
    "status": "ACTIVE",
    "createdAt": "2026-10-30T15:46:00.000Z",
    "updatedAt": "2026-10-30T15:46:00.000Z"
  }
}
```

---

### 4. Search Trains with Dynamic Seat Availability (`GET /api/trains`)
```http
GET /api/trains?source=Mumbai%20Central&destination=New%20Delhi&travelDate=2026-11-25 HTTP/1.1
Authorization: Bearer <CUSTOMER_TOKEN>
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Trains retrieved successfully",
  "data": [
    {
      "id": "trn_a4b9cf1028ae",
      "trainNumber": "12951",
      "name": "Mumbai Tejas Rajdhani",
      "source": "Mumbai Central",
      "destination": "New Delhi",
      "departureTime": "17:00",
      "arrivalTime": "08:32",
      "runningDays": [0, 1, 2, 3, 4, 5, 6],
      "totalSeats": 120,
      "farePerSeat": 2150,
      "status": "ACTIVE",
      "createdAt": "2026-10-30T15:46:00.000Z",
      "updatedAt": "2026-10-30T15:46:00.000Z",
      "availableSeats": 120
    }
  ]
}
```

---

### 5. Book Ticket with Auto & Preferred Seats (`POST /api/bookings`)
```http
POST /api/bookings HTTP/1.1
Authorization: Bearer <CUSTOMER_TOKEN>
Content-Type: application/json

{
  "trainId": "trn_a4b9cf1028ae",
  "travelDate": "2026-11-25",
  "passengers": [
    {
      "name": "Alice Passenger",
      "age": 30,
      "gender": "F"
    },
    {
      "name": "Charlie Friend",
      "age": 32,
      "gender": "M",
      "seatNumber": 7
    }
  ]
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking confirmed successfully",
  "data": {
    "id": "bkg_e188f572a1cc",
    "pnr": "PNR7D4A2B9",
    "userId": "usr_99f4852c03cb",
    "trainId": "trn_a4b9cf1028ae",
    "travelDate": "2026-11-25",
    "passengers": [
      {
        "name": "Alice Passenger",
        "age": 30,
        "gender": "F",
        "seatNumber": 1
      },
      {
        "name": "Charlie Friend",
        "age": 32,
        "gender": "M",
        "seatNumber": 7
      }
    ],
    "totalFare": 4300,
    "status": "CONFIRMED",
    "refundStatus": "NONE",
    "bookedAt": "2026-10-30T15:47:00.000Z",
    "cancelledAt": null
  }
}
```

---

### 6. Cancel Ticket & Request Refund (`PATCH /api/bookings/:id/cancel`)
```http
PATCH /api/bookings/bkg_e188f572a1cc/cancel HTTP/1.1
Authorization: Bearer <CUSTOMER_TOKEN>
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "booking": {
      "id": "bkg_e188f572a1cc",
      "pnr": "PNR7D4A2B9",
      "userId": "usr_99f4852c03cb",
      "trainId": "trn_a4b9cf1028ae",
      "travelDate": "2026-11-25",
      "passengers": [ ... ],
      "totalFare": 4300,
      "status": "CANCELLED",
      "refundStatus": "PENDING",
      "bookedAt": "2026-10-30T15:47:00.000Z",
      "cancelledAt": "2026-10-30T15:48:00.000Z"
    },
    "refund": {
      "id": "ref_904a11be4d8f",
      "bookingId": "bkg_e188f572a1cc",
      "userId": "usr_99f4852c03cb",
      "amount": 3870,
      "status": "PENDING",
      "requestedAt": "2026-10-30T15:48:00.000Z",
      "processedAt": null,
      "processedBy": null,
      "remarks": ""
    }
  }
}
```

---

### 7. Admin Approves Refund (`PATCH /api/refunds/:id/process`)
```http
PATCH /api/refunds/ref_904a11be4d8f/process HTTP/1.1
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "decision": "APPROVED",
  "remarks": "Approved by accounts division"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Refund processed successfully",
  "data": {
    "refund": {
      "id": "ref_904a11be4d8f",
      "bookingId": "bkg_e188f572a1cc",
      "userId": "usr_99f4852c03cb",
      "amount": 3870,
      "status": "APPROVED",
      "requestedAt": "2026-10-30T15:48:00.000Z",
      "processedAt": "2026-10-30T15:49:00.000Z",
      "processedBy": "usr_admin_id",
      "remarks": "Approved by accounts division"
    },
    "booking": {
      "id": "bkg_e188f572a1cc",
      "refundStatus": "APPROVED"
    }
  }
}
```

---

### 8. Customer Profile (`GET /api/users/profile`)
```http
GET /api/users/profile HTTP/1.1
Authorization: Bearer <CUSTOMER_TOKEN>
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "user": {
      "id": "usr_99f4852c03cb",
      "name": "Alice Passenger",
      "email": "alice.passenger@example.com",
      "phone": "9123456780",
      "role": "customer",
      "createdAt": "2026-10-30T15:45:00.000Z"
    },
    "bookings": [
      {
        "id": "bkg_e188f572a1cc",
        "pnr": "PNR7D4A2B9",
        "status": "CANCELLED",
        "refundStatus": "APPROVED",
        "totalFare": 4300
      }
    ],
    "refunds": [
      {
        "id": "ref_904a11be4d8f",
        "bookingId": "bkg_e188f572a1cc",
        "amount": 3870,
        "status": "APPROVED",
        "remarks": "Approved by accounts division"
      }
    ]
  }
}
```

---

## 5. Assumptions

1. **Travel Date vs. Running Days:** When searching for trains on a specific date, the train's `runningDays` (array of integers `0..6`, where 0 is Sunday) is checked against the UTC day of the week of `travelDate`. If not provided, trains run every day (`[0, 1, 2, 3, 4, 5, 6]`).
2. **Cancellation Cutoff Datetime:** Departure datetime is calculated by joining `booking.travelDate` (YYYY-MM-DD) and `train.departureTime` (HH:mm). If current time is strictly less than departure time:
   - Cancellation more than 24 hours in advance yields a 90% refund.
   - Cancellation 24 hours or less in advance yields a 50% refund.
   - After departure, cancellation is rejected with `400 Bad Request`.
3. **Seat Auto-Assignment Algorithm:** For passengers without an explicitly preferred seat, seats are assigned sequentially starting from 1 to `totalSeats`, skipping any seats already reserved on that train for that `travelDate` (or already requested within the same payload).
4. **Train Deletion Integrity:** An admin cannot delete a train if there are any active `CONFIRMED` bookings scheduled for today or any future date (`409 Conflict`).
5. **Token Payload & Expiry:** Auth tokens carry `userId`, `email`, `role`, `iat`, and `exp`. Expiry defaults to 60 minutes (configured as 120 in `.env`).
6. **In-Memory Volatility:** In accordance with the non-negotiable constraint of in-memory data, state is held in Node process memory and resets upon server restart.
