# Implementation Plan - Train Ticket Booking System REST API

A pure functional, in-memory, zero-external-auth Node.js REST API for a Train Ticket Booking System adhering strictly to constraints: only `express` and `dotenv`, no `class`/`this.`, exact naming `scenario.folderName.js`, and standardized JSON responses.

---

## 1. File Structure

All source files are placed under the workspace root following the exact schema:

```
├── index.js                          # Server bootloader & dotenv init
├── package.json                      # Dependencies: express, dotenv only
├── .env                              # Active environment configuration
├── .env.example                      # Template environment configuration
├── .gitignore                        # Git ignore patterns
└── src/
    ├── config/
    │   ├── server.config.js          # Frozen environment configuration object
    │   └── app.config.js             # Express app setup, middleware mounting, error handling
    ├── models/
    │   ├── user.model.js             # In-memory users array holder
    │   ├── train.model.js            # In-memory trains array holder
    │   ├── booking.model.js          # In-memory bookings array holder
    │   ├── refund.model.js           # In-memory refunds array holder
    │   └── announcement.model.js     # In-memory announcements array holder
    ├── services/
    │   ├── user.service.js           # User storage & query logic
    │   ├── train.service.js          # Train CRUD, search, and availability queries
    │   ├── booking.service.js        # Seat allocation, booking creation, cancellation
    │   ├── refund.service.js         # Refund request generation and processing
    │   └── announcement.service.js   # Community message CRUD logic
    ├── controllers/
    │   ├── user.controller.js        # Profile query controller
    │   ├── train.controller.js       # Train management and search controller
    │   ├── booking.controller.js     # Booking & cancellation controller
    │   ├── refund.controller.js      # Refund retrieval & decision controller
    │   └── announcement.controller.js# Announcement controller
    ├── middlewares/
    │   ├── validation.middleware.js  # Generic schema validator using RegEx
    │   └── auth.middleware.js        # HMAC-SHA256 token verification & role authorization
    ├── routes/
    │   ├── auth.routes.js            # /api/auth routes
    │   ├── user.routes.js            # /api/users routes
    │   ├── train.routes.js           # /api/trains routes
    │   ├── booking.routes.js         # /api/bookings routes
    │   ├── refund.routes.js          # /api/refunds routes
    │   ├── announcement.routes.js    # /api/announcements routes
    │   └── index.routes.js           # Aggregate router under /api
    ├── security/
    │   └── auth.security.js          # Password hashing (scrypt), HMAC token signing, auth handler
    └── utils/
        ├── error.utils.js            # createHttpError factory & global error middleware
        └── response.utils.js         # Standard JSON response envelope senders
```

---

## 2. Domain Data Models & In-Memory Shapes

Every model file exports only an array (`const data = []; module.exports = { data };`) without any functions or methods.

### User
```javascript
{
  id: "usr_...",           // Alphanumeric ID generated via crypto
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  passwordHash: "...",     // Hex string from crypto.scryptSync
  salt: "...",             // Hex string from crypto.randomBytes(16)
  role: "customer",        // "customer" | "admin"
  createdAt: "2026-10-30T15:00:00.000Z"
}
```

### Train
```javascript
{
  id: "trn_...",
  trainNumber: "12345",    // Unique 5-digit string
  name: "Rajdhani Express",
  source: "DELHI",
  destination: "MUMBAI",
  departureTime: "16:30",  // HH:mm 24-hr format
  arrivalTime: "08:30",    // HH:mm 24-hr format
  runningDays: [0, 1, 2, 3, 4, 5, 6], // Days of week (0=Sun, 6=Sat)
  totalSeats: 120,         // Positive integer
  farePerSeat: 1500,       // Positive number
  status: "ACTIVE",        // "ACTIVE" | "INACTIVE"
  createdAt: "2026-10-30T15:00:00.000Z",
  updatedAt: "2026-10-30T15:00:00.000Z"
}
```

### Booking
```javascript
{
  id: "bkg_...",
  pnr: "PNR9876543",       // 10-char uppercase alphanumeric string
  userId: "usr_...",
  trainId: "trn_...",
  travelDate: "2026-11-15", // YYYY-MM-DD
  passengers: [
    {
      name: "Alice Doe",
      age: 28,
      gender: "F",         // "M" | "F" | "O"
      seatNumber: 1        // 1..totalSeats
    }
  ],
  totalFare: 1500,
  status: "CONFIRMED",     // "CONFIRMED" | "CANCELLED"
  refundStatus: "NONE",    // "NONE" | "PENDING" | "APPROVED" | "REJECTED"
  bookedAt: "2026-10-30T15:00:00.000Z",
  cancelledAt: null
}
```

