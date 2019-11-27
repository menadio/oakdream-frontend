<template>

</template>

<script>
import axios from "axios"

export default {
    name: "managers",

    data() {
        return {
            managers: []
        }
    },

    created() {
        this.getManagers()
    },

    methods: {
        getManagers() {
            axios
                .get("/api/users")
                .then(res => {
                    this.managers = res.data.users
                })
                .catch(err => {
                    console.log(err)
                })
        },

        deleteManager(id) {
            axios
                .delete(`/api/users/${id}`)
                .then(res => {
                    console.log(res.data.responseMessage)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>
