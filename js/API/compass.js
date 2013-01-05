//Acelerómetro
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		var verID = null;
		$('#brujula .greenButton').tap(function(){ //Obtener Aceleración actual
			navigator.compass.getCurrentHeadiing(function(h){ // cuando no hay problemas o errores
				pgAlert("Grados: "+h.magneticHeading,"Poscicion actual");
			}, comError);
		});
		
		$('#brujula .individual li').tap(function(){
			switch($(this).index()){
				case 0: //Comenzar actualización de acelerómetro
					if(verID = null){
						verID = navigator.compass.watchHeading(
					   		function(h){
								$("#brujula.plastic li").eq(0).children("span").text("Grados:");
								$("#brujula.plastic li").eq(0).children("strong").text(h.magneticHeading);
					   		}, comError,{frequency: 500}
						);
					}
					break;
				case 1: //Detener actualización de acelerómetro
					if(verID){
						navigator.compass.clearWatch(verID);
						verID=null;
						$("#brujula.plastic li").eq(0).children("span").text("Apagado");
						$("#brujula.plastic li").eq(0).children("strong").text("");
					}else{
						pgAlert('La Brujula está apagado', 'Acelerómetro');
					}
			}
		});
		
		function comError(err){ //Error
			pgAlert('Error: '+err.code, 'Error');
		}
	}, false);
});