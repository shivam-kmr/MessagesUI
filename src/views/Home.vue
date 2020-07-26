<template>
  <div class="vld-parent">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import { mapMutations } from "vuex";
import { APIService } from "../ApiService.js";
export default {
  data() {
    return {
      isLoading: true,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  mounted() {
    this.getDataFromApiCalls();
  },
  methods: {
    ...mapMutations(["set_contacts", "set_conversations"]),
    getDataFromApiCalls() {
      APIService.getApiData("/contacts").then(response => {
        let contacts = response.data;
        this.set_contacts(contacts);
        this.getConversationsData();
      });
    },
    getConversationsData() {
      APIService.getApiData("/conversations").then(response => {
        let conversations = response.data;
        this.set_conversations(conversations);
        this.isLoading = false;
        this.$router.push({ name: "Contacts" });
      });
    }
  }
};
</script>
