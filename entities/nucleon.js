import { c, v } from "../canvas/canvas.js"

export class Nucleon {
    constructor(boundary){
        this.boundary = boundary
        this.x = c.width / 2
        this.y = c.height / 2
    }

    update() {

    }

    draw() {
        v.beginPath()
        v.fillStyle = "yellow"
        v.arc(this.x, this.y, 10, 0, Math.PI * 2)
        v.fill()
    }
}