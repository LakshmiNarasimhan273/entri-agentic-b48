// const numbers = [1, 2, 3, 4];

function window(numbers){
    return numbers.map((number, index) => {

        const otherNumbers = numbers.filter((_, i) => i !== index);
        // [2, 3, 4]
        // reduce
        return otherNumbers.reduce((num1, num2) => {
            return num1 * num2;
        })
    });
};

const numbers = [1, 2, 3, 4];

console.log(window(numbers));