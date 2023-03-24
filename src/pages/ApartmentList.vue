<script>
//importo il component dei progetti
    import ApartmentComponent from '../pages/ApartmentList.vue';
//importo axios
    import axios from 'axios';

export default {
    name: 'ApartmentList',

    components:{
        ApartmentComponent,
    },

    data() {
        return {
            apartments: [],
            loading: false,
            urlAddress: 'http://127.0.0.1:8000/api/apartments/',
        }
    },

    methods: {
        getApartments(){
            axios.get(this.urlAddress, {
                params: {
                    //
                }
            })
            .then((response) => {

                //console.log(response.data.results.data);
                this.apartments = response.data.results;
            })
            .catch(function (error) {
                console.warn(error);
            });
        }
    },
    created() {
        this.getApartments();
    },
}
</script>

<template>

    <section>
        <div class="container">

            <h1 class="pb-5 text-center pt-5">Apartments list:</h1>

            <div class="card-wrapper">
            <!--Qui andranno le card-->
            
                <ApartmentComponent 
                    v-for="apartmentElement in apartments" :apartment="apartmentElement"
                />
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
