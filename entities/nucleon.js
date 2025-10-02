import { c, v } from "../canvas/canvas.js"

export class Nucleon {
    static radius = 6;
    constructor(boundary, angle, distanceFactor, direction, volatile) {
        this.boundary = boundary
        this.active = true
        this.angle = angle;
        this.distanceFactor = distanceFactor;

        this.x = this.boundary.position.x + Math.cos(this.angle) * this.distanceFactor * this.boundary.radius;

        this.y = this.boundary.position.y + Math.sin(this.angle) * this.distanceFactor * this.boundary.radius;

        this.direction = direction;

        this.volatile = volatile;
    }

    update() {
        if (!this.active) return
        this.angle += this.direction * 0.01;
        if (this.volatile) {
            this.x = this.boundary.position.x + Math.cos(this.angle) * this.distanceFactor * this.boundary.radius * Math.sin(this.angle * 2)

            this.y = this.boundary.position.y + Math.sin(this.angle) * this.distanceFactor * this.boundary.radius * Math.sin(this.angle * 2)
        }
        else {
            this.x = this.boundary.position.x + Math.cos(this.angle) * this.distanceFactor * this.boundary.radius;

            this.y = this.boundary.position.y + Math.sin(this.angle) * this.distanceFactor * this.boundary.radius;
        }
    }

    draw() {
        if (!this.active) return
        v.beginPath()
        v.fillStyle = "hotpink"
        v.arc(this.x, this.y, Nucleon.radius, 0, Math.PI * 2)
        v.fill()
    }
}