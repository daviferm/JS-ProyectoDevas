

class UI {
	constructor(latlng, zoon){
		//Inicializar y obtenet la propiedad de mapa
		this.mapa = new google.maps.Map(document.getElementById('map'), {
	    center: latlng,
	    zoom: zoon
		});
	}
	miPosicion(latlng, zoon){
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				let pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				let miPosicion = "geo:"+latlng.lat+","+latlng.lng;
				// window.location.href = 'geo:37.6894694,-121.000303';
				if ((navigator.platform.indexOf("iPhone") != -1) || 
				 (navigator.platform.indexOf("iPod") != -1) || 
				 (navigator.platform.indexOf("iPad") != -1)){

					 window.open("maps://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");
				 } else {
					
					window.open("https://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");	
				 }
		
									
			});
		} else {
			alert("Necesitas habilitar el posicionamiento GPS.");
		}
	}

	mostrarPin(latlng, img){
		let image = '../img/parkare.png';
	  let marcador = new google.maps.Marker({
	    position: latlng,
			map: this.mapa,
			animation:
			google.maps.Animation.DROP,
			icon: img,
			title: 'Parkímetro'
	  });
	}

	mostrarCartel(){
		let infoWindow = new google.maps.infoWindow({
			content: 'A'
		})
	}
}

