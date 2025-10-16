import { c, v } from "../canvas/canvas.js"


export class Boundary {

    constructor() {
        this.position = { x: c.width / 2, y: c.height / 2 }
        this.radius = c.height > c.width ? c.width / 2.1 : c.height / 2.1

        this.thickness = 5
        this.oldPosition = null
        this.oldRadius = null
    }


    draw() {
        v.beginPath()
        v.arc(this.position.x, this.position.y, this.radius - this.thickness, 0, Math.PI * 2)
        v.stroke()
        v.closePath()
        v.beginPath()
        v.arc(this.position.x, this.position.y, this.radius + this.thickness, 0, Math.PI * 2)
        v.stroke()
    }

    resize() {

        this.oldPosition = { x: this.position.x, y: this.position.y }
        this.oldRadius = this.radius

        this.position = { x: c.width / 2, y: c.height / 2 }
        this.radius = c.height > c.width ? c.width / 2.1 : c.height / 2.1
    }
    // Methods
    // Resize method
    // Draw method

}