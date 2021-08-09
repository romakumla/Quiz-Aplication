//Declarations H
let quiz_boxH = document.querySelector(".quiz_boxH");
let info_boxH = document.querySelector(".info_boxH");
let exit_btnH = document.querySelector(".exitH");
let continue_btnH = document.querySelector(".continueH");
let next_btnH = document.querySelector(".next_btnH");
let option_listH = document.querySelector(".option_listH");
let timeCountH = document.querySelector(".timer_secH");
let timeLineH = document.querySelector(".time_lineH");
let result_boxH = document.querySelector(".result_boxH");
let restart_quizH = document.querySelector(".restartH");
let quit_quizH = document.querySelector(".quitH");
let timeOffH = document.querySelector(".time_textH");



exit_btnH.onclick = () => {
    info_boxH.classList.remove('show');
    start_box.classList.remove("hide");
}

continue_btnH.onclick = () => {
    info_boxH.classList.remove('show');
    quiz_boxH.classList.add('show');
    showQuestinH(0);
    queCounteH(1);
    startTimerH(30);
    startTimerLineH(0);
    timeOffH.textContent = "Time Left"
}

let que_countH = 0;
let que_numH = 1;
let counterH;
let counterLineH;
let timeValueH = 30;
let widthValueH = 0;
let userScoreH = 0;



//Next Btn click
next_btnH.onclick = () => {
    if (que_countH < questionsH.length - 1) {
        que_countH++;
        que_numH++;
        showQuestinH(que_countH);
        queCounteH(que_numH);
        clearInterval(counterH);
        startTimerH(timeValueH);
        clearInterval(counterLineH);
        startTimerLineH(widthValueH);
        timeOffH.textContent = "Time Left"
        next_btnH.style.display = "none";
    } else {
        clearInterval(counterH);
        clearInterval(counterLineH);
        console.log("Question Completed");
        showResultBoxH();
    }
}

restart_quizH.onclick = () => {
    start_box.classList.remove("hide");
    result_boxH.classList.remove("show");
    let que_countH = 0;
    let que_numH = 1;
    let timeValueH = 30;
    let widthValueH = 0;
    let userScoreH = 0;
    showQuestinH(que_countH);
    queCounteH(que_numH);
    clearInterval(counterH);
    startTimerH(timeValueH);
    clearInterval(counterLineH);
    startTimerLineH(widthValueH);
    timeOffH.textContent = "Time Left"
    next_btnH.style.display = "none";
}

quit_quizH.onclick = () => {
    window.location.reload();
}

//Get Questions and options
function showQuestinH(index) {
    let que_textH = document.querySelector(".que_textH");
    let option_listH = document.querySelector(".option_listH")
    let que_tagH = '<span>' + questionsH[index].numbH + ". " + questionsH[index].questionH + '</span>';
    let option_tagH = '<div class="optionH">' + questionsH[index].optionsH[0] + '<span></span></div>' + '<div class="optionH">' + questionsH[index].optionsH[1] + '<span></span></div>' + '<div class="optionH">' + questionsH[index].optionsH[2] + '<span></span></div>' + '<div class="optionH">' + questionsH[index].optionsH[3] + '<span></span></div>';
    que_textH.innerHTML = que_tagH;
    option_listH.innerHTML = option_tagH;
    let optionH = option_listH.querySelectorAll(".optionH");
    for (let i = 0; i < optionH.length; i++) {
        optionH[i].setAttribute("onclick", "optionHSelected(this)")
    }
}

//icons
let tickIconH = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIconH = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionHSelected(answerH) {
    clearInterval(counterLineH);
    clearInterval(counterH);
    let userAnsH = answerH.textContent;
    let correctAnsH = questionsH[que_countH].answerH;
    let allOptionsH = option_listH.children.length;
    if (userAnsH == correctAnsH) {
        userScoreH += 3;
        console.log(userScoreH);
        answerH.classList.add("correct")
        console.log("Answer is Correct!");
        answerH.insertAdjacentHTML("beforeend", tickIconH);
    } else {
        answerH.classList.add("incorrect")
        answerH.insertAdjacentHTML("beforeend", crossIconH);
        console.log("Answer is Wrong!");

        // if answer is not correct autoselect correct answer
        for (let i = 0; i < allOptionsH; i++) {
            if (option_listH.children[i].textContent == correctAnsH) {
                option_listH.children[i].setAttribute("class", "optionH correct");
                option_listH.children[i].insertAdjacentHTML("beforeend", tickIconH);
            }
        }
    }

    //Disabled Click on Options After First Click
    for (let i = 0; i < allOptionsH; i++) {
        option_listH.children[i].classList.add("disabled");
    }
    next_btnH.style.display = "block";
}


//Show Result Box
function showResultBoxH() {
    quiz_boxH.classList.remove("show");
    result_boxH.classList.add("show");
    let scoreTextH = document.querySelector(".score_textH");
    if (userScoreH > 6) {
        let scoreTagH = '<span>Congretulation, You Got <p>' + userScoreH + '</p>out of <p>' + questionsH.length * 3 + '</p></span>';
        scoreTextH.innerHTML = scoreTagH;
        console.log(userScoreH);
    }
    else if (userScoreH > 1) {
        let scoreTagH = '<span>Nice!, You Got Only<p>' + userScoreH + '</p>out of <p>' + questionsH.length * 3 + '</p></span>';
        scoreTextH.innerHTML = scoreTagH;
        console.log(userScoreH);
    }
    else {
        let scoreTagH = '<span>And Sorry, You Got only<p>' + userScoreH + '</p>out of <p>' + questionsH.length * 3 + '</p></span>';
        scoreTextH.innerHTML = scoreTagH;
        console.log(userScoreH);
    }
}

// Que Count
function queCounteH(index) {
    let bottom_que_counterH = document.querySelector(".total_queH");
    let totalQuesCounterTagH = '<span><p>' + index + '</p>of<p>' + questionsH.length + '</p>Questions</span>'
    bottom_que_counterH.innerHTML = totalQuesCounterTagH;
}

//Time Set
function startTimerH(timeH) {
    counterH = setInterval(timer, 1000);
    function timer() {
        timeCountH.textContent = timeH;
        timeH--;
        if (timeH < 9) {
            let addZeroH = timeCountH.textContent;
            timeCountH.textContent = "0" + addZeroH;
        }
        if (timeH < 0) {
            clearInterval(counterH);
            timeCountH.textContent = "00";
            timeOffH.textContent = "Time Off"
            let correctAnsH = questionsH[que_countH].answerH;
            let allOptionsH = option_listH.children.length;
            console.log("Your Time Has Finished")
            for (let i = 0; i < allOptionsH; i++) {
                if (option_listH.children[i].textContent == correctAnsH) {
                    option_listH.children[i].setAttribute("class", "optionH correct");
                    option_listH.children[i].insertAdjacentHTML("beforeend", tickIconH);
                }
            }
            for (let i = 0; i < allOptionsH; i++) {
                option_listH.children[i].classList.add("disabled");
            }
            next_btnH.style.display = "block";
        }
    }
}

//TimeLine Set
function startTimerLineH(timeH) {
    counterLineH = setInterval(timer, 56);
    function timer() {
        timeH += 1;
        timeLineH.style.width = timeH + "px";
        if (timeH > 549) {
            clearInterval(counterLineH);
        }
    }
}