### Refund
```javascript
{
  id: "ref_...",
  bookingId: "bkg_...",
  userId: "usr_...",
  amount: 1350,            // Calculated based on cancellation time
  status: "PENDING",       // "PENDING" | "APPROVED" | "REJECTED"
  requestedAt: "2026-10-30T15:30:00.000Z",
  processedAt: null,
  processedBy: null,       // Admin user ID
  remarks: ""
}
```

### Announcement
```javascript
{
  id: "ann_...",
  title: "Track Maintenance Notice",
  message: "Platform 3 will undergo maintenance tonight.",
  trainId: "trn_...",      // Optional train association
  createdBy: "usr_admin",
  createdAt: "2026-10-30T15:00:00.000Z",
  updatedAt: "2026-10-30T15:00:00.000Z"
}
```

---

## 3. Endpoints Matrix

| Method | Path | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register customer or admin (admin requires `adminKey`) |
| `POST` | `/api/auth/login` | Public | Authenticate and obtain HMAC JWT-like token |
| `GET` | `/api/users/profile` | Customer, Admin | Current user profile, personal bookings, and refunds |
| `GET` | `/api/trains` | Customer, Admin | Search ACTIVE trains (`source`, `destination`, `travelDate`) with dynamic seat count |
| `GET` | `/api/trains/:id` | Customer, Admin | Train details |
| `POST` | `/api/trains` | Admin | Create train (unique `trainNumber`) |
| `PUT` | `/api/trains/:id` | Admin | Update train details |
| `DELETE` | `/api/trains/:id` | Admin | Delete train (blocked if CONFIRMED future bookings exist) |
| `POST` | `/api/bookings` | Customer | Book seats with auto/specified seat allocation |
| `GET` | `/api/bookings/my` | Customer | List all bookings made by caller |
| `GET` | `/api/bookings/:id` | Customer (Own), Admin | Get single booking by ID |
| `GET` | `/api/bookings/pnr/:pnr` | Customer (Own), Admin | Get single booking by PNR |
| `PATCH` | `/api/bookings/:id/cancel` | Customer | Cancel own booking prior to departure, generates refund |
| `GET` | `/api/bookings` | Admin | View all bookings with optional query filters |
| `GET` | `/api/refunds/my` | Customer | View caller's refunds |
| `GET` | `/api/refunds` | Admin | View all refunds (filter by status) |
| `PATCH` | `/api/refunds/:id/process` | Admin | Approve or reject a PENDING refund |
| `GET` | `/api/announcements` | Public | View all announcements |
| `POST` | `/api/announcements` | Admin | Post a new announcement |
| `PUT` | `/api/announcements/:id` | Admin | Update an announcement |
| `DELETE` | `/api/announcements/:id` | Admin | Delete an announcement |

---

## 4. Key Architectural Mechanisms

1. **Functional Style & Zero Classes:**
   - No custom classes or `class ` keywords.
   - All modules export object literals containing pure or closure-based functions.
   - Error creation via `createHttpError(statusCode, message, errors)` returning an Error instance decorated with properties without invoking any class definition.

2. **Security & Cryptography:**
   - Password hashing: `crypto.scryptSync(password, salt, 64).toString('hex')`.
   - Salt generation: `crypto.randomBytes(16).toString('hex')`.
   - Token format: `base64url(header).base64url(payload).base64url(signature)`.
   - Signature: `crypto.createHmac('sha256', TOKEN_SECRET).update(header + '.' + payload).digest('base64url')`.
   - Signature verification: `crypto.timingSafeEqual`.

3. **Generic RegEx Validation:**
   - `validateBody(schema)`, `validateParams(schema)`, `validateQuery(schema)`.
   - Schema defines `{ required: boolean, pattern?: RegExp, validator?: (val) => boolean, message: string }`.
   - Aggregates all validation errors and sends 400 Bad Request with `{ success: false, message: "Validation error", errors: [...] }`.

4. **Dynamic Seat Allocation & Concurrency Guard:**
   - For a given train and travelDate, active booked seats = all `passengers.seatNumber` across CONFIRMED bookings for that train on that date.
   - Available seats = `train.totalSeats - bookedSeats.length`.
   - When booking, validate that requested seat numbers are in `1..totalSeats` and not in `bookedSeats`. If seatNumber is omitted, pick the lowest available integer.
