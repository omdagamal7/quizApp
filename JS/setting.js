import { Quiz } from "./quiz.js";
export class Setting {
  constructor (){
    $("#start").click(()=>{
      this.startCategory()
    })
  }
  async startCategory(){
    const category =  $("#category").val();
    const difficulty = Array.from($("input[name=difficulty]")).find((item) =>item.checked).value;
    const amount = $("#amount").val()
    if (amount < 1) {
      $("#alertNumber").addClass("show")
    }
    else if (amount > 0){
      $("#alertNumber").removeClass("show")
      const results = await this.getQuestions(category,difficulty,amount);
      $("#setting").removeClass("show");
      $("#quiz").addClass("show");
      const quiz = new Quiz(results);
    }
  }
  async getQuestions(category,difficulty,amount){
    const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
    const apiData = await apiResponse.json();
    return apiData.results;
  }


}