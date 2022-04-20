<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-xl" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title text-center">New Message</h4>
                  <button
                    type="button"
                    class="close tyb"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" @click="showModal = false"
                      >&times;</span
                    >
                  </button>
                </div>

                <div class="modal-body">
                  <div class="members">
                    <div class="plus-main">
                      <div
                        class="plus-div"
                        v-b-toggle.collapse-1
                        variant="primary"
                      >
                        <i
                          class="fa fa-plus-circle"
                          aria-hidden="true"
                          ref="age_popup_close"
                        ></i>
                      </div>
                    </div>
                    To :
                    <countTo
                      :end-val="filterSelectedMemberCount"
                      :duration="1000"
                    ></countTo>
                    Members
                    <b-button
                      class="btn-soft-secondary m-1"
                      v-if="activityBadge"
                      >{{ activityBadge }}
                      <span
                        @click="
                          removeFilter({ type: 'activity', value: 'activity' })
                        "
                        class="btn-label-right"
                        ><i class="mdi mdi-close-circle-outline"></i
                      ></span>
                    </b-button>
                    <b-button class="btn-soft-secondary m-1" v-if="genderBadge"
                      >{{ genderBadge }}
                      <span
                        @click="
                          removeFilter({ type: 'activity', value: 'gender' })
                        "
                        class="btn-label-right"
                        ><i class="mdi mdi-close-circle-outline"></i
                      ></span>
                    </b-button>
                    <b-button class="btn-soft-secondary m-1" v-if="ageBadge">
                      {{ ageBadge }}
                      <span
                        class="btn-label-right"
                        @click="removeFilter({ type: 'age', value: 'age' })"
                        ><i class="mdi mdi-close-circle-outline"></i
                      ></span>
                    </b-button>

                    <b-button
                      class="btn-soft-secondary m-1"
                      v-if="locationAddressBadge"
                    >
                      {{ locationAddressBadge }}
                      <span
                        class="btn-label-right"
                        @click="
                          removeFilter({ type: 'location', value: 'address' })
                        "
                        ><i class="mdi mdi-close-circle-outline"></i
                      ></span>
                    </b-button>
                    <b-button
                      class="btn-soft-secondary m-1"
                      v-if="locationRadiusBadge"
                    >
                      {{ locationRadiusBadge }}
                      <span
                        class="btn-label-right"
                        @click="
                          removeFilter({ type: 'location', value: 'radius' })
                        "
                        ><i class="mdi mdi-close-circle-outline"></i
                      ></span>
                    </b-button>
                    <b-button
                      class="btn-soft-secondary m-1"
                      v-if="joinDateBadge"
                    >
                      {{ joinDateBadge }}
                      <span
                        class="btn-label-right"
                        @click="
                          removeFilter({ type: 'joinDate', value: 'date' })
                        "
                        ><i class="mdi mdi-close-circle-outline"></i
                      ></span>
                    </b-button>
                  </div>

                  <b-collapse id="collapse-1" class="">
                    <b-card bg-variant="light">
                      <div class="wrapper">
                        <!-- Sidebar  -->
                        <nav id="sidebar">
                          <ul class="list-unstyled components">
                            <li>
                              <a href="#" @click="menuList('recipents')">
                                <span>
                                  <i class="fa fa-user mr-1"></i>
                                  Recipients
                                </span>
                              </a>
                            </li>

                            <li>
                              <a href="#" @click="menuList('location')">
                                <span>
                                  <i class="fa fa-map-marker mr-1"></i>
                                  Location
                                </span>
                              </a>
                            </li>

                            <li>
                              <a href="#" @click="menuList('age')">
                                <span>
                                  <i class="fa fa-user mr-1"></i>
                                  Age
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#" @click="menuList('gender')">
                                <span>
                                  <i class="fa fa-user mr-1"></i>
                                  Gender
                                </span>
                              </a>
                            </li>

                            <li>
                              <a href="#" @click="menuList('join_date')">
                                <span>
                                  <i class="fa fa-calendar-alt mr-1"></i>
                                  Join Date
                                </span>
                              </a>
                            </li>
                          </ul>
                        </nav>

                        <gender-tab
                          v-if="menuItems.genderModal"
                          @closeModel="closeMenueList"
                        />
                        <join-date
                          v-if="menuItems.joinDateModel"
                          @closeModel="closeMenueList"
                        />
                        <age-tab
                          v-if="menuItems.ageModel"
                          @closeModel="closeMenueList"
                        />
                        <location-tab
                          v-if="menuItems.locationModel"
                          @closeModel="closeMenueList"
                        />
                        <reception-tab
                          v-if="menuItems.recipentModel"
                          @closeModel="closeMenueList"
                        />
                      </div>
                    </b-card>
                  </b-collapse>

                  <div class="message-box mt-3">
                    <textarea
                      name="custom_message"
                      id="custom_message"
                      cols="30"
                      rows="10"
                      class="form-control"
                      placeholder="Enter Your Message"
                      v-model="form.custom_message"
                    ></textarea>
                  </div>
                  <div class="d-flex">
                    <input
                      v-if="isScheduled"
                      type="datetime-local"
                      class="mt-2"
                      name="schedule_date"
                      v-model="form.schedule_date"
                    />
                    <button
                      @click="updateScheduled(true)"
                      v-if="!isScheduled"
                      class="btn btn-primary mt-2 ml-1"
                    >
                      Scheduled
                    </button>
                    <button
                      @click="updateScheduled(false)"
                      v-if="isScheduled"
                      class="btn btn-danger mt-2 ml-1"
                    >
                      Remove Scheduled
                    </button>
                    <button
                      class="ml-auto btn btn-primary mt-2"
                      @click="sendCustomMessage"
                    >
                      {{ isScheduled ? "Send Scheduled Message" : "Send" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="row">
      <!-- start chat users-->

      <div class="col-xl-3 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="media mb-3">
              <!-- <img
                v-if="$auth.user.profile_photo_path != null"
                :src="$auth.user.profile_photo_path"
                class="mr-2 rounded-circle"
                height="42"
                alt="Brandon Smith"
              />
              <img
                v-else
                src="~/assets/images/users/avatar-1.jpg"
                class="mr-2 rounded-circle"
                height="42"
                alt="Brandon Smith"
              /> -->
              <div class="media-body">
                <h5 class="mt-0 mb-0 font-15">
                  <!--                  <nuxt-link to="/contacts/profile" class="text-reset">-->
                  {{ this.$auth.user.name }}

                  <!--                  </nuxt-link>-->
                </h5>
                <p class="mt-1 mb-0 text-muted font-14">
                  <small class="mdi mdi-circle text-success"></small>
                  <span class="btn p-0 copy-phone" @click="copy">
                    {{ $auth.user.phone_no }}
                  </span>
                </p>
              </div>
              <div>
                <div class="float-right">
                  <div variant="primary">
                    <button
                      class="btn btn-outline-secondary btn-xs mt-1 mr-3"
                      @click="showModal = true"
                    >
                      Broadcast
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- start search box -->
            <form class="search-bar mb-3">
              <div class="position-relative">
                <input
                  type="text"
                  class="form-control form-control-light"
                  placeholder="search Contacts..."
                  @input="debounceSearch"
                />
                <span class="mdi mdi-magnify"></span>
              </div>
            </form>
            <!-- end search box -->

            <h6 class="font-13 text-muted text-uppercase mb-2">Contacts</h6>

            <!-- users -->
            <div class="row">
              <div class="col">
                <simplebar
                  data-simplebar
                  style="max-height: 498px"
                  v-if="chatData"
                >
                  <a
                    href="javascript:void(0);"
                    class="text-body"
                    v-for="(item, index) in chatData"
                    :key="index"
                    @click="
                      chatUsername(
                        item.id,
                        item.fname,
                        '~/assets/images/users/default.png',
                        item.local_number,
                        item.fan_club_uuid
                      )
                    "
                  >
                    <div class="media p-2">
                      <div class="position-relative">
                        <!-- <span class="user-status online"></span> -->
                        <!-- <img
                          src="~/assets/images/users/default.png"
                          class="mr-2 rounded-circle"
                          height="42"
                          alt="user"
                        /> -->
                      </div>
                      <div class="media-body">
                        <h5 class="mt-0 mb-0 font-14">
                          <span
                            class="float-right text-muted font-weight-normal font-12"
                          >
                          </span>
                          {{ item.fname }}
                        </h5>
                        <p class="mt-1 mb-0 text-muted font-14">
                          <span class="w-75"> {{ item.age }} </span>,
                          <span class="w-75"> {{ item.city }} </span>
                          <span class="w-75" v-if="item.country != ''"
                            >{{ ", " + item.country }}
                          </span>
                        </p>
                        <!--  <p v-if="item.message[0]" class="mt-1 mb-0 text-muted font-14">
                           <span class="w-75">{{ item.message[0].message }}</span>
                         </p> -->
                      </div>
                    </div>
                  </a>
                </simplebar>
                <!-- end slimscroll-->
              </div>
              <!-- End col -->
            </div>
            <!-- end users -->
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
      <!-- end chat users-->

      <!-- chat area -->

      <div class="col-xl-9 col-lg-8">
        <div class="card">
          <div class="row">
            <div class="col-12">
              <div class="card-body py-2 px-3 border-bottom border-light">
                <div class="media p-2">
                  <div class="position-relative">
                    <b-alert
                      :variant="notification.type"
                      class="mt-3"
                      v-if="notification.message"
                      :show="notificationAutoCloseDuration"
                      dismissible
                    >
                      {{ notification.message }}
                    </b-alert>
                  </div>

                  <div class="position-relative" v-if="username">
                    <!-- <span class="user-status online"></span> -->
                    <!--                         <span-->
                    <!--                          class="user-status"-->
                    <!--                          :class="{-->
                    <!--                            online: item.status === 'online',-->
                    <!--                            busy: item.status === 'away',-->
                    <!--                            'do-not-disturb': item.status === 'do-not-disturb',-->
                    <!--                          }"-->
                    <!--                        ></span> -->
                    <!--                        <img v-if="item.fan.profile_photo_path"-->
                    <!--                          :src="item.fan.profile_photo_path"-->
                    <!--                          class="mr-2 rounded-circle"-->
                    <!--                          height="42"-->
                    <!--                          alt="user"-->
                    <!--                        />-->
                    <!-- <img
                      src="~/assets/images/users/default.png"
                      class="mr-2 rounded-circle"
                      height="42"
                      alt="user"
                    /> -->
                  </div>

                  <div class="media-body">
                    <h5 class="mt-2 mb-0 font-14">
                      <span
                        class="float-right text-muted font-weight-normal font-12"
                      >
                        <!--                             {{  formatDate(item.user.created_at) }}-->
                      </span>
                      {{ username }}
                    </h5>
                    <!-- <p class="mt-1 mb-0 text-muted font-14"> -->
                    <!-- <span class="w-75"> {{ receiver_number }} </span> -->
                    <!-- </p> -->
                    <!--  <p v-if="item.message[0]" class="mt-1 mb-0 text-muted font-14">
                       <span class="w-75">{{ item.message[0].message }}</span>
                     </p> -->
                  </div>
                  <div variant="primary" v-if="username">
                    <button
                      class="btn btn-outline-danger btn-xs"
                      @click="unsubscribe()"
                    >
                      Unsubscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <simplebar
              data-simplebar
              style="max-height: 460px"
              id="messageChatContainer"
            >
              <ul class="conversation-list chat-app-conversation">
                <template v-if="chatMessages">
                  <li
                    class="clearfix"
                    v-for="(data, index) in chatMessages"
                    :key="index"
                    :id="`m-${data.timestamp}`"
                    :class="{ odd: data.align === 'right' }"
                  >
                    <div class="chat-avatar">
                      <span v-if="data.align === 'right'">
                        <img
                          v-if="$auth.user.profile_photo_path"
                          :src="$auth.user.profile_photo_path"
                          class="rounded"
                          alt="James Z"
                        />
                        <img
                          v-else
                          src="~/assets/images/users/avatar-1.jpg"
                          class="rounded"
                          alt="James Z"
                        />
                      </span>
                      <span v-else>
                        <!-- <img
                          src="~/assets/images/users/default.png"
                          class="rounded"
                          alt="James Z"
                        /> -->
                      </span>
                    </div>
                    <div class="conversation-text">
                      <div class="ctext-wrap">
                        <i>
                          <span
                            v-if="data.is_link"
                            class="badge badge-pill badge-primary float-left mr-1"
                            v-html="data.total_visits"
                          ></span>
                          {{ data.name }}
                        </i>
                        <p v-html="data.message"></p>
                      </div>
                      <br />
                      <i>{{ data.time }}</i>

                      <div
                        class="card mt-2 mb-1 shadow-none border text-left"
                        v-if="data.file === true"
                      >
                        <div class="p-2">
                          <div class="row align-items-center">
                            <div class="col-auto">
                              <div class="avatar-sm">
                                <span class="avatar-title bg-primary rounded"
                                  >PDF</span
                                >
                              </div>
                            </div>
                            <div class="col pl-0">
                              <a
                                href="javascript:void(0);"
                                class="text-muted font-weight-medium"
                                >minton-presentation.pdf</a
                              >
                              <p class="mb-0">2.3 MB</p>
                            </div>
                            <div class="col-auto">
                              <!-- Button -->
                              <a
                                href="javascript:void(0);"
                                class="btn btn-link btn-lg text-muted"
                              >
                                <i class="dripicons-download"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--                    <b-dropdown-->
                    <!--                      class="conversation-actions"-->
                    <!--                      toggle-class="btn-sm btn-link text-reset p-0"-->
                    <!--                      variant="black"-->
                    <!--                      right-->
                    <!--                    >-->
                    <!--                      <template v-slot:button-content>-->
                    <!--                        <i class="mdi mdi-dots-vertical font-18"></i>-->
                    <!--                      </template>-->
                    <!--                      <a class="dropdown-item" href="#">Copy Message</a>-->
                    <!--                      <a class="dropdown-item" href="#">Edit</a>-->
                    <!--                      <a class="dropdown-item" href="#">Delete</a>-->
                    <!--                    </b-dropdown>-->
                  </li>
                </template>
              </ul>
            </simplebar>
            <div class="row">
              <div class="col">
                <div class="mt-2 bg-light p-3 rounded">
                  <form
                    class="needs-validation"
                    @submit.prevent="formSubmit"
                    name="chat-form"
                    id="chat-form"
                  >
                    <div class="row">
                      <div class="col mb-2 mb-sm-0">
                        <input
                          type="text"
                          v-model="form.message"
                          class="form-control border-0"
                          placeholder="Send Message"
                        />
                        <div
                          v-if="submitted && $v.form.message.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.form.message.required"
                            >Please enter your message</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-auto">
                        <div class="btn-group">
                          <!-- <a href="#" class="btn btn-light">
                            <i class="fe-paperclip"></i>
                          </a> -->
                          <button
                            type="submit"
                            @click="send_messages()"
                            class="btn btn-success chat-send btn-block"
                          >
                            <i class="fe-send"></i>
                          </button>
                        </div>
                      </div>
                      <!-- end col -->
                    </div>
                    <!-- end row-->
                  </form>
                </div>
              </div>
              <!-- end col-->
            </div>
            <!-- end row -->
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end chat area-->
    </div>
    <!-- end row-->
  </div>
</template>

<script>
import Swal from "sweetalert2";

import { required } from "vuelidate/lib/validators";
import genderTab from "~/components/widgets/chat/gender";
import joinDate from "~/components/widgets/chat/join_date";
import AgeTab from "~/components/widgets/chat/age";
import LocationTab from "~/components/widgets/chat/location";
import ReceptionTab from "~/components/widgets/chat/reception";
import countTo from "vue-count-to";

/**
 * Chat comoponent
 */
export default {
  head() {
    return {
      title: `${this.title} | Twilio Chat`,
    };
  },
  components: {
    joinDate,
    AgeTab,
    LocationTab,
    ReceptionTab,
    countTo,
    genderTab,
  },
  data() {
    return {
      debounce: null,
      searchText: "",
      isScheduled: false,
      showModal: false,
      menuItems: {
        joinDateModel: false,
        recipentModel: true,
        ageModel: false,
        locationModel: false,
      },
      ageOptions: [
        { value: "Between", text: "Between" },
        { value: "Under", text: "Under" },
        { value: "Over", text: "Over" },
        { value: "Excatly", text: "Excatly" },
      ],
      backendErrors: [],
      chatDataForSearch: [],
      chatData: [],
      chatMessages: [],
      recipents: [],
      title: "Chat",
      colors: {
        eighteen_above: false,
        twenty_one_above: false,

        last24hours: false,
        last7days: false,
        last30days: false,
      },
      items: [
        {
          text: "",
          active: true,
        },
      ],
      submitted: false,
      form: {
        message: "",
        custom_message: "",
        schedule_date: "",
      },
      username: "",
      status: "",
      image: "",
      receiver_id: "",
      receiver_number: "",
      active_fan_club_uuid: "",
      radius: "",
      filter_type: "recipents",
      ageFilter: {
        age_type: "",
      },
    };
  },
  validations: {
    form: {
      message: {
        required,
      },
    },
  },
  computed: {
    filterSelectedMemberCount() {
      return this.$store.state.chat.filterSelectedMemberCount;
    },
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 7 : 0;
    },
    activityBadge() {
      let activity = this.$store.state.chat.data["activity"];
      if (Object.keys(activity).length > 0 && activity?.activity !== "") {
        let activityVal = activity["activity"];
        if (activityVal == "all") {
          return activityVal + " Users";
        } else {
          return "Top " + activityVal + " %" + " Users";
        }
      }
      return false;
    },
    genderBadge() {
      let activity = this.$store.state.chat.data["activity"];
      if (Object.keys(activity).length > 0 && activity["gender"] != "") {
        return activity.gender;
      }
      return false;
    },
    ageBadge() {
      let record = this.$store.state.chat.data["age"];
      if (
        Object.keys(record).length > 0 &&
        (record["age"] !== "" || record["customFilterType"] !== "")
      ) {
        if (record.customFilterType == "Between") {
          return (
            " Between " +
            record["customStartAge"] +
            " Year To " +
            record["customEndAge"] +
            " Year"
          );
        } else if (record.customFilterType == "") {
          return record["age"] + " Year";
        } else {
          return (
            record.customFilterType + " " + record["customStartAge"] + " Year"
          );
        }
      }
      return false;
    },
    joinDateBadge() {
      let record = this.$store.state.chat.data["joinDate"];
      if (Object.keys(record).length > 0) {
        if (record.search_type == "Between") {
          return (
            " Between " +
            record["customStartDate"] +
            " To " +
            record["customEndDate"] +
            ""
          );
        } else if (record.search_type == "") {
          return record["date"];
        } else {
          return record.search_type + " " + record["customStartDate"];
        }
      }
      return false;
    },
    locationAddressBadge() {
      let record = this.$store.state.chat.data["location"];
      if (Object.keys(record).length > 0 && record["address"] !== "") {
        return record["address"];
      }
      return false;
    },
    locationRadiusBadge(type) {
      let record = this.$store.state.chat.data["location"];
      if (Object.keys(record).length > 0 && record["radius"] !== "") {
        return record["radius"] + " KM Radius";
      }
      return false;
    },
  },
  methods: {
    unsubscribe() {
      Swal.fire({
        title: "Are you sure?",
        text: `All the record against ${this.receiver_number} will be remove!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block it!",
      }).then((result) => {
        if (result.value) {
          this.$axios
            .$post(`/block-fan`, { fan_club_uuid: this.active_fan_club_uuid })
            .then(() => {
              Swal.fire(
                "Blocked!",
                `${this.receiver_number} has been deleted Succfully!`,
                "success"
              );
              this.getChatMessages();
              this.getRecipents();
              this.username = "";
              this.chatMessages = [];
            });
        }
      });
    },
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.getChatMessages(event.target.value);
      }, 600);
    },

    copy() {
      navigator.clipboard.writeText(this.$auth.user.phone_no);
      alert(this.$auth.user.phone_no + " phone number added into clipboard");
    },
    updateScheduled(type) {
      if (!type) {
        this.form.schedule_date = "";
      }
      this.isScheduled = type;
    },
    removeFilter(payload) {
      this.$store.dispatch("chat/removeSearchFilter", payload);
      this.$store.dispatch("chat/getFilterCountFromApi");
    },
    closeMenueList() {
      // this.updateMenuBit(false,false,false,false,'')
      this.$refs.age_popup_close.click();
    },
    updateMenuBit(filterType, reception, location, age, joinDate, gender) {
      this.menuItems.recipentModel = reception;
      this.menuItems.locationModel = location;
      this.menuItems.ageModel = age;
      this.menuItems.joinDateModel = joinDate;
      this.menuItems.genderModal = gender;

      this.filter_type = filterType;
    },
    menuList(type) {
      if (type == "join_date") {
        this.updateMenuBit(type, false, false, false, true, false);
      } else if (type == "recipents") {
        this.updateMenuBit(type, true, false, false, false, false);
      } else if (type == "age") {
        this.updateMenuBit(type, false, false, true, false, false);
      } else if (type == "gender") {
        this.updateMenuBit(type, false, false, false, false, true);
      } else if (type == "location") {
        this.updateMenuBit(type, false, true, false, false, false);
      } else {
        this.updateMenuBit(type, false, false, false, false, false);
      }
    },
    sendCustomMessage() {
      let filterRecord = this.$store.state.chat.data;
      filterRecord.message = this.form.custom_message;
      if (this.isScheduled && this.form.schedule_date == "") {
        alert("For Scheduled message you should select Scheduled data time");
        return;
      }
      filterRecord.schedule_date = this.form.schedule_date;
      if (filterRecord.message == "") {
        alert("Empty Message is not allowed");
        return;
      }
      this.$store
        .dispatch("chat/sendMessageToContents", filterRecord)
        .then((response) => {
          if (response.data.status) {
            if (this.isScheduled) {
              this.$swal.fire(
                "Your message has been scheduled at " +
                  this.form.schedule_date +
                  " Successfully!"
              );
            } else {
              this.$swal.fire(response.data.message);
            }
            this.showModal = false;
            this.resetModal();
          }

          if (response.data.status == false) {
            alert(response.data.message);
            return;
          }
        })
        .catch((error) => {
          this.backendErrors = error.response.data.errors;
        })
        .catch(() => {
          this.isDisabled = false;
        });
    },
    ageFilterColor(type) {
      if (type == "eighteen_above") {
        this.colors.eighteen_above = !this.colors.eighteen_above;
      } else if (type == "twenty_one_above") {
        this.colors.twenty_one_above = !this.colors.twenty_one_above;
      }
    },
    applyAgeFilter() {
      this.$refs.age_popup_close.click();
    },
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    },
    resetModal() {
      this.custom_message = "";
      this.$store.commit("chat/resetFilterData");
      this.$store.dispatch("chat/getFilterCountFromApi");
    },
    send_messages() {
      const payload = {
        receiver_number: this.receiver_number,
        receiver_id: this.receiver_id,
        message: this.form.message,
      };

      if (this.receiver_id) {
        this.$store
          .dispatch("chat/saveMessage", payload)
          .then((response) => {})
          .catch((error) => {
            this.backendErrors = error.response.data.errors;
          })
          .catch(() => {
            this.isDisabled = false;
          });
      }
    },
    async getChatMessages(search = "") {
      const url = "/get_chat_contacts?search=" + search;
      const chat_contacts = await this.$axios.$get(url);
      this.chatData = chat_contacts.data;
    },

    async getRecipents() {
      const recipents = await this.$axios.$get("/recipent_count");
      this.$store.commit("chat/memberCount", recipents.data);
    },

    /**
     * Get the name of user
     */
    async chatUsername(id, name, image, phone_no, fan_club_uuid) {
      this.receiver_id = id;
      this.username = name;
      this.status = "online";
      this.image = image;
      this.receiver_number = phone_no;
      this.active_fan_club_uuid = fan_club_uuid;

      const messages = await this.$axios.$get("/get_chat_users/" + id);

      let arr = [];
      Object.entries(messages.data).forEach((ob) => {
        arr.push(ob[1]);
      });
      // this.chatMessages = arr.slice().reverse()
      this.chatMessages = arr;
    },

    /**
     * Char form Submit
     */
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        const message = this.form.message;
        const currentDate = new Date();

        if (this.receiver_id) {
          if (Object.keys(this.chatMessages).length == 0) {
            this.chatMessages = [
              {
                align: "right",
                name: `${this.$auth.user.name}`,
                message,
                direction: "outbound-api",
                id: 0,
                to: this.receiver_number,
                from: `${this.$auth.user.phone_no}`,
                time: currentDate.getHours() + ":" + currentDate.getMinutes(),
                image: `${this.$auth.user.profile_photo_path}`,
              },
            ];
          } else {
            this.chatMessages.push({
              align: "right",
              name: `${this.$auth.user.name}`,
              message,
              direction: "outbound-api",
              id: 0,
              to: this.receiver_number,
              from: `${this.$auth.user.phone_no}`,
              time: currentDate.getHours() + ":" + currentDate.getMinutes(),
              image: `${this.$auth.user.profile_photo_path}`,
            });
          }
        }
      }
      this.submitted = false;
      this.form = {};
    },
  },
  watch: {
    showModal(newVal, oldVal) {
      if (!newVal) {
        this.updateScheduled(false);
      }
    },
    chatMessages(newVal, oldVal) {
      this.$nextTick(function () {
        let container = document.querySelector(
          "#messageChatContainer .simplebar-content-wrapper"
        );
        if (oldVal.length === 0) {
          container.scrollTo({ top: container.scrollHeight, behavior: "auto" });
        } else {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    },
  },
  mounted() {
    const newMessages = this.chatMessages;

    this.getChatMessages();

    this.getRecipents();

    this.$echo
      .channel(`chat.${this.$auth.user.user_uuid}`)
      .on("chat.event", (res) => {
        if (this.receiver_id == res.data.sender_id) {
          if (Object.keys(this.chatMessages).length == 0) {
            this.chatMessages = [
              {
                name: this.name,
                message: res.data.message,
                // time: res.data.created_at,
                image: this.image,
                align: res.data.align,
                direction: res.data.direction,
                from: this.receiver_number,
                timestamp: res.data.timestamp,
              },
            ];
          } else {
            this.chatMessages.push({
              name: this.name,
              message: res.data.message,
              // time: res.data.created_at,
              image: this.image,
              align: res.data.align,
              direction: res.data.direction,
              from: this.receiver_number,
              timestamp: res.data.timestamp,
            });
          }
        }
      });

    this.$echo
      .channel(`user.${this.$auth.user.user_uuid}`)
      .on("user.event", (record) => {
        this.getChatMessages();
        // let data = {
        //   created_at: "",
        //   fan_club_uuid: "",
        //   fan_id: 0,
        //   id: 0,
        //   local_number: "",
        //   temp_id: "",
        //   user: record.data
        // }
        // this.chatData.push(data);
      });
  },
  middleware: "router-auth",
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.copy-phone:active {
  color: gray;
  font-weight: 900;
  transition: all 0.5s;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: top;
}
.members {
  border: 1px solid #4f5d6b;
  border-radius: 4px;
  min-height: 60px;
  padding: 15px;
  position: relative;
}
.excluding {
  border: 1px solid #4f5d6b;
  border-radius: 4px;
  min-height: 60px;
  padding: 15px;
}
.message-box {
  position: relative;
}
.icons {
  position: absolute;
  bottom: 0px;
  left: 10px;
}
.plus-div i {
  font-size: 24px;
}

.plus-div {
  position: absolute;
  right: 15px;
  top: 15px;
}

.modal-body {
  position: relative;
}

/************ Card Style *******************/

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
.content-description {
  border-bottom: 1px solid#5C6777;
}
.content-description h5:hover {
  cursor: pointer;
  font-weight: 600;
}
.map-container {
  height: 450px;
  border: 1px solid #fff;
}
/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

/*
 *  STYLE 8
 */

#content::-webkit-scrollbar-track {
  border: 1px solid #4a5c6d;
  background-color: #6d7277;
}

#content::-webkit-scrollbar {
  width: 6px;
  background-color: #6d7277;
}

#content::-webkit-scrollbar-thumb {
  background-color: #4a5c6d;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #f3f4f6;
  color: #4a5c6d;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #fff;
  background: #3bafda;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  padding: 20px;
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    margin-left: -270px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}

@media (min-width: 1367px) {
  #content {
    width: 860px;
  }
}

@media (max-width: 992px) {
  #content {
    width: 200px;
  }
}

@media (max-width: 768px) {
  #content {
    width: 330px;
  }
}
</style>
