const keyboradDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");




let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;



const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}


const getRandomWord = () => {
    //Random words and hits from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    keyboradDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

}


const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was`;
        gameModal.querySelector('img').src = `images/${isVictory ? `victory` : `lost`}.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory ? `Congrats!` : `Game Over!`}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}



const inGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        //Show all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {

        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);


}

//Creating keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboradDiv.appendChild(button);

    button.addEventListener("click", e => inGame(e.target, String.fromCharCode(i)));
}


playAgainBtn.addEventListener("click", getRandomWord);
getRandomWord();
