let ctx = document.getElementById("canvas").getContext("2d");

let image = new Image();

function getCollors(imageData,x,y){
    let index = (x+y*imageData.width) * 4;
    let r = imageData.data[index];
    let g = imageData.data[index];
    let b = imageData.data[index];
    let  pixel = [r,g,b];
    return pixel;
}

function applyBlackAndWhiteFilter(imageData){
    for (var i = 0; i < imageData.data.length; i+=4) {
        let promedio = ((imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3);
        promedio = Math.floor(promedio);
        imageData.data[i]       = promedio;
        imageData.data[i + 1]   = promedio;
        imageData.data[i + 2]   = promedio;
    }
}

function increaseBrigthness(imageData,ammount){
    for (var i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       += ammount;
        imageData.data[i + 1]   += ammount;
        imageData.data[i + 2]   += ammount;
    }
}

function binarizacion(imageData){
    for (var i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       = (imageData.data[i]/2 > 127 )? 255 : 0;
        imageData.data[i + 1]   = (imageData.data[i]/2 > 127 )? 255 : 0;
        imageData.data[i + 2]   = (imageData.data[i]/2 > 127 )? 255 : 0;
    }
}

function invert(imageData){
    for (var i = 0; i < imageData.data.length; i+=4) {
        imageData.data[i]       =  255 - imageData.data[i]   ;
        imageData.data[i + 1]   =  255 - imageData.data[i+1] ;
        imageData.data[i + 2]   =  255 - imageData.data[i+2] ;
    }
}

image.src = "https://i2.bssl.es/porconocer/2017/10/EmpireState.jpg";
image.onload = function(){
        ctx.drawImage(image,0,0);
        let imageData = ctx.getImageData(0,0,this.width,this.height);
        invert(imageData);
        ctx.putImageData(imageData, 0, 0);
}
