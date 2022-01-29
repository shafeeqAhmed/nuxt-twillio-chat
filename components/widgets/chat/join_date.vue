<template>
  <div id="content">
    <h4>Join Date</h4>
    <p>Suggested dates</p>

    <div class="content-description" :class="{'alert alert-danger':  date == 'last24hours'}">
      <a href="#" class="close" v-if="date == 'last24hours'" @click="updateDate('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5 @click="updateDate('last24hours')" >
        Joined: Last 24 hours
      </h5>
      <div>
        <span >joined {{ recipents.last24hours }} Members</span>
      </div>
    </div>

    <div class="content-description"  :class="{'alert alert-danger':  date == 'last7days'}">
      <a href="#" class="close" v-if="date == 'last7days'" @click="updateDate('')" data-dismiss="alert" aria-label="close">&times;</a>

      <h5 @click="updateDate('last7days')" >
        Joined: Last 7 days
      </h5>
      <div>
        <span >joined {{ recipents.last7days }} Members</span>
      </div>
    </div>

<div class="content-description"  :class="{'alert alert-danger':  date == 'last30days'}">
  <a href="#" class="close" v-if="date == 'last30days'" @click="updateDate('')" data-dismiss="alert" aria-label="close">&times;</a>

  <h5 @click="updateDate('last30days')" >
        Joined: Last 30 days
      </h5>
      <div>
        <span >joined {{ recipents.last30days }} Members</span>
      </div>
</div>
        <div>
            <h5>Custom</h5>
            <b-form-select :options="options" v-model="search_type" @change="updateDate('')" class="w-50 mb-1"></b-form-select>
            <b-form-input type="date" v-model="customStartDate" placeholder="date" class="w-50 mb-1"></b-form-input>
            <b-form-input type="date" v-model="customEndDate"  v-if="search_type  == 'Between'" placeholder="end date" class="w-50 mb-1"></b-form-input>
        </div>
    <div class="row mt-3">
      <button
        @click="applyFilter"
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
export default {
  data() {
    return {
        recipents:[],
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'Between', text: 'Between' },
          { value: 'Before', text: 'Before' },
          { value: 'After', text: 'After' },
          { value: 'On', text: 'On' },
        ],
        colors: {
        last24hours: false,
        last7days: false,
        last30days: false,
      },
      search_type: "",
      date:'',
      customStartDate: '',
      customEndDate: '',

    };
  },
  methods: {
    updateDate(date) {
      this.date = date
    },
    applyFilter() {

      if(!this.date && !this.customStartDate) {
        return;
      }else {

        if(this.customStartDate && this.customEndDate) {
          if(this.customEndDate <= this.customStartDate) {
            alert('End Date must be greater or equal to start date')
            return;
          }
        }
        let data= {
          key:'joinDate',
          val: {
            search_type: this.search_type,
            date: this.date,
            customStartDate: this.customStartDate,
            customEndDate: this.customEndDate,
          }
        }
        this.$store.commit('chat/filterData',data)
      }
    },
    async getRecipents() {
      const recipents = await this.$axios.$get("/duration_filter");
      this.recipents = recipents.data;
    },
  },

  mounted() {
    this.getRecipents();
  }
}


</script>
<style scoped>
.content-description {
  border-bottom: 1px solid#5C6777;
}
.content-description h5:hover {
  cursor: pointer;
  font-weight: 600;
}
.close{
  color: red;
}
</style>
