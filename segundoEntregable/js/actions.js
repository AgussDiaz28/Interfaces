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

        let dashboard = new Dashboard(6,7,290,80,'img/edashboard.png',40,40);
        J = new Juego(j1,j2,dashboard);
    }else{
        alert('Ingrese el nombre de jugador')
    }
}

function clickFicha(e) {
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    console.log(x,y);
    let activePrayer = J.getActivePlayer();
    let response = activePrayer.clickOwn(x,y);
    if (response){
       // J.dragCoin(x,y);
    }
}

function dropCoin(e){
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    let columnNumber = J.selectedColumn(x,y);
    if (columnNumber != null){
        J.dropCoin(columnNumber);
        console.log(J.movimientoGanador());
    }else{
        J.getActivePlayer().getFichaSeleccionada().setUnselected();
    }

}
