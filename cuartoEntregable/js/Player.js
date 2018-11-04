class Player extends SpaceObject {

    constructor(data) {
        $("#game").append('<div id="player" class="player"></div>');
        data.elem = $("#player");
        super(data);
    }

    shine(){
        $("#player").append('<div class="sparks"></div>');
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

}
