// Html elements
const startGameH3El = document.querySelector("#start-game h3")
const startGameEl = document.getElementById("start-game")
const gameEl = document.getElementById("game")
const livesEl = document.querySelector("#lives span")
const scoreEl = document.getElementById("score")
const containerEl = document.getElementById("container")
const leftArrowEl = document.getElementById("left-arrow")
const rightArrowEl = document.getElementById("right-arrow")

let messageEl = null
let triggered = false;



//Game variables
let gamePortWidth = 900
let gamePortHeight = 700

const blockWidth = 150
const blockHeight = 30
const heart = "❤"
const colours = ["pink", "blue", "green", "red"]
let value = 0.1
let paddleWidth = 150
let adderX = 3
let adderY = 3
let originalAdder = 3
let gameTimerId = null
let buttonTimerId = null
let lives = 3
let score = 0
let scale = 1.1
let level  = 1


// Adds onclick event listener to the initial page
startGameEl.addEventListener("click", () => {
    startGameEl.style.animation = "slideleft 1s ease-in"
    setTimeout(() => {
        startGame()
        startGameEl.remove()
    }, 900)
    
})

// Creates recurring fading effect on the welcome message in the initial page
setInterval(() => {
    startGameH3El.style.opacity = value
    if(value == 0.1) {
        value = 1
    }
    else {
        value = 0.1
    }
    
}, 1000)

// Class used to create the various blocks to be hit
class Block {
    constructor(valueX, valueY) {
        this.bottomLeft = [valueX, valueY]
        this.bottomRight = [valueX+blockWidth, valueY]
        this.topLeft = [valueX, valueY+blockHeight]
        this.topRight = [valueX+blockWidth, valueY+blockHeight]
    }
}
// Initial positions of various objects inside the game
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


//Renders the blocks on the screen
function displayBlocks() {
    let block = null
    let index = 0
    let count = 0
    for(let i = 0; i<allBlocks.length; i++) {
        if(count % 5 == 0) {
            index++
        }
        block = document.createElement("div")
        block.classList.add("block")
        block.classList.add(colours[index])
        block.style.left = allBlocks[i].bottomLeft[0]  + "px"
        block.style.top = allBlocks[i].bottomLeft[1] + "px"
        gameEl.appendChild(block)
        count++
    }
}

displayBlocks()

// Paddle element to be displayed on the screen
const paddleEl = document.createElement("div")
paddleEl.classList.add("paddle")
setPosition(paddleEl, paddlePosition)
gameEl.appendChild(paddleEl)


// Moves the paddle in the appropriate direction if the right key is pressed 
function movePaddle(e) {
    switch(e.key) {
        case "ArrowLeft":
            if(paddlePosition[0] > 15)
            paddlePosition[0] -= 30
            paddleEl.style.left = paddlePosition[0] + "px"
            break

        case "ArrowRight":
            if(paddlePosition[0] + paddleWidth < 875)
            paddlePosition[0] += 30
            paddleEl.style.left = paddlePosition[0] + "px"
            break
    }
}


document.addEventListener("keydown", movePaddle)

//  Moves the paddle in the appropriate direction if the when the right arrow is pressed 
function arrowLeft() {

    if(paddlePosition[0] > 15) {
        paddlePosition[0] -= 40
        paddleEl.style.left = paddlePosition[0] + "px"
    }
}
function arrowRight() {

    if(paddlePosition[0] + paddleWidth < 875) {
        paddlePosition[0] += 40
        paddleEl.style.left = paddlePosition[0] + "px"
    }
    
}

leftArrowEl.addEventListener("mousedown", arrowLeft)
rightArrowEl.addEventListener('mousedown', arrowRight)


// Ball element to be displayed on the screen
let ball = document.createElement("div")
ball.classList.add("ball")
setPosition(ball, ballPosition)
gameEl.appendChild(ball)


// Moves the ball on the screen by adding a small increment to the x and y position of the ball.
// This is done by adding to the left and top css property of the ball which has a position of
// absolute. 

