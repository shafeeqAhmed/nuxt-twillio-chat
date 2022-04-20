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
    };
  },
  methods: {
    async getData(type = "all") {
      this.type = type;
      const res = await this.$store.dispatch("stats/getDateRange", type);
      const {
        data: { topActiveContact },
      } = await this.$axios.$get(
        `/top-active-contact?start=${res.start}&end=${res.end}`
      );
      this.mapData = topActiveContact;
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
              <div class="card-body pt-0">
                <div class="table-responsive mb-0">
                  <div class="row m-2">
                    <div class="col-md-4 form-inline">
                      <h3>Top 10 Active Fan</h3>
                    </div>

                    <div class="col-md-8">
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
                  </div>

                  <table class="table table-hover table-centered mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Total Message</th>
                        <th>Gender</th>
                        <th>DOB</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template>
                        <tr v-for="(data, key) in mapData" :key="key">
                          <td>{{ ++key }}</td>
                          <td>{{ data.name }}</td>
                          <td>{{ data.local_number }}</td>
                          <td>{{ data.email }}</td>
                          <td>{{ data.totalMessage }}</td>
                          <td>{{ data.gender }}</td>
                          <td>{{ data.dob }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
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
