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
<main>
    <div class="container">
        <div class="p-5 mb-4 rounded-3 my_bg">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Custom jumbotron</h1>
                <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one
                        in
                        previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to
                        your liking.</p>
                    <SearchComponent />
                </div>
            </div>

            <div class="row align-items-md-stretch">
                <div class="col-md-6">
                    <div class="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Change the background</h2>
                        <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look.
                            Then, mix and match with additional component themes and more.</p>
                        <button class="btn btn-outline-light" type="button">Example button</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="h-100 p-5 bg-light border rounded-3">
                        <h2>Add borders</h2>
                        <p>Or, keep it light and add a border for some added definition to the boundaries of your content.
                            Be
                            sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing
                            of
                            both column's content for equal-height.</p>
                        <button class="btn btn-outline-secondary" type="button">Example button</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- <div class="container">
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
                                        </div> -->
</template>

<style lang="scss" scoped></style>


