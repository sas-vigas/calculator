
let current = "0";
let previous = null;
let operator = null;
let waiting = false;

const result = document.getElementById("result");
const expression = document.getElementById("expression");


/* =========================
   DISPLAY
========================= */

function updateDisplay() {
    result.textContent = current;

    if (operator && previous !== null) {
        expression.textContent =
            previous + " " + getSymbol(operator);
    } else {
        expression.textContent = "";
    }
}


/* =========================
   ADD NUMBER
========================= */

function addNumber(number) {

    if (current === "Error") {
        clearDisplay();
    }

    if (waiting) {
        current = number;
        waiting = false;
    } else if (current === "0") {
        current = number;
    } else {
        current += number;
    }

    updateDisplay();
}


/* =========================
   DECIMAL
========================= */

function addDecimal() {

    if (current === "Error") {
        clearDisplay();
    }

    if (waiting) {
        current = "0.";
        waiting = false;
        updateDisplay();
        return;
    }

    if (!current.includes(".")) {
        current += ".";
    }

    updateDisplay();
}


/* =========================
   OPERATION
========================= */

function setOperation(op) {

    if (current === "Error") {
        return;
    }

    if (operator !== null && !waiting) {
        calculate();
    }

    previous = parseFloat(current);
    operator = op;
    waiting = true;

    updateDisplay();
}


/* =========================
   CALCULATE
========================= */

function calculate() {

    if (
        operator === null ||
        previous === null
    ) {
        return;
    }

    const currentValue = parseFloat(current);

    let answer;

    if (operator === "+") {

        answer = previous + currentValue;

    } else if (operator === "-") {

        answer = previous - currentValue;

    } else if (operator === "*") {

        answer = previous * currentValue;

    } else if (operator === "/") {

        if (currentValue === 0) {

            current = "Error";
            previous = null;
            operator = null;
            waiting = true;

            updateDisplay();

            return;
        }

        answer = previous / currentValue;
    }

    answer = Number(answer.toFixed(10));

    expression.textContent =
        previous + " " +
        getSymbol(operator) + " " +
        currentValue;

    current = String(answer);

    previous = null;
    operator = null;
    waiting = true;

    updateDisplay();
}


/* =========================
   SYMBOL
========================= */

function getSymbol(op) {

    if (op === "+") return "+";
    if (op === "-") return "−";
    if (op === "*") return "×";
    if (op === "/") return "÷";

    return "";
}


/* =========================
   CLEAR
========================= */

function clearDisplay() {

    current = "0";
    previous = null;
    operator = null;
    waiting = false;

    updateDisplay();
}


/* =========================
   PLUS / MINUS
========================= */

function changeSign() {

    if (current === "0" || current === "Error") {
        return;
    }

    if (current.startsWith("-")) {
        current = current.substring(1);
    } else {
        current = "-" + current;
    }

    updateDisplay();
}


/* =========================
   PERCENT
========================= */

function percent() {

    if (current === "Error") {
        return;
    }

    current =
        String(parseFloat(current) / 100);

    updateDisplay();
}


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (key >= "0" && key <= "9") {

        addNumber(key);
        return;
    }

    if (key === ".") {

        addDecimal();
        return;
    }

    if (key === "+") {

        setOperation("+");
        return;
    }

    if (key === "-") {

        setOperation("-");
        return;
    }

    if (key === "*") {

        setOperation("*");
        return;
    }

    if (key === "/") {

        event.preventDefault();

        setOperation("/");
        return;
    }

    if (key === "%") {

        percent();
        return;
    }

    if (key === "Enter" || key === "=") {

        calculate();
        return;
    }

    if (key === "Escape") {

        clearDisplay();
    }
});


/* =========================
   START
========================= */

updateDisplay();

