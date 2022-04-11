<script>
import { required } from "vuelidate/lib/validators";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    ckeditor: CKEditor.component,
  },
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
      uuid: "",
      isEdit: false,
      isDisabled: false,
      editor: ClassicEditor,
      keyword: "",
      text: "",
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
          label: "Created",
          key: "created_at",
        },
        {
          label: "Edit",
          key: "uuid",
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
    openModal() {
      this.isEdit = false;
      this.text = "";
      this.keyword = "";
      this.uuid = "";
      this.isDisabled = false;
      this.showModal = true;
    },
    openEditModal(item) {
      this.isEdit = true;
      this.uuid = item.uuid;
      this.text = item.text;
      this.keyword = item.keyword;
      this.isDisabled = false;
      this.showModal = true;
    },
    async saveKeyword() {
      this.submitted = true;

      // stop here if form is invalid
      this.isDisabled = true;

      if (!this.keyword || !this.text) {
        alert("empty message or keyword not allowed!");
        return true;
      }
      const input = {
        text: this.text,
        keyword: this.keyword,
      };

      let url = "";

      if (!this.isEdit) {
        url = "/add-auto-message";
      } else {
        input.uuid = this.uuid;
        url = "/update-auto-message";
      }
      const { data } = await this.$axios.$post(url, input);

      if (data.status) {
        this.showModal = false;
        setTimeout(() => {
          this.getAutoMessages();
          alert(data.message);
        }, 700);
      } else {
        alert(data.message);
      }
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
            <button
              class="btn btn-primary btn-xs pull-right"
              @click="openModal"
            >
              Add Auto Messages
            </button>

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
                  <div class="text-center">
                    <i
                      class="mdi mdi-dots-vertical font-18 btn"
                      @click="openEditModal(data.item)"
                    >
                    </i>
                  </div>
                </template>
                <template #cell(notClicked)="data">
                  <div class="text-center">
                    <i class="mdi mdi-dots-vertical font-18 btn"></i>
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

    <b-modal v-model="showModal" title="Keyword For Message" centered>
      <label> Keyword </label>

      <div class="form-group">
        <input type="text" class="form-control" v-model="keyword" />
      </div>

      <label>Message Text</label>
      <div class="form-group">
        <textarea rows="5" style="width: 100%" v-model="text"></textarea>
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModal = false"
          >Close</b-button
        >
        <b-button variant="primary" @click="saveKeyword()">
          Save
          <i class="fab fa-telegram-plane ml-1"></i>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
