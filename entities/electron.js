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

    resize() {
        const angle = Math.atan2(this.boundary.oldPosition.y - this.y, this.boundary.oldPosition.x - this.x)
        const dist = Math.hypot(this.x - this.boundary.position.x, this.y - this.boundary.position.y)
        const distPercentage = dist / this.boundary.oldRadius
        this.x = this.boundary.oldPosition.x + Math.cos(angle) * (this.boundary.radius * distPercentage)
        this.y = this.boundary.oldPosition.y + Math.sin(angle) * (this.boundary.radius * distPercentage)
        console.log(`resized angle: ${angle} dist: ${dist} distPercentage ${distPercentage}`)
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
            const length = Math.hypot(this.dx, this.dy)
            this.dx = this.dx / length * this.speed
            this.dy = this.dy / length * this.speed

        }
    }


}