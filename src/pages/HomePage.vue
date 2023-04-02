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
        this.store.resetStore();
    },

}
</script>

<template>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <path fill="#fe8376" fill-opacity="1"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        d="M0,32L60,58.7C120,85,240,139,360,170.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </path>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </svg> -->
    <main>
        <div class="container">
            <div class="p-5 my-4 rounded-3 my_bg_jumbo text-white">
                <div class="container-fluid py-5">
                    <h1 class="display-5 fw-bold">Boolbnb</h1>
                    <p class="col-md-8 fs-4">Discover unique stays and live like a local anywhere in the world with Boolbnb
                        - your ultimate travel companion.
                    </p>
                    <p class="col-md-8 fs-4"> Choose your next destination now! </p>
                    <SearchComponent />
                </div>
            </div>

            <div class="row align-items-md-stretch">
                <div class="col-12 col-md-6 pb-4">
                    <div class="h-100 p-5 my_bg_cardr text-bg-dark rounded-3">
                        <h2 class="display-6 fw-bold">Get ready to travel</h2>
                        <p>The best experiences ever, the best activities around the world, according to travelers who have
                            tried them and loved every minute of them.</p>
                    </div>
                </div>
                <div class=" col-12 col-md-6 pb-4">
                    <div class="h-100 p-5 my_bg_cardl text-light rounded-3 ">
                        <h2 class="display-6 fw-bold">"Life is a journey, not a destination."</h2>
                        <cite class=" cit">Ralph Waldo Emerson</cite>
                    </div>
                </div>
            </div>

            <div
                class="row align-items-center justify-content-center justify-content-sm-start d-flex align-items-stretch flex-wrap mt-5 pt-1">
                <div class="d-flex align-items-center justify-content-between">
                    <h1>Our favourite!</h1>

                </div>


                <ApartmentComponent v-for="sponsoredApartment in this.store.sponsoredApartments"
                    :apartment="sponsoredApartment" :imagePath="urlAddress" :sponsored="true" />

                <div v-if="this.store.sponsoredApartments.length === 0"
                    class="d-flex flex-column align-items-start justify-content-center py-5">
                    <img src="https://i.pinimg.com/564x/41/33/fc/4133fc74007d45c442cb41f0aeb6d919.jpg"
                        alt="placeholeder-image" class="w-25 align-content-center">
                    <h5 class="text-center py-2">Sorry, no apartments found.</h5>
                </div>

            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.my_bg_jumbo {
    background-image: url('../assets/img/bgfe.jpg');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
}

.my_bg_cardr {
    background-image: url('../assets/img/card1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.my_bg_cardl {
    background-color: $main-color;
    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
}


.account-btn {
    background-color: $main-color;
    color: white;

    &:hover {
        color: white;
        // background-color: $btn-hover;
    }
}
</style>


