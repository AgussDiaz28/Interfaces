class Object {

    constructor(x,y,movement){
        this.x = x;
        this.y = y;
        this.defaultMovement = movement;
    }

    moveRight(){
        this.x += this.defaultMovement;
        this.moveHorizontal();
    }

    moveLeft(){
        this.x -= this.defaultMovement;
        this.moveHorizontal();
    }

    moveUp(){
        this.y -= this.defaultMovement;
        this.moveVertical();
    }

    moveDown(){
        this.y += this.defaultMovement;
        this.moveVertical();
    }

    getLocation(){

    }

    moveVertical(){
        this.getLocation();
    }

    moveHorizontal(){
        this.getLocation();
    }
}