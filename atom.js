import { Boundary } from "./entities/boundary.js"
import { Deflector } from "./entities/deflector.js"
import { Nucleon } from "./entities/nucleon.js"
import { Electron } from "./entities/electron.js"
import { CanvasUtils } from "./canvas/canvas.js"

export class Atom {
    static score = { "blue": 0, "green": 0, "yellow": 0, "red": 0 }
    constructor() {
        this.boundary = new Boundary()
        this.deflectors = []
        this.nucleons = []
        this.electrons = []


        this.deflectors.push(new Deflector(this.boundary, 0, "red"))
        this.deflectors.push(new Deflector(this.boundary, 0.5, "blue"))
        this.deflectors.push(new Deflector(this.boundary, 0.25, "green"))
        this.deflectors.push(new Deflector(this.boundary, 0.75, "yellow"))


        this.createShell(10, 0.1, 1)
        this.createShell(20, 0.2, -1)
        this.createShell(30, 0.3, 1)
        this.createShell(40, 0.4, -1)
        this.createShell(50, 0.5, 1)

        for (const d of this.deflectors) this.electrons.push(new Electron(this.boundary, d.position))

        this.resize()

    }



    createShell(nucleonCount, distanceFactor, direction) {
        const volatile = distanceFactor <= 0.2;
        for (let i = 0; i < nucleonCount; i++) {
            const angle = (i / nucleonCount) * Math.PI * 2;
            this.nucleons.push(new Nucleon(this.boundary, angle, distanceFactor, direction, volatile))
        }

    }

    draw() {
        this.boundary.draw()
        for (const d of this.deflectors) d.draw()
        for (const n of this.nucleons) n.draw()
        for (const e of this.electrons) e.draw()
    }

    resize() {
        CanvasUtils.resizeCanvas()
        this.boundary.resize()
        for (const e of this.electrons) e.resize()

    }

    update() {
        for (const d of this.deflectors) d.update()
        for (const n of this.nucleons) n.update()
        for (const e of this.electrons) e.update()
    }

    step() {
        this.update()
        this.checkNucleonElectronCollision()
        this.checkBoundaryElectronCollision()
        this.draw()

    }


    checkNucleonElectronCollision() {
        const radiusSum = Nucleon.radius + Electron.radius
        for (const n of this.nucleons) {
            if (!n.active) continue
            for (const e of this.electrons) {
                const dist = Math.hypot(e.x - n.x, e.y - n.y)
                if (dist < radiusSum) {
                    // do logic things
                    const angle = Math.atan2(e.y - n.y, e.x - n.x)
                    const speed = Math.hypot(e.dx, e.dy)
                    e.dx = Math.cos(angle) * speed
                    e.dy = Math.sin(angle) * speed
                    n.active = false
                    if (e.color !== "white") {
                        Atom.score[e.color] += 10
                    }
                }
            }
        }
    }

    checkBoundaryElectronCollision() {
        for (const e of this.electrons) {
            e.checkBoundaryCollision()
        }
    }
}



