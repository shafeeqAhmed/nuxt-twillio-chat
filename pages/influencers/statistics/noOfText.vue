<script>
import KnobControl from "vue-knob-control";

export default {
  components: {
    KnobControl,
  },
  data() {
    return {
      mapData: 0,
      duration: "",
      start: "",
      end: "",
      options: [
        {
          name: "A Week Ago",
          value: "week",
        },
        {
          name: "A Month Ago",
          value: "month",
        },
        {
          name: "A Year Ago",
          value: "year",
        },
      ],
      typeOPtion: [
        {
          name: "Date Range",
          value: "range",
        },
        {
          name: "Duration",
          value: "duration",
        },
      ],
      type: "",
    };
  },
  methods: {
    async getData() {
      if (this.type == "") {
        if (this.start == "" || this.end == "") {
          alert("start and end date is missing");
        }
        return true;
      }
      var url = "";
      if (this.type == "range") {
        url = `/no-of-text?start=${this.start}&end=${this.end}`;
      } else {
        url = `/no-of-text?duration=${this.duration}`;
      }
      const {
        data: { messageCount },
      } = await this.$axios.$get(url);
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
                <h4>Number of Text</h4>
              </div>

              <div class="row">
                <div class="col-md-12 form-inline">
                  <div class="col-md-3">
                    <div class="'form-group">
                      <label class="label-text-left">Duration Type</label>
                      <select
                        class="form-control graph-card-input"
                        v-model="type"
                      >
                        <option value="">Date Type</option>
                        <option value="range">Date Range</option>
                        <option value="duration">Duration</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-3" v-if="type == 'duration'">
                    <div class="'form-group">
                      <label class="label-text-left">Select duration</label>
                      <select
                        class="form-control graph-card-input"
                        v-model="duration"
                      >
                        <option value="">Select duration</option>
                        <option
                          v-for="(list, key) in options"
                          :key="`${key}` - no - of - text"
                          :value="list.value"
                        >
                          {{ list.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-3" v-if="type == 'range'">
                    <div class="'form-group">
                      <label class="label-text-left">Start Date</label>
                      <input
                        type="date"
                        v-model="start"
                        class="form-control graph-card-input"
                      />
                    </div>
                  </div>
                  <div class="col-md-3" v-if="type == 'range'">
                    <div class="'form-group">
                      <label class="label-text-left">End Date</label>
                      <input
                        type="date"
                        v-model="end"
                        class="form-control graph-card-input"
                      />
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="'form-group">
                      <button
                        class="btn btn-info search-btn-alignment"
                        @click="getData"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  <!-- <div class="form-group m-2" v-if="type == 'range'">
                    <input type="date" v-model="start" class="form-control" />
                  </div>
                  <div class="form-group m-2" v-if="type == 'range'">
                    <input type="date" v-model="end" class="form-control" />
                  </div> -->
                </div>
              </div>

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
              <h6 class="text-muted mt-2" style="margin-top: 20px !important">
                Number of Text
              </h6>
            </div>
            <!-- end .text-center -->
            <div class="row invisible">
              <h4>hidden text for manage botton space</h4>
            </div>
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
