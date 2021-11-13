export function detectCollision(ball, object) {

    let ballTop = ball.position.y - ball.radius;
    let ballBottom = ball.position.y + ball.radius;
    let ballLSide = ball.position.x - ball.radius;
    let ballRSide = ball.position.x + ball.radius;

    let objectTop = object.position.y;
    let objectBottom = object.position.y + object.height;
    let objectLSide = object.position.x;
    let objectRSide = object.position.x + object.width;

    // collision from top or bottom
    if (
        ballBottom >= objectTop &&
        ballTop <= objectBottom &&
        ball.position.x >= objectLSide &&
        ball.position.x <= objectRSide
    ) {
        return 1;
    }

    // collision from left or right
    if (
        ballRSide >= objectLSide &&
        ballLSide <= objectRSide &&
        ball.position.y >= objectTop &&
        ball.position.y <= objectBottom
    ) {
        return -1;
    }

    return 0;
}