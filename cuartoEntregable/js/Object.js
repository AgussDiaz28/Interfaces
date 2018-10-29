class Object {

    constructor(data){
        this.x = data.x;
        this.y = data.y;
        this.height = data.height;
        this.width = data.width;
        this.defaultMovement = data.movementLength;
        this.elem_id = data.elem_id;
        this.elem = data.elem;
        this.class = data.class;
        this.elem.addClass(this.class);
        this.limit = {minX: 0, maxX:600, minY:0, maxY:950 };
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

    moveVertical(){
        this.elem.css('top',this.y);
    }

    moveHorizontal(){
        this.elem.css('left',this.x);
    }

    getLocation(){
        let pos = document.getElementById(this.elem_id).getBoundingClientRect();
        return {x:pos.x, y:pos.y};
    }

    static getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    };

    isOutOfSpace(){
        let pos = this.getLocation();
        if  (pos.x.between(this.limit.minX,this.limit.maxX)){
            if  (pos.y.between(this.limit.minY,this.limit.maxY)){
                return false;
            }
        }
        return true;
    }
}