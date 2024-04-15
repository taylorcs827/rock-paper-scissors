// Importing choices from an external file named 'choices.js'
import { choices } from './choices.js'

// DOM elements
const rulesBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const iconBtn = document.querySelectorAll(".icon-btn");
const choiceContainer = document.querySelector(".choice-container");
const choiceDisplay = document.querySelector(".choice-display");
const choiceDiv = document.querySelectorAll(".choice-div");
const gameResult = document.querySelector(".game-result");
const resultsInfo = document.querySelector(".results-info");
const playAgain = document.querySelector(".play-again");
const scoreNum = document.querySelector(".score-num");

// Initialize score
let score = 0;

// Initialize button state
let btnActive = false;

// Event listeners for player's choices
iconBtn.forEach((button) => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = choices.find((choice) => choice.name === choiceName)
        choose(choice);
    });
});

// Player's choice function
function choose(choice) {
    const houseChoose = houseChoice();
    displayChoices([choice, houseChoose]);
    displayWinner([choice, houseChoose]);
}

// Randomly select the house's choice
function houseChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Display player's and house's choices
function displayChoices(selection) {
    choiceDiv.forEach((choiceDisplay, index) => {
        setTimeout(() => {
            choiceDisplay.innerHTML = `
                <div class="icon-layout ${selection[index].name}">
                    <img src="images/icon-${selection[index].name}.svg" alt="${selection[index].name}">
                </div>
                `;
        }, index * 1000);
    });

    choiceContainer.classList.toggle("hidden")
    choiceDisplay.classList.toggle("hidden");
}

// Display winner and update score
function displayWinner(selection) {
    setTimeout(() => {
        const playerWins = isWinner(selection);
        const houseWins = isWinner(selection.reverse());

        if (playerWins) {
            resultsInfo.innerText = "Player Wins!";
            choiceDiv[0].classList.toggle("winner");
            keepScore(1);
        } else if (houseWins) {
            resultsInfo.innerText = "House Wins!";
            choiceDiv[1].classList.toggle("winner");
            keepScore(-1);
        } else {
            resultsInfo.innerText = "Draw!";
        }

        gameResult.classList.toggle("hidden")
        choiceDisplay.classList.add("show-winner")
    }, 1000);

}

// Check if player wins
function isWinner(selection) {
    return selection[0].beats === selection[1].name;
}

// Event listener for play again button
playAgain.addEventListener("click", () => {
    choiceContainer.classList.toggle("hidden")
    choiceDisplay.classList.toggle("hidden");

    choiceDiv.forEach((choiceDisplay) => {
        choiceDisplay.innerHTML = "";
        choiceDisplay.classList.remove("winner")
    });

    resultsInfo.innerText = "";
    gameResult.classList.toggle("hidden");
    choiceDisplay.classList.toggle("show-winner");

});

// Keep track of the score
function keepScore(point) {
    score += point;
    scoreNum.innerText = score;
}

// Event listeners to show/close modal
rulesBtn.addEventListener('click', () => {
    if (!btnActive) {
        modalRules.classList.toggle("hidden");
        btnActive = true;
    };
});

closeBtn.addEventListener('click', () => {
    modalRules.classList.toggle("hidden")
    btnActive = false;
});
