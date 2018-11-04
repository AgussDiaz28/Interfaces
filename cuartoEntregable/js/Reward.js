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
        console.log(this.elem_id+'is sparking');
        document.getElementById(this.elem_id).classList.add('sparks');
        console.log(document.getElementById(this.elem_id));
    }

}
