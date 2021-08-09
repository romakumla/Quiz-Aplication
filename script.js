let startBox = document.querySelector(".start_box");
let levelBox = document.querySelector(".levelBox");
let start_btn = document.querySelector(".start_box button");
let level_text = document.querySelector(".level_text");
let easyBtn = document.querySelector(".easy");
let info_box = document.querySelector(".info_box");
let exit_btn = info_box.querySelector(".Exit");
let quiz_box = document.querySelector(".quiz_box");
let continue_btn = info_box.querySelector(".continue");
let next_btn = quiz_box.querySelector(".next_btn");
let que_text = quiz_box.querySelector(".que_text");
let option_list = quiz_box.querySelector(".option_list");
let timeOff = quiz_box.querySelector(".time_text");
let timeCount = quiz_box.querySelector(".timer .timer_sec");
let timeLine = quiz_box.querySelector("header .time_line");
let result_box = document.querySelector(".result_box");
let restart_quiz = result_box.querySelector(".buttons .restart");
let quit_quiz = result_box.querySelector(".buttons .quit");
let firstName = document.getElementById("firstName").value;
let lastName = document.getElementById("lastName").value;
let medium_btn = document.querySelector(".medium");
let hard_btn = document.querySelector(".hard");
let bottom_que_counter = quiz_box.querySelector('.total_que');



//Start Button from Start Box
start_btn.onclick = () => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    level_text.innerHTML = `${firstName} ${lastName} Chose Quiz Level`
    startBox.classList.add('hide');
    levelBox.classList.add("show");
}

function isEmpty() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    if (firstName != "" && lastName != "") {
        start_btn.removeAttribute("disabled");
    }
}

//Easy Button from Level Box
easyBtn.onclick = () => {
    levelBox.classList.remove("show");
    info_box.classList.add("show");
}

//Medium Button from Level Box
medium_btn.onclick = () => {
    levelBox.classList.remove("show");
    info_boxM.classList.add('show');
}

//Hard Button from Level Box
hard_btn.onclick = () => {
    levelBox.classList.remove("show");
    info_boxH.classList.add('show');
}

//Exit Button from Info Box
exit_btn.onclick = () => {
    levelBox.classList.remove("show");
    info_box.classList.remove("show");
    startBox.classList.remove('hide');
}

//Continue Button from Info Box
continue_btn.onclick = () => {
    quiz_box.classList.add("show");
    info_box.classList.remove("show");
    showQuestions(0);
    queCounter(1);
    startTimer(60);
    startTimerLine(0);
}

//ShowQuestions
function showQuestions(index) {
    let que_text = document.querySelector('.que_text');
    let que_tag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    let option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    };
}

//Next Button from Quiz Box
let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 60;
let widthValue = 0;
let userScore = 0;
next_btn.onclick = () => {
    que_count++;
}
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left"
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
}

//Restart Button from Info Box
restart_quiz.onclick = () => {
    quiz_box.classList.add("show");
    result_box.classList.remove("show");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 60;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
    next_btn.onclick = () => {
        if (que_count < questions.length - 1) {
            que_count++;
            que_numb++;
            showQuestions(que_count);
            queCounter(que_numb);
            clearInterval(counter);
            startTimer(timeValue);
            clearInterval(counterLine);
            startTimerLine(widthValue);
            next_btn.style.display = "none";
            timeOff.textContent = "Time Left"
        } else {
            clearInterval(counter);
            clearInterval(counterLine);
            console.log("Questions completed");
            showResultBox();
        }
    }
}


//Icons
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Option Selected Function
function optionSelected(answer) {
    clearInterval(counterLine);
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOption = option_list.children.length;
    console.log(correctAns);
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct")
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        answer.classList.add("incorrect")
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //Auto Selec CorrectAns
        for (let i = 0; i < allOption; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //Disabled Options
    for (let i = 0; i < allOption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

//Sow Results
function showResultBox() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    info_box.classList.remove("show");
    quiz_box.classList.remove("show");
    result_box.classList.add("show");
    let scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>Congratulation! <p>' + firstName + '</p>You Got  <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
        console.log(`User: ${firstName} ${lastName} Has Gained ${userScore} Points`);
    }
    else if (userScore > 1) {
        let scoreTag = '<span>Nice!<p>' + firstName + '</p> You Got  <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
        console.log(`User: ${firstName} ${lastName} Has Gained ${userScore} Points`);
    }
    else {
        let scoreTag = '<span>Sorry!<p>' + firstName + '</p> You Got  <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
        console.log(`User: ${User} Has Gained ${userScore} Points`);
    }
}

//Set Timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00"
            timeOff.textContent = "Time Off"

            let correctAns = questions[que_count].answer;
            let allOption = option_list.children.length;

            for (let i = 0; i < allOption; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct")
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOption; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

//Time Line
function startTimerLine(time) {
    counterLine = setInterval(timer, 110);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

//Quit Button From Result Box
quit_quiz.onclick = () => {
    window.location.reload()//gadatvirTva
}

//Que Counter
function queCounter(index) {
    let bottom_que_counter = quiz_box.querySelector('.total_que');
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Question</span>';
    bottom_que_counter.innerHTML = totalQuesCountTag;
}

