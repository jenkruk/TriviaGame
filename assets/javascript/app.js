// This variable stores the data shown in the .quiz div
var showQuiz;

var startButton = '<button type="button" class="btn btn-primary btn-md mt-3 start-button">Start</button>';

var tryAgainBtn = '<button type="button" class="btn btn-primary btn-md mt-3 tryAgainBtn">Try Again</button>';

// This variable stores the timer rules
var timerStatus;

// Gives the player 10 seconds choose an answer
var timer = 10;

//Let's the player know how much time is left
var timeRemaining = "<p class='text-center timer-p'>You have <span class='timer'>" + timer + "</span> seconds remaining!</p>";

var questionNumber = 0;

var questions = [
    'Where is The Great Pyramid of Giza?',
    'Where is the Eiffel Tower?',
    "Where is this Great Wall?",
    'Where is the Taj Mahal?',
    'Where is the Grand Canyon?'
];

var answerOptions = [
    ['United States', 'Turkey', 'Egypt', 'Germany'],
    ['Italy', 'France', 'Japan', 'Argentina'],
    ['Morocco', 'Chile', 'Peru', 'China'],
    ['India', 'Bangladesh', 'Philippines', 'Vietnam'],
    ['Nevada', 'Utah', 'Arizona', 'Maine']
];

var correctAnswers = ['Egypt', 'France', 'China', 'India', 'Arizona'];

var showCorrectAnswer;

var unsolvedImages = ["./assets/images/giza.jpg", "./assets/images/eiffel.jpg", "./assets/images/wall.jpg", "./assets/images/tajMahal.jpg", "./assets/images/canyon.jpg"];

var solvedImages = ["./assets/images/solved/gizaSolved.jpg", "./assets/images/solved/eiffelSolved.jpg", "./assets/images/solved/wallSolved.jpg", "./assets/images/solved/tajMahalSolved.jpg", "./assets/images/solved/canyonSolved.jpg"];

var showImage;

var playersGuess;

// This variable will allow us to print messages to the player dynamically
var message;

// This variable will keep track of the correct answers
var trackRight = 0;

// This variable will keep track of the incorrect answers
var trackWrong = 0;

// This variable will keep track of answers the player did not pick because the time ran out
var trackMissed = 0;

//This function will reset the game so that the player can try again
function resetGame() {
    questionNumber = 0;
    trackRight = 0;
    trackWrong = 0;
    trackMissed = 0;
    timer = 10;
    $(".coverImageHolder").hide();
    $(".tagline").hide();
    showGameContent();
    countDown();
}

// Document ready ensures that all the html is loaded before the below functions run
$(document).ready(function () {

    //This function dynamically shows the start button in the quiz div
    function gameIntro() {
        $(".quiz").html(startButton);
    }

    gameIntro(); //calls (invokes) the function 

    //This event listener starts the game when the user clicks on the start button
    $("body").on("click", ".start-button", function (event) {
        event.preventDefault();
        //This function displays game content
        showGameContent();
        //This function starts the timer
        countDown();
    });

    //This event listener adds functionality to the answer options
    $("body").on("click", ".selector", function (event) {
        //Assigns the choice that the player clicked on as the player's guess
        playersGuess = $(this).text();
        //Checks if the playersGuess is equal to the correct answer for that particular question
        if (playersGuess === correctAnswers[questionNumber]) {
            //When answer is correct
            //Stops the timerStatus
            clearInterval(timerStatus);
            //Tells the player that their choice was right and shows the solvedImage
            showRight();
        } else { //When answer is incorrect
            //Stops the timerStatus
            clearInterval(timerStatus);
            //Tells the player that their choice was wrong and shows the solvedImage 
            showWrong();
        }
    });

    //This event listener assigns the resetGame function to the on-click of the Try Again Button
    $("body").on("click", ".tryAgainBtn", function (event) {
        resetGame();
    });
}); // End of ready() function

//This function generates the question image, the question from the questions array, the list of clickable options from answerOptions array and a timer to track the time remaining
function showGameContent() {
    showImage = "<img class='imageHolder mb-4 mx-auto d-block' src='" + unsolvedImages[questionNumber] + "'>";
    //Prints question to the DOM dynamically
    var questionSelected = "<p class='questionTitle mb-3'>" + questions[questionNumber] + "</p>";
    //For loop that shows the available answer options for the particular question
    var answerOptionsSelected = answerOptions[questionNumber];
    var showOptions = '';
    var i;
    for (i = 0; i < answerOptionsSelected.length; i++) {
        showOptions += '<div class="selector mt-1">' + answerOptionsSelected[i] + '</div>';
    }
    //Hides welcome page image and text
    $('.coverImageHolder').hide();
    $('.tagline').hide();
    //Displays image, timer, question and possible answers to the quiz page
    showQuiz = showImage + timeRemaining + questionSelected + showOptions;
    //Shows the quiz in the html where the class .quiz has been defined
    $(".quiz").html(showQuiz);
}

