<template>
  <div  id="content" >
    <h4>Location</h4>
    <div class="row">
      <div class="col-8">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"><i class="fa fa-search"></i></span>
          </b-input-group-prepend>
          <b-form-input
            autocomplete="off"
            class="LoginInput"
            id="addressLine"
            ref="tyb"
            size="lg"
            placeholder="Type the name of a country,city or state"
          >
          </b-form-input>
        </b-input-group>
      </div>
      <div class="col-2">
        <b-input-group>
          <b-form-input
            id="radius"
            v-model="radius"
            type="number"
            placeholder="Miles"
            size="lg"
            class="w-50 mb-1"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col-2">
        <b-input-group>
          <button class="btn btn-primary" @click="loadMap()">
            update
          </button>
        </b-input-group>
      </div>
    </div>
    <div class="content-description mt-3 mb-3">
      <div id="map_container"><div id="locationmap"></div></div>
      <input type="hidden" id="place">
      <input type="hidden" id="lat">
      <input type="hidden" id="lng">
    </div>

    <div class="row mt-3">
      <button
        @click="applyFilter()"
        class="btn btn-primary ml-2">
        Apply
      </button>
      <button
        @click="$emit('closeModel')"
        class="btn btn-secondary ml-2">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Register component
 */
export default {
  name: "LocationTab",
  data() {
    return {
      radius: 10,
      backendErrors: {},
      isDisabled: false,
      place:'',
      latitude:0,
      longitude:0
    };
  },

  mounted(){
    this.initMap()
  },
  methods: {
    initMap() {
      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631)
      );
      setTimeout(() => {
        var input = document.getElementById("addressLine");

        const map = new google.maps.Map(
          document.getElementById("locationmap"),
          {
            zoom: 8,
            center: { lat: -33.8902, lng: 151.1759 },
            mapTypeId: "terrain",
          }
        )


        var options = {
          // bounds: defaultBounds,
          // types: ["establishment"],
          types: ['(cities)'],

        };

        var autocomplete = new google.maps.places.Autocomplete(
          input,
          options
        );
        google.maps.event.addListener(
          autocomplete,
          "place_changed",
          function () {
            var place = autocomplete.getPlace();
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();


            document.getElementById('place').value = place
            document.getElementById('lat').value = latitude
            document.getElementById('lng').value = longitude


            const map = new google.maps.Map(
              document.getElementById("locationmap"),
              {
                zoom: 11,
                center: { lat: latitude, lng: longitude },
                mapTypeId: "terrain",
              }
            );
            let radius = document.getElementById("radius").value
            if(radius != 'undefined '){
              const cityCircle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: { lat: latitude, lng: longitude },
                radius: Math.sqrt( radius*1000) * 100,
              });
            }
          }
        );
      }, 1000);

      let location =  this.$store.state.chat.data['location']
      setTimeout(() => {
        if(Object.keys(location).length > 0) {
          document.getElementById('addressLine').value = location['address']
          document.getElementById('lat').value = location['lat']
          document.getElementById('lng').value = location['lng']
          document.getElementById("radius").value = location['radius']
          this.loadMap()
        }
      },1500)
    },
    loadMap() {
      var lat = document.getElementById('lat').value
      var  lng = document.getElementById('lng').value


      const map = new google.maps.Map(
        document.getElementById("locationmap"),
        {
          zoom: 11,
          center: { lat: parseFloat(lat), lng: parseFloat(lng) },
          mapTypeId: "terrain",
        }
      );
      let radius = document.getElementById("radius").value

      if(radius != 'undefined '){
        const cityCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center:{ lat: parseFloat(lat), lng: parseFloat(lng) },
          radius: Math.sqrt( radius*1000) * 100,
        });
      }
    },
    applyFilter() {
      let address = document.getElementById('addressLine').value
      let lat = document.getElementById('lat').value
      let lng = document.getElementById('lng').value
      let radius = document.getElementById("radius").value
      if(lat && lng) {
        let data= {
          key:'location',
          val: {
            address,
            lat,
            lng,
            radius
          }
        }
        this.$store.commit('chat/filterData',data)
        this.$store.dispatch('chat/getFilterCountFromApi')
        this.$emit('closeModel')
      }else {
        alert('please select location first')
      }
    }


    },
  watch: {
    '$store.state.chat.data.location.address': {
      handler(newVal) {
        if(newVal == '' || newVal == undefined) {
          document.getElementById('addressLine').value = ''
          document.getElementById('lat').value = ''
          document.getElementById('lng').value = ''
          document.getElementById("radius").value = ''
          this.initMap()
        }

      }
    },
    '$store.state.chat.data.location.radius': {
      handler(newVal) {
        document.getElementById("radius").value = newVal
      }
    }
  },

};
</script>
