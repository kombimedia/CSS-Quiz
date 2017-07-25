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
var name, answers, radioButton, questionNum, ansChecked;
var quizInstruct = document.getElementById('quiz-instructions');
var quizForm = document.getElementById('quiz-form');
var progessComplete = document.querySelector('.circle.active');
var errorMessage = document.getElementById('error-message');
var errorMessagePB = document.getElementById('error-message-pb');
var completedMessageBox = document.getElementById('completed-message-box');
var numOfQuestions = 10;

// 'Enter' key to submit signform form
var submitForm = document.getElementById('email-field');
  submitForm.onkeydown = function (event) {
    if (event.keyCode == 13) {
        signupValidate();
    }
  };

// Signup form validation - Called from the 'Lets Go button'
function signupValidate() {
  var signupForm = document.getElementById("sign-up");
  var signupMessage = document.getElementById('signup-error-message');
  // Execute validation functions and output error messages
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
    // Once correct name and email have been entered, hide singup form, show quiz instructions and remove error message
    signupForm.style.display = "none";
    quizInstruct.style.display = "block";
    signupMessage.innerHTML = "";
}

// Validate Name field - Called from the 'signupValidate' function
function validateName() {
  name = document.getElementById('name-field').value;
  var hasSpace = name.indexOf(" ");
    // Check that a name has been entered and there is a space
    if (name === "" || hasSpace < 0) {
      return "Please provide your full name!";
    }
    // Split the name at the space and save first and last names to variables
    var nameArray = name.split(" ");
    var firstName = nameArray[0];
    var surname = nameArray[1];
    // Check that first and last names are at least 2 characters long
    if (firstName.length < 2 || surname.length < 2) {
      return "Have you entered your name correctly " + name + "? Please try again.";
    }
    return false; // Stop code from running any further
}

// validate email field - Called from the 'signupValidate' function
function validateEmail() {
  var email = document.getElementById('email-field').value;
  var atPos = email.indexOf("@");
  var dotPos = email.indexOf(".");
  var secondAtPos = email.lastIndexOf("@") !== atPos;
  // Check that an email address has been entered
  if (email === "") {
    return "Please provided your email address!";
  }
  // Check that there is an @ symbol
  if (atPos < 0) {
    return "Oops!" + " '" + email + "' " + "is missing an '@' symbol.";
  }
  // Check there isn't a second @ symbol, there are at least 2 characters between the @ symbol and the dot, there are at least 2 characters after the dot, the address is at least 9 characters long
  if (secondAtPos || dotPos < atPos +3 || dotPos +2 >= email.length || email.length <= 8) {
    return "Oops.. " + email + " is not a valid email address. Please try again!";
  }
  return false; // Stop code from running any further
}

// Hide the quiz instructions - Called from the 'Got It' button
function closeInstructions(){
  quizInstruct.style.display = "none";
  quizForm.style.display = "block";
}

// Once a question is answered, mark the corresponding progress circle teal - Called from an 'onclick' event on each radio in the html
function markProgress(input) {
  var progessComplete = document.querySelector('.circle.active');
    if (input.checked === true) {
      progessComplete.classList.add('teal');
      // Remove un-answered class to define progress circle as being an answered question
      progessComplete.classList.remove('un-answered', 'red');
    }
}

// Show 'Get Score' button once question 10 has an answer selected - Called from an 'onclick' event on question 10 radios in the html
function showGetScore(input) {
    if (input.checked === true) {
      getScore.classList.remove('hidden');
    }
}

