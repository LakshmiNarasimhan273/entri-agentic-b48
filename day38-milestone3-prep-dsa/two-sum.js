// const numbers = [2, 7, 11, 15];
// const target = 9; 

function twoSum(numbers, target){
    for(let i = 0; i < numbers.length; i++){
        for(let j = i + 1; j < numbers.length; j++){
            if(numbers[i] + numbers[j] === target){
                return [numbers[i], numbers[j]];
            }
        }
    }
    return []; // traditional exception handling
};

const numbers = [2, 7, 11, 15];
const target = 9; 

console.log(twoSum(numbers, target));