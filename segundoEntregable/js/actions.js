let J = null;

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
        J = new Juego(j1,j2);
    }else{
        alert('Ingrese el nombre de jugador')
    }
}

function moverFicha(e) {
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    let activePrayer = J.getActivePlayer();
    // let response = activePrayer.clickOwn(x,y);
    let columNomber = J.selectedColumn(x,y);
    console.log(columNomber);
    J.dropCoin(columNomber);



}
