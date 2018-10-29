class Obstacle extends Object {


    constructor(data) {
        $("#game").append('<div id="'+data.elem_id+'" class="'+data.class+'"></div>');
        data.elem = $("#"+data.elem_id);
        super(data);
        this.randomRender();
    }

    randomRender(){
        this.elem.addClass(this.class);
        let newX = Object.getRandomInt(3500);
        this.elem.css('left',newX);
    }
    
}