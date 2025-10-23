export class CanvasUtils {
    static canvas = document.getElementById("canvas")
    static view = CanvasUtils.canvas.getContext("2d")
    static {
        CanvasUtils.setupCanvas();
        CanvasUtils.resizeCanvas();
    }
    static resizeCanvas() {
        this.canvas.height = innerHeight;
        this.canvas.width = innerWidth;
        CanvasUtils.setupCanvas();
    }

    static setupCanvas() {
        this.view.strokeStyle = "white";
        this.view.lineWidth = 2;
        this.view.lineCap = "round";
        this.view.fillStyle = "white";

        this.view.translate(this.canvas.width / 2, this.canvas.height / 2)
        this.view.scale(1, -1)
    }

}

export const c = CanvasUtils.canvas
export const v = CanvasUtils.view

