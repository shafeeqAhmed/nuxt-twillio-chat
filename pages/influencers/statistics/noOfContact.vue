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
        data: { contactCount },
      } = await this.$axios.$get(
        `/no-of-contact?start=${res.start}&end=${res.end}`
      );
      this.mapData = contactCount;
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
                  <h4>Number of Contacts</h4>
                </div>
              </div>

              <div class="col-md-12" style="margin-left: -41px">
                <div class="d-flex justify-content-end">
                  <button
                    class="btn btn-info search-btn-alignment ml-2"
                    :class="type == 'week' ? 'btn-danger' : ''"
                    @click="getData('week')"
                  >
                    Last 7 Days
                  </button>
                  <button
                    class="btn btn-info search-btn-alignment ml-2"
                    :class="type == 'month' ? 'btn-danger' : ''"
                    @click="getData('month')"
                  >
                    Last 30 Days
                  </button>
                  <button
                    class="btn btn-info search-btn-alignment ml-2"
                    :class="type == 'year' ? 'btn-danger' : ''"
                    @click="getData('year')"
                  >
                    Last Year
                  </button>
                  <button
                    class="btn btn-info search-btn-alignment ml-2"
                    :class="type == 'all' ? 'btn-danger' : ''"
                    @click="getData('all')"
                  >
                    All Time
                  </button>
                </div>
              </div>
              <knob-control
                v-model="mapData"
                class="mt-3"
                :size="150"
                primary-color="#f5707a"
                secondary-color="#eeeeee"
                text-color="#f5707a"
              ></knob-control>
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
