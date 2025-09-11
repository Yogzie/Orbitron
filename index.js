import { c, v } from "./canvas/canvas.js"
import { Boundary } from "./entities/boundary.js"
import { Deflector } from "./entities/deflector.js"

const boundary = new Boundary()
const deflector1 = new Deflector(boundary, 0, "red")
const deflector2 = new Deflector(boundary, 0.5, "blue")
const deflector3 = new Deflector(boundary, 0.25, "green")
const deflector4 = new Deflector(boundary, 0.75, "yellow")

window.addEventListener("resize", resize)

function resize(){
    boundary.resize()
}

function animate() {

    v.clearRect(0, 0, c.width, c.height)

    deflector1.rotate()
    deflector2.rotate()
    deflector3.rotate()
    deflector4.rotate()

    boundary.draw()
    deflector1.draw()
    deflector2.draw()
    deflector3.draw()
    deflector4.draw()

    requestAnimationFrame(animate)
}

animate()