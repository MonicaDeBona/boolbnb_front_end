<script>
import ApartmentComponent from "../components/ApartmentComponent.vue";
import SearchComponent from "../components/SearchComponent.vue";
import AppLoader from '../components/AppLoader.vue';
import { store } from '../store';

import axios from "axios";

export default {
    name: "ApartmentList",
    components: {
        ApartmentComponent,
        SearchComponent,
        AppLoader
    },

    data() {
        return {
            loading: true,
            urlAddress: "http://127.0.0.1:8000",
            store,
            // selectedServices: [],
            searchLat: null,
            searchLong: null,
        };
    },
    computed: {
        radiusInKm() {
            return (this.store.radius);
        }
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
                    services: store.filters.services,
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
                    apartments.sort((a, b) => {
                        if (parseFloat(a.distance) > parseFloat(b.distance)) {
                            return 1
                        }
                        if (parseFloat(a.distance) == parseFloat(b.distance)) {
                            return 0
                        }
                        return -1
                    })
                    const sponsoredApartments = response.data.results.sponsored_apartments;
                    console.log(sponsoredApartments)
                    // console.log(apartments)

                    // Calcola la distanza tra l'indirizzo inserito dall'utente e la posizione di ogni appartamento
                    // If per mostrare i km solo quando viene effettuata una ricerca
                    if (searchLat !== null || searchLong !== null) {
                        sponsoredApartments.forEach((apartment) => {
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
                    sponsoredApartments.sort((a, b) => {
                        if (parseFloat(a.distance) > parseFloat(b.distance)) {
                            return 1
                        }
                        if (parseFloat(a.distance) == parseFloat(b.distance)) {
                            return 0
                        }
                        return -1
                    })
                    this.store.apartments = apartments;
                    this.store.indexSponsoredApartments = sponsoredApartments;
                    console.log(apartments);
                    this.store.servicesList = response.data.results.services;
                    this.loading = false;
                })
                .catch((error) => {
                    console.warn(error);
                });
        },

        decrementBeds() {
            if (this.store.filters.n_beds > 1) {
                this.store.filters.n_beds--
            }
        },
        decrementRooms() {
            if (this.store.filters.n_rooms > 1) {
                this.store.filters.n_rooms--
            }
        },
    },

    created() {
        this.searchApartments();
    },

};

</script>

<template>
    <section class="apartment-list-main-section">
        <AppLoader v-if="loading" />
        <div class="container" v-if="!loading">
            <div class="d-flex align-items-center">
                <SearchComponent @searchApartments="searchApartments" />

                <!-- Button trigger modal -->
                <button type="button" class="btn my_btn mb-4 filter" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">Filters
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
                                    <p class="m-0">Radius: {{ radiusInKm }} km</p>
                                    <div class="slidecontainer">
                                        <input id="radius" v-model.number="store.radius" type="range" min="1" max="300"
                                            class="" />
                                    </div>
                                </div>
                                <div class="row justify-content-center align-items-center mb-3">
                                    <div class="col-md-6 p-0">
                                        <div class="d-flex align-items-center ">

                                            <label class="form-label m-0 me-2">Beds</label>
                                            <div class="number-input">
                                                <button @click="decrementBeds"></button>
                                                <input class="quantity" min="1" name="quantity" type="number"
                                                    v-model.number="store.filters.n_beds" />
                                                <button @click="store.filters.n_beds++" class="plus"></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 p-0">
                                        <div class="d-flex align-items-center ">

                                            <label class="form-label m-0 me-2">Rooms</label>
                                            <div class="number-input">
                                                <button @click="decrementRooms"></button>
                                                <input class="quantity" min="1" name="quantity" type="number"
                                                    v-model.number="store.filters.n_rooms" />
                                                <button @click="store.filters.n_rooms++" class="plus"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row ms-auto">
                                <div class="form-check col-6" v-for="service in this.store.servicesList" :key="service.id">
                                    <input class="form-check-input" type="checkbox" :value="service.slug"
                                        v-model="store.filters.services" />
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
                <ApartmentComponent v-for="apartmentElement in this.store.indexSponsoredApartments"
                    :apartment="apartmentElement" :imagePath="urlAddress" :sponsored="true" />
                <ApartmentComponent v-for="apartmentElement in this.store.apartments" :apartment="apartmentElement"
                    :imagePath="urlAddress" :sponsored="false" />
                <!--Qui andranno le card-->
                <!--Messaggio da mostrare all'utente se non viene trovato nessun risultato-->
                <div v-if="this.store.apartments.length === 0 && this.store.indexSponsoredApartments.length === 0"
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

.apartment-list-main-section {
    min-height: calc(100vh - 56px - 56px);
}

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

input[type=range] {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #f9a9a1;
    border-radius: 4px;
    border: 0px solid #000000;
}

input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 1px #3a3a3a;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    background: #fe8376;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5.5px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #f9a9a1;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #f9a9a1;
    border-radius: 4px;
    border: 0px solid #000000;
}

input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 1px #3a3a3a;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    background: #fe8376;
    cursor: pointer;

    &:hover {
        background-color: #f36859;
    }

    &:active {
        background-color: #ff6958;
        transition: .4 ease-in-out;
    }
}

input[type=range]::-ms-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type=range]::-ms-fill-lower {
    background: #f9a9a1;
    border: 0px solid #000000;
    border-radius: 8px;
    box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-fill-upper {
    background: #f9a9a1;
    border: 0px solid #000000;
    border-radius: 8px;
    box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 1px #3a3a3a;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    background: #fe8376;
    cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
    background: #f9a9a1;
}

input[type=range]:focus::-ms-fill-upper {
    background: #a1f9b1;
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

    &:hover {
        background-color: #f36859;
    }

    &:active {
        background-color: #f9a9a1;
        transition: .4 ease-in-out;
    }

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

input.quantity:focus-visible {
    outline: none;
}

.number-input input[type=number] {
    font-family: sans-serif;
    max-width: 1.7rem;
    border: none;
    border-width: 0 2px;
    font-size: 1rem;
    height: 2rem;
    font-weight: bold;
    text-align: center;
    color: $main-color;

}
</style>


