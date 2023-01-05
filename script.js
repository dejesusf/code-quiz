//questions and other variables
var questions= [
    {question:"Given that variables a=10 and b=''10'', how would this expression return? console.log(a===b)",
    answers:["True", "False", "Equal", "Not Equal"],
    correctAnswer: "False"},

    {question:"In this array: dogs, cats, mice, lions, what would index 2 refer to?",
    answers:["Dogs", "Cats", "Mice", "Lions"],
    correctAnswer:"Mice"},

    {question:"Where does the JavaScript code belong?",
    answers:["Head", "Top of Body", "Middle of Body", "Bottom of Body"],
    correctAnswer:"Bottom of Body"},

    {question:"What is a string?",
    answers:["A number","A series of characters surrounded by quotation marks", "A thin strand of material similar to rope", "A variable"],
    correctAnswer:"A series of characters surrounded by quotation marks"},

    {question:"What does this (!) operator mean?",
    answers:["Greater than", "Strict equality", "Less Than", "Not"],
    correctAnswer:"Not"}
]
var start=document.getElementById("start");
var timer=document.getElementById("timer");
var details=document.getElementById("details");
var quiz=document.getElementById("quiz");
var correct=document.getElementById("correct");
var scoreboard=document.getElementById("scoreboard");
var score=document.getElementById("score");
var scoreboardUl=document.getElementById("scores");
var answersEl=document.getElementById("answers");
var questionEl=document.getElementById("question");
var initial=document.querySelector("input");
var currentQuestion=0;
var secondsLeft;
var timerInterval;
var shuffleQs;

//randomize questions - Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (var i=array.length-1; i>0; i--){
        var j=Math.floor(Math.random()*(i+1));
        var temp=array[i];
        array [i]=array[j];
        array[j]=temp;
    }
    return array;
}

//start quiz
function startQuiz(){
    details.setAttribute("class","hidden")
    quiz.setAttribute("class","")
    shuffleQs=shuffleArray(questions)
    //timer
    secondsLeft=30;
    timer.textContent=secondsLeft + " second(s) remaining!"
    //timer countdown
    timerInterval=setInterval(()=>{
        secondsLeft--;
        timer.textContent=secondsLeft + " second(s) remaining!"
        //condition if seconds is less than or equal to 0, seconds will equal to zero, and end quiz
        //also this will make it so that the score is not a negative number
        if (secondsLeft<=0){
            secondsLeft=0;
            endQuiz()
        }
    },1000);
    nextQuestion()
}

//pull next question
function nextQuestion(){
    question.setAttribute("class","");
    answers.setAttribute("class","");
    correct.setAttribute("class","hidden");
    console.log(shuffleQs[currentQuestion]);
    questionEl.textContent=shuffleQs[currentQuestion].question
    var shuffleAns=shuffleArray(shuffleQs[currentQuestion].answers)
    answersEl.innerHTML=""
    //create answer buttons, add text, then append
    shuffleAns.forEach(answers=>{
        var answerButtons=document.createElement("button");
            answerButtons.textContent=answers;
            //(condition to test)?(value if true):(value if false).
            answers===shuffleQs[currentQuestion].correctAnswer? answerButtons.setAttribute("data-correct", "yes"):null;
            answersEl.append(answerButtons)
    })
}

//correct answer
function rightAnswer(){
    correct.setAttribute("class","");
    correct.textContent="Correct!";
    currentQuestion++;
    if (currentQuestion<shuffleQs.length){
        setTimeout(nextQuestion,1000)
    } else {
        endQuiz()
    }
}

//incorrect answer & subtract time
//this function should be similar to the correct answer
function wrongAnswer(){
    correct.setAttribute("class","")
    correct.textContent="Wrong!"
    currentQuestion++;
    secondsLeft-=10;
    if (currentQuestion<shuffleQs.length){
        setTimeout(nextQuestion,1000)
    } else {
        endQuiz()
    }
}

//game over & scoreboard
function endQuiz(){
    clearInterval(timerInterval);
    quiz.setAttribute("class","hidden");
    scoreboard.setAttribute("class","")
    timer.textContent="";
    score.textContent=secondsLeft;
}

//event listeners
start.addEventListener("click",startQuiz);
answersEl.addEventListener("click", function(event){
    if (event.target.matches("button")){
        event.target.getAttribute("data-correct")?rightAnswer():wrongAnswer()
    }
})

//use localStorage to save scores to scoreboard
function saveScore() {
    var userScore={
        initials: initial.value,
        points: secondsLeft
    };
    localStorage.setItem("userScore",JSON.stringify(userScore));
}

function renderSaveScore() {
    var lastScore= JSON.parse(localStorage.getItem("userScore"));
    if (lastScore !==null) {
        var lastScoreInput=document.createElement("li");
        lastScoreInput.textContent=lastScore;
        scoreboardUl.append(lastScoreInput)
    } else {
        return;
    }
}

document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    saveScore();
    renderSaveScore();
})