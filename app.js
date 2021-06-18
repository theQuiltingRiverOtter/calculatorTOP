
//cut off decimals after four decimal values
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
const toPower = function (a, b) {
    let answer = a ** b;
    return (!isTooLong(answer)) ? answer : answer.toFixed(4);
}
const divMod = function (a, b) {
    let quotient = Math.floor(a / b);
    let modulus = a % b;
    return `${quotient}  -  ${modulus}`
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
    } else if (operator == "X" || operator == 'x' || operator == '*') {
        return multiply(a, b);
    } else if (operator == "/") {
        return divide(a, b);
    } else if (operator == "xy" || operator == 'y') {
        return toPower(a, b);
    } else if (operator = '/%') {
        return divMod(a, b);
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
const deleteBtn = document.querySelector("#delete");
const powerOf = document.querySelector("#powerOf");
const random = document.querySelector("#random");

powerOf.addEventListener("click", function (e) {
    console.log(e.target.innerText);
})

//Set display value
let displayValue = '';

//single button functions
const getRandom = function () {
    let max = Number(prompt("Please enter the maximum value for a random number"));
    let randomNumber = Math.floor(Math.random() * max + 1);
    displayValue = randomNumber.toString();
    display.innerText = displayValue;
}

const clear = function () {
    displayValue = '';
    decimalBtn.disabled = false;
    negativeBtn.disabled = false;
    display.innerText = displayValue;
}

const deleteLast = function () {
    if (displayValue.length <= 1) {
        displayValue = '';
        display.innerText = displayValue;
    } else {
        let newString = displayValue.split('');
        newString.pop()
        displayValue = newString.join('');
        display.innerText = displayValue;
    }
}


const addOperators = function (e) {
    decimalBtn.disabled = false;
    negativeBtn.disabled = false;
    if (e.target.innerText == '=') {
        if (operate(displayValue) != undefined) {
            displayValue = operate(displayValue).toString();
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

}

//buttons with a single function
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteLast);
random.addEventListener("click", getRandom);
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
    operator.addEventListener("click", addOperators)
});


//Keyboard functions
window.addEventListener("keydown", function (e) {
    if (Number(e.key) || e.key == '0' || e.key == '.') {
        displayValue += e.key;
        display.innerText = displayValue;
    } else if (e.key == '=' || e.key == "Enter") {
        displayValue = operate(displayValue).toString();
        display.innerText = displayValue;
    } else if (e.key == '-' || e.key == '*' || e.key == 'X' || e.key == '/' || e.key == '+') {
        displayValue += ` ${e.key} `;
        display.innerText = displayValue;
    } else {
        console.log(e.key);
    }

})