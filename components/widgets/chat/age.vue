<template>
  <div id="content">
    <h4>Age</h4>
    <div class="content-description mt-3 mb-3">
      <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
      <h5>
        <span>18+</span>
      </h5>
      <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
    </div>
    <div class="content-description mt-3 mb-3">
      <h5>
        <span>21+</span>
      </h5>
      <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
    </div>
<!--    <div class="content-description mt-3 mb-3">-->
<!--      <h5>-->
<!--                                  <span-->
<!--                                    v-on:click="-->
<!--                                      ageFilterColor('eighteen_above')-->
<!--                                    "-->
<!--                                    v-bind:class="{-->
<!--                                      'text-primary': colors.eighteen_above,-->
<!--                                    }"-->
<!--                                  >-->
<!--                                    18+</span-->
<!--                                  >-->
<!--      </h5>-->
<!--      <div>-->
<!--                                  <span-->
<!--                                  >{{ recipents.eighteen_plus }} Members</span-->
<!--                                  >-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="content-description mt-3 mb-3">-->
<!--      <h5>-->
<!--                                  <span-->
<!--                                    v-on:click="-->
<!--                                      ageFilterColor('twenty_one_above')-->
<!--                                    "-->
<!--                                    v-bind:class="{-->
<!--                                      'text-primary': colors.twenty_one_above,-->
<!--                                    }"-->
<!--                                  >-->
<!--                                    21+</span-->
<!--                                  >-->
<!--      </h5>-->
<!--      <div>-->
<!--                                  <span>-->
<!--                                    {{ recipents.twenty_one_plus }}-->
<!--                                    Members-->
<!--                                  </span>-->
<!--      </div>-->
<!--    </div>-->
    <div>
      <h5>Custom Age</h5>
      <div>
        <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
        <b-form-select
          :options="ageOptions"
          v-model="ageFilter.age_type"
          class="w-50 mb-1"
        ></b-form-select>
        <b-form-input placeholder="Enter Age" class="w-50 mb-1"></b-form-input>
        <b-form-input v-if="ageFilter.age_type  == 'Between'" placeholder="Enter end Age" class="w-50 mb-1"></b-form-input>
        <button
          class="btn btn-primary" >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Register component
 */
export default {
  name: "AgeTab",
  data() {
    return {
      ageOptions: [
        { value: "Between", text: "Between" },
        { value: "Under", text: "Under" },
        { value: "Over", text: "Over" },
        { value: "Exactly", text: "Exactly" },
      ],
      ageFilter: {
        age_type: "",
      },
    };
  },

  mounted() {

  },


};
</script>
