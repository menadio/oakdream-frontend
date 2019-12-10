<template>
  <div class="mt-8">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <!-- customer personal info -->
    <div class="w-full flex items-center">
      <!-- customer photo -->
      <div class="md:w-1/3">
        <img
          class="rounded-full h-48 w-48 mx-auto object-cover"
          alt="Profile"
          src="../assets/profileOne.jpg"
        />
      </div>

      <div class="md:w-full">
        <!-- customer details -->
        <div class="w-full flex content-center">
          <div class="w-1/2">
            <h2 class="name text-3xl font-light">
              {{ customer.firstname }} {{ customer.lastname }}
            </h2>
          </div>

          <div v-if="!showForm" class="w-1/2 flex justify-end">
            <button
              @click="showForm = !showForm"
              class="px-4 py-2 mb-1 text-sm bg-white rounded shadow hover:bg-gray-400 focus:outline-none"
            >
              Request Loan
            </button>
          </div>
        </div>

        <hr class="mb-3" />

        <div
          v-if="!showForm"
          class="w-full px-3 py-3 md:flex bg-white rounded shadow"
        >
          <div class="w-1/2 leading-loose">
            <p>
              <svg
                class="inline fill-current text-indigo-400 mr-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm16 3.38V6H4v1.38l8 4 8-4zm0 2.24l-7.55 3.77a1 1 0 0 1-.9 0L4 9.62V18h16V9.62z"
                />
              </svg>
              {{ customer.email }}
            </p>

            <p>
              <svg
                class="inline fill-current text-indigo-400 mr-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                /></svg
              >{{ customer.address }}
            </p>

            <p>
              <svg
                class="inline fill-current text-indigo-400 mr-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M13.04 14.69l1.07-2.14a1 1 0 0 1 1.2-.5l6 2A1 1 0 0 1 22 15v5a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2h5a1 1 0 0 1 .95.68l2 6a1 1 0 0 1-.5 1.21L9.3 10.96a10.05 10.05 0 0 0 3.73 3.73zM8.28 4H4v2a14 14 0 0 0 14 14h2v-4.28l-4.5-1.5-1.12 2.26a1 1 0 0 1-1.3.46 12.04 12.04 0 0 1-6.02-6.01 1 1 0 0 1 .46-1.3l2.26-1.14L8.28 4z"
                /></svg
              >{{ customer.phone }}
            </p>
          </div>

          <div class="w-1/2">
            <div class="w-full flex leading-loose">
              <div class="w-1/2">
                <p class="text-green-800 text-left text-sm py-3 px-">
                  Approved
                  <span
                    class="inline-block float-right mr-8 bg-green-800 text-white px-3 rounded-full"
                    >{{ stats.approved }}</span
                  >
                </p>

                <p class="text-red-800 text-left text-sm py-3 px-">
                  Denied
                  <span
                    class="float-right mr-8 bg-red-800 text-white px-3 rounded-full"
                    >{{ stats.denied }}</span
                  >
                </p>
              </div>

              <div class="w-1/2">
                <p class="text-blue-800 text-left text-sm py-3 px-">
                  Running
                  <span
                    class="float-right mr-8 bg-blue-800 text-white px-3 rounded-full"
                    >0</span
                  >
                </p>

                <p class="text-gray-600 text-left text-sm py-3 px-">
                  Pending
                  <span
                    class="float-right mr-8 bg-gray-600 text-white px-3 rounded-full"
                    >{{ stats.pending }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- loan request form -->
        <div v-if="showForm" class="w-full bg-white rounded shadow">
          <form @submit.prevent="requestLoan()">
            <div class="w-full px-5 py-5 flex -mx-2">
              <div class="w-1/3 px-2">
                <label class="block mb-2" for="amount">Amount</label>
                <input
                  v-model="formData.principal"
                  class="w-full px-2 py-1 bg-gray-200 focus:bg-gray-400 rounded"
                  type="number"
                />
              </div>

              <div class="w-1/3 px-2">
                <label class="block mb-2" for="rate">Rate</label>
                <select
                  v-model="formData.rate"
                  class="w-full px-2 py-1 bg-gray-200 focus:bg-gray-400 rounded"
                >
                  <option
                    v-for="rate in rates"
                    :key="rate.id"
                    :value="rate.id"
                    >{{ rate.interest }}</option
                  >
                </select>
              </div>

              <div class="w-1/3 px-2">
                <label class="block mb-2" for="amount">Plan</label>
                <select
                  v-model="formData.plan"
                  class="w-full px-2 py-1 bg-gray-200 focus:bg-gray-400 rounded"
                >
                  <option
                    v-for="plan in plans"
                    :key="plan.id"
                    :value="plan.id"
                    >{{ plan.name }}</option
                  >
                </select>
              </div>

              <div class="w-1/3 px-2">
                <label class="block mb-2" for="duration">Duration</label>
                <input
                  v-model="formData.duration"
                  class="w-full px-2 py-1 bg-gray-200 focus:bg-gray-400 rounded"
                  type="number"
                />
              </div>
            </div>

            <div class="w-full px-5 pb-5">
              <button
                class="px-5 py-1 text-sm bg-gray-200 border hover:bg-gray-400 focus:outline-none rounded shadow"
                type="submit"
              >
                Send
              </button>

              <button
                @click="showForm = !showForm"
                class="ml-3 px-5 py-1 text-sm text-red-400 border border-red-400 hover:text-white hover:bg-red-600 focus:outline-none rounded shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- customer loans info -->
    <div>
      <!-- tabs -->
      <div class="md:w-full flex md:mt-16">
        <div
          @click="doDisplayLoans"
          :class="{
            'bg-white': showLoans,
            'bg-gray-300': !showLoans,
            'shadow-inner': !showLoans
          }"
          class="tab w-1/6 px-5 py-2 rounded-tl-lg rounded-tr-lg border-gray-400 cursor-pointer"
        >
          Loans
        </div>

        <div
          @click="doDisplaySchedules"
          :class="{
            'bg-white': showSchedules,
            'bg-gray-300': !showSchedules,
            'shadow-inner': !showSchedules
          }"
          class="tab w-1/6 px-5 py-2 rounded-tl-lg rounded-tr-lg border-gray-400 cursor-pointer"
        >
          Schedules
        </div>
      </div>

      <!-- loans -->
      <div v-if="loans.length > 0 && showLoans">
        <div
          class="md:w-full bg-white rounded-bl rounded-br shadow-lg mb-5 pt-3"
        >
          <table class="w-full table-auto text-center">
            <thead class="py-10 text-white bg-gray-800">
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
                    'text-red-600': loan.status == 'Denied',
                    'text-green-600': loan.status == 'Approved'
                  }"
                >
                  {{ loan.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="(loans.length == 0) && showLoans">
        <NoRecord collection="loans" />
      </div>

      <!-- schedules -->
      <div v-if="schedules.length > 0 && showSchedules">
        <div class="md:w-full bg-white rounded-bl rounded-br shadow-lg pt-3">
          <table class="w-full table-auto text-center">
            <thead class="py-10 text-white bg-gray-800">
              <tr>
                <td class="px-3 py-3">Schedule</td>
                <td class="px-3 py-3">Amount</td>
                <td class="px-3 py-3">Interest</td>
                <td class="px-3 py-3">Total</td>
              </tr>
            </thead>

            <tbody class="border text-gray-600">
              <tr v-for="schedule in schedules" v-bind:key="schedule.id">
                <td class="px-3 py-3">{{ schedule.schedule }}</td>
                <td class="px-3 py-3">{{ schedule.amount }}</td>
                <td class="px-3 py-3">{{ schedule.interest }}</td>
                <td class="px-3 py-3">{{ schedule.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="(schedules.length == 1) && showSchedules">
        <NoRecord collection="schedules" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NoRecord from "@/components/NoRecord";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "customer",

  components: {
    NoRecord,
    Loading
  },

  data() {
    return {
      isLoading: false,
      fullPage: true,
      customer: {},
      stats: {},
      loans: [],
      schedules: [],
      plans: [],
      rates: [],
      formData: {
        user_id: 1,
        loanee_id: this.$route.params.id,
        principal: "",
        rate: "",
        plan: "",
        duration: ""
      },
      showForm: false,
      showLoans: true,
      showSchedules: false
    };
  },

  created() {
    this.getCustomer();
    this.getPlans();
    this.getRates();
  },

  methods: {
    getCustomer() {
      this.isLoading = true;

      axios
        .get(`/api/loanees/${this.$route.params.id}`)
        .then(res => {
          this.customer = res.data.loanee;
          this.loans = res.data.loanee.loans;
          this.stats = res.data.loanStats;
          this.isLoading = false;
          this.loans.forEach(this.getloansSchedules);
        })
        .catch(err => {
          console.log(err);
        });
    },

    getloansSchedules(item) {
      if (item.schedules.length > 0) {
        for (let i = 0; i < item.schedules.length; i++) {
          this.schedules.push(item.schedules[i]);
        }
      }
    },

    getPlans() {
      axios
        .get("/api/plans")
        .then(res => {
          this.plans = res.data.plans;
        })
        .catch(err => {
          console.log(err);
        });
    },

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

    requestLoan() {
      this.isLoading = true;

      axios
        .post("/api/loans", this.formData)
        .then(res => {
          if (res.data.responseStatus == 201) {
            this.loanForm = false;
            this.getCustomer();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    doDisplayLoans() {
      this.showLoans = true;
      this.showSchedules = false;
    },

    doDisplaySchedules() {
      this.showLoans = false;
      this.showSchedules = true;
    }
  }
};
</script>

<style scoped>
.name,
.tab,
p {
  font-family: "Nunito", sans-serif;
}
</style>
