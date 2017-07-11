// Get buttons
var getScore = document.getElementById('calculate-score');
var haveAnotherGo = document.getElementById('restart-quiz');
var letsGo = document.getElementById('start-quiz');
var gotIt = document.getElementById('btn-instructions');

// Add Event listeners
getScore.addEventListener("click", loading);
haveAnotherGo.addEventListener("click", resetQuiz);
letsGo.addEventListener("click", signupValidate);
gotIt.addEventListener("click", closeInstructions);

// Global variables
var name, answers, radioButton, questionNumber, ansChecked;
var quizInstruct = document.getElementById('quiz-instructions');
var quizForm = document.getElementById('quiz-form');
var progessComplete = document.querySelector('.circle.active');
var errorMessage = document.getElementById('error-message');
var completedMessageBox = document.getElementById('completed-message-box');
var questionAmount = 10;

// 'Enter' key to submit signform form
var submitForm = document.getElementById('email-field');
  submitForm.onkeydown = function (event) {
    if (event.keyCode == 13) {
        signupValidate();
    }
  };

// Signup form validation
function signupValidate() {
  var signupForm = document.getElementById("sign-up");
  var signupMessage = document.getElementById('signup-error-message');
  var validName = validateName();
  var validEmail = validateEmail();
    if (validName) {
      signupMessage.innerHTML = validName;
      return;
    }
    if (validEmail) {
      signupMessage.innerHTML = validEmail;
      return;
    }
    // Once correct name and email have been entered, hide singup form, show quiz instructions and remove error messages
    signupForm.style.display = "none";
    quizInstruct.style.display = "block";
    signupMessage.innerHTML = "";
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

// validate email field - check that the field isn't empty, there is 1 @ symbol, there are at least 2 characters between the @ and the dot and the email address is at least 8 characters long
function validateEmail() {
  var email = document.getElementById('email-field').value;
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

// Hide the quiz instructions once 'Got It' button is clicked
function closeInstructions(){
  quizInstruct.style.display = "none";
  quizForm.style.display = "block";
}

// Quiz validation - Check that each question has an answer checked. Add the radio button value to the total score; false = 0 / true =  1
function quizValidate() {
  var notAnswered = "";
  var scoreTotal = 0;
  var completedMessage = document.getElementById('completed-message');
    for (var questionNumber = 1; questionNumber <= questionAmount; questionNumber++) {
      ansChecked = false;
      var answers = document.getElementsByName("question-" + questionNumber);

      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
        if (answers[radioButton].checked === true) {
          scoreTotal += parseInt(answers[radioButton].value);
          ansChecked = true;
        }
      }
      if (ansChecked === false) {
        errorMessage.innerHTML = ("Uh oh.. You haven't answered all the questions! Please answer questions marked with red");
        return false;
      }
    }

    // Once all questions are answered and 'Get Score' is clicked, hide the quiz form and show congratulations message
    quizForm.style.display = 'none';
    completedMessageBox.style.display = 'block';
    errorMessage.innerHTML = "";
    completedMessage.innerHTML = ("<h2>Good work " + name.split(" ")[0] + "! You have completed the CSS quiz.</h2><h3>Your score is " + scoreTotal + " out of " + questionAmount + "!</h3>");
}

// Once a question is answered, mark the corresponding progress circle teal
function markProgress(input) {
  var progessComplete = document.querySelector('.circle.active');
    if (input.checked === true) {
      progessComplete.classList.add('teal');
      progessComplete.classList.remove('un-answered', 'red');
    }
}

// Show 'Get Score' button once question 10 has an answer selected
function showGetScore(input) {
    if (input.checked === true) {
      getScore.classList.remove('hidden');
    }
}

// Uncheck all radios, remove 'Have Another Go!' button, remove congratulations message, show quiz at question 1, reset 'next' and 'prev' buttons
function resetQuiz(){
  var questionOne = document.querySelector('.q1');
  var activeQuestion = document.querySelector('.question.active');
  var nextButton = document.getElementById('next');
  var prevButton = document.getElementById('prev');
  var progress = document.getElementById('progress');
  var progressValue = document.getElementById('progress-value');
    for (var questionNumber = 1; questionNumber <= questionAmount; questionNumber++) {
      var ansChecked = false;
      var answers = document.getElementsByName("question-" + questionNumber);

      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
          answers[radioButton].checked = false;
      }
    }
    // haveAnotherGo.style.display = 'none';
    progress.value = 10;
    progressValue.innerHTML = "10%";
    quizForm.style.display = 'block';
    activeQuestion.classList.remove('active');
    questionOne.classList.add('active');
    getScore.className = 'hidden';
    nextButton.classList.remove('btn-pag-invalid');
    prevButton.classList.add('btn-pag-invalid');
    completedMessageBox.style.display = 'none';
    errorMessage.innerHTML = "";
    resetProgress()
}

