import { c, v } from "../canvas/canvas.js"


export class Boundary {

    constructor() {
        this.resize()

    }


    draw() {
        v.beginPath()
        v.arc(this.position.x, this.position.y, this.radius - 5, 0, Math.PI * 2)
        v.arc(this.position.x, this.position.y, this.radius + 5, 0, Math.PI * 2)
        v.stroke()
    }

    resize() {
        this.position = { x: c.width / 2, y: c.height / 2 }
        this.radius = c.height > c.width ? c.width / 2.1 : c.height / 2.1


    }
    // Methods
    // Resize method
    // Draw method

}