<script>
import KnobControl from "vue-knob-control";

export default {
  created() {
    this.getData();
  },
  async fetch() {
    this.getData("week");
  },
  components: {
    KnobControl,
  },
  data() {
    return {
      mapData: 0,

      type: "",
    };
  },
  methods: {
    async getData(type = "all") {
      this.type = type;
      const res = await this.$store.dispatch("stats/getDateRange", type);
      const {
        data: { averageClickRate },
      } = await this.$axios.$get(
        `/average-click-rate?start=${res.start}&end=${res.end}`
      );
      this.mapData = averageClickRate;
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <!-- start col-->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="text-center" dir="ltr">
              <div class="row">
                <h4>Click Rate</h4>
              </div>
              <div class="d-flex justify-content-around">
                <button
                  class="btn btn-info search-btn-alignment"
                  :class="type == 'week' ? 'btn-danger' : ''"
                  @click="getData('week')"
                >
                  Last 7 Days
                </button>
                <button
                  class="btn btn-info search-btn-alignment"
                  :class="type == 'month' ? 'btn-danger' : ''"
                  @click="getData('month')"
                >
                  Last 30 Days
                </button>
                <button
                  class="btn btn-info search-btn-alignment"
                  :class="type == 'year' ? 'btn-danger' : ''"
                  @click="getData('year')"
                >
                  Last Year
                </button>
                <button
                  class="btn btn-info search-btn-alignment"
                  :class="type == 'all' ? 'btn-danger' : ''"
                  @click="getData('all')"
                >
                  All Time
                </button>
              </div>

              <!-- <div class="row">
              <div class="col-md-4 form-inline">
                <h4>Click Rate</h4>
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
                  <button class="btn btn-info" @click="getData">Search</button>
                </div>
              </div>
            </div> -->

              <knob-control
                v-model="mapData"
                :min="-mapData"
                :max="mapData"
                class="mt-3"
                :size="150"
                primary-color="#4bd396"
                secondary-color="#eeeeee"
                text-color="#4bd396"
              ></knob-control>
              <h6 class="text-muted mt-2">Average Click Rate Percentage</h6>
            </div>
            <!-- end .text-center -->
          </div>
          <!-- end card-box -->
        </div>
      </div>
    </div>
    <!-- end col-->
  </div>
</template>
<style scoped>
.label-text-left {
  justify-content: left;
}
.graph-card-input {
  width: 100%;
}
.search-btn-alignment {
  margin-top: 22px;
}
</style>
