<script>
import { store } from '../store'
export default {
    name: "SearchComponent",
    data() {
        return {
            store,
            urlAddress: "http://127.0.0.1:8000",
            ttSearchBox: null,
        };
    },
    mounted() {
        this.searchOptions();
    },
    methods: {
        searchOptions() {
            const options = {
                searchOptions: {
                    key: "ETBHtzqXwWytWV3mdxYu4MHr2p9d9stX",
                    language: "it-IT",
                    limit: 5,
                },
                autocompleteOptions: {
                    key: "ETBHtzqXwWytWV3mdxYu4MHr2p9d9stX",
                    language: "it-IT",
                },
            };
            this.ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
            const searchBoxHTML = this.ttSearchBox.getSearchBoxHTML();
            const searchInput = document.getElementById('searchInput');
            searchBoxHTML.querySelector('input.tt-search-box-input').value = this.store.searchQuery;
            const searchBoxContainer = document.getElementById('searchBoxContainer');
            searchBoxContainer.appendChild(searchBoxHTML);
            searchInput.parentNode.removeChild(searchInput);

            // console.log(this.store.searchQuery)

            this.ttSearchBox.on("tomtom.searchbox.resultselected", (event) => {
                const result = event.data.result;
                // console.log("lng ricerca:", result.position.lng);
                // latitudine ricerca
                const searchLat = result.position.lat
                this.store.searchLat = searchLat;
                // longitudine ricerca
                const searchLong = result.position.lng;
                this.store.searchLong = searchLong;
                this.store.radius = result.position.radius;

                this.store.searchQuery = result.address.freeformAddress;
                console.log("ricerca : ", this.store.searchQuery)
                // const position = result.position;
                // console.log("Latitudine:", position.lat, "Longitudine:", position.lng);

            });
            console.log(this.store.radius)
        },
    },
};
</script>
<template lang="">
    <div class="container py-5">
        <div class="row mb-3">
                <div class="col-12">
                    <form @submit.prevent="searchApartments" class="d-flex">
                        <div class="position-relative flex-grow-1" id="searchBoxContainer">
                            <input ref="searchInput" id="searchInput" v-model="store.searchQuery" type="text" class="form-control"
                                placeholder="Search for an address or city" />
                                
                            <!-- <button type="submit" class="btn btn-primary">Search</button> -->
                            <router-link :to="{ name: 'apartments' }" class="btn search-bar-btn" 
                                type="submit" @click="$emit('searchApartments', store.searchQuery)">
                                Search
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
    </div>
</template>
<style lang="scss" scoped>
@use "bootstrap/scss/bootstrap.scss" as *;
@use "../styles/general.scss" as *;

.search-bar-btn {
    position: absolute;
    top: calc((50px - 38px) / 2);
    right: 5px;
    z-index: 10;
    background-color: $main-color;
    color: white;

    &:hover {
        color: white;
        background-color: $btn-hover;
    }
}
</style>