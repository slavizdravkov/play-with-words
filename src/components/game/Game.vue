<template>
    <div class="col-4 mb-3">
        <div class="card">
            <div class="card-header border-primary">
                {{ player.name }}
            </div>
            <div class="card-body">
                <div class="d-flex">
                    <div class="flex-grow-1 form-group">
                        <input type="text" class="form-control" placeholder="Дума" v-model="word" title="Дума">
                    </div>
                    <div class="w-25 form-group ml-2 mr-2">
                        <input type="text" class="form-control" placeholder="Срички" v-model="syllable" title="Срички">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" @click="calc" title="Пресметни">
                            <font-awesome-icon icon="calculator"></font-awesome-icon>
                        </button>
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
                if (!this.word || this.syllable === 0) {
                    this.$noty.error('Няма въведена дума или сричка!!!');
                    return;
                }
                
                if (this.word.match(/[a-zA-Z]/g)) {
                    this.$noty.error('Думата съдържа латинска буква(и)!!!');
                    return;
                }

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
                let pointsByChar = {
                    20:['а', 'т', 'н', 'в', 'и', 'о', 'р', 'е', 'л', 'с'],
                    30:['м', 'б', 'г', 'п', 'д', 'к'],
                    40:['з', 'у', 'ъ', 'ц', 'ч', 'я'],
                    50:['ж', 'ш', 'щ', 'ф', 'й', 'х', 'ь', 'ю'],
                };
                let score = 0;

                for (let i = 0; i < this.word.length; i++) {
                    for (let key in pointsByChar) {
                        let characters = pointsByChar[key];

                        if (characters.indexOf(this.word[i].toLowerCase()) >= 0) {
                            score += parseInt(key);
                        }
                    }
                }

                if (parseInt(this.syllable) >= 0) {
                    score += parseInt(this.syllable) * 10;
                }

                return score;
            }
        }
    }
</script>

<style scoped>

</style>
