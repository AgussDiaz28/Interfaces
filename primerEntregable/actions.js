let canvas = document.getElementById("canvas").getContext("2d");
let canvasContainer = document.getElementById("canvas");
let image = new Image();
let imageData = canvas.getImageData(0,0,1150,700);
let rgb = [0,0,0];
let strokeSize = 5;
let eraser = false;
let canvasWidth = 1150;
let canvasHeight = 700;
let lastx = 0,
    lasty = 0;

//Inicializacion de Sliders
let brightnessSlider = document.getElementById("brightness");
let brightnessOutput = document.getElementById("bvalue");
brightnessOutput.innerHTML = brightnessSlider.value;

let saturationSlider = document.getElementById("saturation");
let saturationOutput = document.getElementById("svalue");
saturationOutput.innerHTML = saturationSlider.value;

let thicknessSlider = document.getElementById("pencilThickness");
let thicknessOutput = document.getElementById("tvalue");
thicknessOutput.innerHTML = thicknessSlider.value;

brightnessSlider.oninput = function() {
    brightnessOutput.innerHTML = this.value;
}

saturationSlider.oninput = function() {
    saturationOutput.innerHTML = this.value;
}

thicknessSlider.oninput = function() {
    thicknessOutput.innerHTML = this.value;
}

function setWidth(height,width) {
    canvasContainer.width = width;
    canvasContainer.height = height;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return [r,g,b];

}

function getPixel(imageData,x,y){
    let  pixel = [0,0,0,0];
    if (x > 0 || y > 0){
        if (x < canvasWidth || y < canvasHeight ){
            let index = (x+y*canvasWidth) * 4;
            let r = imageData.data[index];
            let g = imageData.data[index];
            let b = imageData.data[index];
            let a = imageData.data[index];
            pixel = [r,g,b,a];
        }
    }
    return pixel;
}

function sumarPixeles(val,aux) {
    val[0] = val[0] + aux[0];
    val[1] = val[0] + aux[1];
    val[2] = val[0] + aux[2];
    val[3] = val[0] + aux[3];
    return val;
}

function gussianBlur(imageData,radio) {
    let cont = 0;
    let aux = [0,0,0,0];
    let val = [0,0,0,0];
    for (i=0;i<canvasHeight;i++){
        for (j=0;j<canvasWidth;j++){
            // Recorrido normal de matriz
            let val = [0,0,0,0];
            for (k=-radio;k<radio;k++){
                for (t=-radio;t<radio;t++) {
                    cont++;
                    //Recorrido de nodos dependiendo del radio
                    aux = getPixel(imageData,x+t,y+j);
                    val = sumarPixeles(val,aux);
                    //Procesar el valor
                }
            }
            aux = [0,0,0,0];
            let r = val[0]/cont;
            let g = val[1]/cont;
            let b = val[2]/cont;
            let a = val[3]/cont;
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
    canvas.putImageData(imageData, 0, 0);
    alert('termino el blur');
}

function applyBlackAndWhiteFilter(imageData){
    for (let i = 0; i < imageData.data.length; i+=4) {
        let promedio = ((imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3);
        promedio = Math.floor(promedio);
        imageData.data[i]       = promedio;
        imageData.data[i + 1]   = promedio;
        imageData.data[i + 2]   = promedio;
    }
}

function increaseBrigthness(imageData,amount){
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       += amount;
        imageData.data[i + 1]   += amount;
        imageData.data[i + 2]   += amount;
    }
}

function increaseSaturation(imageData,amount){
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       = imageData.data[i] + amount;
        imageData.data[i + 1]   = imageData.data[i+1] + amount;
        imageData.data[i + 2]   = imageData.data[i+2] + amount;
    }
}

function binarizacion(imageData){
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       = (imageData.data[i]/2 > 127 )? 255 : 0;
        imageData.data[i + 1]   = (imageData.data[i]/2 > 127 )? 255 : 0;
        imageData.data[i + 2]   = (imageData.data[i]/2 > 127 )? 255 : 0;
    }
}

