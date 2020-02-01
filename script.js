const displayValue = document.querySelector('.display');
const keys = document.querySelector('#calculator');

let display = '0';
let firstNumber = '';
let operator = '';
let secondNumber = '';

keys.addEventListener('click', event => {
  const { target } = event;

  if (target.className.includes('number')) {
    if (target.value === '.') {
      if (!display.includes('.')) {
        display += target.value;
        updateDisplay();
      }
    } else {
      display === '0' ? (display = target.value) : (display += target.value);
      updateDisplay();
    }
  }

  if (target.value === 'clear') {
    display = '0';
    updateDisplay();
  }

  if (target.value === 'pos/neg') {
    if (display.includes('-')) {
      display = display.substr(1);
      updateDisplay();
    } else {
      display === '0' ? display === '0' : (display = '-' + display);
      updateDisplay();
    }
  }

  if (target.value === 'percent') {
    percent();
    updateDisplay();
  }

  if (target.className.includes('operator')) {
    if (target.value === 'equals') {
      secondNumber = display;
      operate();
      console.log(firstNumber, operator, secondNumber);
      updateDisplay();
      display = display.toString();
    } else {
      firstNumber = display;
      operator = target.value;
      display = '0';
      updateDisplay();
    }
  }

  console.log(target.value);
});

const updateDisplay = () => {
  displayValue.textContent = display;
};

const operate = () => {
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
  display = Number(firstNumber) + Number(secondNumber);
};

const subtract = () => {
  display = Number(firstNumber) - Number(secondNumber);
};

const multiply = () => {
  display = Number(firstNumber) * Number(secondNumber);
};

const divide = () => {
  if (secondNumber === '0') {
    return (display = '∞');
  }
  display = Number(firstNumber) / Number(secondNumber);
};

const percent = () => {
  if (display === '0') {
    return (display = '0');
  } else {
    display /= '100';
    display = display.toString();
    return display;
  }
};

updateDisplay();
