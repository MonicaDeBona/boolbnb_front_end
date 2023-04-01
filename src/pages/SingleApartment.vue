<script>
//importo la card appartamento
import ShowComponent from '../components/ShowComponent .vue'
import ContactForm from '../components/ContactForm.vue';
import ShowMapComponent from '../components/ShowMapComponent.vue';

//importo axios
import axios from 'axios';
//importo lo store
import { store } from '../store';


export default {

    name: 'SingleApartment',

    components: {
        ShowComponent,
        ContactForm,
        ShowMapComponent,
    },

    data() {
        return {

            loading: true,
            urlAddress: 'http://127.0.0.1:8000',
            store
        }
    },
    methods: {

        getApartment() {
            axios.get(this.urlAddress + "/api/apartments/" + this.$route.params.slug, {

                params: {

                }
            })

                .then((response) => {
                    //console.log(response.data.results.data);
                    this.store.apartment = response.data.results;
                    this.loading = false;
                })

                .catch(function (error) {
                    console.warn(error);
                });
        }
    },
    created() {
        this.getApartment();
    },
}
</script>

<template>
    <section class="container">

        <ShowComponent v-if="!loading" :apartment="this.store.apartment" :isShow="true" :imagePath="urlAddress" />
        <ShowMapComponent v-if="!loading" :key="this.store.apartment.id" />
        <!-- <ContactForm /> -->

    </section>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>