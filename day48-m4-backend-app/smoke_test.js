/**
 * Complete End-to-End Smoke Test Script
 * Uses Node.js built-in fetch (no external test library)
 */
const { app, server } = require("./index.js");

const BASE_URL = "http://localhost:3000/api";

const assert = (condition, message) => {
  if (!condition) {
    throw new Error("Assertion Failed: " + message);
  }
};

const req = async (method, path, body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  const res = await fetch(BASE_URL + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json();
  return { status: res.status, body: json };
};

const runSmokeTest = async () => {
  console.log("=== Starting End-to-End Smoke Test Suite ===");

  // 1. Health Check
  console.log("\n[Test 1] Health check endpoint...");
  const health = await req("GET", "/health");
  assert(health.status === 200, "Health check status 200");
  assert(health.body.success === true, "Health success true");
  console.log("✓ Health check OK");

  // 2. Global 404 Handler
  console.log("\n[Test 2] Global 404 handler...");
  const notFound = await req("GET", "/unmapped-endpoint");
  assert(notFound.status === 404, "404 handler status 404");
  assert(notFound.body.success === false, "404 success false");
  console.log("✓ 404 Envelope OK");

  // 3. Register Admin with valid key
  console.log("\n[Test 3] Admin registration with valid admin key...");
  const regAdmin = await req("POST", "/auth/register", {
    name: "Master Admin",
    email: "master.admin@railway.gov.in",
    phone: "9876543210",
    password: "Admin@Password2026",
    role: "admin",
    adminKey: "ADMIN_SECRET_KEY_9999"
  });
  assert(regAdmin.status === 201, "Admin registration status 201");
  assert(regAdmin.body.data.user.role === "admin", "Admin role confirmed");
  assert(!regAdmin.body.data.user.passwordHash, "No passwordHash in response");
  assert(!regAdmin.body.data.user.salt, "No salt in response");
  const adminToken = regAdmin.body.data.token;
  console.log("✓ Admin registered OK");

  // 4. Admin registration without key (expect 403)
  console.log("\n[Test 4] Admin registration without key rejection...");
  const badAdminReg = await req("POST", "/auth/register", {
    name: "Fake Admin",
    email: "fake.admin@railway.gov.in",
    phone: "9876543211",
    password: "Admin@Password2026",
    role: "admin"
  });
  assert(badAdminReg.status === 403, "Rejected admin without key with 403");
  console.log("✓ Admin without key rejected with 403 OK");

  // 5. Register Customer One
  console.log("\n[Test 5] Customer One registration...");
  const regCust1 = await req("POST", "/auth/register", {
    name: "Alice Passenger",
    email: "alice.passenger@example.com",
    phone: "9123456780",
    password: "Customer@Password2026"
  });
  assert(regCust1.status === 201, "Customer 1 registration status 201");
  assert(regCust1.body.data.user.role === "customer", "Customer role confirmed");
  const cust1Token = regCust1.body.data.token;
  const cust1Id = regCust1.body.data.user.id;
  console.log("✓ Customer One registered OK");

  // 6. Register Customer Two
  console.log("\n[Test 6] Customer Two registration...");
  const regCust2 = await req("POST", "/auth/register", {
    name: "Bob Passenger",
    email: "bob.passenger@example.com",
    phone: "9123456781",
    password: "Customer@Password2026"
  });
  assert(regCust2.status === 201, "Customer 2 registration status 201");
  const cust2Token = regCust2.body.data.token;
  console.log("✓ Customer Two registered OK");

  // 7. Duplicate email rejection (expect 409)
  console.log("\n[Test 7] Duplicate email registration rejection...");
  const dupEmail = await req("POST", "/auth/register", {
    name: "Alice Duplicate",
    email: "alice.passenger@example.com",
    phone: "9123456782",
    password: "Customer@Password2026"
  });
  assert(dupEmail.status === 409, "Duplicate registration rejected with 409");
  console.log("✓ Duplicate email rejected with 409 OK");

  // 8. Customer Login
  console.log("\n[Test 8] Customer login...");
  const loginRes = await req("POST", "/auth/login", {
    email: "alice.passenger@example.com",
    password: "Customer@Password2026"
  });
  assert(loginRes.status === 200, "Login status 200");
  assert(loginRes.body.data.token, "Login returns JWT token");
  assert(!loginRes.body.data.user.passwordHash, "No passwordHash leaked on login");
  console.log("✓ Customer login OK");

  // 9. Admin creates Train
  console.log("\n[Test 9] Admin creates new train...");
  const createTrainRes = await req(
    "POST",
    "/trains",
    {
      trainNumber: "12951",
      name: "Mumbai Tejas Rajdhani",
      source: "Mumbai Central",
      destination: "New Delhi",
      departureTime: "17:00",
      arrivalTime: "08:32",
      totalSeats: 10,
      farePerSeat: 2150,
      runningDays: [0, 1, 2, 3, 4, 5, 6]
    },
    adminToken
  );
  assert(createTrainRes.status === 201, "Train created status 201");
  const trainId = createTrainRes.body.data.id;
  console.log(`✓ Train created OK (ID: ${trainId})`);

  // 10. Customer searches train
  console.log("\n[Test 10] Customer searches train with travel date...");
  const travelDate = "2026-11-25";
  const searchRes = await req(
    "GET",
    `/trains?source=mumbai central&destination=new delhi&travelDate=${travelDate}`,
    null,
    cust1Token
  );
  assert(searchRes.status === 200, "Search status 200");
  assert(searchRes.body.data.length === 1, "Found matching train");
  assert(searchRes.body.data[0].availableSeats === 10, "Initial available seats = 10");
  console.log("✓ Customer train search OK (Available seats: 10)");

  // 11. Customer One books 2 seats (seat auto-assign + preferred seat 7)
  console.log("\n[Test 11] Customer One books 2 seats (1 auto, seat 7 preferred)...");
  const bookRes = await req(
    "POST",
    "/bookings",
    {
      trainId,
      travelDate,
      passengers: [
        { name: "Alice Passenger", age: 30, gender: "F" },
        { name: "Charlie Friend", age: 32, gender: "M", seatNumber: 7 }
      ]
    },
    cust1Token
  );
  assert(bookRes.status === 201, "Booking created status 201");
  const booking = bookRes.body.data;
  assert(booking.status === "CONFIRMED", "Booking status CONFIRMED");
  assert(booking.totalFare === 4300, "Total fare correctly calculated (2 * 2150 = 4300)");
  assert(booking.passengers[0].seatNumber === 1, "Auto-assigned seat is 1");
  assert(booking.passengers[1].seatNumber === 7, "Preferred seat is 7");
  console.log(`✓ Booking confirmed (PNR: ${booking.pnr}, Seats: 1, 7)`);

  // 12. Seat Collision Protection: Customer Two attempts to book seat 7
  console.log("\n[Test 12] Double-booking seat 7 collision check (expect 409)...");
  const collisionBooking = await req(
    "POST",
    "/bookings",
    {
      trainId,
      travelDate,
      passengers: [{ name: "Bob Passenger", age: 28, gender: "M", seatNumber: 7 }]
    },
    cust2Token
  );
  assert(collisionBooking.status === 409, "Double booking rejected with 409");
  console.log("✓ Seat collision rejected with 409 Conflict OK");

  // 13. Dynamic Availability Check
  console.log("\n[Test 13] Dynamic seat count verification...");
  const searchAfterBook = await req(
    "GET",
    `/trains?source=mumbai central&destination=new delhi&travelDate=${travelDate}`,
    null,
    cust1Token
  );
  assert(searchAfterBook.body.data[0].availableSeats === 8, "Available seats decremented to 8");
  console.log("✓ Available seats dynamically updated to 8 OK");

  // 14. Booking Status Check by ID and PNR
  console.log("\n[Test 14] Customer One verifies booking status by ID and PNR...");
  const getById = await req("GET", `/bookings/${booking.id}`, null, cust1Token);
  assert(getById.status === 200, "Get booking by ID status 200");
  assert(getById.body.data.pnr === booking.pnr, "PNR matches");

  const getByPnr = await req("GET", `/bookings/pnr/${booking.pnr}`, null, cust1Token);
  assert(getByPnr.status === 200, "Get booking by PNR status 200");
  assert(getByPnr.body.data.id === booking.id, "Booking ID matches");
  console.log("✓ Booking status query by ID and PNR OK");

  // 15. Cross-customer Access Control (Customer Two cannot access Customer One's booking)
  console.log("\n[Test 15] Cross-customer access control check (expect 403)...");
  const forbiddenAccess = await req("GET", `/bookings/${booking.id}`, null, cust2Token);
  assert(forbiddenAccess.status === 403, "Cross-customer access rejected with 403");
  console.log("✓ Cross-customer access rejected with 403 OK");

  // 16. Customer One cancels booking (>24 hours departure -> 90% refund)
  console.log("\n[Test 16] Customer One cancels booking (>24h cutoff)...");
  const cancelRes = await req("PATCH", `/bookings/${booking.id}/cancel`, null, cust1Token);
  assert(cancelRes.status === 200, "Cancellation status 200");
  assert(cancelRes.body.data.booking.status === "CANCELLED", "Booking status CANCELLED");
  assert(cancelRes.body.data.booking.refundStatus === "PENDING", "Booking refundStatus PENDING");
  assert(
    cancelRes.body.data.refund.amount === 3870,
    "90% refund calculated correctly (4300 * 0.9 = 3870)"
  );
  const refundId = cancelRes.body.data.refund.id;
  console.log(`✓ Booking cancelled and refund created (Refund ID: ${refundId}, Amount: 3870)`);

  // 17. Seat freed verification: Customer Two can now book seat 7
  console.log("\n[Test 17] Freed seat re-booking check...");
  const rebookRes = await req(
    "POST",
    "/bookings",
    {
      trainId,
      travelDate,
      passengers: [{ name: "Bob Passenger", age: 28, gender: "M", seatNumber: 7 }]
    },
    cust2Token
  );
  assert(rebookRes.status === 201, "Customer Two successfully booked freed seat 7");
  console.log("✓ Freed seat 7 successfully re-booked by another customer OK");

  // 18. Admin lists pending refunds
  console.log("\n[Test 18] Admin lists pending refunds...");
  const pendingRefunds = await req("GET", "/refunds?status=PENDING", null, adminToken);
  assert(pendingRefunds.status === 200, "Admin refund list status 200");
  assert(
    pendingRefunds.body.data.some((r) => r.id === refundId),
    "Pending refund found in admin list"
  );
  console.log("✓ Admin pending refunds list OK");

  // 19. Admin approves refund
  console.log("\n[Test 19] Admin approves refund...");
  const approveRes = await req(
    "PATCH",
    `/refunds/${refundId}/process`,
    {
      decision: "APPROVED",
      remarks: "Processed via automated bank transfer"
    },
    adminToken
  );
  assert(approveRes.status === 200, "Refund approval status 200");
  assert(approveRes.body.data.refund.status === "APPROVED", "Refund status APPROVED");
  assert(approveRes.body.data.booking.refundStatus === "APPROVED", "Linked booking refundStatus APPROVED");
  console.log("✓ Refund approved by admin OK");

  // 20. Admin cannot re-process already processed refund (expect 409)
  console.log("\n[Test 20] Re-processing approved refund check (expect 409)...");
  const reProcess = await req(
    "PATCH",
    `/refunds/${refundId}/process`,
    { decision: "REJECTED" },
    adminToken
  );
  assert(reProcess.status === 409, "Re-processing refund rejected with 409");
  console.log("✓ Re-processing refund rejected with 409 OK");

  // 21. Customer One profile shows full history
  console.log("\n[Test 21] Customer One profile verification...");
  const profileRes = await req("GET", "/users/profile", null, cust1Token);
  assert(profileRes.status === 200, "Profile status 200");
  assert(profileRes.body.data.user.id === cust1Id, "Profile user ID matches");
  assert(profileRes.body.data.bookings.length === 1, "Profile contains 1 booking");
  assert(profileRes.body.data.bookings[0].refundStatus === "APPROVED", "Profile booking refundStatus APPROVED");
  assert(profileRes.body.data.refunds.length === 1, "Profile contains 1 refund");
  assert(profileRes.body.data.refunds[0].status === "APPROVED", "Profile refund status APPROVED");
  console.log("✓ Customer profile with booking and refund history verified OK");

  // 22. Community Announcements Flow
  console.log("\n[Test 22] Community Announcements flow...");
  // Public reads empty announcements
  const publicAnn1 = await req("GET", "/announcements");
  assert(publicAnn1.status === 200, "Public announcements status 200");

  // Admin posts announcement
  const createAnn = await req(
    "POST",
    "/announcements",
    {
      title: "Monsoon Schedule Adjustment",
      message: "Train speeds adjusted for monsoon safety on Western Ghats section.",
      trainId
    },
    adminToken
  );
  assert(createAnn.status === 201, "Announcement created status 201");
  const annId = createAnn.body.data.id;

  // Public reads created announcement
  const publicAnn2 = await req("GET", "/announcements");
  assert(publicAnn2.body.data.length >= 1, "Announcement visible to public");

  // Admin updates announcement
  const updateAnn = await req(
    "PUT",
    `/announcements/${annId}`,
    { title: "Updated Monsoon Schedule Adjustment" },
    adminToken
  );
  assert(updateAnn.status === 200, "Announcement updated status 200");

  // Admin deletes announcement
  const deleteAnn = await req("DELETE", `/announcements/${annId}`, null, adminToken);
  assert(deleteAnn.status === 200, "Announcement deleted status 200");
  console.log("✓ Community Announcements CRUD and public access verified OK");

  // 23. Train deletion protection (Train has CONFIRMED future booking from Customer Two -> expect 409)
  console.log("\n[Test 23] Train deletion protection with active confirmed bookings...");
  const deleteBlocked = await req("DELETE", `/trains/${trainId}`, null, adminToken);
  assert(deleteBlocked.status === 409, "Train deletion blocked with 409");
  console.log("✓ Train deletion blocked with 409 Conflict OK");

  console.log("\n========================================================");
  console.log("🎉 ALL 23 SMOKE TESTS PASSED CLEANLY WITH ZERO ERRORS!");
  console.log("========================================================\n");
};

runSmokeTest()
  .then(() => {
    server.close(() => {
      console.log("Test server closed successfully.");
      process.exit(0);
    });
  })
  .catch((err) => {
    console.error("\n❌ Smoke Test Failed with Error:", err);
    server.close(() => {
      process.exit(1);
    });
  });

