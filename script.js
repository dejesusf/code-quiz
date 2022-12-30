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
    {question:"",
    answers:"",
    correctAnswer:""},
    {question:"",
    answers:"",
    correctAnswer:""}
]
var startButton=document.querySelector("#start");
var timer=document.querySelector("#timer");
var secondsLeft;
var shuffle;

//start quiz
function startQuiz(){
    shuffle = shuffle(questions)
}

//correct answer

//incorrect answer & subtract time

//highscore

//event listeners
startButton.addEventListener("click", startQuiz)