<template>
  <div>
    <gmap-map :center="center" :zoom="15" style="width: 100%; height: 500px" ref="map">
      <gmap-polyline v-if="path.length > 0" :path="path" :editable="true"
          
          ref="polyline">
      </gmap-polyline>
    </gmap-map>
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
export default {
    data: () => ({
        center: {lat: -23.902333, lng: -55.431444},
        edited: null,
          path: [
            {lat: -23.902333, lng: -55.431444},
            {lat: -23.901705, lng: -55.434437},
          ],
          mvcPath: null,
          errorMessage: null,
          polylineGeojson: '',
    }),
    methods: {
        polygonHover (event) {
            // Change strokeColor here.
        }
    }
}
</script>