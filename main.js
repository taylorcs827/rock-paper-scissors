import { choices } from './choices.js'


// DOM

const rulesBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const iconBtn = document.querySelectorAll(".icon-btn");
const choiceContainer = document.querySelector(".choice-container");
const choiceDisplay = document.querySelector(".choice-display");
const choiceDiv= document.querySelectorAll(".choice-div");

const gameResult = document.querySelector(".game-result");
const resultsInfo = document.querySelector(".results-info");

const playAgain = document.querySelector(".play-again");

const scoreNum = document.querySelector(".score-num")

let score = 0;

let btnActive = false;

// GAMEPLAY

iconBtn.forEach((button)  => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = choices.find((choice) => choice.name === choiceName)
        choose(choice);
    });
});

function choose(choice) {
    const houseChoose = houseChoice();
    displayChoices([choice, houseChoose]);
    displayWinner([choice, houseChoose]);
}

function houseChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function displayChoices(selection){
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

function displayWinner(selection){
    setTimeout(() => {
        const playerWins = isWinner(selection);
        const houseWins = isWinner(selection.reverse());

        if(playerWins){
            resultsInfo.innerText = "Player Wins!";
            choiceDiv[0].classList.toggle("winner");
            keepScore(1);
        } else if (houseWins) {
            resultsInfo.innerText = "House Wins!";
            choiceDiv[1].classList.toggle("winner");
            keepScore(-1);
        } else{
            resultsInfo.innerText = "Draw!";
        }

        gameResult.classList.toggle("hidden")
        choiceDisplay.classList.add("show-winner")
}, 1000);

}
   
function isWinner(selection){
    return selection[0].beats === selection[1].name;
}

// PLAY AGAIN

playAgain.addEventListener("click", () => {
    choiceContainer.classList.toggle("hidden")
    choiceDisplay.classList.toggle("hidden");

    choiceDiv.forEach((choiceDisplay) => {
        choiceDisplay.innerHTML = "";
        choiceDisplay.classList.remove("winner")
    });

    resultsInfo.innerText = "";
    gameResult.classList.toggle("hidden");
    choiceDiv.classList.toggle("show-winner");

});

// KEEP SCORE

function keepScore(point) {
    score += point;
    scoreNum.innerText = score;
}

// SHOW/CLOSE MODAL

rulesBtn.addEventListener('click', () => {
    if (btnActive = true) {
    modalRules.classList.toggle("hidden");
    };
    // FIX BUG THAT BACKGROUND CAN BE CHANGED
});

closeBtn.addEventListener('click', () => {
    modalRules.classList.toggle("hidden")
    btnActive = false;
});
