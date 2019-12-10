<template>
  <div class="mt-8">
    <!-- page title -->
    <h3 class="text-xl font-light tracking-wide">
      Customers
    </h3>

    <hr class="mb-5" />

    <!-- statistics card -->
    <div
      class="bg-white rounded-lg h-auto shadow-lg flex content-center flex-wrap text-left mb-8"
    >
      <div class="w-1/3 border-r py-5 px-5 font-sans">
        <p class="text-2xl font-semibold text-indigo-800">
          {{ stats.totalLoanees }}
        </p>
        <p class="text-gray-500 font-semibold text-sm">Total</p>
      </div>

      <div class="w-1/3 border-r py-5 px-5 font-sans">
        <p class="text-2xl font-semibold text-indigo-800">
          {{ stats.loaneesWithLoans }}
        </p>
        <p class="text-gray-500 font-semibold text-sm">Debtors</p>
      </div>

      <div class="w-1/3 py-5 px-5 font-sans">
        <p class="text-2xl font-semibold text-indigo-700">
          {{ stats.loaneesWaiting }}
        </p>
        <p class="text-gray-500 font-semibold text-sm">Waiting Review</p>
      </div>
    </div>

    <!-- search form -->
    <div class="w-full flex mb-3">
      <div class="w-1/4 justify-start">
        <input
          class="w-40 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Account"
        />
      </div>

      <div class="w-full flex justify-end">
        <router-link
          :to="'/customers/create'"
          class="px-4 py-2 text-sm bg-white rounded shadow hover:bg-gray-400 focus:outline-none"
          >New Account</router-link
        >
      </div>
    </div>

    <!-- customers -->
    <div id="customers-table" class="w-full mx-auto h-full rounded-lg shadow-lg bg-white pt-3">
      <table class="table-auto w-full font-sans">
        <thead class="bg-gray-800 py-10 text-white text-center">
          <tr>
            <td class="px-3 py-3">Account No.</td>
            <td class="px-3 py-3">Firstname</td>
            <td class="px-3 py-3">Lastname</td>
            <td class="px-3 py-3">Email</td>
            <td class="px-3 py-3">Phone</td>
            <td class="px-3 py-3">Action</td>
          </tr>
        </thead>
        <tbody class="border text-gray-600 text-center">
          <loading
            :active.sync="isLoading"
            :can-cancel="true"
            :is-full-page="fullPage"
          ></loading>
          <tr
            v-for="customer in customers"
            v-bind:key="customer.id"
            class="border"
          >
            <td class="px-3 py-3">{{ customer.account }}</td>
            <td class="px-3 py-3">{{ customer.firstname }}</td>
            <td class="px-3 py-3">{{ customer.lastname }}</td>
            <td class="px-3 py-3">{{ customer.email }}</td>
            <td class="px-3 py-3">{{ customer.phone }}</td>
            <td class="px-3 py-3">
              <router-link :to="'/customers/' + customer.id">
                <svg
                  class="h-6 w-6 fill-current text-gray-600 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zm-9.9-1.42a6 6 0 0 0 8.48 0L20.38 12l-4.24-4.24a6 6 0 0 0-8.48 0L3.4 12l4.25 4.24zM11.9 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  />
                </svg>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "customers",

  data() {
    return {
      isLoading: false,
      fullPage: false,
      customers: [],
      stats: "",
      createAccount: false
    };
  },

  components: {
    Loading
  },

  mounted() {
    this.getCustomers();
    this.getStats();
  },

  methods: {
    getCustomers() {
      this.isLoading = true;

      axios
        .get("/api/loanees")
        .then(res => {
          this.customers = res.data.loanees;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getStats() {
      axios
        .get("/api/loanees/stats")
        .then(res => {
          this.stats = res.data.loaneeStats;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#customers-table, .vld-parent {
    position: relative;
}
</style>
