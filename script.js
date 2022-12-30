//questions and variables
var questions= [
    {question:"Given that variables a=10 and b=''10'', how would this expression return? console.log(a===b)",
    answers:["True", "False"],
    correctAnswer:"False"},
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
var startButton=document.querySelector("#start");
var timer=document.querySelector("#timer");
var secondsLeft;

//start quiz
function startQuiz(){
    
}

//correct answer

//incorrect answer & subtract time

//highscore

//event listeners
startButton.addEventListener("click", startQuiz)