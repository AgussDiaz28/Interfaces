Filter = {};

Filter.tmpCanvas = document.createElement('canvas');
Filter.tmpCtx = Filter.tmpCanvas.getContext('2d');

Filter.createImageData = function(w,h) {
    return this.tmpCtx.createImageData(w,h);
};

Filter.gaussianBlur = function() {
    let imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
    imageData = Filter.filterImageData(Filter.convolute, imageData, [ 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9 ]);
    canvas.putImageData(imageData, 0, 0);
};

Filter.sharpen = function() {
    let imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
    imageData = Filter.filterImageData(Filter.convolute, imageData, [ 0, -1,  0, -1,  5, -1, 0, -1,  0 ]); //sharpen
    canvas.putImageData(imageData, 0, 0);
};

Filter.edgeDetection = function() {
    let imageData = canvas.getImageData(0,0,canvasWidth,canvasHeight);
    imageData = Filter.filterImageData(Filter.convolute, imageData, [0, 1, 0, 1,  -4, 1, 0, 1,  0]);
    canvas.putImageData(imageData, 0, 0);
};

Filter.filterImageData = function(filter, imageData, var_args) {
    let args = [imageData];
    for (let i=2; i<arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

//Algoritmo que transforma la imagen en blanco y negro con tonalidades grises
Filter.applyBlackAndWhiteFilter = function (imageData,i,adjustmentValue){
    let promedio = ((imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3);
    promedio = Math.floor(promedio);
    imageData.data[i]       = promedio;
    imageData.data[i + 1]   = promedio;
    imageData.data[i + 2]   = promedio;
};

Filter.increaseBrigthness = function(imageData,index,adjustmentValue){
    imageData.data[index]       += adjustmentValue;
    imageData.data[index + 1]   += adjustmentValue;
    imageData.data[index + 2]   += adjustmentValue;
};

//Algoritmo que cambia aumenta el contraste de la imagen
Filter.increaseContrast = function (imageData,i,adjustmentValue){
    let factor = ( 259 * ( adjustmentValue + 255 ) ) / ( 255 * ( 259 - adjustmentValue ) );
    imageData.data[i]       = factor * (imageData.data[i+0] - 128 )+ 128;
    imageData.data[i + 1]   = factor * (imageData.data[i+1] - 128 )+ 128;
    imageData.data[i + 2]   = factor * (imageData.data[i+2] - 128 )+ 128;
};

//Algoritmo que cambia los pixeles a blanco o negro
Filter.binarizacion = function (imageData,i,adjustmentValue = null){
    imageData.data[i]       = (imageData.data[i]/2 > 127 )? 255 : 0;
    imageData.data[i + 1]   = (imageData.data[i]/2 > 127 )? 255 : 0;
    imageData.data[i + 2]   = (imageData.data[i]/2 > 127 )? 255 : 0;
};

//Algoritmo que cambia los pixeles a su inverso
Filter.invert = function (imageData,i,adjustmentValue = null){
    imageData.data[i]       =  255 - imageData.data[i]   ;
    imageData.data[i + 1]   =  255 - imageData.data[i+1] ;
    imageData.data[i + 2]   =  255 - imageData.data[i+2] ;
};

//Algoritmo que cambia los pixeles a una tonalidad sepia
Filter.sepia = function (imageData,i,adjustmentValue = null){
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];

    imageData.data[i] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
    imageData.data[i+1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
    imageData.data[i+2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
};

Filter.convolute = function(pixels, weights) {
    let size = Math.round(Math.sqrt(weights.length)); //Tamaño de la matriz convolucion
    let halfSize = Math.floor(size/2);
    // Pixeles del imagedata original
    let src = pixels.data;
    let sw = pixels.width;
    let sh = pixels.height;
    let imageData = Filter.createImageData(sw, sh);
    let idCopy = imageData.data;
    for (let y=0; y<sh; y++) {
        for (let x=0; x<sw; x++) {
            let sy = y;
            let sx = x;
            let index = (y*sw+x)*4;
            let r=0, g=0, b=0, a=0;

            //Recalculo el valor de los pixeles aledaños - Recorro matriz convolucion
            for (let cy=0; cy<size; cy++) {
                for (let cx=0; cx<size; cx++) {
                    let scy = sy + cy - halfSize; // y de origen de la matriz convolucion
                    let scx = sx + cx - halfSize; // x de origen de la matriz convolucion

                    // mientras no sea una direccion xy invalido calculo los nuevos valores de rgb
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        let newIndex = (scy*sw+scx)*4;
                        let wt = weights[cy*size+cx];
                        r += src[newIndex] * wt;
                        g += src[newIndex+1] * wt;
                        b += src[newIndex+2] * wt;
                        a += src[newIndex+3] * wt;
                    }
                }
            }
            idCopy[index] = r;
            idCopy[index+1] = g;
            idCopy[index+2] = b;
            idCopy[index+3] = 255;
        }
    }
    return imageData;
};


