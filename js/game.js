import { Ball } from "./ball.js";
import { Brick } from "./brick.js";
import { InputHandler } from "./input.js";
import { Paddle } from "./paddle.js";

const STATES = {
    GAMEOVER: 0,
    RUNNING: 1,
    PAUSED: 2,
    CLEARED: 3
}

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
    window.location.reload();
});

export class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ballCount = 3;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        
        this.state = STATES.PAUSED;

        this.bricks = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 10; c++) {
                this.bricks.push(new Brick(this, {x: 91 + 62*c, y: 90 + 22 * r}));
            }
        }
        new Brick(this, {x: 120, y: 100})

        new InputHandler(this);
    }

    start() {
        restartBtn.style.display = "none";
        if (this.state !== STATES.PAUSED ) {
            return;
        }
        this.state = STATES.RUNNING;
    }

    stop() {
        this.state = STATES.PAUSED;
    }

    writeMsg(ctx, message) {
        ctx.font = "20px monospace";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(message, this.gameWidth / 2, this.gameHeight / 2 + 100);
    }

    draw(ctx) {
        switch (this.state) {
            case STATES.GAMEOVER:
                this.writeMsg(ctx, "GAME OVER");
                break;
            case STATES.PAUSED:
                this.writeMsg(ctx, "press spacebar");
                break;
            case STATES.CLEARED:
                this.writeMsg(ctx, "stage cleared");
                break;
        }

        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.bricks.forEach((brick) => brick.draw(ctx));

        ctx.font = "20px monospace";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.fillText(`Balls: ${this.ballCount}`, 780, 30);
    }

    update(deltaTime) {
        if (this.ballCount === 0) {
            this.state = STATES.GAMEOVER;
            restartBtn.style.display = "inline-block";
        }

        if (
            this.state === STATES.GAMEOVER ||
            this.state === STATES.PAUSED ||
            this.state === STATES.CLEARED
        ) {
            return;
        }

        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);
        this.bricks.forEach((brick) => brick.update(deltaTime));
        this.bricks = this.bricks.filter((brick) => !brick.cleared);

        if (this.bricks.length === 0) {
            this.state = STATES.CLEARED;
            restartBtn.style.display = "inline-block";
        }
    }
}