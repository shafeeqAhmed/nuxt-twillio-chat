<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  props: {
    showModal: {
      required,
      Boolean,
    },
    type: {
      String,
      required,
    },
  },
  data() {
    return {
      uuid: "",
      isEdit: false,
      submitted: false,
      form: {
        keyword: "",
      },
      // form: {
      //   keyword: "",
      //   text: "",
      // },
    };
  },

  validations: {
    form: {
      keyword: {
        required,
      },
      text: {
        required,
      },
    },
  },
  methods: {
    handleSubmit(e) {
      // return true;
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      e.preventDefault();
      if (this.$v.$anyError) {
        return true;
      }
      let url = "";
      if (this.type == "add") {
        url = "/add-auto-message";
      }
      this.$axios.$post(url, this.form).then((response) => {
        console.log(response);
        this.$emit("closeModal");
      });
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
    hideModal(e) {
      e.preventDefault();
      this.$emit("closeModal");
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <b-modal
      v-model="showModal"
      title="Keyword For Message"
      @ok="handleSubmit"
      @cancel="hideModal"
      centered
    >
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="keyword">
            Keyword
            <span class="text-danger">*</span>
          </label>
          <input
            id="keyword"
            v-model="form.keyword"
            name="keyword"
            class="form-control"
            type="text"
            placeholder="Enter Keyword"
            :class="{ 'is-invalid': submitted && $v.form.keyword.$error }"
          />
          <div class="invalid-feedback">This value is required.</div>
        </div>

        <div class="form-group">
          <label for="text">
            Text
            <span class="text-danger">*</span>
          </label>
          <textarea
            rows="5"
            style="width: 100%"
            v-model="form.text"
            :class="{ 'is-invalid': submitted && $v.form.text.$error }"
          ></textarea>
          <div class="invalid-feedback">This value is required.</div>
        </div>
        <template>
          <div class="w-100">
            <p class="float-left">Modal Footer Content</p>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="show = false"
            >
              Close
            </b-button>
          </div>
        </template>
      </form>
    </b-modal>
  </div>
</template>
