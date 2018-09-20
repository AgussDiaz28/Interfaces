function Juego(j1,j2,) {
    this.jugadorUno = j1;
    this.jugadorDos = j2;
    this.posicionTablero = { x:290, y:80 };
    this.tablero = [];
    this.tableroH = 7;
    this.tableroW = 6;
    this.dibujarTablero();
    this.llenarMatriz();
};

Juego.prototype.llenarMatriz = function(){
    for ( var y = 0; y < this.tableroH; y++ ) {
        this.tablero[ y ] = [];
        for ( var x = 0; x < this.tableroW; x++ ) {
            this.tablero[ y ][ x ] = null;
        }
    }
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
    this.loadFile('img/edashboard.png',this.posicionTablero.x,this.posicionTablero.y);

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

Juego.prototype.selectedColumn = function(x,y){
    console.log(x,y);
    let response = false;
    let columna = null;
    let i=0
    for (i;i<=7;i++){
        if ( ((this.posicionTablero.x + columna ) > (x - 80))  && ((this.posicionTablero.x + columna )  < (x + 80)) ){
            if ( ((this.posicionTablero.y + columna ) > (y - 80))  && ((this.posicionTablero.y + columna ) < (y + 80)) ){
                response = true;
                break;
            }
        }
        columna = columna + 60;
    }
    if (response){
        return i;
    }else{
        return null;
    }

};

Juego.prototype.dropCoin = function(columnNumber){
    if (columnNumber != null){
        for (var i = 0; i<=6;i++){
            console.log(this.tablero);
            if (this.tablero[i][columnNumber] == null){
                this.tablero[i][columnNumber] = this.getActivePlayer().color;
                //this.pintarFicha();
            };
        }
    }
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




