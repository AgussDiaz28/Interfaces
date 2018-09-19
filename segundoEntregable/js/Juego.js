function Juego(j1,j2,) {
    this.jugadorUno = j1;
    this.jugadorDos = j2;
    this.tablero = [6][7];
    this.dibujarTablero();
};

Juego.prototype.loadFile = function(filePath,x,y){
    let canvas = document.getElementById("canvas").getContext("2d");
    let image = new Image();
    image.src = filePath;

    image.onload = function(){
        canvas.drawImage(image, x, y);
    };

};

Juego.prototype.dibujarTablero = function(){
    this.loadFile('img/edashboard.png',290,80);

};

Juego.prototype.continuarJugando = function(){
    return false;
};

Juego.prototype.getActivePlayer = function(){
    if (this.jugadorUno){
        return this.jugadorUno;
    }else{
        return this.jugadorDos;
    }
};

Juego.prototype.cambiarTurnos = function(){
    this.jugadorUno.cambiarTurno();
    this.jugadorDos.cambiarTurno();
};

Juego.prototype.movimientoGanador = function(){
    let width = 7;
    let height = 6;
    for (var i = height; i <= 0; i-- ){
        for (var j = width; j <= 0; j-- ){

        }
    }
};

Juego.prototype.addMovement = function(coordenadas){
    this.tablero[coordenadas.i][coordenadas.j] = coordenadas.color;
};




