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

//EVENTOS DE BOTONES

setEventosFiltros('blackWhiteFilter','click',Filter.applyBlackAndWhiteFilter);
setEventosFiltros('invertFilter','click',Filter.invert);
setEventosFiltros('binaryFilter','click',Filter.binarizacion);
setEventosFiltros('sepia','click',Filter.sepia);

setEventosDinamicos('brightness','input',Filter.increaseBrigthness);
setEventosDinamicos('contraste','input',Filter.increaseContrast);

setEventoSimple('saveFile','click',SaveImage);
setEventoSimple('upload','change',loadFile);
setEventoSimple('cleanCanvas','click',cleanCanvas);

setEventoSimple('gaussianBlur','click',Filter.gaussianBlur);
setEventoSimple('sharpen','click',Filter.sharpen);
setEventoSimple('edgeDetection','click',Filter.edgeDetection);

document.getElementById("canvas").addEventListener("mousemove",function(event){
    Paint.pintarCanvas(event);
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
