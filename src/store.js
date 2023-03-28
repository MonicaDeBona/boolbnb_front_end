import { reactive } from 'vue';

export const store = reactive({
    searchQuery: "",
    apartments: [],
    filters: {
        n_beds: null,
        n_rooms: null,
    },
})