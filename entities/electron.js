import { c, v } from "../canvas/canvas.js"

export class Electron {

    static radius = 6;
    constructor(boundary, deflectorPos) {
        this.boundary = boundary
        this.deflectorPos = deflectorPos
        this.color = "white"
        this.annihilate = false

        this.x = this.boundary.position.x + Math.cos(deflectorPos * Math.PI * 2) * 0.9 * this.boundary.radius;
        this.y = this.boundary.position.y + Math.sin(deflectorPos * Math.PI * 2) * 0.9 * this.boundary.radius;

        this.speed = 0.5

        const angle = Math.atan2(this.boundary.position.y - this.y, this.boundary.position.x - this.x)

        this.dx = Math.cos(angle) * this.speed
        this.dy = Math.sin(angle) * this.speed
    }

    draw() {
        v.beginPath()
        v.fillStyle = this.color
        v.arc(this.x, this.y, Electron.radius, 0, Math.PI * 2)
        v.fill()
    }

    update() {
        this.x += this.dx
        this.y += this.dy
    }

    checkBoundaryCollision() {
        const dist = Math.hypot(this.x - this.boundary.position.x, this.y - this.boundary.position.y)

        if (dist + Electron.radius + this.boundary.thickness >= this.boundary.radius) {
            this.x -= this.dx
            this.y -= this.dy

            const vectorX = (this.x - this.boundary.position.x) / this.boundary.radius
            const vectorY = (this.y - this.boundary.position.y) / this.boundary.radius

            const dot = this.dx * vectorX + this.dy * vectorY

            this.dx -= 2 * dot * vectorX
            this.dy -= 2 * dot * vectorY

        }
    }


}