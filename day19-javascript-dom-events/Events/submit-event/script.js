const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const message = document.getElementById("message");

form.addEventListener("submit", function(e){

    e.preventDefault();

    message.textContent = `Hi ${username.value}, your registration got confirmed`;
});