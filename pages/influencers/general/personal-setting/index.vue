<script>
import Swal from "sweetalert2";

export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  async fetch() {
    this.getDefaultSetting();
    this.getPersonalSetting();
  },
  data() {
    return {
      title: "Settings",
      items: [],
      showModal: false,
      isDisabled: false,
      term_and_condition: "",
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
      option: {
        theme: "bubble",
        modules: {
          toolbar: [
            [],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
              "blockquote",
            ],
          ],
        },
      },
    };
  },
  methods: {
    async getDefaultSetting() {
      const {
        data: { defaultSetting },
      } = await this.$axios.$get(
        "/get-person-default-setting/term_and_condition"
      );
      this.term_and_condition = defaultSetting.value;
    },
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
      let text = this.form.value + this.term_and_condition;
      if (this.form.name == "welcome" && text.length > 255) {
        alert("Signup message can contaim max 255 charters");
        return true;
      }
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
  computed: {
    terms() {
      let text =
        this.form.value.replace(/<(.|\n)*?>/g, "") +
        ". " +
        this.term_and_condition;
      console.log(text.trim());
      return text.trim();
    },
    characterCount() {
      let text = this.form.value + " " + this.term_and_condition;
      return text.length;
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
        <!-- <b-input v-model="form.value" class="form-controll" /> -->
        <textarea
          rows="5"
          style="width: 100%"
          v-model="form.value"
          class="textarea-style"
        ></textarea>

        <!-- <div>
          <quill-editor :options="option" v-model="form.value" />
        </div> -->
        <div class="terms-and-condition" v-if="form.name == 'welcome'">
          <i>
            <b>
              {{ terms }}
            </b>
          </i>
        </div>
        <div class="float-right">
          <b> {{ characterCount }} / 255 </b>
        </div>
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
<style scoped>
.terms-and-condition {
  box-sizing: border-box;
  line-height: 1.42;
  outline: none;
  overflow-y: auto;
  padding: 12px 15px;
  -o-tab-size: 4;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
.textarea-style {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #94a0ad;
  text-align: left;
  background: none;
  padding: 5px;
}
</style>
