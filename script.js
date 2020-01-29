let display = 0;

const operate = (a, operator, b) => {
  display = a;

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

// add.addEventListener('click', () => {
// });

// subract.addEventListener('click', () => {
// });

// multiply.addEventListener('click', () => {
// });

// divide.addEventListener('click', () => {
// });

operate();
