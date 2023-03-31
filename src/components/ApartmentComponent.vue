<script>
export default {
    name: 'ApartmentComponent',

    props: {
        'apartment': {
            type: Object,
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
                //
            }
        }
    }
}
</script>

<template>
    <div class="col-12 col-sm-12 col-md-6 col-xl-3 p-3">
        <div class="card border-0 align-item-stretch align-content-stretch">
            <img v-if="!apartment.image.startsWith('uploads')" :src="imagePath + '/img/' + apartment.image"
                class="img-fluid rounded-3 my_img_card" :alt="apartment.title">
            <img v-else :src="imagePath + '/storage/' + apartment.image" class="rounded-3 my_img_card img-fluid"
                :alt="apartment.title">
            <h5 class="pt-2 fw-bold pt-3 text-capitalize">
                {{ apartment.title }}
            </h5>
            <p class="one-line custom_margin text-capitalize">
                {{ apartment.address }}
            </p>
            <ul class=" list-unstyled">
                <li class="text-capitalize" v-for="service in apartment.services">
                    <span class="fw-bold"> &bull; </span> {{ service.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
</style>
