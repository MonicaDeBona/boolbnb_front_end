<script>
import SearchComponent from '../components/SearchComponent.vue';
import { store } from '../store';
import ApartmentComponent from '../components/ApartmentComponent.vue';

import axios from "axios";


export default {
    name: 'HomePage',
    components: {
        SearchComponent,
        ApartmentComponent
    },

    data() {
        return {
            loading: false,
            urlAddress: "http://127.0.0.1:8000",
            store,
        };
    },
    methods: {
        searchSponsoredApartments() {
            axios.get(this.urlAddress + "/api/sponsorships/", {
                params: {

                },
            })

                .then((response) => {
                    this.store.sponsoredApartments = response.data.results;
                })

                .catch((error) => {
                    console.warn(error);
                });
        },
    },
    created() {
        this.searchSponsoredApartments();
    },

}
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#fe8376" fill-opacity="1"
            d="M0,32L60,58.7C120,85,240,139,360,170.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
        </path>
    </svg>
    <div class="container">
        <SearchComponent />
        <div class="row">
            <div class="col-12">
                <ApartmentComponent v-for="sponsoredApartment in this.store.sponsoredApartments"
                    :apartment="sponsoredApartment" :imagePath="urlAddress" />
                <div v-if="this.store.sponsoredApartments.length === 0"
                    class="d-flex flex-column align-items-center justify-content-center py-5">
                    <img src="https://i.pinimg.com/564x/41/33/fc/4133fc74007d45c442cb41f0aeb6d919.jpg"
                        alt="placeholeder-image" class="w-25 align-content-center">
                    <h5 class="text-center py-2">Sorry, no apartments found.</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>


