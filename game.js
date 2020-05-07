var userClickedPattern = [];
var gamePattern = [];
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).on("keydown", function(event) {

  if (event.key === "a" && level === 0) {
    nextSequence();
  } else {
    console.log(event.key);
  }

});

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4)

  var randomColour = buttonColours[randomNumber];

  $("#" + randomColour).animate({opacity: 0.5}, 200);
  $("#" + randomColour).animate({opacity: 1}, 200);
  playSound(randomColour);

  gamePattern.push(randomColour);

  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];

  //console.log(gamePattern);

}

$(".btn").on("click", function(event) {

  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  animatePress(userChosenColour);
  playSound(userChosenColour);

});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
  } else {
    gameOver();
  }

  if (userClickedPattern.length == gamePattern.length) {
    setTimeout(function () {
      nextSequence()
    }, 1250);
  } else {
    console.log("keep going");
  }

}

function playSound(colour) {

  switch (colour) {

    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;

    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;

    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;

    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;

    default:
      console.log("colour");

  }

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $(".btn").removeClass("pressed");
  }, 200);

}

function gameOver() {

  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");

  gamePattern = [];
  level = 0;

  $(document).on("keydown", function(event) {

     if (event.key === "a") {
      console.log("restarted");
    } else if (level === 0) {
      nextSequence();
    }

  });

}
