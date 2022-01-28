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
            Apply
          </button>
        </b-input-group>
      </div>
    </div>
<!--    <button-->
<!--      class="btn btn-primary" >-->
<!--      Apply-->
<!--    </button>-->
<!--    <b-input-group>-->
<!--      <b-form-input-->
<!--        style="width: 100px"-->
<!--        id="radius"-->
<!--        v-model="radius"-->
<!--        size="lg"-->
<!--        type="number"-->
<!--        placeholder="Type Radius in KM to draw circle in map"-->
<!--      >-->
<!--      </b-form-input>-->
<!--    </b-input-group>-->

    <div class="content-description mt-3 mb-3">
      <div id="map_container"><div id="locationmap"></div></div>
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
      radius: 50,
      backendErrors: {},
      isDisabled: false,
      place:'',
      latitude:0,
      longitude:0
    };
  },

  mounted(){
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
        types: ["establishment"],
      };

      var autocomplete = new google.maps.places.Autocomplete(
        input,
        options
      );
      google.maps.event.addListener(
        autocomplete,
        "place_changed",
        function () {
          this.place = autocomplete.getPlace();
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          const map = new google.maps.Map(
            document.getElementById("locationmap"),
            {
              zoom: 11,
              center: { lat: this.latitude, lng: this.longitude },
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
              center: { lat: this.latitude, lng: this.longitude },
              radius: Math.sqrt( radius*1000) * 100,
            });
          }
        }
      );
    }, 3000);
  },
  methods: {
    loadMap() {
      var input = document.getElementById("addressLine");
      var options = {
        types: ["establishment"],
      };

      var autocomplete = new google.maps.places.Autocomplete(
        input,
        options
      );
      google.maps.event.addListener(
        autocomplete,
        "place_changed",
        function () {
          this.place = autocomplete.getPlace();
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          const map = new google.maps.Map(
            document.getElementById("locationmap"),
            {
              zoom: 11,
              center: { lat: this.latitude, lng: this.longitude },
              mapTypeId: "terrain",
            }
          );
          let radius = document.getElementById("radius").value
          console.log('radius')
          console.log(radius)
          if(radius != 'undefined '){
            const cityCircle = new google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map,
              center: { lat: this.latitude, lng: this.longitude },
              radius: Math.sqrt( radius*1000) * 100,
            });
          }
        }
      );
    }
  }


};
</script>
