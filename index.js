import { c, v } from "./canvas/canvas.js"
import { Atom } from "./atom.js"

const atom = new Atom()

window.addEventListener("resize", (e) => atom.resize(e))


let lastTime = 0
function animate(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    v.clearRect(-c.width / 2, -c.height / 2, c.width, c.height)
    atom.step(dt)
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)