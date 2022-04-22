<script>
import countTo from "vue-count-to";
import averageClickRate from "./averageClickRate.vue";
import averageResponseRate from "./averageResponseRate.vue";
import fanReach from "./fanReach.vue";
import noOfText from "./noOfText.vue";
import noOfContact from "./noOfContact.vue";
import topActiveContact from "./topActiveContact.vue";
import topInActiveContact from "./topInActiveContact.vue";

/**
 * Widgets component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  async fetch() {
    // const {
    //   data: { totalContact, totalSendMessage, totalReceivedCount },
    // } = await this.$axios.$get("/influencer-dashboard-counts");
    // this.totalContact = totalContact;
    // this.totalSendMessage = totalSendMessage;
    // this.totalReceivedCount = totalReceivedCount;
    this.$store.dispatch("stats/getMonthlyRegistration");
    this.$store.dispatch("stats/getTopCity");
  },
  components: {
    apexchart: () => import("vue-apexcharts"),
    countTo,
    averageClickRate,
    averageResponseRate,
    fanReach,
    noOfText,
    noOfContact,
    topActiveContact,
    topInActiveContact,
  },
  data() {
    return {
      totalContact: 0,
      totalSendMessage: 0,
      totalReceivedCount: 0,
      title: "Influencer Dashboard",
      items: [
        {
          text: "",
          active: true,
        },
      ],
    };
  },
  computed: {
    monthlyRegistration() {
      return this.$store.getters["stats/getMonthlyRegistration"];
    },
    topCity() {
      return this.$store.getters["stats/getTopCity"];
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-6">
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
      <div class="col-md-6">
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
    </div>

    <div class="row">
      <div class="col-md-6 text-center">
        <div class="box">
          <h1>Automations</h1>
        </div>
      </div>
      <div class="col-md-6">
        <average-response-rate />
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box h1 {
  width: 400px;
  height: 400px;
  padding-top: 25%;
}
</style>
