

class UI {
	constructor(latlng, zoon){
		//Inicializar y obtenet la propiedad de mapa
		this.mapa = new google.maps.Map(document.getElementById('map'), {
	    center: latlng,
	    zoom: zoon
	  });
	}
	mostrarPin(latlng, img){
		let image = 'https://daviferm.github.io/ProyectoDevas/img/parkare.png';
	  let marcador = new google.maps.Marker({
	    position: latlng,
			map: this.mapa,
			animation:
			google.maps.Animation.DROP,
			icon: image,
			title: 'Parkímetro'
	  });
	}

	mostrarCartel(){
		let infoWindow = new google.maps.infoWindow({
			content: 'A'
		})
	}
}