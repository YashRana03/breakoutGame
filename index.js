const startGameH3El = document.querySelector("#start-game h3")
const startGameEl = document.getElementById("start-game")
const gameEl = document.getElementById("game")
const colours = ["pink", "blue", "green", "orange"]
let value = 0.1
const blockWidth = 150
const blockHeight = 30
//let count = -1
let adderX = 2
let adderY = 2


startGameEl.addEventListener("click", () => {
    startGameEl.style.animation = "slideleft 1s ease-in"
    setTimeout(() => {
        startGameEl.remove()
    }, 800)
    
})

setInterval(() => {
    startGameH3El.style.opacity = value
    if(value == 0.1) {
        value = 1
    }
    else {
        value = 0.1
    }
}, 1000)


class Block {
    constructor(valueX, valueY) {
        this.bottomLeft = [valueX, valueY]
        this.bottomRight = [valueX+blockWidth, valueY]
        this.topLeft = [valueX, valueY+blockHeight]
        this.topRight = [valueX+blockWidth, valueY+blockHeight]
    }
}

const paddlePosition = [375, 450]
const ballPosition = [250, 250]
const allBlocks = [
    new Block(55, 30),
    new Block(215, 30), 
    new Block(375, 30),
    new Block(535, 30),
    new Block(695, 30),
    new Block(55, 70),
    new Block(215, 70), 
    new Block(375, 70),
    new Block(535, 70),
    new Block(695, 70),
    new Block(55, 110),
    new Block(215, 110), 
    new Block(375, 110),
    new Block(535, 110),
    new Block(695, 110),
]

//let a = new Block(20, 30)
 let block = null
for(let i = 0; i<allBlocks.length; i++) {
    block = document.createElement("div")
    block.classList.add("block")
    block.style.left = allBlocks[i].bottomLeft[0]  + "px"
    block.style.top = allBlocks[i].bottomLeft[1] + "px"
    gameEl.appendChild(block)
}


const paddle = document.createElement("div")
paddle.classList.add("paddle")
paddle.style.left = paddlePosition[0] + "px"
paddle.style.top = paddlePosition[1] + "px"
gameEl.appendChild(paddle)


function movePaddle(e) {
    switch(e.key) {
        case "ArrowLeft":
            if(paddlePosition[0] > 15)
            paddlePosition[0] -= 20
            paddle.style.left = paddlePosition[0] + "px"
            break

        case "ArrowRight":
            if(paddlePosition[0] < 725)
            paddlePosition[0] += 20
            paddle.style.left = paddlePosition[0] + "px"
            break
    }
}

document.addEventListener("keydown", movePaddle)

const ball = document.createElement("div")
ball.classList.add("ball")
ball.style.left = ballPosition[0] + "px"
ball.style.top = ballPosition[1] + "px"
gameEl.appendChild(ball)



function moveBall() {
    if(ballPosition[0] >= 890 | ballPosition[0] <= 10) {
        adderX = -adderX
    }

    if(ballPosition[1] >= 495 | ballPosition[1] <= 5 ) {
        adderY = -adderY
        
    }

    if( (ballPosition[1] > 424 && ballPosition[1] <= 428) && (ballPosition[0] >= paddlePosition[0] -15 && ballPosition[0] <= paddlePosition[0] + 165)) {
        adderY = -adderY  
    }

    for(let i = 0; i<allBlocks.length; i++) {
        //console.log(1)
        if((ballPosition[0] >= (allBlocks[i].bottomLeft[0] - 5)  && ballPosition[0] <= (allBlocks[i].bottomRight[0] + 5)) && (ballPosition[1] >= (allBlocks[i].bottomLeft[1] + 5) && ballPosition[1] <= (allBlocks[i].topLeft[1] - 5) ) ) {
            console.log("touched")
            let blocks = document.querySelectorAll("#game .block")
            blocks[i].remove()
            allBlocks.splice(i, 1)
            console.log()
            adderY = -adderY
            
        }
    }

    ballPosition[0] += adderX
    ballPosition[1] += adderY
    ball.style.left = ballPosition[0] + "px"
    ball.style.top = ballPosition[1] + "px"

}


setInterval(moveBall, 10)

// function renderBlocks() {
    
//     let something = null
    
//     for(let i = 0; i<20; i++) {
//         if(i % 5 == 0) {
//             count++
//         }
//         something = document.createElement("div")
//         something.style.backgroundColor = colours[count]
//         something.classList.add("block")
//         gameEl.appendChild(something)
        
//     }
    
// }

// renderBlocks()

