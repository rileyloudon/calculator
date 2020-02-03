const displayValue = document.querySelector('.display');
const keys = document.querySelector('#calculator');

let calculator = {
  display: '0',
  firstNumber: null,
  operator: null,
  secondNumber: null,
};

keys.addEventListener('click', event => {
  const { target } = event;
  let { display } = calculator;

  if (target.className.includes('number')) {
    if (display.length <= 10) {
      numberPress();
    }
  }

  if (target.value === 'clear') {
    calculator.display = '0';
    calculator.firstNumber = null;
    calculator.operator = null;
    calculator.secondNumber = null;
    updateDisplay();
  }

  if (target.value === 'pos/neg') {
    swapSign();
  }

  if (target.value === 'percent') {
    percent();
    updateDisplay();
  }

  if (target.className.includes('operator')) {
    operatorPress();
  }

  console.log(target.value);
});

const numberPress = () => {
  const { target } = event;
  let { display } = calculator;

  if (target.value === '.') {
    if (!display.includes('.')) {
      calculator.display += target.value;
      updateDisplay();
    }
  } else {
    calculator.display === '0' || displayValue.className.includes('done')
      ? (calculator.display = target.value)
      : (calculator.display += target.value);
    displayValue.classList.remove('done');
    updateDisplay();
  }
};

const operatorPress = () => {
  const { target } = event;
  let { display } = calculator;

  if (target.value === 'equals') {
    if (!displayValue.className.includes('done')) {
      displayValue.classList.add('done');
      calculator.secondNumber = display;
      console.log(
        calculator.firstNumber,
        calculator.operator,
        calculator.secondNumber,
        'equals',
        calculator.display,
      );
    } else {
      calculator.firstNumber = display;
    }
    operate();
    updateDisplay();
    calculator.display = calculator.display.toString();
  } else {
    calculator.firstNumber = display;
    calculator.operator = target.value;
    // target.classList.add('active');
    calculator.display = '0';
  }
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
    return display;
  }
};

const updateDisplay = () => {
  let { display } = calculator;

  displayValue.value = display;
};

const operate = () => {
  let { display, operator } = calculator;

  switch (operator) {
    case 'add':
      add();
      return display;
    case 'subtract':
      subtract();
      return display;
    case 'multiply':
      multiply();
      return display;
    case 'divide':
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
