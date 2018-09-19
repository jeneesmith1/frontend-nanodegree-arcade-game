// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = [];
    this.y = [];
    this.v = [];
};


//make the different Enemies start at different positions

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.  
    this.x += (1 + this.v * dt);  


   for (x = 0; x < allEnemies.length; x++) {

    if (allEnemies[x].x > 600) {
        allEnemies[x].x = -100;
    }

        if (allEnemies[x].y > (player.y - 30) && allEnemies[x].y < (player.y + 30)) {
            if (allEnemies[x].x > (player.x - 10) && allEnemies[x].x < (player.x + 10)) {
                            player.x = 200
                            player.y = 400
            }


    }

}


 
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var OnePlayerStep = 100;

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.key = null;
}

Player.prototype.handleInput = function(key) {
    this.key = key
}


Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //if key press up, make player move up
    function winGame() {
        console.log("YOU WIN")
        var body = document.querySelector('body')
        var modal = document.createElement('modal')
        modal.innerHTML = `<div id="Modal" class="modal"><div class="modal-content"><span class="close">&times;</span><span> You won! Refresh the page to play again! </span></div></div>`
        body.prepend(modal)
        modal.style.display = "block";
        player.y = 400
}

/* /MODAL 

    <div id="Modal" class="modal">
        
        <div class="modal-content" >
         You are great!
        </div>
    </div>



*/

    if (this.key == 'up' && this.y > 0) {      
        this.y -= 100
        console.log(this.y)
        this.key = null
        if (this.y == 0){
            setTimeout(winGame, 250)
        }
    }

    if (this.key == 'right' && this.x < 400) {
        this.x += 100
        this.key = null
    }

    if (this.key == 'left' && this.x > 0) {
        this.x -= 100
        this.key = null
    }


    if (this.key == 'down' && this.y < 400) {
        this.y += 100
        this.key = null
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var randomEnemies = Math.floor(Math.random() * 5) + 1;
console.log(randomEnemies)
var allEnemies = [];
for (i=0; i < randomEnemies; i++) {
    var Go = new Enemy;
    Go.x = (Math.floor(Math.random()* 5)*100)
    Go.y = (Math.floor(Math.random()* 3)*75+50)
    Go.v = (Math.floor(Math.random()* 100)+1)
    allEnemies.push(Go)
}
var player = new Player;


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