//Calls the checkGameEnd method to check if the current level is over and calls the checkCollision 
//to see if the ball collided with something
function moveBall() {
    
    checkGameEnd()
    checkCollision()

    ballPosition[0] += adderX
    ballPosition[1] += adderY
    setPosition(ball, ballPosition)
    

}

// Uses many if/else statements to check if the ball collided with a wall, block, or paddle or it went out 
function checkCollision() {
    

    //Checks if the ball collided with the left or right wall and changes the x-increment appropriately
    if(ballPosition[0] >= gamePortWidth - 10 | ballPosition[0] <= 10) {
        adderX = -adderX
    }

    //Checks if the ball collided with the top wall and and changes the y-increment appropriately
    if(ballPosition[1] <= 5 ) {
        adderY = -adderY
    
    }

    // Checks if the ball coollided with the paddle
    if( (ballPosition[1] > paddlePosition[1] - 26 && ballPosition[1] <= paddlePosition[1] - 10) && (ballPosition[0] >= paddlePosition[0] -10 && ballPosition[0] <= paddlePosition[0] + paddleWidth + 10)) {

        // Through many if/else statement checks what position on the paddle the ball collided 
        // with and accordingly changes the rebound of the ball

        if(ballPosition[0] < paddlePosition[0] + paddleWidth/5) {
            adderX = -originalAdder
            adderY = -adderY
        }

        else if(ballPosition[0] > paddlePosition[0] + paddleWidth/5 && ballPosition[0] < paddlePosition[0] + paddleWidth*(2/5)) {
            adderX = -originalAdder + 1
            adderY = -adderY
        }

        else if(ballPosition[0]> paddlePosition[0] + paddleWidth*(2/5) && ballPosition[0] < paddlePosition[0] + paddleWidth*(3/5)) {
            adderX = 0
            adderY = -adderY
        }

        else if(ballPosition[0]> paddlePosition[0] + paddleWidth*(3/5) && ballPosition[0] < paddlePosition[0] + paddleWidth*(4/5)) {
            adderX = originalAdder - 1
            adderY = -adderY
        }
        
        else {
            adderX = originalAdder
            adderY = -adderY
        }
        
    }

    // Checks if the ball went past the paddle at the bottom
    if(ballPosition[1] >= gamePortHeight - 5 ) {
        
        // Clears the interval that calls moveBall every 10 ms and then decrements the lives 
        // of the player
        ball.style.opacity = 0
        clearInterval(gameTimerId)
        lives--
        if(lives == 0) {
            // If the players has no lives left all blocks are removed from the screen
            let els = document.querySelectorAll("#game .block")
            for(el of els) {
                el.remove()
            }
            
            setLives()
            scoreEl.style.opacity = 0
            // And the createDialogueBox function is called in order to tell the player that the 
            // game is over 
            createDialogueBox("Game Over") 
        }
        else {    
            // If the players has still more lives the game is reset by retaking the ball at the start position and calling th startGame method after 1 second has passed
            setTimeout(()=> {

                ballPosition = [250, 150]
                setPosition(ball, ballPosition)
                adderX = Math.abs(adderY)
                adderY = Math.abs(adderY)
                ball.style.opacity = 1
                startGame()

            }, 1000)
        }
        
    }


    // Checks if the ball has hit any blocks if so it removes the block that has been hit
    let blocksEl = document.querySelectorAll("#game .block")
    for(let i = 0; i<allBlocks.length; i++) {

        if((ballPosition[0] >= (allBlocks[i].bottomLeft[0] - 20)  && ballPosition[0] <= (allBlocks[i].bottomRight[0] + 20)) && (ballPosition[1] <= (allBlocks[i].bottomLeft[1] + 20) && ballPosition[1] >= (allBlocks[i].topLeft[1] -20) ) ) {

            blocksEl[i].remove()
            allBlocks.splice(i, 1) 
            adderY = -adderY
            score += 10
            scoreEl.textContent = `Score: ${score}`

        }
    }
}


// Checks if the current level is over by checking if all the blocks on the screen have been 
//  removed
function checkGameEnd() {
    if(document.querySelectorAll("#game .block").length == 0) {
        //If level is over it increments the level and passes it to the createMessage function
        clearInterval(gameTimerId)
        level++
        ballPosition = [250, 150]
        ball.style.opacity = 0
        allBlocks = [...allBlocksCopy]
        adderX = Math.abs(adderY)
        adderY = Math.abs(adderY)
        createMessage(level)

        
    }
}

