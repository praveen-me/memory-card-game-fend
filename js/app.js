/*
 * Create a list that holds all of your cards
*/

// const cardList = ['fa-repeat', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle'];

const cardListForEasy = ['fa-repeat', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube'];

const cardListForMedium = ['fa-repeat', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle'];

const cardListForHard = ['fa-repeat', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-adjust' , 'fa-tint']; 

let started = false;
let openCards = [];
let timeCount = 0;
let moves = 0;
let solvedCount = 0;
let timePtr;
let clickedEasy = false;
let clickedMedium = false;
let clickedHard = false;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/

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


// make card 
function makeCard(cardClass){
    $('ul.deck').append(`<li class="card"><i class="fa ${cardClass}"></i></li>`);
}

//populated these card in DOM and shuffle them
function populateCardDeck (cardLists){
    shuffle(cardLists.concat(cardLists)).forEach(makeCard);
}

//take card class 
function getClassFromCard(card) {
    return card[0].firstChild.className;
}

//check card for second click and compare them and perform basics functionalities like increamenitng move etc.
function checkCards(){
    if(getClassFromCard(openCards[0]) === getClassFromCard(openCards[1])){
        solvedCount++;
        openCards.forEach(function (card){
            card.animateCss('jello', function (){
                card.toggleClass('open show match');
            });
        });
    } else {
        openCards.forEach(function (card){
            card.animateCss('rubberBand', function (){
                card.toggleClass('open show');
            });
        });
    }

    openCards = [];
    incrementMove();

    // End game for particular level
    if(clickedEasy === true) {
        if(solvedCount === 6) {
            endGame();
        }
    } else if(clickedMedium === true) {
        if(solvedCount === 8) {
            endGame();
        }
    } else if(clickedHard === true) {
        if(solvedCount === 10) {
            endGame();
        }
    }
}

//function for move incrementing
function incrementMove(){
    moves += 1;
    $('#moves').html(moves);

    // Reducing Star according to particular level
    if(clickedEasy === true) {
        if(moves === 10 || moves === 15) {
            reduceStar();
        }
    } else if(clickedMedium === true) {
        if(moves === 15 || moveBy === 20) {
            reduceStar();
        }
    } else if(clickedHard === true) {
        if(moves === 17 || moves === 22) {
            reduceStar();
        }
    }
}


//funtion for initing stars when the page loaded
function initStars(){
    for(let i = 0; i < 3; i++){
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
    }
}

//function for reducing stars according to the moves
function reduceStar(){
    let star = $('.fa-star');
    $(star[star.length - 1]).toggleClass('fa-star fa-star-o');
}

//function for start timer
function startTimer() {
    $('#timer').html('');
    timeCount += 1;
    $('#timer').html(timeCount);
    timePtr = setTimeout(startTimer, 1000);
}

//function occur when the event triggered
function cardClicked(event){
    //check for open and match card
    let classes = $(this).attr('class');

    if(classes.search('open') * classes.search('match') !== 1){
        //both should be -1
        return;
    }

    //start game when needed
    if(!started){
        started = true;
        timeCount = 0;
        timePtr = setTimeout(startTimer, 1000);
    }

    //cards can be flipped
    if(openCards.length < 2){
        $(this).toggleClass('open show');
        openCards.push($(this));
    }

    //cards can be matched
    if(openCards.length === 2){
        checkCards();
    }

}


//function for  end game prompt
function endGamePrompt(){
    let stars = $('.fa-star');

    $('.end-modal').empty();
    $('.end-modal').addClass('animated zoomIn')
    $('.end-modal').css('display', 'flex');   

    $('.end-modal').append(`
    <p>CONGRATS!! You got ${stars.length}/3 rating and completed in ${timeCount} seconds with ${moves} moves. <br>
    Do you want to play it again?</p>`);

    $('.end-modal').append(`<button class="start-yes modal-button" id="started">Yes</button>
    <button class="start-no modal-button" id="not-started">No</button>`);

    $('.end-modal').append(`<button id="saveProgressAskButton"> Save Your Progress </button>`);
}

//function for if user clcik on No Button in End Game Modal or basically function for say no prompt
function sayNoPrompt() {
    $('.end-modal').css('display', 'none');
    $('.sayNo-modal').addClass('animated slideInLeft');
    $('.sayNo-modal').css('display', 'block');

    $('#closeSayNoModal').click(function(){
        $('.sayNo-modal').css('display', 'none');
    })
}


//function for endgame
function endGame(){
   
    endGamePrompt(); // calling endgame

    let startYes = document.getElementById('started');

    clearTimeout(timePtr); // stop the time
    
    //event triggered on Yes button and restart game again
    startYes.addEventListener('click', function () {
        resetGame();
        $('.end-modal').css('display', 'none');
    });
    
    //If user don't want to play further
   $('#not-started').click(sayNoPrompt);



}

// reset game prompt
function resetGamePrompt(){
    $('.reset-modal').css('display', 'flex');
    $('.reset-modal').addClass('animated slideInRight');

    $('.reset-yes').click(function (){
        resetGame();
        $('.reset-modal').css('display', 'none');
    });

    $('.reset-no').click(function(){
        $('.reset-modal').css('display', 'none');
    })

}

// reset the game
function resetGame(){
    $('ul.deck').html('');
    $('.stars').html('');
    moves = -1;
    incrementMove();
    started = false;
    timeCount = 0;
    openCards = [];
    solvedCount = 0;
    clearTimeout(timePtr);
    $('#timer').html(0);
    //setup the game again
    initGame();
}

//initialize the game
function initGame(){

    // Initialize game accoring to the level
    if(clickedEasy === true){
        populateCardDeck(cardListForEasy);
    } else if(clickedMedium === true){
        populateCardDeck(cardListForMedium);
    } else if(clickedHard === true){
        populateCardDeck(cardListForHard);
        $('.card').css({'height': '100px',
        'width':'100px'});

        // Making Card deck responsive for hard level
        if ($(window).width() <= 480) {
            $('.card').css({'height': '50px','width':'50px'});
        } else if($(window).width() >= 481 && $(window).width() <= 768){
            $('.card').css({'height': '75px','width':'75px'});
        }

    }

    initStars();
    $('.card').click(cardClicked);
}

// levels modal 
function levelModal() {
    $('.levels').css('display','flex');
    $('.levels').addClass('animated bounceIn');

    // When Player Click on Easy Button
    $('#easy').click(function (){
        clickedEasy = true;
        $('.deck').css('display', 'flex');

        initGame();

        $('.levels').css('display','none');
    });

    // When Player Click on Medium Button
    $('#medium').click(function (){
        clickedMedium = true;
        $('.deck').css('display', 'flex');

        initGame();

        $('.levels').css('display','none');
    });

    // When Player Click on Hard Button
    $('#hard').click(function (){
        clickedHard = true;
        $('.deck').css('display', 'flex');
        
        initGame();

        $('.levels').css('display','none');
    });
    
}


//When the DOM is ready to work
$(document).ready(function (){
    levelModal();
    
    $('#restart').click(resetGamePrompt);
});


//source https://github.com/daneden/animate.css
$.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };
  
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
  
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
  
        if (typeof callback === 'function') callback();
      });
  
      return this;
    },
});

