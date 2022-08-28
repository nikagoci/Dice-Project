// DOM Elements
var diceBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var newBtn = document.querySelector('.btn-new');
var diceImg = document.querySelector('.dice');
var activePlayerPannel = document.querySelector('.player-0-panel');
var finalInputElement = document.querySelector('.final-score');
var winnerScore = document.querySelector('.winner-score');
var winnerText = document.querySelector('.winner-text');
var winnerImage = document.querySelector('.winner-image');
var loserText = document.querySelector('.loser-text');


// Game Variables
var scores = [0,0];
var activePlayer = 0;
var currentScore = 0;
var gameStatus = false;
var gameScore;

/****************
 *Ghost Elements
*****************/
winnerScore.style.display = 'none';
winnerText.style.display = 'none';
winnerImage.style.display = 'none';
loserText.style.display = 'none';

function nextPlayer(){
    currentScore = 0;
    activePlayerPannel.querySelector('.player-current-score').textContent = 0;
    activePlayerPannel.classList.remove('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    activePlayerPannel = document.querySelector('.player-' + activePlayer + '-panel');
    activePlayerPannel.classList.add('active');
}

/****************
 *Winner Score
*****************/

function finalScore(){
    gameScore = +finalInputElement.value;
    if(gameScore > 0){
        gameStatus = true;
        finalInputElement.style.display = 'none';
        winnerScore.textContent = 'Winner Score: ' + finalInputElement.value;
        winnerScore.style.display = 'block';
    }

}

/****************
 *Beautiful Alert
*****************/

function rollDiceAlert(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Winner Score Is Not Defined Or Correct Filled!',
        footer: 'Make Sure Winner Score Is Filled With Positive Number!'
    })
}

function holdDiceAlert(){
    Swal.fire({
        title: 'Please Enter Positive Number And Press "Roll Dice"',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}

/****************
 *Roll Dice Button
*****************/

diceBtn.addEventListener('click', function(){

    finalScore();
    
    if(gameStatus && scores[activePlayer] < gameScore){
        var randomNumber = Math.floor((Math.random() * 6) + 1);

        if(randomNumber !== 1){
            var currentPlayerPannel = activePlayerPannel.querySelector('.player-current-score');
    
            diceImg.src = 'img/dice-' + randomNumber + '.png';
    
    
            currentScore += randomNumber;
            currentPlayerPannel.textContent = currentScore;
        } else{
            nextPlayer();
        }
    }
    if(randomNumber == 1){
        loserText.style.display = 'block';
        diceImg.style.display = 'none';
    } else{
        loserText.style.display = 'none';
        diceImg.style.display = 'block';
    }
    if(gameStatus == false){
        rollDiceAlert();
        gameScore = undefined;
    }

})

/****************
 *Hold Button
*****************/

holdBtn.addEventListener('click', function(){

    if(gameStatus == true){
    scores[activePlayer] += currentScore;
    activePlayerPannel.querySelector('.player-score').textContent = scores[activePlayer];

    if(scores[activePlayer] >= gameScore){
        // Winner
        gameStatus = false;
        activePlayerPannel.classList.remove('active');
        activePlayerPannel.classList.add('winner');
        activePlayerPannel.querySelector('.player-name').textContent = 'Winner';
        activePlayerPannel.querySelector('.player-current-score').textContent = 0;
        if(gameStatus == false && scores[activePlayer] >= gameScore){
            diceBtn.style.display = 'none';
            holdBtn.style.display = 'none';
            winnerScore.style.display = 'none';
            diceImg.style.display = 'none'
            winnerText.style.display = 'block';
            winnerText.textContent = 'Our Winner Is: Player ' + (activePlayer + 1);
            winnerImage.style.display = 'block';
        }
    } else{
        nextPlayer();
    }
    } 
    if(gameStatus == false && gameScore == undefined){
        holdDiceAlert();
    }
})


/****************
 *New Game Button
*****************/

newBtn.addEventListener('click', function(){
    window.location.reload();
})

