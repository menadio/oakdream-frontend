<template>
  <div class="mt-8">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <!-- page title -->
    <h3 class="text-xl font-light tracking-wide">
      Reference: <span class="font-semibold">{{ loan.reference }}</span>
    </h3>

    <hr class="mb-5" />

    <!-- loan view -->
    <div class="w-full mb-10 py-3 flex bg-white rounded-lg shadow-lg">
      <!-- loan details card -->
      <div class="w-1/2 px-5 py-2 border-r">
        <table>
          <tr>
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              customer
            </td>
            <td class="px-3 py-3 text-gray-600">{{ loan.customer }}</td>
          </tr>

          <tr>
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              amount
            </td>
            <td class="px-3 py-3 text-gray-600">&#8358; {{ loan.amount }}</td>
          </tr>

          <tr>
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              interest rate
            </td>
            <td class="px-3 py-3 text-gray-600">{{ loan.interest }}</td>
          </tr>

          <tr>
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              repayment plan
            </td>
            <td class="px-3 py-3 text-gray-600">{{ loan.plan }}</td>
          </tr>

          <tr>
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              duration
            </td>
            <td class="px-3 py-3 text-gray-600">{{ loan.duration }}</td>
          </tr>

          <tr>
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              status
            </td>
            <td
              v-bind:class="{
                'text-red-600': loan.status == 'Denied',
                'text-green-600': loan.status == 'Approved'
              }"
              class="px-3 py-3 text-gray-600"
            >
              {{ loan.status }}
            </td>
          </tr>

          <tr v-if="loan.comment != null">
            <td
              class="w-1/2 px-3 py-3 text-white text-base capitalize bg-gray-600"
            >
              Comment
            </td>
            <td class="px-3 py-3 text-gray-600">{{ loan.comment }}</td>
          </tr>
        </table>
      </div>

      <!-- loan review card -->
      <div v-if="this.status == 'Pending'" class="w-1/2 px-5 py-2">
        <form>
          <div class="mb-5">
            <label for="comment" class="block">Comment</label>
            <textarea
              v-model="formData.comment"
              class="w-full px-3 py-2 rounded-lg border border-solid"
              name="comment"
              cols="30"
              rows="5"
              required
            ></textarea>
          </div>

          <div class="w-full flex">
            <button
              v-on:click.stop.prevent="approveLoan"
              class="px-5 py-2 mr-3 flex items-center text-sm text-white bg-green-600 rounded shadow"
            >
              <svg
                class="mr-1 h-5 w-5 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M17.62 10H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5c-1.2 0-2.3-.72-2.74-1.79l-3.5-7-.03-.06A3 3 0 0 1 5 9h5V4c0-1.1.9-2 2-2h1.62l4 8zM16 11.24L12.38 4H12v7H5a1 1 0 0 0-.93 1.36l3.5 7.02a1 1 0 0 0 .93.62H16v-8.76zm2 .76v8h2v-8h-2z"
                />
              </svg>
              Accept
            </button>

            <button
              v-on:click.stop.prevent="denyLoan"
              class="px-5 py-2 flex items-center text-sm text-white bg-red-600 rounded shadow"
            >
              <svg
                class="mr-1 h-5 w-5 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M6.38 14H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h11.5c1.2 0 2.3.72 2.74 1.79l3.5 7 .03.06A3 3 0 0 1 19 15h-5v5a2 2 0 0 1-2 2h-1.62l-4-8zM8 12.76L11.62 20H12v-7h7c.13 0 .25-.02.38-.08a1 1 0 0 0 .55-1.28l-3.5-7.02A1 1 0 0 0 15.5 4H8v8.76zM6 12V4H4v8h2z"
                />
              </svg>
              Deny
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- schedules card -->
    <div v-if="this.schedules.length > 0" class="w-full py-3">
      <h3 class="mb-3 text-xl font-light tracking-wide">Repayment Schedules</h3>

      <div class="pt-3 bg-white rounded-lg shadow-lg">
        <table class="w-full table-auto text-center">
          <thead class="py-10 text-white bg-gray-800">
            <tr class="">
              <td class="px-3 py-3">Due Date</td>
              <td class="px-3 py-3">Amount</td>
              <td class="px-3 py-3">Interest</td>
              <td class="px-3 py-3">Total</td>
              <td class="px-3 py-3">Status</td>
            </tr>
          </thead>

          <tbody class="text-gray-600">
            <tr v-for="schedule in schedules" :key="schedule.id">
              <td class="px-3 py-3">{{ schedule.schedule }}</td>
              <td class="px-3 py-3">{{ schedule.amount }}</td>
              <td class="px-3 py-3">{{ schedule.interest }}</td>
              <td class="px-3 py-3">{{ schedule.total }}</td>
              <td class="px-3 py-3">{{ schedule.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Loan",

  data() {
    return {
      isLoading: false,
      fullPage: true,
      loan_id: this.$route.params.id,
      loan: {},
      schedules: [],
      formData: {
        comment: ""
      },
      displayLoan: true,
      status: ""
    };
  },

  components: {
    Loading
  },

  created() {
    this.getLoan();
  },

  methods: {
    getLoan() {
      this.isLoading = true;

      axios
        .get("/api/loans/" + this.loan_id)
        .then(res => {
          this.loan = res.data.loan;
          this.status = res.data.loan.status;
          if (this.status == "Approved") {
            this.schedules = res.data.loan.schedules;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    approveLoan() {
      this.isLoading = true;

      axios
        .put(`/api/loans/${this.loan_id}/approve`, this.formData)
        .then(res => {
          this.isLoading = false;

          if (res.data.responseStatus == 200) {
            this.$router.push("/loans");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    denyLoan() {
      this.isLoading = true;

      axios
        .put(`/api/loans/${this.loan.id}/deny`, this.formData)
        .then(res => {
          this.isLoading = false;

          if (res.data.responseStatus == 200) {
            this.$router.push("/loans");
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
