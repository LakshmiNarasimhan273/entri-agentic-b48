# ROLE
You are a senior Node.js backend engineer. Build a complete, runnable **Train Ticket Booking System REST API** from scratch, following every constraint below exactly. Do not ask me questions. If something is ambiguous, choose the simplest option that satisfies the requirements and list it under "Assumptions" in your final walkthrough.

# WORKING MODE
1. First produce an **Implementation Plan** artifact (file tree, data shapes, endpoint list). Then proceed without waiting.
2. Then produce a **Task List** artifact and work through it phase by phase (see "Execution Phases").
3. After each phase, run the code and verify it before moving on.
4. Finish with a **Walkthrough** artifact: how to run, sample requests, assumptions made.

# HARD CONSTRAINTS (non-negotiable)
1. **Functional style only.** Do NOT use `class`, `new SomeClass()` for custom types, `this`, or prototype tricks anywhere. Use plain functions, arrow functions, closures and object literals.
2. **Only these npm packages: `express` and `dotenv`.** Nothing else (no jsonwebtoken, bcrypt, uuid, nodemon, cors, joi, etc.). Node.js **built-in modules** (e.g. `crypto`) are allowed and should be used for password hashing, token signing and ID generation.
3. **File naming format is `scenario.folderName.js`**, for example `user.model.js`, `train.model.js`, `booking.service.js`, `auth.security.js`. Every file inside the source folders must follow this. The only exception is the root entry file `index.js`.
4. **In-memory database only.** No files, no external DB.
5. CommonJS modules (`require` / `module.exports`).
6. Every response uses a consistent JSON envelope:
   - Success: `{ "success": true, "message": "...", "data": ... }`
   - Error: `{ "success": false, "message": "...", "errors": [ ... optional ] }`

# FOLDER STRUCTURE AND RESPONSIBILITIES
Create exactly this structure:

    ticket-booking-system/
    ├── index.js                          (loads dotenv, starts server using config; the only file exempt from naming rule)
    ├── package.json                      (deps: express, dotenv only; scripts: "start": "node index.js")
    ├── .env                              (PORT, TOKEN_SECRET, TOKEN_EXPIRY_MINUTES, ADMIN_REGISTRATION_KEY)
    ├── .env.example
    ├── .gitignore
    └── src/
        ├── config/
        │   ├── server.config.js          (reads PORT and other env values; exports a frozen config object)
        │   └── app.config.js             (builds the express app: json parser, mounts routes, 404 handler, global error handler)
        ├── models/
        │   ├── user.model.js
        │   ├── train.model.js
        │   ├── booking.model.js
        │   ├── refund.model.js
        │   └── announcement.model.js
        ├── services/
        │   ├── user.service.js
        │   ├── train.service.js
        │   ├── booking.service.js
        │   ├── refund.service.js
        │   └── announcement.service.js
        ├── controllers/
        │   ├── user.controller.js
        │   ├── train.controller.js
        │   ├── booking.controller.js
        │   ├── refund.controller.js
        │   └── announcement.controller.js
        ├── middlewares/
        │   ├── validation.middleware.js  (reusable, RegEx-based validators)
        │   └── auth.middleware.js        (authenticate token + authorizeRoles)
        ├── routes/
        │   ├── auth.routes.js
        │   ├── user.routes.js
        │   ├── train.routes.js
        │   ├── booking.routes.js
        │   ├── refund.routes.js
        │   ├── announcement.routes.js
        │   └── index.routes.js           (combines all routers under /api)
        ├── security/
        │   └── auth.security.js          (register + login request/response logic, password hashing, token create/verify)
        └── utils/
            ├── error.utils.js            (createHttpError helper + global error-handling middleware)
            └── response.utils.js         (sendSuccess / sendError helpers)

