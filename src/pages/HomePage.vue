<script>
import SearchComponent from '../components/SearchComponent.vue';
// import axios from "axios";
// import { store } from '../store.js'

export default {
    name: 'HomePage',
    components: {
        SearchComponent
    },
    // data() {
    //     return {
    //         apartments: [],
    //         loading: false,
    //         urlAddress: "http://127.0.0.1:8000",
    //         searchQuery: "",
    //     };
    // },
    // methods: {
    //     getApartments() {
    //         axios
    //             .get(this.urlAddress + "/api/apartments/", {})
    //             .then((response) => {
    //                 this.apartments = response.data.results;
    //             })
    //             .catch((error) => {
    //                 console.warn(error);
    //             });
    //     },
    //     searchApartments() {
    //         axios
    //             .get(this.urlAddress + "/api/apartments/", {
    //                 params: {
    //                     address: this.searchQuery,
    //                 },
    //             })
    //             .then((response) => {
    //                 this.apartments = response.data.results;
    //             })
    //             .catch((error) => {
    //                 console.warn(error);
    //             });
    //     },
    // },
    // created() {
    //     this.getApartments();
    // },

}
</script>

<template>
    <SearchComponent />
</template>

<style lang="scss"></style>


