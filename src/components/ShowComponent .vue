<script>
export default {
    name: 'ShowComponent',

    props: {
        'apartment': {
            type: Object,
            required: true,
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
        <div class="container"> 
            <div class="mb-3 p-3">

                <h1 class="fw-bold py-3">
                    {{ apartment.title }}
                </h1>                

                <div class="image_container">
                    <img v-if="!apartment.image.startsWith('uploads')" :src="imagePath + '/img/' + apartment.image" class="img-fluid rounded-3" :alt="apartment.title">
                    <img v-else :src="imagePath + '/storage/' + apartment.image" class="img-fluid rounded-3" :alt="apartment.title">
                </div>

                <h5 class="py-3">
                    {{ apartment.address }}
                </h5>

                <p>{{ apartment.description }}</p>

                <div class="py-3">
                    <span class="py-2">
                        Rooms: {{ apartment.n_rooms }}
                    </span>

                    <span class="py-2">
                        Beds: {{ apartment.n_beds }}
                    </span>

                    <span class="py-2">
                        Bathrooms: {{ apartment.n_bathrooms }}
                    </span>

                    <span class="py-2">
                        Square Meters: {{ apartment.square_meters }}
                    </span>
                </div>

                <div class="py-3">
                    <h5>Cosa troverai:</h5>
                    <div>
                        <span class="fw-bold me-2 mb-1" v-for="service in apartment.services">
                        <i class="fa-solid fa-check"></i> {{ service.name }}
                        </span>
                    </div>
                </div>
                <hr>
                <h5>Dove ti troverai:</h5>

                <!--Inserire Mappa-->
                Mappa

                <hr>
            </div>    
        </div>
</template>

<style lang="scss" scoped>

</style>
