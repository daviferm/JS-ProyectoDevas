

class UI {
	constructor(latlng, zoon){
		//Inicializar y obtenet la propiedad de mapa
		this.mapa = new google.maps.Map(document.getElementById('map'), {
	    center: latlng,
	    zoom: zoon
	  });
	}
	mostrarPin(latlng){
	  let marker = new google.maps.Marker({
	    position: latlng,
	    map: this.mapa,
	    title: 'Parkímetro'
	  });
	}

	mostrarCartel(){
		let infoWindow = new google.maps.infoWindow({
			content: 'A'
		})
	}
}