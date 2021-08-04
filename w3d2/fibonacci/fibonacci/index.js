
const fib = function (number){
    
    if(number < 0){
        return 0;
    } else if(number <=2){
        return 1;
    } else {
        return fib(number - 1) + fib(number  - 2);
    }
}

module.exports = fib ;