const startGameH3El = document.querySelector("#start-game h3")
const startGameEl = document.getElementById("start-game")
let value = 0.1

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