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


//footer responsiveness
@media screen and (min-width: 767px) { 

body {
min-height: 100vh;
position: relative;
margin: 0;
padding-bottom: 57px;
box-sizing: border-box;
}

footer {
position: absolute;
bottom: 0;
height: 57px;
}

}

@media screen and (max-width: 767px) { 

body {
min-height: 100vh;
position: relative;
margin: 0;
padding-bottom: 114px;
box-sizing: border-box;
}

footer {
position: absolute;
bottom: 0;
height: 114px;
}

}



</style>
