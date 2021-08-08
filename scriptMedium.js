//მერე წაიშლება
let start_box = document.querySelector(".start_box");
let strat_btn = document.querySelector(".start_btn");

//ეს დარჩება
let quiz_boxM = document.querySelector(".quiz_boxM");
let info_boxM = document.querySelector(".info_boxM");
let exit_btnM = document.querySelector(".exitM");
let continue_btnM = document.querySelector(".continueM");
let next_btnM = document.querySelector(".next_btnM");
let option_listM = document.querySelector(".option_listM")

strat_btn.onclick = () => {
    start_box.classList.add("hide");
    info_boxM.classList.add('show');
}

exit_btnM.onclick = () => {
    info_boxM.classList.remove('show');
    start_box.classList.remove("hide");
}

continue_btnM.onclick = () => {
    info_boxM.classList.remove('show');
    quiz_boxM.classList.add('show');
    showQuestinM(0);
    queCounteM(1);
}

let que_countM = 0;
let que_numM = 1;

//Next Btn click
next_btnM.onclick = () => {
    if (que_countM < questionsM.length - 1) {
        que_countM++;
        que_numM++;
        showQuestinM(que_countM);
        queCounteM(que_numM);
    } else {
        console.log("Question Completed");
    }
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

function optionMSelected(answerM) {
    let userAnsM = answerM.textContent;
    let correctAnsM = questionsM[que_countM].answerM;
    let allOptionsM = option_listM.children.length;
    if (userAnsM == correctAnsM) {
        answerM.classList.add("correct")
        console.log("Answer is Correct!");
    } else {
        answerM.classList.add("incorrect")
        console.log("Answer is Wrong!");

        // if answer is not correct autoselect correct answer
        for (let i = 0; i < allOptionsM; i++) {
            if (option_listM.children[i].textContent == correctAnsM) {
                option_listM.children[i].setAttribute("class", "optionM correct")
            }
        }

    }

    //



    //Disabled Click on Options After First Click
    for (let i = 0; i < allOptionsM; i++) {
        option_listM.children[i].classList.add("disabled");
    }

}

function queCounteM(index) {
    let bottom_que_counterM = document.querySelector(".total_queM");
    let totalQuesCounterTagM = '<span><p>' + index + '</p>of<p>' + questionsM.length + '</p>Questions</span>'
    bottom_que_counterM.innerHTML = totalQuesCounterTagM;
}



