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
            options: [
              {
                name:'A Week Ago',
                value: 'week'
              },
              {
                name:'A Month Ago',
                value: 'month'
              },
              {
                name:'A Year Ago',
                value: 'year'
              }
            ],
            typeOPtion: [
              {
                name: 'Date Range',
                value: 'range'
              },
              {
                name: 'Duration',
                value: 'duration'
              }

            ],
            type: ''
        };
    },
    methods: {
       async getData() {
         if(this.type == '') {
            if(this.start ==  '' ||  this.end == '') {

           alert('start and end date is missing')

            }
           return true
         }
         var url = ''
         if(this.type == 'range') {
           url = `/no-of-contact?start=${this.start}&end=${this.end}`
         } else {
           url = `/no-of-contact?duration=${this.duration}`

         }
          const { data: {contactCount} } = await this.$axios.$get(url);
          this.mapData = contactCount
      },

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
                                <select  class="form-control" v-model="type">
                                    <option value="">Selection Date Type</option>
                                    <option  value="range">Date Range</option>
                                    <option value="duration">Duration</option>

                                </select>
                            </div>



                                <div v-if="type == 'duration'" class="form-group m-2">
                                   <select  class="form-control" v-model="duration">
                                     <option value="">Select duration</option>
                                     <option v-for="(list,key) in options" :key="key" :value="list.value" > {{ list.name}} </option>
                                   </select>
                                </div>

                                    <div class="form-group m-2"  v-if="type == 'range'">
                                        <input type="date" v-model="start" class="form-control" >
                                    </div>
                                    <div class="form-group m-2"  v-if="type == 'range'">
                                        <input type="date" v-model="end" class="form-control">
                                    </div>

                                <div class="form-group m-2">
                                        <button class="btn btn-info" @click="getData">Search</button>
                                </div>
                        </div>
                        <knob-control v-model="mapData" :min="-mapData" :max="mapData" class="mt-3" :size="150" primary-color="#3ac9d6" secondary-color="#eeeeee" text-color="#3ac9d6"></knob-control>
                        <h6 class="text-muted mt-2">Number of Contacts</h6>
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
