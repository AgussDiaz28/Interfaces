function Rectangulo() {
    this.x = 44;
    this.y = 44;
    this.height = 254;
    this.width = 254;
    this.color = 'white';
}

Rectangulo.prototype.dibujar = function () {
    let ctx = $('canvas');
    ctx = ctx[0].getContext('2d');
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.rect(this.x,this.y,this.height,this.width,);
    ctx.fill();
    ctx.closePath();
};

Rectangulo.prototype.dibujarContorno = function () {
    let ctx = $('canvas');
    ctx = ctx[0].getContext('2d');
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.height,this.width);
    ctx.lineWidth = 5;
    ctx.fillStyle = 'black';
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
};
