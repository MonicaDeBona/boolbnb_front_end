<script>
import ApartmentComponent from "../components/ApartmentComponent.vue";
import SearchComponent from "../components/SearchComponent.vue";
import { store } from '../store';

import axios from "axios";

export default {
    name: "ApartmentList",
    components: {
        ApartmentComponent,
        SearchComponent

    },

    data() {
        return {
            loading: false,
            urlAddress: "http://127.0.0.1:8000",
            store,
        };
    },

    methods: {
        searchApartments() {
            axios.get(this.urlAddress + "/api/apartments/", {
                    params: {
                        address: store.searchQuery
                    },
                })

                .then((response) => {
                    this.store.apartments = response.data.results;
                })

                .catch((error) => {
                    console.warn(error);
                });
        },
    },

    created() {
        this.searchApartments();
    },
};;

</script>

<template>
    <section>
        <div class="container">
            <SearchComponent @searchApartments="searchApartments"/>

            <h1 class="text-center py-3">Apartments in {{ store.searchQuery.toUpperCase() }}</h1>
            <div class="row justify-content-between align-items-center">
                <!--Qui andranno le card-->
                <div class="col-12 col-md-6 col-lg-4">
                    <ApartmentComponent v-for="apartmentElement in this.store.apartments" :apartment="apartmentElement"
                        :imagePath="urlAddress" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.card-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
// .single-card {
//     width: calc(100% / 3 - 2rem);
//     margin: 1rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     border-radius: 30px;
//     box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
// }
</style>




