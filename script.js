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

// Global variables 
let firstNum = null;
let secondNum = null;
let operator = null;
let lastKey = null;
let selectedOpButton = null;
let displayValue = '';
const display = document.querySelector('.display');

// For trouble shooting
let lastKeyPressed = null;

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

// Update displayValue based off number click
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener('click', (e) => {
        const num = e.target.dataset.number;
        // Reset display if last input was an operator and no second input yet
        if (lastKey === 'operator' && secondNum === null) {
            resetButton(selectedOpButton);
            displayValue = '';
            display.textContent = displayValue;
        }
        // Reset everything if last input was equal and number is input
        if (lastKey === 'equal') {
            firstNum = null;
            secondNum = null;
            lastOperator = null;
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
    if (firstNum !== null && operator !== null && lastKey === 'number') {
        secondNum = Number(displayValue);
        firstNum = operate(firstNum, secondNum, operator);

        secondNum = null;
        operator = null;
        
        displayValue = firstNum;
        display.textContent = displayValue;

        lastKey = 'equal';
    }
});

// Helper function to make operator button active
function highlightButton (buttonElement) {
    selectedOpButton = buttonElement;
    buttonElement.style.backgroundColor = 'yellow';
}

// Helper function to make operator button inactive
function resetButton (buttonElement) {
    selectedOpButton = null;
    // Will need to change this 
    buttonElement.style.backgroundColor = 'white'
}

// Handle operator button logic
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener('click', (e) => {
        const op = e.target.dataset.operator;

        // First time pressing operator button with valid value for first number
        if (lastKey === 'number' && firstNum === null && operator === null) {
            highlightButton(e.target);
            firstNum = Number(displayValue);
            operator = op;
        // Evalute when first number and operator are present 
        } else if (firstNum !== null && operator !== null && lastKey === 'number') {
            highlightButton(e.target);
            secondNum = Number(displayValue);
            firstNum = operate(firstNum, secondNum, operator);
            secondNum = null;
            operator = op;

            displayValue = firstNum;
            display.textContent = displayValue;
        // Change active operator
        } else if (lastKey === 'operator') {
            resetButton(selectedOpButton);
            highlightButton(e.target);
            operator = op;
        // Pressing operator button after equal button
        } else if (lastKey = 'equal') {
            highlightButton(e.target);
            operator = op;
        }

        lastKey = 'operator';
    });
});

// Clear button logic
document.querySelector('.clear').addEventListener('click', (e) => {
    displayValue = '';
    display.textContent = displayValue;
    firstNum = null;
    secondNum = null;
    operator = null;
    lastKey = null;
    lastKeyPressed = null;
    if (selectedOpButton !== null) resetButton(selectedOpButton);
    selectedOpButton = null;
});

//For debugging, get rid of all intances of "lastKeyPressed"
document.querySelectorAll('button').forEach(but => {
    but.addEventListener('click', (e) => {
        lastKeyPressed = e.target.textContent;  // Or use e.target.dataset.value
    });
});

// Delete button
document.querySelector('.delete').addEventListener('click', () => {
    if (displayValue !== '' && selectedOpButton === null) {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
    }
});

