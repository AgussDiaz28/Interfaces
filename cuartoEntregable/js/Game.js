class Game {

    constructor() {
        this.player = new Player();
        this.obstacle = new Obstacle(Game.getRandomInt(220));
        this.reward = new Reward();
        this.puntaje = 0;
        this.aggregation = 10;
        // this.obstacles = [new Obstacle(),new Obstacle(), new Obstacle()];
        // this.rewards = [new Reward(),new Reward(), new Reward()];
    }

    static getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    };

    checkStatus(){
        let interval  = setInterval(() => {
            this.puntaje += this.aggregation;
            $('#puntaje').html(this.puntaje);
            this.moveObstacleDown();
            let crash = this.player.isTouching(this.obstacle.getLocation());
            if (crash){
                console.log('crash');
                clearInterval(interval);
            }
            console.log('checking...');
        }, 500);
    }

    moveObstacleDown(){
        this.obstacle.moveDown();
    }

    movePlayerLeft(){
        this.player.moveLeft();
    }
    movePlayerRight(){
        this.player.moveRight();
    }
    movePlayerUp(){
        this.player.moveUp();
    }
    movePlayerDown(){
        this.player.moveDown();
    }

}