let ctx = document.getElementById("canvas").getContext("2d");
let image = new Image();
let imageData = ctx.getImageData(0,0,1150,700);
let rgb = [0,0,0];
let strokeSize = 5;
let eraser = false;

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

//Lectura de Imagenes

// image.src = "https://i2.bssl.es/porconocer/2017/10/EmpireState.jpg";
// image.onload = function(){
//     ctx.drawImage(image,0,0);
//     imageData = ctx.getImageData(0,0,this.width,this.height);
//     ctx.putImageData(imageData, 0, 0);
// }

function getCollors(imageData,x,y){
    let index = (x+y*imageData.width) * 4;
    let r = imageData.data[index];
    let g = imageData.data[index];
    let b = imageData.data[index];
    let  pixel = [r,g,b];
    return pixel;
}

function applyBlackAndWhiteFilter(imageData){
    console.log(imageData.data);
    for (let i = 0; i < imageData.data.length; i+=4) {
        let promedio = ((imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3);
        promedio = Math.floor(promedio);
        imageData.data[i]       = promedio;
        imageData.data[i + 1]   = promedio;
        imageData.data[i + 2]   = promedio;
    }
}

function increaseBrigthness(imageData,amount){
    console.log(imageData.data);
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       += amount;
        imageData.data[i + 1]   += amount;
        imageData.data[i + 2]   += amount;
    }
}

function increaseSaturation(imageData,amount){
    console.log(imageData.data);
    for (let i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       += amount;
        imageData.data[i + 1]   += amount;
        imageData.data[i + 2]   += amount;
    }
}

function binarizacion(imageData){
    console.log(imageData.data);
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

//Funciones para guardado y subida de archivos

function SaveImage(){
    console.log('saveFile');
    let canvas = document.getElementById("canvas");
    Canvas2Image.saveAsPNG(canvas);
}

function loadFile(){
    cleanCanvas();
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();

    reader.onloadend = function () {
        image.src = reader.result;
        image.onload = function(){

            ctx.drawImage(image, image.width/2, 0)
            imageData = ctx.getImageData(0,0,this.width,this.height);
            ctx.putImageData(image, image.width/2, 0);
        }
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        image.src = "";
    }
}

//function to paint

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
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
    let cY = event.layerY;
    pintar(imageData,cX,cY,rgb[0],rgb[1],rgb[2],255,10);
    ctx.putImageData(imageData,0,0);
}

function getSelectedColor(){
    return rgb;
}

function cleanCanvas(){
    imageData = ctx.createImageData(width=1150, height=700);
    for(x=0; x<width; x++){
        for(y=0; y<height; y++){
            setPixel(imageData, x, y, 255, 255, 255, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
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
    console.log(eraser);
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

document.getElementById("blackWhiteFilter").addEventListener("click",function(event){
    applyBlackAndWhiteFilter(imageData);
    ctx.putImageData(imageData, 0, 0);
});

document.getElementById("invertFilter").addEventListener("click",function(event){
    invert(imageData);
    ctx.putImageData(imageData, 0, 0);
});

document.getElementById("binaryFilter").addEventListener("click",function(event){
    binarizacion(imageData);
    ctx.putImageData(imageData, 0, 0);
});

document.getElementById("brightness").addEventListener("input",function(event){
    let amount = this.value;
    console.log(amount);
    increaseBrigthness(imageData,amount);
    ctx.putImageData(imageData, 0, 0);
});

document.getElementById("saturation").addEventListener("input",function(event){
    let amount = this.value;
    console.log(amount);
    increaseSaturation(imageData,amount);
    ctx.putImageData(imageData, 0, 0);
});

document.getElementById("saturation").addEventListener("input",function(event){
    let amount = this.value;
    console.log(amount);
    increaseSaturation(imageData,amount);
    ctx.putImageData(imageData, 0, 0);
});

document.getElementById("pencilThickness").addEventListener("input",function(event){
    strokeSize = this.value;
});

document.getElementById("gussianBlur").addEventListener("click",function(event){
    alert('hi under development');
});

document.getElementById("upload").addEventListener("change",function(event){
    loadFile();
});

document.getElementById("saveFile").addEventListener("click",function(event){
    SaveImage();
});
