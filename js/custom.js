// Event listeners
var getScore = document.getElementById('calculate-score')
var haveAnotherGo = document.getElementById('restart-quiz');
document.getElementById('start-quiz').addEventListener("click", signupValidate);
document.getElementById('btn-instructions').addEventListener("click", closeInstructions);
getScore.addEventListener("click", quizValidate);
haveAnotherGo.addEventListener("click", resetQuiz);

// Global variables
var name, email, answers, radioButton, questionNumber, quizInstruct;
var signupForm = document.getElementById("sign-up");
var quizInstruct = document.getElementById("quiz-instructions");
var progressBar = document.getElementById("progress-container");
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
    quizInstruct.style.display = "block";
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

// Hide the quiz instructions
function closeInstructions(){
  quizInstruct.style.display = "none";
  quizForm.style.display = "block";
  progressBar.style.display = "block";
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
    // Once all questions are answered and 'Get Score' is clicked, hide the quiz form and show congratulations message
    quizForm.style.display = 'none';
    progressBar.style.display = "none";
    haveAnotherGo.style.display = 'block';
    errorMessage.style.color = '#1ABC9C';
    errorMessage.className = 'clear fade-in';
    errorMessage.innerHTML = ("<h2>Good work " + name.split(" ")[0] + "! You have completed the CSS quiz.</h2><h3>Your score is " + totalScore + " out of " + questionAmount + "!</h3>");
}

// Uncheck all radios, remove 'Have Another Go!' button, remove congratulations message, show quiz at question 1, reset 'next' and 'prev' buttons
function resetQuiz(){
  var questionOne =  document.querySelector('.q1');
  var questionTen =  document.querySelector('.q10');
  var nextButton = document.getElementById('next');
  var prevButton = document.getElementById('prev');
  var progress = document.getElementById('progress');
  var progressValue = document.getElementById('progress-value');
    for (var questionNumber = 1; questionNumber <= questionAmount; questionNumber++) {
      var ansChecked = false;
      var answers = document.getElementsByName("question-" + questionNumber);

      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
          answers[radioButton].checked = false;
          haveAnotherGo.style.display = 'none';
          progressBar.style.display = "block";
          progress.value = 10;
          progressValue.innerHTML = "10%";
          quizForm.style.display = 'block';
          questionOne.className = 'content-box question active q1';
          questionTen.className = 'content-box question q10';
          getScore.className = 'hidden';
          nextButton.className = 'btn-pag';
          prevButton.className = 'btn-pag btn-pag-invalid';
          errorMessage.style.color = '#FF0000';
          errorMessage.className = 'clear';
          errorMessage.innerHTML = "";
      }
    }
}

// Progress bar, on pagination click
$(".btn-pag").click(function () {
    animateProgress(parseInt($(this).data('diff')));
});

function animateProgress(diff) {
    var currValue = $("#progress").val();
    var toValue = currValue + diff;
    toValue = toValue < 10 ? 10 : toValue;
    toValue = toValue > 100 ? 100 : toValue;

    $("#progress").animate({'value': toValue}, 500);
    $("#progress-value").html(toValue + "%");
}

// Quiz question pagination buttons
// Previous button
$("#prev").on("click", function(){
  // Move to the previous question
    if($(".question.active").index() > 0)
        $(".question.active").removeClass("active").prev().addClass("active");
  // Remove 'calculate score' button if moving back to question 9 or lower
    if($(".question.active").index() < 9)
        $("#calculate-score").addClass("hidden");
  // Dull appearance of 'prev' button when not valid
    if($(".question.active").index() < 1)
        $("#prev").addClass("btn-pag-invalid");
  // Brighten appearance of 'next' button when valid
    if($(".question.active").index() < 9)
        $("#next").removeClass("btn-pag-invalid");
});

// Next button
$("#next").on("click", function(){
  // Move to the next question
    if($(".question.active").index() < $(".question").length-1)
        $(".question.active").removeClass("active").next().addClass("active");
  // Once on question 10 show 'calculate score' button
    if($(".question.active").index() === 9)
        $("#calculate-score").removeClass("hidden");
        // Enable pulse effect on 'Get Score' button
        $("#calculate-score").addClass("pulse");
  // Brighten appearance of 'prev' button when valid
    if($(".question.active").index() > 0)
        $("#prev").removeClass("btn-pag-invalid");
  // Dull appearance of 'next' button when not valid
    if($(".question.active").index() > 8)
        $("#next").addClass("btn-pag-invalid");
});

// 'Get Score' button pulse animation, disable on button click
$('#calculate-score').click(function() {
    $(this).removeClass("pulse");
  });



