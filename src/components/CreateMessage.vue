<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter message ..."
          v-model="newMessage"
          style="display: inline-block;width: 85%;"
        />
        <button
          class="btn btn-primary"
          type="submit"
          name="action"
          style="margin-left: 10px;"
        >
          Submit
        </button>
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { APIService } from "../ApiService";
export default {
  name: "CreateMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      errorText: null,
      messegeObject: {
        message: null,
        userId: null,
        to: null,
        countryCode: null
      }
    };
  },
  computed: {
    ...mapState(["contacts", "conversations", "selectedUser"])
  },
  methods: {
    ...mapMutations(["set_contacts", "set_conversations", "set_selectedUser"]),
    createMessage() {
      if (this.newMessage) {
        this.errorText = "";
        var otp = this.getRandomGeneratedOTP();
        var text = "OTP: " + otp + ". Your Custom Message" + this.newMessage;
        this.messegeObject.message = text;
        this.messegeObject.userId = this.selectedUser._id;
        this.messegeObject.countryCode = this.selectedUser.countryCode;
        this.messegeObject.to = this.selectedUser.phone;

        APIService.post("/messages", this.messegeObject).then(response => {
          let message = response.data;
          this.add_message(message);
        });
      } else {
        this.errorText = "A message must be entered first!";
      }
    },
    getRandomGeneratedOTP() {
      return Math.floor(100000 + Math.random() * 900000);
    }
  }
};
</script>
