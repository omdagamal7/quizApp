export class Quiz {
  constructor(results){

    // API DATA FROM SETTING FILE
    this.results = results;


    // SET QUESTIONS COUNT IN HTML
    $("#to").html(this.results.length)
    // SELECT QUESTION TITLE ELEMENT
    this.questionTitle = document.getElementById("questionTitle")
    // VARIABLE FOR COUNTING QUESTIONS
    this.currentIndex = 0;
    // CORECT ANSWER FROM USE OUTSIDE CONSTRUCTOR
    this.correctAnswer;

    // * RELOADING END PAGE FOR RESTART GAME
    $("#end").click(()=>{
      location.reload();
    })
    // FOR COUNTING CORRECT ANSWERS
    this.score = 0;
    // RUN SHOW QUESTION FUNCTION
    this.showQuestion();
  }
  showQuestion(){
    //  SET CURRENT QUESTION COUNT IN HTML
      $("#from").html(this.currentIndex + 1);
      // CURRENT QUESTION
      const currentQuestion = this.results[this.currentIndex].question;
      // SET CURRENT QUESTION IN HTML
      this.questionTitle.innerHTML = currentQuestion;
      // FOR GET THE CORRECT ANSWER FROM API DATA
      this.correctAnswer = this.results[this.currentIndex].correct_answer;
      // FOR GET THE ARRAY OF INCORRECT ANSWER FROM API DATA
      const answers = this.results[this.currentIndex].incorrect_answers;
      // GENERATE RANDOM NUMBER FROM 0 TO 3
      const randomNumber = Math.round(Math.random()*answers.length);
      // FOR ADD CORRECT ANSWER BETWEEN INCORRECT ANSWERS IN RANDOM INDEX
      answers.splice(randomNumber,0,this.correctAnswer);
      //! RUN THE NEXT QUESTION FUNCTION AS CLICK ON NEXT
      $("#nextQuestion").click(()=>{
        this.nextQuestion()
      })
      // FOR SET ANSWERS IN HTML
      let option = '';
      for (let i = 0; i < answers.length; i++) {
        option += `<li class="my-3 animate__animated">
        <div class="pretty p-default p-round p-smooth p-plain">
          <input type="radio" name="answer" value="${answers[i]}" />
          <label> ${answers[i]} </label>
        </div>
      </li>`
        
      }
      $("#questionContent").html(option)
    }
    // ! NEXT QUESTION
  nextQuestion(){
    // GET THE ANSWER IS CHECKED
    const answerChecked = document.querySelector("[name='answer']:checked").value;

    if (answerChecked == undefined) {
      // SHOWING THIS ALERT IF NOT CHECKED VALUE
      $("#alertAns").fadeIn(300);

    } else {
      // IF CHECKED VALUE CURRENT INDEX + 1
      this.currentIndex++;
      // IF CHECKED VALUE HIDE ALERT
      $("#alertAns").fadeOut(300);

      if (this.currentIndex > this.results.length - 1) {
        // HIDE QUIZ PAGE
        $("#quiz").removeClass("show");
        // SHOW QUIZ SCORE
        $("#finish").addClass("show");
        // SET SCORE IN HTML
        $("#score").html(this.score);

      } else {

        if (answerChecked == this.correctAnswer) {
          // HIDE ALERT INCOTTECT
          $("#inCorrect").fadeOut(0);
          // SHOW ALERT CORRECT
          $("#correct").fadeIn(800);
          // SCORE + 1
          this.score++;
        } else {
          // HIDE ALERT CORRECT
          $("#correct").fadeOut(0);
          // SHOW ALERT INCORRECT
          $("#inCorrect").fadeIn(800);
        }

        // AND RUN SHOW QUESTION FUNCTION
        this.showQuestion();
      }
    }

  }
  
}