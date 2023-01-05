//questions pool
var questions= [
    {question:"Which type is NOT a partner Pokemon that you receive at the beginning of every game?",
    answers:["Electric", "Fire", "Water", "Grass"],
    correctAnswer: "Electric"},

    {question:"Which would be most effective against a dark-type?",
    answers:["Fighting", "Normal", "Flying", "Dark"],
    correctAnswer:"Fighting"},

    {question:"Which would be the most effective move against a ground/water type?",
    answers:["Grass", "Electric", "Rock", "Poison"],
    correctAnswer:"Grass"},

    {question:"If a move is 'super effective', how much damage does it deal?",
    answers:["2x","1.5x", "1x", "0x"],
    correctAnswer:"2x"},

    {question:"If a move is 'not very effective', how much damage does it deal?",
    answers:["0.5x", "2x", "1x", "0x"],
    correctAnswer:"0.5x"},

    {question:"Which type is the newest?",
    answers:["Fairy", "Dark", "Dragon", "Steel"],
    correctAnswer:"Fairy"},

    {question:"Gyarados is what type of pokemon?",
    answers:["Water/Flying", "Water/Dragon", "Dragon/Flying", "Water/Normal"],
    correctAnswer:"Water/Flying"},

    {question:"If your opponent is using a Dark/Psychic Pokemon, what would be the most effective Pokemon type or move to use?",
    answers:["Bug", "Ghost", "Fairy", "Steel"],
    correctAnswer:"Bug"},

    {question:"What happens when a normal type move is used on a ghost type Pokemon?",
    answers:["Has no effect", "Super effective", "Not very effective", "Critical Hit"],
    correctAnswer:"Has no effect"},

    {question:"In the most recent generation of Pokemon games (Scarlet & Violet), what type of Pokemon will your rival choose if you picked a Fire type?",
    answers:["Grass", "Water", "Fire", "Electric"],
    correctAnswer:"Grass"}
]
//button variables
var start=document.getElementById("start");
//section variables
var details=document.getElementById("details");
var quiz=document.getElementById("quiz");
var scoreboard=document.getElementById("scoreboard");
//quiz section variables
var questionEl=document.getElementById("question");
var answersEl=document.getElementById("answers");
var correct=document.getElementById("correct");
var currentQuestion=0;
//timer variables
var timer=document.getElementById("timer");
var timerInterval;
var secondsLeft;
//scoreboard variables
var score=document.getElementById("score");
var scoreboardUl=document.getElementById("scores");
var initial=document.querySelector("input");
//other variables
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
    secondsLeft=150;
    timer.textContent=secondsLeft + " second(s) remaining!"
    //timer countdown
    timerInterval=setInterval(()=>{
        secondsLeft--;
        timer.textContent=secondsLeft + " second(s) remaining!"
        if (secondsLeft<=0){
            endQuiz();
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
    correct.textContent="CORRECT!";
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
    correct.textContent="WRONG!"
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
    //score is not a negative number
    if (secondsLeft<0){
        secondsLeft=0;
    }
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
    var lastScore=JSON.parse(localStorage.getItem("userScore"));
    if (lastScore !==null) {
        var lastScoreInput=document.createElement("li");
        lastScoreInput.textContent=lastScore.initials + " ---------- " + lastScore.points;
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