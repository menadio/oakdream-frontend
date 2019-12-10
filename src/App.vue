<template>
  <div id="app">
    <div class="flex min-h-screen">
      <!-- sidebar -->
      <div class="w-1/6 bg-gray-700">
        <div class="flex content-center flex-wrap bg-gray-800 h-16">
          <div class="w-full">
            <h1 class="text-gray-100 text-center font-sans text-2xl">
              Oakdream
            </h1>
          </div>
        </div>

        <div class="mt-10" id="nav">
          <ul
            class="w-full text-left text-gray-200 font-light tracking-wide text-base"
          >
            <router-link tag="li" to="/">
              <a class="flex">
                <svg
                  class="h-6 w-6 fill-current text-gray-200 inline-block mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M13 20v-5h-2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.59l-.3.3a1 1 0 1 1-1.4-1.42l9-9a1 1 0 0 1 1.4 0l9 9a1 1 0 0 1-1.4 1.42l-.3-.3V20a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zm5 0v-9.59l-6-6-6 6V20h3v-5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v5h3z"
                  />
                </svg>
                Dashboard
              </a>
            </router-link>

            <router-link tag="li" to="/loans">
              <a class="flex">
                <svg
                  class="h-6 w-6 fill-current text-gray-200 inline-block mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M20 22H4a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z"
                  />
                </svg>
                Loans
              </a>
            </router-link>

            <router-link tag="li" to="/customers">
              <a class="flex">
                <svg
                  class="h-6 w-6 fill-current text-gray-200 inline-block mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                  />
                </svg>
                Customers
              </a>
            </router-link>

            <router-link tag="li" to="/plans">
              <a class="flex">
                <svg
                  class="h-6 w-6 fill-current text-gray-200 inline-block mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9zm-2 7a1 1 0 0 1-1 1H9a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm0-4a1 1 0 0 1-1 1H9a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm-5-4a1 1 0 0 1-1 1H9a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1z"
                  />
                </svg>
                Repayment Plans
              </a>
            </router-link>

            <router-link tag="li" to="/rates">
              <a class="flex">
                <svg
                  class="h-6 w-6 fill-current text-gray-200 inline-block mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M20 15a1 1 0 0 0 2 0V7a1 1 0 0 0-1-1h-8a1 1 0 0 0 0 2h5.59L13 13.59l-3.3-3.3a1 1 0 0 0-1.4 0l-6 6a1 1 0 0 0 1.4 1.42L9 12.4l3.3 3.3a1 1 0 0 0 1.4 0L20 9.4V15z"
                  />
                </svg>
                Interest Rates
              </a>
            </router-link>
          </ul>
        </div>
      </div>

      <!-- main section -->
      <div class="w-full bg-gray-200">
        <div class="w-full bg-white shadow-lg">
          <div class="flex h-full md:px-12 py-5">
            <div class="w-1/2 border-r flex justify-start">
              <h2 class="font-sans text-lg font-semibold">Good morning,</h2>
            </div>

            <div class="w-1/2 flex justify-end">
              <router-link
                to="/calculate"
                class="px-6 py-2 text-xs uppercase rounded bg-gray-300 hover:text-white hover:font-semibold hover:bg-gray-500"
                >calculate loan</router-link
              >
            </div>
          </div>
        </div>

        <div class="md:px-12 py-8">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:300,400&display=swap");

#nav > ul > li {
  font-family: "Nunito", sans-serif;
  padding: 10px 20px;
  color: #edf2f7;
  cursor: pointer;
}

#nav > ul > li:hover,
#nav > ul > li:active {
  color: #edf2f7;
  background-color: #58698a;
}

.router-link-exact-active {
  background-color: #2e3748;
  border-left: 3px solid #7d9df4;
}

/* #nav > ul > li:hover > a,
#nav > ul > li:active > a {
  color: #edf2f7;
} */

.page-title,
table {
  font-family: "Nunito", sans-serif;
}
</style>
