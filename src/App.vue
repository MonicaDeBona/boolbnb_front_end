<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'AppVue',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {

    }
  },
}
</script>

<template>
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
</template>

<style lang="scss">
@use './styles/general.scss' as *;

// #page-container {
//   position: relative;
//   min-height: 100vh;
// }


// footer {
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height:57px;            /* Footer height */
// }

</style>
