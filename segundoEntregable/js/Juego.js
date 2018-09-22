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
    console.log(x,y);
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
    console.log(ficha);
    ficha.x = x;
    ficha.y = y;
    ficha.render();
};

//Funcion que recibe un la fila y columna que se uso para llenar la matrix y devuelve en que posicion del canvas hay
// que llenar
Juego.prototype.getPositionXY = function(i,j){
    let size = { height:this.dashboard.getHeight() , width:this.dashboard.getWidth() };
    if (i != 0){
        for (var x = 0; x<= i;x++){
            size.height = size.height + this.dashboard.getHeight();
        }
    }
    if ( j != 0){
        for (var y = 0; y<= j;y++){
            size.width = size.width + this.dashboard.getWidth();
        }
    }
    return {x:size.width,y:size.height}

}

Juego.prototype.dropCoin = function(columna){
    let fila = this.dashboard.getCantFilas() - 1;
    if (columna != null) {
        for (fila; fila>=0;fila--){
            console.log(fila);
            if (this.tablero[fila][columna] == null) {
                this.tablero[fila][columna] = this.getActivePlayer().color;
                var ficha = this.getActivePlayer().getFichaSeleccionada();
                let position = this.getPositionXY(fila,columna);
                console.log(position);
                this.pintarFicha(ficha,position.x,position.y);
                break
            }
        }
        this.cambiarTurnos();
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




