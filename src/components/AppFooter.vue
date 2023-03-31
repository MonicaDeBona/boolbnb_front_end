
<script>
export default {
    name: 'AppFooter'
}
</script>

<template>
    <footer>
        <div class="container-fluid">
            <div class="row justify-content-between">
                <div class="col-6">
                    <p>
                        Copyright - Boolbnb 
                    </p>
                </div>
                <div class="col-6 text-end">
                    <p>
                        Made by: team 3
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>


<style scoped lang="scss">
    footer{
        border-top: 1px solid black;
        p{
            margin-bottom: 0;
            padding: .5rem 0;
        }
    }
</style>