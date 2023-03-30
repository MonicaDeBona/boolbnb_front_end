
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
            const searchBoxContainer = document.getElementById('searchBoxContainer');

            searchBoxContainer.appendChild(searchBoxHTML);
            searchInput.parentNode.removeChild(searchInput);

            console.log(this.store.searchQuery)

            this.ttSearchBox.on("tomtom.searchbox.resultselected", (event) => {
                this.store.searchQuery = event.data.result.address.freeformAddress;
                
                //prendiamo le coordinate della città cercata
                this.store.inputCoordinates = event.data.result.position;
                console.log(this.store.inputCoordinates);
            });
            console.log(this.store.searchQuery)
        },

        getDistance(){
            // raggio di ricerca es.20km
            const searchRadius = 20000;

            // ciclo per scorrere gli appartamenti
            for (let i = 0; i < this.store.apartmentsCoordinates.length; i++) {
            // coordinate dell'appartamento corrente
            const apartmentLat = this.store.apartmentsCoordinates[i].latitude;
            const apartmentLng = this.store.apartmentsCoordinates[i].longitude;

            // calcolo della distanza tra la città cercata e l'appartamento
            const distance = haversine(this.store.inputCoordinates.latitude, this.store.inputCoordinates.latitude, apartmentLat, apartmentLng);
            console.log(distance)
        
            // se la distanza è inferiore al raggi, pushiamo l'id nell'array filtrata
            if (distance <= searchRadius) {
                this.store.filteredApartments.push(this.store.apartmentsCoordinates[i].id);
            }
            }

            // funzione per calcolare la distanza tra due coordinate???
 
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
                            <input  id="searchInput" v-model="store.searchQuery" type="text" class="form-control"
                                placeholder="Search for an address or city" />
                            <!-- <button type="submit" class="btn btn-primary">Search</button> -->
                            <router-link :to="{ name: 'apartments' }" class="btn my_btn fw-bold" 
                                type="submit" @click="$emit('searchApartments', store.searchQuery); getDistance">
                                Cerca
                            </router-link>
                        
                        </div>
                    </form>
                </div>
            </div>
    </div>
</template>

<style lang="scss" scoped>


</style>