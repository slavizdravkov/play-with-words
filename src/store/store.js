import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        playerId: 1,
        players: [],
        games:[]
    },
    getters: {
        players: state => {
            return state.players;
        },
        getPlayerNameById: (state) => (playerId) => {
            return state.players.find(player => player.id === playerId).name;
        },
        getGameByPlayerId: (state) => (playerId) => {
            return state.games.find(game => game.playerId === playerId);
        },
        getPlayerIdByWord: (state) => (word) => {
            let games = state.games.filter((game) => {
                return game.answers.filter((answer) => {
                    return answer.word === word;
                }).length > 0;
            });

            return games.length > 0 ? games[0]['playerId'] : 0;
        },
        activePlayerId: state => {
            return state.activePlayerId;
        }
    },
    mutations: {
        addPlayer(state, payload) {
            state.players.push({
                id: state.playerId,
                name: payload,
           });

            state.games.push({
                playerId: state.playerId,
                answers: [],
                totalScore: 0
            });

            state.playerId++;
        },
        removePlayer(state, payload) {
            state.players.splice(state.players.findIndex(({id}) => id === payload), 1);
            state.games.splice(state.games.findIndex(({playerId}) => playerId === payload), 1);
        },
        addAnswer(state, payload) {
            let gameIndex = state.games.findIndex(({playerId}) => playerId === payload.playerId);
            let game = state.games[gameIndex];

            game.answers.push({
                word: payload.word,
                points: payload.points
            });
            game.totalScore += payload.points;
            //replace game with updated state
            state.games.splice(gameIndex, 1, game);
        },
        removeAnswer(state, payload) {
            let gameIndex = state.games.findIndex(({playerId}) => playerId === payload.playerId);
            let game = state.games[gameIndex];

            let removed = game.answers.splice(payload.index, 1);
            game.totalScore -= removed[0].points;

            //replace game with updated state
            state.games.splice(gameIndex, 1, game);
        },
        newGame(state) {
            state.games.forEach((game) => {
                game.answers = [];
                game.totalScore = 0;
            });
        }
    }
});