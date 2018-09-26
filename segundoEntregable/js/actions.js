let J = null;

function setEventoSimple(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(e){
        callback(e);
    });
};

setEventoSimple('start','click',startGame);
setEventoSimple('canvas','mousedown',clickCoin);
setEventoSimple('canvas','mouseup',dropCoin);
setEventoSimple('canvas','mousemove',dragCoin);

function isEmpty(q){
    return (q === null) || (q === '') || (q === 0);
}

function startGame(){
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

function clickCoin(e) {
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    let activePrayer = J.getActivePlayer();
    activePrayer.clickOwn(x,y);
    J.saveNewImageData();
}

function dropCoin(e){
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    let columnNumber = J.selectedColumn(x,y);
    if (columnNumber != null){
        J.dropCoin(columnNumber);
        if (J.movimientoGanador()){
            document.getElementById("ganador").innerHTML = "El jugador ganador fue: " + J.getActivePlayer().getName();
            setTimeout(function () {   J.reset(); },2000);

        }else{
            J.cambiarTurnos();
        }
    }else{
        J.putLastImageData();
        J.getActivePlayer().getFichaSeleccionada().renderOrigin();
        J.getActivePlayer().getFichaSeleccionada().setUnselected();
    }
    J.saveNewImageData();
}

function dragCoin(e) {
    if (J != null){
        let activePlayer = J.getActivePlayer();
        if (activePlayer != null){
            let ficha = activePlayer.getFichaSeleccionada();
            if (ficha != null && (ficha.isSelected() == true) ){
                let x = e.layerX - e.currentTarget.offsetLeft;
                let y = e.layerY - e.currentTarget.offsetTop;
                J.dragCoin(x,y);
            }
        }
    }

}
