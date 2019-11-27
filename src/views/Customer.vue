<template>
  <div class="mt-8 font-sans">
    <div class="flex -mx-8">
      <div class="md:w-1/2 md:m-r-1 px-8">
        <div class="w-full pb-3 mb-3">
          <img
            class="rounded-full h-40 w-40 mx-auto object-cover"
            alt="Profile"
            src="../assets/profileOne.jpg"
          />
          <h2 class=" text-lg text-gray-700 font-medium my-3 tracking-wide">
            {{ customer.firstname }} {{ customer.lastname }}
          </h2>
          <div>{{ customer.email }}</div>
          <div>{{ customer.address }}</div>
          <div>{{ customer.phone }}</div>
        </div>

        <div class="w-full bg-white shadow">
          <div
            class="bg-gray-800 py-3 px-3 text-left text-white text-lg shadow-lg"
          >
            Overview
          </div>

          <div
            class="text-green-800 text-left text-lg font-medium py-3 px-3 border-t-2"
          >
            Approved
            <span
              class="inline-block float-right font-bold mr-8 bg-green-800 text-white px-3 rounded-full"
              >{{ stats.approved }}</span
            >
          </div>

          <div
            class="text-red-800 text-left text-lg font-medium py-3 px-3 border-t-2"
          >
            Denied
            <span class="float-right font-bold mr-8 bg-red-800 text-white px-3 rounded-full">{{ stats.denied }}</span>
          </div>

          <div
            class="text-blue-800 text-left text-lg font-medium py-3 px-3 border-t-2"
          >
            Running <span class="float-right font-bold mr-8 bg-blue-800 text-white px-3 rounded-full">0</span>
          </div>

          <div
            class="text-gray-600 text-left text-lg font-medium py-3 px-3 border-t-2"
          >
            Pending
            <span class="float-right font-bold mr-8 bg-gray-600 text-white px-3 rounded-full">{{ stats.pending }}</span>
          </div>
        </div>
      </div>

      <div class="md:w-full px-2">
        <div v-if="loans.length > 0">
          <h3 class="text-left text-gray-700 text-lg mb-3">
            Loans Information
          </h3>
          <div class="md:w-full bg-white rounded shadow-lg h-64 mb-3 pt-3">
            <table class="table-auto w-full font-sans">
              <thead class="bg-gray-800 py-10 text-white text-center">
                <tr>
                  <td class="px-3 py-3">Ref. No.</td>
                  <td class="px-3 py-3">Amount</td>
                  <td class="px-3 py-3">Interest %</td>
                  <td class="px-3 py-3">Duration</td>
                  <td class="px-3 py-3">Status</td>
                </tr>
              </thead>

              <tbody class="border text-gray-600">
                <tr v-for="loan in loans" v-bind:key="loan.id" class="border">
                  <td class="px-3 py-3">{{ loan.reference }}</td>
                  <td class="px-3 py-3">&#8358; {{ loan.amount }}</td>
                  <td class="px-3 py-3">{{ loan.interest }}</td>
                  <td class="px-3 py-3">{{ loan.duration }}</td>
                  <td
                    class="px-3 py-3 capitalize"
                    v-bind:class="{
                      'text-red-600': loan.status == 'denied',
                      'text-green-600': loan.status == 'approved'
                    }"
                  >
                    {{ loan.status }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- <div v-if="schedules.length > 0">
          <h3 class="text-left text-gray-700 text-lg mt-10 mb-3">
            Loans Schedule
          </h3>
          <div class="md:w-full bg-white rounded-lg shadow-lg h-64"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "customer",

  data() {
    return {
      customer: {},
      loans: [],
      stats: {}
      //   schedules: []
    };
  },

  created() {
    // this.getCustomer();
  },

  mounted() {
    this.getCustomer();
  },

  methods: {
    getCustomer() {
      axios
        .get(`/api/loanees/` + this.$route.params.id)
        .then(res => {
          this.customer = res.data.loanee;
          this.loans = res.data.loanee.loans;
          this.stats = res.data.loanStats;
          //   this.schedules = res.data.loanee.loans.schedules;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
