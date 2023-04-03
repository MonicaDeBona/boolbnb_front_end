<script>
export default {
    name: 'ApartmentComponent',

    props: {
        'apartment': {
            type: Object,
            required: true,
        },
        'sponsored': {
            type: Boolean,
            required: true,
        },

        // 'isShow': {
        //     type: Boolean,
        //     required: false,
        //     default: false,
        // },

        'imagePath': {
            type: String,
            required: true
        },

        data() {
            return {

            }
        },
        mounted() {
            window.scrollTo(0, 0); // scorri verso l'alto della pagina
        },
    }
}
</script>

<template>
    <div class="col-12 col-sm-12 col-md-6 col-xl-4 p-3">

        <router-link class=" text-decoration-none text-black" :to="{ name: 'apartment', params: { slug: apartment.slug } }">
            <div class="card border-0 align-item-stretch align-content-stretch position-relative">
                <div class="position-absolute top-0 end-0 sponsored-icon" v-if="sponsored">
                    <font-awesome-icon :icon="['fas', 'crown']" />
                </div>
                <img v-if="!apartment.image.startsWith('uploads')" :src="imagePath + '/img/' + apartment.image"
                    class="img-fluid rounded-3 my_img_card" :alt="apartment.title">
                <img v-else :src="imagePath + '/storage/' + apartment.image" class="rounded-3 my_img_card img-fluid"
                    :alt="apartment.title">
                <div class="apartment-list-price position-absolute bottom-0 end-0">
                    &euro;{{ apartment.n_price }}/n
                </div>
            </div>

            <div>
                <h5 class=" pt-2 fw-bold pt-3 text-capitalize"> {{ apartment.title }} </h5>

                <p class="one-line custom_margin text-capitalize me-2">
                    {{ apartment.address }}
                </p>
            </div>
            <p class="one-line custom_margin text-capitalize me-3 fw-bold" v-if="apartment.distance != null">
                Distance: {{ apartment.distance }} Km
            </p>
            <!-- <ul class=" list-unstyled">
                                                                                                                                    <li class="text-capitalize" v-for="service in apartment.services">
                                                                                                                                        <span class="fw-bold"> &bull; </span> {{ service.name }}
                                                                                                                                    </li>
                                                                                                                                </ul> -->
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.flat_card {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

div.image_container {
    width: 100%;
    max-height: 250px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

h5,
.one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.custom_margin {
    margin-top: -0.5rem !important;
}

.my_btn {
    background-color: #fe8376;
    color: white;
}

.my_img_card {
    height: 250px;
    object-fit: cover;
    min-height: 250px;

}

.my_card_dim {
    width: 330px;
}

.apartment-list-price {
    background-color: $main-color;
    padding: .4rem 0.5rem;
    text-align: center;
    border-top: 3px solid white;
    border-left: 3px solid white;
    border-top-left-radius: 20px;
    border-bottom-right-radius: .5rem;
    color: white;
    font-weight: bold;
    min-width: 100px;
}
</style>
