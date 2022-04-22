<script>
import { mapState } from "vuex";

/**
 * Horizontal layout
 */
export default {
  name: "horizontal",
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  computed: mapState(["layout"]),
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };

    document.body.setAttribute("data-layout-mode", "horizontal");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper">
    <Topbar />
    <HorizontalNavbar
      v-if="windowWidth < 992"
      :type="layout.topbar"
      :width="layout.layoutWidth"
      :menu="layout.menuPosition"
    />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <Nuxt />
        </div>
      </div>
      <!-- content -->
      <Footer />
    </div>
    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->
    <Rightbar />
  </div>
</template>
