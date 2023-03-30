import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",

    apartments: [],
    servicesList: [],

    inputCoordinates: [],
    apartmentsCoordinates: [],
    
    apartment: null,

    filters: {
        n_beds: null,
        n_rooms: null,
        services: []
    },
})