// Quiz validation - Called in 'Loading' function
function quizValidate() {
  var notAnswered = "";
  var scoreTotal = 0;
  var completedMessage = document.getElementById('completed-message');
    // Loop through all questions to get each answer
    for (var questionNum = 1; questionNum <= numOfQuestions; questionNum++) {
      ansChecked = false;
      // Save each answer (radio name) to a variable
      var answers = document.getElementsByName("question-" + questionNum);
      // Loop through each answer
      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
        // Check that a radio has been selected (question answered)
        if (answers[radioButton].checked === true) {
          // Add radio value to the scoreTotal variable, correct answer scores 1, incorrect scores 0
          scoreTotal += parseInt(answers[radioButton].value);
          ansChecked = true;
        }
      }
      // Check each question has been answered
      if (ansChecked === false) {
        // Output unanswered error message for large screens - progress circles
        errorMessage.innerHTML = ("Uh oh... You haven't answered all the questions! Please <u>click</u> circles marked with <u>red</u> to answer remaining questions.");
        // Store unanswered question numbers for small screen error message
        notAnswered += questionNum + ". ";
      }
    }
    // Check that all questions have been answered i.e. 'notAnswered' string is empty
    if(notAnswered !== "") {
    // If 'notAnswered' string is populated, output unanswered error message for small screens - progress bar
    errorMessagePB.innerHTML = ("Uh oh... You still need to answer question(s) " + notAnswered);
    return false;
  }
    // Once all questions are answered and 'Get Score' button is clicked, hide the quiz form, clear error messages and show congratulations message
    quizForm.style.display = 'none';
    completedMessageBox.style.display = 'block';
    errorMessage.innerHTML = "";
    errorMessagePB.innerHTML = "";
    completedMessage.innerHTML = ("<h2>Good work " + name.split(" ")[0] + "! You have completed the CSS quiz.</h2><h3>Your score is " + scoreTotal + " out of " + numOfQuestions + "!</h3>");
}

// Add time delay to called functions - Called by click event on 'Get Score' button
function loading() {
  // Get active progress circle
  var activeCircle = document.querySelector('.circle.active')
  // Add loading animation to 'Get Score' button
  getScore.innerHTML = ('<i class="fa fa-circle-o-notch fa-spin"></i>Get Score!');
  // Call - validate quiz function
  setTimeout(quizValidate, 2000);
  // Call - stop loading animation function
  setTimeout(stopLoading, 2000);
  // Call - mark unanswered progress circles red function
  setTimeout(markUnAnswered, 2000);
  // Stop pulse animation on active progress circle
  activeCircle.classList.remove('pulse');
}

// Stop loading animation once time delay has passed - Called in 'Loading' function
function stopLoading() {
  getScore.innerHTML = ('Get Score!');
}

// Mark unanswered progress circles red - Called in 'Loading' function
function markUnAnswered() {
  // Get unanswered progress circles
  var unAnswered = document.getElementsByClassName('un-answered');
    // Loop through unanswered progress circles and add 'red' class
    for(circle=0; circle<unAnswered.length; circle++) {
      unAnswered[circle].classList.add('red')
    }
}

// Reset quiz function - Called on 'Have Another Go' button click event
function resetQuiz(){
  var questionOne = document.querySelector('.q1');
  var activeQuestion = document.querySelector('.question.active');
  var nextButton = document.getElementById('next');
  var prevButton = document.getElementById('prev');
  var progress = document.getElementById('progress');
  var progressValue = document.getElementById('progress-value');
    // Loop through all questions
    for (var questionNum = 1; questionNum <= numOfQuestions; questionNum++) {
      var ansChecked = false;
      // Store answers to a variable
      var answers = document.getElementsByName("question-" + questionNum);
      // Loop through answers (radio button)
      for (var radioButton = 0; radioButton < answers.length; radioButton++) {
          // Uncheck each radio
          answers[radioButton].checked = false;
      }
    }
    // reset progress bar value to 10%
    progress.value = 10;
    // reset progress bar text to 10%
    progressValue.innerHTML = "10%";
    // Show quiz form
    quizForm.style.display = 'block';
    // Hide last question answered
    activeQuestion.classList.remove('active');
    // Show question 1
    questionOne.classList.add('active');
    // Hide and reset 'Get Score' button
    getScore.classList.add('hidden','expandOpen','teal');
    // Reset 'next' but to valid status
    nextButton.classList.remove('btn-pag-invalid');
    // Reset 'previous' button to invalid status
    prevButton.classList.add('btn-pag-invalid');
    // Hide congratulations message box
    completedMessageBox.style.display = 'none';
    // Clear error messages
    errorMessage.innerHTML = "";
    errorMessagePB.innerHTML = "";
    // Call reset progress circles function
    resetProgress()
}

