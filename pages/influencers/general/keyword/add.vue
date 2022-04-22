<script>
import { required } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  async fetch() {},
  created() {
    this.uuid = this.$route.query.uuid;
    if (this.uuid) {
      this.$axios
        .$get(`/get-auto-message-detail/${this.uuid}`)
        .then((response) => {
          const {
            detail: { keyword, text, status },
          } = response.data;
          this.form.text = text;
          this.form.keyword = keyword;
          this.form.status = status == "Active" ? true : false;
        });
    }
  },
  data() {
    return {
      errors: {},
      title: "Add Keyword",
      submitted: false,
      uuid: "",
      isDisabled: false,
      form: {
        keyword: "",
        text: "",
        status: "",
      },
      statusMenu: [
        {
          name: "Active",
          value: true,
        },
        {
          name: "Inactive",
          value: false,
        },
      ],
      items: [
        {
          text: "",
          active: true,
        },
      ],
    };
  },
  computed: {},
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
      if (this.$v.$anyError) {
        return true;
      }
      let url = "";
      if (this.uuid) {
        this.form.uuid = this.uuid;
        url = "/update-auto-message";
      } else {
        url = "/add-auto-message";
        this.form.status == "" ? delete this.form.status : "";
      }
      this.$axios
        .$post(url, this.form)
        .then((response) => {
          const { status, message } = response.data;
          if (status) {
            // Swal.fire(message);
            this.$router.push("/influencers/general/keyword");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
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
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <b-button
                  variant="primary"
                  to="/influencers/general/keyword"
                  type="button"
                >
                  Back
                </b-button>
              </div>
              <div class="col-8">
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
                      :class="{
                        'is-invalid': submitted && $v.form.keyword.$error,
                      }"
                    />
                    <div class="invalid-feedback">This value is required.</div>
                    <div
                      class="text-danger"
                      v-if="errors.hasOwnProperty('keyword')"
                    >
                      {{ errors.keyword[0] }}
                    </div>
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
                      :class="{
                        'is-invalid': submitted && $v.form.text.$error,
                      }"
                    ></textarea>
                    <div class="invalid-feedback">This value is required.</div>
                  </div>

                  <div class="form-group">
                    <label for="text">
                      Status
                      <span class="text-danger">*</span>
                    </label>
                    <div class="col-12 p-0">
                      <select class="custom-select" v-model="form.status">
                        <option
                          v-for="(menu, key) in statusMenu"
                          :key="key"
                          :value="menu.value"
                          :selected="form.status == menu.name"
                        >
                          {{ menu.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div class="float-right">
                        <b-button
                          variant="btn btn-secondary m-l-5 ml-1"
                          type="button"
                          to="/influencers/general/keyword"
                        >
                          Cancel
                        </b-button>
                        <b-button variant="primary" type="submit">
                          Submit
                        </b-button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </div>
        <!-- end card-box -->
      </div>
    </div>
  </div>
</template>
