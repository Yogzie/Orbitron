import { Keyboard } from "../actions/Keyboard.js"
import { c, v } from "../canvas/canvas.js"
import { Atom } from "../atom.js"

export class Deflector {
    static nextid = 0
    constructor(boundary, position) {
        this.id = Deflector.nextid++
        this.boundary = boundary
        this.position = position
        this.size = 0.05
        this.width = 10
        this.color = Object.keys(Atom.score)[this.id]
        this.startAngle = (this.position - this.size / 2) * Math.PI * 2
        this.endAngle = (this.position + this.size / 2) * Math.PI * 2
    }

    rotate(direction = 0) {
        this.position += direction
    }

    draw() {
        this.startAngle = (this.position - this.size / 2) * Math.PI * 2
        this.endAngle = (this.position + this.size / 2) * Math.PI * 2

        const oldLineWidth = v.lineWidth
        const oldStrokeStyle = v.strokeStyle

        v.lineWidth = this.width
        v.strokeStyle = this.color
        v.beginPath()
        v.arc(this.boundary.position.x, this.boundary.position.y, this.boundary.radius, this.startAngle, this.endAngle)
        v.stroke()

        v.lineWidth = oldLineWidth
        v.strokeStyle = oldStrokeStyle

    }

    update() {
        if (Keyboard.Left) {
            this.rotate(0.001)
        } else if (Keyboard.Right) {
            this.rotate(-0.001)
        }
    }
}