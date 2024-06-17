//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {

    let buttons = this.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown",function(event){
        if(event.key==="Enter"){
            checkAnswer();
        }
    })
    runGame("addition");

});




/**
 * The main game "loop", called when the script is first loaded
 *and after the user's answer has been processed
 */
function runGame(gameType) {
    // Make sure the value is empty before the next question and set the focus
    document.getElementById("answer-box").value="";
    document.getElementById("answer-box").focus();

    //Creates two randome numbers between 1 and 25
    let num1 = Math.ceil(Math.random() * 25);
    let num2 = Math.ceil(Math.random() * 25);

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknow game type: ${gameType} `);
        throw `Unknow game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in 
 * the returned calulateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculateAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculateAnswer[0];

    if (isCorrect) {
        alert("Hey you got it right! ;D");
        incrementScore();
    } else {
        alert(`Awwwww. you answered ${userAnswer}, the correct answe was ${calculateAnswer[0]}`);
        incrementWrongAnswer();
    }
    runGame(calculateAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator(plus, minus etc)
 * directly from the dom, and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}.Aborting! `;
    }

}
/**
 * Gets the current score from the DOM and increment it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}
/**
 * Get the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldIncorrect;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1>operand2?operand1:operand2;
    document.getElementById("operand2").textContent = operand1>operand2?operand2:operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}