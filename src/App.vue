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

body {
  min-height: 100vh;
}
</style>
