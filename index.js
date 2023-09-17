const startGameH3El = document.querySelector("#start-game h3")
const startGameEl = document.getElementById("start-game")
const gameEl = document.getElementById("game")
const livesEl = document.querySelector("#lives span")
const scoreEl = document.getElementById("score")
let messageEl = null
const containerEl = document.getElementById("container")


const heart = "❤"
const colours = ["pink", "blue", "green", "orange"]
let value = 0.1
const blockWidth = 150
const blockHeight = 30
let paddleWidth = 150
let adderX = 3
let adderY = 3
let gameTimerId = null
let buttonTimerId = null
let lives = 3
let score = 0
let scale = 1.1


startGameEl.addEventListener("click", () => {
    startGameEl.style.animation = "slideleft 1s ease-in"
    setTimeout(() => {
        startGame()
        startGameEl.remove()
    }, 900)
    
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

const paddlePosition = [375, 650]
let ballPosition = [250, 200]
let allBlocks = [
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

const allBlocksCopy = [...allBlocks]



function displayBlocks() {
    let block = null
    for(let i = 0; i<allBlocks.length; i++) {
        block = document.createElement("div")
        block.classList.add("block")
        block.style.left = allBlocks[i].bottomLeft[0]  + "px"
        block.style.top = allBlocks[i].bottomLeft[1] + "px"
        gameEl.appendChild(block)
    }
}

displayBlocks()

const paddleEl = document.createElement("div")
paddleEl.classList.add("paddle")
setPosition(paddleEl, paddlePosition)
gameEl.appendChild(paddleEl)


function movePaddle(e) {
    switch(e.key) {
        case "ArrowLeft":
            if(paddlePosition[0] > 15)
            paddlePosition[0] -= 30
            paddleEl.style.left = paddlePosition[0] + "px"
            break

        case "ArrowRight":
            if(paddlePosition[0] < 725)
            paddlePosition[0] += 30
            paddleEl.style.left = paddlePosition[0] + "px"
            break
    }
}

document.addEventListener("keydown", movePaddle)

let ball = document.createElement("div")
ball.classList.add("ball")
setPosition(ball, ballPosition)
gameEl.appendChild(ball)

function moveBall() {
    
    checkGameEnd()
    checkCollision()

    ballPosition[0] += adderX
    ballPosition[1] += adderY
    setPosition(ball, ballPosition)
    

}

function checkCollision() {
    
    if(ballPosition[0] >= 890 | ballPosition[0] <= 10) {
        adderX = -adderX
    }

    if(ballPosition[1] <= 5 ) {
        adderY = -adderY
    
    }

    if( (ballPosition[1] > paddlePosition[1] - 26 && ballPosition[1] <= paddlePosition[1] - 10) && (ballPosition[0] >= paddlePosition[0] -10 && ballPosition[0] <= paddlePosition[0] + paddleWidth + 10)) {

        if(ballPosition[0] < paddlePosition[0] + paddleWidth/3) {
            adderX = -3
            adderY = -adderY
            }

        else if(ballPosition[0]> paddlePosition[0] + paddleWidth/3 && ballPosition[0] < paddlePosition[0] + paddleWidth*(2/3)) {
            adderX = 0
            adderY = -adderY
        }
        else {
            adderX = 3
            adderY = -adderY
        }
        
    }

    if(ballPosition[1] >= 695 ) {
        
        
        ball.style.opacity = 0
        clearInterval(gameTimerId)
        lives--
        if(lives == 0) {
            let els = document.querySelectorAll("#game .block")
            for(el of els) {
                el.remove()
            }
            
            setLives()
            scoreEl.style.opacity = 0
            createDialogueBox() 
        }
        else {    

            setTimeout(()=> {

                ballPosition = [250, 150]
                setPosition(ball, ballPosition)
                adderX = 3
                adderY = 3
                ball.style.opacity = 1
                startGame()

            }, 1000)
        }
        
    }


    
    let blocksEl = document.querySelectorAll("#game .block")
    for(let i = 0; i<allBlocks.length; i++) {

        if((ballPosition[0] >= (allBlocks[i].bottomLeft[0] - 20)  && ballPosition[0] <= (allBlocks[i].bottomRight[0] + 20)) && (ballPosition[1] <= (allBlocks[i].bottomLeft[1] + 30) && ballPosition[1] >= (allBlocks[i].topLeft[1] -50) ) ) {

            blocksEl[i].remove()
            allBlocks.splice(i, 1) 
            adderY = -adderY
            score += 10
            scoreEl.textContent = `Score: ${score}`

        }
    }
}

function checkGameEnd() {
    if(document.querySelectorAll("#game .block").length == 0) {
        clearInterval(gameTimerId)
        
        ballPosition = [250, 150]
        ball.style.opacity = 0
        allBlocks = [...allBlocksCopy]

        messageEl =  document.createElement("h3")
        messageEl.textContent = "Level 2"
        messageEl.id = "message"
        containerEl.appendChild(messageEl)
        setTimeout(() => {
            messageEl.remove()
            messageEl = document.createElement("h3")
            messageEl.textContent = "Level 2"
            messageEl.id = "message2"
            containerEl.appendChild(messageEl)
            setTimeout(()=> {
                messageEl.remove()
                displayBlocks()
                ball.style.opacity = 1
                paddleWidth = 100
                paddleEl.style.width = paddleWidth + "px"
                paddleEl.style.backgroundImage = "repeating-linear-gradient(90deg, white, white 32px, black 1px, black 34px)"
                startGame()
            }, 900)
             
        }, 3000)
        
           
        
    }
}

function setPosition(element, position) {
    element.style.left = position[0] + "px"
    element.style.top = position[1] + "px"
}


function setLives() {
    livesEl.textContent = ""
    for(let i = 0; i<lives; i++) {
        livesEl.textContent += ` ${heart}`
    }   

}


function createDialogueBox() {
    
    const dialogueEl = document.createElement("div")
    const h1El = document.createElement("h1")
    const h3El = document.createElement("h3")
    const buttonEl = document.createElement("button")

    h1El.classList.add("game-over")
    h1El.textContent = "Game Over"
    dialogueEl.appendChild(h1El)

    h3El.classList.add("score")
    h3El.textContent = `Score: ${score}`
    dialogueEl.appendChild(h3El)

    buttonEl.classList.add("replay-btn")
    buttonEl.textContent = "Play again"
    buttonEl.addEventListener("mouseover", () => {
        buttonEl.style.backgroundColor = "#85458A"
    })

    buttonEl.addEventListener("mouseout", () => {
        buttonEl.style.backgroundColor = "#DE3456"
    })

    buttonEl.addEventListener("click", () => {
        allBlocks = [...allBlocksCopy]
        score = 0
        lives = 3
        
        displayBlocks()
        ballPosition = [250, 150]
        paddleWidth = 150
        paddleEl.style.width = 150 + "px"
        paddleEl.style.backgroundImage = "repeating-linear-gradient(90deg, white, white 50px, black 5px, black 51px)"
        ball.style.opacity = 1
        scoreEl.style.opacity = 1
        clearTimeout(buttonTimerId)
        startGame()
        dialogueEl.remove()
        
    })
    
    dialogueEl.appendChild(buttonEl)

    buttonTimerId = setInterval(() => {
        buttonEl.style.scale = scale
        if(scale == 1.1) {
            scale = 1
        }
        else {
            scale = 1.1
        }
    }, 900)

    dialogueEl.classList.add("dialogue")
    containerEl.appendChild(dialogueEl)
    


}


function startGame() {
    // displayBlock()
    
    setLives()
    gameTimerId = setInterval(moveBall, 10)
}




