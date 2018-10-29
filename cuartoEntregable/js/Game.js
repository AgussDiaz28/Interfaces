class Game {


    constructor() {
        this.player = {};
        this.obstacles = [];
        this.rewards = [];
        this.puntaje = 0;
        this.aggregation = 10;
        this.lastObstacle = 1;
        this.lastReward = 1;
        this.stop = false;
        this.generatePlayer();
        this.generateNewObstacles(4);
        this.ObstacleWave();
        this.generateRewards();
    };

    generateRewards(){
        let interval  = setInterval(() => {
            this.generateNewRewards();
            if (this.stop){
                clearInterval(interval);
            }
        }, 5500);
    }

    ObstacleWave(){
        let interval  = setInterval(() => {
            let cant = Object.getRandomInt(2);
            this.generateNewObstacles(cant);
            if (this.stop){
                clearInterval(interval);
            }
        }, 500);
    }

    checkStatus(){
        let interval  = setInterval(() => {
            this.puntaje += this.aggregation;
            $('#score').html(this.puntaje);
            let crash = this.moveObstaclesDown();
            if (crash){
                console.log('game ended');
                clearInterval(interval);
            }
        }, 500);
    };

    generatePlayer() {
        let data = {
            x:525,
            y:475,
            height:100,
            width:100,
            movementLength:20,
            elem_id : 'player',
            elem: $('#player'),
            class: "player",
        };
        this.player = new Player(data);
    }

    generateNewRewards(){
        // let reward = new Reward({ x:0, y:0, movementLength:20,
        //     elem_id: 'reward'+this.lastReward,
        //     class: "reward",
        // });
        // this.lastReward++;
        // this.rewards.push(reward);
    }

    generateNewObstacles(cant) {
        for (let i=0;i< cant;i++){
            let obstacle = new Obstacle(
                { x:0, y:0, movementLength:20,
                    elem_id: 'obstacle'+this.lastObstacle,
                    class: "obstacle",
                });
            this.lastObstacle++;
            this.obstacles.push(obstacle);
        }
    }

    moveObstaclesDown(){
        let oneCrashed = false;
        this.obstacles.forEach(obstacle => {
            obstacle.moveDown();
            let obstacleOutOfSpace = obstacle.isOutOfSpace();
            if (obstacleOutOfSpace){
                obstacle.randomRender();
            }
            if (this.player.isTouching(obstacle.getLocation())){
                oneCrashed = true;
                obstacle.elem.addClass('explosion');
                obstacle.elem.addClass('explosion');
            }
        });
        return oneCrashed;
    };

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