<template>
  <div
    class="md:w-full flex flex-wrap justify-center content-center h-64 bg-white rounded-bl rounded-br shadow-lg pt-3"
  >
    <h3 class="text-lg text-gray-600 font-medium tracking-wide">No {{collection}} record found.</h3>
  </div>
</template>

<script>
export default {
    name: "NoRecord",
    props: ['collection']
};
</script>

<style></style>
