
var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count=0;
var started = false;

// make sound
function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

// make animattion by adding the pressed class to the parameter element
function animatePress (currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}


function nextSequence(){
  level++;
  $("h1").text("Level "+ level);
  var randomNumber =Math.floor((Math.random()*4)); //0-3
  var randomChosenColour = buttonColours[randomNumber]; // random colour
  gamePattern.push(randomChosenColour); // populate sequence array
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);// flash the random colour
  playSound(randomChosenColour);

}

// click event
$("body").click(function(event){
var userChosenColour = event.target.id;
if (buttonColours.includes(userChosenColour) && started==true){// populate the userclickpattern only if it is a button
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  verification();
}
});

function startOver(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  count=0;
  started= false;


}

// press any keyto start the game

$("body").keydown(function(event){
if (!started){
  setTimeout(function()
  {nextSequence();
  },500);
  started=true;
}


})



function verification(){
 if ( count < gamePattern.length){
    if (gamePattern[count] == userClickedPattern[count]){
      count++;
    } else {
      //Game over;
      playSound("wrong");
      $("body").addClass("game-over");// red backgorund
      setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
  }
   if(count == level && started == true){
    setTimeout(function(){nextSequence();},1000);
    userClickedPattern=[];
    count=0;
  }

}
