import { Boundary } from "./entities/boundary.js"
import { Deflector } from "./entities/deflector.js"
import { Nucleon } from "./entities/nucleon.js"
import { Electron } from "./entities/electron.js"
import { CanvasUtils, c, v } from "./canvas/canvas.js"
import { Keyboard } from "./actions/Keyboard.js"

export class Atom {
    static score = {
        "blue": 0,
        "green": 0,
        "yellow": 0,
        "red": 0,
        "purple": 0,
        "orange": 0,
        "pink": 0,
    };

    static boundary;

    static electrons;

    static nucleons;

    static deflectors = []

    constructor() {
        Atom.reset(1)
        this.resize()
        v.font = "bold 30px arial"
    }

    static addUser() {
        Atom.reset(Atom.deflectors.length + 1)
    }

    static createShell(nucleonCount, distanceFactor, direction) {
        const volatile = distanceFactor <= 0.2;
        for (let i = 0; i < nucleonCount; i++) {
            const angle = (i / nucleonCount) * Math.PI * 2;
            Atom.nucleons.push(new Nucleon(Atom.boundary, angle, distanceFactor, direction, volatile))
        }

    }

    draw() {
        let d = 30
        v.scale(1, -1)
        let counter = 0;
        for (const p in Atom.score) {
            counter++

            if (counter > Atom.deflectors.length) {
                break;
            }
            v.fillStyle = p
            v.fillText(Atom.score[p], -c.width / 2 + 10, -c.height / 2 + d)
            Atom.boundary.draw()
            d += 30
        }
        v.scale(1, -1)
        for (const d of Atom.deflectors) d.draw()
        for (const n of Atom.nucleons) n.draw()
        for (const e of Atom.electrons) e.draw()
    }

    resize() {
        CanvasUtils.resizeCanvas()
        Atom.boundary.resize()
        for (const e of Atom.electrons) e.resize()

    }

    update(dt) {
        for (const d of Atom.deflectors) d.update(dt)
        for (const n of Atom.nucleons) n.update(dt)
        for (const e of Atom.electrons) e.update(dt)
    }

    step(dt) {
        if (Keyboard.AddUser) {
            Atom.addUser()
        }
        if (Keyboard.Reset) {
            Atom.reset(1)
            return
        }
        this.update(dt)
        this.checkNucleonElectronCollision()
        this.checkBoundaryElectronCollision(dt)
        this.draw()
    }

    static reset(playerCount) {
        Atom.boundary = new Boundary()
        Atom.nucleons = []
        Atom.electrons = []

        // Reset deflectors to prevent accumulation across resets
        Atom.deflectors = []
        Deflector.nextid = 0



        let incrementor = 1 / playerCount
        for (let i = 0; i < playerCount; i++) {
            const p = new Deflector(Atom.boundary)
            Atom.deflectors.push(p)

            p.position = i * incrementor
        }


        this.createShell(10, 0.1, 1)
        this.createShell(20, 0.2, -1)
        this.createShell(30, 0.3, 1)
        this.createShell(40, 0.4, -1)
        this.createShell(50, 0.5, 1)

        for (const d of Atom.deflectors) Atom.electrons.push(new Electron(Atom.boundary, d.position))
    }
    checkNucleonElectronCollision() {
        const radiusSum = Nucleon.radius + Electron.radius
        for (const n of Atom.nucleons) {
            if (!n.active) continue
            for (const e of Atom.electrons) {
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

    checkBoundaryElectronCollision(dt) {
        for (const e of Atom.electrons) {
            e.checkBoundaryCollision(dt)
        }
    }
}



