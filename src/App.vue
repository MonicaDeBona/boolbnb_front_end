<script>
import AppMain from './components/AppMain.vue'
export default {
  name: 'AppVue',
  components: {
    AppMain,
  },
  data() {
    return {

    }
  },
}
</script>

<template>
  <AppMain />
</template>

<style lang="scss">
@use './styles/general.scss' as *;
</style>
