class Game {

    constructor() {
        this.player = {};
        this.intervals = [];
        this.obstacles = [];
        this.rewards = [];
        this.puntaje = 0;
        this.cantNewObjects = 2;
        this.aggregation = 5;
        this.lastObstacle = 1;
        this.lastReward = 1;
        this.stop = false;
        this.keyCodes = { 37:"movePlayerLeft", 39:"movePlayerRight" , 40:"movePlayerDown", 38:"movePlayerUp"} ;
        this.keyPressed = {   37 : false , 39 : false , 40 : false, 38 : false  };
    };

    stopPlayer(eventKey){
        if (this.keyExist(eventKey)) {
            this.keyPressed[eventKey] = false;
        }
    }

    cleanIntervals (){
        this.intervals.forEach(elem => {
            clearInterval(elem);
        })
    }

    keyExist(eventKey){
        for (let key in this.keyCodes) {
            if (parseInt(key) === eventKey) {
                return true;
            }
        }
    }

    moveWithInterval(eventKey){
        let interval = setInterval(() => {
            if (this.keyPressed[eventKey]){
                this[this.keyCodes[eventKey]]();
            }else{
                clearInterval(interval);
            }
        }, 20);
    }

    movePlayer(eventKey){
        if (this.keyExist(eventKey)) {
            this.keyPressed[eventKey] = true;
            this.moveWithInterval(eventKey);
        }
    }

    startGame(){
        this.puntaje = 0;
        this.cantNewObjects = 2;
        $('#score').html(this.puntaje);
        $('#gameOver').remove();
        $('#player').remove();
        $('.reward').css('display','none');
        $( document ).unbind();
        $('.obstacle').css('display','none');
        this.generatePlayer();
        this.checkStatus();
        this.generateNewObstacles(4);
        this.ObstacleWave();
        this.generateRewards();
        this.stop = false;
        $('#game').addClass('game-bg-animation ');
    }

    checkRewards(){
        let oneCrashed = false;
        this.rewards.forEach(reward => {
            if (this.player.isTouching(reward.getLocation())){
                if (!reward.touched) {
                    reward.touched = true;
                    this.player.shine();
                    reward.shine();
                    this.puntaje += 100;
                    $('#score').html(this.puntaje);
                    $('#score').addClass('color');
                }
            }
        });
        return oneCrashed;
    }

    generateRewards(){
        let interval  = setInterval(() => {
            if (!this.stop){
                this.generateNewRewards();
            }else{
                clearInterval(interval);
            }
        }, 5500);
        this.intervals.push(interval);
    }

    ObstacleWave(){
        let interval  = setInterval(() => {
            this.puntaje += this.aggregation;
            $('#score').html(this.puntaje);
            $('#score').removeClass('color');
            if (!this.stop){
                let cant = SpaceObject.getRandomInt(this.cantNewObjects);
                this.cantNewObjects = this.cantNewObjects * 1.019;
                this.generateNewObstacles(cant);
            }else {
                clearInterval(interval);
            }
        }, 1000);
        this.intervals.push(interval);
    }

    checkStatus(){
        let interval  = setInterval(() => {
            this.checkRewards();
            let crash = this.checkObstacles();
            if (crash){
                this.stop = true;
                this.rewards = [];
                this.obstacles = [];
                $('#game').removeClass('game-bg-animation ');
                let game_over = "<h1 id='gameOver' class='gameOver'>Game Over!!</h1>";
                $("#game").append(game_over);
                this.cleanIntervals();
            }
        }, 25/10000);
        this.intervals.push(interval);
    };

    generatePlayer() {
        let data = {x:310,  y:475, height:85, width:85,
            movementLength:8, elem_id : 'player', class: "player",
        };
        this.player = new Player(data);
    }

    generateNewRewards(){
        let reward = new Reward({ x:0, y:0, height:105, width:105,
            movementLength:20,
            elem_id: 'reward'+this.lastReward,
            class: "reward",
        });
        this.lastReward++;
        this.rewards.push(reward);
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

    checkObstacles(){
        let oneCrashed = false;
        this.obstacles.forEach(obstacle => {
            if (this.player.isTouching(obstacle.getLocation())){
                oneCrashed = true;
                this.player.elem.addClass('explosion');
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