function invert(imageData){
    console.log(imageData.data);
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       =  255 - imageData.data[i]   ;
        imageData.data[i + 1]   =  255 - imageData.data[i+1] ;
        imageData.data[i + 2]   =  255 - imageData.data[i+2] ;
    }
}

function sepia(imageData){
    for (let i = 0; i < imageData.data.length; i+=4) {

        let r = imageData.data[i];
        let g = imageData.data[i + 1];
        let b = imageData.data[i + 2];

        imageData.data[i] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        imageData.data[i+1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        imageData.data[i+2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
}

//Funciones para guardado y subida de archivos

function SaveImage(){

    let link = window.document.createElement( 'a' ),
    url = canvasContainer.toDataURL(), filename = 'screenshot.jpg';

    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );

}

function loadFile(){
    cleanCanvas();
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();

    reader.onloadend = function () {
        image.src = reader.result;
        image.onload = function(){
            canvasHeight = image.height;
            canvasWidth = image.width;
            setWidth(canvasHeight,canvasWidth);
            canvas.drawImage(image, 0, 0);
            imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
            canvas.putImageData(imageData, 0, 0);
        }
    };

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        image.src = "";
    }
}

//function to paint
function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * canvasWidth) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function pintar(x, y, r, g, b){
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

function colorear(rgb,event){
    let cX = event.layerX;
    let cY = event.layerY+25; //Ajuste de posicion del pintado
    pintar(cX,cY,rgb[0],rgb[1],rgb[2]);
}

function getSelectedColor(){
    return rgb;
}

function cleanCanvas(){
    imageData = canvas.createImageData(canvasWidth, canvasHeight);
    for(x=0; x<canvasWidth; x++){
        for(y=0; y<canvasHeight; y++){
            setPixel(imageData, x, y, 255, 255, 255, 255);
        }
    }
    canvas.putImageData(imageData, 0, 0);
}

//EVENTOS DE BOTONES

setEventosFiltros('blackWhiteFilter','click',applyBlackAndWhiteFilter);
setEventosFiltros('invertFilter','click',invert);
setEventosFiltros('binaryFilter','click',binarizacion);
setEventosFiltros('sepia','click',sepia);

setEventosDinamicos('brightness','input',increaseBrigthness);
setEventosDinamicos('saturation','input',increaseSaturation);

setEventoSimple('saveFile','click',SaveImage);
setEventoSimple('upload','change',loadFile);
setEventoSimple('cleanCanvas','click',cleanCanvas);

function setEventoSimple(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(){
        callback();
    });
}

function setEventosFiltros(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(){
        imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
        callback(imageData);
        canvas.putImageData(imageData, 0, 0);
    });
}

function setEventosDinamicos(eventoID,listener,callback) {
    document.getElementById(eventoID).addEventListener(listener,function(){
        imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
        let amount = parseInt(this.value);
        callback(imageData,amount);
        canvas.putImageData(imageData, 0, 0);
    });
}

document.getElementById("canvas").addEventListener("mousemove",function(event){
    if (event.buttons == 1){
        rgb = getSelectedColor();
        if (eraser){
            rgb = [255,255,255];
        }
        colorear(rgb,event);
    }else{
        lastx = -1;
        lasty = -1;
    }
});

document.getElementById("gussianBlur").addEventListener("click",function(){
    imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
    gussianBlur(imageData,5);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("pencilThickness").addEventListener("input",function(){
    strokeSize = this.value;
});

document.getElementById("colorPicker").addEventListener("input",function(){
    let hexaColor = this.value;
    rgb = hexToRGB(hexaColor);
});

document.getElementById("pencil").addEventListener("click",function() {
    eraser = false;
    document.getElementById("canvas").classList.remove("eraser");
    document.getElementById("canvas").classList.add("pencil");
});

document.getElementById("eraser").addEventListener("click",function() {
    eraser = true;
    document.getElementById("canvas").classList.remove("pencil");
    document.getElementById("canvas").classList.add("eraser");

});
