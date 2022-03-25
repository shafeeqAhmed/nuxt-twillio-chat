<script>
import KnobControl from "vue-knob-control";

export default {
  components: {
    KnobControl,
  },
  data() {
    return {
      mapData: 0,
      start: "",
      end: "",
    };
  },
  methods: {
    async getData() {
      if (this.start == "" || this.end == "") {
        alert("start or end date is missing");
        return true;
      }
      const {
        data: { fanReached },
      } = await this.$axios.$get(
        `/fan-reach?start=${this.start}&end=${this.end}`
      );
      this.mapData = fanReached;
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
                <div class="col-md-4 form-inline">
                  <h4>Fan Reach</h4>
                </div>

                <div class="col-md-8 form-inline d-flex justify-content-end">
                  <label>Start Date</label>
                  <div role="group" class="form-group m-2">
                    <input type="date" v-model="start" class="form-control" />
                    <label class="ml-2">End Date</label>
                    <div class="form-group m-2">
                      <input type="date" v-model="end" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group m-2">
                    <button class="btn btn-info" @click="getData">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <!-- <div class="row">
                                <div class="form-group m-2">
                                    <input type="date" v-model="start" class="form-control" >
                                </div>
                                <div class="form-group m-2">
                                    <input type="date" v-model="end" class="form-control">
                                </div>
                                <div class="form-group m-2">
                                    <button class="btn btn-info" @click="getData">Search</button>
                                </div>
                        </div> -->
              <knob-control
                v-model="mapData"
                :min="-mapData"
                :max="mapData"
                class="mt-3"
                :size="150"
                primary-color="#3ac9d6"
                secondary-color="#eeeeee"
                text-color="#3ac9d6"
              ></knob-control>
              <h6 class="text-muted mt-2">Fan Reach</h6>
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