## Layer rules (strictly enforced)
- **Models:** ONLY in-memory data holders (e.g. `const users = [];`) exported as-is. **No functions, no helpers, no seed logic** in model files.
- **Services:** ALL business logic and ALL reads/writes to the models (push, find, filter, update, delete, ID generation, seat calculation, refund calculation). Services never touch `req`/`res`.
- **Controllers:** ONLY handle `req` → call service → `res`. No business logic. Wrap with try/catch and forward errors via `next(err)`.
- **Middlewares:** reusable validation using **RegEx**, plus auth/role guards. Validation middleware must be generic, e.g. `validateBody(schemaRules)`, `validateParams(schemaRules)`, `validateQuery(schemaRules)` where rules are plain objects describing `{ required, pattern, message }` per field. Collect all errors and return 400 with an `errors` array.
- **Routes:** ONLY connect endpoint + middlewares + controller.
- **Security:** register and login request/response handling lives here (including calling `user.service` to create/find users). Password hashing uses `crypto.scryptSync` with a random salt. Tokens are HMAC-SHA256 signed (`crypto.createHmac`) using `TOKEN_SECRET`, in a JWT-like `header.payload.signature` base64url format with an expiry. Verify with `crypto.timingSafeEqual`.
- **Utils:** global error handler (maps thrown HTTP errors to the response envelope; unknown errors → 500 without leaking stack traces).
- **Config:** server port and secrets come from `.env` via dotenv, with sensible defaults (PORT default 3000).

# DOMAIN MODEL (fields to implement)
- **User:** id, name, email, phone, passwordHash, salt, role (`customer` | `admin`), createdAt
- **Train:** id, trainNumber, name, source, destination, departureTime, arrivalTime, runningDays (array of 0-6) or a simple `travelDate` list, totalSeats, farePerSeat, status (`ACTIVE` | `INACTIVE`), createdAt, updatedAt
- **Booking:** id, pnr (unique, e.g. 10-char alphanumeric), userId, trainId, travelDate (YYYY-MM-DD), passengers [{ name, age, gender, seatNumber }], totalFare, status (`CONFIRMED` | `CANCELLED`), refundStatus (`NONE` | `PENDING` | `APPROVED` | `REJECTED`), bookedAt, cancelledAt
- **Refund:** id, bookingId, userId, amount, status (`PENDING` | `APPROVED` | `REJECTED`), requestedAt, processedAt, processedBy, remarks
- **Announcement:** id, title, message, trainId (optional), createdBy, createdAt, updatedAt

Seat availability is calculated **per train per travelDate** inside `booking.service.js` / `train.service.js` from CONFIRMED bookings (total seats minus booked seat numbers). Seat numbers are integers `1..totalSeats`. Two confirmed bookings must never share a seat on the same train and date.

# FEATURES AND BUSINESS RULES

## Auth (Security folder)
- Register as `customer` or `admin`. Admin registration requires a valid `adminKey` matching `ADMIN_REGISTRATION_KEY` from `.env`; otherwise 403.
- Email must be unique. Never return `passwordHash` or `salt` in any response.
- Login returns a signed token plus a safe user object.

## Customer
- **Search trains:** filter by `source`, `destination` (case-insensitive), optional `travelDate`; show only ACTIVE trains, each with `availableSeats` for the given date.
- **Book ticket:** body has `trainId`, `travelDate` (must not be in the past), `passengers[]` (each with name, age, gender, and optional preferred `seatNumber`). If a seat is not given, auto-assign the lowest free seat. Reject if the seat is taken or availability is insufficient. Calculate `totalFare`. On success, the booking is linked to the customer's user ID.
- **Profile:** returns the user's own info and their booking history and refund history.
- **My bookings / booking status check:** list own bookings; fetch a booking by id or PNR (only if it belongs to the caller; otherwise 403/404).
- **Cancel ticket:** only own, CONFIRMED bookings, and only before departure. On cancel: set status to CANCELLED, free the seats, compute the refund amount (more than 24h before departure → 90%, 24h or less → 50%), create a Refund record with status PENDING, set booking `refundStatus = PENDING`.
- **Refund history:** customer can see own refund records (also included in profile).

