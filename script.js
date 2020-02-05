const displayHTML = document.getElementById('display');

const calculator = {
  display: '0',
  firstNumber: null,
  operator: null,
  secondNumber: null,
};

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

  console.log(target.value);
});

// numberValue = target.value
const numberHandler = numberValue => {
  let { display } = calculator;

  if (numberValue === '.') {
    if (!display.includes('.')) {
      calculator.display += numberValue;
      updateDisplay();
    }
  } else {
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

  if (operatorValue === '=' || operatorValue === 'Enter') {
    if (!displayHTML.className.includes('reset')) {
      displayHTML.classList.add('reset');
      calculator.secondNumber = display;
    } else {
      calculator.firstNumber = display;
    }
    operate();
    updateDisplay();
    toggleClass();
    calculator.display = calculator.display.toString();
    console.log(
      calculator.firstNumber,
      calculator.operator,
      calculator.secondNumber,
    );
  } else {
    if (
      calculator.firstNumber === null ||
      (displayHTML.className.includes('reset') && calculator.display !== '0')
    ) {
      calculator.firstNumber = display;
    }

    calculator.operator = operatorValue;
    toggleClass();
    calculator.display = '0';
  }
};

const clear = () => {
  calculator.display = '0';
  calculator.firstNumber = null;
  calculator.operator = null;
  calculator.secondNumber = null;
  updateDisplay();
  toggleClass();
};

const swapSign = () => {
  let { display } = calculator;

  if (display.includes('-')) {
    calculator.display = display.substr(1);
    updateDisplay();
  } else {
    display === '0'
      ? calculator.display === '0'
      : (calculator.display = '-' + display);
    updateDisplay();
  }
};

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

const backspace = () => {
  let { display } = calculator;

  display.length > 1
    ? (calculator.display = display.substr(0, display.length - 1))
    : (calculator.display = '0');
  updateDisplay();
};

const updateDisplay = () => {
  let { display } = calculator;

  displayHTML.value = display;
};

const toggleClass = () => {
  let { operator } = calculator;
  let { target, key } = event;

  const classes = document.querySelector('.active');
  if (classes) {
    classes.classList.remove('active');
  }
  if (
    operator !== null &&
    (target.value !== '=' && key !== 'Enter' && key !== '=')
  ) {
    const activeOperator = document.querySelector(`.${CSS.escape(operator)}`);
    activeOperator.classList.add('active');
  }
};

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

const add = () => {
  let { firstNumber, secondNumber } = calculator;

  calculator.display =
    Math.round(
      (Number(firstNumber) + Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};

const subtract = () => {
  let { firstNumber, secondNumber } = calculator;

  calculator.display =
    Math.round(
      (Number(firstNumber) - Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};

const multiply = () => {
  let { firstNumber, secondNumber } = calculator;

  calculator.display =
    Math.round(
      (Number(firstNumber) * Number(secondNumber) + Number.EPSILON) * 1000,
    ) / 1000;
};

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

// 6 - 3 = + 2
