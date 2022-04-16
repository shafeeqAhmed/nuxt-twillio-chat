<script>
import Swal from "sweetalert2";

export default {
  components: {},
  head() {
    return {
      title: `${this.title}`,
    };
  },
  async fetch() {
    this.getFans();
  },
  data() {
    return {
      showModal: false,
      tableData: [],
      title: "Fan List",
      items: [
        {
          text: "",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "fname",
      sortDesc: false,
      fields: [
        {
          label: "First Name",
          key: "fname",
          sortable: true,
        },
        {
          label: "Last Name",
          key: "lname",
          sortable: true,
        },
        {
          label: "Local Number",
          key: "local_number",
          sortable: true,
        },
        {
          label: "Date of Birth",
          key: "dob",
        },
        {
          label: "Status",
          key: "is_active",
        },
        {
          label: "Action",
          key: "fan_club_uuid",
        },
      ],
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    async getFans() {
      const {
        data: { fans },
      } = await this.$axios.$get("/get-fans");
      this.tableData = fans;
    },
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    editRecord(item) {
      const url = "/influencers/general/keyword/add?uuid=" + item.uuid;
      this.$router.push(url);
    },

    deleteRecord(item) {
      Swal.fire({
        title: "Are you sure?",
        text: `All the record against ${item.local_number} will be remove!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block it!",
      }).then((result) => {
        if (result.value) {
          this.$axios
            .$post(`/block-fan`, { fan_club_uuid: item.fan_club_uuid })
            .then(() => {
              Swal.fire(
                "Blocked!",
                `${item.local_number} has been deleted Succfully!`,
                "success"
              );
              this.getFans();
            });
        }
      });
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <p class="text-muted font-13 mb-4"></p>
            <div class="row mb-md-2">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-right"
                >
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template #cell(fan_club_uuid)="data">
                  <div class="text-left">
                    <i
                      class="mdi mdi-delete-forever-outline font-26 btn"
                      @click="deleteRecord(data.item)"
                    >
                    </i>
                  </div>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-right"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
