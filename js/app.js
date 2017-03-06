// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; // x coordinate location
    this.y = y; // y coordinate location
    this.speed = speed; // speed of enemies

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    // enemies will loop back to the start of screen once they exit screen
    if (this.x >= 505) {
      this.x = 0;
    }
    // check if enemies collided
    checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt)
    // enemies will loop back to the start of screen once they exit screen
    if (this.x >= 505) {
      this.x = 0;
    }
    // check if enemies collided
    checkCollisions(this);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
      case "left":
        if (this.x > 0) {
          this.x -= 100
        }
        break;
      case "right":
        if (this.x < 400) {
          this.x += 100
        }
        break;
      case "up":
        if (this.y > 50) {
          this.y += 80
        }
        break;
      case "down":
        if (this.y < 380) {
          this.y -= 80
        }
        break;
    }
}

Player.prototype.reset = function () {
    this.x = 200
    this.y = 400
};

function checkWin() {
    if (player.y < 40) {
      Window.alert ("You win! Play again?")
      reset()
    }
}

function checkCollisions () {
    if (math.abs(enemy.x - player.x) < 80 && math.abs(enemy.y - player.y) < 50) {
      window.alert ("A bug bit you! Start over")
      reset()
    }
}

// Boundaries
if (player.x > 400)
  player.x = 400
if (player.x < 3)
  player.x = 3
if (player.y > 380)
  player.y = 380

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(60, 400)
var bug2 = new Enemy(140, 350)
var bug3 = new Enemy(200, 300)

var allEnemies = [bug1, bug2, bug3]
var player = new Player(400,400, 50)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
