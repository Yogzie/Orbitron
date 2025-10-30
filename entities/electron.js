import { c, v } from "../canvas/canvas.js"
import { Nucleon } from "./nucleon.js"
import { Atom } from "../atom.js"

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
        const vector = { x: this.boundary.position.x - this.x, y: this.boundary.position.y - this.y }
        const scale = this.boundary.radius / this.boundary.previous.radius
        this.x = this.boundary.position.x + vector.x * scale
        this.y = this.boundary.position.y + vector.y * scale
        this.dx *= scale
        this.dy *= scale
        Electron.radius = this.boundary.radius / 60
        Nucleon.radius = Electron.radius

    }

    checkBoundaryCollision() {
        const dist = Math.hypot(this.x - this.boundary.position.x, this.y - this.boundary.position.y)

        if (dist + Electron.radius + this.boundary.thickness >= this.boundary.radius) {
            let angle = Math.atan2(this.y, this.x)
            if (angle < -Math.PI / 2) angle += Math.PI * 2;
            for (const d of Atom.deflectors) {
                if ((angle > d.startAngle) && (angle < d.endAngle)) {
                    this.color = d.color
                }
            }

            const distToBoundary = dist - Electron.radius - this.boundary.thickness
            this.x *= distToBoundary / dist
            this.y *= distToBoundary / dist

            const vectorX = (this.x - this.boundary.position.x) / this.boundary.radius
            const vectorY = (this.y - this.boundary.position.y) / this.boundary.radius

            const dot = this.dx * vectorX + this.dy * vectorY

            this.dx -= 2 * dot * vectorX
            this.dy -= 2 * dot * vectorY
            const length = Math.hypot(this.dx, this.dy)
            this.dx = this.dx / length * this.speed * 8
            this.dy = this.dy / length * this.speed * 8

        }
    }


}