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

Filter.convolute = function(pixels, weights, opaque) {
    let side = Math.round(Math.sqrt(weights.length)); //Tamaño de la imagen
    let halfSide = Math.floor(side/2); //Mitad
    let src = pixels.data;
    let sw = pixels.width;
    let sh = pixels.height;
    // pad output by the convolution matrix
    let w = sw;
    let h = sh;
    let output = Filter.createImageData(w, h);
    let dst = output.data;
    // go through the destination image pixels
    let alphaFac = opaque ? 1 : 0;
    for (let y=0; y<h; y++) {
        for (let x=0; x<w; x++) {
            let sy = y;
            let sx = x;
            let dstOff = (y*w+x)*4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            let r=0, g=0, b=0, a=0;
            for (let cy=0; cy<side; cy++) {
                for (let cx=0; cx<side; cx++) {
                    let scy = sy + cy - halfSide;
                    let scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        let srcOff = (scy*sw+scx)*4;
                        let wt = weights[cy*side+cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff+1] * wt;
                        b += src[srcOff+2] * wt;
                        a += src[srcOff+3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
        }
    }
    return output;
};


