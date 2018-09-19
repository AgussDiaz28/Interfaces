let tablero= new Dashboard();

function setEventoSimple(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(e){
        callback(e);
    });
}

function isEmpty(q){
    return (q === null) || (q === '') || (q === 0);
}

function startGame(e){
    let nombreJugadorUno = $('#namep1').val();
    let nombreJugadorDos = $('#namep2').val();
    if (!isEmpty(nombreJugadorUno) && !isEmpty(nombreJugadorDos) ){
        let j1 = new Jugador(nombreJugadorUno,'red');
        let j2 = new Jugador(nombreJugadorDos,'yelow');
        Juego = new Juego(j1,j2);
    }else{
        alert('Ingrese el nombre de jugador')
    }
}

function moverFicha(e) {

    let x = e.screenX;
    let y = e.screenY;
    console.log(x);
    console.log(y);
    // if ( tablero.clickCercaFicha(x,y) ){
    //     alert('hi');
    //     //tablero.levantarFicha();
    // }
    if ( tablero.clickCercaColumna(x,y) != null ){
        alert('hi');
        //tablero.levantarFicha();
    }
}
