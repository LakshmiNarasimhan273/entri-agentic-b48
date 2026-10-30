# Task List - Train Ticket Booking System REST API

- [x] **Phase 1: Scaffold & Base Architecture**
  - [x] Initialize `package.json` with only `express` and `dotenv`
  - [x] Run `npm install`
  - [x] Create `.env`, `.env.example`, `.gitignore`
  - [x] Create `src/config/server.config.js` and `src/config/app.config.js`
  - [x] Create `src/utils/response.utils.js` and `src/utils/error.utils.js`
  - [x] Create entry point `index.js`
  - [x] Verify server boots cleanly on configured `PORT`

- [x] **Phase 2: Models + Security + Auth Routes**
  - [x] Create `src/models/user.model.js`
  - [x] Create `src/services/user.service.js`
  - [x] Create `src/security/auth.security.js` (scrypt hashing, HMAC token generator & verifier)
  - [x] Create `src/middlewares/validation.middleware.js` (generic RegEx validator)
  - [x] Create `src/middlewares/auth.middleware.js` (token authentication and role guards)
  - [x] Create `src/controllers/user.controller.js` (profile handler)
  - [x] Create `src/routes/auth.routes.js` and `src/routes/user.routes.js`
  - [x] Create `src/routes/index.routes.js`
  - [x] Verify registration (customer & admin with key) and login work with token validation

- [x] **Phase 3: Train Domain (Admin CRUD + Customer Search)**
  - [x] Create `src/models/train.model.js`
  - [x] Create `src/services/train.service.js`
  - [x] Create `src/controllers/train.controller.js`
  - [x] Create `src/routes/train.routes.js` and mount in `index.routes.js`
  - [x] Verify train creation, listing, updating, deleting (with booking check), and public search

- [x] **Phase 4: Bookings Domain**
  - [x] Create `src/models/booking.model.js`
  - [x] Create `src/services/booking.service.js` (seat availability, collision prevention, auto-assignment)
  - [x] Create `src/controllers/booking.controller.js`
  - [x] Create `src/routes/booking.routes.js` and mount in `index.routes.js`
  - [x] Update profile query in `user.service.js` to return user's booking history
  - [x] Verify seat booking, duplicate seat rejection, PNR lookup, my-bookings, admin bookings filter

- [x] **Phase 5: Cancellation & Refunds Domain**
  - [x] Create `src/models/refund.model.js`
  - [x] Create `src/services/refund.service.js` (refund calculation 90%/50% based on departure cutoff, approval/rejection)
  - [x] Create `src/controllers/refund.controller.js`
  - [x] Create `src/routes/refund.routes.js` and mount in `index.routes.js`
  - [x] Wire cancellation flow into booking controller and refund service
  - [x] Update profile query to include refund history
  - [x] Verify ticket cancellation, seat release, refund record generation, and admin processing

- [x] **Phase 6: Announcements Domain & Polishing**
  - [x] Create `src/models/announcement.model.js`
  - [x] Create `src/services/announcement.service.js`
  - [x] Create `src/controllers/announcement.controller.js`
  - [x] Create `src/routes/announcement.routes.js` and mount in `index.routes.js`
  - [x] Verify announcements CRUD and public access

- [x] **Phase 7: End-to-End Verification & Walkthrough**
  - [x] Write standalone smoke test script using Node's native `fetch` covering full customer & admin journey
  - [x] Run automated smoke test and verify 100% pass
  - [x] Audit acceptance checklist:
    - [x] Dependencies strictly express and dotenv
    - [x] Zero `class ` or `this.` anywhere in `src/`
    - [x] Strict `scenario.folderName.js` naming pattern
    - [x] Pure in-memory data holders in models
    - [x] No business logic in controllers, no req/res in services
    - [x] No passwordHash or salt leaked in responses
    - [x] Proper 404/500 envelope handling
  - [x] Produce Walkthrough artifact (`walkthrough.md`)
