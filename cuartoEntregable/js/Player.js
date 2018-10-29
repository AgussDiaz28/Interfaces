class Player extends Object {

    constructor(data) {
        super(data);
    }

    isTouching(objectPosition){
        let myPosition = this.getLocation();
        if (objectPosition.x.between(myPosition.x-this.width,myPosition.x+this.width) ){
            if (objectPosition.y.between(myPosition.y-this.height,myPosition.y+this.height) ){
                return true;
            }
        }
        return false;
    }

    moveRight(){
        super.moveRight();
        this.elem.removeClass('left');
        this.elem.addClass('right')
    }

    moveLeft(){
        super.moveLeft();
        this.elem.removeClass('right');
        this.elem.addClass('left')
    }

}