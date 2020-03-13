<template>
    <div id="app">
        <layout></layout>
    </div>
</template>

<script>
    import Layout from "@/components/Layout";
    export default {
        name: 'App',
        components: {
            Layout
        }
    }
</script>

<style lang="scss">
    @import '~vuejs-noty/dist/vuejs-noty.css';
    @import "~bootstrap/scss/bootstrap.scss";
</style>
