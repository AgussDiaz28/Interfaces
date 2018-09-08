let canvas = document.getElementById("canvas").getContext("2d");
let rgb = hexToRGB(document.getElementById("colorPicker").value);
let strokeSize = 5;
let eraser = false;
let canvasWidth = 1150;
let canvasHeight = 700;

//AUX FUNCTIONS
function setWidth(height,width) {
    let canvasContainer = document.getElementById("canvas");
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
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return [r,g,b];

}

//Funcion que recorre arreglo de imagedata y cambia sus valores. Recibe por parametro la funcion que va a realizar
// el cambio y un valor de configuracion seteado por el usuario
function recorrerImageData(callback,adjustmentValue) {
    imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
    for (let i = 0; i < imageData.data.length; i+=4) {
        callback(imageData,i,adjustmentValue);
    }
    canvas.putImageData(imageData, 0, 0);
}

//Funcion que limpia el canvas
function cleanCanvas(){
    imageData = canvas.createImageData(canvasWidth, canvasHeight);
    for(x=0; x<canvasWidth; x++){
        for(y=0; y<canvasHeight; y++){
            Paint.setPixel(imageData, x, y, 255, 255, 255, 255);
        }
    }
    canvas.putImageData(imageData, 0, 0);
}

function getSelectedColor(){
    return rgb;
}

//Funciones para guardado de imagenes
function SaveImage(){

    let link = window.document.createElement( 'a' ),
        url =  document.getElementById("canvas").toDataURL(), filename = 'screenshot.jpg';

    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );

}

//Funcion que limpia el canvas y dibuja la nueva imagen en el canvas
function loadFile(){
    cleanCanvas();
    let file    = document.querySelector('input[type=file]').files[0];
    document.getElementById("upload").value = "";
    let reader  = new FileReader();
    let image = new Image();

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

//FUNCIONES DE SETEO DE EVENTOS

function setEventoSimple(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(){
        callback();
    });
}

function setEventosFiltros(eventoID,listener,callback){
    document.getElementById(eventoID).addEventListener(listener,function(){
        recorrerImageData(callback,null);
    });
}

function setEventosDinamicos(eventoID,listener,callback) {
    document.getElementById(eventoID).addEventListener(listener,function(){
        let amount = parseInt(this.value);
        recorrerImageData(callback,amount);
    });
}