## Admin
- **Train CRUD:** create, list, get by id, update, delete. Block deletion if the train has CONFIRMED future bookings (return 409). Validate that `trainNumber` is unique.
- **Booking history:** view all bookings with optional filters (`trainId`, `userId`, `status`, `travelDate`).
- **Refund approval:** list refunds (filter by status); approve or reject a PENDING refund with remarks. Update both the Refund and the linked Booking `refundStatus`. A refund that is not PENDING cannot be processed again (409).
- **Community messages:** create, update, delete announcements about train schedules/info. Customers (and the public) can read the announcements via GET.

# API ENDPOINTS (all under `/api`)
| Method | Path | Access |
|---|---|---|
| POST | /auth/register | public |
| POST | /auth/login | public |
| GET | /users/profile | customer, admin |
| GET | /trains?source=&destination=&travelDate= | customer, admin |
| GET | /trains/:id | customer, admin |
| POST | /trains | admin |
| PUT | /trains/:id | admin |
| DELETE | /trains/:id | admin |
| POST | /bookings | customer |
| GET | /bookings/my | customer |
| GET | /bookings/:id | customer (own), admin |
| GET | /bookings/pnr/:pnr | customer (own), admin |
| PATCH | /bookings/:id/cancel | customer |
| GET | /bookings | admin (with filters) |
| GET | /refunds/my | customer |
| GET | /refunds | admin |
| PATCH | /refunds/:id/process | admin (body: `{ decision: "APPROVED" \| "REJECTED", remarks }`) |
| GET | /announcements | public |
| POST | /announcements | admin |
| PUT | /announcements/:id | admin |
| DELETE | /announcements/:id | admin |

Use correct HTTP codes: 200, 201, 400, 401, 403, 404, 409, 500.

# REGEX VALIDATION (in `validation.middleware.js`)
Define reusable named patterns and use them via the generic validators. At minimum:
- name: letters and spaces, 2–50 chars
- email: standard email pattern
- phone: 10-digit number (Indian format starting 6–9)
- password: min 8 chars, with upper, lower, digit and special character
- trainNumber: 5 digits
- city/station names: letters, spaces, hyphens, 2–50 chars
- date: `YYYY-MM-DD` (also check it is a real calendar date in the service or middleware)
- time: `HH:mm` 24-hour
- id / pnr / MongoDB-style safe id: alphanumeric and hyphens only
- seatNumber / age / fare: positive integers/numbers by pattern
Validators must reject unknown/malformed input with a clear field-level message, and must trim strings.

# EXECUTION PHASES (verify each before continuing)
1. **Scaffold:** `package.json`, `.env`, `.env.example`, `.gitignore`, config files, `index.js`, utils. Install only `express` and `dotenv`. Verify the server boots on the PORT from `.env`.
2. **Models + Security + Auth routes:** register/login working, token verified by `auth.middleware.js`.
3. **Trains:** model, service, controller, routes, validation. Admin CRUD works, search works.
4. **Bookings:** seat availability, booking, status check, profile with booking history.
5. **Cancellation + Refunds:** cancel flow, refund creation, admin approval, refund history in profile.
6. **Announcements** and final cleanup.
7. **Verification:** run an end-to-end smoke test script using Node's built-in `fetch` (Node 18+). Do not add a test library. Cover: register admin and customer → admin creates train → customer searches → books → checks status → cancels → admin approves refund → customer sees refund history in profile.

# ACCEPTANCE CHECKLIST (self-audit before finishing)
- [ ] `package.json` dependencies contain ONLY `express` and `dotenv`
- [ ] A search for `class ` and `this.` in `src/` returns zero matches
- [ ] Every file in `src/` matches `scenario.folderName.js`
- [ ] Model files contain no functions
- [ ] Controllers contain no business logic; services contain no `req`/`res`
- [ ] All inputs pass through the RegEx validation middleware
- [ ] `passwordHash` / `salt` never appear in any response
- [ ] Double-booking the same seat on the same date is impossible
- [ ] Customers cannot access other users' bookings or admin routes
- [ ] Global error handler returns the standard envelope for 404 and 500
- [ ] The full smoke test passes

# OUTPUT
Create all files directly in the workspace. At the end, give a short summary of what was built, the run command (`npm start`), the sample `.env`, and any assumptions you made.