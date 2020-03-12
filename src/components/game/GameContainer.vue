<template>
    <div class="mt-3">
        <div class="row">
            <div class="col-sm-4 offset-sm-4">
                <div class="row  form-group">
                    <div class="col-10">
                        <input id="player-name" type="text" class="form-control" placeholder="Име на играча" v-model="playerName">
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-primary" @click="addPlayer">Добави</button>
                    </div>
                </div>
            </div>
        </div><!-- /.row -->
        <hr>
        <div class="row ml-1 mr-1">
            <game v-for="player in players" :player="player" :key="player.id"></game>
        </div>
    </div>
</template>

<script>
    import Game from "@/components/game/Game";

    export default {
        name: "GameContainer",
        components: {
            Game
        },
        data() {
            return {
                players: [],
                id: 1,
                playerName: ''
            }
        },
        methods: {
            addPlayer() {
                this.players.push({
                    id: this.id,
                    name: this.playerName
                });
                this.id++;
                this.playerName = '';
            }
        }
    }
</script>

<style scoped>

</style>