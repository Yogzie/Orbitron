import { c, v } from "./canvas/canvas.js"
import { Atom } from "./atom.js"

const atom = new Atom()
   
window.addEventListener("resize", () => atom.resize())

function animate() {

    v.clearRect(0, 0, c.width, c.height)

    atom.step()

    requestAnimationFrame(animate)
}

animate()