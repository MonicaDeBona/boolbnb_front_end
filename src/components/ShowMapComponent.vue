<script>
import { onMounted, ref } from 'vue';
//importo lo store
import { store } from '../store';
export default {
  name: 'ShowMapComponent',
  data() {
    return {
      store,
    }
  },
  //documentazione seguita -> https://developer.tomtom.com/blog/build-different/using-tomtom-maps-vue-3
  setup() {
    const mapRef = ref(null);

    onMounted(() => {
      const tt = window.tt;
      var map = tt.map({
        key: '6SAi5dGbnJdWK8nFfjntfDymv8x9xMwj',
        //aggiungo la posizione del nostro appartamento per lo zoom
        center: [store.apartment.longitude, store.apartment.latitude],
        //zoommo la mappa per vedere l'indicatore vicino nella zona
        zoom: 15,
        container: mapRef.value,
        style: 'tomtom://vector/1/basic-main',
      });
      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      addMarker(map);
    })

    function addMarker(map) {
      const tt = window.tt;
      //inserisco le variabili di lat e long recuparandole dal nostro db
      //prima long poi lat (sono al contrario rispetto a Google Maps -.-")
      var location = [store.apartment.longitude, store.apartment.latitude];
      //console.log(store.apartment.latitude)
      //console.log(store.apartment.longitude)
      var popupOffset = 50;
      // var marker = new tt.Marker({ color: '#fe8376', with: 50 }).setLngLat(location).addTo(map);
      var marker = new tt.Marker({ width: 40, color: '#fe8376' }).setLngLat(location).addTo(map);
      var popup = new tt.Popup({ offset: popupOffset });
      reverseGeocoding(marker, popup);
      map.scrollZoom.disable();
      marker.setPopup(popup).togglePopup();
    }
    function reverseGeocoding(marker, popup) {
      const tt = window.tt;
      tt.services.reverseGeocode({
        key: '6SAi5dGbnJdWK8nFfjntfDymv8x9xMwj',
        position: marker.getLngLat()
      }).then(function (result) {
        // console.log(result.addresses[0].address.freeformAddress);
        popup.setHTML(result.addresses[0].address.freeformAddress);
      })
    }

    return {
      mapRef,
    };
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <section class="py-3">
          <div id='map' ref="mapRef" class="w-100"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  border-radius: 1rem;
  height: 650px;
  margin-bottom: 3rem;
}
</style>