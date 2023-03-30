import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",

    apartments: [],
    servicesList: [],


    apartment: null,

    filters: {
        n_beds: null,
        n_rooms: null,
        services: []
    },
})