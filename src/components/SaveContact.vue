<template>
  <div>
    <div class="startChatButton">
      <Button
        size="large"
        type="primary"
        shape="circle"
        style="width:260px"
        @click="modal6 = true"
        >Add New Contact</Button
      >
    </div>
    <Modal
      v-model="modal6"
      title="Add New Contact"
      :loading="loading"
      @on-ok="handleSubmit('contact')"
    >
      <Form ref="contact" :model="contact" :rules="ruleInline">
        <FormItem label="First Name" prop="firstName">
          <i-input v-model="contact.firstName" placeholder="Enter first name" />
        </FormItem>
        <FormItem label="Last Name" prop="lastName">
          <i-input v-model="contact.lastName" placeholder="Enter last name" />
        </FormItem>
        <FormItem label="Email" prop="email">
          <i-input v-model="contact.email" placeholder="Enter email" />
        </FormItem>
        <FormItem label="Phone" prop="phone">
          <i-input v-model="contact.phone" placeholder="Enter Phone">
            <Select
              slot="prepend"
              style="width: 100px"
              v-model="contact.countryCode"
            >
              <Option
                v-for="(item, index) in countryCodeList"
                :value="item"
                :key="item"
                >{{ index }}</Option
              >
            </Select>
          </i-input>
        </FormItem>
        <FormItem label="City">
          <i-input v-model="contact.city" placeholder="Enter city" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { Modal, Button, Input, FormItem, Form, locale } from "view-design";
import { mapState, mapMutations } from "vuex";
import { APIService } from "../ApiService";
import lang from "iview/dist/locale/en-US";

locale(lang);
export default {
  components: {
    Modal,
    Button,
    "i-input": Input,
    FormItem,
    Form
  },
  computed: {
    ...mapState(["contacts"])
  },
  data() {
    return {
      modal6: false,
      loading: true,
      contact: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "91",
        city: ""
      },
      countryCodeList: { "India (+91)": "91" },
      ruleInline: {
        firstName: [
          {
            required: true,
            message: "Please fill in the first name",
            trigger: "blur"
          }
        ],
        lastName: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "Please fill in the phone Number.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 10,
            message: "The phone number cannot be less that 10 digits",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Mail cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["add_contacts"]),
    asyncOK() {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    },
    handleSubmit(contact) {
      this.$refs[contact].validate(valid => {
        if (valid) {
          this.$Message.success("Contact Saved Successfully!");
        } else {
          this.$Message.error(
            "Could not save contact! Check for validations issue."
          );
        }
      });
      APIService.post("/contacts", this.contact).then(response => {
        let contacts = response.data;
        this.add_contacts(contacts);
      });
    }
  }
};
</script>
<style scoped>
/* .startChatButton {
  margin: 20px 10px 10px 35px;
} */
</style>
