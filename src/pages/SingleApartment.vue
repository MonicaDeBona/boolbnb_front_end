<script>
//importo la card appartamento
import ApartmentComponent from "../components/ApartmentComponent.vue";
//importo axios
import axios from 'axios';
//importo lo store
import { store } from '../store';


export default {

    name: 'SingleApartment',

    components:{
        ApartmentComponent,
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

    <section>

        <ApartmentComponent v-for="apartmentElement in this.store.apartments" :apartment="apartmentElement"
                    :imagePath="urlAddress" />

        <!-- <div class="flat_card rounded-3 mb-3 p-3">
            <div>
                <div class="image_container">
                    <img v-if="!apartment.image.startsWith('uploads')" :src="urlAddress + '/img/' + apartment.image" class="img-fluid rounded-3" :alt="apartment.title">
                    <img v-else :src="urlAddress + '/storage/' + apartment.image" class="img-fluid rounded-3" :alt="apartment.title">
                </div>

                <h2 class="fw-bold pt-2">
                    {{ apartment.title }}
                </h2>

                <span class="p-1">
                    {{ apartment.address }}
                </span>

                <span class="pt-2">
                    Rooms: {{ apartment.n_rooms }}
                </span>

                <span class="pt-2">
                    Beds: {{ apartment.n_beds }}
                </span>

                <span class="pt-2">
                    Bathrooms: {{ apartment.n_bathrooms }}
                </span>

                <span class="pt-2">
                    Square Meters: {{ apartment.square_meters }}
                </span>

                <span class="fw-bold me-2">
                    <a class="btn fw-bold me-2 mb-1" v-for="service in apartment.services">
                        {{ service.name }}
                    </a>
                </span>
            </div>
        </div> -->
    </section>
</template>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>