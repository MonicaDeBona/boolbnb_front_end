
<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg">

            <div class="container-fluid">

                <a class="navbar-brand" href="#">
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav text-light">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" class="nav-link"
                                :class="this.$route.name === 'home' ? 'active' : ''">
                                <img src="../assets/img/Logo.png" alt="Logo BoolBnB">
                            </router-link>
                        </li>
                        <li class="nav-item ps-5">
                            <a class="nav-link" href="http://127.0.0.1:8000/">Homepage</a>
                        </li>
                        <li class="nav-item ps-5">
                            <router-link :to="{ name: 'apartments' }" class="nav-link"
                                :class="this.$route.name === 'apartments' ? 'active' : ''">
                                All Apartments
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </header>
</template>


<style scoped lang="scss">
header {
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

nav {

    a {
        font-weight: bold;

        img {
            width: 130px;
        }
    }
}
</style>