<template>
<div>
    <PageHeader :title="title" :items="items" />
   
   
    <!-- end row -->
    <div class="row">
        <!-- Table -->
        <div class="col-xl-12">
            <Portlet :headertitle="tableTitle">
                {{users}}
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
                                <tr v-for="sellingData in productData" :key="sellingData.id">
                                    <td>{{ sellingData.productid }}</td>
                                    <td>{{ sellingData.name }}</td>
                                    <td>{{ sellingData.price }}</td>
                                    <td>{{ sellingData.quantity }}</td>
                                    <td>{{ sellingData.amount }}</td>
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
    head() {
        return {
            title: `Sales Dashboard | Minton - Nuxtjs Responsive Admin Dashboard Template`,
            users:[]
        };
    },
    middleware: 'router-auth',
    data() {
        return {
            title: "Welcome !",
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
            productData: [{
                    name: "ASOS Ridley High Waist",
                    price: "$79.49",
                    quantity: 82,
                    amount: "$6,518.18",
                    date: "Sep 1, 2018",
                    sales: 54,
                    productid: 200125
                }
            ]
        };
    },
    async fetch() {
      this.users = await this.$axios.$get('http://localhost/chat-app/twillo-api/api/get-influencers')
      console.log(this.users)
    },
};
</script>