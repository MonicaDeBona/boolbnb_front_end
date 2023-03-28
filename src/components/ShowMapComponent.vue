<script>
import { onMounted, ref } from 'vue';

export default {
name: 'ShowMapComponent',

//documentazione seguita -> https://developer.tomtom.com/blog/build-different/using-tomtom-maps-vue-3

setup() { 

const mapRef = ref(null); 

onMounted(() => { 

        const tt = window.tt; 

        var map = tt.map({ 

        key: '6SAi5dGbnJdWK8nFfjntfDymv8x9xMwj', 

        container: mapRef.value, 

        style: 'tomtom://vector/1/basic-main', 

    }); 

    map.addControl(new tt.FullscreenControl()); 

    map.addControl(new tt.NavigationControl());  

    addMarker(map); 

    function reverseGeocoding(marker, popup) { 
    const tt = window.tt; 
    tt.services.reverseGeocode({ 
        key: 'iTF86GRA2V5iGjM6LMMV54lrK8v6zC1w', 
        position: marker.getLngLat() 
    }).go().then( function( result ){ 
        console.log(result.addresses[0].address.freeformAddress); 
        popup.setHTML(result.addresses[0].address.freeformAddress); 
    }) 

    
}
}),

function addMarker(map) { 
    const tt = window.tt; 
    var location = [-121.91595, 37.36729]; 
    var popupOffset = 25; 
 
    var marker = new tt.Marker().setLngLat(location).addTo(map); 
    var popup = new tt.Popup({ offset: popupOffset }).setHTML("Your address!"); 
    reverseGeocoding(marker, popup); 
    marker.setPopup(popup).togglePopup(); 
}


return { 

  mapRef, 

}; 

}  

};
</script>

<template>
  <section class="py-3">

    <h1>Vue 3 TomTom Maps Prova</h1> 
    <div id='map' ref="mapRef"></div> 

  </section>

</template>

<style lang="scss" scoped>

  #map { 

  height: 50vh; 

  width: 50vw; 

  } 
    
</style>