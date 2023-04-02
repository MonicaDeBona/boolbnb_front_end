
<script>
export default {
    name: 'AppFooter'
}
</script>

<template>
    <footer>
        <div class="container-fluid text-light fw-bold">
            <div class="row">
                <div class="col-md-6 col-sm-12 py-3 d-flex align-items-center">
                    <span>
                        Copyright &copy Team 3 - Boolbnb
                    </span>
                </div>
                <div class="col-md-6 col-sm-12 d-flex justify-content-md-end py-3 gap-2">
                    <font-awesome-icon :icon="['fab', 'github']" />
                    <a href="https://github.com/AndreaFumagalli4">Andrea</a>
                    <a href="https://github.com/AngeloTripodi">Angelo</a>
                    <a href="https://github.com/Frapenle">Francesco</a>
                    <a href="https://github.com/giuliaballestrero">Giulia</a>
                    <a href="https://github.com/MonicaDeBona">Monica</a>
                </div>
            </div>
        </div>
    </footer>
</template>


<style scoped lang="scss">
@use "../styles/general.scss" as *;

footer {
    border-top: 1px $main-color solid;
    background-color: $main-color;
    position: absolute;
    width: 100%;

    a {
        text-decoration: none;
        color: white;
        padding: 0 .5rem;

        &:hover {
            background-color: white;
            color: $main-color;
            border-radius: .3rem;
        }
    }

    span {
        padding: 0 .5rem;
    }

}
</style>