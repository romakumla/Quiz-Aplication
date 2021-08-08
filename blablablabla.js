let medium_btn = document.querySelector(".medium");
let startBoxM = document.querySelector(".start_boxM");
let info_boxM = document.querySelector(".info_boxM");
let exit_btnM = document.querySelector(".exitM");
let quiz_boxM = document.querySelector(".quiz_boxM");
let continue_btnM = document.querySelector(".continueM");
let next_btnM = document.querySelector(".next_btnM");
let que_textM = document.querySelector(".que_textM");
let option_listM = document.querySelector(".option_listM");
let timeOffM = document.querySelector(".time_textM");
let timeCountM = document.querySelector(".timer_secM");
let timeLineM = document.querySelector(".time_lineM");
let result_boxM = document.querySelector(".result_boxM");
let restart_quizM = document.querySelector(".restartM");
let quit_quizM = document.querySelector(".quitM");
let tickIconM = '<div class="iconM tick"><i class="fas fa-check"></i></div>';
let crossIconM = '<div class="iconM cross"><i class="fas fa-times"></i></div>';

medium_btn.onclick = () => {
    levelBox.classList.remove("show");
    info_boxM.classList.add("show");
}
exit_btnM.onclick = () => {
    info_boxM.classList.remove("show");
    startBox.classList.remove('hide');
}

continue_btnM.onclick = () => {
    quiz_boxM.classList.add("show");
    info_boxM.classList.remove("show");
    showQuestionsM(0);
}

function showQuestionsM(index) {
    let que_textM = document.querySelector('.que_textM');
    let que_tagM = '<span>' + questionsM[index].numbM + '. ' + questionsM[index].questionM + '</span>';
    let option_tagM = '<div class="optionM"><span>' + questionsM[index].optionsM[0] + '</span></div><span>'
        + '<div class="optionM">' + questionsM[index].optionsM[1] + '</span></div>'
        + '<div class="optionM"><span>' + questionsM[index].optionsM[2] + '</span></div>'
        + '<div class="optionM"><span>' + questionsM[index].optionsM[3] + '</span></div>'
    que_textM.innerHTML = que_tagM;
    option_listM.innerHTML = option_tagM;
    let optionM = option_listM.querySelectorAll(".optionM");
    for (let i = 0; i < optionM.length; i++) {
        optionM[i].setAttribute("onclick", "optionSelected(this)");
    };
}

let que_countM = 0;
let que_numbM = 1;
let counterM;
let counterLineM;
let timeValueM = 45;
let widthValueM = 0;
let userScoreM = 0;
next_btnM.onclick = () => {
    que_countM++;
}
function queCounterM(index) {
    let bottom_que_counterM = quiz_box.querySelector('.total_queM');
    let totalQuesCountTagM = '<span><p>' + index + '</p>of<p>' + questionsM.length + '</p>Question</span>';
    bottom_que_counterM.innerHTML = totalQuesCountTagM;
}

next_btnM.onclick = () => {
    if (que_countM < questions.length - 1) {
        que_countM++;
        que_numbM++;
        showQuestionsM(que_count);
        queCounterM(que_numbM);
        clearIntervalM(counterM);
        startTimerM(timeValueM);
        clearIntervalM(counterLineM);
        startTimerLineM(widthValueM);
        next_btnM.style.display = "none";
        timeOffM.textContent = "Time Left"
    } else {
        clearIntervalM(counterM);
        clearIntervalM(counterLineM);
        console.log("Questions completed");
        showResultBoxM();
    }
}

