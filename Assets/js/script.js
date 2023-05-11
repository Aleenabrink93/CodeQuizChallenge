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
    },];


// 1. Timer 
var setTime = function(){
    timeLeft = 30;

var timerCheck = setInterval(function(){
    timerEl.innerText = timeLeft;
    timeLeft--

    if (gameover){
        clearInterval(timerCheck)
    }

    if (timeLeft<0) {
        showScore()
        timerEl.innerText=0;
        clearInterval(timerCheck);
    }

}, 1000)
}

// 2. start quiz 
    // a. (hide start page/show question page)
var startGame = function() {
    startPageEl.classList.add("hide");
    startPageEl.classList.remove("show");
    questionPageEl.classList.remove("hide");
    questionPageEl.classList.add("show");

    // b. (random questions)
    randomQuestions = questions.sort(()=> Math.random() -0.5)
    setTime()
    setQuestion()
}
    // c. next question
var setQuestion = function(){
    resetAnswers()
    displayQuestion(randomQuestions[questionIndex])
}

var resetAnswers = function() {
    while (choicesEl.firstChild){
        choicesEl.removeChild(choicesEl.firstChild)
    };
};

var displayQuestion = function(index){
    questionEl.innerText = index.q
    for (var i=0; i<index.choices.length;i++) {
        var answerbutton = document.createElement("button");
        answerbutton.innerText =index.choices[i].choice;
        answerbutton.classList.add("btn");
        answerbutton.classList.add("answerbtn")
        answerbutton.addEventListener("click",answerCheck);
        choicesEl.appendChild(answerbutton);
    }
}

        
// display "correct!"
var answerCorrect = function () {
    if (correctEl.className="hide"){
        correctEl.classList.remove("hide");
        correctEl.classList.add("banner");
        wrongEl.classList.remove("banner");
        wrongEl.classList.add("hide");
    }
}
// display "wrong!"
var answerWrong = function () {
    if (wrongEl.className="hide"){
        wrongEl.classList.remove("hide");
        wrongEl.classList.add("banner");
        correctEl.classList.remove("banner");
        correctEl.classList.add("hide");
    }
}

//check answers
var answerCheck = function(event){
    var selectedAnswer = event.target;
    //if answer is correct, add 2 to score
        if (randomQuestions[questionIndex].a===selectedAnswer.innerText){
            answerCorrect();
            score = score + 2;
        }
    //if answer is wrong, minus 1 from score and 3 from timer
        else{
            answerWrong();
            score = score -1;
            timeLeft= timeLeft-3;
        };

    questionIndex++
        if (randomQuestions.length>questionIndex+1){
            setQuestion()
        }
        else{
            gameover = "true";
            showScore();
        }
}
        
// display score when game is finish

var showScore = function(){
    questionPageEl.classList.add("hide");
    finishPageEl.classList.remove("hide");
    finishPageEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your score is " + score + "!");
    scoreBannerEl.appendChild(scoreDisplay);

    correctEl.classList.add("hide");
    wrongEl.classList.add("hide");

}
// save initials
var createHighScore = function(event) {
    event.preventDefault();

    var initials = document.querySelector('#initials').value;
    if (!initials){
        alert("Enter your initials!");
        return;
    }

    saveScoreForm.reset();

    var Highscore = {
        initials: initials,
        score: score
    }

    //push and sort scores
    highScores.push(Highscore);
    highScores.sort((a,b)=>{return b.score-a.score});
     
    while (highScoreListEl.firstChild){
        highScoreListEl.removeChild(highScoreListEl.firstChild)
    }

    for (var i=0; i< highScores.length;i++){
        var highscoreEL = document.createElement("li");
        highscoreEL.className ="high-score";
        highscoreEL.innerHTML = highScores[i].initials+"-"+highScores[i].score;
        highScoreListEl.appendChild(highscoreEL);
    }

    saveHighScore();
    displayHighScores();
}

var saveHighScore = function(){
    localStorage.setItem("HighScores",JSON.stringify(highScores))
        if (!loadedHighScores){
            return false;
        }

        loadedHighScores = JASON.parse(loadedHighScores);
        loadedHighScores.sort((a,b)=> {return b.score-a.score})

        for (var i=0; i<loadedHighScores.length; i++){
            var highscoresEl = document.createElement("li");
            highscoresEl.className = "high0-score";
            highscoresEl.innerText =loadedHighScores[i].initials + "-"+ loadedHighScores[i].score;
            highScoreListEl.appendChild(highscoresEl);

            highScores.push(loadedHighScores[i]);
        }
}
// display highscore page
var displayHighScores = function() {
    scorePageEl.classList.remove ("hide");
    scorePageEl.classList.add ("show");
    gameover = "true";

    if (finishPageEl.className ="show"){
        finishPageEl.classList.remove("show");
        finishPageEl.classList.add("hide");
    }
    if (startPageEl.className="show"){
        startPageEl.classList.remove("show");
        startPageEl.classList.add("hide");
    }
    if (correctEl.className="show"){
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    if (wrongEl.className="show"){
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}
// clear scores on high score page
var clearScore = function(){
    highScores =[];

    while (highScoreListEl.firstChild){
        highScoreListEl.removeChild(highScoreListEl.firstChild);
    }

    localStorage.clear(highScores)
}

//load start page when back button is clicked
var renderStartPage = function(){
    scorePageEl.classList.add("hide");
    scorePageEl.classList.remove("show");
    startPageEl.classList.remove("hide");
    startPageEl.classList.add("show");
    scoreBannerEl.removeChild(scoreBannerEl.lastChild);
    questionIndex = 0;
    gameover="";
    timerEl.textContent =0;
    score= 0

    if (correctEl.className="show"){
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className="show"){
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }

}

//button actions
startBtn.addEventListener("click",startGame)
saveScoreForm.addEventListener("submit",createHighScore);
viewHighScoreEl.addEventListener("click",displayHighScores);
backBtn.addEventListener("click", renderStartPage);
clearBtn.addEventListener("click",clearScore);
