<script>

export default {
  components: {
        apexchart: () => import("vue-apexcharts"),
  },
  data() {
    return {
      start: "",
      end: "",
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
          colors: ["#1abc9c"],
          labels: ["Average Response Percentage"],
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
      if (this.start == "" || this.end == "") {
        alert("start or end date is missing");
        return true;
      }
      const {
        data: { averageResponseRate },
      } = await this.$axios.$get(
        `/average-response-rate?start=${this.start}&end=${this.end}`
      );
      this.series = averageResponseRate;
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
                  <h4>Response Rate</h4>
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

              <!-- <knob-control
                :readonly="true"
                v-model="mapData"
                :min="-mapData"
                :max="mapData"
                class="mt-3"
                :size="150"
                :animate-value="false"
                secondary-color="#eeeeee"
                text-color="#fff"
              ></knob-control> -->
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
