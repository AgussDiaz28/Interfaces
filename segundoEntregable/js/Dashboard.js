function Dashboard(filas,columnas,xPosition,yPosition,filePath,sloth,slotw) {
    this.filas = filas;
    this.columnas = columnas;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.filePath = filePath;
    this.slot = {h:sloth,w:slotw};
    this.render();
};

Dashboard.prototype.render = function(){
    let canvas = document.getElementById("canvas").getContext("2d");
    let image = new Image();
    image.src = this.filePath;
    let own = this;
    image.onload = function(){
        canvas.drawImage(image, own.xPosition, own.yPosition);
    };
};

Dashboard.prototype.getCantFilas = function () {
    return this.filas;
};

Dashboard.prototype.getCantColumnas = function () {
    return this.columnas;
};

Dashboard.prototype.getX = function () {
    return this.xPosition;
};

Dashboard.prototype.getY = function () {
    return this.yPosition;
};

Dashboard.prototype.getWidth = function () {
    return this.slot.w;
};

Dashboard.prototype.getHeight = function () {
    return this.slot.w;
};


