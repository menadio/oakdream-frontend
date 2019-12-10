<template>
  <div class="mt-8 px-5 py-3 bg-white border rounded-lg shadow">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <h3>Create Account</h3>

    <hr class="mb-5" />

    <!-- new account form -->
    <div class="w-full pb-5">
      <form @submit.prevent="createAccount()">
        <div class="w-full flex mb-3 -mx-2">
          <div class="w-1/2 px-2">
            <label class="block mb-1 text-gray-600" for="firstname"
              >First Name</label
            >
            <input
              v-model="formData.firstname"
              class="w-full block mb-1 px-3 py-2 bg-gray-200 focus:bg-gray-300 focus:outline-none"
              type="text"
              required
            />
          </div>

          <div class="w-1/2 px-2">
            <label class="block mb-1 text-gray-600" for="lastname"
              >Last Name</label
            >
            <input
              v-model="formData.lastname"
              class="w-full block mb-1 px-3 py-2 bg-gray-200 focus:bg-gray-300 focus:outline-none"
              type="text"
              required
            />
          </div>
        </div>

        <div class="w-full flex mb-3 -mx-2">
          <div class="w-1/2 px-2">
            <label class="block mb-1 text-gray-600" for="email">Email</label>
            <input
              v-model="formData.email"
              class="w-full block mb-1 px-3 py-2 bg-gray-200 focus:bg-gray-300 focus:outline-none"
              type="email"
              required
            />
          </div>

          <div class="w-1/2 px-2">
            <label class="block mb-1 text-gray-600" for="phone"
              >Phone Number</label
            >
            <input
              v-model="formData.phone"
              class="w-full block mb-1 px-3 py-2 bg-gray-200 focus:bg-gray-300 focus:outline-none"
              type="tel"
              required
            />
          </div>
        </div>

        <div class="w-full mb-3">
          <div class="w-full">
            <label class="block mb-1 text-gray-600" for="address"
              >Address</label
            >
            <textarea
              v-model="formData.address"
              class="w-full px-3 py-2 bg-gray-200 focus:bg-gray-300 focus:outline-none"
              cols="30"
              rows="5"
              required
            ></textarea>
          </div>
        </div>

        <button
          class="px-4 py-2 text-black text-sm bg-gray-200 hover:bg-gray-400 rounded shadow-lg"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "CreateAccount",

  data() {
    return {
      isLoading: false,
      fullPage: true,
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: ""
      }
    };
  },

  components: {
    Loading
  },

  methods: {
    createAccount() {
      this.isLoading = true;

      axios
        .post("/api/loanees", this.formData)
        .then(res => {
          this.isLoading = false;

          if (res.data.responseStatus == 201) {
            this.$router.push("/customers/" + res.data.loanee.id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
