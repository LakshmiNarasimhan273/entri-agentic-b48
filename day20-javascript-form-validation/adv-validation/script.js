const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // regEx pattern validation
    // Regular Expression (or) RegEx
    // regEx - syntax
    // /^pattern$/;
    // pattern - (validation area) - [A-Za-z]
    const usernamePattern = /^[A-Za-z]{3,20}$/;

    const emailPattern = /^[A-Za-z0-9._-]+@[a-zA-Z]+\.[a-z]{2,}$/;

    // narasimhan123@gmail.com
    // someone@mail.com
    // someone@zoho.co
    // lakshmin.ns@entri.me
    // someone@outlook.com

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

    // bollean - true(while it matches) | false (not matches)
    if(!usernamePattern.test(username)){
        document.getElementById("result").textContent = "Username must contains 3-15 letters";
        return;
    }

    if(!emailPattern.test(email)){
        document.getElementById("result").textContent = "Please enter a valid email address";
        return;
    }

    if(!passwordPattern.test(password)){
        document.getElementById("result").textContent = "Password must contain 8+ characters";
        return;
    }

    document.getElementById("result").textContent = "Registration Successful";

})