import { reactive } from 'vue';

export const store = reactive({
    searchQuery: "",
    apartments: [],
    filters: {
        nBeds: null,
        nRooms: null,
    },
})