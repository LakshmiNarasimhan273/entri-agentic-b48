const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // basic validation
    if(username === "" || password === ""){
        document.getElementById("result").textContent = "All fields are required";
        return;
    }

    document.getElementById("result").textContent = "Registration Successful";
});