// Mark un-answered progress circles red
function markUnAnswered() {
  var unAnswered = document.getElementsByClassName('un-answered');
    for(circle=0; circle<unAnswered.length; circle++) {
      unAnswered[circle].classList.add('red')
    }
}

// Reset progress circles, remove fill colour, return 'active' to circle 1
function resetProgress() {
  // Get each circle
  var pro1 = document.getElementById('pro1');
  var pro2 = document.getElementById('pro2');
  var pro3 = document.getElementById('pro3');
  var pro4 = document.getElementById('pro4');
  var pro5 = document.getElementById('pro5');
  var pro6 = document.getElementById('pro6');
  var pro7 = document.getElementById('pro7');
  var pro8 = document.getElementById('pro8');
  var pro9 = document.getElementById('pro9');
  var pro10 = document.getElementById('pro10');
  // Create an array of all of the circles
  var allPros = [pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9, pro10]
    // Remove the 'teal' class from each circle
    allPros.forEach(function(el) {
    el.classList.remove('red', 'teal', 'pulse', 'active');
    el.classList.add('un-answered');
    })
    // Add 'Active' and 'Pulse' class' to circle 1
    pro1.classList.add('active', 'pulse');
}

// Progress bar, on pagination click
$(".btn-pag").click(function () {
    animateProgress(parseInt($(this).data('diff')));
});
// Animate progress bar by pre-defined value, set min and max progress, populate value %  per click
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
    if($(".question.active").index() > 0) {
        $(".question.active").removeClass("active").prev().addClass("active");
        $(".circle.active").removeClass("active pulse").prev().addClass("active pulse");
    }
  // Hide 'calculate score' button if moving back to question 9 or lower
    // if($(".question.active").index() < 9)
    //     $("#calculate-score").addClass("hidden");
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
    if($(".question.active").index() < $(".question").length-1) {
        $(".question.active").removeClass("active").next().addClass("active");
        $(".circle.active").removeClass("active pulse").next().addClass("active pulse");
    }
  // Brighten appearance of 'prev' button when valid
    if($(".question.active").index() > 0)
        $("#prev").removeClass("btn-pag-invalid");
  // hide 'next' button when not valid
    if($(".question.active").index() > 8)
        $("#next").addClass("btn-pag-invalid");
});


// // Link to questions from progress circles
// $("#pro-link a").click(function(e) {
//     e.preventDefault();
//     $("#link-questions > div").removeClass("active");
//     var id = $(this).attr("id").replace("pro","");
//     $("#q-div-"+id).addClass("active");
// });

// 'Get Score' button loading animation on click function
function loading() {
  var pro10 = document.getElementById('pro10');
  getScore.innerHTML = ('<i class="fa fa-circle-o-notch fa-spin"></i>Get Score!');
  // Run validate quiz
  setTimeout(quizValidate, 3500);
  // Run - stop loading animation
  setTimeout(stopLoading, 3500);
  // Run - mark unanswered circles red
  setTimeout(markUnAnswered, 3500);
  // Stop pulse animation on circle 10
  pro10.classList.remove('pulse');
}
// Stop loading animation once time delay has passed
function stopLoading() {
  getScore.innerHTML = ('Get Score!');
}

// 'Get Score' button pulse animation, disable on button click
// $('#calculate-score').click(function() {
//     $(this).removeClass("pulse");
//   });



