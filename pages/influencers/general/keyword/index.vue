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
    this.getAutoMessages();
  },
  data() {
    return {
      showModal: false,
      tableData: [],
      title: "Auto Messages",
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
      sortBy: "keyword",
      sortDesc: false,
      fields: [
        {
          label: "Keyword",
          key: "keyword",
          sortable: true,
        },
        {
          label: "Text",
          key: "text",
          sortable: true,
        },
        {
          label: "Status",
          key: "status",
          sortable: true,
        },
        {
          label: "Edit",
          key: "uuid",
          sortable: true,
        },
        {
          label: "Delete",
          key: "id",
        },
        {
          label: "Created",
          key: "created_at",
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
    async getAutoMessages() {
      const {
        data: { autoMessageList },
      } = await this.$axios.$get("/get-auto-message");
      this.tableData = autoMessageList;
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
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.$axios
            .$delete(`/delete-auto-message?uuid=${item.uuid}`)
            .then(() => {
              Swal.fire("Deleted!", "Record has been deleted.", "success");
              this.getAutoMessages();
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
            <b-button
              variant="primary"
              to="/influencers/general/keyword/add"
              type="button"
            >
              Add Keyword
            </b-button>

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
                <template #cell(uuid)="data">
                  <div class="text-left">
                    <i
                      class="mdi mdi-dots-vertical font-18 btn"
                      @click="editRecord(data.item)"
                    ></i>
                  </div>
                </template>
                <template #cell(id)="data">
                  <div class="text-left">
                    <i
                      class="mdi mdi-delete-forever-outline font-26 btn"
                      @click="deleteRecord(data.item)"
                    ></i>
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
