import { c, v } from "./canvas/canvas.js"
import { Atom } from "./atom.js"

const atom = new Atom()

window.addEventListener("resize", (e) => atom.resize(e))

function animate() {
    v.clearRect(-c.width / 2, -c.height / 2, c.width, c.height)
    atom.step()
    requestAnimationFrame(animate)
}

animate()