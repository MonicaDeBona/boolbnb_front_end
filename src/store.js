import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",

    apartments: [],
    servicesList: [],
    searchLat: null,
    searchLong: null,
    radius: '',



    apartment: null,

    filters: {
        n_beds: null,
        n_rooms: null,
        services: []
    },
})