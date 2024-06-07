// console.log(window);

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;
const ball_SIZE = 100;
const BAR_HEIGHT = 300;

// here we are calculating the margin left and top for the ball
const MARGIN_TOP = WINDOW_HEIGHT - ball_SIZE;
const MARGIN_LEFT = WINDOW_WIDTH - ball_SIZE;

// here we are setting the initial position of the ball
let x_pos = 10;
let y_pos = 10;

// here we are setting the direction of the ball
let x_direction = 1;
let y_direction = 1;

// here we got the ball and bar element
const ball = document.getElementById("ball");
const bar = document.getElementById("bar");

const bar_top = 300;

function increment() {
  ball.style.top = y_pos + "px";
  ball.style.left = x_pos + "px";

  if (y_pos >= MARGIN_TOP || y_pos <= 0) {
    y_direction *= -1;
  }
  if (x_pos >= MARGIN_LEFT || x_pos <= 10) {
    // Check if bar position collides with ball
    if (x_pos <= 10) {
      if (
        y_pos + ball_SIZE / 2 >= bar_top &&
        y_pos + ball_SIZE / 2 <= bar_top + BAR_HEIGHT
      ) {
        x_direction *= -1;
        x_pos = 11;
      } else {
        alert("Game Over");
      }
    } else {
      x_direction *= -1;
    }
  }

  x_pos += x_direction * 5;
  y_pos += y_direction * 5;
}

function moveBar(e) {
  const y = e.clientY - 200;
  bar.style.top = y + "px";
}

document.addEventListener("mousemove", moveBar);

console.log(window.innerHeight, ball);
setInterval(increment, 5);
