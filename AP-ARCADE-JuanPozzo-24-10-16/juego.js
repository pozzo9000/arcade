var juego={
	persona : prompt("Dinos tu nombre"),
  codigo: Math.random(),
  filas:[[/*1,2,3*/],
         [/*4,5,6*/],
         [/*7,8,9*/]],
	espacioVacio:{
      fila:2,
      columna:2
  	},
	crearPieza:function(fila , columna , numero){
            var divJ = $("<div>"); /*-si le pongo <> creo el objeto, si no solo lo llamo*/
            divJ.addClass("pieza");
            divJ.css({
               top: fila*200,
               left: columna*200,
               backgroundImage:'url("Piezas/' + numero + '.jpg")',
            });
            return {
            	acamica : divJ,
            	filaInicial: fila,
            	columnaInicial: columna,
            };
	},

	instalarPiezas : function (elemento){
      var numero = 1;
      for (var fila = 0; fila < 3; fila++) {
         for (var columna = 0; columna<3; columna++){
             if (fila==this.espacioVacio.fila&&columna==this.espacioVacio.columna){
              juego.filas[fila][columna]=null;

            }else{
               
               var pieza =this.crearPieza(fila, columna, numero++);
               juego.filas[fila][columna]= pieza;
               elemento.append(pieza.acamica)
            };
            }
         }
  },
   
	moverFichaFilaColumna : function(ficha,fila,columna){
      ficha.acamica.css({
         top: fila * 200,
         left: columna * 200
      })
	},

	guardarEspacioVacio : function (fila, columna){
      this.espacioVacio.fila = fila;
      this.espacioVacio.columna= columna;

      this.filas[fila][columna] = null;/*este null es el nuevo espacio vacio*/
	},

	intercambiarPosicionConEspacioVacio(fila, columna){
      var ficha = this.filas[fila] && this.filas[fila][columna];
      if(ficha){
         this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
         this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
         this.guardarEspacioVacio(fila,columna);
      }
	},

	moverAbajo : function(){
      var filaOrigen = this.espacioVacio.fila-1;
      var columnaOrigen = this.espacioVacio.columna;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverArriba : function(){
      var filaOrigen = this.espacioVacio.fila+1;
      var columnaOrigen = this.espacioVacio.columna;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverDerecha : function(){
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna-1;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverIzquierda : function(){
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna+1;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
 	capturarTeclas : function(){
    	var tell = this;

      $(document).keydown(function(evento) {
        switch(evento.which) {
            case 37:
              tell.moverIzquierda();
            break;

            case 38:
              tell.moverArriba();
            break;

            case 39:
              tell.moverDerecha();
            break;

            case 40:
              tell.moverAbajo();
            break;

            default: return
         };
         evento.preventDefault();/*limita los mov. que  hacemos*/
         tell.chequearSiGano();

      })
   	}, /*Las funciones nominativa no funcionan dentro de las variables*/
   
  mezclarFichas(veces){
    if(veces<=5){return;}

    var that = this;
    var funciones = ['moverAbajo','moverArriba','moverIzquierda','moverDerecha'];
    var numeroRandom = Math.floor(Math.random() * 4);
    var functionName = funciones[numeroRandom];
    this[functionName]();

    setTimeout(function(){
      that.mezclarFichas(veces-3);
    },15);
  },

	chequearSiGano : function (){
		for (var fila = 0; fila < 3; fila++) {
         	for (var columna = 0; columna<3; columna++){

         		if(this.filas[fila][columna]&& !(this.filas[fila][columna].filaInicial==fila && this.filas[fila][columna].columnaInicial==columna)){
					return false}
			}
		}
    $("#juego").slideUp(4000);
    $("#ganador").animate({"opacity":"100","width":"600px","height":"300px"}, 4000);
    $("#ganador").html("<h1 class='nombre_ganador'>Felicitaciones " + juego.persona + ", has ganado</h1><h2 class'codigo'>Tu codigo para tu cuenta de acamica es: "+ juego.codigo +"<a href='https://www.acamica.com/aprendeprogramando' target='_blank'>. Click aquí</a></h2>");
},

  iniciar: function(elemento){
      this.instalarPiezas(elemento);
      this.mezclarFichas(150);
      this.capturarTeclas();
	}
};


$(function(){
  var elemento= $("#juego");
	juego.iniciar(elemento);
  console.log(juego.filas)
	})