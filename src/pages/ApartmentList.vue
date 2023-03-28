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
                    address: store.searchQuery,
                    n_beds: store.filters.n_beds,
                    n_rooms: store.filters.n_rooms
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
            <SearchComponent @searchApartments="searchApartments" />

            <div class="row justify-content-between align-items-center mb-3">
                <div class="col-md-6 col-lg-4">
                    <label class="form-label">Numero di letti</label>
                    <input v-model.number="store.filters.n_beds" type="number" min="1" class="form-control">
                </div>
                <div class="col-md-6 col-lg-4">
                    <label class="form-label">Numero di stanze</label>
                    <input v-model.number="store.filters.n_rooms" type="number" min="1" class="form-control">
                </div>
            </div>


            <h1 class="text-center py-3">Apartments in {{ store.searchQuery.toUpperCase() }}</h1>
            <div class="row justify-content-between align-items-center">
                <!--Qui andranno le card-->
                <ApartmentComponent v-for="apartmentElement in this.store.apartments" :apartment="apartmentElement"
                    :imagePath="urlAddress" />
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
</style>




