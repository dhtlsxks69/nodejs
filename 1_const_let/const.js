if (true) {
  const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined

const a = 0;
a = 1; // Uncaught TypeError: Assignment to constant variable

const c; // Uncaught SyntaxError: Missing initializer in const declaration