//This function is the result page that generates when the player didn't pick a possible answer before the time ran out
function showMissed() {
    //Adds to the missed answer tracking tally
    trackMissed++;
    //Generates the answer image
    showImage = "<img class='imageHolder mb-4 mx-auto d-block' src='" + solvedImages[questionNumber] + "'>";
    //Generates "Time's up!" message to be printed to the DOM dynamically
    message = "<p class='text-center'>Time's up!</p>";
    //Generates the correct answer to be printed to the DOM dynamically
    showCorrectAnswer = "<p class='text-center'>The answer is " + correctAnswers[questionNumber] + "</p>";
    //Prints the above three variables to the DOM dynamically
    showQuiz = showImage + message + showCorrectAnswer;
    //Shows the quiz in the html where the class .quiz has been defined
    $(".quiz").html(showQuiz);
    //Reveals this result page for 3 seconds before moving to the next question or the summary page
    goToNext();
}

//This function is the result page that generates when the player picks the wrong answer
function showWrong() {
    //Adds to the wrong answer tracking tally
    trackWrong++;
    //Generates the answer image
    showImage = "<img class='imageHolder mb-4 mx-auto d-block' src='" + solvedImages[questionNumber] + "'>";
    //Generates "Ooooh!  So close!" message to be printed to the DOM dynamically
    message = "<p class='text-center'>Ooooh!  So close!</p>";
    //Generates the correct answer to be printed to the DOM dynamically
    showCorrectAnswer = "<p class='text-center'> The answer is " + correctAnswers[questionNumber] + "</p>";
    //Prints the above three variables to the DOM dynamically
    showQuiz = showImage + message + showCorrectAnswer;
    //Shows the quiz in the html where the class .quiz has been defined
    $(".quiz").html(showQuiz);
    //Reveals this result page for 3 seconds before moving to the next question or the summary page
    goToNext();
}

//This function is the result page that generates when the player picks the right answer
function showRight() {
    //Adds to the right answer tracking tally
    trackRight++;
    //Generates the answer image
    showImage = "<img class='imageHolder mb-4 mx-auto d-block' src='" + solvedImages[questionNumber] + "'>";
    //Generates "That's right!" message to be printed to the DOM dynamically
    message = "<p class='text-center'>That's right!</p>";
    //Prints the above two variables to the DOM dynamically
    showQuiz = showImage + message;
    //Shows the quiz in the html where the class .quiz has been defined
    $(".quiz").html(showQuiz);
    //Reveals this result page for 3 seconds before moving to the next question or the summary page
    goToNext();
}

//This function sets the time out for each question result page for 3 seconds
function goToNext() {
    setTimeout(pause, 3000);
}

//This function tells the program which page to go to next
function pause() {
    //Tells the program to continue showing questions and the timer until all the questions in the questions array have been used
    var boundary = questions.length - 1
    if (questionNumber < boundary) {
        questionNumber++;
        showGameContent();
        timer = 10;
        countDown();
    }
    // Otherwise, reveal summary page
    else {
        gameSummary();
    }
}

// This function sets the parameters for the timer
function countDown() {
    // Sets the timer to countdown per every 1 second
    timerStatus = setInterval(timesUp, 1000);
    //Tells the timer to stop at zero
    function timesUp() {
        // Tells the timer to clear and to go to the showMissed results page when it hits zero
        if (timer === 0) {
            clearInterval(timerStatus);
            showMissed();
        }
        // Tells the timer to keep running until it reaches zero
        if (timer > 0) {
            timer--;
        }
        //Shows the timer in the html where the class .timer has been defined
        $(".timer").html(timer);
    }
}

//This function generates the summary page to show the player their results when the game is over
function gameSummary() {
    //Formula to generate the player's percentage score
    var score = Math.floor((trackRight / (trackRight + trackWrong + trackMissed)) * 100);
    //Generates main image that also shows on the welcome page
    var mainImage = "./assets/images/main.png";
    //If statement to congratulate the player and show their percentage score if they scored better than or equal to 70%
    if (score >= 70) {
        message = "<p class='text-center mt-3'>Well Done!<br><br>You scored " + score + "%</p>";
        //Shows mainImage in the DOM
        showImage = "<img class='coverImageHolder mx-auto d-block' src='" + mainImage + "'>";
    } else { //Else statement to wish the player better luck next time and to show them their percentage score
        message = "<p class='text-center mt-3'>Better luck next time!<br><br>You scored " + score + "%</p>";
        //Shows mainImage in the DOM
        showImage = "<img class='coverImageHolder mx-auto d-block' id='ajdust-img' src='" + mainImage + "'>";
    }
    //These bottom three variables generate the score tracking
    var correctCount = trackRight + ' Right';
    var incorrectCount = trackWrong + ' Wrong';
    var missedCount = trackMissed + ' Missed';
    //This variable generates the score tracking information in html format
    var gameReport = "<p class='results text-center'>" + correctCount + ' ' + ' | ' + ' ' + incorrectCount + ' ' + ' | ' + ' ' + missedCount + "</p>"
    //The below prints the selected items to the DOM dynamically
    showQuiz = showImage + message + gameReport + tryAgainBtn;
    //Shows the quiz in the html where the class .quiz has been defined
    $(".quiz").html(showQuiz);
}