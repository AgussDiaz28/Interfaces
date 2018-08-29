let canvas = document.getElementById("canvas").getContext("2d");
let canvasContainer = document.getElementById("canvas");
let image = new Image();
let imageData = canvas.getImageData(0,0,1150,700);
let rgb = [0,0,0];
let strokeSize = 5;
let eraser = false;
let canvasWidth = 1150;
let canvasHeight = 700;

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

function setWidth(width,height) {
    canvasContainer.width = width;
    canvasContainer.height = height;
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
    val[0] += aux[0];
    val[1] += aux[1];
    val[2] += aux[2];
    val[3] += aux[3];
    return val;
}

function gussianBlur(radio) {

    for (i=0;i<canvasHeight;i++){
        for (j=0;j<canvasWidth;j++){
            // Recorrido normal de matriz
            let val = [0,0,0,0];
            for (k=-radio;k<radio;k++){
                for (t=-radio;t<radio;t++) {
                    //Recorrido de nodos dependiendo del radio
                    let aux = getPixel(imageData,x+t,y+j);
                    val = sumarPixeles(val,aux);
                    //Procesar el valor
                }
            }
            aux = [0,0,0,0];
            let r = val[0]/radio;
            let g = val[1]/radio;
            let b = val[2]/radio;
            let a = val[3]/radio;
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
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
    console.log(imageData.data);
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

function pintar(imageData, x, y, r, g, b, a){
    for (let i=-strokeSize; i< strokeSize; i++){
        for (let j=-strokeSize; j< strokeSize; j++){
            setPixel(imageData, x+i, y+j, r, g, b, a)
        }
    }
}

function colorear(rgb,event){
    let cX = event.layerX;
    let cY = event.layerY+25; //Ajuste de posicion del pintado
    console.log("el valor de la x es de :"+cX);
    console.log("el valor de la y es de :"+cY);
    pintar(imageData,cX,cY,rgb[0],rgb[1],rgb[2],255,10);
    canvas.putImageData(imageData,0,0);
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

let palletColors = document.getElementsByClassName("color");

for (var i = 0; i < palletColors.length; i++) {
    palletColors[i].addEventListener('click', function () {
        let r = this.getAttribute('r');
        let g = this.getAttribute('g');
        let b = this.getAttribute('b');
        rgb = [r,g,b];
    });
}

document.getElementById('cleanCanvas').addEventListener('click',function () {
    cleanCanvas();
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

document.getElementById("canvas").addEventListener("mousemove",function(event){
    if (event.buttons == 1){
        rgb = getSelectedColor();
        if (eraser){
            rgb = [255,255,255];
        }
        colorear(rgb,event);
    }
});

document.getElementById("blackWhiteFilter").addEventListener("click",function(){
    applyBlackAndWhiteFilter(imageData);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("invertFilter").addEventListener("click",function(){
    invert(imageData);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("binaryFilter").addEventListener("click",function(){
    binarizacion(imageData);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("brightness").addEventListener("input",function(){
    let amount = parseInt(this.value);
    increaseBrigthness(imageData,amount);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("saturation").addEventListener("input",function(){
    let amount = parseInt(this.value);
    increaseSaturation(imageData,amount);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("pencilThickness").addEventListener("input",function(){
    strokeSize = this.value;
});

document.getElementById("gussianBlur").addEventListener("click",function(){
    gussianBlur(38);
});

document.getElementById("gussianBlur").addEventListener("click",function(){
    sepia(imageData);
    canvas.putImageData(imageData, 0, 0);
});

document.getElementById("upload").addEventListener("change",function(){
    loadFile();
});

document.getElementById("saveFile").addEventListener("click",function(){
    SaveImage();
});