// Reset progress circles - Called in 'reset Quiz' function
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
    // Remove styling class' from each circle and add 'unanswered' class
    allPros.forEach(function(circle) {
    circle.classList.remove('red', 'teal', 'pulse', 'active');
    circle.classList.add('un-answered');
    })
    // Add 'Active' and 'Pulse' class' to circle 1 (current question)
    pro1.classList.add('active', 'pulse');
}

// Animate progress bar on pagination click
$(".btn-pag").click(function() {
    // 'diff' (difference) is defined as 'data-diff' on each button - 10 for 'next' and -10 for 'previous'
    animateProgress(parseInt($(this).data('diff')));
});
// Animate progress bar by pre-defined value (data-diff)
function animateProgress(diff) {
    var currValue = $("#progress").val();
    // Store 'diff' value of each click
    var toValue = currValue + diff;
    // Set min and max progress
    toValue = toValue < 10 ? 10 : toValue;
    toValue = toValue > 100 ? 100 : toValue;
    // Define animation progress and set animation speed
    $("#progress").animate({'value': toValue}, 500);
    // Populate value % text per click
    $("#progress-value").html(toValue + "%");
}

// Quiz question pagination buttons
// Previous button
$("#prev").on("click", function() {
  // Move to the previous question if currently higher than question 1
    if($(".question.active").index() > 0) {
        // Hide current question and show the previous question
        $(".question.active").removeClass("active").prev().addClass("active");
        // Add pulse animation to progress circle of previous question, remove from current question
        $(".circle.active").removeClass("active pulse").prev().addClass("active pulse");
    }
  // Dull appearance of 'previous' button when not valid - current question is 1
    if($(".question.active").index() < 1)
        $("#prev").addClass("btn-pag-invalid");
  // Brighten appearance of 'next' button when valid - current question is not 10
    if($(".question.active").index() < 9)
        $("#next").removeClass("btn-pag-invalid");
});

// Next button
$("#next").on("click", function() {
  // Move to the next question if currently lower than question 10
    if($(".question.active").index() < $(".question").length-1) {
        // Hide current question and show the next question
        $(".question.active").removeClass("active").next().addClass("active");
        // Add pulse animation to progress circle of next question, remove from current question
        $(".circle.active").removeClass("active pulse").next().addClass("active pulse");
    }
  // Brighten appearance of 'previous' button when valid - Current question is not 1
    if($(".question.active").index() > 0)
        $("#prev").removeClass("btn-pag-invalid");
  // Dull appearance of 'next' button when not valid - Current question is not 10
    if($(".question.active").index() > 8)
        $("#next").addClass("btn-pag-invalid");
});

// Function called on click of progress circles - main purpose is to navigate through questions on circle click
$("#pro-link a").click(function(circle) {
    circle.preventDefault();
    // When a progress circle is clicked, reset current pulsing circle
    $(".circle.active").removeClass("active pulse");
    // When a progress circle is clicked, hide current question
    $("#link-questions > div").removeClass("active");

      var id = $(this).attr("id").replace("pro","");
      // Add 'active' and 'pulse' class' to clicked progress circle
      $("#pro"+id).addClass("active pulse");
      // Show corresponding question
      $("#q-div-"+id).addClass("active");
      // Dull appearance of 'previous' button when not valid
      if($("#q-div-"+id).index() < 1)
          $("#prev").addClass("btn-pag-invalid");
      // Brighten appearance of 'previous' button when valid
      if($("#q-div-"+id).index() > 0)
          $("#prev").removeClass("btn-pag-invalid");
      // Brighten appearance of 'next' button when valid
      if($("#q-div-"+id).index() < 9)
          $("#next").removeClass("btn-pag-invalid");
      // Dull appearance 'next' button when not valid
      if($("#q-div-"+id).index() > 8)
          $("#next").addClass("btn-pag-invalid");
});
