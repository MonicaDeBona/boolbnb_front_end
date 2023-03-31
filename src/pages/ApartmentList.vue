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
                    radius: store.radius,
                    latitude: store.searchLat,
                    longitude: store.searchLong,
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
                            <div class="row justify-content-center align-items-center mb-3">
                                <div class="radius-container mb-2">
                                    <label for="radius" class="mx-2 mb-0">Radius (km):</label>
                                    <div class="slidecontainer">
                                        <input id="radius" v-model.number="store.radius" type="number" min="1" max="300"
                                            class="form-control slider" />
                                    </div>
                                </div>
                                <div class="row justify-content-center align-items-center mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label m-0">Beds</label>
                                        <div class="number-input">
                                            <button
                                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                            <input class="quantity" min="1" name="quantity" type="number"
                                                v-model.number="store.filters.n_beds" />
                                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                                class="plus"></button>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label m-0">Rooms</label>
                                        <div class="number-input">
                                            <button
                                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                                            <input class="quantity" min="1" name="quantity" type="number"
                                                v-model.number="store.filters.n_rooms" />
                                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                                class="plus"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row ms-auto">
                                <div class="form-check col-6" v-for="service in this.store.serviceList" :key="service.id">
                                    <input class="form-check-input" type="checkbox" :value="service.slug"
                                        v-model="selectedServices" />
                                    <label class="form-check-label text-capitalize">{{ service.name }}</label>
                                </div>
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
            <div
                class="row align-items-center justify-content-center justify-content-sm-start d-flex align-items-stretch flex-wrap">
                <ApartmentComponent v-for="apartmentElement in this.store.apartments" :apartment="apartmentElement"
                    :imagePath="urlAddress" />
                <!--Qui andranno le card-->
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
@use '../styles/general.scss' as *;

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

.slidecontainer {
    width: 100%;
}

.slider {

    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: $main-color;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: $main-color;
    cursor: pointer;
}

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

.number-input {
    border: 0;
    display: inline-flex;
    // border: 1px solid #fe8376;
    border-radius: .75rem;
    display: flex;
    align-items: center;
}

.number-input,
.number-input * {
    box-sizing: border-box;
}

.number-input button {
    outline: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    margin: 0;
    position: relative;
    // box-shadow: 0px 0px 1px #474747;
    background-color: $main-color;
    border-radius: 6px;
}

.number-input button:before,
.number-input button:after {
    font-size: .6rem;
    display: inline-block;
    position: absolute;
    content: '';
    width: .5rem;
    height: 2px;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
}

.number-input button.plus:after {
    transform: translate(-50%, -50%) rotate(90deg);
}

.number-input input[type=number] {
    font-family: sans-serif;
    max-width: 3rem;
    border: none;
    border-width: 0 2px;
    font-size: 1rem;
    height: 2rem;
    font-weight: bold;
    text-align: center;
    color: $main-color;
}
</style>


