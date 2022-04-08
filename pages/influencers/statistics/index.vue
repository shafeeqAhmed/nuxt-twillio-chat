<script>
import VueApexCharts from "vue-apexcharts";

import countTo from "vue-count-to";
import averageClickRate from "./averageClickRate.vue";
import averageResponseRate from "./averageResponseRate.vue";
import fanReach from "./fanReach.vue";
import noOfText from "./noOfText.vue";
import noOfContact from "./noOfContact.vue";
import topActiveContact from "./topActiveContact.vue";
import topInActiveContact from "./topInActiveContact.vue";

import { widgetData, getNewRealTimeSeries } from "./data";

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
    const {
      data: { totalContact, totalSendMessage, totalReceivedCount },
    } = await this.$axios.$get("/influencer-dashboard-counts");
    this.totalContact = totalContact;
    this.totalSendMessage = totalSendMessage;
    this.totalReceivedCount = totalReceivedCount;
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
      widgetData: widgetData,
      totalContact: 0,
      totalSendMessage: 0,
      totalReceivedCount: 0,
      title: "Statistics",
      items: [
        {
          text: "",
          active: true,
        },
      ],
    };
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row d-flex">
      <div class="col-md-4 col-xl-4">
        <div class="widget-rounded-circle card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div :class="`avatar-lg rounded-circle bg-icon-success `">
                  <i :class="`fe-phone font-24 avatar-title text-white`"></i>
                </div>
              </div>
              <div class="col-6">
                <div class="text-right">
                  <h3 class="text-dark mt-1">
                    <span>
                      <countTo
                        :end-val="totalContact"
                        :duration="3000"
                      ></countTo>
                    </span>
                  </h3>
                  <p class="text-muted mb-1 text-truncate">Total Contacts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col -->
      <div class="col-md-4 col-xl-4">
        <div class="widget-rounded-circle card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div :class="`avatar-lg rounded-circle bg-icon-primary `">
                  <i
                    :class="`fe-phone-forwarded font-24 avatar-title text-white`"
                  ></i>
                </div>
              </div>
              <div class="col-6">
                <div class="text-right">
                  <h3 class="text-dark mt-1">
                    <span>
                      <countTo
                        :end-val="totalSendMessage"
                        :duration="3000"
                      ></countTo>
                    </span>
                  </h3>
                  <p class="text-muted mb-1 text-truncate">
                    Total Sent Messages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col -->
      <!-- end col -->
      <div class="col-md-4 col-xl-4">
        <div class="widget-rounded-circle card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div :class="`avatar-lg rounded-circle bg-icon-danger `">
                  <i
                    :class="`fe-phone-incoming font-24 avatar-title text-white`"
                  ></i>
                </div>
              </div>
              <div class="col-6">
                <div class="text-right">
                  <h3 class="text-dark mt-1">
                    <span>
                      <countTo
                        :end-val="totalReceivedCount"
                        :duration="3000"
                      ></countTo>
                    </span>
                  </h3>
                  <p class="text-muted mb-1 text-truncate">
                    Total Received Messages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col -->
    </div>
    <div class="row">
      <div class="col-6">
        <average-response-rate />
      </div>
      <div class="col-6">
        <average-click-rate />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <fan-reach />
      </div>
      <div class="col-6">
        <no-of-text />
      </div>
    </div>

    <no-of-contact />
    <top-active-contact />
    <top-in-active-contact />
  </div>
</template>
