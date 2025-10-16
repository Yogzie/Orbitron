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
    }

}

export const c = CanvasUtils.canvas
export const v = CanvasUtils.view

