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

        };
    },
    methods: {
       async getData() {

          const data = await this.$axios.$get('/no-of-text');
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
                                     <option v-for="(list,key) in options" :key="`${key}`-no-of-text" :value="list.value" > {{ list.name}} </option>

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



                          <div class="card-body pt-0">
            <div class="table-responsive mb-0">
              <table class="table table-hover table-centered mb-0">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template >

                  </template>
                </tbody>
              </table>
            </div>
          </div>

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
