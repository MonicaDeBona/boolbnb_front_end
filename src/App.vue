<script>
//import AppMain from './components/AppMain.vue';
import ApartmentComponent from './components/Apartmentcomponent.vue'

export default {
  name: 'AppVue',
  components: {
    //AppMain,
    ApartmentComponent,
},
  data() {
    return {

    }
  },
}
</script>

<template>
  <ApartmentComponent/>

</template>

<style lang="scss">
@use './styles/general.scss' as *;
</style>
