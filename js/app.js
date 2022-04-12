let inputDir = {x:0, y:0};
const foodsound = new Audio('sound/food.mp3');
const gameoversound = new Audio('sound/gameover.mp3');
const movesound = new Audio('sound/move.mp3');
const musicsound = new Audio('sound/music.mp3');
let speed = 5;
let score=0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]

food= {x:6, y:7};
//Game function
function imp(gtime){
    window.requestAnimationFrame(imp);
    //console.log(gtime);
    if((gtime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = gtime;
    gameEngine();
}
function collide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }

    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0  )
    return true;
}

function  gameEngine(){
//update the game
    if(collide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!!");
        snakeArr=[{x:13,y:15}];
        musicsound.play();
        score=0;
    }

    //Move on increment
    if(snakeArr[0].y===food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score+=1;
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    for(let i=snakeArr.length -2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;

    //snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

        foodElement=document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}



window.requestAnimationFrame(imp);
window.addEventListener('keydown', e=>{
    inputDir = {x:0,y:1}
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x =0;
            inputDir.y =-1;
            break;
        case "ArrowDown":
            inputDir.x =0;
            inputDir.y =1;
            
            break;
        case "ArrowLeft":
            inputDir.x =-1;
            inputDir.y =0;
            
            break;
        case "ArrowRight":
            inputDir.x =1;
            inputDir.y =0;
            
            break;
    
        default:
            break;
    }
})