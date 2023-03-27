
<script>
import { store } from '../store'
export default {
    name: "SearchComponent",
    data() {
        return {
            store,
        }
    },

}

</script>

<template lang="">
    <div class="container">
        <div class="row mb-3">
                <div class="col-12">
                    <form @submit.prevent="searchApartments">
                        <div class="input-group">
                            <input v-model="store.searchQuery" type="text" class="form-control"
                                placeholder="Search for an address or city" />
                            <!-- <button type="submit" class="btn btn-primary">Search</button> -->
                            <router-link :to="{ name: 'apartments' }" class="btn btn-primary" type="submit" @click="$emit(store.searchQuery)"
                                >
                                Cerca
                            </router-link>
                        
                        </div>
                    </form>
                </div>
            </div>
    </div>
</template>

<style lang="">
    
</style>