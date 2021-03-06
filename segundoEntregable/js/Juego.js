function Juego(j1,j2) {
    this.jugadorUno = j1;
    this.jugadorDos = j2;
    this.tablero = [];
    this.dashboard = null;
    this.init();
};

Juego.prototype.init = function(){
    this.dashboard = new Dashboard(6,7,300,140,'img/edashboard.png',36,36);;
    this.llenarMatriz();
    this.dashboard.saveNewImageData();
    this.jugadorUno.empezarTurno();
};

Juego.prototype.saveNewImageData = function() {
    this.dashboard.saveNewImageData();
};

Juego.prototype.llenarMatriz = function(){
    for ( var y = 0; y < this.dashboard.getCantFilas(); y++ ) {
        this.tablero[ y ] = [];
        for ( var x = 0; x < this.dashboard.getCantColumnas(); x++ ) {
            this.tablero[ y ][ x ] = null;
        }
    }
};

Juego.prototype.getActivePlayer = function(){
    if (this.jugadorUno.active){
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
    let response = false;
    let size = {height:this.dashboard.getHeight() , width:this.dashboard.getWidth()};
    let i = 0;
    if (y < this.dashboard.getY() && x > this.dashboard.getX()){
        for (i;i<=7;i++){
            let lowestX = x - size.width;
            let highestX = x + size.width;
                if ( ((this.dashboard.getX() + size.width ) > ( lowestX )) && ((this.dashboard.getX() - size.width )  < ( highestX )) ){
                    response = true;
                    break;
                }
            size.width = size.width + this.dashboard.getHeight();
        }
    }
    if (response){
        return i;
    }else{
        return null;
    }

};

Juego.prototype.pintarFicha = function(ficha,x,y){
    if (ficha != null){
        ficha.x = x;
        ficha.y = y;
        ficha.render();
    }
};

//Funcion que recibe un la fila y columna que se uso para llenar la matrix y devuelve en que posicion del canvas hay
// que llenar
Juego.prototype.getPositionXY = function(fila,columna){
    let heightDashboard  = this.dashboard.getHeight();
    let widthDashboard    = this.dashboard.getWidth();
    let newX = this.dashboard.xPosition - this.dashboard.getHeight() - 40;
    let newY = this.dashboard.yPosition - this.dashboard.getHeight() - 28;
    for (var x = 0; x<= fila;x++){
        newY = newY + widthDashboard+ widthDashboard ;
    }
    for (var y = 0; y<= columna;y++){
        newX = newX + heightDashboard + heightDashboard;
    }

    return {    x: newX , y: newY };
};

Juego.prototype.dropCoin = function(columna){
    let fila = this.dashboard.getCantFilas() - 1;
    if (columna != null) {
        for (fila; fila>=0;fila--){
            if (this.tablero[fila][columna] == null) {
                let ficha = this.getActivePlayer().getFichaSeleccionada();
                if (ficha != null){
                    let position = this.getPositionXY(fila,columna);
                    this.putLastImageData();
                    this.pintarFicha(ficha,position.x,position.y);
                    ficha.setUsed();
                    ficha.setUnselected();
                    this.tablero[fila][columna] = this.getActivePlayer().color;
                }
                break
            }
        }
    }
};

Juego.prototype.movimientoGanador = function(color){
    return this.checkRowsHorizontal() || this.checkRowsVertical() || this.checkRowsDiagonal(color);
};

Juego.prototype.checkRowsHorizontal = function(){
    let cantFilas = this.dashboard.getCantFilas() - 1;
    let cantColumnas = this.dashboard.getCantColumnas() - 1 ;
    let lastState = null;
    let secuence = [];
    for (var j = cantColumnas ; j>= 0;j--){
        for (var i = cantFilas ; i>= 0;i--){
            let celdaActual = this.tablero[i][j];
            if ( (lastState == celdaActual) && lastState != null){
                secuence.push(celdaActual) ;
                if (secuence.length == 4){
                    return true;
                }
            }else{
                lastState = celdaActual;
                secuence = [];
                secuence.push(celdaActual) ;
            }
        }
        secuence = [];
    }
    return false;
};

Juego.prototype.checkRowsVertical = function(){
    let cantFilas = this.dashboard.getCantFilas() - 1;
    let cantColumnas = this.dashboard.getCantColumnas() - 1 ;
    let lastState = null;
    let secuence = [];
    for (var i = cantFilas ; i>= 0;i--){
        for (var j = cantColumnas ; j>= 0;j--){
            let celdaActual = this.tablero[i][j];
            if ( (lastState == celdaActual) && lastState != null){
                secuence.push(celdaActual) ;
                if (secuence.length == 4){
                    return true;
                }
            }else{
                lastState = celdaActual;
                secuence = [];
                secuence.push(celdaActual) ;
            }
        }
        secuence = [];
    }
    return false;
};

Juego.prototype.checkMainDiagonal = function (color) {
    for (let x = this.tablero.length-1; x >=0; x--) {
        for (let y = 0; y < this.tablero[x].length-2; y++) {
            if ((this.tablero[x][y] === color) && (y+3 < this.tablero[x].length) && (x-3 >= 0)){
                if ((this.tablero[x-1][y+1] === color) && (this.tablero[x-2][y+2] === color) && (this.tablero[x-3][y+3] === color)){
                    return true;
                }
            }
        }
    }
    return false;
};

Juego.prototype.verificarDiagonalSecundaria = function (color){
    for (let x = 0; x < this.tablero.length; x++) {
        for (let y = 0; y < this.tablero[x].length-2; y++) {
            if ((this.tablero[x][y] === color) && (y+3 < this.tablero[x].length) && (x+3 < this.tablero.length)){
                if ((this.tablero[x+1][y+1] === color) && (this.tablero[x+2][y+2] === color) && (this.tablero[x+3][y+3] === color)){
                    return true;
                }
            }
        }
    }
    return false;
};

Juego.prototype.checkRowsDiagonal = function(color){
    return this.checkMainDiagonal(color) || this.verificarDiagonalSecundaria(color) ;
};

Juego.prototype.cleanCanvas =function() {
    document.getElementById("canvas").getContext("2d").clearRect(0, 0, 1100, 750);
};

Juego.prototype.putLastImageData = function(){
    this.cleanCanvas();
    document.getElementById("canvas").getContext("2d").putImageData(this.dashboard.imageData, 0, 0);
};

Juego.prototype.dragCoin = function(x,y){
    this.putLastImageData();
    let activeCoin = this.getActivePlayer().getFichaSeleccionada();
    activeCoin.x = x;
    activeCoin.y = y;
    activeCoin.render();
};


Juego.prototype.reset = function () {
    this.cleanCanvas();
    this.jugadorUno.reset();
    this.jugadorDos.reset();
    this.init();
    document.getElementById("ganador").innerHTML = "";
    document.getElementById("labelActivePlayer").innerHTML = "Turno del Jugador: ";
};
