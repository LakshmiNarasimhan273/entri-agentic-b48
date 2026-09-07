// Async & Await
const btn = document.getElementById("loadProducts");

btn.addEventListener("click", async function() {
    const productContainer = document.getElementById("container");
    // const productContainer = document.querySelector("#container");

    productContainer.textContent = "Loading..."

    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    productContainer.textContent = "";

    products.forEach(data => {
        productContainer.innerHTML += `
            <div>
                <h3>${data.title}</h3>
                <p>${data.price}</p>
                <p>${data.rating.rate}</p>
                </div>
                <hr>
                `
            });
            // <div>${data.colors.forEach(color => {
            //         <p>${color}</p>
            // })}</div>
});

// Deep Copy
const user = {
  name: "Narasimhan",
  address: {
    city: "Coimbatore",
    pincode: 641001
  },
  cart: [
    {
      product: "Laptop",
      price: 55000,
      quantity: 1
    },
    {
        product: "Mobile",
        price: 20000,
        quantity: 2
    }
  ]
};

const copiedUser = structuredClone(user);

// update copied data
copiedUser.address.city = "Chennai";
copiedUser.cart[0].price = 60000;

console.log("Original data", user);
console.log("Duplicate data", copiedUser);

// bind()
const product = {
    name: "Laptop",
    price: 50000
};

function showProduct(){
    console.log(`${this.name} - ${this.price}`);
};

const result = showProduct.bind(product);
result();

// prototype - OOPS - inheritance
function Master(name, price){
    // construct
    this.name = name;
    this.price = price;
};

Master.prototype.getDetails = function(){
    console.log(`${this.name}, ${this.price}`);
};

Master.prototype.applyDiscount = function(discount){
    this.price = this.price - (this.price * discount) / 100;
};

const laptop = new Master("Laptop", 50000);
const mobile = new Master("Mobile", 20000);

laptop.getDetails();
laptop.applyDiscount(10);
laptop.getDetails();

// map

const fruits = ["apple", "banana", "cherry"];

// push
fruits.push("Jack fruit");
fruits.unshift("Green apple");

fruits.forEach(data => console.log(data));
fruits.map(data => console.log(data));

console.log(fruits[4]);

// filter()
const products = [
  { name: "Laptop", price: 50000 },
  { name: "Mobile", price: 25000 },
  { name: "Headphones", price: 3000 }
];

const filteredData = products.filter(data => {
    return data.price > 30000;
});

console.log(filteredData);

// Duplicate findings
const dupProducts = [
  "Laptop",
  "Mobile",
  "Headphones",
  "Laptop",
  "Mouse",
  "Mobile",
  "Keyboard"
];

const duplicates = dupProducts.filter((product, index) => {
    return dupProducts.indexOf(product) !== index;
});

console.log(duplicates);

const emp = [
    {name: "someone", working: false},
    {name: "narasimhan", working: true}
];

const active = emp.filter(data => {
    return data.working === true
});

console.log(active);

const Samplefruits = ["Apple", "banana","mango"];

console.log(Samplefruits);
console.log(Samplefruits[2]); // print of data 
console.log(Samplefruits[1]);

// counts of array data
console.log(Samplefruits.length);

// add the data in array 

Samplefruits.push("orange");

console.log(Samplefruits[3]);