// Creates a message for the user introducing a new level
function createMessage(lv) {
    // its level 2 or 3 a message element is added to the screen using a transition 
    if(lv == 2 | lv == 3) {
        messageEl =  document.createElement("h3")
        messageEl.textContent = `Level ${lv}`
        messageEl.id = "message"
        containerEl.appendChild(messageEl)

        setTimeout(() => {
            
            messageEl.remove()
            messageEl = document.createElement("h3")
            messageEl.textContent = `Level ${lv}`
            messageEl.id = "message2"
            containerEl.appendChild(messageEl)
            
           
            setTimeout(()=> {
                //After the message has been displayed  the blocks are re-rendered on the screen
                messageEl.remove()
                ball.style.opacity = 1
                displayBlocks()
                // If the level is 2 then the paddles is just made shorter
                if(lv == 2) {
                    
                    adderX = Math.abs(adderY)
                    adderY = Math.abs(adderY)
                    paddleWidth = 100
                    paddleEl.style.width = paddleWidth + "px"
                    paddleEl.style.backgroundImage = "repeating-linear-gradient(90deg, white, white 32px, black 1px, black 34px)"
                    startGame()
                }
                // Otherwise if the new level is 3 the speed of the ball movement is increa
                else if(lv == 3) {
                    
                    originalAdder = 4
                    adderX, adderY = originalAdder
                    startGame()
                }
                
            }, 900)
                
        }, 3000)
    }
    // If the new level is anything other than 2 or 3 the user is presented with a pop up box 
    // telling that the game is over
    else {
        createDialogueBox("Game Finished")
    }
    
            
}

// Sets the left and top css propeties of any element passed in
function setPosition(element, position) {
    element.style.left = position[0] + "px"
    element.style.top = position[1] + "px"
}


// Renders the lives of the player on screen
function setLives() {
    livesEl.textContent = ""
    for(let i = 0; i<lives; i++) {
        livesEl.textContent += ` ${heart}`
    }   

}

// Creates a pop up dialogue for the user using the argument passed in
function createDialogueBox(sentence) {
    
    const dialogueEl = document.createElement("div")
    const h1El = document.createElement("h1")
    const h3El = document.createElement("h3")
    const buttonEl = document.createElement("button")

    //Creating the various html element to be added to the dialogue box
    h1El.classList.add("game-over")
    h1El.textContent = sentence
    dialogueEl.appendChild(h1El)

    h3El.classList.add("score")
    h3El.textContent = `Score: ${score}`
    dialogueEl.appendChild(h3El)

    buttonEl.classList.add("replay-btn")
    buttonEl.textContent = "Play again"
    // Adding styling effects the button
    buttonEl.addEventListener("mouseover", () => {
        buttonEl.style.backgroundColor = "#85458A"
    })

    buttonEl.addEventListener("mouseout", () => {
        buttonEl.style.backgroundColor = "#DE3456"
    })

    // Adding event listener to the play again button to reset any game variables or game ojbects to their original form

    buttonEl.addEventListener("click", () => {
        allBlocks = [...allBlocksCopy]
        score = 0
        scoreEl.textContent = `Score ${score}`
        lives = 3
        
        displayBlocks()
        ballPosition = [250, 150]
        paddleWidth = 150
        paddleEl.style.width = 150 + "px"
        paddleEl.style.backgroundImage = "repeating-linear-gradient(90deg, white, white 50px, black 5px, black 51px)"
        ball.style.opacity = 1
        scoreEl.style.opacity = 1
        level = 1
        originalAdder = 3
        adderX = 3
        adderY = 3
        clearTimeout(buttonTimerId)
        startGame()
        dialogueEl.remove()
        
    })
    
    dialogueEl.appendChild(buttonEl)

    // Adding styling effect
    
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


// calls the moveBall function every 10 ms
function startGame() {
    // displayBlock()
    setLives()
    gameTimerId = setInterval(moveBall, 10)
}




