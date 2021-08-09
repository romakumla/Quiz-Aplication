//Declarations
let quiz_boxM = document.querySelector(".quiz_boxM");
let info_boxM = document.querySelector(".info_boxM");
let exit_btnM = document.querySelector(".exitM");
let continue_btnM = document.querySelector(".continueM");
let next_btnM = document.querySelector(".next_btnM");
let option_listM = document.querySelector(".option_listM");
let timeCountM = document.querySelector(".timer_secM");
let timeLineM = document.querySelector(".time_lineM");
let result_boxM = document.querySelector(".result_boxM");
let restart_quizM = document.querySelector(".restartM");
let quit_quizM = document.querySelector(".quitM");
let timeOffM = document.querySelector(".time_textM");



exit_btnM.onclick = () => {
    info_boxM.classList.remove('show');
    start_box.classList.remove("hide");
}

continue_btnM.onclick = () => {
    info_boxM.classList.remove('show');
    quiz_boxM.classList.add('show');
    showQuestinM(0);
    queCounteM(1);
    startTimerM(45);
    startTimerLineM(0);
    timeOffM.textContent = "Time Left"
}

let que_countM = 0;
let que_numM = 1;
let counterM;
let counterLineM;
let timeValueM = 45;
let widthValueM = 0;
let userScoreM = 0;



//Next Btn click
next_btnM.onclick = () => {
    if (que_countM < questionsM.length - 1) {
        que_countM++;
        que_numM++;
        showQuestinM(que_countM);
        queCounteM(que_numM);
        clearInterval(counterM);
        startTimerM(timeValueM);
        clearInterval(counterLineM);
        startTimerLineM(widthValueM);
        timeOffM.textContent = "Time Left"
        next_btnM.style.display = "none";
    } else {
        clearInterval(counterM);
        clearInterval(counterLineM);
        console.log("Question Completed");
        showResultBoxM();

    }
}

restart_quizM.onclick = () => {
    start_box.classList.remove("hide");
    result_boxM.classList.remove("show");
    let que_countM = 0;
    let que_numM = 1;
    let timeValueM = 45;
    let widthValueM = 0;
    let userScoreM = 0;
    showQuestinM(que_countM);
    queCounteM(que_numM);
    clearInterval(counterM);
    startTimerM(timeValueM);
    clearInterval(counterLineM);
    startTimerLineM(widthValueM);
    timeOffM.textContent = "Time Left"
    next_btnM.style.display = "none";
}
quit_quizM.onclick = () => {
    window.location.reload();
}

//Get Questions and options
function showQuestinM(index) {
    let que_textM = document.querySelector(".que_textM");
    let option_listM = document.querySelector(".option_listM")
    let que_tagM = '<span>' + questionsM[index].numbM + ". " + questionsM[index].questionM + '</span>';
    let option_tagM = '<div class="optionM">' + questionsM[index].optionsM[0] + '<span></span></div>' + '<div class="optionM">' + questionsM[index].optionsM[1] + '<span></span></div>' + '<div class="optionM">' + questionsM[index].optionsM[2] + '<span></span></div>' + '<div class="optionM">' + questionsM[index].optionsM[3] + '<span></span></div>';
    que_textM.innerHTML = que_tagM;
    option_listM.innerHTML = option_tagM;
    let optionM = option_listM.querySelectorAll(".optionM");
    for (let i = 0; i < optionM.length; i++) {
        optionM[i].setAttribute("onclick", "optionMSelected(this)")
    }
}

//icons
let tickIconM = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIconM = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionMSelected(answerM) {
    clearInterval(counterLineM);
    clearInterval(counterM);
    let userAnsM = answerM.textContent;
    let correctAnsM = questionsM[que_countM].answerM;
    let allOptionsM = option_listM.children.length;
    if (userAnsM == correctAnsM) {
        userScoreM += 2;
        console.log(userScoreM);
        answerM.classList.add("correct")
        console.log("Answer is Correct!");
        answerM.insertAdjacentHTML("beforeend", tickIconM);
    } else {
        answerM.classList.add("incorrect")
        answerM.insertAdjacentHTML("beforeend", crossIconM);
        console.log("Answer is Wrong!");

        // if answer is not correct autoselect correct answer
        for (let i = 0; i < allOptionsM; i++) {
            if (option_listM.children[i].textContent == correctAnsM) {
                option_listM.children[i].setAttribute("class", "optionM correct");
                option_listM.children[i].insertAdjacentHTML("beforeend", tickIconM);
            }
        }
    }

    //Disabled Click on Options After First Click
    for (let i = 0; i < allOptionsM; i++) {
        option_listM.children[i].classList.add("disabled");
    }
    next_btnM.style.display = "block";
}


//Show Result Box
function showResultBoxM() {
    quiz_boxM.classList.remove("show");
    result_boxM.classList.add("show");
    let scoreTextM = document.querySelector(".score_textM");
    if (userScoreM > 3) {
        let scoreTagM = '<span>Congretulation, You Got <p>' + userScoreM + '</p>out of <p>' + questionsM.length * 2 + '</p></span>';
        scoreTextM.innerHTML = scoreTagM;
        console.log(userScoreM);
    }
    else if (userScoreM > 1) {
        let scoreTagM = '<span>Nice!, You Got Only<p>' + userScoreM + '</p>out of <p>' + questionsM.length * 2 + '</p></span>';
        scoreTextM.innerHTML = scoreTagM;
        console.log(userScoreM);
    }
    else {
        let scoreTagM = '<span>And Sorry, You Got only<p>' + userScoreM + '</p>out of <p>' + questionsM.length * 2 + '</p></span>';
        scoreTextM.innerHTML = scoreTagM;
        console.log(userScoreM);
    }
}

// Que Count
function queCounteM(index) {
    let bottom_que_counterM = document.querySelector(".total_queM");
    let totalQuesCounterTagM = '<span><p>' + index + '</p>of<p>' + questionsM.length + '</p>Questions</span>'
    bottom_que_counterM.innerHTML = totalQuesCounterTagM;
}


//Time Set

function startTimerM(timeM) {
    counterM = setInterval(timer, 1000);
    function timer() {
        timeCountM.textContent = timeM;
        timeM--;
        if (timeM < 9) {
            let addZero = timeCountM.textContent;
            timeCountM.textContent = "0" + addZero;
        }
        if (timeM < 0) {
            clearInterval(counterM);
            timeCountM.textContent = "00";
            timeOffM.textContent = "Time Off"
            let correctAnsM = questionsM[que_countM].answerM;
            let allOptionsM = option_listM.children.length;
            console.log("Your Time Has Finished")
            for (let i = 0; i < allOptionsM; i++) {
                if (option_listM.children[i].textContent == correctAnsM) {
                    option_listM.children[i].setAttribute("class", "optionM correct");
                    option_listM.children[i].insertAdjacentHTML("beforeend", tickIconM);
                }
            }
            for (let i = 0; i < allOptionsM; i++) {
                option_listM.children[i].classList.add("disabled");
            }
            next_btnM.style.display = "block";
        }
    }
}

//TimeLine Set

function startTimerLineM(timeM) {
    counterLineM = setInterval(timer, 84);
    function timer() {
        timeM += 1;
        timeLineM.style.width = timeM + "px";
        if (timeM > 549) {
            clearInterval(counterLineM);
        }
    }
}