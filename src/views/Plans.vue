<template>
  <div class="mt-8">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <!-- page title -->
    <h3 class="text-xl font-light tracking-wide">
      Payment Plans
    </h3>

    <hr class="mb-5" />

    <!-- forms -->
    <div class="w-full flex justify-content-around mb-3">
      <!-- search form -->
      <div class="w-1/3">
        <input
          :class="{ hidden: openForm }"
          class="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Find a plan"
        />
      </div>

      <!-- create plan form -->
      <div v-if="openForm" class="w-2/3 ml-5">
        <form>
          <div class="w-full flex -mx-2">
            <div class="w-full px-2">
              <input
                v-model="formData.name"
                class="w-full block mb-1 px-3 py-2 bg-white-300 rounded focus:bg-white focus:outline-none"
                type="text"
                placeholder="Plan name"
                required
              />
            </div>

            <button
              v-if="!update"
              @click.stop.prevent="addPlan()"
              class="px-6 py-0 ml-5 text-black text-sm text-white bg-green-600 hover:bg-green-800 rounded shadow"
            >
              Submit
            </button>

            <button
              v-if="update"
              @click.stop.prevent="updatePlan(), (update = false)"
              class="px-6 py-0 ml-5 text-black text-sm text-white bg-green-600 hover:bg-green-800 rounded shadow"
            >
              Save
            </button>

            <button
              @click.stop.prevent="openForm = !openForm"
              class="px-6 py-0 ml-3 text-black text-sm text-red-600 bg-white outline-red hover:bg-red-600 hover:text-white rounded shadow"
              type="submit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div
        v-if="!openForm"
        :class="{ 'w-full': !openForm }"
        class="flex justify-end"
      >
        <button
          @click="openForm = !openForm"
          class="px-6 py-0 text-sm bg-white rounded shadow hover:bg-gray-400 focus:outline-none"
        >
          New Payment Plan
        </button>
      </div>
    </div>

    <!-- plans table -->
    <div class="w-full mx-auto h-full rounded-lg shadow-lg bg-white pt-3">
      <table class="w-full table-auto text-center">
        <thead class="py-10 text-white bg-gray-800">
          <tr>
            <td class="px-3 py-3">Plan Type</td>
            <td class="px-3 py-3">Created On</td>
            <td class="px-3 py-3">Actions</td>
          </tr>
        </thead>

        <tbody class="border text-gray-600">
          <tr
            v-for="plan in plans"
            v-bind:key="plan.id"
            class="border justify-center"
          >
            <td class="px-3 py-3">{{ plan.name }}</td>
            <td class="px-3 py-3">{{ plan.created_at }}</td>
            <td class="px-3 py-3 flex justify-center text-gray-500">
              <svg
                @click="editPlan(plan.id), (update = !update)"
                class="cursor-pointer h-6 w-6 fill-current hover:text-blue-600 mr-3"
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
                v-on:click="deletePlan(plan.id)"
                class="cursor-pointer h-6 w-6 fill-current inline-block hover:text-red-600"
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "plans",

  data() {
    return {
      isLoading: false,
      fullPage: true,
      plans: [],
      openForm: false,
      update: false,
      formData: {
        name: ""
      },
      planId: ""
    };
  },

  components: {
    Loading
  },

  mounted() {
    this.getPlans();
  },

  methods: {
    getPlans() {
      this.isLoading = true;

      axios
        .get("/api/plans")
        .then(res => {
          this.plans = res.data.plans;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addPlan() {
      this.isLoading = true;

      axios
        .post(`/api/plans`, this.formData)
        .then(res => {
          if (res.data.responseStatus == 201) {
            this.formData.interest = "";
            this.openForm = false;
            this.getPlans();
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    deletePlan(id) {
      this.isLoading = true;

      axios
        .delete(`/api/plans/${id}`)
        .then(res => {
          if (res.data.responseMessage == 204) {
            this.getPlans();
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    editPlan(id) {
      axios
        .get(`/api/plans/${id}`)
        .then(res => {
          this.openForm = !this.openForm;
          this.formData.name = res.data.plan.name;
          this.planId = id;
        })
        .catch(err => {
          console.log(err);
        });
    },

    updatePlan() {
      this.isLoading = true;

      axios
        .put("/api/plans/" + this.planId, this.formData)
        .then(res => {
          if (res.data.responseStatus == 200) {
            this.getPlans();
            this.formData.name = "";
            this.isLoading = false;
            this.openForm = !this.openForm;
            this.planId = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
