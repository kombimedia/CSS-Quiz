// Event listeners
document.getElementById('start-quiz').addEventListener("click", signupValidate);
document.getElementById('calculate-score').addEventListener("click", quizValidate);
// document.getElementById('retry').addEventListener("click", resetQuiz);
var reStartQuiz = document.getElementById('resit');
reStartQuiz.addEventListener("click", resetQuiz);

// Global variables
var name, email, answers, radioButton, questionNumber;
var signupForm = document.getElementById("sign-up");
var quizForm = document.getElementById("quiz-form");
var errorMessage = document.getElementById("error-message");
var questionAmount = 10;

// Signup form validation
function signupValidate() {
  var validName = validateName();
  var validEmail = validateEmail();
    if (validName) {
      errorMessage.innerHTML = validName;
      return;
    }
    if (validEmail) {
      errorMessage.innerHTML = validEmail;
      return;
    }
    // Once correct name and email have been entered, hide singup form, show quiz and remove error messages
    signupForm.style.display = "none";
    quizForm.style.display = "block";
    errorMessage.innerHTML = "";
}

// Validate Name field - checking that the field isn't empty, there is at least one space and that first and last names are at least 2 characters long
function validateName() {
  name = document.getElementById('name-field').value;
  var hasSpace = name.indexOf(" ");

    if (name === "" || hasSpace < 0) {
      return "Please provide your full name!";
    }
    var nameArray = name.split(" ");
    var firstName = nameArray[0];
    var surname = nameArray[1];

    if (firstName.length < 2 || surname.length < 2) {
      return "Have you entered your name correctly " + name + "? Please try again.";
    }
    return false;
}

// validate email field - checking that the field isn't empty, there is 1 @ symbol, there are at least 2 characters between the @ and the dot and the email address is at least 8 characters long
function validateEmail() {
  email = document.getElementById('email-field').value;
  var atPos = email.indexOf("@");
  var dotPos = email.indexOf(".");
  var secondAtPos = email.lastIndexOf("@") !== atPos;

  if (email === "") {
    return "Please provided your email address!";
  }
  if (atPos < 0) {
    return "Oops!" + " '" + email + "' " + "is missing an '@' symbol.";
  }
  if (secondAtPos || dotPos < atPos +3 || dotPos +2 >= email.length || email.length <= 8) {
    return "Oops.. " + email + " is not a valid email address. Please try again!";
  }
  return false;
}

// Quiz validation - Check that each question has an answer checked. Add the radio button value to the total score; false = 0 / true =  1
function quizValidate() {
  var unAnswered = "";
  var totalScore = 0;
    for (var questionNumber = 1; questionNumber <= questionAmount; questionNumber++) {
      var ansChecked = false;
      var answers = document.getElementsByName("question-" + questionNumber);

      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
        if (answers[radioButton].checked === true) {
          totalScore += parseInt(answers[radioButton].value);
          ansChecked = true;
        }
      }
      if (ansChecked === false) {
        unAnswered += questionNumber + ", ";
      }
    }

    if (unAnswered !== "") {
      errorMessage.innerHTML = ("Uh oh.. You haven't answered all the questions!<br>You still need to answer question(s) - " + unAnswered);
      return false;
    }
    // Once all questions are answered hide the quiz form and show congratulations message
    quizForm.style.display = 'none';
    reStartQuiz.style.display = 'block';
    errorMessage.style.color = '#1ABC9C';
    errorMessage.innerHTML = ("<h2>Good work " + name.split(" ")[0] + "! You have completed the CSS quiz.</h2><h3>Your score is " + totalScore + " out of " + questionAmount + "!</h3>");
}

// Uncheck all radios, remove 'Have Another Go!' button, remove congratulations message, show quiz at question 1
function resetQuiz(){
  var questionOne =  document.querySelector('.q1');
  var questionTen =  document.querySelector('.q10');
    for (var questionNumber = 1; questionNumber <= questionAmount; questionNumber++) {
      var ansChecked = false;
      var answers = document.getElementsByName("question-" + questionNumber);

      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
          answers[radioButton].checked = false;
          reStartQuiz.style.display = 'none';
          quizForm.style.display = 'block';
          questionOne.style.display = 'block';
          questionTen.style.display = 'none';
          errorMessage.style.color = '#FF0000';
          errorMessage.innerHTML = "";
      }
    }
}

// Remove 'Have Another Go!' button, remove congratulations message, reset and show quiz
// function resitQuiz(){
//   var questionOne =  document.querySelector('.q1');
//   var questionTen =  document.querySelector('.q10');
//   reStartQuiz.style.display = 'none';
//   quizForm.style.display = 'block';
//   questionOne.style.display = 'block';
//   questionTen.style.display = 'none';
//   errorMessage.style.color = '#FF0000';
//   errorMessage.innerHTML = "";
//   resetQuiz();
// }

// Quiz question pagination
$("#prev").on("click", function(){
    if($(".question.active").index() > 0)
        $(".question.active").removeClass("active").prev().addClass("active");
});
$("#next").on("click", function(){
    if($(".question.active").index() < $(".question").length-1)
        $(".question.active").removeClass("active").next().addClass("active");
});


