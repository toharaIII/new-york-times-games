document.addEventListener('DOMContentLoaded', getRandomLine);
document.getElementById("playAgain").addEventListener('click', getRandomLine);

function getRandomLine() {
    fetch('5 letter dictionary.csv')
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        localStorage.setItem('randomLine', JSON.stringify(randomLine.trim()));
        document.getElementById('playAgainGeneration').textContent = randomLine;
        console.log(randomLine);
        resetGame();
      })
      .catch(error => console.error('Error: ', error));
  }

const letters = document.querySelectorAll('.letter');
let currentGuess = '';
let currentRow = 0;

function resetGame(){
    currentGuess = '';
    currentRow = 0;
    letters.forEach(letter => {
        letter.textContent = '';
        letter.className = 'letter';
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key.match(/^[a-z]$/i) && currentGuess.length < 5) {
        const letter = event.key.toUpperCase();
        letters[currentRow * 5 + currentGuess.length].textContent = letter;
        currentGuess += letter;
    } else if (event.key === 'Backspace' && currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        letters[currentRow * 5 + currentGuess.length].textContent = '';
    } else if (event.key === 'Enter' || event.key === 'Return'){
        if(currentGuess.length === 5) {
            console.log("Guess submitted: ", currentGuess);
            checkGuess();
        }
    }
});

function checkGuess() {
    const targetWord = JSON.parse(localStorage.getItem('randomLine')).toUpperCase();
    if (currentGuess.length !== 5 || targetWord.length !== 5) {
      console.error('Invalid guess or target word length');
      return;
    }
  
    for (let i = 0; i < 5; i++) {
      const letterElement = letters[currentRow * 5 + i];
      if (currentGuess[i] === targetWord[i]) {
        letterElement.className = 'letter correct';
      } else if (targetWord.includes(currentGuess[i])) {
        letterElement.className = 'letter wrongPlace';
      } else {
        letterElement.className = 'letter';
      }
    }
  
    console.log('Guess submitted: ', currentGuess);
  
    if (currentGuess === targetWord) {
      setTimeout(() => {
        showModal('Congratulations! You guessed the word!');
      }, 500);
      return;
    } else if (currentRow === 5) {
      setTimeout(() => {
        showModal('Game over! The word was: ' + targetWord);
      }, 500);  
      return;
    } else {
      currentRow++;
      currentGuess = '';
      // Reset input for the next row
      const startIndex = currentRow * 5;
      for (let i = startIndex; i < startIndex + 5; i++) {
        letters[i].textContent = '';
      }
    }
  }

function showModal(message) {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'block';
  
    // Close the modal when clicking on <span> (x)
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
      modal.style.display = 'none';
    }
  
    // Close the modal when clicking outside of it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  }
  
  function closeModal() {
    const modal = document.getElementById('customModal');
    modal.style.display = 'none';
  }