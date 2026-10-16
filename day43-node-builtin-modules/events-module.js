const EventEmitter = require("events");

// Scenario 1 - Chat Application (Zoho, Google)
const chatEvent = new EventEmitter();

chatEvent.on('newMessage', (user, message) => {
    console.log(`New Message from ${user}: ${message}`);
});

chatEvent.emit('newMessage', 'Narasimhan', 'Kindly join the session');
chatEvent.emit('newMessage', 'Muthu', 'Joining');
chatEvent.emit('newMessage', 'Narasimhan', 'Noted');

// Scenario 2 - Payment Gateway (PayPal, Razorpay, UPI)
const paymentEvent = new EventEmitter();

paymentEvent.once('processPayment', (amount) => {
    console.log(`Payment of ${amount}, processed successfully`);
});

console.log("User clicked the pay button");
paymentEvent.emit('processPayment', 5000);

console.log("User clicked the pay button one more time");
paymentEvent.emit('processPayment', 5000);