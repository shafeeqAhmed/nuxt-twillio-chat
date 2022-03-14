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
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            sparklineSalesChart: sparklineSalesChart,
            sparklineExpensesChart: sparklineExpensesChart,
            sparklineProfitsChart: sparklineProfitsChart,
            linewithDataChart: linewithDataChart,
            gradientLineChart: gradientLineChart,
            stackedAreaChart: stackedAreaChart,
            basicColumChart: basicColumChart,
            basicBarChart: basicBarChart,
            nagativeValueBarChart: nagativeValueBarChart,
            lineColumAreaChart: lineColumAreaChart,
            multipleYAxisChart: multipleYAxisChart,
            simpleBubbleChart: simpleBubbleChart,
            scatterChart: scatterChart,
            simplePieChart: simplePieChart,
            gradientDonutChart: gradientDonutChart,
            patternedDonutChart: patternedDonutChart,
            basicRadialBarChart: basicRadialBarChart,
            multipleRadialBars: multipleRadialBars,
            strokedCircularGuage: strokedCircularGuage,
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
        };
    },
    middleware: 'router-auth'
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
                    <apexchart class="apex-charts" height="320" type="pie" :series="simplePieChart.series" :options="simplePieChart.chartOptions"></apexchart>
                </div>
            </Portlet>
        </div>
        <div class="col-xl-6">
            <!-- Patterned Donut Chart -->
            <Portlet :headertitle="'Gender Bands'">
                <div class="card-body pt-0">
                    <apexchart class="apex-charts" height="320" type="donut" :series="patternedDonutChart.series" :options="patternedDonutChart.chartOptions"></apexchart>
                </div>
            </Portlet>
        </div>
    </div>
  <div class="row">
    <div class="col-xl-6">
      <Portlet :headertitle="'Top City'">
        <div class="card-body pt-0">
          <!-- Basic Bar Chart -->
          <apexchart class="apex-charts" height="380" type="bar" :series="basicBarChart.series" :options="basicBarChart.chartOptions"></apexchart>
        </div>
      </Portlet>
    </div>
    <div class="col-xl-6">
      <Portlet :headertitle="'Top Country'">
        <div class="card-body pt-0">
          <!-- Basic Bar Chart -->
          <apexchart class="apex-charts" height="380" type="bar" :series="basicBarChart.series" :options="basicBarChart.chartOptions"></apexchart>
        </div>
      </Portlet>
    </div>
  </div>
  <div class="row">
    <div class="col-xl-6">
      <Portlet :headertitle="'Gradient Line Chart'">
        <div class="card-body pt-0">
          <!-- Gradient Line Chart -->
          <apexchart class="apex-charts" height="380" type="line" :series="gradientLineChart.series" :options="gradientLineChart.chartOptions"></apexchart>
        </div>
      </Portlet>
    </div>
  </div>

</div>
</template>
