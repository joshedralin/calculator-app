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
    return a * b;
};

let firstNum;
let secondNum;
let operator;

function operate(a, b, operator) {
    switch(operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
    }
};

// Global variable for display value
let displayValue = '';

// Update displayValue based off number click
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener('click', (e) => {
        displayValue += e.target.dataset.number;
        // console.log(displayValue);
    });
});