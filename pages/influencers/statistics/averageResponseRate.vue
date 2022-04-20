<script>
import KnobControl from "vue-knob-control";

export default {
  created() {
    this.start = this.$store.state.stats.startDate;
    this.end = this.$store.state.stats.endDate;
    this.getData();
  },
  components: {
    KnobControl,
  },
  data() {
    return {
      mapData: 0,
      start: "",
      end: "",
      type: "",
    };
  },
  methods: {
    async getData(type = "all") {
      const res = await this.$store.dispatch("stats/getDateRange", type);
      console.log(res);

      // if (this.start == "" || this.end == "") {
      //   alert("start or end date is missing");
      //   return true;
      // }
      const {
        data: { averageResponseRate },
      } = await this.$axios.$get(
        `/average-response-rate?start=${res.start}&end=${res.end}`
      );
      this.mapData = averageResponseRate;
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
                <h4>Response Rate</h4>
              </div>

              <div class="d-flex justify-content-around">
                <button
                  class="btn btn-info search-btn-alignment"
                  @click="getData('week')"
                >
                  Last 7 Days
                </button>
                <button
                  class="btn btn-info search-btn-alignment"
                  @click="getData('month')"
                >
                  Last 30 Days
                </button>
                <button
                  class="btn btn-info search-btn-alignment"
                  @click="getData('year')"
                >
                  Last Year
                </button>
                <button
                  class="btn btn-info search-btn-alignment"
                  @click="getData('all')"
                >
                  All Time
                </button>
              </div>

              <knob-control
                v-model="mapData"
                :min="-mapData"
                :max="mapData"
                class="mt-3"
                :size="150"
                :animate-value="false"
                secondary-color="#eeeeee"
                text-color="#fff"
              ></knob-control>
              <h6 class="text-muted mt-2">Average Response Percentage</h6>
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
