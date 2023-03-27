<script>
export default {
    name: 'ApartmentComponent',

    props: {
        'apartment': {
            type: Object,
            required: true,
        },

        'isShow': {
            type: Boolean,
            required: false,
            default: false,
        },

        'imagePath': {
            type: String,
            required: true
        },

        data() {
            return {
                //
            }
        }
    }
}
</script>

<template>
    <div class="flat_card rounded-3 mb-3 p-3">
        <div>
            <img v-if="!apartment.image.startsWith('uploads')" :src="imagePath + '/img/' + apartment.image"
                class="img-fluid rounded-3" :alt="apartment.title">
            <img v-else :src="imagePath + '/storage/' + apartment.image" class="img-fluid rounded-3" :alt="apartment.title">

            <h2 class="fw-bold pt-2">
                {{ apartment.title }}
            </h2>

            <p class="pt-2">
                {{ apartment.address }}
            </p>

            <!-- <p class="pt-2">
                rooms: {{ apartment.n_rooms }}
            </p>

            <p class="pt-2">
                beds: {{ apartment.n_beds }}
            </p>

            <p class="pt-2">
                {{ apartment.n_bathrooms }}
            </p>

            <p class="pt-2">
                {{ apartment.square_meters }}
            </p>

            <span class="fw-bold me-2">
                <a class="btn btn-disabled rounded-pill fw-bold me-2 mb-1" v-for="service in apartment.services">
                    {{ service.name }}
                </a>
            </span> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.flat_card {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    img {
        border-radius: 30px;
    }
}

.card-footer {
    background-color: #aba9ee8d;
    color: white !important;
    font-weight: bold;
}

a {
    border: 1px solid black;
}

</style>
