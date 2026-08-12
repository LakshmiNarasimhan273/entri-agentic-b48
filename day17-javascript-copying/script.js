const original = {
    name: "narasimhan",
    age: 29
};

const draft = original;
draft.name = "Someone";
console.log("draft", draft);
console.log("original", original);

// Shallow Copy
// A shallow copy creates a new outer object, but nested objects may still share the same reference.
const user = {
    name: "Narasimhan",
    age: 29
};
// shallow copy (inbuild operator) - special symbol - ... (spread operator)

const copiedData = {...user};

copiedData.age = 24;

console.log(copiedData);
console.log(user);

// Shallow copy - DRAWBACK
const learner = {
    name: "Narasimhan",
    age: 29,
    address: {
        city: "Kumbakonam",
        state: "TN"
    }
};

const copiedLearner = {...learner};

copiedLearner.age = 27;

copiedLearner.address.city = "Thanjavur";

console.log("original", learner);
console.log("copy", copiedLearner);

// Deep copy
// A deep copy creates a completely independent copy of an object, including its nested objects.
const user1 = {
    name: "Arun",
    age: 25,
    address: {
        city: "Coimbatore",
        state: "TN"
    }
};

// structuredClone() - inbuild function in javascript to make a deep copy of your objects
const user2 = structuredClone(user1);
user2.name = "Narasimhan";
user2.address.city = "Kumbakonam";

console.log("Original", user1);
console.log("Copy", user2);

// Real-time scenario: Amazon Status update using deep copy
const order = {
    orderId: 101,

    customer: {
        name: "Narasimhan",
        city: "Kumbakonam"
    },
    product: {
        title: "Laptop",
        price: 50000
    },

    status: {
        current: "Shipped",
        payment: true,
        type: "Online"
    }
};

// interview requirements 
// 1 - change the city
// 2 - change the status

// create an independent copy(deep copy)
const updatedOrder = structuredClone(order);

updatedOrder.customer.city = "Chennai";
updatedOrder.status.current = "Delivered";

console.log("Last Order Status", order);
console.log("Current Order Status", updatedOrder);