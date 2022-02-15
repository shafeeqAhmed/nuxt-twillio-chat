<template>
  <div id="content" >

    <p>Gender</p>
    <div class="content-description" :class="{'alert alert-danger':  gender == 'male'}">
      <a href="#" class="close" v-if="gender == 'male'" @click="updateGender('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5  @click="updateGender('male')">Male</h5>
      <div>
          <span>
          {{$store.getters['chat/getCount']('total_males')}} Members
          </span>
      </div>
    </div>
    <div class="content-description"  :class="{'alert alert-danger':  gender == 'female'}">
      <a href="#" class="close" v-if="gender == 'female'" @click="updateGender('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5  @click="updateGender('female')">Female</h5>
      <div>
           <span>
              {{$store.getters['chat/getCount']('total_females')}} Members
           </span>
      </div>
    </div>
    <div class="content-description"  :class="{'alert alert-danger':  gender == 'non-binary'}">
      <a href="#" class="close" v-if="gender == 'non-binary'" @click="updateGender('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5  @click="updateGender('non-binary')">Non Binary</h5>
      <div>
           <span>
              {{$store.getters['chat/getCount']('gender_non_binary')}} Members
           </span>
      </div>
    </div>
    <div class="content-description"  :class="{'alert alert-danger':  gender == 'other'}">
      <a href="#" class="close" v-if="gender == 'other'" @click="updateGender('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5  @click="updateGender('other')">Others</h5>
      <div>
           <span>
              {{$store.getters['chat/getCount']('gender_other')}} Members
           </span>
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
  name: "ReceptionTab",
  data() {
    return {
      gender:'',
    };
  },

  watch: {
    '$store.state.chat.data.activity.gender': {
      handler(newVal) {
        this.gender = newVal
      }
    },
  },
  mounted(){
    let activity =  this.$store.state.chat.data['activity']
    if(Object.keys(activity).length > 0) {
      this.gender = activity['gender']
    }
  },
  methods: {
    updateGender(genderType) {
      this.gender = genderType
    },
    getStoreActivity() {
      let activity =  this.$store.state.chat.data['activity']
      if(Object.keys(activity).length > 0 && activity['activity'] != '') {
        return activity.activity
      }
      return '';
    },
    applyFilter() {
      if(!this.activity && !this.gender) {
        alert('please select filter first')
      }else {
        let data= {
          key:'activity',
          val: {
            activity: this.getStoreActivity(),
            gender: this.gender
          }
        }
        this.$store.commit('chat/filterData',data)
        this.$store.dispatch('chat/getFilterCountFromApi')
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
.selected-data{
  color: #fff;
  background: #0062cc;
  font-size: x-large;
}
.close {
  color: red;
}
</style>

