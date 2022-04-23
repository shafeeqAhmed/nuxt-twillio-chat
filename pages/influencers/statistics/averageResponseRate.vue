<script>
import KnobControl from "vue-knob-control";

export default {
  created() {
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

              <knob-control
                v-model="mapData"
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
