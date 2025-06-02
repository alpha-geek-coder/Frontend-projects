
function clear() {
    first.length= 0, second.length = 0;
    operator = -1;
    display(0, result);
    display("", expression);
}

function addToExpression(key) {

    if (key in operators) {
        if (first.length === 0 && operator == -1) return; // do nothing, operator ahead of first num 
        if (second.length > 0) { // second operation
            operate();    
        } 
        operator = key;
        display(
            ` ${first.join("")} ${operator}`,
            result
        );
        
        
    } else if (operator == -1) {
        first.push(key);
        display(first.join(""), result);
    } else {
        second.push(key);
        display(` ${first.join("")} ${operator} ${second.join("")}`, result);
    }

}

function operate() {
  const a = parseFloat(first.join(""), 10);
  const b = parseFloat(second.join(""), 10);

  const ans = Math.round(operators[operator](a, b) * 10) / 10;
  display(`${a} ${operator} ${b}`, expression);
  display(ans, result);

  // reset inputs
  first = String(ans).split("");
  second.length = 0;
  operator = -1;
}

function display(str, element) {
    element.textContent = str;
}

const button = document.querySelectorAll("button");
const expression = document.querySelector("#expression");
const result = document.querySelector("#result");
const operators = {
  "+": function add(a, b) {
    return a + b;
  },
  "-": function subtract(a, b) {
    return a - b;
  },
  "x": function multiply(a, b) {
    return a * b;
  },
  "/": function divide(a, b) {
    return a / b;
  },
};

let first = [];
let second = [];
let operator = -1;
clear();
button.forEach(btn => btn.addEventListener("click", (e) => {
    const selection = e.target.id;
    if (selection === "clear") {
        clear();
    } else if (selection === "=") {
        if (first.length > 0 && second.length > 0) {
            operate();
        }      
    } else {
        addToExpression(selection);
    }
}));




