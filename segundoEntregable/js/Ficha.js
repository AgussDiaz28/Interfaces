function Ficha(x,y,radio,img) {
    this.x = x;
    this.y = y;
    this.xOrigin = x;
    this.yOrigin = y;
    this.radio = radio;
    this.img = img;
    this.estado = { selected:false, used:false };
    this.render();
};

Ficha.prototype.clicked = function(x,y){
    let response = false;
    if (!this.inUse()){
        if ( (this.x > (x - this.radio))  && (this.x < (x + this.radio)) ){
            if ( (this.y > (y - this.radio))  && (this.y < (y + this.radio)) ){
                this.setSelected();
                response = true;
                this.errase();
            }
        }
    }
    return response;
};

Ficha.prototype.renderOrigin = function(){
    this.setUnselected();
    this.estado.used = false;
    let canvas = document.getElementById("canvas").getContext("2d");
    canvas.drawImage(this.img, this.xOrigin, this.yOrigin);

};

Ficha.prototype.render = function () {
    let canvas = document.getElementById("canvas").getContext("2d");
    canvas.drawImage(this.img, this.x, this.y);
};

Ficha.prototype.errase = function(){
    if (!this.inUse()){
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.arc(this.x + 30 , this.y  + 30 , this.radio /2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.globalCompositeOperation = "source-over";
    }
};

Ficha.prototype.inUse = function(){
  return this.estado.used;
};

Ficha.prototype.setUsed = function(){
  this.estado.used = true;
};

Ficha.prototype.isSelected = function(){
    return this.estado.selected;
};

Ficha.prototype.setUnselected = function () {
    this.estado.selected = false;
};

Ficha.prototype.setSelected = function () {
    this.estado.selected = true;
}
