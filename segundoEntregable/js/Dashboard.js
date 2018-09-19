function Dashboard() {
    this.limiteFicha = 40;
    this.limiteColumna = 20;
    this.fichas = [{x:79,y:120},{x:1090, y:122}];
    this.columnas = [ {x:376,y:170}, {x:444,y:170}, {x:517,y:170}, {x:753,y:170}, {x:824,y:170}, {x:898,y:170}, {x:960,y:170},
                    ];
};

Dashboard.prototype.levantarFicha = function (jugador,col) {

};

Dashboard.prototype.pintarTablero = function (jugador,col,fila) {

};

Dashboard.prototype.clickCercaFicha = function (x,y) {
    let limiteFicha = this.limiteFicha;
    let arr = this.fichas;
    let response = false;
    arr.forEach(function (elem) {
        if ( (elem.x > (x - limiteFicha))  && (elem.x < (x + limiteFicha)) ){
            if ( (elem.y > (y - limiteFicha))  && (elem.y < (y + limiteFicha)) ){
                response = true;
            }
        }
    });
    return response;
};

Dashboard.prototype.clickCercaColumna = function (x,y) {
   let limiteColumna = this.limiteColumna;
   let limiteFicha = this.limiteFicha;
   let selectedRow = null;
   let arr = this.columnas;
   let cont = 0;
   arr.forEach(function (elem) {
       if ( (y < (elem.y + limiteFicha)) && (y > (elem.y - limiteFicha)) ){
            if ( (x < (elem.x + limiteColumna)) && (x > (elem.x - limiteColumna)) ){
                selectedRow = cont;
            }
       }
       cont++;
   });
   console.log(selectedRow)
   return selectedRow;
};
