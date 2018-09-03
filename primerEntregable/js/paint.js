Paint = {
    lastx : 0,
    lasty : 0
};

//Funcion que dado un X e Y crea una linea con el X e Y anterior
Paint.pintar = function (x, y, r, g, b){
    if (lastx != -1){
        canvas.lineWidth = strokeSize;
        canvas.lineCap = 'round';
        canvas.strokeStyle = rgbToHex(r,g,b);
        canvas.beginPath();
        canvas.moveTo(lastx, lasty); //punto anterior
        canvas.lineTo(x, y); //punto nuevo
        canvas.stroke();
        canvas.closePath();
    }

    lastx = x;
    lasty = y;
}

//Function que cambia el color de un pixel dado un X e Y
Paint.setPixel = function l(imageData, x, y, r, g, b, a) {
    let index = (x + y * canvasWidth) * 4;
    imageData.data[index    ] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
    return imageData;
}

//Funcion que obtiene el X e Y del evento mousemove y manda el color seleccionado
Paint.pintarCanvas = function(event){
    let rgb = getSelectedColor();
    if (event.buttons == 1){
        if (eraser){
            rgb = [255,255,255];
        }
        Paint.pintar(event.layerX,event.layerY+25,rgb[0],rgb[1],rgb[2]);
    }else{
        lastx = -1;
        lasty = -1;
    }
}
