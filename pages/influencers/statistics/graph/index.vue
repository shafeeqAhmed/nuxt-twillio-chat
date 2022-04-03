<script>
import VueApexCharts from "vue-apexcharts";
/**
 * Apex component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  async fetch() {
    this.$store.dispatch("stats/getAgeGroupBand");
    this.$store.dispatch("stats/getGenderGroupBand");
    this.$store.dispatch("stats/getTopCity");
    this.$store.dispatch("stats/getTopCountry");
    this.$store.dispatch("stats/getMonthlyRegistration");
  },
  created() {},
  computed: {
    ageGroupBand() {
      return this.$store.getters["stats/getAgeGroupBand"];
    },
    genderGroupBand() {
      return this.$store.getters["stats/getGenderGroupBand"];
    },
    topCity() {
      return this.$store.getters["stats/getTopCity"];
    },
    topCountry() {
      return this.$store.getters["stats/getTopCountry"];
    },
    monthlyRegistration() {
      return this.$store.getters["stats/getMonthlyRegistration"];
    },
  },
  components: {
    apexchart: () => import("vue-apexcharts"),
  },
  data() {
    return {
      title: "Stats",
      items: [
        {
          text: "",
          href: "/",
        },
      ],
    };
  },
  methods: {
    test() {
      alert("this is the alert");
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-xl-6">
        <!-- Simple Pie Chart -->
        <Portlet :headertitle="'Age Bands'">
          <div class="card-body pt-0">
            <apexchart
              class="apex-charts"
              height="320"
              type="pie"
              v-if="ageGroupBand.series.length > 0"
              :series="ageGroupBand.series"
              :options="ageGroupBand.chartOptions"
            ></apexchart>
          </div>
        </Portlet>
      </div>
      <div class="col-xl-6">
        <!-- Patterned Donut Chart -->
        <Portlet :headertitle="'Gender Bands'">
          <div class="card-body pt-0">
            <apexchart
              class="apex-charts"
              height="320"
              type="donut"
              v-if="genderGroupBand.series.length > 0"
              :series="genderGroupBand.series"
              :options="genderGroupBand.chartOptions"
            ></apexchart>
          </div>
        </Portlet>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <Portlet :headertitle="'Top City'">
          <div class="card-body pt-0">
            <!-- Basic Bar Chart -->
            <apexchart
              class="apex-charts"
              height="380"
              type="bar"
              v-if="topCity.series[0].data.length > 0"
              :series="topCity.series"
              :options="topCity.chartOptions"
            ></apexchart>
          </div>
        </Portlet>
      </div>
      <div class="col-xl-6">
        <Portlet :headertitle="'Top Country'">
          <div class="card-body pt-0">
            <!-- Basic Bar Chart -->
            <apexchart
              class="apex-charts"
              height="380"
              type="bar"
              v-if="topCountry.series[0].data.length"
              :series="topCountry.series"
              :options="topCountry.chartOptions"
            ></apexchart>
          </div>
        </Portlet>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <Portlet :headertitle="'Monthly User Joining'">
          <div class="card-body pt-0">
            <!-- Gradient Line Chart -->
            <apexchart
              class="apex-charts"
              height="380"
              type="line"
              v-if="monthlyRegistration.series[0].data.length"
              :series="monthlyRegistration.series"
              :options="monthlyRegistration.chartOptions"
            ></apexchart>
          </div>
        </Portlet>
      </div>
    </div>
  </div>
</template>
