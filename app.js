const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = function (num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}
let chosenOperator = '';
let first = 1;
let second = 3;
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const evaluateBtn = document.querySelector("#evaluate");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const numbers = document.querySelectorAll(".number");

addBtn.addEventListener("click", function () {
    if (!chosenOperator) {
        chosenOperator = "+";
    }
    else {
        first = operate(first, chosenOperator, second);
        chosenOperator = "+";
        console.log(first);
    }

});
subtractBtn.addEventListener("click", function () {
    if (!chosenOperator) {
        chosenOperator = "-";
    }
    else {
        first = operate(first, chosenOperator, second);
        chosenOperator = "-";
        console.log(first);
    }
});

multiplyBtn.addEventListener("click", function () {
    if (!chosenOperator) {
        chosenOperator = "*";
    }
    else {
        first = operate(first, chosenOperator, second);
        chosenOperator = "*";
        console.log(first);
    }
});

divideBtn.addEventListener("click", function () {
    if (!chosenOperator) {
        chosenOperator = "/";
    }
    else {
        first = operate(first, chosenOperator, second);
        chosenOperator = "/";
        console.log(first);
    }
});

evaluateBtn.addEventListener("click", function () {
    console.log(operate(first, chosenOperator, second));
    chosenOperator = '';

});
numbers.forEach(number => {
    number.addEventListener("click", function (e) {
        if (!chosenOperator) {
            newNumber
            first = Number(e.target.innerText);

        } else {
            second = Number(e.target.innerText);

        }
    })
})