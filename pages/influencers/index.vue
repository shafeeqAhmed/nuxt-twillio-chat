<template>
<div>
    <PageHeader :title="title" :items="items" />
       <!-- end row -->
    <div class="row">
        <!-- Table -->
        <div class="col-xl-12">
            <Portlet :headertitle="tableTitle">
              <div class="row"><div class="col-sm-3">

                 <nuxt-link to="/influencers/add" class="btn btn-primary waves-effect waves-light">  <i class="fe-plus mr-1"></i>Add New</nuxt-link>
                
                   
                 </div> </div><br>
                
                <div class="card-body pt-0">
                    <div class="table-responsive mb-0">
                        <table class="table table-hover table-centered mb-0">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Twilio Number</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.fname}}</td>
                                    <td>{{ user.lname }}</td>
                                    <td>{{ user.phone_no }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.twilio_number }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Portlet>
        </div>
    </div>
   
</div>
</template>

<script>

export default {
     name: "index",
    head() {
        return {
            title: `Sales Dashboard | Minton - Nuxtjs Responsive Admin Dashboard Template`,
           
        };
    },
    middleware: 'router-auth',
    data() {
        return {
            title: "Welcome !",
             users:[],
            items: [{
                    text: "Minton"
                },
                {
                    text: "Dashboards"
                },
                {
                    text: "Sales",
                    active: true
                }
            ],
            tableTitle: "Users",
        };
    },
    
 
  created() {


this.$store.dispatch('getInfluencers')
.then(response => {
   if(response.data.status) {
      
      this.users=response.data.data
      
   }
})
.catch(error => {
   this.backendErrors = error.response.data.errors
})
.catch(() => {
   this.isDisabled = false

})
  },
};
</script>