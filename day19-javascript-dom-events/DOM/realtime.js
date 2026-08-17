const title = document.getElementById("title");
const students = document.getElementsByClassName("student");

title.textContent = "Entri Learners";

for(let i = 0; i < students.length; i++){
    students[i].textContent = `${i + 1}. ${students[i].textContent}`;
};