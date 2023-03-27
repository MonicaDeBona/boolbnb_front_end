<script>
//importo il component dei progetti
import ApartmentComponent from '../components/ApartmentComponent.vue'
//importo axios
import axios from 'axios';

export default {
    name: 'ApartmentList',

    components: {
        ApartmentComponent,
    },

    data() {
        return {
            apartments: [],
            loading: false,
            urlAddress: 'http://127.0.0.1:8000/api/apartments/',
            n_beds: '',
            n_rooms: '',
        }
    },

    methods: {
        getApartments() {
            axios.get(this.urlAddress, {
                params: {
                    n_beds: this.n_beds,
                    n_rooms: this.n_rooms,
                }
            })
                .then((response) => {
                    this.apartments = response.data.results;
                })
                .catch(function (error) {
                    console.warn(error);
                });
        },
    },

    created() {
        this.getApartments();
    }
}
</script>

<template>
    <section>
        <div class="container">

            <h1 class="pb-5 text-center pt-5">Apartments list:</h1>
            <form @submit.prevent="getApartments">
                <input type="number" v-model="n_beds" placeholder="Numero di letti" min="0" />
                <input type="number" v-model="n_rooms" placeholder="Numero di stanze" min="0" />
                <button type="submit">Cerca</button>
            </form>

            <div class="card-wrapper">
                <ApartmentComponent v-for="apartmentElement in apartments" :key="apartmentElement.id"
                    :apartment="apartmentElement" />
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
.card-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.single-card {
    width: calc(100% / 3 - 2rem);
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>


