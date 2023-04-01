<script>
import ContactForm from './ContactForm.vue';
import ShowMapComponent from './ShowMapComponent.vue';


export default {
    name: "ShowComponent",
    props: {
        "apartment": {
            type: Object,
            required: true,
        },
        "imagePath": {
            type: String,
            required: true
        },
        data() {
            return {
                //
            };
        }
    },
    components: {
        ContactForm,
        ShowMapComponent,
    }
}
</script>
<template>
    <div class="container-fluid">
        <div class="row my-3 py-3">
            <div class="col-12">
                <h1>
                    {{ apartment.title }}
                </h1>
                <h5>
                    {{ apartment.address }}
                </h5>
            </div>
            <div class="col-12">

            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div>
                    <img v-if="!apartment.image.startsWith('uploads')" :src="imagePath + '/img/' + apartment.image"
                        class=" rounded-3 image-container img-fluid" :alt="apartment.title">
                    <img v-else :src="imagePath + '/storage/' + apartment.image" class="img-fluid rounded-3 image-container"
                        :alt="apartment.title">
                </div>
            </div>
        </div>
        <!-- box -->
        <div class="row">
            <div class="col-lg-7 col-12 mt-5">
                <div class="d-flex justify-content-between">
                    <h2>Aparment's infos</h2>
                    <p class="price mb-0 fw-bold align-self-center">
                        &euro; {{ apartment.n_price }}/night
                    </p>
                </div>
                <div class="row py-3 fw-bold">
                    <div class="col-lg-3 col-md-6">
                        <div class="my-border  px-3 py-4 rounded-2 d-flex justify-content-center">
                            <span class="p-2 my_info">
                                Rooms: {{ apartment.n_rooms }}
                            </span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="my-border  px-3 py-4 rounded-2 d-flex justify-content-center">
                            <span class="p-2 my_info">
                                Beds: {{ apartment.n_beds }}
                            </span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class=" my-border  px-3 py-4 rounded-2 d-flex justify-content-center">
                            <span class="p-2 my_info">
                                Bathrooms: {{ apartment.n_bathrooms }}
                            </span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class=" my-border  px-3 py-4 rounded-2 d-flex justify-content-center">
                            <span class="p-2 my_info">
                                {{ apartment.square_meters }} mq
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <p>{{ apartment.description }}</p>
                </div>
                <div class="py-3">
                    <h2 class="pb-2">What this place offers</h2>
                    <div>
                        <span class="fw-bold mb-1" v-for="service in apartment.services">
                            <ul class="list-unstyled p-0 m-0">
                                <li class="text-capitalize mb-2 my_info">
                                    <font-awesome-icon :icon="['fas', 'check']" /> {{ service.name }}
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-12 ">
                <div class="ms-lg-5 py-5">
                    <div>
                        <div class="rounded-4 shadow">
                            <div class="modal-body p-3">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;

.my-border {
    border: 1px solid $main-color;
}

.fa-check {
    color: $main-color;
    padding-right: .5rem;
}

.price {
    color: $main-color;
    font-size: 1.3rem;
}
</style>
