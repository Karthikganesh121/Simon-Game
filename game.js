var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

function nextseq(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomnum1 = Math.floor(Math.random()*4); 
    var randomChosenColour = buttonColours[randomnum1];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour)
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100);
};
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level"+level);
        nextseq();
        started=true;
    }
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextseq();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Press any key to restart game");
        startOver();
    };
};
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
};
