
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
                        Made by: Team 3
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>


<style scoped lang="scss">
    footer{
        border-top: 1px solid black;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        p{
            margin-bottom: 0;
            padding: .75rem 0;
        }
    }
</style>