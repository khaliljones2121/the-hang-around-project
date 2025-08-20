// Tsu's Hang Around (still working on title every title I come upwith sounds bad) anny suggestions??
// 1. Select a random word
//    - Word length: 8 letters or less
// 2. Display underscores for each letter in the word
// 3.
// (Define)
//  max wrong = 6
//    wrong guesses = 0
//    guessed letters = empty list
//    Body parts order:
//       1st wrong -> Head
//       2nd wrong -> Body
//       3rd wrong -> Left Arm
//       4th wrong -> Right Arm
//       5th wrong -> Left Leg
//       6th wrong -> Right Leg
// 4. WHILE game is not over:
//       a. User selects a letter
//       b. IF letter already in guessed_letters:
//             - Display message: "You already guessed that!"
//             - Continue to next turn
//          ELSE:
//             - Add letter to guessed letters
//       c. IF letter is in the word:
//             - Reveal letter(s) in the word
//          ELSE:
//             - wrong guesses = wrong guesses + 1
//             - Draw body part based on wrong guesses count
//       d. IF word is fully revealed:
//             - Display "Winner!"
//             - End game
//       e. IF wrong guesses = max wrong:
//             - Display "Loser!"
//             - End game
// 5. Offer option to restart game
// END


const words = [
	"banana", "guitar", "window", "rocket", "planet", "python", "flower", "castle"
];

let selectedWord = "";
let displayWord = [];
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

const bodyParts = ["Head", "Body", "Left Arm", "Right Arm", "Left Leg", "Right Leg"];

const wordContainer = document.getElementById("word");
const messageContainer = document.getElementById("message");
const guessedContainer = document.getElementById("guessed");
const hangmanContainer = document.getElementById("hangman");
const restartBtn = document.getElementById("restart");

function selectRandomWord() {
	const filtered = words.filter(w => w.length <= 8);
	selectedWord = filtered[Math.floor(Math.random() * filtered.length)].toLowerCase();
}

function initGame() {
	selectRandomWord();
	displayWord = Array(selectedWord.length).fill("_");
	guessedLetters = [];
	wrongGuesses = 0;
	updateDisplay();
	setMessage("");
	updateGuessed();
	updateHangman();
}
function updateDisplay() {
	if (wordContainer) {
		wordContainer.textContent = displayWord.join(" ");
	}
}

function setMessage(msg) {
	if (messageContainer) {
		messageContainer.textContent = msg;
	}
}
function updateGuessed() {
	if (guessedContainer) {
		guessedContainer.textContent = guessedLetters.join(", ");
	}
}

function updateHangman() {
	if (hangmanContainer) {
		hangmanContainer.textContent = bodyParts.slice(0, wrongGuesses).join(", ");
	}
}

function handleGuess(letter) {
	letter = letter.toLowerCase();
	if (guessedLetters.includes(letter)) {
		setMessage("You already guessed that!");
		return;
}
	guessedLetters.push(letter);
	updateGuessed();
	if (selectedWord.includes(letter)) {
		for (let i = 0; i < selectedWord.length; i++) {
			if (selectedWord[i] === letter) {
				displayWord[i] = letter;
			}
		}
		updateDisplay();
				if (!displayWord.includes("_")) {
					setMessage("Winner!");
					endGame();
				}
			} else {
				wrongGuesses++;
				updateHangman();
				if (wrongGuesses === maxWrong) {
					setMessage("Loser!");
					endGame();
				}
			}
		}
function endGame() {
	document.removeEventListener("keydown", onKeyDown);
	if (restartBtn) restartBtn.style.display = "inline-block";
}

function onKeyDown(e) {
	const letter = e.key;
	if (/^[a-zA-Z]$/.test(letter)) {
		handleGuess(letter);
	}
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
	initGame();
	document.addEventListener("keydown", onKeyDown);
	if (restartBtn) {
		restartBtn.addEventListener("click", () => {
			restartBtn.style.display = "none";
			document.addEventListener("keydown", onKeyDown);
			initGame();
		});
	}
});
