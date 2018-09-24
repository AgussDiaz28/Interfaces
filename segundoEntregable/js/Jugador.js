function Jugador(name,color) {
    this.name = name;
    this.active = false;
    this.color = color;
    this.fichas = null;
    this.image = null;
    this.loadImg();
};

Jugador.prototype.getName = function(){
    return this.name;
}

Jugador.prototype.setImagePath = function () {
    if (this.color == 'red'){
        this.image.src = 'img/sfr.png';
        this.position = 0;
    }else{
        this.image.src = 'img/sfa.png';
        this.position = 950;
    }
};

Jugador.prototype.loadImg = function(){
    this.image = new Image();
    this.setImagePath();
    let player = this;
    this.image.onload = function () {
        player.crearFichas();
    };
};

Jugador.prototype.crearFichas = function () {
    let pos = 0;
    let ficha = [];
    for (var i=0;i<8;i++){
        let f = new Ficha(this.position,pos,90,this.image);
        pos = pos + 90;
        ficha.push(f);
    }
    pos = 0;
    for (var i=0;i<8;i++){
        let f = new Ficha(this.position+90,pos,90,this.image);
        pos = pos + 90;
        ficha.push(f);
    }
    this.fichas = ficha;
};

Jugador.prototype.empezarTurno = function (){
    this.active = true;
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

Jugador.prototype.clickOwn = function (x,y) {
    let fichasPropias = this.fichas;
    let size = fichasPropias.length;
    for (var i=0;i<size;i++){
        if (fichasPropias[i].clicked(x,y) && !(fichasPropias[i].wasUsed())){
            fichasPropias[i].setSelected();
            return true;
        }
    }
    return false;
};

Jugador.prototype.getFichaSeleccionada = function (x,y) {
    let fichasPropias = this.fichas;
    let size = fichasPropias.length;
    for (var i=0;i<size;i++){
        if (fichasPropias[i].isSelected()){
            return fichasPropias[i];
        }
    }
    return null;
};
