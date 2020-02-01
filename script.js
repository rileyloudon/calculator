const displayValue = document.querySelector('.display');
const keys = document.querySelector('#calculator');

let display = '0';
let operator = '';

keys.addEventListener('click', event => {
  const { target } = event;

  if (target.className.includes('number') && !display.includes('.')) {
    display === '0' ? (display = target.value) : (display += target.value);
    displayValue.textContent = display;
  }

  console.log(target.className);
});

const updateDisplay = display => {
  displayValue.textContent = display;
};

const operate = (a, operator, b) => {
  // display = a;

  switch (operator) {
    case 'add':
      add(b);
      return display;
    case 'subtract':
      subtract(b);
      return display;
    case 'multiply':
      multiply(b);
      return display;
    case 'divide':
      divide(b);
      return display;
  }
};

const add = number => {
  display += number;
};

const subtract = number => {
  display -= number;
};

const multiply = number => {
  display *= number;
};

const divide = number => {
  if (number === 0) {
    return (display = 'Entering Hyperspace...');
  }
  display /= number;
};

const percent = () => {
  if (display === 0) {
    return (display = 0);
  } else {
    display /= 100;
    return display;
  }
};

// add.addEventListener('click', () => {
// });

// subract.addEventListener('click', () => {
// });

// multiply.addEventListener('click', () => {
// });

// divide.addEventListener('click', () => {
// });

// operate();
updateDisplay(display);
