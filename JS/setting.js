// IMPORT CLASS FROM QUIZ
import { Quiz } from "./quiz.js";
export class Setting {
  constructor (){
    // RUN CATEGORY FUNCTION
    $("#start").click(()=>{
      this.startCategory()
    })
  }
  
  async startCategory(){
    // CATEGORY VALUES
    const category =  $("#category").val();
    // DIFFICULTY VALUES
    const difficulty = Array.from($("input[name=difficulty]")).find((item) =>item.checked).value;
    // AMOUNT VALUES
    const amount = $("#amount").val()

    if (amount < 1) {
      $("#alertNumber").addClass("show")
    }
    else if (amount > 0){
      $("#alertNumber").removeClass("show")
      //! RUN GET QUESTION FUNCTION AND SEND ARGUMENTS (AMOUNT VALUES, DIFFICULTY VALUES, CATEGORY VALUES)
      const results = await this.getQuestions(category,difficulty,amount);

      $("#setting").removeClass("show");
      $("#quiz").addClass("show");

      // SEND API DATA TO QUIZ CLASS IN QUIZ FILE
      const quiz = new Quiz(results);

    }
  }
  // ! CATEGORY FUNCTION
  async getQuestions(category,difficulty,amount){
    // GET DATA FROM API
    const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
    // PARSE API DATA
    const apiData = await apiResponse.json();
    return apiData.results;
  }


}