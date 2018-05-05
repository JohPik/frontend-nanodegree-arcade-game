var element = document.getElementById("level");
let currentLevel = 0;
//score.innerHTML =level;
let bugStartPoint = [60, 140, 220];
let bugSpeed = [100, 200, 250, 300, 350, 400, 450, 500];
numBugs = 0;


// *** Enemies our player must avoid ***
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = bugStartPoint[Math.floor(Math.random() * bugStartPoint.length)];// randomly choose the row location of the bug
    this.speed = bugSpeed[Math.floor(Math.random() * bugSpeed.length)];// randomly choose the row location of the bug
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 530) {
      this.x = -60;
      this.speed = bugSpeed[Math.floor(Math.random() * bugSpeed.length)]
    }

      if (player.y == this.y && player.x >= Math.floor(this.x) - 50 && player.x <= Math.floor(this.x) + 50 ) {
        //setTimeout(collision, 50); // is trigggered When the player touch a Bug
        collision();
      }
      level.innerHTML = currentLevel;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// *** player class ***
var Player = function() {
    this.x = 200; //200
    this.y = 380; //380
    this.sprite = 'images/char-boy.png';
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player position on the screen
Player.prototype.update = function() {
};

// Move the player to up, down left and right
// Make the player does not leave the canvas
Player.prototype.handleInput = function(e) {
  if (e === 'right' && this.x < 400 ) {
    this.x += 100;
  } else if (e === 'left' && this.x > 0) {
    this.x -= 100;
  } else if (e === 'up') {
    if (this.y > 60) {
      this.y -= 80;
    } else {
      this.y -= 80;
      setTimeout(win, 150); // is trigggered When the player win
    }
  } else if (e === 'down' && this.y < 380) {
    this.y += 80;
  }
};

// Reset position of player when game is won
function win () {
  player.x = 200;
  player.y = 380;
  currentLevel++; // add 1 to level
  numBugs++; // add 1 bug to canvas
  createNewBug();
}
function createNewBug() {
  allEnemies.length = 0;

   // load new set of enemies
   for (var i = 0; i <= numBugs; i++) {
       var enemy = new Enemy;
       allEnemies.push(enemy);
   }

}

// Reset position of player when game is lost
function collision() {
  player.x = 200;
  player.y = 380;
}


// *** Now instantiate your objects. ***

// Place all enemy objects in an array called allEnemies
let enemy = new Enemy();
let allEnemies = [];
allEnemies.push(enemy);

// Place the player object in a variable called player
let player = new Player();


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
