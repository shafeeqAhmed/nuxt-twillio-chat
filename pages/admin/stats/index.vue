<script>
import VueApexCharts from "vue-apexcharts";

import {
    sparklineSalesChart,
    sparklineExpensesChart,
    sparklineProfitsChart,
    linewithDataChart,
    gradientLineChart,
    stackedAreaChart,
    basicColumChart,
    basicBarChart,
    nagativeValueBarChart,
    lineColumAreaChart,
    multipleYAxisChart,
    simpleBubbleChart,
    scatterChart,
    simplePieChart,
    gradientDonutChart,
    patternedDonutChart,
    basicRadialBarChart,
    multipleRadialBars,
    strokedCircularGuage,
    // ageGroupBand,
    // genderGroupBand,
    // topCity,
    // topCountry,
} from "./data";

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
    this.$store.dispatch('stats/getAgeGroupBand')
    this.$store.dispatch('stats/getGenderGroupBand')
    this.$store.dispatch('stats/getTopCity')
    this.$store.dispatch('stats/getTopCountry')
    this.$store.dispatch('stats/getMonthlyRegistration')
  },
  created(){

  },
  computed: {
    ageGroupBand(){
      return this.$store.getters['stats/getAgeGroupBand']
    },
    genderGroupBand(){
      return this.$store.getters['stats/getGenderGroupBand']
    },
    topCity(){
      return this.$store.getters['stats/getTopCity']
    },
    topCountry(){
      return this.$store.getters['stats/getTopCountry']
    },
    monthlyRegistration(){
      return this.$store.getters['stats/getMonthlyRegistration']
    }
  },
  components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            // sparklineSalesChart: sparklineSalesChart,
            // sparklineExpensesChart: sparklineExpensesChart,
            // sparklineProfitsChart: sparklineProfitsChart,
            // linewithDataChart: linewithDataChart,
            // gradientLineChart: gradientLineChart,
            // stackedAreaChart: stackedAreaChart,
            // basicColumChart: basicColumChart,
            // basicBarChart: basicBarChart,
            // nagativeValueBarChart: nagativeValueBarChart,
            // lineColumAreaChart: lineColumAreaChart,
            // multipleYAxisChart: multipleYAxisChart,
            // simpleBubbleChart: simpleBubbleChart,
            // scatterChart: scatterChart,
            // simplePieChart: simplePieChart,
            // gradientDonutChart: gradientDonutChart,
            // patternedDonutChart: patternedDonutChart,
            // basicRadialBarChart: basicRadialBarChart,
            // multipleRadialBars: multipleRadialBars,
            // strokedCircularGuage: strokedCircularGuage,
            title: "Stats",
            items: [{
                    text: "Minton",
                    href: "/",
                },
                {
                    text: "Charts",
                    href: "/",
                },
                {
                    text: "Apexcharts",
                    active: true,
                },
            ],
          // ageGroupBand: ageGroupBand,
          // genderGroupBand: genderGroupBand,
          // topCity: topCity,
          // topCountry: topCountry,


        };
    },
    methods: {
      test() {
        alert('this is the alert')
      }
      // async getAgeGroupStats() {
      //    let { data: { ageGroup } } = await this.$axios.$get('age-group-stats')
      //    this.ageGroupBand.series = Object.values(ageGroup)
      //    this.ageGroupBand.chartOptions.labels = Object.keys(ageGroup)
      // },
      // async getGenderGroupStats() {
      //    let { data: { genderGroup } } =  await this.$axios.$get('gender-group-stats')
      //    this.genderGroupBand.series = Object.values(genderGroup)
      //    this.genderGroupBand.chartOptions.labels = Object.keys(genderGroup)
      // },
      // async getCityGroupStats() {
      //   let { data: { cities, series } } =  await this.$axios.$get('city-group-stats')
      //   this.topCity.chartOptions.xaxis.categories = cities
      //   this.topCity.series[0].data =series
      //   console.log(this.topCity)
      // },
      // async getCountryGroupStats() {
      //   let { data: { countries, series } } =  await this.$axios.$get('country-group-stats')
      //   this.topCountry.chartOptions.xaxis.categories = countries
      //   this.topCountry.series[0].data =series
      // },
    },
    middleware: 'router-auth'
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
        <div class="col-xl-6">
<!--          <button class="btn btn-success" @click="$fetch">Fetch</button>-->
            <!-- Simple Pie Chart -->
            <Portlet :headertitle="'Age Bands'">
                <div class="card-body pt-0">

                    <apexchart class="apex-charts"  height="320" type="pie" v-if="ageGroupBand.series.length > 0" :series="ageGroupBand.series" :options="ageGroupBand.chartOptions"></apexchart>
                </div>
            </Portlet>
        </div>
        <div class="col-xl-6">
            <!-- Patterned Donut Chart -->
            <Portlet :headertitle="'Gender Bands'">
                <div class="card-body pt-0">
                    <apexchart class="apex-charts" height="320" type="donut" v-if="genderGroupBand.series.length > 0"  :series="genderGroupBand.series" :options="genderGroupBand.chartOptions"></apexchart>
                </div>
            </Portlet>
        </div>
    </div>
  <div class="row">
    <div class="col-xl-6">
      <Portlet :headertitle="'Top City'">
        <div class="card-body pt-0">
          <!-- Basic Bar Chart -->
          <apexchart class="apex-charts" height="380" type="bar" v-if="topCity.series[0].data.length > 0"  :series="topCity.series" :options="topCity.chartOptions"></apexchart>
        </div>
      </Portlet>
    </div>
    <div class="col-xl-6">
      <Portlet :headertitle="'Top Country'">
        <div class="card-body pt-0">
          <!-- Basic Bar Chart -->
          <apexchart class="apex-charts" height="380" type="bar"  v-if="topCountry.series[0].data.length"  :series="topCountry.series" :options="topCountry.chartOptions"></apexchart>
        </div>
      </Portlet>
    </div>
  </div>
  <div class="row">
    <div class="col-xl-6">
      <Portlet :headertitle="'Gradient Line Chart'">
        <div class="card-body pt-0">
          <!-- Gradient Line Chart -->
          <apexchart class="apex-charts" height="380" type="line"  v-if="monthlyRegistration.series[0].data.length" :series="monthlyRegistration.series" :options="monthlyRegistration.chartOptions"></apexchart>
        </div>
      </Portlet>
    </div>
  </div>

</div>
</template>
