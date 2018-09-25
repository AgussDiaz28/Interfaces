let J = null;

function setEventoSimple(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(e){
        callback(e);
    });
}

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
        j1.empezarTurno();
        let dashboard = new Dashboard(6,7,290,160,'img/edashboard.png',36,36);
        J = new Juego(j1,j2,dashboard);
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
        console.log(J.movimientoGanador());
        J.cambiarTurnos();
    }else{
        J.getActivePlayer().getFichaSeleccionada().render();
        J.getActivePlayer().getFichaSeleccionada().setUnselected();
    }
    J.saveNewImageData();
}

function dragCoin(e) {
    let activePlayer = J.getActivePlayer();
    if (activePlayer != null){
        let ficha = activePlayer.getFichaSeleccionada();
        if (ficha != null && ficha.estado.selected == true ){
            let x = e.layerX - e.currentTarget.offsetLeft;
            let y = e.layerY - e.currentTarget.offsetTop;
            J.dragCoin(x,y);
        }
    }
}
