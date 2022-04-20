<script>
import Swal from "sweetalert2";

export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  async fetch() {
    this.getPersonalSetting();
  },
  data() {
    return {
      title: "Settings",
      items: [],
      showModal: false,
      isDisabled: false,
      form: {
        name: "",
        value: "",
      },
      timelineData: [
        {
          button: "Settings",
        },
        {
          type: "Welcome Message",
          value: "",
          align: "left",
          name: "welcome",
        },
        {
          type: "Sign Up Confirmation",
          value: " ",
          name: "signup_confirmation",
        },

        {
          type: "Minimum Age",
          value: "",
          align: "left",
          name: "min_age",
        },
      ],
    };
  },
  methods: {
    async getPersonalSetting() {
      const {
        data: { personalSetting },
      } = await this.$axios.$get("/get-personal-setting");
      console.log(this.timelineData);
      personalSetting.forEach((element) => {
        if (element.name == "welcome") {
          this.timelineData[1].value = element.value;
        }
        if (element.name == "signup_confirmation") {
          this.timelineData[2].value = element.value;
        }
        if (element.name == "min_age") {
          this.timelineData[3].value = element.value;
        }
      });
    },
    openModal(data) {
      this.form.type = data.type;
      this.form.name = data.name;
      this.form.value = data.value;
      this.showModal = true;
    },
    save() {
      this.isDisabled = true;
      this.$axios
        .$post("add-personal-setting", this.form)
        .then((response) => {
          this.getPersonalSetting();
          const { status, message } = response.data;
          if (status) {
            this.isDisabled = false;
            this.showModal = false;
            // Swal.fire(message);
          }
        })
        .catch((error) => {
          this.isDisabled = false;
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
        <div class="timeline" dir="ltr">
          <article
            v-for="(data, key) in timelineData"
            :key="key"
            :class="{ 'timeline-item-left': `${data.align}` === 'left' }"
            class="timeline-item"
          >
            <div v-if="data.button">
              <h2 class="m-0 d-none">&nbsp;</h2>
              <div v-if="data.button" class="time-show mt-3">
                <a
                  href="javascript: void(0);"
                  class="btn btn-primary width-lg"
                  >{{ data.button }}</a
                >
              </div>
            </div>
            <div class="timeline-desk">
              <div v-if="!data.button" class="timeline-box">
                <span
                  :class="{
                    'arrow-alt': `${data.align}` === 'left',
                    arrow: `${data.align}` !== 'left',
                  }"
                ></span>
                <span class="timeline-icon">
                  <i class="mdi mdi-adjust"></i>
                </span>
                <h4 class="mt-0 font-16">{{ data.type }}</h4>
                <p class="text-muted"></p>
                <p class="mb-0">{{ data.value }}</p>
                <div class="timeline-album">
                  <a href="javascript: void(0);" @click="openModal(data)">
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
        <!-- end timeline -->
      </div>
      <!-- end col -->
    </div>
    <b-modal v-model="showModal" :title="form.type" centered>
      <div class="form-group" v-if="form.name == 'min_age'">
        <label for="text">
          Minimum age
          <span class="text-danger">*</span>
        </label>
        <div class="col-12 p-0">
          <select class="custom-select" v-model="form.value">
            <option v-for="(menu, key) in 80" :key="key" :value="menu">
              {{ menu }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group" v-else>
        <textarea rows="5" style="width: 100%" v-model="form.value"></textarea>
      </div>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModal = false"
          >Close</b-button
        >
        <b-button :disabled="isDisabled" variant="primary" @click="save()">
          Save
          <i class="fab fa-telegram-plane ml-1"></i>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
