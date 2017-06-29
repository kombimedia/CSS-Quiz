
document.getElementById('start-quiz').addEventListener("click", signupValidate);
document.getElementById('calculate-score').addEventListener("click", quizValidate);
document.getElementById('retry').addEventListener("click", resetQuiz);
var reStartQuiz = document.getElementById('resit');
reStartQuiz.addEventListener("click", resitQuiz);

// Global variables
var name, email, answers, radioButton;
var signupForm = document.getElementById("sign-up");
var quizForm = document.getElementById("quiz-form");
var errorMessage = document.getElementById("error-message");
var questionAmount = 10;

// Signup form validation
// Validate Name field - checking that the field isn't empty, there is at least one space and that first and last names are at least 2 characters long
function signupValidate() {
  name = document.getElementById('name-field').value;
  email = document.getElementById('email-field').value;

  var hasSpace = name.indexOf(" ");
    if (name === "" || hasSpace < 0) {
      errorMessage.innerHTML = "Please provide your full name!";
      return false;
    }

  var nameArray = name.split(" ");
  var firstName = nameArray[0];
  var surname = nameArray[1];
    if (firstName.length < 2 || surname.length < 2) {
      errorMessage.innerHTML = "Have you entered your name correctly? Please try again.";
      return false;
    }

// validate email field - checking that the field isn't empty, there is 1 @ symbol, there are at least 2 characters between the @ and the dot and the email address is at least 8 characters long
  var atPos = email.indexOf("@");
  var dotPos = email.indexOf(".");
  var secondAtPos = email.lastIndexOf("@") !== atPos;

  if (email === "") {
    errorMessage.innerHTML = "Please provided your email address!";
    return false;
  }
  if (atPos < 0) {
    errorMessage.innerHTML = "Oops!" + " '" + email + "' " + "is missing an '@' symbol.";
    return false;
  }
  if (secondAtPos || dotPos < atPos +3 || dotPos +2 >= email.length || email.length <= 8) {
    errorMessage.innerHTML = "Oops.. " + email + " is not a valid email address. Please try again!";
    return false;
  }

// Once correct name and email have been entered, hide singup form, show quiz and remove error messages
  signupForm.style.display = "none";
  quizForm.style.display = "block";
  errorMessage.innerHTML = "";
  return false;
}
// Validate quiz - checking that each question has an answer checked. Add the radio button value to the total score - 0 or 1
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

    // Once all questions are answered hide the quiz form and print the congratulations message
    quizForm.style.display = 'none';
    reStartQuiz.style.display = 'block';
    errorMessage.style.color = '#1abc9c';
    errorMessage.innerHTML = ("<h2>Good work " + name.split(" ")[0] + "! You have completed the CSS quiz.</h2><h3>Your score is " + totalScore + " out of " + questionAmount + "!</h3>");
}
// Clears any error messages and unchecks all radios
function resetQuiz(){
  for (var questionNumber = 1; questionNumber <= questionAmount; questionNumber++) {
    var ansChecked = false;
    var answers = document.getElementsByName("question-" + questionNumber);

    for (var radioButton = 0; radioButton < answers.length; radioButton++) {
        answers[radioButton].checked = false;
        errorMessage.innerHTML = "";
    }
  }
}

function resitQuiz(){
  reStartQuiz.style.display = 'none';
  quizForm.style.display = 'block';
  errorMessage.style.color = 'red';
  errorMessage.innerHTML = "";
  resetQuiz();
}



