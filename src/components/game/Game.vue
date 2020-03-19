<template>
    <div class="col-12 col-sm-4 mb-3">
        <div class="card">
            <div class="card-header border-primary">
                <div class="float-left">
                    {{ player.name }}
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-link btn-sm" title="Изтрий" @click="removePlayer(player.id)">
                        <font-awesome-icon icon="times"></font-awesome-icon>
                    </button>
                </div>
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
                </div><!-- /.d-flex -->

                <div class="d-flex">
                    <div class="pr-1 flex-fill">
                        <button type="button" class="btn btn-primary" @click="playerError('изтекло време')">Изтекло време</button>
                    </div>
                    <div class="pr-1 flex-fill">
                        <button type="button" class="btn btn-primary" @click="playerError('грешна дума')">Грешна дума</button>
                    </div>
                    <div class="pr-1 flex-fill">
                        <button type="button" class="btn btn-primary" @click="languageTreasure">Езиково съкровище</button>
                    </div>
                    <div class="pr-1 flex-fill">
                        <button type="button" class="btn btn-primary h-100" @click="spelling">Правопис</button>
                    </div>
                </div><!-- /.d-flex -->

                <table class="table table-bordered table-sm mt-2">
                    <thead class="thead-light">
                    <tr>
                        <th class="text-center">Дума</th>
                        <th class="text-center">Точки</th>
                        <th class="text-center">...</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(playerAnswer, index) in playerAnswers" :key="index">
                        <td>{{ playerAnswer.word }}</td>
                        <td class="text-right">{{ playerAnswer.points }} точки</td>
                        <td class="text-center">
                            <button type="button" class="btn btn-link btn-sm" title="Изтрий" @click="removeAnswer(index)">
                                <font-awesome-icon icon="times"></font-awesome-icon>
                            </button>
                        </td>
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
                syllable: '',
                totalScore: 0
            }
        },
        methods: {
            calc() {
                if (this.hasValidData()) {
                    this.addAnswer(this.word, this.calcPoints());

                    this.word = '';
                    this.syllable = 0;
                }
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
            },
            hasValidData() {
                if (!this.word || this.syllable === 0) {
                    this.$noty.error('Няма въведена дума или сричка!!!');
                    return false;
                }

                if (this.word.match(/[a-zA-Z]/g)) {
                    this.$noty.error('Думата съдържа латинска буква(и)!!!');
                    return false;
                }

                if (!this.syllable.match(/[0-9]/)) {
                    this.$noty.error('Полето за брой срички трябва да съдържа само цифри!!!');
                    return  false
                }

                return true;
            },
            addAnswer(word, points) {
                this.playerAnswers.push({
                    word: word,
                    points: points
                });

                this.totalScore += points;
            },
            removeAnswer(index) {
                let removed = this.playerAnswers.splice(index, 1);
                this.totalScore -= removed[0].points;
            },
            playerError(errorName) {
                this.addAnswer(errorName, 0);
            },
            languageTreasure() {
                this.addAnswer('езиково съкровище', 200);
            },
            spelling() {
                this.addAnswer('правопис', 200);
            },
            removePlayer(playerId) {
                console.log(playerId);
            }
        }
    }
</script>

<style scoped>

</style>
