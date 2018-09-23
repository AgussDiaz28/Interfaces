function Juego(j1,j2,dashboard) {
    this.jugadorUno = j1;
    this.jugadorDos = j2;
    this.tablero = [];
    this.dashboard = dashboard;
    this.llenarMatriz();
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
    for (i;i<=7;i++){
        let lowestX = x - size.width;
        let highestX = x + size.width;
        if ( ((this.dashboard.getX() + size.width ) > ( lowestX )) && ((this.dashboard.getX() - size.width )  < ( highestX )) ){
                response = true;
                break;
        }
        size.width = size.width + this.dashboard.getHeight();
    }
    if (response){
        return i;
    }else{
        return null;
    }

};

Juego.prototype.pintarFicha = function(ficha,x,y){
    ficha.x = x;
    ficha.y = y;
    ficha.render();
};

//Funcion que recibe un la fila y columna que se uso para llenar la matrix y devuelve en que posicion del canvas hay
// que llenar
Juego.prototype.getPositionXY = function(fila,columna){
    let heightDashboard  = this.dashboard.getHeight();
    let widthDashboard    = this.dashboard.getWidth();
    let newX = this.dashboard.xPosition;
    let newY = this.dashboard.yPosition;
    if (fila != 0){
        for (var x = 0; x<= fila;x++){
            newY = newY + heightDashboard;
        }
    }
    if ( columna != 0){
        for (var y = 0; y<= columna;y++){
            newX = newX + widthDashboard;

        }
    }
    return {    x: newX , y: newY };

}

Juego.prototype.dropCoin = function(columna){
    let fila = this.dashboard.getCantFilas() - 1;
    if (columna != null) {
        for (fila; fila>=0;fila--){
            if (this.tablero[fila][columna] == null) {
                this.tablero[fila][columna] = this.getActivePlayer().color;
                var ficha = this.getActivePlayer().getFichaSeleccionada();
                let position = this.getPositionXY(fila,columna);
                this.pintarFicha(ficha,position.x,position.y);
                break
            }
        }
        this.cambiarTurnos();
    }
};

Juego.prototype.movimientoGanador = function(){
    return this.checkRowsHorizontal() || this.checkRowsVertical() || this.checkRowsDiagonal();
};

Juego.prototype.checkRowsHorizontal = function(){
    let cantFilas = this.dashboard.getCantFilas() - 1;
    let cantColumnas = this.dashboard.getCantColumnas() - 1 ;
    let lastState = null;
    let secuence = [];
    for (var j = cantColumnas ; j>= 0;j--){
        for (var i = cantFilas ; i>= 0;i--){
            if (lastState != this.tablero[i][j] && this.tablero[i][j] != null){
                lastState = this.tablero[i][j];
                secuence = [];
            }
            if ((lastState == this.tablero[i][j] ) && lastState != null){
                secuence.push(this.tablero[i][j]) ;
                if (secuence.length == 4){
                    return true;
                }
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
            if (lastState != this.tablero[i][j] && this.tablero[i][j] != null){
                lastState = this.tablero[i][j];
                secuence = [];
            }
            if ((lastState == this.tablero[i][j] ) && lastState != null){
                secuence.push(this.tablero[i][j]) ;
                if (secuence.length == 4){
                    return true;
                }
            }
        }
        secuence = [];
    }
    return false;
};

Juego.prototype.checkRowsDiagonal = function(){
    return false;
};





