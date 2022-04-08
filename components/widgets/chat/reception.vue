<template>
  <div id="content" >
    <p>Recepients</p>
    <div class="content-description" role="alert" :class="{'alert alert-danger':  activity == '5'}">
      <a href="#" class="close" v-if=" activity == '5'" @click="updateActivity('')" data-dismiss="alert" aria-label="close">&times;</a>
      <h5  @click="updateActivity('5')">
        Top 5% Active
      </h5>
      <div>
        <span>
          {{$store.getters['chat/getCount']('top_5_percentage')}} Members
        </span>
      </div>
    </div>

    <div class="content-description" :class="{'alert alert-danger':  activity == '10'}">
      <a href="#" class="close" v-if="activity == '10'" @click="updateActivity('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5  @click="updateActivity('10')">Top 10% Active</h5>
      <div>
        <span>
          {{$store.getters['chat/getCount']('top_10_percentage')}} Members
        </span>
      </div>
    </div>
    <div class="content-description"  :class="{'alert alert-danger':  activity == '25'}">
      <a href="#" class="close" v-if="activity == '25'" @click="updateActivity('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5  @click="updateActivity('25')">Top 25% Active</h5>
      <div>
        <span>
          {{$store.getters['chat/getCount']('top_25_percentage')}} Members
        </span>
      </div>
    </div>
    <div class="content-description"   :class="{'alert alert-danger':  activity == 'all'}">
      <a href="#" class="close" v-if="activity == 'all'" @click="updateActivity('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5 @click="updateActivity('all')">Everyone</h5>
      <div>
          <span>
            {{$store.getters['chat/getCount']('total_fans')}} Members
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
      activity:'',
    };
  },

  watch: {
    '$store.state.chat.data.activity.activity': {
      handler(newVal) {
        this.activity = newVal
      }
    }
  },
  mounted(){
    let activity =  this.$store.state.chat.data['activity']
    if(Object.keys(activity).length > 0) {
      this.activity = activity['activity']
    }
  },
  methods: {
    updateActivity(activityType) {
      this.activity = activityType

    },
    getStoreGender() {
      let activity =  this.$store.state.chat.data['activity']
      if(Object.keys(activity).length > 0 && activity['gender'] != '') {
        return activity.gender
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
           activity: this.activity,
           gender: this.getStoreGender()
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

