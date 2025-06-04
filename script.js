function add (a, b) {
    return a + b;
};

function subtract (a, b) {
    return a - b;
};

function multiply (a, b) {
    return a * b;
};

function divide (a, b) {
    return a / b;
};

let firstNum = null;
let secondNum = null;
let operator = null;
let lastKey = null;

function operate(a, b, operator) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
};

// Global variable for display value and display DOM element
let displayValue = '';
const display = document.querySelector('.display');

// Update displayValue based off number click
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener('click', (e) => {
        const num = e.target.dataset.number;
        // Reset display if last input was an operator and no second input yet
        if (lastKey === 'operator' && secondNum === null) {
            displayValue = '';
            display.textContent = displayValue;
        }
        displayValue += num;
        display.textContent = displayValue;

        lastKey = 'number';
    });
});

// Handle equal button logic
document.querySelector(".equal").addEventListener('click', (e) => {
    if (firstNum !== null && operator !== null) {
        secondNum = Number(displayValue);
        firstNum = operate(firstNum, secondNum, operator);
        secondNum = null;
        operator = null;
        displayValue = firstNum;
        display.textContent = displayValue;
    }
});


// Handle operator button logic
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener('click', (e) => {
        const op = e.target.dataset.operator;


        // When there is already an operator selected, and only first number is in
        if (lastKey === 'operator' && secondNum === null) {
            operator = op;
            displayValue = op;
            display.textContent = displayValue;
            return;
        }
        // When no operator selected yet, and only first number is in
        if (secondNum === null) {
            firstNum = Number(displayValue);
            // assign operator with operator's dataset value
            operator = op;
            displayValue = op;
            display.textContent = displayValue;
        // When operator is selected with both numbers in
        } else {
            secondNum = Number(displayValue);
            firstNum = operate(firstNum, secondNum, op);
            secondNum = null;
            displayValue = firstNum + op;
            display.textContent = displayValue;
        }
        lastKey = 'operator';
    });
});

