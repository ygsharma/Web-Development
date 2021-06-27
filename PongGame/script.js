let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let paddleLeft = document.querySelector(".paddle1");
let paddleRight = document.querySelector(".paddle2");

let x = true;
let y = true;

let leftPlayerLives = 3;    // lives of left player we can adjust it by ourself to increase the lifeline
let rightPlayerLives = 3;


// move ball contains the movement of ball in upward and downward direction 
function moveBall(){
    let ballCoordinates = ball.getBoundingClientRect();
    let boardCoordinates = board.getBoundingClientRect();

// Board Coordinates
    let boardTop = boardCoordinates.top;
    let boardBottom = boardCoordinates.bottom;
    let boardRight = boardCoordinates.right;
    let boardLeft = boardCoordinates.left;

// Coordinates of ball 
    let ballTop = ballCoordinates.top;
    let ballLeft = ballCoordinates.left;
    let ballBottom = ballCoordinates.bottom;
    let ballRight = ballCoordinates.right;

    //  reverse direction when strike on top and bottom wall of board
    if(ballBottom>=boardBottom || ballTop<=boardTop){
        y = !y;
    }

    // Reverse direction when strike on left and right wall
    if(ballLeft<=boardLeft || ballRight>=boardRight){
        x = !x;
    }

    // conditions for collision of ball to the left paddle and after striking its directions gets reverse
    if(ballRight>=paddleLeft.getBoundingClientRect().left && ballLeft<=paddleLeft.getBoundingClientRect().right
     && ballTop>=paddleLeft.getBoundingClientRect().top-30 && ballBottom<=paddleLeft.getBoundingClientRect().bottom+30){
        x = !x ;
    }

    //  conditions for collision of ball to the right paddle and after striking its direction gets reverse
    if(ballRight>=paddleRight.getBoundingClientRect().left && ballLeft<=paddleRight.getBoundingClientRect().right
     && ballTop>paddleRight.getBoundingClientRect().top-30 && ballBottom<paddleRight.getBoundingClientRect().bottom+30){
        x = !x ;
    }

    // if ball strike on left wall ( decrease lifeline, set color, Game reload)
    if(ballLeft<=boardLeft){
        leftPlayerLives--;
        setColor(leftPlayerLives);
        if(leftPlayerLives==0){
            alert("Game Over Player 🅱️ Won!");
            window.location.reload();
        }
        else{
            return Gamereload();
        }
        
    }

    // if ball strike on right wall ( decrease lifeline, set color, Game reload)
    if(ballRight>=boardRight){
        rightPlayerLives--;
        setColor(rightPlayerLives+3);
        if(rightPlayerLives==0){
            alert("Game Over Player 🅰️ Won!");
            window.location.reload();
        }
        else{
            return Gamereload();
        }
    }

    x==true ? ball.style.left= ballLeft+3+"px" : ball.style.left=ballLeft-4+"px" ;
    y==true ? ball.style.top = ballTop+3+"px" : ball.style.top=ballTop-4+"px" ;

    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall) ; // function used for animating frame in javascript 

// Adding event listener to keydown for the movement of paddle 
//  w and s for left Paddle and up and down for right paddle

document.addEventListener("keydown",function(e){

    if(e.key=="w"){
        movePaddle(paddleLeft,-0.1*window.innerHeight);
    }
    else if(e.key=="s"){
        movePaddle(paddleLeft,0.1*window.innerHeight);
    }
    else if(e.key=="ArrowUp"){
        movePaddle(paddleRight,-0.1*window.innerHeight);
    }
    else if(e.key=="ArrowDown"){
        movePaddle(paddleRight,0.1*window.innerHeight);
    }

})

// Moving of paddle 
function movePaddle(currPaddle, change){
    let currPaddleCoordinates = currPaddle.getBoundingClientRect();
    let currPaddleTop = currPaddleCoordinates.top;
    let currPaddleBottom = currPaddleCoordinates.bottom;

    if(currPaddleTop+change>=board.getBoundingClientRect().top && currPaddleBottom+change<=board.getBoundingClientRect().bottom){
        currPaddle.style.top = currPaddleTop + change + "px" ;
    }
}

// Reload of game one looses
function Gamereload(){
    ball.style.top = window.innerHeight*0.47 + "px";
    ball.style.left = window.innerWidth*0.47 + "px";
    requestAnimationFrame(moveBall);
}

// Color setting of cicle 

function setColor(idx){
    let cicleArr = document.querySelectorAll(".fa-circle");
    console.log(cicleArr[idx]);
    cicleArr[idx].style.color = "purple" ;
}