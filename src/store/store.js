import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: {},
    conversations: {},
    selectedUser: {},
    messages: [],
    message: {}
  },
  mutations: {
    set_contacts(state, contacts) {
      state.contacts = contacts;
    },
    set_conversations(state, conversations) {
      state.conversations = conversations;
    },
    add_contacts(state, contacts) {
      state.contacts.push(contacts);
    },
    set_selectedUser(state, selectedUser) {
      state.selectedUser = selectedUser;
    },
    set_messeges(state, messages) {
      state.messages = messages;
    },
    set_newmesseges(state, message) {
      state.messages.push(message);
    }
  }
});
