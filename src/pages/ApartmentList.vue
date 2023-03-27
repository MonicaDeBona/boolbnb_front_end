<script>
import ApartmentComponent from "../components/ApartmentComponent.vue";
import axios from "axios";

export default {
    name: "ApartmentList",
    components: {
        ApartmentComponent,
    },
    // data() {
    //     return {
    //         apartments: [],
    //         loading: false,
    //         urlAddress: "http://127.0.0.1:8000",
    //         searchQuery: "",
    //     };
    // },
    // methods: {
    //     getApartments() {
    //         axios
    //             .get(this.urlAddress + "/api/apartments/", {})
    //             .then((response) => {
    //                 this.apartments = response.data.results;
    //             })
    //             .catch((error) => {
    //                 console.warn(error);
    //             });
    //     },
    //     searchApartments() {
    //         axios
    //             .get(this.urlAddress + "/api/apartments/", {
    //                 params: {
    //                     address: this.searchQuery,
    //                 },
    //             })
    //             .then((response) => {
    //                 this.apartments = response.data.results;
    //             })
    //             .catch((error) => {
    //                 console.warn(error);
    //             });
    //     },
    // },
    // created() {
    //     this.getApartments();
    // },
};;
</script>
<template>
    <section>
        <div class="container">
            <!-- <div class="row mb-3">
                    <div class="col-12">
                        <form @submit.prevent="searchApartments">
                            <div class="input-group">
                                <input v-model="searchQuery" type="text" class="form-control"
                                    placeholder="Search for an address or city" />
                                <button type="submit" class="btn btn-primary">Search</button>
                            </div>
                        </form>
                    </div>
                </div> -->

            <h1 class="pb-5 text-center pt-5">Apartments list:</h1>

            <div class="card-wrapper">
                <!--Qui andranno le card-->
                <ApartmentComponent v-for="apartmentElement in apartments" :apartment="apartmentElement"
                    :imagePath="urlAddress" />

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





