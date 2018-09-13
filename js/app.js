/*
 * Create a list that holds all of your cards
 */

const icons =["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor",
    "fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb",
    "fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor", "fa fa-bolt",
    "fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

const cardContainer = document.querySelector(".deck");
const restartBtn = document.querySelector(".restart");
const movesContainer = document.querySelector(".moves");
const starContainer  = document.querySelector(".stars");
const congratsDesc = document.querySelector('#congratsDesc');
const timer = document.querySelector('.timer');
const congratsContainer = document.querySelector('.congratsContainer').style;
const gameContainer = document.querySelector('.container').style;
const playAgainBtn = document.querySelector('.playAgainBtn');
let currentTimer= null;
let second = 0;
let Msecond = 0;
let openCards = [];
let matchedCards = [];

    function isOver() {
        if(matchedCards.length === icons.length) {
            stopTimer();
            congratsDesc.innerHTML = `You won the game in ${second}:${Msecond} seconds with ${moves} moves and ${stars} stars, Challenge your friends!`;
            gameContainer.display = 'none';
            congratsContainer.display = 'flex';
        }

    }

    function init() {

        for(let icon in icons) {
            const card = document.createElement("li");
            card.classList.add("card");
            card.innerHTML = `<i class="${icons[icon]}"></i>`;
            cardContainer.appendChild(card);
            click(card);
        }
    }


    // Click Event
    function click (card) {
       card.addEventListener("click",function () {
           startTimer();
           const currentCard = this;
           const previousCard = openCards[0];

           // We have an existing OPENED card.
           if( openCards.length === 1){
               card.classList.add("open","show","disable");
               openCards.push(this);

           // we Should compare our 2 opened cards.
               compare(currentCard,previousCard);

           }else {
               //We don't have any opened cards
               card.classList.add("open","show","disable");
               openCards.push(this);

           }

       });

   }

   function compare(currentCard, previousCard) {
       if(currentCard.innerHTML === previousCard.innerHTML){
           currentCard.classList.add("match");
           previousCard.classList.add("match");
           matchedCards.push(currentCard,previousCard);
           openCards = [];

           isOver();

       }else {

           setTimeout(function () {
               currentCard.classList.remove("open","show","disable");
               previousCard.classList.remove("open","show","disable");
               openCards = [];
           },300);


       }
       addMove();
   }

   restartBtn.addEventListener("click", function () {
       cardContainer.innerHTML = "";
       stopTimer();
       init();
       matchedCards = [];
       moves = 0;
       movesContainer.innerHTML = moves;
       starContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
   });

let moves = 0;
movesContainer.innerHTML = 0;

    function addMove() {
        moves++;
        movesContainer.innerHTML = moves;
        rating();
    }



starContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

    function rating() {
    if(moves>10 && moves<12 ){
        starContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        stars = 2;
    }else if(moves > 13 ) {
        starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        stars=1;
        }
    }

let stars=3;

    function setTimer () {
        timer.innerHTML = `<i class='fa fa-clock-o'></i> ${second}:${Msecond}`;
        Msecond++;
        if (Msecond <= 9) {
            Msecond = '0' + Msecond;
        }
        if (Msecond === 60) {
            second++;
            Msecond = 0;
            if(second<=9){
                second = '0' +second;
            }
        }
    }

    function startTimer() {
           currentTimer = setInterval(setTimer, 1000);
    }

    function stopTimer() {
        clearInterval(currentTimer);
    }

    playAgainBtn.addEventListener('click', function () {
        const gameContainer = document.querySelector('.container').style;
        const congratsContainer = document.querySelector('.congratsContainer').style;
        cardContainer.innerHTML = "";
        matchedCards = [];
        moves = 0;
        movesContainer.innerHTML = moves;
        starContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        gameContainer.display = 'flex';
        congratsContainer.display = 'none';

        init();


    });

init();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
