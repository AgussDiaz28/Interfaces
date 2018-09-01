let canvas = document.getElementById("canvas").getContext("2d");
let canvasContainer = document.getElementById("canvas");
let image = new Image();
let imageData = canvas.getImageData(0,0,1150,700);
let rgb = [0,0,0];
let strokeSize = 5;
let eraser = false;
let canvasWidth = 1150;
let canvasHeight = 700;
let lastx = 0;
let lasty = 0;

//Inicializacion de Sliders
let brightnessSlider = document.getElementById("brightness");
let brightnessOutput = document.getElementById("bvalue");
brightnessOutput.innerHTML = brightnessSlider.value;

let contrasteSlider = document.getElementById("contraste");
let contrasteOutput = document.getElementById("cvalue");
contrasteOutput.innerHTML = contrasteSlider.value;

let thicknessSlider = document.getElementById("pencilThickness");
let thicknessOutput = document.getElementById("tvalue");
thicknessOutput.innerHTML = thicknessSlider.value;

brightnessSlider.oninput = function() {
    brightnessOutput.innerHTML = this.value;
}

contrasteSlider.oninput = function() {
    contrasteOutput.innerHTML = this.value;
}

thicknessSlider.oninput = function() {
    thicknessOutput.innerHTML = this.value;
}

//AUX FUNCTIONS
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
            let g = imageData.data[index+1];
            let b = imageData.data[index+2];
            let a = imageData.data[index+3];
            pixel = [r,g,b,a];
        }
    }
    return pixel;
}

//Funcion que suma dos array de pixeles
function sumarPixeles(val,aux) {
    val[0] = val[0] + aux[0];
    val[1] = val[1] + aux[1];
    val[2] = val[2] + aux[2];
    val[3] = val[3] + aux[3];
    return val;
}

//FILTROS
function gussianBlur(imageData,radio) {

    for (i=0;i<imageData.data.width;i++){
        for (j=0;j<imageData.data.width;j++){ // Recorrido la matriz de la imagen
            let cont = 0; //Cantidad de pixeles visitados
            let val = [0,0,0,0]; //Variable que guarda la suma de los pixeles
            let aux = [0,0,0,0]; //Variable que guarda el valor del pixel en un x e y
            for (k=i-radio;k<i+radio;k++){  //Recorrido de la matriz convolucion
                for (t=j-radio;t<j+radio;t++) {
                    cont++;
                    aux = getPixel(imageData,i+k,t+j);
                    val = sumarPixeles(val,aux);
                }
            }
            let r = Math.floor(val[0]/cont);
            let g = Math.floor(val[1]/cont);
            let b = Math.floor(val[2]/cont);
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    alert('termino el blur');
}

//Algoritmo que transforma la imagen en blanco y negro con tonalidades grises
function applyBlackAndWhiteFilter(imageData,i,adjustmentValue){
        let promedio = ((imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3);
        promedio = Math.floor(promedio);
        imageData.data[i]       = promedio;
        imageData.data[i + 1]   = promedio;
        imageData.data[i + 2]   = promedio;
}

//Algoritmo que aumenta el brillo de la imagen
function increaseBrigthness(imageData,i,adjustmentValue){
        imageData.data[i]       += adjustmentValue;
        imageData.data[i + 1]   += adjustmentValue;
        imageData.data[i + 2]   += adjustmentValue;
}

//Algoritmo que cambia aumenta el contraste de la imagen
function increaseContrast(imageData,i,adjustmentValue){
        let factor = ( 259 * ( adjustmentValue + 255 ) ) / ( 255 * ( 259 - adjustmentValue ) );
        imageData.data[i]       = factor * (imageData.data[i+0] - 128 )+ 128;
        imageData.data[i + 1]   = factor * (imageData.data[i+1] - 128 )+ 128;
        imageData.data[i + 2]   = factor * (imageData.data[i+2] - 128 )+ 128;
}

//Algoritmo que cambia los pixeles a blanco o negro
function binarizacion(imageData,i,adjustmentValue = null){
        imageData.data[i]       = (imageData.data[i]/2 > 127 )? 255 : 0;
        imageData.data[i + 1]   = (imageData.data[i]/2 > 127 )? 255 : 0;
        imageData.data[i + 2]   = (imageData.data[i]/2 > 127 )? 255 : 0;
}

//Algoritmo que cambia los pixeles a su inverso
function invert(imageData,i,adjustmentValue = null){
    imageData.data[i]       =  255 - imageData.data[i]   ;
    imageData.data[i + 1]   =  255 - imageData.data[i+1] ;
    imageData.data[i + 2]   =  255 - imageData.data[i+2] ;
}

//Algoritmo que cambia los pixeles a una tonalidad sepia
function sepia(imageData,i,adjustmentValue = null){
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];

    imageData.data[i] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
    imageData.data[i+1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
    imageData.data[i+2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
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

//Funciones para guardado de imagenes
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

//Funcion que limpia el canvas y dibuja la nueva imagen en el canvas
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

//Function que cambia el color de un pixel dado un X e Y
function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * canvasWidth) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

//Funcion que dado un X e Y crea una linea con el X e Y anterior
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

//Funcion que obtiene el X e Y del evento mousemove y manda el color seleccionado
function colorear(event){
    let rgb = getSelectedColor();
    if (event.buttons == 1){
        if (eraser){
            rgb = [255,255,255];
        }
        pintar(event.layerX,event.layerY+25,rgb[0],rgb[1],rgb[2]);
    }else{
        lastx = -1;
        lasty = -1;
    }
}

function getSelectedColor(){
    return rgb;
}

//Funcion que limbia el canvas
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
setEventosDinamicos('contraste','input',increaseContrast);

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
        recorrerImageData(callback,null);
    });
}

function setEventosDinamicos(eventoID,listener,callback) {
    document.getElementById(eventoID).addEventListener(listener,function(){
        let amount = parseInt(this.value);
        recorrerImageData(callback,amount);
    });
}

document.getElementById("canvas").addEventListener("mousemove",function(event){
    colorear(event);
});

document.getElementById("gussianBlur").addEventListener("click",function(){
    imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
    gussianBlur(imageData,1);
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
