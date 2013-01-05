//Acelerómetro
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		var verID = null;
		$('#acelerometro .greenButton').tap(function(){ //Obtener Aceleración actual
				navigator.accelerometer.getCurrentAcceleration(function(a){ // cuando no hay problemas o errores
				pgAlert("Aceleracion X: "+a.x+"\n"+
				"Aceleracion Y: "+a.y+"\n"+
				"Aceleracion Z: "+a.z+"\n"+
				"TimeStamp: "+a.timestamp,"Poscicion actual");
			}, accError);
			
		});
		
		$('#acelerometro .individual li').tap(function(){
			switch($(this).index()){
				case 0: //Comenzar actualización de acelerómetro
					verID = navigator.accelerometer.watchAcceleration(
					   	function(a){
							$("#acelerometro .plastic li").eq(0).children("span").text("X:");
							$("#acelerometro .plastic li").eq(0).children("strong").text(a.x);
							$("#acelerometro .plastic li").eq(1).children("span").text("Y:");
							$("#acelerometro .plastic li").eq(1).children("strong").text(a.y);
							$("#acelerometro .plastic li").eq(2).children("span").text("Z:");
							$("#acelerometro .plastic li").eq(2).children("strong").text(a.z);
							$("#acelerometro .plastic li").eq(3).children("span").text("TimeStamp:");
							$("#acelerometro .plastic li").eq(3).children("strong").text(a.timestamp);
					   	}, accError,{frequency: 500}
					   );
					break;
				case 1: //Detener actualización de acelerómetro
					if(verID){
						navigator.accelerometer.clearWatch(verID);
						verID = null;
							$("#acelerometro .plastic li").eq(0).children("span").text("Apagado");
							$("#acelerometro .plastic li").eq(0).children("strong").text("");
							$("#acelerometro .plastic li").eq(1).children("span").text("Apagado");
							$("#acelerometro .plastic li").eq(1).children("strong").text("");
							$("#acelerometro .plastic li").eq(2).children("span").text("Apagado");
							$("#acelerometro .plastic li").eq(2).children("strong").text("");
							$("#acelerometro .plastic li").eq(3).children("span").text("Apagado");
							$("#acelerometro .plastic li").eq(3).children("strong").text("");
					}else{
						pgAlert('El Acelerómetro está apagado', 'Acelerómetro');
					}
			}
		});
		
		function accError(err){ //Error
			pgAlert('Error: '+err.code, 'Error');
		}
	}, false);
});