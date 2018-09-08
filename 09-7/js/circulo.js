function Circulo() {
    this.x = 144;
    this.y = 144;
    this.radio = 54;
    this.color = 'red';
}

function Circulo(x,y,radio,color) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.color = color;
}

Circulo.prototype.mensaje = function () {
    alert('hola');
}

Circulo.prototype.dibujar = function () {
    let ctx = $('canvas');
    ctx = ctx[0].getContext('2d');
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.arc(this.x,this.y,this.radio,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
};

Circulo.prototype.dibujarContorno = function () {
    let ctx = $('canvas');
    ctx = ctx[0].getContext('2d');
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radio,0,Math.PI*2);
    ctx.lineWidth = 10;
    ctx.fillStyle = this.color;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
};
