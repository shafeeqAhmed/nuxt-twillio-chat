<script>
import KnobControl from "vue-knob-control";

export default {
  components: {
    KnobControl,
  },
  created() {
    this.start = this.$store.state.stats.startDate;
    this.end = this.$store.state.stats.endDate;
    this.getData();
  },
  data() {
    return {
      mapData: 0,
      duration: "",
      start: "",
      end: "",
    };
  },
  methods: {
    async getData() {
      if (this.start == "" || this.end == "") {
        alert("start or end date is missing");
        return true;
      }
      const {
        data: { topActiveContact },
      } = await this.$axios.$get(
        `/top-in-active-contact?start=${this.start}&end=${this.end}`
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
                  <div class="row">
                    <div class="col-md-4 form-inline">
                      <h3>Top 10 Inactive Fan</h3>
                    </div>

                    <div
                      class="col-md-8 form-inline d-flex justify-content-end"
                    >
                      <label>Start Date</label>
                      <div role="group" class="form-group m-2">
                        <input
                          type="date"
                          v-model="start"
                          class="form-control"
                        />
                        <label class="ml-2">End Date</label>
                        <div class="form-group m-2">
                          <input
                            type="date"
                            v-model="end"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="form-group m-2">
                        <button class="btn btn-info" @click="getData">
                          Search
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
