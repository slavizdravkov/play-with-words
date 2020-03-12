<template>
    <div class="col-4">
        <div class="card">
            <div class="card-header border-primary">
                {{ player.name }}
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-7 form-group">
                        <input type="text" class="form-control" placeholder="Дума" v-model="word">
                    </div>
                    <div class="col-2 form-group">
                        <input type="text" class="form-control" placeholder="Срички" v-model="syllable">
                    </div>
                    <div class="col-3 form-group">
                        <button type="button" class="btn btn-primary" @click="calc">Пресметни</button>
                    </div>
                </div><!-- /.row -->

                <table class="table table-bordered table-sm">
                    <thead class="thead-light">
                    <tr>
                        <th class="text-center">Дума</th>
                        <th class="text-center">Точки</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="playerAnswer in playerAnswers" :key="playerAnswer.word">
                        <td>{{ playerAnswer.word }}</td>
                        <td class="text-right">{{ playerAnswer.points }} точки</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer border-primary">
                <strong class="float-right">Общо: {{ totalScore }} точки</strong>
            </div>
        </div>
    </div><!-- /.col-4 -->
</template>

<script>
    export default {
        name: "Game",
        props: ['player'],
        data() {
            return {
                playerAnswers: [],
                word: '',
                syllable: 0,
                totalScore: 0
            }
        },
        methods: {
            calc() {
                let points = this.calcPoints();

                this.playerAnswers.push({
                    word: this.word,
                    points: points
                });

                this.totalScore += points;
                this.word = '';
                this.syllable = 0;
            },
            calcPoints() {
                return 120;
            }
        },
    }
</script>

<style scoped>

</style>