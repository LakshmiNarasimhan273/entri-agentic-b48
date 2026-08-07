// Scope

// basic level example
let username = "Narasimhan";

function welcome(){
    console.log(username);
    var message = "Welcome user";
    // let message = "Welcome user";
    // const message = "Welcome user";
};

welcome();

// console.log(message);

// Conditional scope
var username1 = "arun";

if(true){
    var username1 = "someone";
}

console.log(username1);

// Scope Chain
let company = "Entri";

function employeeDetails(){
    // current scope
    let team = "Mentor";

    function showEmployees(){
        // current scope
        let employee = "Narasimhan";

        console.log(employee);
        console.log(team);
        console.log(company);
    }

    showEmployees();
}

employeeDetails();

// Interview problem
// Scope Priority
let activity = "Doom scroll";

function reality(){
    let activity = "Learn concepts";

    console.log(activity);
}

reality();