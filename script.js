const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

// Global variables 
let firstNum = null;
let secondNum = null;
let operator = null;
let lastKey = null;
let selectedOpButton = null;
let decimalPresent = false;
let displayValue = '';
const display = document.querySelector('.display');

// For trouble shooting
let lastKeyPressed = null;

// Operate on two numbers with selected operator
function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);

    switch(operator) {
        case '+':
            return formatNumber(add(a, b));
        case '-':
            return formatNumber(subtract(a, b));
        case '*':
            return formatNumber(multiply(a, b));
        case '/':
            if (b === 0) {
                alert("Really? You should know better. Resetting calculator silly goose.");
                clearAll();
                return;
            }
            return formatNumber(divide(a, b));
    }
};

// Clean up result so it fits on display 
function formatNumber(num) {
    // Round number if neccessary to 13 digits at most
    num = parseFloat(num.toFixed(13));
    // If number is still bigger than 13 digits, show scientific notation
    return num.toString().length > 15 ? num.toExponential(6) : num;
}


// Update displayValue based off number click
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener('click', (e) => {
        const num = e.target.dataset.number;
        // Reset display if last input was an operator and no second input yet
        if (lastKey === 'operator' && secondNum === null) {
            resetButton(selectedOpButton);
            displayValue = '';
            display.textContent = displayValue;
            decimalPresent = false;
        }
        // Reset everything if last input was equal and number is input
        if (lastKey === 'equal') {
            clearAll();
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
        secondNum = displayValue;
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
    buttonElement.style.backgroundColor = '#f7d199';
}

// Helper function to make operator button inactive
function resetButton (buttonElement) {
    selectedOpButton = null;
    // Will need to change this 
    buttonElement.style.backgroundColor = '#e7dbc9'
}

// Handle operator button logic
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener('click', (e) => {
        const op = e.target.dataset.operator;

        // First time pressing operator button with valid value for first number
        if (lastKey === 'number' && firstNum === null && operator === null) {
            highlightButton(e.target);
            firstNum = displayValue;
            operator = op;
        // Evalute when first number and operator are present 
        } else if (firstNum !== null && operator !== null && lastKey === 'number') {
            highlightButton(e.target);
            secondNum = displayValue;
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

// Helper function to clear entire calculator
function clearAll () {
    displayValue = '';
    display.textContent = displayValue;
    firstNum = null;
    secondNum = null;
    operator = null;
    lastKey = null;
    lastKeyPressed = null;
    decimalPresent = false;
    if (selectedOpButton !== null) resetButton(selectedOpButton);
    selectedOpButton = null;
}

// Clear button logic
document.querySelector('.clear').addEventListener('click', (e) => {
    clearAll();
});

//For debugging, get rid of all intances of "lastKeyPressed"
document.querySelectorAll('button').forEach(but => {
    but.addEventListener('click', (e) => {
        lastKeyPressed = e.target.textContent;  // Or use e.target.dataset.value
    });
});

// Delete button
document.querySelector('.delete').addEventListener('click', () => {
    displayValue = String(displayValue);
    if (displayValue !== '') {
        if (displayValue === String(firstNum)) {
            console.log(displayValue);
            displayValue = displayValue.slice(0, -1);
            firstNum = displayValue;
            display.textContent = displayValue;
            return;
        } else {
            displayValue = displayValue.slice(0, -1);
            display.textContent = displayValue;
        }
    }
});

// Decimal button press
document.querySelector('.decimal').addEventListener('click', () => {
    // If last key was operator, start display with decimal
    if (lastKey === 'operator') {
        displayValue = '.';
        display.textContent = displayValue;
        lastKey = 'decimal';
        decimalPresent = true;
    }
    // Run only if there is no decimal 
    else if (!decimalPresent) {
        displayValue += '.';
        display.textContent = displayValue;
        lastKey = 'decimal';
        decimalPresent = true;
    }
});

// Keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;

    let button = document.querySelector(`button[data-number="${key}"]`)
                || document.querySelector(`button[data-operator="${key}"]`);

    if (key === "Backspace" || key === "Delete") {
        button = document.querySelector(`.delete`);
    } else if (key === "Enter") {
        button = document.querySelector('.equal');
    } else if (key === "Escape") {
        clearAll();
    }

    if (button) {
        button.click();
    }
});