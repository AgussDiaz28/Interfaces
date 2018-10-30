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
        this.limit = {minX: -20, maxX:630, minY:-20, maxY:520 };
    }

    moveRight(){
        if ((this.x < this.limit.maxX)){
            this.x += this.defaultMovement;
            this.moveHorizontal();
        }
    }

    moveLeft(){
        if ((this.x > this.limit.minX)) {
            this.x -= this.defaultMovement;
            this.moveHorizontal();
        }
    }

    moveUp(){
        if ((this.y < this.limit.maxY) ){
            this.y -= this.defaultMovement;
            this.moveVertical();
        }

    }

    moveDown(){
        if ((this.y > this.limit.minY)){
            this.y += this.defaultMovement;
            this.moveVertical();
        }
    }

    moveVertical(){
        if ( (this.y < this.limit.maxY) && (this.y > this.limit.minY) ){
            this.elem.css('top',this.y);
        }
    }

    moveHorizontal(){
        if ( (this.x < this.limit.maxX) && (this.x > this.limit.minX) ){
            this.elem.css('left',this.x);
        }
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

    randomRender(){
        this.elem.addClass(this.class);
        let newX = Object.getRandomInt(650);
        this.elem.css('left',newX);
    }

}