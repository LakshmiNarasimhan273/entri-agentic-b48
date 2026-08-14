// Problem 1 - Function that returns nothing

function calculateTotal(a, b){
    // console.log(a + b);
    return a + b;
}

let result = calculateTotal(5, 5);
console.log(result);

// Problem 2 - Functions calls happens too early
console.log(multiply(3, 5));

function multiply (a, b){
    return a * b;
};

// Problem 3 - The Function changes the original object

function updateName(user){
    return {
        ...user,
        name: "Someone"
    }
};

const person = {
    name: "Narasimhan"
};

const updatedPerson = updateName(person);

console.log(person.name);
console.log(updatedPerson.name);

// Interview Problem: Cart Logic

// Given Data

const cart = [
    {
        name: "Laptop",
        price: 50000,
        quantity: 1,
        inStock: true
    },
    {
        name: "Mouse",
        price: 1000,
        quantity: 3,
        inStock: true
    },
    {
        name: "Keyboard",
        price: 2000,
        quantity: 1,
        inStock: false
    }
];

function processCart(cart){
    const updatedCart = structuredClone(cart);
    const finalCart = [];

    for(let i = 0; i < updatedCart.length; i++){
        const product = updatedCart[i];

        // Remove out-of-stock products
        if(!product.inStock){
            continue;
        }

        // Apply 10% discount for quantity >= 3
        if(product.quantity >= 3){
            product.price = product.price * 0.90
        }

        // Calculate total
        product.total = product.price * product.quantity;

        finalCart.push(product);

    }
    return finalCart;

}

const output = processCart(cart);
console.log(output);