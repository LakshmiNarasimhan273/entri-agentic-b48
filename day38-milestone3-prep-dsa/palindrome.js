// str = malayalam
// str = hello

function isPalindrome(text){
    let reversedText = text.split("").reverse().join("");

    return text === reversedText;
}

console.log(isPalindrome("malayalam")); // true
console.log(isPalindrome("hello")); // false