function optionSelectedM(answerM) {
    clearIntervalM(counterLineM);
    clearIntervalM(counterM);
    let userAnsM = answerM.textContent;
    let correctAnsM = questionsM[que_countM].answerM;
    let allOptionM = option_listM.children.length;

    console.log(correctAnsM);
    if (userAnsM == correctAnsM) {
        userScoreM += 2;
        console.log(userScoreM);
        answerM.classList.add("correct")
        console.log("Answer is Correct");
        answerM.insertAdjacentHTML("beforeend", tickIconM);
    }
    else {
        answerM.classList.add("incorrect")
        console.log("Answer is Wrong");
        answerM.insertAdjacentHTML("beforeend", crossIconM);

        //auto selec correctAns
        for (let i = 0; i < allOptionM; i++) {
            if (option_listM.children[i].textContent == correctAnsM) {
                option_listM.children[i].setAttribute("class", "optionM correct")
                option_listM.children[i].insertAdjacentHTML("beforeend", tickIconM);
            }
        }
    }

    //disabled
    for (let i = 0; i < allOptionM; i++) {
        option_listM.children[i].classList.add("disabled");
    }
    next_btnM.style.display = "block";
}
//set timer
function startTimerM(timeM) {
    counterM = setInterval(timer, 1000);
    function timer() {
        timeCountM.textContent = timeM;
        timeM--;
        if (timeM < 9) {
            let addZeroM = timeCountM.textContent
            timeCountM.textContent = "0" + addZeroM;
        }
        if (timeM < 0) {
            clearIntervalM(counterM);
            timeCountM.textContent = "00"
            timeOffM.textContent = "Time off"

            let correctAnsM = questionsM[que_countM].answerM;
            let allOptionM = option_listM.children.length;

            for (let i = 0; i < allOptionM; i++) {
                if (option_listM.children[i].textContent == correctAnsM) {
                    option_listM.children[i].setAttribute("class", "optionM correct");
                    option_listM.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptionM; i++) {
                option_listM.children[i].classList.add("disabled");
            }
            next_btnM.style.display = "block";
        }

    }
}

function startTimerLineM(timeM) {
    counterLineM = setIntervalM(timer, 84);
    function timer() {
        timeM += 1;
        timeLineM.style.width = time + "px";
        if (timeM > 549) {
            clearIntervalM(counterLineM);
        }
    }
}


restart_quizM.onclick = () => {
    quiz_boxM.classList.add("show");
    result_boxM.classList.remove("show");
    let que_countM = 0;
    let que_numbM = 1;
    let timeValueM = 60;
    let widthValueM = 0;
    let userScore = 0;
    showQuestionsM(que_countM);
    queCounterM(que_numbM);
    clearIntervalM(counterM);
    startTimerM(timeValueM);
    clearIntervalM(counterLineM);
    startTimerLineM(widthValueM);
    next_btnM.style.display = "none";
    timeOffM.textContent = "Time Left";
    next_btnM.onclick = () => {
        if (que_countM < questionsM.length - 1) {
            que_countM++;
            que_numbM++;
            showQuestionsM(que_countM);
            queCounterM(que_numbM);
            clearIntervalM(counterM);
            startTimerM(timeValueM);
            clearIntervalM(counterLineM);
            startTimerLineM(widthValueM);
            next_btnM.style.display = "none";
            timeOffM.textContent = "Time Left"
        } else {
            clearIntervalM(counterM);
            clearIntervalM(counterLineM);
            console.log("Questions completed");
            showResultBoxM();
        }
    }
}

function showResultBoxM() {
    info_boxM.classList.remove("show");
    quiz_boxM.classList.remove("show");
    result_boxM.classList.add("show");
    let scoreTextM = result_boxM.querySelector(".score_textM");
    if (userScoreM > 3) {
        let scoreTagM = '<span>and congrats!, you got  <p>' + userScoreM + '</p> out of <p>' + questionsM.length + '</p></span>';
        scoreTextM.innerHTML = scoreTagM;
    }
    else if (userScoreM > 1) {
        let scoreTagM = '<span>and nice, you got  <p>' + userScoreM + '</p> out of <p>' + questionsM.length + '</p></span>';
        scoreTextM.innerHTML = scoreTagM;
    }
    else {
        let scoreTagM = '<span>and sorry, you got  <p>' + userScoreM + '</p> out of <p>' + questionsM.length + '</p></span>';
        scoreTextM.innerHTML = scoreTagM;
    }
};


quit_quizM.onclick = () => {
    window.location.reload()//gadatvirTva
}

