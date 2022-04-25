<script>
import KnobControl from "vue-knob-control";

export default {
  components: {
    KnobControl,
  },
  created() {
    this.getData("week");
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
        data: { messageCount },
      } = await this.$axios.$get(
        `/no-of-text?start=${res.start}&end=${res.end}`
      );
      this.mapData = messageCount;
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
                <h4>Number of Messages Sent</h4>
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
              <div class="knob-disable-div"></div>

              <knob-control
                v-model="mapData"
                class="mt-3"
                :size="150"
                primary-color="#4bd396"
                secondary-color="#eeeeee"
                text-color="#4bd396"
              ></knob-control>
              <h6 class="text-muted mt-2">Number of Messages Sent</h6>
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
input {
  margin-right: 5px;
}
</style>
