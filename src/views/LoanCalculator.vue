<template>
  <div class="mt-8">
    <!-- page title -->
    <h3 class="text-xl font-light tracking-wide">
      Loan Projection
    </h3>

    <hr class="mb-5" />

    <!-- repayment schedule -->
    <div class="w-full md:flex -mx-2">
      <!-- loan form -->
      <div class="md:w-1/3 bg-white rounded shadow px-2 py-5 mr-5">
        <form class="w-full px-5">
          <div class="mb-5">
            <div class="md:flex -mx-2 mb-3">
              <div class="md:w-1/2 px-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2"
                  for="grid-city"
                >
                  Amount
                </label>
                <input
                  v-model="formData.amount"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                />
              </div>

              <div class="md:w-1/2 px-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2"
                  for="grid-state"
                >
                  Rate
                </label>
                <div class="relative">
                  <select
                    v-model="formData.rate"
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option v-for="rate in rates" v-bind:key="rate.id">{{
                      rate.interest
                    }}</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2"
                for="grid-state"
              >
                Plan
              </label>
              <div class="relative">
                <select
                  v-model="formData.plan"
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option v-for="plan in plans" v-bind:key="plan.id">{{
                    plan.name
                  }}</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="md:flex -mx-2">
              <div class="md:w-1/2 px-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2"
                  for="grid-zip"
                >
                  Duration
                </label>
                <input
                  v-model="formData.duration"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  min="1"
                  max="48"
                />
              </div>

              <div class="md:w-1/2 px-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2"
                  for="grid-zip"
                >
                  Repayment Date
                </label>
                <input
                  v-model="formData.date"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                />
              </div>
            </div>
          </div>

          <div class="w-full md:w-1">
            <button
              @click.prevent="calculate()"
              class="block px-10 py-3 text-gray-500 uppercase tracking-wide bg-gray-200 rounded-sm text-xs font-bold shadow hover:bg-gray-800 hover:text-white border-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <!-- schedules projection -->
      <div class="md:flex-1 bg-white rounded shadow px-2 py-5 h-auto">
        <div class="px-3">
          <h4 class="text-gray-700 tracking-wide text-left">Projected Repayment Schedule</h4>

          <hr />

          <table v-if="installments.length > 0" class="w-full text-justify">
            <thead class="bg-gray-800 py-10 text-white">
              <tr>
                <td class="px-3 py-3">Expected Date</td>
                <td class="px-3 py-3">Expected Amount</td>
                <td class="px-3 py-3">Interest</td>
                <td class="px-3 py-3">Total</td>
              </tr>
            </thead>

            <tbody class="border text-gray-600">
              <tr
                v-for="(installment, index) in installments"
                :key="index"
                class="border"
              >
                <td class="px-3 py-3 text-left">
                  {{ installment.schedule }}
                </td>
                <td class="px-3 py-3">{{ installment.projection.amount }}</td>
                <td class="px-3 py-3">{{ installment.projection.interest }}</td>
                <td class="px-3 py-3">{{ installment.projection.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "loanCalculator",

  data() {
    return {
      pageTitle: "Calculate Loan",
      rates: [],
      plans: [],
      formData: {
        amount: "",
        rate: "",
        plan: "",
        duration: "",
        date: ""
      },
      installments: []
    };
  },

  created() {
    this.getRates();
    this.getPlans();
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

    calculate() {
      // console.log(this.formData.plan)
      axios
        .post("/api/calculate/loan", this.formData)
        .then(res => {
          this.installments = res.data.paymentSchedule;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
