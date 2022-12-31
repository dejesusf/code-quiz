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
var start=document.getElementById("start");
var timer=document.getElementById("timer");
var details=document.getElementById("details");
var quiz=document.getElementById("quiz");
var correct=document.getElementById("correct");
var scoreboard=document.getElementById("scoreboard")
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
    secondsLeft=60;
    timer.textContent=secondsLeft + " second(s) remaining!"
    timerInterval=setInterval(()=>{
        secondsLeft--;
        timer.textContent=secondsLeft + " second(s) remaining!"
        if (secondsLeft<=0){
            endQuiz()
        }
    },1000);
    nextQuestion()
}

//next question
function nextQuestion(){
    question.setAttribute("class","");
    answers.setAttribute("class","");
    correct.setAttribute("class","hidden");
    
}

//correct answer

//incorrect answer & subtract time

//game over
function endQuiz(){
    clearInterval(timerInterval);
    quiz.setAttribute("class","hidden");

}
//highscore

//event listener
start.addEventListener("click",startQuiz);