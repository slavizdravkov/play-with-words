<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Игра на думи</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <button class="btn btn-link nav-link" @click="newGame" :disabled="disabled">Нова игра</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        computed: {
            disabled() {
                return this.$store.getters.players.length === 0
            }
        },
        methods: {
            newGame() {
                this.$store.commit('newGame');
            }
        }
    }
</script>

<style scoped>

</style>