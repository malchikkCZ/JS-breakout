import { detectCollision } from "./collisions.js";

export class Ball {

    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.radius = 10;
        this.maxSpeed = 5;
        
        this.speed = {
            x: 3,
            y: -3
        };

        this.reset();
    }

    reset() {
        this.position = {
            x: this.gameWidth / 2,
            y: this.gameHeight - 80
        };
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.beginPath();

        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // borders collision
        if (this.position.x - this.radius < 0) {
            this.speed.x = -this.speed.x;
        }

        if (this.position.x + this.radius > this.gameWidth) {
            this.speed.x = - this.speed.x;
        }

        if (this.position.y - this.radius < 0) {
            this.speed.y = -this.speed.y;
        }

        // if paddle is missed
        if (this.position.y + this.radius > this.gameHeight) {
            this.game.ballCount--;
            this.game.stop();
            this.game.paddle.reset();
            this.reset();
        }

        // paddle collision
        switch (detectCollision(this, this.game.paddle)) {
            case 1:
                this.speed.y = -this.speed.y;
                break;
            case -1:
                this.speed.x = -this.speed.x;
                break;
        }
    }
}