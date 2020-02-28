/* GLOBAL VARIABLES */

var score = 0;
var currentQuestion = 0;

/* QUESTION AND ANSWER ARRAYS */

var questions = [{
        title: "In which country can you find The Great Pyramid of Giza?",
        answers: ['United States', 'Turkey', 'Egypt', 'Germany'],
        correct: 2
    },
    {
        title: "In which country can you find the Eiffel Tower?",
        answers: [
            'Italy', 'France', 'Japan', 'Argentina'
        ],
        correct: 1
    },
    {
        title: "In which country can you find the world's longest manmade structure?",
        answers: ['Morocco', 'Chile', 'Peru', 'China'],
        correct: 3
    },
    {
        title: "In which country is the Taj Mahal located?",
        answers: ['India', 'Bangladesh', 'Philippines', 'Vietnam'],
        correct: 0
    },
    {
        title: "In which of these United States can you find the Grand Canyon?",
        answers: ['Nevada', 'Utah', 'Arizona', 'Maine'],
        correct: 2
    },
    {
        title: "In which country can you find the Great Barrier Reef?",
        answers: ['Mexico', 'Australia', 'Madagascar', 'Venuzuela'],
        correct: 1
    },
    {
        title: "Mount Everest is located on the border of which two countries?",
        answers: ['United States & Canada', 'Norway & Sweden', 'Netherlands & Belgium', 'Nepal & China'],
        correct: 3
    },
    {
        title: "Victoria Falls is located on the border of which two countries",
        answers: ['Zambia & Zimbabwe', 'Haiti & The Dominican Republic', 'Poland & Ukraine', 'Spain & Portugal'],
        correct: 0
    },
    {
        title: "In which country can you find the Leaning Tower of Pisa?",
        answers: ['France', 'Sweden', 'Italy', 'Brazil'],
        correct: 2
    },
    {
        title: "Where are you if you are visiting Edinburgh Castle?",
        answers: ['Northern Ireland', 'Scotland', 'Wales', 'England'],
        correct: 1
    },
];

/* EVENT LISTENERS */

$(document).ready(function () {

    /* START BUTTON */

    $('.start a').click(function (e) {
        e.preventDefault();
        $('.start').hide();
        $('.quiz').show();
        showQuestion();
    });

    /* WHEN A LIST ITEM (ANSWER) IS SELECTED */

    $('.quiz ul').on('click', 'li', function () {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    })

    /* SUBMIT BUTTON AND ALERT IF SUBMIT IS CLICKED PRIOR TO THE USER MAKING A CHOICE */

    $('.quiz a').click(function (e) {
        e.preventDefault();
        if ($('li.selected').length) {
            var guess = parseInt($('li.selected').attr('id'));
            checkAnswer(guess);
        } else {
            alert('Please select an answer');
        }
    });

    /* RESTART QUIZ (SHOWS ON SUMMARY PAGE) */

    $('.summary a').click(function (e) {
        e.preventDefault();
        restartQuiz();
    })

});

/* FUNCTIONS */

function showQuestion() {
    var question = questions[currentQuestion];
    $('.quiz h2').text(question.title);
    $('.quiz ul').html('');
    for (var i = 0; i < question.answers.length; i++) {
        $('.quiz ul').append(`
    <li id="${i}">${question.answers[i]}</li>`);
    }
}

function checkAnswer(guess) {
    var question = questions[currentQuestion];
    if (question.correct === guess) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showSummary();
    } else {
        showQuestion();
    }
}

function showSummary() {
    $('.quiz').hide();
    $('.summary').show();
    $('.summary p').text("Congratulations! You scored " + score + " out of " + questions.length + " correct!");
}

function restartQuiz() {
    $('.summary').hide();
    $('.quiz').show();
    score = 0;
    currentQuestion = 0;
    showQuestion();
}