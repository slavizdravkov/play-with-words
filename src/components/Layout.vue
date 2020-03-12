<template>
    <div>
        <navbar></navbar>
        <game-container></game-container>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import GameContainer from "@/components/game/GameContainer";

    export default {
        name: "Layout",
        components: {
            Navbar,
            GameContainer
        }
    }
</script>

<style scoped>

</style>