<template>
  <div class="mt-8">
    <!-- page title -->
    <div class="mb-3 flex">
      <h1 class="text-left font-sans font-semibold">Interest Rates</h1>
      <svg
        id="add"
        @click="this.toggleRateForm"
        class="h-10 w-10 inline-block ml-auto cursor-pointer stroke-current text-gray-100 hover:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          class="heroicon-ui"
          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z"
        />
      </svg>
    </div>

    <!-- form -->
    <div class="mb-3" v-show="openForm">
      <div class="w-full flex">
        <input
          class="bg-white w-full rounded-lg px-3 focus:outline-none appearance-none block"
          type="number"
          placeholder="Enter interest rate value"
          v-model="interest"
        />
        <button
          class="py-3 px-auto ml-3 w-1/2 rounded uppercase text-sm font-medium bg-gray-400 hover:bg-gray-600 hover:text-white shadow"
          @click="this.addRate"
        >
          Submit
        </button>
      </div>
    </div>

    <!-- rates table -->
    <div class="w-full mx-auto h-full rounded-lg shadow-lg bg-white pt-3">
      <table class="table-auto w-full font-sans">
        <thead class="bg-gray-800 py-10 text-white text-center">
          <tr>
            <td class="px-3 py-3">Interest %</td>
            <td class="px-3 py-3">Created On</td>
            <td class="px-3 py-3">Actions</td>
          </tr>
        </thead>
        <tbody class="border text-gray-600">
          <tr
            v-for="rate in rates"
            v-bind:key="rate.id"
            class="border justify-center"
          >
            <td class="px-3 py-3">{{ rate.interest }}</td>
            <td class="px-3 py-3">{{ rate.created_at }}</td>
            <td class="px-3 py-3 flex justify-center text-gray-500">
              <svg
                v-on:click="$emit('loan', loan.id)"
                class="cursor-pointer h-6 w-6 fill-current inline-block mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zm-9.9-1.42a6 6 0 0 0 8.48 0L20.38 12l-4.24-4.24a6 6 0 0 0-8.48 0L3.4 12l4.25 4.24zM11.9 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                />
              </svg>
              <svg
                class="cursor-pointer h-6 w-6 fill-current inline-block mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"
                />
              </svg>
              <svg
                id="delete"
                v-on:click="deleteRate(rate.id)"
                class="cursor-pointer h-6 w-6 fill-current hover:text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "rates",

  data() {
    return {
      rates: [],
      openForm: false,
      interest: ""
    };
  },

  created() {
    this.getRates();
  },

  methods: {
    getRates() {
      axios
        .get("/api/rates")
        .then(res => {
          this.rates = res.data.rates;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addRate() {
      axios
        .post(`/api/rates`, {
          interest: this.interest
        })
        .then(res => {
          console.log(res.data.responseMessage);
        })
        .catch(err => {
          console.log(err);
        });

      this.openForm = false;
      this.getRates();
      this.interest = ''
    },

    deleteRate(id) {
      axios
        .delete(`/api/rates/${id}`)
        .then(res => {
          console.log(res.data.responseMessage);
        })
        .catch(err => {
          console.log(err);
        });

      this.getRates();
    },

    toggleRateForm() {
      this.openForm = !this.openForm;
    }
  }
};
</script>

<style scoped>
</style>
