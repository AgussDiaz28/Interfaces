  // ---------------------------------------- Creacion de un cuadrado y Circulo  ----------------------------------------

  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillStyle = 'rgba(5,133,0,1)'
  ctx.fillRect(050, 205, 1500, 100);
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

  // ---------------------------------------- Barrido de Matriz de Pixeles ---------------------------------------- 

  for (y = 0; y < 1000; y++) {
    for (x = 0; x < 1000; x++) {
      if (cont === ratio) {
        cont = 0;
        transpetencia++;
      }
      setPixel(imageData, x, y, 255, 127, 0, transpetencia);

    }
    cont++;
  }

  ctx.putImageData(imageData, 0, 0);
  
  // ---------------------------------------- PAINT ----------------------------------------
  
  var imageData = ctx.createImageData(1000, 1000);
  document.getElementById("canvas").addEventListener("mousemove",function(event){
      if (event.buttons == 1){
      var cX = event.clientX;
      var cY = event.clientY; 
      setPixel(imageData,cX,cY,255,0,0,255);
      ctx.putImageData(imageData,0,0);
    }
  })

  // -- Fin de primer Clase del 17 - 08