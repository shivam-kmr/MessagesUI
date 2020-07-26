<template>
  <div class="layout" v-show="!loading">
    <Sider hide-trigger class="sidenav" width="350">
      <div class="logo">
        <a href="/"><Icon type="ios-send" size="70" color="White"/></a>
        <div class="toptext">Conversations</div>
      </div>
      <Divider />
      <VuePerfectScrollbar class="scroll-area" v-once :settings="settings">
        <Card
          v-for="person in contacts"
          :to="'/conversations?id=' + person._id"
          :key="person._id"
          style="width:340px"
        >
          <div class="contactCard">
            <Avatar>{{
              person.firstName.charAt(0) + person.lastName.charAt(0)
            }}</Avatar>
          </div>
          <div style="display: inline-block;">
            <h3 style="margin-left: 10px;vertical-align: middle;">
              {{ person.firstName + " " + person.lastName }}
            </h3>
            <h5 style="margin-left: 10px;vertical-align: middle;">
              {{ person.countryCode + "-" + person.mobile }}
            </h5>
          </div>
        </Card>
      </VuePerfectScrollbar>
    </Sider>
    <div class="container chat" style="margin-left: 400px;" :v-show="userInfo">
      <h2 class="text-primary text-center">
        {{ userInfo.firstName + " " + userInfo.lastName }}
      </h2>
      <h5 class="text-secondary text-center">
        {{ "+" + userInfo.countryCode + "-" + userInfo.mobile }}
      </h5>
      <div class="card">
        <div class="card-body">
          <p
            class="text-secondary nomessages"
            v-if="userConversations.length == 0"
          >
            [No messages yet!]
          </p>
          <div class="messages">
            <div
              v-for="message in userConversations.conversation"
              :key="message.id"
            >
              <span class="text-info"
                >[{{
                  userConversations.userInfo.firstName +
                    " " +
                    userConversations.userInfo.lastName
                }}]:
              </span>
              <span>{{ message.message }}</span>
              <span class="text-secondary time">{{
                getReadableTime(message.time)
              }}</span>
            </div>
          </div>
        </div>
        <div class="card-action">
          <CreateMessage :name="name" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Sider, Divider } from "view-design";
import { mapState, mapMutations } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import CreateMessage from "@/components/CreateMessage";
import { APIService } from "../ApiService";
export default {
  components: {
    Sider,
    Divider,
    VuePerfectScrollbar,
    CreateMessage
  },
  computed: {
    ...mapState(["contacts", "conversations"])
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 600
      },
      messages: [],
      name: "Shivam",
      userConversations: [],
      userInfo: {},
      loading: true
    };
  },
  mounted() {
    // if (
    //   JSON.stringify(this.contacts) === "{}" ||
    //   JSON.stringify(this.conversations) === "{}"
    // ) {
    //   this.$router.push({ name: "Home" });
    // }
    if (this.$route.query.id) {
      this.getContactDetails(this.$route.query.id);
    }
  },
  methods: {
    ...mapMutations(["set_contacts", "set_conversations", "set_selectedUser"]),
    getReadableTime(milliseconds) {
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString();
      return humanDateFormat;
    },
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
        this.loading = false;
      });
    },
    getContactDetails(id) {
      var endpoint = "/conversations/" + id;
      APIService.getApiData(endpoint).then(response => {
        this.userConversations = response.data.conversation;
        this.userInfo = response.data.userInfo;
        this.set_selectedUser(this.userInfo);
      });
      this.getDataFromApiCalls();
    }
  },
  watch: {
    "$route.query.id"(from, to) {
      this.getContactDetails(to);
    }
  }
};
</script>
<style scoped>
/* The sidebar menu */
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 260px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  background-color: rgb(42, 43, 46); /* Black */
  left: 0%;
}
/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
}
.startChatButton {
  margin: 20px 10px 10px 35px;
}
.toptext {
  color: rgb(232, 234, 225);
  font-size: 25px;
  margin-top: 18px;
  margin-left: 10px;
}
.logo {
  margin: 20px 0px 10px 35px;
  display: inline-flex;
}
.contactListItem {
  font-family: "Helvetica Neue";
  border: "3px 5px 3px 3px";
  font-size: "30px";
}
.scroll-area {
  position: relative;
  margin: 3px;
  width: 349px;
  height: 440px;
}
.ivu-card {
  background: #2a2b2e;
  color: #e8eaed;
}
.contactCard {
  display: inline-flex;
}
/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
.chat span {
  font-size: 1.2em;
}
.chat .time {
  display: block;
  font-size: 0.7em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
.container {
  max-width: 886px;
}
.card-body {
  min-width: 400px;
  min-height: 450px;
}
</style>
