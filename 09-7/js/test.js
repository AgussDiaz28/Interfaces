setEventoSimple('show','click',changeBackgroud,value = { x:140, y:140, radio:60, color:'red' });

function changeBackgroud(value) {
    let r = new Rectangulo();
    r.dibujar();
    r.dibujarContorno();
    let c = new Circulo(value.x,value.y,value.radio,value.color);
    c.dibujar();
    c.dibujarContorno();


}

function setEventoSimple(eventoID,listener,callback,value){
    document.getElementById(eventoID).addEventListener(listener,function(){
        callback(value);
    });
}
