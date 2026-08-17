const course = document.getElementById("course");
const result = document.getElementById("result");

course.addEventListener("change", function(){
    result.textContent = `You Selected ${course.value}`;
});