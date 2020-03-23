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

                <div class="d-flex mb-2">
                    <div class="w-100 pr-2">
                        <button type="button" class="btn btn-primary btn-block" @click="playerWrongAnswer('изтекло време')">Изтекло време</button>
                    </div>
                    <div class="w-100 pl-2">
                        <button type="button" class="btn btn-primary btn-block" @click="playerWrongAnswer('грешна дума')">Грешна дума</button>
                    </div>
                </div>

                <div class="d-flex mb-2">
                    <div class="w-100 pr-2 d-flex">
                        <div class="align-self-center w-100">
                            Езиково съкровище
                        </div>
                        <div class="w-25">
                            <button type="button" class="btn btn-link btn-sm pr-0 float-right" title="Правилен отговор" @click="playerCorrectAnswer('езиково съкровище')">
                                <font-awesome-icon icon="check-circle" size="lg"></font-awesome-icon>
                            </button>
                            <button type="button" class="btn btn-link btn-sm pr-0 float-right" title="Грешен отговор" @click="playerWrongAnswer('езиково съкровище')">
                                <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                            </button>
                        </div>
                    </div>
                    <div class="w-100 pl-2 d-flex">
                        <div class="align-self-center w-100">Правопис</div>
                        <div class="w-25">
                            <button type="button" class="btn btn-link btn-sm pr-0 float-right" title="Правилен отговор" @click="playerCorrectAnswer('правопис')">
                                <font-awesome-icon icon="check-circle" size="lg"></font-awesome-icon>
                            </button>
                            <button type="button" class="btn btn-link btn-sm pr-0 float-right" title="Грешен отговор" @click="playerWrongAnswer('правопис')">
                                <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                            </button>
                        </div>
                    </div>
                </div>

                <table class="table table-bordered table-sm mt-2">
                    <thead class="thead-light">
                    <tr>
                        <th class="text-center">Дума</th>
                        <th class="text-center">Точки</th>
                        <th class="text-center">...</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(answer, index) in game.answers" :key="index">
                        <td>{{ answer.word }}</td>
                        <td class="text-right">{{ answer.points }} точки</td>
                        <td class="text-center">
                            <button type="button" class="btn btn-link btn-sm" title="Изтрий" @click="removeAnswer(player.id, index)">
                                <font-awesome-icon icon="times"></font-awesome-icon>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer border-primary">
                <strong class="float-right">Общо: {{ game.totalScore }} точки</strong>
            </div>
        </div>
    </div><!-- /.col-4 -->
</template>

<script>
    export default {
        name: "Game",
        props: ['player'],
        computed: {
            game() {
                return this.$store.getters.getGameByPlayerId(this.player.id);
            }
        },
        data() {
            return {
                word: '',
                syllable: '',
            }
        },
        methods: {
            calc() {
                if (this.hasValidData()) {
                    this.$store.commit('addAnswer', {
                        playerId: this.player.id,
                        word: this.word,
                        points: this.calcPoints()
                    });

                    this.word = '';
                    this.syllable = '';
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

                let playerId = this.$store.getters.getPlayerIdByWord(this.word);
                if (playerId > 0) {
                    let playerName = this.$store.getters.getPlayerNameById(playerId);
                    this.$noty.error(`Думата е използвана от ${playerName}!!!`);
                    return  false
                }

                return true;
            },
            removeAnswer(playerId, index) {
                this.$store.commit('removeAnswer', {
                    playerId,
                    index
                });
            },
            playerWrongAnswer(message) {
                this.$store.commit('addAnswer', {
                    playerId: this.player.id,
                    word: message,
                    points: 0
                });
            },
            playerCorrectAnswer(message) {
                this.$store.commit('addAnswer', {
                    playerId: this.player.id,
                    word: message,
                    points: 200
                });
            },
            removePlayer(playerId) {
                this.$store.commit('removePlayer', playerId);
            }
        }
    }
</script>

<style scoped>

</style>
