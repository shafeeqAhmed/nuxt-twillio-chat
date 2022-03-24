<script>
import KnobControl from "vue-knob-control";

export default {
    components: {
        KnobControl,
    },
    data() {
        return {
            mapData: 0,
            duration: '',
            start: '',
            end:'',
            durationMenu: ['week','month','year'],
            is_duration: false
        };
    },
    methods: {
       async getData() {
         if(this.start ==  '' || this.end == '' || this.end == '') {
           alert('start and end date or is missing')
           return true
         }
         var url = ''
         if(this.duration != '') {
           url = `/no-of-text?start=${this.start}&end=${this.end}`
         } else {
           url = `/no-of-text?start=${this.start}&end=${this.end}&duration=${this.duration}`

         }
          const { data: {fanReached} } = await this.$axios.$get();
          this.mapData = fanReached
      }
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <div class="row">

        <!-- start col-->

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="text-center" dir="ltr">
                        <div class="row">
                                <div class="form-group m-2">
                                   <select v-model="duration">
                                     <li v-for="list in durationMenu" :key="list" > {{ list }} </li>
                                   </select>
                                </div>
                                <div class="form-group m-2">
                                    <input type="date" v-model="start" class="form-control" >
                                </div>
                                <div class="form-group m-2">
                                    <input type="date" v-model="end" class="form-control">
                                </div>
                                <div class="form-group m-2">
                                    <button class="btn btn-info" @click="getData">Search</button>
                                </div>
                        </div>
                        <knob-control v-model="mapData" :min="-mapData" :max="mapData" class="mt-3" :size="150" primary-color="#3ac9d6" secondary-color="#eeeeee" text-color="#3ac9d6"></knob-control>
                        <h6 class="text-muted mt-2">Number of Text</h6>
                    </div>
                    <!-- end .text-center -->
                </div>
                <!-- end card-box -->
            </div>
        </div>
        <!-- end col-->
    </div>

</div>
</template>
