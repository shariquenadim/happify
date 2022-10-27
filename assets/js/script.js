let stressscore=0;
let depressionscore=0;
let anxietyscore=0;

zero = "Did not apply to me at all";
one ="Applied to me to some degree, or some of the time";
two="Applied to me to a considerable degree or a good part of time";
three= "Applied to me very much or most of the time";


//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const bottom_ques_counter = document.querySelector("footer .total_que");
// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine

    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");


// if Next Que button clicked
function nextquestion(){
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
    }else{
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'  + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ answers[0] +'</span></div>'
    + '<div class="option"><span>'+ answers[1] +'</span></div>'
    + '<div class="option"><span>'+ answers[2] +'</span></div>'
    + '<div class="option"><span>'+ answers[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent;
    let score=0;
    if(userAns==zero){
        score=0;
    }
    else if(userAns==one){
        score=1;
    }
    else if(userAns==two){
        score=2;
    }
    else if(userAns==three){
        score=3;
    }
    let questiontype=questions[que_count].type;
    if(questiontype=="stress"){
        stressscore=stressscore+score;
    }
    else if(questiontype=="anexity"){
        anxietyscore=anxietyscore+score;
    }
    else if(questiontype=="depression"){
        depressionscore=depressionscore+score;
    }
    const allOptions = option_list.children.length;
   
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    nextquestion();
}

function showResult(){
      
    anxietyscore=anxietyscore*2;
    depressionscore=depressionscore*2;
    stressscore=stressscore*2;
    
    localStorage.setItem("anxietyscore",anxietyscore);
    localStorage.setItem("depressionscore",depressionscore);
    localStorage.setItem("stressscore",stressscore);
    localStorage.setItem("astaken", 1);



    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box

    let depressionlevel="";

    if(depressionscore<=9){
        depressionlevel="Normal";
    }
    else if(depressionscore<=13 && depressionscore>= 10){
        depressionlevel="Mild";
    }
    else if(depressionscore<=20 && depressionscore>= 14){
        depressionlevel="Moderate";
    }
    else if(depressionscore<=27 && depressionscore>= 21){
        depressionlevel="Severe";
    }
    else if(depressionscore>= 28){
        depressionlevel="Extremely Severe";
    }

    let stresslevel="";
    if(stressscore<=14){
        stresslevel="Normal";
    }
    else if(stressscore<=18 && stressscore>= 15){
        stresslevel="Mild";
    }
    else if(stressscore<=25 && stressscore>= 19){
        stresslevel="Moderate";
    }
    else if(stressscore<=33 && stressscore>= 26){
        stresslevel="Severe";
    }
    else if(stressscore>= 34){
        stresslevel="Extremely Severe";
    }

    let anxietylevel="";
    if(anxietyscore<=7){
        anxietylevel="Normal";
    }
    else if(anxietyscore<=9 && anxietyscore>= 8){
        anxietylevel="Mild";
    }
    else if(anxietyscore<=14 && anxietyscore>= 10){
        anxietylevel="Moderate";
    }
    else if(anxietyscore<=19 && anxietyscore>= 15){
        anxietylevel="Severe";
    }
    else if(anxietyscore>= 20){
        anxietylevel="Extremely Severe";
    }

    localStorage.setItem("anxietylevel", anxietylevel);
    localStorage.setItem("depressionlevel", depressionlevel);
    localStorage.setItem("stresslevel", stresslevel);
    localStorage.setItem('token', 1);

    const strtext= document.getElementById("stressresult");
    const deptext= document.getElementById("depressionresult");
    const anxtext= document.getElementById("anxietyresult");

    let depressionTag = '<span> Your depression Level is <p> '+ depressionlevel + '</P>  </span>';
    deptext.innerHTML = depressionTag; 

    let stressTag = '<span> Your Stress Level is <p> '+ stresslevel + '</P>  </span>';
    strtext.innerHTML = stressTag;

    
    let anxietyTag = '<span> Your anxiety Level is <p> '+ anxietylevel + '</P>  </span>';
    anxtext.innerHTML = anxietyTag; 

   
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    console.log(index);
    console.log(questions.length);
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}