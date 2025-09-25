import { Boundary } from "./entities/boundary.js"
import { Deflector } from "./entities/deflector.js"
import { Nucleon } from "./entities/nucleon.js"

export class Atom {
    constructor(){
        this.boundary = new Boundary()
        this.deflectors = []
        this.nucleons = []

        this.deflectors.push(new Deflector(this.boundary, 0, "red"))
        this.deflectors.push(new Deflector(this.boundary, 0.5, "blue"))
        this.deflectors.push(new Deflector(this.boundary, 0.25, "green"))
        this.deflectors.push(new Deflector(this.boundary, 0.75, "yellow"))


        this.createShell(10, 0.1, 1)
        this.createShell(20, 0.2, -1)
        this.createShell(30, 0.3, 1)
        this.createShell(40, 0.4, -1)
        this.createShell(50, 0.5, 1)

    }

    createShell(nucleonCount, distanceFactor, direction){
        const volatile = distanceFactor <= 0.2;
        for(let i=0; i<nucleonCount; i++){
            const angle = (i / nucleonCount) * Math.PI * 2;
            this.nucleons.push(new Nucleon(this.boundary, angle, distanceFactor, direction, volatile))
        }

    }

    draw() {
        this.boundary.draw()
        for(const d of this.deflectors) d.draw()
        for(const n of this.nucleons) n.draw()
    }

    resize() {
        this.boundary.resize()
    }

    update() {
        for(const d of this.deflectors) d.update()
        for(const n of this.nucleons) n.update()
    }

    step() {
        this.update()
        this.draw()
    }
}



