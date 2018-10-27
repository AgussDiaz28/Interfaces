class Player extends Object {

    constructor() {
        super(0,500,20);
        $('#player').addClass('player');
    }

    moveHorizontal(){
        super.moveHorizontal();
        $('.player').css('left',this.x);
    }

    moveVertical(){
        super.moveVertical();
        $('.player').css('top',this.y);
    }

    getLocation(){
        let pos = document.getElementById("player").getBoundingClientRect();
        return {x:pos.x, y:pos.y};
    }

    isTouching(objectPosition){
        let myPosition = this.getLocation();
        console.log(myPosition);
        console.log(objectPosition);
        if (objectPosition.x.between(myPosition.x-100,myPosition.x+100) ){
            if (objectPosition.y.between(myPosition.y-100,myPosition.y+100) ){
                return true;
            }
        }
        return false;
    }
}