class Reward extends SpaceObject{

    constructor(data) {
        $("#game").append('<div id="'+data.elem_id+'" class="'+data.class+'"></div>');
        data.elem = $("#"+data.elem_id);
        super(data);
        this.touched = false;
        this.randomRender();
    }

    erase(){
        this.elem.css('display','none');
    }

    shine(){
        this.elem.append('<div class="sparks"></div>');
        this.erase();
    }

}
