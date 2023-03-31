import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",

    apartments: [],
    apartment: null,
    servicesList: [],
    searchLat: null,
    searchLong: null,
    radius: '',
    filters: {
        n_beds: 1,
        n_rooms: 1,
        services: []
    },
})