<template>
<div>
    <PageHeader :title="title" :items="items" />
       <!-- end row -->
    <div class="row">
        <!-- Table -->
        <div class="col-xl-12">
            <Portlet :headertitle="tableTitle"  v-if="$auth.hasScope('admin')">
<!--              <div class="row"><div class="col-sm-3">-->

<!--                 <nuxt-link to="/influencers/add" class="btn btn-primary waves-effect waves-light">  <i class="fe-plus mr-1"></i>Add New</nuxt-link>-->

<!--                 </div> </div><br>-->

                <div class="card-body pt-0">
                    <div class="table-responsive mb-0">
                        <table class="table table-hover table-centered mb-0">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                   <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                <template v-if='users.list'>
                                <tr   v-for="user in users.list" :key="user.id">
                                    <td>{{ user.fname ? user.fname : user.name }}</td>
                                    <td>{{ user.lname }}</td>
                                    <td>{{ user.phone_no }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.hasOwnProperty('country') && user.country ? user.country.country_name : '' }}</td>
                                    <td>
                                        <ul class="list-inline table-action m-0">
                                            <li class="list-inline-item">
                                     <a  @click="$router.push(`/influencers/${user.user_uuid}`)"class="action-icon px-1"><i class="mdi mdi-square-edit-outline"></i></a >
                                        </li> </ul>

                                    </td>
                                </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Portlet  >
          <Portlet  v-else>
            <h1>This Dashboard for Influencer</h1>
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
            title: 'Dashboard',

        };
    },
    // middleware: 'router-auth',
    data() {
        return {
            title: "Welcome !",
             users:[],
            items: [
                {
                    text: "In Fluencder Listing",
                    active: true
                }
            ],
            tableTitle: "In Fluencer Users",
        };
    },
  computed: {

  },


  created() {

this.$store.dispatch('getInfluencers')
.then(response => {
      this.users=response.data.data
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
