  // ---------------------------------------- Creacion de un cuadrado y Circulo  ----------------------------------------

  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.lineWidth = 15;
  ctx.lineCap = 'round';
  ctx.strokeStyle = "rgba(255,127,0,0.5)"
  ctx.stroke();
  var imageData = ctx.createImageData(1000, 1000);

  // ---------------------------------------- Pintado de un Pixel ----------------------------------------
  function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }

  // ---------------------------------------- Degradado ----------------------------------------

  var x;
  var y;
  var cont = 0;
  var transpetencia = 0;
  var ratio = 3; // (1000 / 256);
  var height = 1000;
  var width = 750;

  // ---------------------------------------- Barrido de Matriz de Pixeles ----------------------------------------

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      if (cont === ratio) {
        cont = 0;
        transpetencia++;
      }
      if (y > width/2){
          setPixel(imageData, x, y, 255, transpetencia, 0, 100);
      }else{
         setPixel(imageData, x, y, 255 , transpetencia, 0, 100);
      }


    }
    cont++;
  }

  ctx.putImageData(imageData, 0, 0);

  // ---------------------------------------- PAINT ----------------------------------------

  var imageData = ctx.createImageData(1000, 1000);
  document.getElementById("canvas").addEventListener("mousemove",function(event){
      if (event.buttons == 1){
      var cX = event.layerX;
      var cY = event.layerY;
      setPixel(imageData,cX,cY,255,0,0,255);
      ctx.putImageData(imageData,0,0);
    }
  })

  // -- Fin de primer Clase del 17 - 08
