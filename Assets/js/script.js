// link slides
var startPageEl = document.getElementById("start-page");
var questionPageEl = document.getElementById("question-page");
var finishPageEl = document.getElementById("finish-page");
var scoreBannerEl = document.getElementById("score-banner");
var scorePageEl = document.getElementById("high-score-page");
var saveScoreForm = document.getElementById("savescore");
var viewHighScoreEl=document.getElementById("view-high-score");
var highScoreListEl =document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

// link buttons
var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("submit");
var backBtn = document.getElementById("back");
var clearBtn = document.getElementById("clear");

//questions page
var questionEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var timerEl=document.getElementById("timer");
var score = 0;
var timeLeft;
var gameover;
timerEl.innerText =0;
var randomQuestions;
var questionIndex =0;

//highscore page
var highScores = [];

//set of Questions

var questions = [
    {   q:"Which of the following is a disadvantage of using JavaScript?",
        a:"D. All of the above",
        choices:[{choice: "A. Client-side JavaScript does not allow the reading or writing files."},
        {choice:"B. JavaScript can not be used for Networking applications because there is no such support available."},
        {choice:"C. JaveScript doesn't have any multithreading or multiprocess capabilities."},
        {choice:"D. All of the above."} ]
    },
    {   q:"How can you get they type of arguments passed to a function?",
        a:"A. using typeof operator",
        choices:[{choice: "A. using typeof operator"},
        {choice:"B. using getType function"},
        {choice:"C. Both of the above."},
        {choice:"D. None of the above."} ]
        },
    {   q:"Which built-in method returns the string representation of the number's value?",
         a:"C. toString()",
        choices:[{choice: "A. toValue()"},
        {choice:"B. toNumber()"},
        {choice:"C. toString()"},
        {choice:"D. None of the above."} ]
    },
    {   q:"Which of the following function of String object causes a string to be displayed as a subscript, as if it were in a <sub> tag?",
        a:"D. sub()",
        choices:[{choice: "A. up()"},
        {choice:"B. small()"},
        {choice:"C. strike()"},
        {choice:"D. sub()"} ]
    },
    {   q:"Which of the following function of Array object creates a new array with all the elments of this array for which the provided filtering function returns true?",
        a:"C. filter()",
        choices:[{choice: "A. concat()"},
        {choice:"B. every()"},
        {choice:"C. filter()"},
        {choice:"D. some()"} ]
    }]



// 1. start button

// 2. Timer 
        //a. starts count down when button is clicked
        //b. when the timer reach 0, print "game is over"
// 3. Answering questions
        // a. if the anwswer is right 
            // you are presented with another questions
            // score are counting
        // b. if the answer is wrong
            // the time is substracted from the clock
    
// 4. save initials and score when game is over