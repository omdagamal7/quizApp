export class Quiz {
  constructor(results){

    // API VALUE
    this.results = results;

    console.log(this.results);
    // QUESTIONS COUNTER
    $("#to").html(this.results.length)

    this.questionTitle = document.getElementById("questionTitle")
    this.currentIndex = 0;
    this.correctAnswer;
    $("#end").click(()=>{
      location.reload();
    })
    this.score = 0;
    this.showQuestion();
  }
  showQuestion(){
      $("#from").html(this.currentIndex + 1);

      const currentQuestion = this.results[this.currentIndex].question;

      this.questionTitle.innerHTML = currentQuestion;

      this.correctAnswer = this.results[this.currentIndex].correct_answer;

      const answers = this.results[this.currentIndex].incorrect_answers;

      const randomNumber = Math.round(Math.random()*answers.length);

      answers.splice(randomNumber,0,this.correctAnswer);

      $("#nextQuestion").click(()=>{
        this.nextQuestion()
      })

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
  nextQuestion(){
    const answerChecked = document.querySelector("[name='answer']:checked").value
    if (answerChecked == undefined) {
      $("#alertAns").fadeIn(300);

    } else {
      this.currentIndex++;
      $("#alertAns").fadeOut(300);
      if (this.currentIndex > this.results.length - 1) {
        $("#quiz").removeClass("show");
        $("#finish").addClass("show");
        $("#score").html(this.score)
      } else {
        if (answerChecked == this.correctAnswer) {
          $("#inCorrect").fadeOut(0)
          $("#correct").fadeIn(800)
          this.score++;
          console.log(this.score);
        } else {
          $("#correct").fadeOut(0)
          $("#inCorrect").fadeIn(800)
        }
        this.showQuestion();
      }
    }

  }
  
}