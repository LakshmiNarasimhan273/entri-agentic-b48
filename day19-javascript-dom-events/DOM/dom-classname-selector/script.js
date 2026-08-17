const course = document.getElementsByClassName("course");

console.log(course);
console.log(course.length);

for(let i = 0; i < course.length; i++){
    course[i].style.color = "Blue";
    course[i].style.fontWeight = "bold";
}