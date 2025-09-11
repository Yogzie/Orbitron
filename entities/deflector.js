
import { c, v } from "../canvas/canvas.js"

export class Deflector{
    constructor(boundary, position, colour){
        this.boundary = boundary
        this.position = position
        this.size = 0.05
        this.width = 10
        this.colour = colour


    }

    rotate(){
        this.position += 0.001

    }

    draw(){
        const startAngle = (this.position - this.size / 2) * Math.PI * 2
        const endAngle = (this.position + this.size / 2) * Math.PI * 2

        const oldLineWidth = v.lineWidth
        const oldStrokeStyle = v.strokeStyle

        v.lineWidth = this.width
        v.strokeStyle = this.colour
        v.beginPath()
        v.arc(this.boundary.position.x, this.boundary.position.y, this.boundary.radius, startAngle, endAngle)
        v.stroke()

        v.lineWidth = oldLineWidth
        v.strokeStyle = oldStrokeStyle

    }

}