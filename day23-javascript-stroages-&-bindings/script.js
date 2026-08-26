// Storages

// localStorage
// localStorage.setItem("username", "Narasimhan");
// localStorage.setItem("age", 29);
// const user = localStorage.getItem("username");
// console.log(user);
// localStorage.removeItem("username");
// localStorage.clear();

// sessionStorage
sessionStorage.setItem("course", "web dev");
// rest of the methods, practice by the learner and refer to the PPT

// const user = {
//     name: "Narasimhan",
//     age: 29
// };

// localStorage.setItem("user", JSON.stringify(user));
// const userdata = localStorage.getItem("user");
// const converteddata = JSON.parse(userdata)
// console.log(converteddata);

// Bindings
// subtopics - (4) - this | call() | apply() | bind()
let username = "narasimhan";

const user = {
    username: "Someone",

    welcome: function(){
        console.log("Welcome", this.username);
        console.log("Welcome", username);
    }
};

// user.welcome();

// call()
const user1 = {
    name: "John"
};

const user2 = {
    name: "David"
};

function greet(){
    console.log(this.name);
}

// greet.call(user1);
// greet.call(user2);

// call() with arguments
function welcome(city, event){
    console.log("Hello", this.name, "from", city, "for", event);
};

// welcome.call(user1, "Chennai");

// apply()
// welcome.apply(user2, ["Coimbatore", "AI Event"]);

// bind()
function sayhello(){
    console.log(this.name);
}

const result = sayhello.bind(user1);
// result();

// Prototype
// OOPS - Object Oriented Programming
function User(name, age){
    this.name = name;
    this.age = age;
    // constructor
}

User.prototype.welcome = function(){
    console.log("Hello", this.name, "you're", this.age, "old");
};

// new - it create a separate instances
const emp1 = new User("someone", 23);
const emp2 = new User("Narasimhan", 29);

console.log(emp1);
console.log(emp2);

emp1.welcome();
emp2.welcome();