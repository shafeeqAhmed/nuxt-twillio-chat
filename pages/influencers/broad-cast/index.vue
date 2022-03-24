<script>
// import {
//     tableData
// } from './data'
/**
 * Advanced Table component
 */
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
      components: {
        ckeditor: CKEditor.component
    },
    head() {
        return {
            title: `${this.title}`
        }
    },
    async fetch() {
      this.getBroadCastMessage();
  },
    data() {
        return {
            isDisabled: false,
            broadcast_uuid: '',
            activeMessage: '',
            messageFor: '',
            is_visited: false,
            editor: ClassicEditor,
            newMessage: "",
            showModal:false,
            tableData: [],
            title: 'BroadCast Messages',
            items: [{
                    text: 'Home',
                    href: '/',
                },
                {
                    text: 'BroadCast Message',
                     active: true,
                },

            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: 'age',
            sortDesc: false,
            fields: [{
                    key: 'message',
                    sortable: true
                },
                {
                    key: 'click_rate_percentate',
                    sortable: true
                },
                {
                    key: 'response_rate_percentate',
                    sortable: true
                },
                {
                    key: 'scheduled_at_local_time',
                    sortable: true
                },
                {
                    key: 'clicked',
                    label: 'Clicked Link'
                },
                  {
                    key: 'notClicked',
                    label: 'Not Clicked'
                },

            ],
        }
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length
    },
    methods: {
      async getBroadCastMessage() {
        const { data: { broadCastMessage }} = await this.$axios.$get("/broad-cast-messages");
        this.tableData = broadCastMessage
      },
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        messageModal(is_visited, item) {

          if(item.click_rate.length == 0) {
              alert('you can send follow up message only those Messages which contain Link')
              return true
          }
          this.isDisabled = false
          this.showModal = true
          this.activeMessage = item.message
          this.broadcast_uuid = item.broadcast_uuid
          this.is_visited =  is_visited
          if(is_visited) {
              this.messageFor= 'To: who clicked the link';
              this.newMessage = "Thanks for buying a ticket";
          } else {
              this.messageFor= 'To: who Not clicked the link';
              this.newMessage = "Don't forget to buy a ticket before they are gone";
          }
        },
      async sendFollowUpMessge() {
          this.isDisabled = true

          if(!this.newMessage) {
            alert('Empty Message not allowed!')
            return true
          }
          const input = {
            broadcast_uuid: this.broadcast_uuid,
            message: this.newMessage,
            is_visited: this.is_visited
          }
        const { data } = await this.$axios.$post("/send-follow-up-message",input);
        if(data.status) {
             this.showModal = false
            setTimeout(() => {

                  this.getBroadCastMessage();
                  alert(data.message)

              }, 700);

        } else {
            alert(data.message)

        }

        }

    },
    middleware: 'router-auth'
}
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <!-- <h4 class="header-title">BroadCast Message</h4> -->
                    <p class="text-muted font-13 mb-4"></p>
                    <div class="row mb-md-2">
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                            </div>
                        </div>
                        <!-- Search -->
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                                <label class="d-inline-flex align-items-center">
                                    Search:
                                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                                </label>
                            </div>
                        </div>
                        <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table :bordered="true" :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                           <template #cell(clicked)="data">
                            <div class="text-center">
                                <i class="mdi mdi-dots-vertical font-18 btn" @click="messageModal(true, data.item)"></i>
                            </div>
                          </template>
                          <template #cell(notClicked)="data">
                            <div class="text-center">
                                <i class="mdi mdi-dots-vertical font-18 btn" @click="messageModal(false, data.item)"></i>
                            </div>
                          </template>
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="dataTables_paginate paging_simple_numbers float-right">
                                <ul class="pagination pagination-rounded mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <b-modal v-model="showModal" title="Follow Up Message" centered>
        <form>
          <label>
            Message
          </label>
            <div class="form-group">
                  <p>
                    {{ activeMessage }}
                  </p>
            </div>
             <div class="form-group">
                <input type="text" class="form-control" readonly :disabled="true" :value="messageFor" />
            </div>

            <div class="form-group">
              <textarea rows="5" style="width:100%" v-model="newMessage"></textarea>
                <!-- <ckeditor v-model="editorData" :editor="editor"></ckeditor> -->
            </div>

        </form>
        <template v-slot:modal-footer>
            <b-button variant="secondary" @click="showModal = false">Close</b-button>
            <b-button :disabled="isDisabled" variant="primary" @click="sendFollowUpMessge()">
                Send
                <i class="fab fa-telegram-plane ml-1"></i>
            </b-button>
        </template>
    </b-modal>
</div>
</template>
