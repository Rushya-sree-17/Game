var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
  if (!started) {
    $(".btn").css("visibility","visible");
    setTimeout(function(){
      gamePattern=[];
      userClickedPattern=[];
      started = true;
      level = 0;
      $("#level-title").text("Level " + level);
      nextSequence();
    },1000);

  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").click(function() {

  var userChoosenColor = $(this).attr("id");
  playSound(userChoosenColor);
  userClickedPattern.push(userChoosenColor);
  animatePress(userChoosenColor);
  checkPattern(userClickedPattern.length-1);
})

function checkPattern(len){
  if(gamePattern[len]===userClickedPattern[len])
  {
    if(gamePattern.length===userClickedPattern.length)
    {
       setTimeout(function(){
         nextSequence()
       },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game-over!! Press any key to start again!!");
    $(".btn").css("visibility","hidden");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    level=0;
    gamePattern=[];
    started=false;
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
