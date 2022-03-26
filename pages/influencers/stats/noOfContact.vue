<script>
export default {
  components: {
    apexchart: () => import("vue-apexcharts"),
  },
  data() {
    return {
      duration: "",
      start: "",
      end: "",
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
      series: 0,
      mapData: {
        chartOptions: {
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: "16px",
                  color: undefined,
                  offsetY: 120,
                },
                value: {
                  offsetY: 76,
                  fontSize: "22px",
                  color: undefined,
                  formatter(val) {
                    return val + "%";
                  },
                },
              },
            },
          },
          fill: {
            gradient: {
              enabled: true,
              shade: "dark",
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91],
            },
          },
          stroke: {
            dashArray: 4,
          },
          colors: ["#f672a7"],
          labels: ["Number of Contacts"],
          responsive: [
            {
              breakpoint: 380,
              options: {
                chart: {
                  height: 280,
                },
              },
            },
          ],
        },
      },
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
        url = `/no-of-contact?start=${this.start}&end=${this.end}`;
      } else {
        url = `/no-of-contact?duration=${this.duration}`;
      }
      const {
        data: { contactCount },
      } = await this.$axios.$get(url);
      this.series = contactCount;
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
                <div class="col-md-3 form-inline">
                  <h4>Number of Contact</h4>
                </div>

                <div class="col-md-9 form-inline d-flex justify-content-end">
                  <div class="form-group m-2">
                    <select class="form-control" v-model="type">
                      <option value="">Selection Date Type</option>
                      <option value="range">Date Range</option>
                      <option value="duration">Duration</option>
                    </select>
                  </div>
                  <div v-if="type == 'duration'" class="form-group m-2">
                    <select class="form-control" v-model="duration">
                      <option value="">Select duration</option>
                      <option
                        v-for="(list, key) in options"
                        :key="key"
                        :value="list.value"
                      >
                        {{ list.name }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group m-2" v-if="type == 'range'">
                    <input type="date" v-model="start" class="form-control" />
                  </div>
                  <div class="form-group m-2" v-if="type == 'range'">
                    <input type="date" v-model="end" class="form-control" />
                  </div>
                  -
                  <div class="form-group m-2">
                    <button class="btn btn-info" @click="getData">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <apexchart
                id="t12"
                class="apex-charts"
                height="350"
                type="radialBar"
                :series="[series]"
                :options="mapData.chartOptions"
              ></apexchart>
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
