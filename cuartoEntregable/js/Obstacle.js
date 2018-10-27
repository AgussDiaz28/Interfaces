class Obstacle extends Object {

    constructor(XPosition) {
        super(0,0,20);
        this.object = $('#obstacle');
        this.object.addClass('obstacle');
        this.object.css('left',XPosition);
    }

    moveHorizontal(){
        super.moveHorizontal();
        $('.obstacle').css('left',this.x);
    }

    moveVertical(){
        super.moveVertical();
        $('.obstacle').css('top',this.y);
    }

    getLocation(){
        let pos = document.getElementById("obstacle").getBoundingClientRect();
        return {x:pos.x, y:pos.y};
    }
    
}