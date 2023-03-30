import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",

    apartments: [],
    servicesList: [],

    //coordinate lat e long
    inputCoordinates: [],
    apartmentsCoordinates: [],
    filteredApartments: [],

    apartment: null,

    filters: {
        n_beds: null,
        n_rooms: null,
        services: []
    },
})