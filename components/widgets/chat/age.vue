<template>
  <div id="content">
    <h4>Age</h4>
    <div class="content-description mt-3 mb-3" :class="{'alert alert-danger':  age == '18+'}">
      <a href="#" class="close" v-if="age == '18+'" @click="updateAgeFilter('')" data-dismiss="alert" aria-label="close">&times;</a>
      <h5 @click="updateAgeFilter('18+')" >
        <span>18+</span>
      </h5>
      <div>
          <span>
            {{$store.getters['chat/getCount']('eighteen_plus')}} Members
          </span>
      </div>
    </div>
    <div class="content-description mt-3 mb-3" :class="{'alert alert-danger':  age == '21+'}">
      <a href="#" class="close" v-if="age == '21+'" @click="updateAgeFilter('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5 @click="updateAgeFilter('21+')" >
        <span>21+</span>
      </h5>
      <div>
          <span>
            {{$store.getters['chat/getCount']('twenty_one_plus')}} Members
          </span>
      </div>
    </div>
    <div>
      <h5>Custom Age</h5>
      <div>
        <hr role="separator" aria-orientation="horizontal" class="dropdown-divider">
        <b-form-select
          :options="ageOptions"
          v-model="customFilterType"
          @change="updateAgeFilter('')"
          class="w-50 mb-1"
        ></b-form-select>

        <div v-if="customFilterType  != ''">
          <b-form-input min="1" v-model="customStartAge"  type="number" placeholder="Enter Age" class="w-50 mb-1"></b-form-input>
          <b-form-input min="1" v-model="customEndAge" type="number" v-if="customFilterType  == 'Between'" placeholder="Enter end Age" class="w-50 mb-1"></b-form-input>
        </div>

      </div>
    </div>
    <div class="row mt-3">
      <button
        @click="applyFilter()"
        class="btn btn-primary ml-2">
        Apply
      </button>
      <button
        @click="$emit('closeModel')"
        class="btn btn-secondary ml-2">
        Cancel
      </button>
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
      age:'',
      customFilterType:'',
      customStartAge:'',
      customEndAge:'',
    };
  },
  mounted(){
    let age =  this.$store.state.chat.data['age']
    if(Object.keys(age).length > 0) {
      this.age = age['age']
      this.customFilterType = age['customFilterType']
      this.customStartAge = age['customStartAge']
      this.customEndAge = age['customEndAge']
    }
  },
methods:{
    updateAgeFilter(age){
      this.age = age
      if(this.age != '') {
        this.customFilterType=''
        this.customStartAge=''
        this.customEndAge=''
      }
    },
  applyFilter() {
    if(!this.age && !this.customStartAge) {
      alert('please select filter first')
    }else {
      let data= {
        key:'age',
        val: {
          age: this.age,
          customStartAge: this.customStartAge,
          customEndAge: this.customEndAge,
          customFilterType: this.customFilterType,
        }
      }
      this.$store.commit('chat/filterData',data)
      this.$emit('closeModel')
    }
  }
}


};
</script>
<style scoped>
.content-description {
  border-bottom: 1px solid#5C6777;
}
.content-description h5:hover {
  cursor: pointer;
  font-weight: 600;
}
.close {
  color: red;
}
</style>
