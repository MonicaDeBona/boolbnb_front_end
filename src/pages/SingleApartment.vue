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

    components:{
        ShowComponent,
        ContactForm,
        ShowMapComponent,
    },

    data() {
        return {
            
            loading: false,
            urlAddress: 'http://127.0.0.1:8000',
            store
        }
    },
    methods: {

        getApartment(){
            axios.get(this.urlAddress + "/api/apartments/" + this.$route.params.slug, {

                params: {
                    
                }
            })

            .then((response) => {
                //console.log(response.data.results.data);
                this.store.apartment = response.data.results;
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

        <ShowComponent :apartment="this.store.apartment" :isShow="true" :imagePath="urlAddress"/>
        <ShowMapComponent/>
        <ContactForm />

    </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>