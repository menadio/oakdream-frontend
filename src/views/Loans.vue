<template>
  <div class="mt-8">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <!-- page title -->
    <h3 class="text-xl font-light tracking-wide">
      Loans
    </h3>

    <hr class="mb-5" />

    <!-- statistics cards -->
    <div
      class="bg-white rounded h-auto shadow-lg flex content-center flex-wrap text-left mb-8"
    >
      <div class="w-1/3 border-r md:py-5 md:px-5 font-sans">
        <p class="text-2xl font-semibold text-indigo-800">
          {{ stats.loansTotal }}
        </p>
        <p class="text-gray-500 font-semibold text-sm">Total Loans</p>
      </div>

      <div class="w-1/3 border-r py-5 px-5 font-sans">
        <p class="text-2xl font-semibold text-indigo-800">
          {{ stats.loansApproved }}
        </p>
        <p class="text-gray-500 font-semibold text-sm">Approved Loans</p>
      </div>

      <div class="w-1/3 py-5 px-5 font-sans">
        <p class="text-2xl font-semibold text-indigo-800">
          {{ stats.loansDenied }}
        </p>
        <p class="text-gray-500 font-semibold text-sm">Denied Loans</p>
      </div>
    </div>

    <!-- search -->
    <div class="mb-3">
      <div class="w-1/5">
        <input
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Reference"
        />
      </div>
    </div>

    <!-- loans table -->
    <div class="w-full mx-auto h-full rounded-lg shadow-lg bg-white pt-3">
      <table class="w-full">
        <thead class="bg-gray-800 py-10 text-white text-justify">
          <tr>
            <td class="px-3 py-3">Client</td>
            <td class="px-3 py-3">Ref. No.</td>
            <td class="px-3 py-3">Amount</td>
            <td class="px-3 py-3">Interest %</td>
            <td class="px-3 py-3">Plan</td>
            <td class="px-3 py-3">Duration</td>
            <td class="px-3 py-3">Status</td>
            <td class="px-3 py-3">Actions</td>
          </tr>
        </thead>

        <tbody class="border text-gray-600 text-justify">
          <tr v-for="loan in loans" v-bind:key="loan.id" class="border">
            <td class="px-3 py-3">{{ loan.customer }}</td>
            <td class="px-3 py-3">{{ loan.reference }}</td>
            <td class="px-3 py-3">&#8358; {{ loan.amount }}</td>
            <td class="px-3 py-3">{{ loan.interest }}</td>
            <td class="px-3 py-3 text-left">{{ loan.plan }}</td>
            <td class="px-3 py-3">{{ loan.duration }}</td>
            <td
              class="px-3 py-3 capitalize"
              v-bind:class="{
                'text-red-600': loan.status == 'Denied',
                'text-green-600': loan.status == 'Approved'
              }"
            >
              {{ loan.status }}
            </td>
            <td class="px-3 py-3">
              <router-link :to="'/loans/' + loan.id">
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
  name: "loans",

  data() {
    return {
      isLoading: false,
      fullPage: true,
      loans: [],
      stats: []
    };
  },

  components: {
    Loading
  },

  mounted() {
    this.getLoans();
    this.getStats();
  },

  methods: {
    getLoans() {
      this.isLoading = true;

      axios
        .get("/api/loans")
        .then(res => {
          this.loans = res.data.loans;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getStats() {
      axios
        .get("/api/loans/stats")
        .then(res => {
          this.stats = res.data.loanStats;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
