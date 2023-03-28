
<script>
import { store } from '../store'
import axios from 'axios';

export default {
    name: "SearchComponent",
    data() {
        return {
            store,
            urlAddress: "http://127.0.0.1:8000",
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
                            <router-link :to="{ name: 'apartments' }" class="btn btn-primary" 
                                type="submit" @click="$emit('searchApartments', store.searchQuery)">
                                
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