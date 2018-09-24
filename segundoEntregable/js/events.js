setEventoSimple('start','click',startGame);
setEventoSimple('canvas','mousedown',clickFicha);
setEventoSimple('canvas','mouseup',dropCoin);
setEventoSimple('canvas','mousemove',function (e) {
    let activePlayer = J.getActivePlayer();
    if (activePlayer != null){
        let ficha = activePlayer.getFichaSeleccionada();
        if (ficha != null && ficha.estado.selected == true ){
            let x = e.layerX - e.currentTarget.offsetLeft;
            let y = e.layerY - e.currentTarget.offsetTop;
            J.dragCoin(x,y);
        }
    }
});
