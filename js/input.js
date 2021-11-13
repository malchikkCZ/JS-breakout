export class InputHandler {

    constructor(game) {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    game.paddle.moveLeft();
                    break;
                case "ArrowRight":
                    game.paddle.moveRight();
                    break;
                case "Escape":
                    game.stop();
                    break;
                default:
                    game.start();
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    if (game.paddle.speed < 0) {
                        game.paddle.stop();
                    }
                    break;
                case "ArrowRight":
                    if (game.paddle.speed > 0) {
                        game.paddle.stop();
                    }
                    break;
            }
        });
    }
}