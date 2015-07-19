var humanWins = 0;
var computerWins = 0;
var catWins = 0;
var numCells = 9;
var moveCount = 0;
var boardLength = 3;

function resetGameBoard() {
    $(".column").html("");
    $.when($("#gameContainer").fadeOut(500)).then(function(){
        $("#playerSelectContainer").fadeIn(400);
    });
    moveCount = 0;
}

function updateScoreCard() {
    $("#humanWins").html(humanWins);
    $("#computerWins").html(computerWins);
    $("#catWins").html(catWins);
}

function computerTurn(computerPlayerString) {
    var colClickEvent = $(".col").click;
    var computerCol = Math.floor(Math.random()*numCells);

    // Disallow the human from making another turn until the computer is done
    $(".col").unbind("click");

    while(!$("#col" + computerCol).is(":empty")) {
        computerCol = Math.floor(Math.random()*numCells);
    }

    $("#col" + computerCol).css("cursor", "default");
    $("#col" + computerCol).html(computerPlayerString).hide().fadeIn(250);
    moveCount++;
    if(checkForWin($("#col" + computerCol).parent().index(), $("#col" + computerCol).index(), computerPlayerString)) {
        $.when($("#gameMessageBad").fadeIn(500).html("Computer wins...")).then(function(){
            computerWins++;
            updateScoreCard();
            resetGameBoard();
            $("#gameMessageBad").fadeOut(1500);
        });

    } else if (moveCount === numCells) {
        $.when($("#gameMessageGood").fadeIn(500).html("Cat wins")).then(function(){
            catWins++;
            updateScoreCard();
            resetGameBoard();
            $("#gameMessageGood").fadeOut(1500);
        });

    }
    // human may play again
    $(".col").click = colClickEvent;
}

function checkForWin(rowIndex, colIndex, playerString) {

    // check column
    for(var i = 0; i < boardLength; i++){
        if($("#row" + i).find("td").eq(colIndex).html() !== playerString)
            break;
        if(i === boardLength - 1){
            return true;
        }
    }

    // check row
    for(var i = 0; i < boardLength; i++){
        if($("#row" + rowIndex).find("td").eq(i).html() !== playerString)
            break;
        if(i === boardLength - 1){
            return true;
        }
    }

    //check diagonal
    if(rowIndex === colIndex){
        for(var i = 0; i < boardLength; i++){
            if($("#row" + i).find("td").eq(i).html() !== playerString)
                break;
            if(i === boardLength - 1){
                return true;
            }
        }
    }

    //check anti-diagonal
    for(var i = 0; i < boardLength; i++){
        if($("#row" + i).find("td").eq(boardLength-i-1).html() !== playerString)
            break;
        if(i === boardLength - 1){
            return true;
        }
    }

    return false;
}


$(document).ready(function() {
    var humanPlayerString = "X";
    var computerPlayerString = "O";
    var humanFirst = true;

    $(".column").click(function() {
        $("#gameMessageGood").hide();
        $("#gameMessageBad").hide();
        if($(this).is(":empty")) {
            $(this).css("cursor", "default");
            $(this).html(humanPlayerString);
            moveCount++;
            if(checkForWin($(this).parent().index(), $(this).index(), humanPlayerString)){
                $.when($("#gameMessageGood").fadeIn(500).html("You win!")).then(function() {
                    humanWins++;
                    updateScoreCard();
                    resetGameBoard();
                    $("#gameMessageGood").fadeOut(1500);
                });

            } else if (moveCount === numCells) {
                $.when($("#gameMessageGood").fadeIn(500).html("Cat wins")).then(function() {
                    catWins++;
                    updateScoreCard();
                    resetGameBoard();
                    $("#gameMessageGood").fadeOut(1500);
                });
            } else {
                computerTurn(computerPlayerString);
            }
        } else {
            $.when($("#gameMessageBad").fadeIn(1000).html("You can't do that...")).then(
                $("#gameMessageBad").fadeOut(1000)
            );

        }
    });

    $("#playerOne").change(function() {
        if($(this).is(":checked")) {
            humanPlayerString = "X";
            computerPlayerString = "O";
            humanFirst = true;
        }
    });

    $("#playerTwo").change(function() {
        if($(this).is(":checked")) {
            humanPlayerString = "O";
            computerPlayerString = "X";
            humanFirst = false;
        }
    });

    $("#beginGame").click(function() {
        $("#gameContainer").fadeIn("fast");
        $("#playerSelectContainer").fadeOut("fast");
        if(!humanFirst) {
            computerTurn(computerPlayerString);
        }
    });

});

