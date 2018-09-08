var ctx = document.getElementById("canvas").getContext("2d");
var x;
var y;

// ---------------------------------------- Pintado de un Pixel ----------------------------------------
function setPixel(imageData, x, y, r, g, b, a) {
  index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}

// ---------------------------------------- Degradado ----------------------------------------

var cont = 0;
var transpetencia = 0;
var rangoDeColores = 255;
var height = 510;
var width = 510;
var ratio = Math.floor(height/rangoDeColores); // (1000 / 256);
var imageData = ctx.createImageData(width, height);

// ---------------------------------------- Barrido de Matriz de Pixeles ----------------------------------------

var mitad = width/2;

for (x = 0; x < width; x++) {
  for (y = 0; y < height; y++) {
    if (cont === ratio) {
      cont = 0;
      transpetencia++;
    }
    if (mitad > 2){
        setPixel(imageData, x, y, 2, transpetencia, 102, 100);
    }else{
       setPixel(imageData, x, y, 12 , transpetencia, 204, 100);
    }
  }
  cont++;
}

ctx.putImageData(imageData, 0, 0);

let image = new Image();
image.src = "https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?ixlib=rb-0.3.5&s=e1b64ba174d9c5dd3646c6fe57a85f8c&auto=format&fit=crop&w=1275&q=80";
image.onload = function(){
        ctx.drawImage(image,0,0);
        var imageData = ctx.getImageData(0,0,this.width,this.height);
        setPixel(imageData, 0, 0, 0, 0, 0, 255);
        ctx.putImageData(imageData, 0, 0);
}
