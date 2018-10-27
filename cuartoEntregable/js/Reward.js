class Reward extends Object{

    constructor() {
        super(0,0,30);
        $('#reward').addClass('reward');
    }

    moveHorizontal(){
        super.moveHorizontal();
        $('.reward').css('left',this.x);
    }

    moveVertical(){
        super.moveVertical();
        $('.reward').css('top',this.y);
    }

    getLocation(){
        let pos = document.getElementById("reward").getBoundingClientRect();
        return {x:pos.x, y:pos.y};
    }

}