import { detectCollision } from "./collisions.js";

export class Brick {

    constructor(game, position) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.width = 60;
        this.height = 20;

        this.position = position;
        this.cleared = false;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        switch (detectCollision(this.game.ball, this)) {
            case 1:
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.cleared = true;
                break;
            case -1:
                this.game.ball.speed.x = -this.game.ball.speed.x;
                this.cleared = true;
        }
    }
}