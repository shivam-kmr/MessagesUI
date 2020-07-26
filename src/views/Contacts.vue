<template>
  <div class="layout">
    <Sider hide-trigger class="sidenav" width="350">
      <div class="logo">
        <a href="/"
          ><Icon type="ios-contact-outline" size="70" color="White"
        /></a>
        <div class="toptext">Messages</div>
      </div>
      <div>
        <SaveContact />
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
        <!-- <List>
          <ListItem v-for="person in contacts" :key="person._id">
            <a v-bind:href="'/contacts/' + person._id">
              <ListItemMeta
                :title="person.firstName + ' ' + person.lastName"
                :description="person.countryCode + '-' + person.mobile"
                color="#2d8cf0"
              >
                <template slot="avatar">
                  <Avatar
                    style="background-color: #87d068"
                    size="large"
                    icon="ios-person"
                  />
                </template>
              </ListItemMeta>
            </a>
          </ListItem>
        </List> -->
      </VuePerfectScrollbar>
    </Sider>
    <div class="generalBackground"></div>
  </div>
</template>
<script>
import { Sider, Divider } from "view-design";
import { mapState } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import SaveContact from "./../components/SaveContact.vue";
export default {
  components: {
    Sider,
    Divider,
    VuePerfectScrollbar,
    SaveContact
  },
  computed: {
    ...mapState(["contacts", "conversations"])
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 600,
        selectedContact: {}
      }
    };
  },
  created() {
    if (
      JSON.stringify(this.contacts) === "{}" ||
      JSON.stringify(this.conversations) === "{}"
    ) {
      this.$router.push({ name: "Home" });
    }
    console.log(this.$route);
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
</style>
