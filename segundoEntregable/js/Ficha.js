function Ficha(x,y,radio,img) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.img = img;
    this.estado = { selected:false, used:false };
    this.render();
};

Ficha.prototype.clicked = function(x,y){
    console.log(x,y);
    let response = false;
    if ( (this.x > (x - this.radio))  && (this.x < (x + this.radio)) ){
        if ( (this.y > (y - this.radio))  && (this.y < (y + this.radio)) ){
            response = true;
        }
    }
    return response;
};

Ficha.prototype.render = function () {
    let canvas = document.getElementById("canvas").getContext("2d");
    canvas.drawImage(this.img, this.x, this.y);
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
