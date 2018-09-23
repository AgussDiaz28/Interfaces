function Ficha(x,y,radio,img) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.img = img;
    this.estado = { selected:false, used:false };
    this.render();
};

Ficha.prototype.clicked = function(x,y){
    let response = false;
    if ( (this.x > (x - this.radio))  && (this.x < (x + this.radio)) ){
        if ( (this.y > (y - this.radio))  && (this.y < (y + this.radio)) ){
            response = true;
            this.errase();
        }
    }
    return response;
};

Ficha.prototype.render = function () {
    let canvas = document.getElementById("canvas").getContext("2d");
    canvas.drawImage(this.img, this.x, this.y);
};

Ficha.prototype.errase = function(){
        let c = document.getElementById('canvas');
        let ctx = document.getElementById('canvas').getContext('2d');
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.arc(this.x + 40 , this.y  + 40 , this.radio /2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.globalCompositeOperation = "source-over";
};

Ficha.prototype.isSelected = function(){
  return this.estado.selected;
};

Ficha.prototype.wasUsed = function(){
  return this.estado.used;
};

Ficha.prototype.setUnselected = function () {
    this.estado.selected = false;
};

Ficha.prototype.setSelected = function () {
    this.estado.selected = true;
}

Ficha.prototype.setUsed = function () {
    this.estado.selected = true;
}
