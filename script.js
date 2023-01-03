//questions and variables
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
var scoreboard=document.getElementById("scoreboard")
var score=document.getElementById("score")
var answersEl=document.getElementById("answers")
var questionEl=document.getElementById("question")
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
    secondsLeft=30;
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
    console.log(shuffleQs[currentQuestion]);
    questionEl.textContent=shuffleQs[currentQuestion].question
    var shuffleAns=shuffleArray(shuffleQs[currentQuestion].answers)
    answersEl.innerHTML=""
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
    correct.textContent="Correct!";
    correct.setAttribute("class", "");
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
    correct.textContent="Wrong!"
    correct.setAttribute("class","")
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
document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
})