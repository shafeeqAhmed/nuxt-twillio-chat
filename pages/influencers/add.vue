<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="header-title m-t-0">Add Users Form</h4> -->
            <form action="#" @submit.prevent="tryToRegisterIn">
              <div class="form-group">
                <label for="fname">First Name</label>
                <input
                  class="form-control"
                  v-model="fname"
                  type="text"
                  id="fname"
                  placeholder="Enter your first name"
                  :class="{ 'is-invalid': submitted && $v.fname.$error }"
                />
                <div
                  v-if="submitted && !$v.fname.required"
                  class="invalid-feedback"
                >
                  First Name is required.
                </div>
                  <span v-if="backendErrors.fname" class="text-danger">
                  {{ backendErrors.fname[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="fname">Last Name</label>
                <input
                  class="form-control"
                  v-model="lname"
                  type="text"
                  id="lname"
                  placeholder="Enter your Last name"
                  :class="{ 'is-invalid': submitted && $v.lname.$error }"
                />
                <div
                  v-if="submitted && !$v.lname.required"
                  class="invalid-feedback"
                >
                  Last Name is required.
                </div>
                  <span v-if="backendErrors.lname" class="text-danger">
                  {{ backendErrors.lname[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="emailaddress">Email address</label>
                <input
                  class="form-control"
                  v-model="email"
                  type="email"
                  id="emailaddress"
                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                  placeholder="Enter your email"
                />
                <div
                  v-if="submitted && $v.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.email.required">Email is required.</span>
                  <span v-if="!$v.email.email">Please enter valid email.</span>
                </div>
                <span v-if="backendErrors.email" class="text-danger">
                  {{ backendErrors.email[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="fname">Phone Number</label>
                <input
                  class="form-control"
                  v-model="phone_no"
                  type="text"
                  id="phone_no"
                  placeholder="Enter your Phone Number"
                  :class="{ 'is-invalid': submitted && $v.phone_no.$error }"
                />
                <div
                  v-if="submitted && !$v.phone_no.required"
                  class="invalid-feedback"
                >
                  Phone Number is required.
                </div>
                 <span v-if="backendErrors.phone_no" class="text-danger">
                  {{ backendErrors.phone_no[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="fname">password</label>
                <input
                  class="form-control"
                  v-model="password"
                  type="text"
                  id="password"
                  placeholder="Enter your Password"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                />
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >
                  Phone Number is required.
                </div>
                 <span v-if="backendErrors.password" class="text-danger">
                  {{ backendErrors.password[0] }}
                </span>
              </div>

              <div class="form-group">

                <label for="phno">
                  Country
                  <span class="text-danger">*</span>
                </label>
                <select
                  class="form-control"
                  v-model="country_id"
                  :class="{ 'is-invalid': submitted && $v.country_id.$error }"
                >
                  <option value="">Select</option>
                   <option v-for="country in countries" :value="country.id" :key="country.id">{{ country.country_name }}</option>
                </select>
                <div
                  v-if="submitted && !$v.country_id.required"
                  class="invalid-feedback"
                >
                  Country is required.
                </div>
                 <span v-if="backendErrors.country_id" class="text-danger">
                  {{ backendErrors.country_id[0] }}
                </span>
              </div>

              <div class="form-group">
                <label for="phno">
                  Twilio Number
                  <span class="text-danger">*</span>
                </label>
                <select
                  class="form-control"
                  v-model="twilio_id"
                  :class="{
                    'is-invalid': submitted && $v.twilio_id.$error,
                  }"
                >
                  <option value="">Select</option>
                <option v-for="number in twilio_numbers" :value="number.id" :key="number.id" v-if="number.status=='active'" >{{ number.phone_no }}</option>
                </select>
                <div
                  v-if="submitted && !$v.twilio_id.required"
                  class="invalid-feedback"
                >
                  Twilio Number is required.
                </div>
                 <span v-if="backendErrors.twilio_id" class="text-danger">
                  {{ backendErrors.twilio_id[0] }}
                </span>
              </div>

<!--              <div class="form-group">-->
<!--                <div class="checkbox checkbox-purple">-->
<!--                  <input id="checkbox6a" type="checkbox" />-->
<!--                  <label for="checkbox6a">Remember me</label>-->
<!--                </div>-->
<!--              </div>-->

              <div class="form-group text-right m-b-0">
                <button class="btn btn-primary" type="submit">Submit</button>
                <NuxtLink to="/" class="btn btn-secondary m-l-5 ml-1">
                  Cancel
                </NuxtLink>

              </div>
            </form>
          </div>
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>


<script>
/**
 * Form Validation component
 */
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "add",
  head() {
    return {
      title: `${this.title} | Influencer`,
    };
  },
  data() {
    return {
      title: "Add In Fluencer",
      items: [
        {
          text: "In Fluencers",
          to: "/",
        },
        {
          text: "Add Form",
          active: true
        },
      ],
      fname: "",
      lname: "",
      email: "",
      phone_no: "",
      password: "",
      country_id: "",
      twilio_id: "",
      backendErrors: {},
      submitted: false,
      countries:[],
      twilio_numbers:[]
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    fname: {
      required,
    },
    lname: {
      required,
    },
    phone_no: {
      required,
    },
    password: {
      required,
    },
    country_id: {
      required,
    },
    twilio_id: {
      required,
    },
  },
    methods: {
        // Try to register the user in with the email, username
        // and password they provided.
        tryToRegisterIn() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
               this.tryingToRegister = true;
                //     // Reset the regError if it existed.
                //     this.regError = null;
              if (!this.$v.$invalid && !this.isMatchPassword) {
                const payload = {
                    fname: this.fname,
                    lname: this.lname,
                    email: this.email,
                    phone_no: this.phone_no,
                  password: this.password,
                    country_id: this.country_id,
                  twilio_id: this.twilio_id,
                    terms: 'on',
                    baseDomain: 'customer',
                }

            this.$store.dispatch('createInfluencer', payload)
               .then(response => {
                   if(response.data.status) {

                    this.$router.push('/influencers');

                   }
               })
               .catch(error => {
                   this.backendErrors = error.response.data.errors
                })
                .catch(() => {
                   this.isDisabled = false

                })

            }


            }
        },
    },
     created() {


this.$store.dispatch('getInfluencersDropdowns')
.then(response => {
   if(response.data.status) {
        this.countries=response.data.data.countries;
        this.twilio_numbers=response.data.data.twillio_numbers;
   }
})
.catch(error => {
   this.backendErrors = error.response.data.errors
})
.catch(() => {
   this.isDisabled = false

})
  },
  // middleware: "router-auth",
};
</script>
