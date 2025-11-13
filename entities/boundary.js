import { c, v } from "../canvas/canvas.js"


export class Boundary {

    constructor() {
        this.position = { x: 0, y: 0 }
        this.radius = c.height > c.width ? c.width / 2.1 : c.height / 2.1
        this.previous = { x: 0, y: 0, radius: this.radius }
        this.thickness = 5
        this.oldPosition = null
        this.oldRadius = null
    }


    draw() {
        // v.beginPath()
        // v.arc(0, 0, this.radius - this.thickness, 0, Math.PI * 2)
        // v.stroke()
        // v.closePath()
        v.beginPath()
        v.strokeStyle = "rgba(255,255,255,0.5)"
        v.lineWidth = 15
        v.arc(0, 0, this.radius, 0, Math.PI * 2)
        v.stroke()
    }

    resize() {


        //this.oldPosition = { x: this.position.x, y: this.position.y }
        //this.oldRadius = this.radius

        this.previous = { x: 0, y: 0, radius: this.radius }

        this.radius = c.height > c.width ? c.width / 2.1 : c.height / 2.1
    }
    // Methods
    // Resize method
    // Draw method

}