const displayHTML = document.getElementById('display');

const calculator = {
  display: '0',
  firstNumber: null,
  operator: null,
  secondNumber: null,
};

// Allows keyboard to enter inputs.
document.addEventListener('keydown', event => {
  const { key } = event;
  let { display } = calculator;

  if ((key >= 0 && key <= 9) || key === '.') {
    if (display.length <= 10) {
      numberHandler(key);
    }
  }

  if (
    (key >= '*' && key <= '-') ||
    key === '/' ||
    key === 'Enter' ||
    key === '='
  ) {
    operatorHandler(key);
  }

  if (key === 'Escape') {
    clear();
  }

  if (event.altKey && key === '–') {
    swapSign();
  }

  if (key === '%') {
    percent();
  }

  if (key === 'Backspace') {
    backspace();
  }
});

// Allows buttons on screen to enter inputs.
const keys = document.getElementById('calculator');
keys.addEventListener('click', event => {
  const { target } = event;
  let { display } = calculator;

  if (target.className.includes('number')) {
    if (display.length <= 10) {
      numberHandler(target.value);
    }
  }

  if (target.className.includes('operator')) {
    operatorHandler(target.value);
  }

  if (target.value === 'clear') {
    clear();
  }

  if (target.value === 'pos/neg') {
    swapSign();
  }

  if (target.value === 'percent') {
    percent();
  }
});

// numberValue = target.value
const numberHandler = numberValue => {
  let { display } = calculator;

  // Limit one decimal place per number.
  if (numberValue === '.') {
    if (!display.includes('.')) {
      calculator.display += '.';
      updateDisplay();
    }
  } else {
    // Print numbers onto the screen.
    calculator.display === '0' || displayHTML.className.includes('reset')
      ? (calculator.display = numberValue)
      : (calculator.display += numberValue);
    displayHTML.classList.remove('reset');
    updateDisplay();
  }
};

// operatorValue = target.value
const operatorHandler = operatorValue => {
  let { display, operator } = calculator;

  /* When equals is pressed ->
    keep track it was pressed with .reset. Allows number presses to start a new equation.
    set the second number to what is displayed.
    OR the first number (Allows for spamming = and getting the proper result).
  */
  if (operatorValue === '=' || operatorValue === 'Enter') {
    if (!displayHTML.className.includes('reset')) {
      displayHTML.classList.add('reset');
      calculator.secondNumber = display;
    } else {
      calculator.firstNumber = display;
    }
    operate();
    updateDisplay();

    // Turn the answer back into a string so you can use +/- on it.
    calculator.display = calculator.display.toString();
  } else {
    // Prevents the first number from getting set to 0 unexpectedly
    console.log(
      calculator.firstNumber,
      calculator.operator,
      calculator.secondNumber,
      display,
    );
    if (
      calculator.firstNumber === null ||
      (displayHTML.className.includes('reset') && calculator.display !== '0')
    ) {
      calculator.firstNumber = display;
    }
    // If the operator already exists, calculate the equation based on what you have
    // (Allows for 5+6-9*2)
    if (
      operator &&
      calculator.firstNumber > '0' &&
      !displayHTML.className.includes('reset')
    ) {
      calculator.secondNumber = display;
      operate();
      updateDisplay();
      calculator.firstNumber = displayHTML.value;
    }
    calculator.operator = operatorValue;
    calculator.display = '0';
  }
  toggleClass();
};

// Reset everything
const clear = () => {
  calculator.display = '0';
  calculator.firstNumber = null;
  calculator.operator = null;
  calculator.secondNumber = null;
  updateDisplay();
  toggleClass();
};

// Convert the current number to positive or negative
const swapSign = () => {
  let { display } = calculator;

  if (display.includes('-')) {
    calculator.display = display.substr(1);
    updateDisplay();
  } else {
    calculator.display = '-' + display;
    updateDisplay();
  }
};

// Get the percent of the current number
const percent = () => {
  let { display } = calculator;

  if (display === '0') {
    return (calculator.display = '0');
  } else {
    calculator.display /= '100';
    calculator.display = calculator.display.toString();
    updateDisplay();
  }
};

// Allow for the numbers to be deleted (Currently only works using keyboard)
const backspace = () => {
  let { display } = calculator;

  display.length > 1
    ? (calculator.display = display.substr(0, display.length - 1))
    : (calculator.display = '0');
  updateDisplay();
};

// Pass the current display value into the HTML file
const updateDisplay = () => {
  let { display } = calculator;

  displayHTML.value = display;
};

// Toggles a class to see the current operator
const toggleClass = () => {
  let { operator } = calculator;
  let { target, key } = event;

  // Find the current active operator
  const classes = document.querySelector('.active');

  // If there is one, remove it.
  if (classes) {
    classes.classList.remove('active');
  }

  // If the operator exists, and is not =
  if (operator && (target.value !== '=' && key !== 'Enter' && key !== '=')) {
    // Find the operator and add the active class to it.
    // `.${CSS.escape(operator)}` changes to the operator value (operator = '+')
    const activeOperator = document.querySelector(`.${CSS.escape(operator)}`);
    activeOperator.classList.add('active');
  }
};

// Find the currect operator and run the correct math equation
const operate = () => {
  let { display, operator } = calculator;

  switch (operator) {
    case '+':
      add();
      return display;
    case '-':
      subtract();
      return display;
    case '*':
      multiply();
      return display;
    case '/':
      divide();
      return display;
  }
};

// Run the correct math equation. Rounds the numbers to 3 decimal places.
const add = () => {
  let { firstNumber, secondNumber } = calculator;

  calculator.display =
    Math.round(
      (Number(firstNumber) + Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};

// See add().
const subtract = () => {
  let { firstNumber, secondNumber } = calculator;

  calculator.display =
    Math.round(
      (Number(firstNumber) - Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};

// See add().
const multiply = () => {
  let { firstNumber, secondNumber } = calculator;

  calculator.display =
    Math.round(
      (Number(firstNumber) * Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};

// If you try to divide by 0, enter the matrix. See add() for other stuff.
const divide = () => {
  let { firstNumber, secondNumber } = calculator;

  if (secondNumber === '0') {
    return (calculator.display = '∞');
  }
  calculator.display =
    Math.round(
      (Number(firstNumber) / Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};
