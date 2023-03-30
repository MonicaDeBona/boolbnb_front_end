
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

            console.log(this.store.searchQuery)

            this.ttSearchBox.on("tomtom.searchbox.resultselected", (event) => {
                this.store.searchQuery = event.data.result.address.freeformAddress;
                this.store.inputCoordinates = event.data.result.position;
                console.log(this.store.inputCoordinates);
            });
            console.log(this.store.searchQuery)
        },
        getDistance() {

        }
    },
};

</script>

<template lang="">
    <div class="container py-5">
        <div class="row mb-3">
                <div class="col-12">
                    <form @submit.prevent="searchApartments">
                        <div class="input-group" id="searchBoxContainer">
                            <input ref="searchInput" id="searchInput" v-model="store.searchQuery" type="text" class="form-control"
                                placeholder="Search for an address or city" />
                            <!-- <button type="submit" class="btn btn-primary">Search</button> -->
                            <router-link :to="{ name: 'apartments' }" class="btn my_btn fw-bold" 
                                type="submit" @click="$emit('searchApartments', store.searchQuery)">
                                Cerca
                            </router-link>
                        
                        </div>
                    </form>
                </div>
            </div>
    </div>
</template>

<style lang="scss" scoped></style>