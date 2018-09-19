function Jugador() {
    this.name = "Jane Doe";
    this.active = false;
    this.color = 'red'
};

function Jugador(name,color) {
    this.name = name;
    this.active = false;
    this.color = color;
};

Jugador.prototype.empezarTurno = function (){
    this.active = true;
    this.mensaje();
};

Jugador.prototype.finalizaTurno = function (){
    this.active = false;
};

Jugador.prototype.cambiarTurno = function(){
    if (this.active){
        this.finalizaTurno();
    } else{
        this.empezarTurno();
    }
};

Jugador.prototype.moverFicha = function () {
     ij = {
            i: 3,
            j: 3,
            color: this.color
    };
    return ij;
}

Jugador.prototype.mensaje = function () {
    alert('Es el turno del Jugador: '+this.name);
};
