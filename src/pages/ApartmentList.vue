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
            selectedServices: [],
            serviceList: [],
            searchLat: null,
            searchLong: null,
        };
    },
    computed: {
        uniqueServices() { // funzione che scorre tutti gli appartamenti e per ogni appartamento, scorre i suoi servizi e verifica se quel servizio è già presente nella lista dei servizi unici, se non è presente, lo pusha.
            let services = [];
            services.forEach((service) => {
                if (!services.some((serviceItem) => serviceItem.id === service.id)) {
                    services.push(service);
                }
            });
            return services;
        },
    },

    methods: {
        searchApartments() {
            const searchLat = this.store.searchLat;
            const searchLong = this.store.searchLong;
            axios.get(this.urlAddress + "/api/apartments/", {
                params: {
                    address: store.searchQuery,
                    n_beds: store.filters.n_beds,
                    n_rooms: store.filters.n_rooms,
                    services: this.selectedServices,
                },
            })
                .then((response) => {
                    const apartments = response.data.results.apartments;
                    // console.log(apartments)

                    // Calcola la distanza tra l'indirizzo inserito dall'utente e la posizione di ogni appartamento
                    // If per mostrare i km solo quando viene effettuata una ricerca
                    if (searchLat !== null || searchLong !== null) {
                        apartments.forEach((apartment) => {
                            const R = 6371; // raggio della Terra in km
                            const lat1 = searchLat; //latitudine ricerca
                            const lon1 = searchLong; //longitudine ricerca
                            const lat2 = apartment.latitude; //latitudine appartamento
                            const lon2 = apartment.longitude; // longitudine appartamento
                            const dLat = ((lat2 - lat1) * Math.PI) / 180;
                            const dLon = ((lon2 - lon1) * Math.PI) / 180;
                            const a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos((lat1 * Math.PI) / 180) *
                                Math.cos((lat2 * Math.PI) / 180) *
                                Math.sin(dLon / 2) *
                                Math.sin(dLon / 2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            const distance = R * c; // distanza in km
                            apartment.distance = distance.toFixed(1);
                            // console.log("haversine lat: ", lat1)
                            // console.log("haversine long: ", lon1)
                            // console.log("haversine lon: ", lon1) // aggiungi la distanza all'oggetto appartamento
                        });
                    }

                    this.store.apartments = apartments;
                    // console.log(this.store.apartments);
                    this.store.serviceList = response.data.results.services;
                })
                .catch((error) => {
                    console.warn(error);
                });
        },
    },

    created() {
        this.searchApartments();
    },

};

</script>

<template>
    <section>
        <div class="container">
            <div class="d-flex align-items-center">
                <SearchComponent @searchApartments="searchApartments" />

                <!-- Button trigger modal -->
                <button type="button" class="btn my_btn mb-4 filter" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    <font-awesome-icon :icon="['fas', 'list']" /> Filters
                </button>

            </div>

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Filters</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-between align-items-center mb-3">
                                <div class="col-md-6 col-lg-4">
                                    <label class="form-label">Numero di letti</label>
                                    <input v-model.number="store.filters.n_beds" type="number" min="1" class="form-control">
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <label class="form-label">Numero di stanze</label>
                                    <input v-model.number="store.filters.n_rooms" type="number" min="1"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="form-check" v-for="service in this.store.serviceList" :key="service.id">
                                <input class="form-check-input" type="checkbox" :value="service.slug"
                                    v-model="selectedServices" />

                                <label class="form-check-label">{{ service.name }}</label>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn my_btn" @click="searchApartments"
                                data-bs-dismiss="modal">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <h1 class="text-center py-3">Apartments in {{ store.searchQuery.toUpperCase() }}</h1> -->
            <div class="row align-items-center">
                <!--Qui andranno le card-->
                <ApartmentComponent v-for="apartmentElement in this.store.apartments" :apartment="apartmentElement"
                    :imagePath="urlAddress" />
                <!--Messaggio da mostrare all'utente se non viene trovato nessun risultato-->
                <div v-if="this.store.apartments.length === 0"
                    class="d-flex flex-column align-items-center justify-content-center py-5">
                    <img src="https://i.pinimg.com/564x/41/33/fc/4133fc74007d45c442cb41f0aeb6d919.jpg"
                        alt="placeholeder-image" class="w-25 align-content-center">
                    <h5 class="text-center py-2">Sorry, no apartments found.</h5>
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

.filter {
    height: 48px;
    width: 100px;
    margin-top: 8px;
}
</style>


