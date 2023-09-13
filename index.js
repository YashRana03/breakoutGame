const startGameH3El = document.querySelector("#start-game h3")
const startGameEl = document.getElementById("start-game")
const gameEl = document.getElementById("game")
const colours = ["pink", "blue", "green", "orange"]
let value = 0.1
let count = -1


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


function renderBlocks() {
    
    let something = null
    
    for(let i = 0; i<20; i++) {
        if(i % 5 == 0) {
            count++
        }
        something = document.createElement("div")
        something.style.backgroundColor = colours[count]
        something.classList.add("block")
        gameEl.appendChild(something)
        
    }
    
}

renderBlocks()