const isTooLong = function (number) {
    if (number % 1 == 0) {
        return false;
    } else if (number.toString().split(".")[1].length < 4) {
        return false;
    } else {
        return true;
    }

}

//Evaluation functions
const add = function (a, b) {
    let sum = a + b;
    return (!isTooLong(sum)) ? sum : sum.toFixed(4);
}
const subtract = function (a, b) {
    let difference = a - b;
    return (!isTooLong(difference)) ? difference : difference.toFixed(4);
}
const multiply = function (a, b) {
    let product = a * b;
    return (!isTooLong(product)) ? product : product.toFixed(4);
}
const divide = function (a, b) {
    if (b === 0) {
        return "STOP THAT";
    } else {
        let quotient = a / b;
        return (!isTooLong(quotient)) ? quotient : quotient.toFixed(4);
    }
}

const operate = function (equation) {
    let action = '';
    if (equation.length > 2) {
        if (equation.indexOf(" ") != -1) {
            action = equation.split(" ");
        }
    }
    let a = Number(action[0]);
    let b = Number(action[2]);
    let operator = action[1];
    if (operator == '+') {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "X") {
        return multiply(a, b);
    } else if (operator == "/") {
        return divide(a, b);
    }
}

//Pull document elements
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clearBtn = document.querySelector("#clear");
const decimalBtn = document.querySelector("#decimal");
const negativeBtn = document.querySelector("#negative");
const display = document.querySelector("#display");
const sqrt = document.querySelector("#sqrt");
const square = document.querySelector("#square");

//Set display value
let displayValue = '';

//single button functions


const clear = function () {
    displayValue = '';
    decimalBtn.disabled = false;
    negativeBtn.disabled = false;
    display.innerText = displayValue;
}

//buttons with a single function
clearBtn.addEventListener("click", clear);
square.addEventListener("click", function () {
    if (displayValue && displayValue.toString().indexOf(" ") == -1) {
        let squaredValue = Number(displayValue) * Number(displayValue);
        if (isTooLong(squaredValue)) {
            displayValue = squaredValue.toFixed(4).toString();
        }
        else {
            displayValue = squaredValue.toString();
        }
        display.innerText = displayValue;
    }
});

sqrt.addEventListener("click", function () {
    if (displayValue && displayValue.toString().indexOf(" ") == -1) {
        let squareRootValue = Math.sqrt(Number(displayValue));
        if (isTooLong(squareRootValue)) {
            displayValue = squareRootValue.toFixed(6).toString();
        } else {
            displayValue = squareRootValue.toString();
        }
        display.innerText = displayValue;
    }
})

//Add event listeners to all numbers to put inner text in display value
numbers.forEach(number => {
    number.addEventListener("click", function (e) {
        displayValue += e.target.innerText;
        display.innerText = displayValue;
        if (e.target.innerText == ".") {
            decimalBtn.disabled = true;
        }
        if (e.target.innerText == "-") {
            negativeBtn.disabled = true;
        }
    });
});

//Add event listeners to all operators
operators.forEach(operator => {
    operator.addEventListener("click", function (e) {
        decimalBtn.disabled = false;
        negativeBtn.disabled = false;
        if (e.target.innerText == '=') {
            if (operate(displayValue) != undefined) {
                displayValue = operate(displayValue);
                display.innerText = displayValue;
            }
        }
        else if (typeof operate(displayValue) == 'number') {
            displayValue = operate(displayValue);
            displayValue += ` ${e.target.innerText} `;
            display.innerText = displayValue;
        } else {
            displayValue += ` ${e.target.innerText} `;
            display.innerText = displayValue;
        }

    })
})