import { reactive } from 'vue';

export const store = reactive({

    searchQuery: "",
    sponsoredApartments: [],
    apartments: [],
    apartment: null,
    servicesList: [],
    searchLat: null,
    searchLong: null,
    radius: 20,
    filters: {
        n_beds: 1,
        n_rooms: 1,
        services: []
    },

    resetStore() {
        this.searchQuery = '';
        this.searchLat = null;
        this.searchLong = null;
        this.filters.n_beds = 1;
        this.filters.n_rooms = 1;
        this.filters.services = [];
        this.radius = 20;
    },

    // ci serve per avere una proprietà che cambi per attivare il watch
    sideEffect: false,
    indexSponsoredApartments: [],
})