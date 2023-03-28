<script>
import SearchComponent from '../components/SearchComponent.vue';


export default {
    name: 'HomePage',
    components: {
        SearchComponent
    },

}
</script>

<template>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fe8376" fill-opacity="1" d="M0,32L60,58.7C120,85,240,139,360,170.7C480,203,600,213,720,186.7C840,160,960,96,1080,69.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>    <div class="container">
        <SearchComponent />
    </div>
</template>

<style lang="scss"></style>


