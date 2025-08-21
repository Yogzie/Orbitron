import { c, v } from "./canvas/canvas.js"
import { Boundary } from "./entities/boundary.js"

const boundary = new Boundary()


function animate() {

    v.clearRect(0, 0, c.width, c.height)

    boundary.draw()

    requestAnimationFrame(animate)
}

animate()