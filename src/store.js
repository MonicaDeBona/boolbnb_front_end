import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",

    apartments: [],

    apartment: null,

    filters: {
        n_beds: null,
        distance: null,
        n_rooms: null,
        services: []
    },
})