/*Create a list of symbols*/
const initSymbols = ["fa fa-bug", "fa fa-coffee", "fa fa-code",  "fa fa-desktop",
"fa fa-headphones",  "fa fa-mobile", "fa fa-archive",  "fa fa-folder-open",  ];

const symbols = initSymbols.concat(initSymbols);

 // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }
  /*Create a list that holds all of your cards*/
const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];


/*Keeping track of number of moves*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}

/*start the game, create cards*/
function startGame() {
  shuffle(symbols);
  moves = 0;
    for(let i = 0; i < symbols.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${symbols[i]}"></i>`;
        cardsContainer.appendChild(card);
        card.id = i;
        clickCard(card);
    }
}
/*Add Click Event to each Card*/
// First Click Indicator

let isFirstClick = true;
function clickCard(card) {
    card.addEventListener("click", function() {
        if(isFirstClick) {
            startTimer();
            isFirstClick = false;
        }
        const currentCard = this;
        const previousCard = openedCards[0];
        // there's already one card open
        if(openedCards.length === 1) {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            matchLogic(currentCard, previousCard);

        }else {
        // no cards are open, no need for matchLogic yet
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
    });
}
/*Decide if they're a match or not*/
function matchLogic(currentCard, previousCard) {
    // Cards Match and didn't click the same card twice
    if(currentCard.innerHTML === previousCard.innerHTML && currentCard.id != previousCard.id) {
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCards.push(currentCard, previousCard);
        openedCards = [];
        gameOver();
        addMove();

    } else {
        // timeout allows us to see symbol before it disappears
        setTimeout(function() {
            currentCard.classList.remove("open", "show" , "disable");
            previousCard.classList.remove("open", "show", "disable");
        }, 500);
        openedCards = [];
        addMove();
    }
}

/*star rating*/
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
let starRating = 3;
starsContainer.innerHTML = star + star + star;
function rating() {
    if( moves === 12 ) {
        starsContainer.innerHTML = star + star;
        starRating = 2;
    } else if( moves === 20) {
        starsContainer.innerHTML = star;
        starRating =1 ;
    }
}
/*timer*/
const timerContainer = document.querySelector(".timer");
let timer,
    time = 0;
timerContainer.innerHTML = time + 's';
function startTimer() {
    timer = setInterval(function() {
        time++;
        timerContainer.innerHTML = time + 's';
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}
/*What to do when game is over*/
function gameOver() {
    if(matchedCards.length === symbols.length) {
      swal({
  title: "You won!",
  text: "Moves: " + moves + " Time: " + time + " seconds " + " Star rating: "+ starRating,
  icon: "success",
  buttons: ["Leave game", "Play again"],
  dangerMode: false,
})
.then((willDelete) => {
  if (willDelete) {
    resetTwo();
  } else {
    stopTimer();
    swal("Thanks for playing");
  }
});
}
}

/*Restart Button*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete ALL cards
    cardsContainer.innerHTML = "";
    // Reset the game
    reset();
});
/*reset the game and all game variables*/
function reset() {
    // Empty the `matchedCards` array
    startGame();
    matchedCards = [];
    openedCards = [];
    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;
    // Reset `rating`
    starsContainer.innerHTML = star + star + star;
    stopTimer();
    isFirstClick = true;
    time = 0;
    timerContainer.innerHTML = time + "s";

}
function resetTwo() {
    cardsContainer.innerHTML = "";
    startGame();
    matchedCards = [];
    openedCards = [];
    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;
    // Reset `rating`
    starsContainer.innerHTML = star + star + star;
    stopTimer();
    isFirstClick = true;
    time = 0;
    timerContainer.innerHTML = time + "s";
}

/////// Start the game for the first time!
startGame();
