<template>
  <div>
    <PageHeader
      v-if="$auth.hasScope('admin')"
      :title="title"
      :items="adminItems"
    />
    <PageHeader
      v-if="$auth.hasScope('influencer')"
      :title="title"
      :items="influencerItems"
    />

    <!-- end row -->
    <div class="row">
      <!-- Table -->
      <div class="col-xl-12">
        <Portlet :headertitle="tableTitle" v-if="$auth.hasScope('admin')">
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
                    <!-- <th >Stats</th> -->
                  </tr>
                </thead>
                <tbody>
                  <template v-if="users.list">
                    <tr v-for="user in users.list" :key="user.id">
                      <td>{{ user.fname ? user.fname : user.name }}</td>
                      <td>{{ user.lname }}</td>
                      <td>{{ user.phone_no }}</td>
                      <td>{{ user.email }}</td>
                      <td>
                        {{
                          user.hasOwnProperty("country") && user.country
                            ? user.country.country_name
                            : ""
                        }}
                      </td>
                      <td>
                        <ul class="list-inline table-action m-0">
                          <a
                            @click="
                              $router.push(`/influencers/${user.user_uuid}`)
                            "
                            class="action-icon px-1"
                            ><i class="mdi mdi-square-edit-outline"></i
                          ></a>
                        </ul>
                      </td>
                      <!--  <td>
                        <a
                              @click="
                                $router.push(`/influencers/stats/${user.user_uuid}`)
                              "
                              class="action-icon px-1"
                              >Stats</a>
                      </td> -->
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </Portlet>
        <Portlet v-else>
          <div class="text-center">
            <h1 class="m-4">This Dashboard for Influencer</h1>
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
      title: "Dashboard",
    };
  },
  // middleware: 'router-auth',
  data() {
    return {
      title: "Welcome !",
      total_contacts: 0,
      send_message_count: 0,
      received_message_count: 0,
      users: [],
      adminItems: [
        {
          text: "Influencer Listing",
          active: true,
        },
      ],
      influencerItems: [
        {
          text: "Dashboard",
          active: true,
        },
      ],
      tableTitle: "In Fluencer Users",
    };
  },
  computed: {},

  created() {
    if (this.$auth.hasScope("influencer")) {
      this.$store
        .dispatch("influencer/getInfluencerDashboardInfo")
        .then((response) => {
          this.total_contacts = response.data.data.total_contacts;
          this.send_message_count = response.data.data.user.send_message_count;
          this.received_message_count =
            response.data.data.user.received_message_count;
        });
    }

    this.$store.dispatch("getInfluencers").then((response) => {
      this.users = response.data.data;
      console.log(response.data.data);
    });
  },
};
</script>
