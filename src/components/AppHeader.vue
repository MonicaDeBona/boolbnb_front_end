<script>
import { store } from '../store';
export default {
    name: 'AppHeader',
    data() {
        return {
            store,
        }
    },
    methods: {
        goToApartments() {
            //deve essere sempre il valore opposto a quello precedente
            this.store.sideEffect = !this.store.sideEffect;
            //forza la rotta in apartments 
            this.$router.push({ name: 'apartments' })
        }
    },
}
</script>
<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler ms-auto me-2 me-sm-4 border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav text-light w-100 align-items-center">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" class="nav-link py-0 py-lg-0"
                                :class="this.$route.name === 'home' ? 'active' : ''">
                                <img src="../assets/img/Logo.png" alt="Logo BoolBnB">
                            </router-link>
                        </li>
                        <li class="nav-item ms-0 ms-lg-auto">
                            <a href="#" @click.prevent="goToApartments()" class="nav-link"
                                :class="this.$route.name === 'apartments' ? 'active' : ''">
                                Apartments
                            </a>
                        </li>
                        <li class="nav-item ms-0 ms-lg-3 d-flex align-items-center">
                            <a class="nav-link btn account-btn p-1 px-2 pd-lg-0 m-2 m-lg-0" href="http://127.0.0.1:8000/">
                                Account
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
<style scoped lang="scss">
@use "../styles/general.scss" as *;

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

button.navbar-toggler {
    color: #ffcb0000;

    &:focus {
        border: none;
    }
}

.account-btn {
    background-color: $main-color;
    color: white;

    &:hover {
        color: white;
        background-color: $btn-hover;
    }
}

button.navbar-toggler:focus {
    border: none;
}
</style>